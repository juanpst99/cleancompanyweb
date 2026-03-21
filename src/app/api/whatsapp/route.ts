import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// ─── Rate Limiter (en memoria) ───────────────────────────────────────────────
// Protege el webhook de n8n contra spam. Límite: 10 requests por IP cada 60s.
// En serverless (Vercel), cada instancia tiene su propio Map, así que el
// límite real es "por instancia". Suficiente para frenar abuso casual.
//
// NOTA: Este rate limiter in-memory es un blindaje inicial válido, pero NO es
// la solución definitiva en serverless con múltiples instancias. Si escalamos
// tráfico o infraestructura, migrar a Redis/Upstash o equivalente.

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Limpieza periódica para evitar memory leak en long-running instances
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip)
  }
}, RATE_LIMIT_WINDOW_MS)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for') || ''
  // En Vercel, suele venir "IP, proxy1, proxy2"
  const ip = xff.split(',')[0]?.trim()
  return ip || req.headers.get('x-real-ip') || ''
}

export async function POST(request: NextRequest) {
  // Rate limiting por IP
  const clientIp = getClientIp(request) || 'unknown'
  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { success: false, message: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
      { status: 429 },
    )
  }

  try {
    const data = await request.json()

    // Hora Colombia solo para tu logging interno
    const colombiaTime = new Date().toLocaleString('sv-SE', { timeZone: 'America/Bogota' })
    data.timestamp = colombiaTime

    // ✅ Campos clave para CAPI
    data.client_user_agent = request.headers.get('user-agent') || ''
    data.client_ip_address = getClientIp(request)

    // UNIX seconds (lo que CAPI espera) — forzar entero para Meta CAPI
    data.event_time = Number(data.event_time) || Math.floor(Date.now() / 1000)

    // URL real del evento (ideal que venga del cliente; fallback al referer)
    data.event_source_url =
      data.event_source_url || request.headers.get('referer') || data.landing_url || ''

    // (Opcional) si por alguna razón no te llega fbp/fbc del cliente, podrías leer cookies aquí,
    // pero si ya lo mandas desde whatsappTracker, no es obligatorio.

    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-cc-token': process.env.N8N_AUTH_SECRET as string,
      },
      keepalive: true,
      body: JSON.stringify(data),
      
    })

    if (!n8nResponse.ok) {
      throw new Error(`Fallo al enviar a n8n. Status: ${n8nResponse.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en API interna de WhatsApp:', error)
    return NextResponse.json(
      { success: false, message: 'Error procesando la solicitud' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function getClientIp(req: NextRequest) {
  const xff = req.headers.get('x-forwarded-for') || ''
  // En Vercel, suele venir "IP, proxy1, proxy2"
  const ip = xff.split(',')[0]?.trim()
  return ip || req.headers.get('x-real-ip') || ''
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Hora Colombia solo para tu logging interno
    const colombiaTime = new Date().toLocaleString('sv-SE', { timeZone: 'America/Bogota' })
    data.timestamp = colombiaTime

    // ✅ Campos clave para CAPI
    data.client_user_agent = request.headers.get('user-agent') || ''
    data.client_ip_address = getClientIp(request)

    // UNIX seconds (lo que CAPI espera)
    data.event_time = data.event_time || Math.floor(Date.now() / 1000)

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
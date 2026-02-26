// Archivo: src/lib/whatsappTracker.ts
import { getStoredAttribution } from '@/lib/ccAttribution'

// Helpers (afuera de la función)
const getCookie = (name: string) => {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : ''
}

const buildFbc = (fbclid?: string) => {
  // 1) Si existe cookie _fbc úsala (mejor caso)
  const fbcCookie = getCookie('_fbc')
  if (fbcCookie) return fbcCookie

  // 2) Si no hay _fbc, pero sí hay fbclid, construye fbc estándar
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`

  return ''
}

export const trackWhatsAppClick = (nombre?: string, telefono?: string): string => {
  // 1) event_id para deduplicación (Pixel + CAPI)
  const shortId = Math.random().toString(36).substring(2, 6).toUpperCase()

  // 2) Attribution (tu lógica actual)
  const attrib = getStoredAttribution()

  // 3) fbp/fbc (clave para match en CAPI)
  const fbp = getCookie('_fbp')
  const fbc = buildFbc(attrib?.fbclid)

  // 4) Contexto del evento (clave para CAPI)
  const event_source_url =
    typeof window !== 'undefined' ? window.location.href : attrib?.landing_url || ''
  const event_time = Math.floor(Date.now() / 1000)

  // ✅ 5) Pixel (browser) - Lead (Cliente potencial)
  if (typeof window !== 'undefined') {
    const fbq = (window as any).fbq
    if (typeof fbq === 'function') {
      fbq(
        'track',
        'Lead',
        {
          content_name: 'WhatsApp',
          landing_url: attrib?.landing_url || window.location.href,
          utm_campaign: attrib?.utm_campaign || '',
          utm_source: attrib?.utm_source || '',
        },
        { eventID: shortId } // 🔥 dedup con CAPI: event_id = shortId
      )
    }
  }

  // ✅ 6) Enviar al backend para CAPI (server)
  fetch('/api/whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // dedup
      shortId, // = event_id en CAPI
      event_time,
      event_source_url,

      // match ids
      fbp,
      fbc,
      fbclid: attrib?.fbclid || '',

      // tu data actual
      nombre: nombre || '',
      telefono: telefono || '',
      gclid: attrib?.gclid || '',
      wbraid: attrib?.wbraid || '',
      gbraid: attrib?.gbraid || '',
      utm_source: attrib?.utm_source || '',
      utm_medium: attrib?.utm_medium || '',
      utm_campaign: attrib?.utm_campaign || '',
      landing_url: attrib?.landing_url || '',
      timestamp: attrib?.ts || new Date().toISOString(),
    }),
  }).catch((error) => console.error('Error enviando datos de WhatsApp:', error))

  return shortId
}
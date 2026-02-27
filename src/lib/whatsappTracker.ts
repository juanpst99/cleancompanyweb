// src/lib/whatsappTracker.ts
import { getStoredAttribution } from '@/lib/ccAttribution'

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : ''
}

const buildFbc = (fbclid?: string) => {
  const fbcCookie = getCookie('_fbc')
  if (fbcCookie) return fbcCookie
  if (fbclid) return `fb.1.${Date.now()}.${fbclid}`
  return ''
}

const makeRef5 = () =>
  Math.random().toString(36).slice(2, 7).toUpperCase() // 5 chars base36

export const trackWhatsAppClick = (nombre?: string, telefono?: string) => {
  const attrib = getStoredAttribution()

  // ✅ ID “real” para Meta dedup (invisible)
  const eventId =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  // ✅ Ref corta para WhatsApp (visible)
  const ref = makeRef5()

  const fbp = getCookie('_fbp')
  const fbc = buildFbc(attrib?.fbclid)

  const event_source_url = typeof window !== 'undefined' ? window.location.href : ''
  const event_time = Math.floor(Date.now() / 1000)

  // Pixel (browser): usa eventId (NO la ref corta)
  if (typeof window !== 'undefined') {
    const fbq = (window as any).fbq
    if (typeof fbq === 'function') {
      fbq(
        'track',
        'Lead',
        { content_name: 'WhatsApp', landing_url: event_source_url },
        { eventID: eventId }
      )
    }
  }

  // Backend/n8n: manda ambos
  fetch('/api/whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      ref,          // 👈 para tu WhatsApp/Sheet
      eventId,      // 👈 para Meta dedup
      event_time,
      event_source_url,
      fbp,
      fbc,
      fbclid: attrib?.fbclid || '',
      nombre: nombre || '',
      telefono: telefono || '',
      gclid: attrib?.gclid || '',
      wbraid: attrib?.wbraid || '',
      gbraid: attrib?.gbraid || '',
      landing_url: attrib?.landing_url || '',
    }),
  }).catch(console.error)

  return { ref, eventId }
}
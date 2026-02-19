// Archivo: src/lib/whatsappTracker.ts
import { getStoredAttribution } from '@/lib/ccAttribution'

export const trackWhatsAppClick = (): string => {
  // 1. Genera el ID corto inmediatamente
  const shortId = Math.random().toString(36).substring(2, 6).toUpperCase()
  
  // 2. Extrae los datos
  const attrib = getStoredAttribution()

  // 3. Envía a tu API local en segundo plano (Fire and forget, no bloquea al usuario)
  fetch('/api/whatsapp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      shortId,
      gclid: attrib?.gclid || '',
      wbraid: attrib?.wbraid || '',
      gbraid: attrib?.gbraid || '',
      utm_source: attrib?.utm_source || '',
      utm_medium: attrib?.utm_medium || '',
      utm_campaign: attrib?.utm_campaign || '',
      landing_url: attrib?.landing_url || '',
      timestamp: attrib?.ts || new Date().toISOString()
    })
  }).catch(error => console.error("Error enviando datos de WhatsApp:", error))

  // 4. Retorna el ID para usarlo en el mensaje ¡sin demoras!
  return shortId
}
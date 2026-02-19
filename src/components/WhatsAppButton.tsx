'use client'

import React from 'react'
import { getStoredAttribution } from '@/lib/ccAttribution'

const WhatsAppButton = () => {
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // 1. Generar un identificador corto (ej. 4 caracteres alfanuméricos)
    const shortId = Math.random().toString(36).substring(2, 6).toUpperCase()

    // 2. Obtener los datos de atribución almacenados
    const attrib = getStoredAttribution()

    // 3. Enviar los datos a n8n de forma silenciosa (sin bloquear al usuario)
    // NOTA: Reemplaza la URL por la de tu Webhook de n8n
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
    }).catch(error => console.error("Error local:", error))

    // 4. Abrir WhatsApp con un mensaje limpio y la referencia corta
    const base = 'Hola, quiero cotizar un servicio con Clean Company.'
    const msg = `${base} (Ref: ${shortId})`
    const url = `https://wa.me/573128052720?text=${encodeURIComponent(msg)}`

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <a
      href="https://wa.me/573128052720"
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-green-600 transform hover:scale-110 transition-all duration-300 animate-pulse"
      aria-label="Contactar por WhatsApp"
    >
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton

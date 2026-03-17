'use client'

import React from 'react'
import { useWhatsAppNumber } from '@/hooks/useWhatsAppNumber'
import { trackWhatsAppClick } from '@/lib/whatsappTracker'

interface WhatsAppLinkProps {
  /** Mensaje que se enviará por WhatsApp (sin codificar). */
  message: string
  /** Contenido visual del enlace (texto, iconos, etc.) */
  children: React.ReactNode
  /** Clases CSS de Tailwind */
  className?: string
  /** Nombre del usuario (opcional, para tracking) */
  nombre?: string
  /** Teléfono del usuario (opcional, para tracking) */
  telefono?: string
}

/**
 * Enlace de WhatsApp unificado.
 *
 * - Usa el número dinámico (lógica de domingos + override de promo).
 * - Dispara Meta CAPI (Lead) y genera código de referencia automáticamente.
 * - Inyecta el (Ref: XXXXX) al final del mensaje.
 */
export default function WhatsAppLink({
  message,
  children,
  className = '',
  nombre,
  telefono,
}: WhatsAppLinkProps) {
  const whatsappNumber = useWhatsAppNumber()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const { ref } = trackWhatsAppClick(nombre, telefono)

    const fullMessage = `${message} (Ref: ${ref})`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`

    setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 250)
  }

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

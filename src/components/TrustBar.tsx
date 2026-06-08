import React from 'react'
import { Star, ShieldCheck, Clock, MapPin, Users } from 'lucide-react'
import { SITE, hasReviews } from '@/config/site'

/**
 * Barra de prueba social / señales de confianza reutilizable.
 *
 * Neuromarketing: colocar prueba social y reversión de riesgo JUNTO a los CTA
 * reduce la fricción en el punto de decisión.
 *
 * Honestidad: la calificación (estrellas) solo aparece si hay reseñas reales
 * configuradas en `src/config/site.ts`. Si no, cae a "+N clientes" (cifra del
 * negocio). Nunca inventa una calificación.
 *
 * Es un componente de presentación puro (sin hooks) → se puede usar en
 * componentes de servidor o de cliente sin romper nada.
 */

type Variant = 'light' | 'dark'

interface TrustBarProps {
  /** 'light' = sobre fondo oscuro (texto claro). 'dark' = sobre fondo claro. */
  variant?: Variant
  className?: string
  /** Oculta el ítem de ciudades (útil en espacios estrechos). */
  hideCities?: boolean
}

export default function TrustBar({
  variant = 'dark',
  className = '',
  hideCities = false,
}: TrustBarProps) {
  const isLight = variant === 'light'
  const textColor = isLight ? 'text-white/90' : 'text-gray-700'
  const iconWrap = isLight ? 'text-yellow-400' : 'text-blue-600'
  const reviews = hasReviews()

  return (
    <ul
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium ${textColor} ${className}`}
      aria-label="Señales de confianza de Clean Company"
    >
      {/* Calificación real (gated) o conteo de clientes como fallback */}
      {reviews ? (
        <li className="flex items-center gap-1.5">
          <span className="flex" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </span>
          <span>
            <strong>{SITE.reviews.rating}</strong>/5 · {SITE.reviews.count} reseñas en {SITE.reviews.source}
          </span>
        </li>
      ) : (
        <li className="flex items-center gap-1.5">
          <Users className={`w-4 h-4 ${iconWrap}`} aria-hidden="true" />
          <span>
            <strong>+{SITE.clientsServed.toLocaleString('es-CO')}</strong> clientes · {SITE.yearsLabel} años
          </span>
        </li>
      )}

      {/* Reversión de riesgo (la garantía está documentada en /garantia) */}
      {SITE.guarantee.enabled && (
        <li className="flex items-center gap-1.5">
          <ShieldCheck className={`w-4 h-4 ${iconWrap}`} aria-hidden="true" />
          <span>{SITE.guarantee.short}</span>
        </li>
      )}

      {/* Respuesta rápida */}
      <li className="flex items-center gap-1.5">
        <Clock className={`w-4 h-4 ${iconWrap}`} aria-hidden="true" />
        <span>{SITE.responseTime}</span>
      </li>

      {/* Cobertura */}
      {!hideCities && (
        <li className="flex items-center gap-1.5">
          <MapPin className={`w-4 h-4 ${iconWrap}`} aria-hidden="true" />
          <span>{SITE.cities.join(' y ')}</span>
        </li>
      )}
    </ul>
  )
}

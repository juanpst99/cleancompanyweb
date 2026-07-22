'use client'

import { MapPin } from 'lucide-react'
import { resolverCiudad, vecinosDeZona, MINIMO_POR_ZONA } from '@/lib/ciudades'

const fmtCOP = (v: number) => '$' + v.toLocaleString('es-CO')

/**
 * Franja de cobertura local que aparece bajo el H1 de las páginas de servicio
 * cuando la URL trae una ciudad reconocida (?ciudad=Rionegro, ?ciudad=Envigado…).
 *
 * Si la ciudad no se reconoce (incluido el valor por defecto "Bogotá y Medellín")
 * no renderiza nada: la página queda exactamente como estaba.
 */
export default function CoberturaCiudad({ ciudad }: { ciudad?: string | null }) {
  const info = resolverCiudad(ciudad)
  if (!info) return null

  const vecinos = vecinosDeZona(info, 3)
  const minimo = MINIMO_POR_ZONA[info.zona]
  const zonaLabel =
    info.zona === 'oriente' ? 'Oriente antioqueño' : 'área metropolitana de Medellín'

  return (
    <div className="mb-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-white/10 px-4 py-3 text-sm backdrop-blur-sm">
      <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>
        Atendemos a domicilio en <strong>{info.nombre}</strong>
        {vecinos.length > 0 && <> y el resto del {zonaLabel} ({vecinos.join(', ')}…)</>}.
      </span>
      <span className="opacity-90">Mínimo por visita {fmtCOP(minimo)}.</span>
    </div>
  )
}

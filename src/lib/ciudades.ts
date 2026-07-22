// src/lib/ciudades.ts
// Fuente única de verdad de las ciudades/municipios que atiende Clean Company.
//
// Sirve para que el sistema de "ciudad variable" (?ciudad=X en las páginas de
// servicio) muestre cobertura local real, y para saber qué número de WhatsApp
// corresponde a cada zona. NO cambia la estructura de servicios: solo describe
// las ciudades.
//
// Zonas:
//  - 'aburra'  → Medellín y su área metropolitana (operación propia de Clean Company).
//  - 'oriente' → Oriente antioqueño (operación con aliado local; jul-2026).

export type Zona = 'aburra' | 'oriente'

export interface CiudadInfo {
  /** Nombre canónico, tal como debe mostrarse y usarse en ?ciudad= */
  nombre: string
  zona: Zona
  /** Variantes en minúscula y sin tilde que deben resolver a esta ciudad. */
  alias: string[]
}

/** Municipios del Oriente antioqueño cubiertos por el aliado (confirmado 22-jul-2026). */
export const MUNICIPIOS_ORIENTE = [
  'Rionegro',
  'Llanogrande',
  'San Antonio de Pereira',
  'La Ceja',
  'Marinilla',
  'El Retiro',
  'Guarne',
  'La Unión',
] as const

/** Municipios del Valle de Aburrá (operación propia). */
export const MUNICIPIOS_ABURRA = [
  'Medellín',
  'Envigado',
  'Itagüí',
  'Sabaneta',
  'La Estrella',
  'Caldas',
  'Bello',
  'Copacabana',
  'Girardota',
  'Barbosa',
] as const

// Nota: el Oriente usa la MISMA línea de WhatsApp que el resto del sitio
// (decisión del dueño, 22-jul-2026). No hay número dedicado por zona.

/** Mínimo de facturación por visita, por zona (COP). */
export const MINIMO_POR_ZONA: Record<Zona, number> = {
  aburra: 79_900,
  oriente: 99_900, // el flete del aliado (ida y vuelta) exige un mínimo mayor
}

/** Quita marcas diacríticas: "Itagüí" -> "itagui", "La Unión" -> "la union". */
const quitarTildes = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '')

const normalizar = (s: string) => quitarTildes(s.toLowerCase().trim())

/** Construye la tabla de ciudades a partir de las listas de municipios. */
const CIUDADES: CiudadInfo[] = [
  ...MUNICIPIOS_ABURRA.map((nombre) => ({
    nombre,
    zona: 'aburra' as const,
    alias: [normalizar(nombre)],
  })),
  ...MUNICIPIOS_ORIENTE.map((nombre) => ({
    nombre,
    zona: 'oriente' as const,
    alias: [normalizar(nombre)],
  })),
]

// Alias adicionales de uso real (cómo la gente y los anuncios escriben la ciudad).
const ALIAS_EXTRA: Record<string, string[]> = {
  'Llanogrande': ['llano grande'],
  'San Antonio de Pereira': ['san antonio', 'san antonio pereira'],
  'La Unión': ['la union'],
  'Itagüí': ['itagui'],
  'Medellín': ['medellin'],
}
for (const c of CIUDADES) {
  const extra = ALIAS_EXTRA[c.nombre]
  if (extra) c.alias.push(...extra.map(normalizar))
}

/**
 * Resuelve el valor de ?ciudad= a una ciudad conocida.
 * Devuelve null si no coincide con ninguna (p. ej. "Bogotá y Medellín", el
 * fallback por defecto de las páginas de servicio) — en ese caso el llamador
 * no debe alterar ningún comportamiento.
 */
export function resolverCiudad(param?: string | string[] | null): CiudadInfo | null {
  const raw = Array.isArray(param) ? param[0] : param
  if (!raw) return null
  const n = normalizar(raw)
  return CIUDADES.find((c) => c.alias.includes(n)) ?? null
}

/** true si la ciudad recibida pertenece al Oriente antioqueño. */
export function esOriente(param?: string | string[] | null): boolean {
  return resolverCiudad(param)?.zona === 'oriente'
}

/** Los otros municipios de la misma zona, para la franja de cobertura. */
export function vecinosDeZona(ciudad: CiudadInfo, max = 4): string[] {
  return CIUDADES.filter((c) => c.zona === ciudad.zona && c.nombre !== ciudad.nombre)
    .slice(0, max)
    .map((c) => c.nombre)
}

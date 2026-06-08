/**
 * Fuente única de verdad para claims comerciales, prueba social y precios "desde".
 *
 * ¿Por qué existe este archivo?
 *  - Centraliza las cifras que se muestran al usuario (neuromarketing) Y las que
 *    alimentan los datos estructurados (schema.org). Editas un solo lugar.
 *  - Mantiene los precios "desde" sincronizados con el backend SIN tocar el backend.
 *    Las tarifas REALES viven en `src/app/api/quote/route.ts` (TARIFAS). Aquí solo
 *    guardamos los valores "desde" que se comunican en marketing. Si cambias una
 *    tarifa en el backend, actualiza también el ancla correspondiente aquí.
 *
 * ⚠️ ÉTICA / LEY 1480 (Estatuto del Consumidor):
 *    Todo número de este archivo debe ser VERDADERO y verificable. Las cifras
 *    marcadas con // VALIDAR deben ser confirmadas por el dueño antes de publicar.
 *    Las reseñas (rating/count) están en `null` a propósito: NO se debe mostrar
 *    calificación ni generar schema AggregateRating hasta tener reseñas reales
 *    (idealmente sincronizadas con Google Business Profile).
 */

const FOUNDED_YEAR = 2015

/**
 * Años de trayectoria mostrados en la UI. Valor FIJO a propósito: NO se deriva
 * de `new Date()` porque se renderiza en componentes cliente (Hero) y un cálculo
 * en tiempo de ejecución podría causar un desajuste de hidratación al cruzar el
 * cambio de año (el HTML estático trae el año del build y el cliente recalcula).
 * Fundada en 2015 → "10+" es siempre verdadero. Súbelo a mano cuando corresponda.
 */
export const yearsInBusiness = 10

export const SITE = {
  foundedYear: FOUNDED_YEAR,
  /** Texto de años para UI (ej. "10+ años"). */
  yearsLabel: `${yearsInBusiness}+`,

  /** Ciudades con cobertura (deben coincidir con el backend y el schema). */
  cities: ['Bogotá', 'Medellín'] as const,

  /**
   * Clientes atendidos. Cifra histórica del negocio.
   * // VALIDAR: confirmar el número real antes de publicar como definitivo.
   */
  clientsServed: 5000,

  /** La garantía SÍ existe y está documentada en /garantia (Ley 1480: 3 meses). */
  guarantee: {
    enabled: true,
    short: 'Garantía o repetimos gratis',
    warrantyMonths: 3,
  },

  /**
   * Tiempo de respuesta por WhatsApp. Cualitativo a propósito ("en minutos")
   * para no afirmar un SLA numérico que no se pueda sostener siempre.
   */
  responseTime: 'Respondemos en minutos',

  /**
   * RESEÑAS — gated. Mientras sea `null`, la UI no muestra estrellas ni conteo
   * y NO se emite schema AggregateRating. Para activarlo, pon datos reales:
   *   reviews: { rating: 4.9, count: 327, source: 'Google' }
   * El número debe coincidir con reseñas públicas reales (Google/Facebook).
   */
  reviews: {
    rating: null as number | null,
    count: null as number | null,
    source: 'Google' as const,
  },
} as const

/**
 * Precios "desde" comunicados al usuario (anclaje de precios).
 * Sincronizados manualmente con `src/app/api/quote/route.ts` → TARIFAS.
 *
 * Nota clave: aunque una poltrona suelta cueste $45.000, el mínimo de
 * facturación a domicilio es $79.900 (ambas ciudades), así que el "desde"
 * honesto que ve el cliente en casa es $79.900.
 */
export const PRICING = {
  /** Mínimo de facturación por visita a domicilio (sync: minimoDomicilio). */
  minDomicilioCOP: 79_900,

  /** Anclas por servicio (referenciales — el precio exacto lo da el cotizador/técnico). */
  muebles: { desdeCOP: 79_900 },
  tapetes: {
    desdePorM2MedCOP: 37_500, // sync: Medellín.tapeteRemoviblePorM2
    desdePorM2BogCOP: 48_500, // sync: Bogotá.tapeteRemoviblePorM2
    minM2: 2,
  },
  alfombraFija: {
    desdePorM2MedCOP: 15_000, // sync: Medellín.alfombraFijaPorM2
    desdePorM2BogCOP: 30_000, // sync: Bogotá.alfombraFijaPorM2
  },
} as const

/** Formatea un valor en pesos colombianos sin decimales. */
export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

/** `true` si hay datos de reseñas reales para mostrar / marcar en schema. */
export function hasReviews(): boolean {
  return SITE.reviews.rating != null && SITE.reviews.count != null && SITE.reviews.count > 0
}

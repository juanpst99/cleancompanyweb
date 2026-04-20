/**
 * /api/quote — Pipeline de cotización visual de Clean Company
 *
 * Arquitectura de tres pasos:
 *   Paso 1 → gemini-2.5-flash-lite  : Filtro de calidad (barato, rápido)
 *   Paso 2 → gemini-2.5-flash       : Detección de objetos + bounding boxes + subtipo tapete
 *   Paso 3 → lógica JS en backend   : Geometría proporcional + reglas de precios por ciudad
 */

import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// ─── Configuración ────────────────────────────────────────────────────────────

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const MODEL_FILTER    = 'gemini-2.5-flash-lite'  // Paso 1: validación (menor costo)
const MODEL_DETECTION = 'gemini-2.5-flash'        // Paso 2: detección de objetos

// ─── Tarifas por ciudad ───────────────────────────────────────────────────────
//
// Fuente Medellín: "precios clean company medellin.html" — tarifa Sin membresía (Público/Ocasional)
// Fuente Bogotá  : "precios clean company bogota.html"   — tarifa Sin membresía (Público/Ocasional)
//
// ❌ NUNCA cotizar: colchones, vehículos, ni artículos no identificados.
//    Si el ítem no corresponde, devolver error amigable.

interface TarifaMuebles {
  sala_l:        number  // Sala en L / seccional hasta 5 puestos
  sala_l_grande: number  // Sala en L grande, 5+ módulos
  sala_3:        number  // Sofá de 3 puestos
  sofa_2:        number  // Sofá de 2 puestos
  poltrona:      number  // Poltrona / sillón 1 puesto
  silla:         number  // Silla de comedor (solo asiento)
}

interface TarifaCiudad {
  muebles:              TarifaMuebles
  tapeteRemoviblePorM2: number   // precio por m² — tapete suelto / removible (tiene bordes visibles)
  alfombraFijaPorM2:    number   // precio por m² — alfombra fija / instalada < 20 m²
  tapeteMinM2:          number   // mínimo de m² a cobrar (tapetes removibles)
  minimoFijo:           number   // mínimo de facturación para alfombra fija
  minimoDomicilio:      number   // mínimo de facturación por orden a domicilio
}

const TARIFAS: Record<string, TarifaCiudad> = {

  // ── Medellín ── (fuente: precios clean company medellin.html — Sin membresía)
  'Medellín': {
    muebles: {
      sala_l:        160_000,   // Sala en L hasta 5 puestos
      sala_l_grande: 200_000,   // Sala en L grande, 5+ módulos
      sala_3:        105_000,   // Sofá 3 puestos
      sofa_2:         90_000,   // Sofá 2 puestos
      poltrona:       45_000,   // Poltrona / sillón 1 puesto
      silla:          12_000,   // Silla comedor (solo asiento, mín. 4 sillas por visita)
    },
    tapeteRemoviblePorM2: 37_500,  // Tapete suelto / removible por m²
    alfombraFijaPorM2:    15_000,  // Alfombra fija instalada < 20 m²
    tapeteMinM2:          2,       // Mínimo 2 m² por orden de tapete removible
    minimoFijo:           350_000, // Mínimo de facturación para alfombra fija
    minimoDomicilio:       79_900, // Mínimo de facturación por visita a domicilio
  },

  // ── Bogotá ── (fuente: precios clean company bogota.html — Sin membresía)
  'Bogotá': {
    muebles: {
      sala_l:        240_000,   // Sala en L hasta 5 puestos
      sala_l_grande: 260_000,   // Sala en L grande, 5+ módulos
      sala_3:        135_000,   // Sofá 3 puestos
      sofa_2:        120_000,   // Sofá 2 puestos
      poltrona:       60_000,   // Poltrona / sillón 1 puesto
      silla:          15_000,   // Silla comedor (solo asiento, mín. 4 sillas por visita)
    },
    tapeteRemoviblePorM2: 48_500,  // Tapete suelto / removible por m²
    alfombraFijaPorM2:    30_000,  // Alfombra fija instalada < 20 m²
    tapeteMinM2:          2,       // Mínimo 2 m² por orden de tapete removible
    minimoFijo:           350_000, // Mínimo de facturación para alfombra fija
    minimoDomicilio:       79_900, // Mínimo de facturación por visita a domicilio
  },
}

// Área real del objeto de referencia estándar (zapato adulto ≈ 30 cm × 25 cm)
const AREA_REF_M2 = 0.075

// ─── Tipos internos ───────────────────────────────────────────────────────────

// Bounding box normalizada [0-1000]: [ymin, xmin, ymax, xmax]
type BBox = [number, number, number, number]

type SubtipoMueble = 'sala_l' | 'sala_l_grande' | 'sala_3' | 'sofa_2' | 'poltrona' | 'silla'
type Subtipo       = SubtipoMueble | 'tapete'

// Subtipo específico de tapete detectado por Gemini en Paso 2
type SubtipoTapete = 'Removible' | 'Fijo' | 'N/A'

interface ValidationResult {
  apta:  boolean
  razon: string
}

interface DetectionResult {
  elementoPrincipal: {
    tipo:          string        // descripción legible, ej: "Sala en L de tela gris"
    subtipo:       Subtipo
    subtipoTapete: SubtipoTapete // 'Fijo' | 'Removible' | 'N/A' (solo relevante si subtipo === 'tapete')
    bbox:          BBox
  }
  objetoReferencia: {
    tipo: string                 // zapato, hoja_a4, botella…
    bbox: BBox
  } | null
}

interface CotizacionResult {
  itemDetectado:  string
  precioEstimado: number
  explicacion:    string
  sinReferencia?: boolean  // true cuando el tapete se cotizó sin referencia de tamaño visible
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extrae mimeType y base64 puro de un dataURL. */
function parseDataUrl(dataUrl: string): { data: string; mimeType: string } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) throw new UserError('Formato de imagen inválido. Por favor, vuelve a subir la foto.')
  return { data: match[2], mimeType: match[1] }
}

/**
 * Extrae y parsea JSON de una respuesta de Gemini que puede venir envuelta
 * en code fences, texto previo/posterior, o directamente como JSON.
 *
 * Estrategia (en orden):
 *   1. Busca la primera ocurrencia de { ... } (balance de llaves)
 *   2. Intenta parsear ese substring
 *   3. Si falla, loguea el raw para diagnóstico y lanza error legible
 */
function parseModelJSON<T>(raw: string, step: string): T {
  // Buscar el primer '{' y emparejar llaves
  const startIdx = raw.indexOf('{')
  if (startIdx === -1) {
    console.error(`[quote:${step}] Respuesta sin JSON. Raw (500 chars):`, raw.slice(0, 500))
    throw new Error(`Gemini no devolvió JSON en ${step}`)
  }

  let depth = 0
  let endIdx = -1
  for (let i = startIdx; i < raw.length; i++) {
    if (raw[i] === '{') depth++
    else if (raw[i] === '}') {
      depth--
      if (depth === 0) { endIdx = i; break }
    }
  }

  if (endIdx === -1) {
    console.error(`[quote:${step}] JSON incompleto. Raw (500 chars):`, raw.slice(0, 500))
    throw new Error(`JSON incompleto en respuesta de Gemini (${step})`)
  }

  const jsonStr = raw.slice(startIdx, endIdx + 1)
  try {
    return JSON.parse(jsonStr) as T
  } catch (e) {
    console.error(`[quote:${step}] JSON inválido. Extraído:`, jsonStr.slice(0, 300))
    throw new Error(`JSON inválido en respuesta de Gemini (${step})`)
  }
}

/**
 * Calcula el área real del tapete en m² usando geometría proporcional.
 *
 * Principio: si el objeto de referencia (zapato ≈ 0.075 m²) ocupa A px²
 * y el tapete ocupa B px², entonces:  área_tapete = (B / A) × 0.075 m²
 *
 * Funciona bien con cámara perpendicular al suelo. Para ángulos oblicuos
 * el margen de error aumenta (se comunica al usuario en la explicación).
 */
function calcularAreaTapeteM2(bboxTapete: BBox, bboxRef: BBox): number {
  const [ytMin, xtMin, ytMax, xtMax] = bboxTapete
  const [yrMin, xrMin, yrMax, xrMax] = bboxRef

  const areaTapetePx = (ytMax - ytMin) * (xtMax - xtMin)
  const areaRefPx    = (yrMax - yrMin) * (xrMax - xrMin)

  if (areaRefPx <= 0) {
    throw new UserError(
      'No fue posible medir el objeto de referencia. Asegúrate de que el zapato o hoja esté completamente visible.'
    )
  }

  return (areaTapetePx / areaRefPx) * AREA_REF_M2
}

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

/** Redondea al múltiplo de 500 más cercano (práctica de caja Clean Company). */
function redondear500(value: number): number {
  return Math.round(value / 500) * 500
}

/** Error con mensaje legible que se muestra directamente al usuario. */
class UserError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UserError'
  }
}

// ─── Paso 1: Filtro de calidad (gemini-2.5-flash-lite) ───────────────────────

async function validarFoto(
  ai: GoogleGenAI,
  imageData: string,
  mimeType: string,
  categoria: string,
): Promise<ValidationResult> {
  const esTapete = categoria === 'Tapete'

  const prompt = `Eres un verificador de calidad de fotos para Clean Company, empresa colombiana de lavado de muebles y tapetes a domicilio.

Analiza la imagen y responde ÚNICAMENTE con JSON válido (sin texto adicional, sin markdown):
{"apta": boolean, "razon": "string"}

CRITERIOS PARA QUE LA FOTO SEA APTA (todos deben cumplirse):
1. La imagen no está borrosa ni desenfocada.
2. El ítem principal (${esTapete ? 'tapete o alfombra' : 'mueble: sala, sofá, poltrona o silla'}) se ve completo o casi completo.
3. Hay suficiente iluminación para distinguir el ítem.
4. El ítem es claramente un ${esTapete ? 'tapete o alfombra (no un colchón ni un mueble)' : 'mueble tapizable (no un colchón ni un tapete)'}.

Responde:
- Si apta: {"apta": true, "razon": ""}
- Si no apta: {"apta": false, "razon": "Explica brevemente qué debe corregir el usuario."}`

  const response = await ai.models.generateContent({
    model: MODEL_FILTER,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { data: imageData, mimeType } },
        { text: prompt },
      ],
    }],
  })

  const raw = response.text ?? ''
  if (!raw) {
    console.error('[quote:paso1] Gemini devolvió respuesta vacía')
    throw new Error('Gemini devolvió respuesta vacía en validación')
  }

  return parseModelJSON<ValidationResult>(raw, 'paso1')
}

// ─── Paso 2b: Búsqueda enfocada de referencia (segunda pasada) ───────────────
//
// Se invoca sólo cuando Paso 2 no encontró objetoReferencia para un tapete.
// Usa un prompt muy permisivo que lista docenas de objetos cotidianos, tolerante
// a visibilidad parcial o posición en el borde del encuadre.

async function buscarReferenciaFocused(
  ai: GoogleGenAI,
  imageData: string,
  mimeType: string,
): Promise<{ tipo: string; bbox: BBox } | null> {
  const prompt = `Eres un sistema de búsqueda de objetos de referencia de tamaño para Clean Company.

Tu única tarea: determinar si hay CUALQUIER objeto cotidiano en la imagen que pueda servir como referencia de escala junto al tapete.

Objetos a buscar (acepta aunque estén PARCIALMENTE visibles o en el borde):
zapato, tenis, sandalia, bota, chancleta, botella, vaso, taza, jarro, control remoto, libro, revista, carpeta, cuaderno, hoja A4, papel, llave, moneda, billetera, cartera, bolso, teléfono celular, tablet, mano humana, pie humano, ropa doblada, almohada, cojín, cinta métrica, regla, bolsa, paquete, caja, cualquier objeto doméstico identificable.

Responde ÚNICAMENTE con JSON válido (sin texto adicional, sin markdown):
{"encontrado": boolean, "tipo": "nombre del objeto o vacío", "bbox": [ymin, xmin, ymax, xmax]}

- Si NO encuentras ningún objeto de referencia: {"encontrado": false, "tipo": "", "bbox": [0,0,0,0]}
- Las coordenadas bbox son NORMALIZADAS entre 0 y 1000 (1000 = dimensión completa de la imagen).
- Sé MUY PERMISIVO: ante cualquier duda, marca como encontrado.`

  try {
    const response = await ai.models.generateContent({
      model: MODEL_DETECTION,
      contents: [{
        role: 'user',
        parts: [
          { inlineData: { data: imageData, mimeType } },
          { text: prompt },
        ],
      }],
      config: { thinkingConfig: { thinkingBudget: 0 } },
    })

    const raw = response.text ?? ''
    if (!raw) return null

    const parsed = parseModelJSON<{ encontrado: boolean; tipo: string; bbox: BBox }>(raw, 'paso2b')
    if (parsed.encontrado && parsed.tipo && parsed.bbox) {
      return { tipo: parsed.tipo, bbox: parsed.bbox }
    }
    return null
  } catch {
    // Si la segunda pasada falla, continuar sin referencia (graceful degradation)
    return null
  }
}

// ─── Paso 2: Detección y medición (gemini-2.5-flash) ─────────────────────────

async function detectarObjetos(
  ai: GoogleGenAI,
  imageData: string,
  mimeType: string,
  categoria: string,
): Promise<DetectionResult> {
  const esTapete = categoria === 'Tapete'

  const subtiposMueble = '"sala_l" | "sala_l_grande" | "sala_3" | "sofa_2" | "poltrona" | "silla"'

  const prompt = `Eres un sistema de detección de objetos para Clean Company.

Analiza la imagen y devuelve ÚNICAMENTE JSON válido (sin texto adicional, sin markdown):
{
  "elementoPrincipal": {
    "tipo": "Descripción legible (ej: Sala en L de tela gris, Sofá 3 puestos beige, Tapete persa removible)",
    "subtipo": ${esTapete ? '"tapete"' : subtiposMueble},
    "subtipoTapete": "Removible" | "Fijo" | "N/A",
    "bbox": [ymin, xmin, ymax, xmax]
  },
  "objetoReferencia": {
    "tipo": "zapato | hoja_a4 | botella | libro | otro",
    "bbox": [ymin, xmin, ymax, xmax]
  }
}

REGLAS CRÍTICAS:
- Las coordenadas bbox son NORMALIZADAS entre 0 y 1000 (1000 = dimensión completa de la imagen).
- Formato exacto de cada bbox: [ymin, xmin, ymax, xmax] como números enteros.
- El bbox debe envolver COMPLETAMENTE el objeto.
- Para "subtipo" de muebles usa EXACTAMENTE uno de estos valores:
  · "sala_l"        = sofá seccional que forma físicamente una L o una U: hay un giro/ángulo visible entre los módulos. CRITERIO CLAVE: si los cojines/módulos están alineados en línea recta (sin esquina), NO es sala_l aunque el sofá sea modular.
  · "sala_l_grande" = igual que sala_l (ángulo visible) pero con 5 módulos o más y es notablemente grande.
  · "sala_3"        = sofá de 3 asientos en línea recta. Incluye sofás modulares o seccionales si sus módulos están dispuestos en línea recta sin formar una L ni una U.
  · "sofa_2"        = sofá de 2 asientos en línea recta (más pequeño que sala_3).
  · "poltrona"      = sillón o poltrona de 1 puesto.
  · "silla"         = silla individual (comedor, escritorio, etc.).
- Para el campo "subtipoTapete":
  · Cuando la categoría sea Tapete, DEBES determinar si es un "Tapete Removible" o una "Alfombra Fija":
    - "Removible" = tiene bordes visibles y está colocado SOBRE otro piso (madera, baldosa, cemento). Se puede levantar.
    - "Fijo"      = cubre TODO el piso de la habitación y llega hasta las paredes o zócalos (alfombra de pared a pared, instalada).
  · Si el subtipo NO es "tapete" (es un mueble), devuelve "subtipoTapete": "N/A".
- Si hay objeto de referencia visible (zapato, botella, hoja), inclúyelo en "objetoReferencia".
- Si NO hay objeto de referencia visible, devuelve "objetoReferencia": null.`

  const response = await ai.models.generateContent({
    model: MODEL_DETECTION,
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { data: imageData, mimeType } },
        { text: prompt },
      ],
    }],
    config: {
      thinkingConfig: { thinkingBudget: 0 },
    },
  })

  const raw = response.text ?? ''
  if (!raw) {
    console.error('[quote:paso2] Gemini devolvió respuesta vacía')
    throw new Error('Gemini devolvió respuesta vacía en detección')
  }

  const result = parseModelJSON<DetectionResult>(raw, 'paso2')

  // Validación de estructura mínima para no explotar en Paso 3
  if (!result.elementoPrincipal?.subtipo || !result.elementoPrincipal?.bbox) {
    console.error('[quote:paso2] Estructura incompleta:', JSON.stringify(result).slice(0, 300))
    throw new Error('Respuesta de Gemini incompleta en detección')
  }

  // Segunda pasada enfocada: si es tapete y no se detectó referencia, intentar de nuevo
  // con un prompt permisivo que busca cualquier objeto cotidiano visible.
  if (categoria === 'Tapete' && !result.objetoReferencia) {
    console.info('[quote] Paso 2b: sin referencia en primera pasada, iniciando búsqueda enfocada...')
    const refFocused = await buscarReferenciaFocused(ai, imageData, mimeType)
    if (refFocused) {
      console.info(`[quote] Paso 2b: referencia encontrada en segunda pasada → ${refFocused.tipo}`)
      result.objetoReferencia = refFocused
    } else {
      console.info('[quote] Paso 2b: sin referencia tras segunda pasada, se usará precio orientativo')
    }
  }

  return result
}

// ─── Paso 3: Lógica de negocio ────────────────────────────────────────────────

function calcularCotizacion(
  detection: DetectionResult,
  categoria: string,
  ciudad: string,
): CotizacionResult {
  const tarifa = TARIFAS[ciudad]
  const { elementoPrincipal, objetoReferencia } = detection
  const { tipo, subtipo, subtipoTapete, bbox: bboxItem } = elementoPrincipal

  // ── Tapete ──────────────────────────────────────────────────────────────────
  if (categoria === 'Tapete' || subtipo === 'tapete') {
    if (!objetoReferencia) {
      // Graceful degradation: precio orientativo basado en ~3 m² (tamaño típico de tapete mediano)
      const areaTypical = 3
      let precioTypical: number

      if (subtipoTapete === 'Fijo') {
        precioTypical = redondear500(Math.max(areaTypical * tarifa.alfombraFijaPorM2, tarifa.minimoFijo))
      } else {
        const areaFacturar = Math.max(areaTypical, tarifa.tapeteMinM2)
        precioTypical = redondear500(Math.max(areaFacturar * tarifa.tapeteRemoviblePorM2, tarifa.minimoDomicilio))
      }

      const tipoLabel = subtipoTapete === 'Fijo' ? 'alfombra fija' : 'tapete removible'
      return {
        itemDetectado:  tipo,
        precioEstimado: precioTypical,
        explicacion:
          `No detectamos un objeto de referencia de tamaño en la foto, así que el precio mostrado es orientativo ` +
          `para un ${tipoLabel} de tamaño mediano (~${areaTypical} m²) en ${ciudad}. ` +
          `Para un precio exacto, envíanos las medidas del tapete por WhatsApp.`,
        sinReferencia: true,
      }
    }

    const areaM2         = calcularAreaTapeteM2(bboxItem, objetoReferencia.bbox)
    const areaRedondeada = Math.round(areaM2 * 10) / 10  // 1 decimal para mostrar

    // ── Alfombra Fija (instalada, pared a pared) ─────────────────────────────
    if (subtipoTapete === 'Fijo') {
      const precioRaw = areaM2 * tarifa.alfombraFijaPorM2
      const precio    = redondear500(Math.max(precioRaw, tarifa.minimoFijo))

      return {
        itemDetectado: tipo,
        precioEstimado: precio,
        explicacion:
          `Detectamos una alfombra fija (instalada de pared a pared) de aproximadamente ${areaRedondeada} m² ` +
          `(usando ${objetoReferencia.tipo} como referencia de escala). ` +
          `En ${ciudad}, el lavado de alfombra fija se cobra a ${formatCOP(tarifa.alfombraFijaPorM2)}/m² ` +
          `con un mínimo de facturación de ${formatCOP(tarifa.minimoFijo)}. ` +
          `El precio estimado es ${formatCOP(precio)}. ` +
          `Nota: el ángulo de la cámara puede afectar la precisión; nuestro técnico confirmará las medidas exactas al llegar.`,
      }
    }

    // ── Tapete Removible (suelto, con bordes visibles) ───────────────────────
    const areaFacturar = Math.max(areaM2, tarifa.tapeteMinM2)
    const precioRaw    = areaFacturar * tarifa.tapeteRemoviblePorM2
    const precio       = redondear500(Math.max(precioRaw, tarifa.minimoDomicilio))

    return {
      itemDetectado: tipo,
      precioEstimado: precio,
      explicacion:
        `Detectamos un tapete removible de aproximadamente ${areaRedondeada} m² ` +
        `(usando ${objetoReferencia.tipo} como referencia de escala). ` +
        `En ${ciudad}, el tapete suelto se cobra a ${formatCOP(tarifa.tapeteRemoviblePorM2)}/m² ` +
        `con un mínimo de ${tarifa.tapeteMinM2} m². ` +
        `El precio estimado es ${formatCOP(precio)}. ` +
        `Nota: el ángulo de la cámara puede afectar la precisión; nuestro técnico confirmará las medidas exactas al llegar.`,
    }
  }

  // ── Mueble ──────────────────────────────────────────────────────────────────
  const precioMueble = tarifa.muebles[subtipo as SubtipoMueble] ?? tarifa.muebles.sala_3
  const precio       = redondear500(Math.max(precioMueble, tarifa.minimoDomicilio))

  const nombresLegibles: Record<SubtipoMueble, string> = {
    sala_l:        'sala seccional en L (hasta 5 puestos)',
    sala_l_grande: 'sala seccional en L grande (5+ módulos)',
    sala_3:        'sofá de 3 puestos',
    sofa_2:        'sofá de 2 puestos',
    poltrona:      'poltrona',
    silla:         'silla de comedor',
  }

  return {
    itemDetectado: tipo,
    precioEstimado: precio,
    explicacion:
      `Identificamos ${nombresLegibles[subtipo as SubtipoMueble] ?? 'un mueble tapizable'} en ${ciudad}. ` +
      `El servicio incluye extracción profunda de polvo, tratamiento de manchas y secado rápido. ` +
      `Este es un valor estimado; el técnico lo confirmará al momento de la visita.`,
  }
}

// ─── Rate Limiter (en memoria) ───────────────────────────────────────────────
//
// Protege el consumo de tokens Gemini. Límite: 5 requests por IP cada 60s.
// En serverless (Vercel), cada instancia tiene su propio Map, así que el
// límite real es "por instancia". Suficiente para frenar abuso casual.

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Limpieza periódica para evitar memory leak en long-running instances
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip)
  }
}, RATE_LIMIT_WINDOW_MS)

// ─── Route Handler ────────────────────────────────────────────────────────────

// Node.js runtime: necesario por compatibilidad con @google/genai que usa APIs
// de Node (node:buffer, node:crypto). Edge Runtime causa fallos intermitentes.
// maxDuration 60s cubre las 2 llamadas a Gemini (~5-15s cada una) con margen.
export const maxDuration = 60

export async function POST(req: NextRequest) {
  // Rate limiting por IP
  const xff = req.headers.get('x-forwarded-for') || ''
  const clientIp = xff.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { error: 'Has realizado demasiadas cotizaciones. Intenta de nuevo en un minuto.' },
      { status: 429 },
    )
  }

  if (!GEMINI_API_KEY) {
    console.error('[quote] GEMINI_API_KEY no está definida.')
    return NextResponse.json(
      { error: 'El servicio de cotización no está disponible en este momento.' },
      { status: 503 },
    )
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

  try {
    const body = await req.json()
    const { image, ciudad, categoria } = body as {
      image:     string
      ciudad:    string
      categoria: string
    }

    if (!image || !categoria) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: image y categoria.' },
        { status: 400 },
      )
    }

    if (!ciudad) {
      return NextResponse.json(
        { error: 'Falta el parámetro requerido: ciudad.' },
        { status: 400 },
      )
    }

    if (!TARIFAS[ciudad]) {
      const ciudadesDisponibles = Object.keys(TARIFAS).join(', ')
      return NextResponse.json(
        { error: `Lo sentimos, aún no tenemos cobertura en "${ciudad}". Ciudades disponibles: ${ciudadesDisponibles}.` },
        { status: 400 },
      )
    }

    if (!['Mueble', 'Tapete'].includes(categoria)) {
      return NextResponse.json(
        { error: 'La categoría debe ser "Mueble" o "Tapete".' },
        { status: 400 },
      )
    }

    // Extraer datos de la imagen
    const { data: imageData, mimeType } = parseDataUrl(image)

    // Log de tamaño del payload recibido (base64 chars ≈ bytes * 4/3)
    const approxSizeKB = Math.round(imageData.length * 0.75 / 1024)
    console.info(`[quote] Inicio: ${ciudad} | ${categoria} | ~${approxSizeKB} KB imagen`)

    // ── Paso 1: Filtro de calidad ──────────────────────────────────────────
    console.info('[quote] Paso 1: validando foto...')
    const validation = await validarFoto(ai, imageData, mimeType, categoria)

    if (!validation.apta) {
      console.info(`[quote] Paso 1 rechazó foto: ${validation.razon}`)
      return NextResponse.json(
        { error: validation.razon || 'La foto no es apta. Por favor toma otra con mejor iluminación y enfoque.' },
        { status: 422 },
      )
    }

    // ── Paso 2: Detección y medición ────────────────────────────────────────
    console.info('[quote] Paso 2: detectando objetos...')
    const detection = await detectarObjetos(ai, imageData, mimeType, categoria)

    // ── Paso 3: Lógica de negocio ────────────────────────────────────────────
    console.info('[quote] Paso 3: calculando cotización...')
    const cotizacion = calcularCotizacion(detection, categoria, ciudad)

    console.info(`[quote] OK: ${ciudad} | ${cotizacion.itemDetectado} → ${formatCOP(cotizacion.precioEstimado)}`)
    return NextResponse.json(cotizacion)

  } catch (err: unknown) {
    const message     = err instanceof Error ? err.message : 'Error desconocido'
    const isUserError = err instanceof UserError

    if (isUserError) {
      console.info(`[quote] UserError: ${message}`)
      return NextResponse.json({ error: message }, { status: 422 })
    }

    // Errores de parseo de la respuesta de Gemini
    if (message.includes('Gemini') || message.includes('JSON')) {
      console.error(`[quote] Error de modelo: ${message}`)
      return NextResponse.json(
        { error: 'Nuestro sistema de análisis no pudo procesar la imagen. Por favor intenta con otra foto más clara.' },
        { status: 502 },
      )
    }

    // Errores de parseo del body del request
    if (err instanceof SyntaxError) {
      console.error(`[quote] Body inválido: ${message}`)
      return NextResponse.json(
        { error: 'La solicitud no se pudo procesar. Por favor intenta de nuevo.' },
        { status: 400 },
      )
    }

    // Error inesperado
    console.error(`[quote] Error inesperado: ${message}`)
    return NextResponse.json(
      { error: 'Ocurrió un problema temporal con el servicio. Por favor intenta de nuevo en unos segundos.' },
      { status: 500 },
    )
  }
}

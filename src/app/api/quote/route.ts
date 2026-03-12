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
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Extrae mimeType y base64 puro de un dataURL. */
function parseDataUrl(dataUrl: string): { data: string; mimeType: string } {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) throw new UserError('Formato de imagen inválido. Por favor, vuelve a subir la foto.')
  return { data: match[2], mimeType: match[1] }
}

/** Limpia posibles markdown code fences y parsea el JSON del modelo. */
function parseModelJSON<T>(raw: string): T {
  const clean = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()
  return JSON.parse(clean) as T
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
${esTapete ? '5. OBLIGATORIO para tapetes: debe haber un objeto de referencia visible (zapato, botella, hoja A4, libro, etc.) junto al tapete.' : ''}

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

  return parseModelJSON<ValidationResult>(response.text ?? '{}')
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
  · "sala_l"        = sofá seccional en L o en U hasta 5 módulos (el vértice/esquina es visible).
  · "sala_l_grande" = sofá seccional en L/U con 5 módulos o más (es notablemente grande).
  · "sala_3"        = sofá recto de 3 puestos.
  · "sofa_2"        = sofá recto de 2 puestos (más pequeño).
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
    // Thinking desactivado: optimiza latencia y costo para detección de objetos
    // estructurada. El razonamiento extendido no mejora significativamente
    // la precisión de bounding boxes frente a una respuesta directa.
    config: {
      thinkingConfig: { thinkingBudget: 0 },
    },
  })

  return parseModelJSON<DetectionResult>(response.text ?? '{}')
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
      throw new UserError(
        'No encontramos un objeto de referencia en la foto. Coloca un zapato o una hoja A4 al lado del tapete y vuelve a intentarlo.'
      )
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

// ─── Route Handler ────────────────────────────────────────────────────────────

// Las fotos en base64 pueden superar los 4 MB. El límite se aumentó a 10 MB
// en next.config.mjs → experimental.serverActions.bodySizeLimit: '10mb'.
export const maxDuration = 30  // segundos; subir a 60 en Vercel Pro si es necesario

export async function POST(req: NextRequest) {
  if (!GEMINI_API_KEY) {
    console.error('[/api/quote] GEMINI_API_KEY no está definida.')
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

    // ── Paso 1: Filtro de calidad ──────────────────────────────────────────
    console.log(`[/api/quote] Paso 1: validando foto (${ciudad}, ${categoria})`)
    const validation = await validarFoto(ai, imageData, mimeType, categoria)

    if (!validation.apta) {
      return NextResponse.json(
        { error: validation.razon || 'La foto no es apta. Por favor toma otra.' },
        { status: 422 },
      )
    }

    // ── Paso 2: Detección y medición ────────────────────────────────────────
    console.log('[/api/quote] Paso 2: detectando objetos y bounding boxes')
    const detection = await detectarObjetos(ai, imageData, mimeType, categoria)

    // ── Paso 3: Lógica de negocio ────────────────────────────────────────────
    console.log('[/api/quote] Paso 3: calculando cotización')
    const cotizacion = calcularCotizacion(detection, categoria, ciudad)

    console.log(`[/api/quote] ✅ ${ciudad} | ${cotizacion.itemDetectado} → ${formatCOP(cotizacion.precioEstimado)}`)
    return NextResponse.json(cotizacion)

  } catch (err: unknown) {
    const message      = err instanceof Error ? err.message : 'Error desconocido'
    const isUserError  = err instanceof UserError

    console.error('[/api/quote] Error:', message)

    if (isUserError) {
      return NextResponse.json({ error: message }, { status: 422 })
    }

    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'El análisis de la imagen no devolvió un resultado válido. Por favor intenta de nuevo.' },
        { status: 502 },
      )
    }

    return NextResponse.json(
      { error: 'Ocurrió un problema al analizar la foto. Por favor intenta de nuevo.' },
      { status: 500 },
    )
  }
}

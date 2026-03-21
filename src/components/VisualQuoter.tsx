'use client'

import React, { useState, useRef, useCallback } from 'react'
import { useWhatsAppNumber } from '@/hooks/useWhatsAppNumber'
import { trackWhatsAppClick } from '@/lib/whatsappTracker'
import { GTMEvents } from '@/lib/gtm'

// ─── Types ────────────────────────────────────────────────────────────────────

type Ciudad = 'Bogotá' | 'Medellín'
type Categoria = 'Mueble' | 'Tapete'
type Step = 'idle' | 'preview' | 'loading' | 'result' | 'error'

interface QuoteResult {
  itemDetectado: string
  precioEstimado: number
  explicacion: string
  sinReferencia?: boolean  // precio orientativo cuando no se detectó referencia de tamaño
}

// ─── Constants ────────────────────────────────────────────────────────────────

// Límite duro: si después de compresión la imagen sigue pasando esto, no la enviamos.
// Edge Runtime limita body a ~4.5 MB y un base64 de 1.5 MB ya usa ~2 MB de JSON payload.
const MAX_PAYLOAD_CHARS = 1_500_000 // ~1.1 MB de imagen real

// Sentinel para distinguir errores de memoria de otros errores de canvas/decode
const MEMORY_ERROR = 'MEMORY_ERROR__'

// Límite de tamaño de archivo antes de intentar compresión (20 MB)
const MAX_FILE_BYTES = 20 * 1024 * 1024

// Timeout para el fetch al backend (2 llamadas a Gemini + lógica = ~30s normal, cap a 50s)
const FETCH_TIMEOUT_MS = 50_000

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

/**
 * Comprime la imagen a JPEG usando Canvas.
 *
 * Mejora de memoria en móvil:
 *   - createImageBitmap con { resizeWidth } decodifica DIRECTAMENTE al tamaño objetivo.
 *     Esto reduce el pico de memoria de ~40 MB (12MP completo) a ~4 MB (800px).
 *   - Fallback a new Image() + objectURL para browsers sin createImageBitmap.
 *   - Canvas limpiado (width/height = 0) después de exportar para liberar GPU memory.
 *   - Lanza MEMORY_ERROR si detecta error de OOM (el caller muestra mensaje amigable).
 *
 * Retorna un data URL `data:image/jpeg;base64,...`
 */
async function compressImage(file: File, maxWidth = 800, quality = 0.6): Promise<string> {
  let source: ImageBitmap | HTMLImageElement

  if (typeof createImageBitmap === 'function') {
    try {
      // resizeWidth decodifica al tamaño objetivo directamente → pico de memoria ~4 MB
      source = await createImageBitmap(file, { resizeWidth: maxWidth, resizeQuality: 'medium' })
    } catch (bitmapErr) {
      // Algunos Android viejos o HEIC sin soporte nativo fallan aquí — usar fallback
      const msg = bitmapErr instanceof Error ? bitmapErr.message.toLowerCase() : ''
      if (msg.includes('memory') || msg.includes('allocation') || msg.includes('oom')) {
        throw new Error(MEMORY_ERROR)
      }
      try {
        source = await loadImageFromFile(file)
      } catch {
        throw new Error('No se pudo cargar la imagen. Intenta con JPG o PNG.')
      }
    }
  } else {
    source = await loadImageFromFile(file)
  }

  const srcW = source instanceof HTMLImageElement ? source.naturalWidth : source.width
  const srcH = source instanceof HTMLImageElement ? source.naturalHeight : source.height

  if (srcW === 0 || srcH === 0) {
    if (source instanceof ImageBitmap) source.close()
    throw new Error('La imagen no se pudo leer correctamente.')
  }

  // Para ImageBitmap con resizeWidth, ya está al tamaño objetivo (scale ≈ 1).
  // Para HTMLImageElement en el fallback, escalar aquí manteniendo aspect ratio.
  const scale = Math.min(1, maxWidth / srcW)
  const w = Math.round(srcW * scale)
  const h = Math.round(srcH * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    if (source instanceof ImageBitmap) source.close()
    throw new Error('Tu navegador no soporta procesamiento de imágenes.')
  }

  ctx.drawImage(source, 0, 0, w, h)
  if (source instanceof ImageBitmap) source.close()

  let dataUrl: string
  try {
    dataUrl = canvas.toDataURL('image/jpeg', quality)
  } catch (canvasErr) {
    const msg = canvasErr instanceof Error ? canvasErr.message.toLowerCase() : ''
    canvas.width = 0; canvas.height = 0
    if (msg.includes('memory') || msg.includes('oom') || msg.includes('tainted')) {
      throw new Error(MEMORY_ERROR)
    }
    throw canvasErr
  }

  // Liberar memoria del canvas explícitamente
  canvas.width = 0
  canvas.height = 0

  return dataUrl
}

/** Fallback: carga imagen a través de objectURL + HTMLImageElement */
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('No se pudo cargar la imagen. Intenta con otro formato (JPG o PNG).'))
    }
    img.src = url
  })
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CityButton({
  city,
  selected,
  onClick,
}: {
  city: Ciudad
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
        selected
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
          : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
      }`}
    >
      {city}
    </button>
  )
}

function CategoryButton({
  label,
  icon,
  selected,
  onClick,
}: {
  label: Categoria
  icon: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-1.5 py-3 px-3 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
        selected
          ? 'border-blue-600 bg-blue-50 text-blue-700'
          : 'border-gray-200 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-600'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      {label}
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface VisualQuoterProps {
  defaultCity?: Ciudad
  defaultCategory?: Categoria
}

export default function VisualQuoter({ defaultCity = 'Bogotá', defaultCategory = 'Mueble' }: VisualQuoterProps) {
  const whatsappNumber = useWhatsAppNumber()

  const [ciudad, setCiudad] = useState<Ciudad>(defaultCity)
  const [categoria, setCategoria] = useState<Categoria>(defaultCategory)
  const [step, setStep] = useState<Step>('idle')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [result, setResult] = useState<QuoteResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/') && file.type !== '') {
      // file.type puede ser '' en Android para HEIC/formatos raros
      // Si es '' lo dejamos pasar e intentamos comprimir igualmente
      return
    }

    // Pre-check: rechazar archivos excesivamente grandes antes de intentar decodificar
    if (file.size > MAX_FILE_BYTES) {
      setErrorMsg('La imagen es muy grande (máximo 20 MB). Toma la foto con menor resolución o elige otra.')
      setStep('error')
      return
    }

    // Tamaño adaptativo: fotos de cámara de alta resolución necesitan menos ancho
    // para que createImageBitmap use menos pico de memoria durante el decode.
    const adaptiveMaxWidth = file.size > 6 * 1024 * 1024 ? 560
      : file.size > 3 * 1024 * 1024 ? 700
      : 800

    try {
      const url = URL.createObjectURL(file)
      const base64 = await compressImage(file, adaptiveMaxWidth)

      // Verificar tamaño del base64 resultante
      if (base64.length > MAX_PAYLOAD_CHARS) {
        URL.revokeObjectURL(url)
        // Intentar con calidad más baja
        const base64Low = await compressImage(file, 560, 0.4)
        if (base64Low.length > MAX_PAYLOAD_CHARS) {
          setErrorMsg('La imagen es demasiado grande incluso después de comprimirla. Intenta con una foto de menor resolución.')
          setStep('error')
          return
        }
        console.info('[Quoter] Recomprimida a calidad baja:', Math.round(base64Low.length / 1024), 'KB')
        setPreviewUrl(url)
        setImageBase64(base64Low)
        setStep('preview')
        return
      }

      console.info('[Quoter] Imagen comprimida:', Math.round(base64.length / 1024), 'KB')
      setPreviewUrl(url)
      setImageBase64(base64)
      setStep('preview')
    } catch (err) {
      const isMemory = err instanceof Error && err.message === MEMORY_ERROR
      if (isMemory) {
        setErrorMsg('Memoria insuficiente para procesar esta foto. Intenta con una imagen más pequeña o toma la foto con menor resolución.')
      } else {
        const msg = err instanceof Error ? err.message : 'No se pudo procesar la imagen.'
        console.error('[Quoter] Error comprimiendo:', msg)
        setErrorMsg(`No pudimos procesar tu foto: ${msg}`)
      }
      setStep('error')
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // Reset so same file can be re-selected
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleAnalyze = async () => {
    if (!imageBase64) return

    // Tracking: usuario inicia análisis con intención real
    GTMEvents.quotationStart(categoria.toLowerCase(), ciudad)

    setStep('loading')
    setResult(null)
    setErrorMsg('')

    // AbortController para timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageBase64, ciudad, categoria }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Leer el body de la respuesta SIEMPRE — el backend envía mensajes útiles
      const data = await res.json()

      if (!res.ok) {
        // El backend devuelve { error: "mensaje legible" } en todos los status codes
        const serverMsg = data?.error || ''

        // Elegir mensaje según el tipo de error
        if (res.status === 422) {
          // 422 = foto rechazada o falta referencia — mostrar mensaje del backend tal cual
          setErrorMsg(serverMsg || 'La foto no es adecuada. Intenta con otra.')
        } else if (res.status === 502) {
          // 502 = Gemini respondió mal — error temporal
          setErrorMsg(serverMsg || 'Nuestro sistema de análisis tuvo un problema temporal. Intenta de nuevo.')
        } else if (res.status >= 500) {
          // 5xx = error del servidor
          setErrorMsg('Estamos experimentando problemas técnicos. Intenta de nuevo en unos segundos.')
        } else {
          // 4xx = error del request
          setErrorMsg(serverMsg || 'Hubo un problema con la solicitud. Intenta de nuevo.')
        }

        setStep('error')
        return
      }

      // Éxito: data ya tiene la estructura QuoteResult
      const quoteData = data as QuoteResult
      setResult(quoteData)
      setStep('result')

      // Tracking: cotización completada con éxito
      GTMEvents.quotationComplete(categoria.toLowerCase(), ciudad, {
        item: quoteData.itemDetectado,
        precio: quoteData.precioEstimado,
        sinReferencia: quoteData.sinReferencia ?? false,
      })

    } catch (err) {
      clearTimeout(timeoutId)

      if (err instanceof DOMException && err.name === 'AbortError') {
        setErrorMsg('El análisis tardó demasiado. Esto puede pasar con fotos muy complejas. Intenta con una foto más simple o inténtalo de nuevo.')
        setStep('error')
        return
      }

      // Error de red (offline, DNS, CORS, etc.)
      console.error('[Quoter] Error de red:', err instanceof Error ? err.message : err)
      setErrorMsg('No se pudo conectar con el servidor. Verifica tu conexión a internet e intenta de nuevo.')
      setStep('error')
    }
  }

  const handleReset = () => {
    setStep('idle')
    setPreviewUrl(null)
    setImageBase64(null)
    setResult(null)
    setErrorMsg('')
  }

  const handleWhatsApp = () => {
    const { ref } = trackWhatsAppClick()
    const price = result ? formatCOP(result.precioEstimado) : ''
    const item = result?.itemDetectado ?? ''
    const msg = result?.sinReferencia
      ? `Hola, quiero confirmar el precio exacto de mi tapete. 🧹\n\n*Cotización Visual Clean Company*\nItem: ${item}\nPrecio orientativo: ~${price}\nCiudad: ${ciudad}\n\n(No puse objeto de referencia — por favor ayúdenme con el precio exacto)\n(Ref: ${ref})`
      : `Hola, quiero *reservar por este precio*. 🧹\n\n*Cotización Visual Clean Company*\nItem detectado: ${item}\nPrecio estimado: ${price}\nCiudad: ${ciudad}\n\n(Ref: ${ref})`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`
    setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 150)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="w-full bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full opacity-30 blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-lg mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            NUEVO — Cotizador con IA
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
            ¿Cuánto cuesta limpiar<br />
            <span className="text-yellow-400">tu mueble o tapete?</span>
          </h2>
          <p className="text-blue-100 text-sm">
            Sube una foto y recibe un precio estimado al instante.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7">

          {/* City selector */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Tu ciudad
            </label>
            <div className="flex gap-2">
              <CityButton city="Bogotá"   selected={ciudad === 'Bogotá'}   onClick={() => setCiudad('Bogotá')} />
              <CityButton city="Medellín" selected={ciudad === 'Medellín'} onClick={() => setCiudad('Medellín')} />
            </div>
          </div>

          {/* Category selector */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              ¿Qué quieres limpiar?
            </label>
            <div className="flex gap-3">
              <CategoryButton label="Mueble" icon="🛋️" selected={categoria === 'Mueble'} onClick={() => setCategoria('Mueble')} />
              <CategoryButton label="Tapete" icon="🪄" selected={categoria === 'Tapete'} onClick={() => setCategoria('Tapete')} />
            </div>

            {/* Tip for tapetes */}
            {categoria === 'Tapete' && (
              <div className="mt-3 flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5 text-yellow-800 text-xs">
                <span className="text-base mt-0.5">💡</span>
                <span>
                  <strong>Tip:</strong> Pon un zapato o una hoja al lado del tapete para que podamos calcular mejor el tamaño.
                </span>
              </div>
            )}
          </div>

          {/* ── STEP: IDLE — Upload area ── */}
          {(step === 'idle') && (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-blue-200 rounded-xl bg-blue-50 hover:bg-blue-100 hover:border-blue-400 transition-colors duration-200 p-6 flex flex-col items-center gap-4 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
                📷
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-blue-700">Arrastra tu foto aquí</p>
                <p className="text-xs text-gray-400 mt-0.5">o elige una opción</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <span>📁</span> Subir foto
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click() }}
                  className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  <span>📸</span> Abrir cámara
                </button>
              </div>
              <p className="text-xs text-gray-400">JPG, PNG o WEBP • Máx. 20 MB</p>

              {/* Hidden inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInputChange}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleInputChange}
              />
            </div>
          )}

          {/* ── STEP: PREVIEW — Confirm analysis ── */}
          {step === 'preview' && previewUrl && (
            <div className="flex flex-col gap-4">
              <div className="relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="w-full max-h-56 object-cover"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Eliminar foto"
                >
                  ✕
                </button>
              </div>
              <button
                onClick={handleAnalyze}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-md shadow-blue-200 active:scale-95"
              >
                ✨ Analizar y cotizar
              </button>
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-gray-600 text-center transition-colors"
              >
                Cambiar foto
              </button>
            </div>
          )}

          {/* ── STEP: LOADING ── */}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center gap-5 py-8">
              {/* Spinner */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">🔍</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Analizando tela y dimensiones...</p>
                <p className="text-xs text-gray-400 mt-1">Esto tomará solo un momento</p>
              </div>
              {/* Animated dots */}
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── STEP: RESULT ── */}
          {step === 'result' && result && (
            <div className="flex flex-col gap-5">
              {/* Preview thumbnail */}
              {previewUrl && (
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Tu foto" className="w-full max-h-40 object-cover" />
                </div>
              )}

              {/* Item detected */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-lg shrink-0">
                  {categoria === 'Tapete' ? '🪄' : '🛋️'}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Detectamos</p>
                  <p className="text-sm font-bold text-gray-800">{result.itemDetectado}</p>
                </div>
              </div>

              {/* Price — Big display */}
              {result.sinReferencia ? (
                <div className="text-center bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl py-6 px-4 border border-amber-200">
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-1">Precio orientativo</p>
                  <p className="text-5xl font-black text-amber-700 tracking-tight">
                    ~{formatCOP(result.precioEstimado)}
                  </p>
                  <p className="text-xs text-amber-500 mt-1">En {ciudad} · sin referencia de tamaño</p>
                </div>
              ) : (
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl py-6 px-4 border border-blue-100">
                  <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest mb-1">Precio estimado</p>
                  <p className="text-5xl font-black text-blue-700 tracking-tight">
                    {formatCOP(result.precioEstimado)}
                  </p>
                  <p className="text-xs text-blue-400 mt-1">En {ciudad}</p>
                </div>
              )}

              {/* Explanation */}
              <div className="flex gap-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <span className="text-xl shrink-0">ℹ️</span>
                <p className="text-sm text-gray-600 leading-relaxed">{result.explicacion}</p>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-sm text-white transition-all active:scale-95 shadow-lg shadow-green-200"
                style={{ backgroundColor: '#3AAA35' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2d8a29')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3AAA35')}
              >
                {/* WhatsApp icon */}
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                {result.sinReferencia ? 'Confirmar precio exacto por WhatsApp' : 'Reservar por este precio'}
              </button>

              {/* Start over */}
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-gray-600 text-center transition-colors"
              >
                ↩ Cotizar otro ítem
              </button>
            </div>
          )}

          {/* ── STEP: ERROR ── */}
          {step === 'error' && (
            <div className="flex flex-col items-center gap-4 py-6">
              <span className="text-4xl">😞</span>
              <div className="text-center px-2">
                <p className="text-sm font-semibold text-gray-700">{errorMsg}</p>
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Volver a intentar
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-blue-200 text-xs mt-4">
          El precio final lo confirma nuestro técnico al momento del servicio. Sin compromisos.
        </p>
      </div>
    </section>
  )
}

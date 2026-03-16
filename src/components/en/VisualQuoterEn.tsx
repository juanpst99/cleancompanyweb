'use client'

import React, { useState, useRef, useCallback } from 'react'
import { useWhatsAppNumber } from '@/hooks/useWhatsAppNumber'
import { trackWhatsAppClick } from '@/lib/whatsappTracker'

// ─── Types ────────────────────────────────────────────────────────────────────

type Ciudad = 'Bogotá' | 'Medellín'
type Categoria = 'Sofa' | 'Rug'
type Step = 'idle' | 'preview' | 'loading' | 'result' | 'error'

interface QuoteResult {
  itemDetectado: string
  precioEstimado: number
  explicacion: string
  sinReferencia?: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_PAYLOAD_CHARS = 1_500_000
const MEMORY_ERROR = 'MEMORY_ERROR__'
const MAX_FILE_BYTES = 20 * 1024 * 1024
const FETCH_TIMEOUT_MS = 50_000

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value)

async function compressImage(file: File, maxWidth = 800, quality = 0.6): Promise<string> {
  let source: ImageBitmap | HTMLImageElement

  if (typeof createImageBitmap === 'function') {
    try {
      source = await createImageBitmap(file, { resizeWidth: maxWidth, resizeQuality: 'medium' })
    } catch (bitmapErr) {
      const msg = bitmapErr instanceof Error ? bitmapErr.message.toLowerCase() : ''
      if (msg.includes('memory') || msg.includes('allocation') || msg.includes('oom')) {
        throw new Error(MEMORY_ERROR)
      }
      try {
        source = await loadImageFromFile(file)
      } catch {
        throw new Error('Could not load the image. Try with JPG or PNG.')
      }
    }
  } else {
    source = await loadImageFromFile(file)
  }

  const srcW = source instanceof HTMLImageElement ? source.naturalWidth : source.width
  const srcH = source instanceof HTMLImageElement ? source.naturalHeight : source.height

  if (srcW === 0 || srcH === 0) {
    if (source instanceof ImageBitmap) source.close()
    throw new Error('The image could not be read correctly.')
  }

  const scale = Math.min(1, maxWidth / srcW)
  const w = Math.round(srcW * scale)
  const h = Math.round(srcH * scale)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    if (source instanceof ImageBitmap) source.close()
    throw new Error('Your browser does not support image processing.')
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

  canvas.width = 0
  canvas.height = 0

  return dataUrl
}

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
      reject(new Error('Could not load the image. Try a different format (JPG or PNG).'))
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

export default function VisualQuoterEn() {
  const whatsappNumber = useWhatsAppNumber()

  const [ciudad, setCiudad] = useState<Ciudad>('Medellín')
  const [categoria, setCategoria] = useState<Categoria>('Sofa')
  const [step, setStep] = useState<Step>('idle')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [result, setResult] = useState<QuoteResult | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/') && file.type !== '') return

    if (file.size > MAX_FILE_BYTES) {
      setErrorMsg('Image is too large (max 20 MB). Try taking a lower-resolution photo or choose a different one.')
      setStep('error')
      return
    }

    const adaptiveMaxWidth = file.size > 6 * 1024 * 1024 ? 560
      : file.size > 3 * 1024 * 1024 ? 700
      : 800

    try {
      const url = URL.createObjectURL(file)
      const base64 = await compressImage(file, adaptiveMaxWidth)

      if (base64.length > MAX_PAYLOAD_CHARS) {
        URL.revokeObjectURL(url)
        const base64Low = await compressImage(file, 560, 0.4)
        if (base64Low.length > MAX_PAYLOAD_CHARS) {
          setErrorMsg('The image is too large even after compression. Please try a lower-resolution photo.')
          setStep('error')
          return
        }
        console.info('[Quoter] Recompressed to low quality:', Math.round(base64Low.length / 1024), 'KB')
        setPreviewUrl(url)
        setImageBase64(base64Low)
        setStep('preview')
        return
      }

      console.info('[Quoter] Image compressed:', Math.round(base64.length / 1024), 'KB')
      setPreviewUrl(url)
      setImageBase64(base64)
      setStep('preview')
    } catch (err) {
      const isMemory = err instanceof Error && err.message === MEMORY_ERROR
      if (isMemory) {
        setErrorMsg('Not enough memory to process this photo. Try a smaller image or lower resolution.')
      } else {
        const msg = err instanceof Error ? err.message : 'Could not process the image.'
        console.error('[Quoter] Compression error:', msg)
        setErrorMsg(`We couldn't process your photo: ${msg}`)
      }
      setStep('error')
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ''
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleAnalyze = async () => {
    if (!imageBase64) return
    setStep('loading')
    setResult(null)
    setErrorMsg('')

    // Map English category names to Spanish for the backend API
    const categoriaBackend = categoria === 'Sofa' ? 'Mueble' : 'Tapete'

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageBase64, ciudad, categoria: categoriaBackend }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const data = await res.json()

      if (!res.ok) {
        const serverMsg = data?.error || ''

        if (res.status === 422) {
          setErrorMsg(serverMsg || 'This photo didn\'t work for quoting. Please try another one.')
        } else if (res.status === 502) {
          setErrorMsg(serverMsg || 'Our analysis system had a temporary issue. Please try again.')
        } else if (res.status >= 500) {
          setErrorMsg('We\'re experiencing technical difficulties. Please try again in a few seconds.')
        } else {
          setErrorMsg(serverMsg || 'There was a problem with the request. Please try again.')
        }

        setStep('error')
        return
      }

      setResult(data as QuoteResult)
      setStep('result')

    } catch (err) {
      clearTimeout(timeoutId)

      if (err instanceof DOMException && err.name === 'AbortError') {
        setErrorMsg('The analysis took too long. This can happen with complex photos. Please try a simpler image or try again.')
        setStep('error')
        return
      }

      console.error('[Quoter] Network error:', err instanceof Error ? err.message : err)
      setErrorMsg('Could not connect to the server. Please check your internet connection and try again.')
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
      ? `Hi, I'd like to confirm the exact price for my rug. 🧹\n\n*Visual Quote — Clean Company*\nItem: ${item}\nEstimated price: ~${price}\nCity: ${ciudad}\n\n(No size reference included — please help me with the exact price)\n(Ref: ${ref})`
      : `Hi, I'd like to *book at this price*. 🧹\n\n*Visual Quote — Clean Company*\nItem detected: ${item}\nEstimated price: ${price}\nCity: ${ciudad}\n\n(Ref: ${ref})`
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
            NEW — AI-Powered Instant Quote
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
            How much does it cost to clean<br />
            <span className="text-yellow-400">your sofa or rug?</span>
          </h2>
          <p className="text-blue-100 text-sm">
            Upload a photo and get an instant price estimate — no Spanish needed.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7">

          {/* City selector */}
          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Your city
            </label>
            <div className="flex gap-2">
              <CityButton city="Medellín" selected={ciudad === 'Medellín'} onClick={() => setCiudad('Medellín')} />
              <CityButton city="Bogotá"   selected={ciudad === 'Bogotá'}   onClick={() => setCiudad('Bogotá')} />
            </div>
          </div>

          {/* Category selector */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              What do you want to clean?
            </label>
            <div className="flex gap-3">
              <CategoryButton label="Sofa" icon="🛋️" selected={categoria === 'Sofa'} onClick={() => setCategoria('Sofa')} />
              <CategoryButton label="Rug"  icon="🪄" selected={categoria === 'Rug'}  onClick={() => setCategoria('Rug')} />
            </div>

            {categoria === 'Rug' && (
              <div className="mt-3 flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2.5 text-yellow-800 text-xs">
                <span className="text-base mt-0.5">💡</span>
                <span>
                  <strong>Tip:</strong> Place a shoe or a sheet of paper next to the rug so our AI can better estimate its size and give you a more accurate quote.
                </span>
              </div>
            )}
          </div>

          {/* ── STEP: IDLE — Upload area ── */}
          {step === 'idle' && (
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
                <p className="text-sm font-semibold text-blue-700">Drag your photo here</p>
                <p className="text-xs text-gray-400 mt-0.5">or choose an option below</p>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  <span>📁</span> Upload photo
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click() }}
                  className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg border border-gray-200 transition-colors"
                >
                  <span>📸</span> Take a photo
                </button>
              </div>
              <p className="text-xs text-gray-400">JPG, PNG or WEBP · Max 10 MB</p>

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
                  alt="Preview"
                  className="w-full max-h-56 object-cover"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white text-xs flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Remove photo"
                >
                  ✕
                </button>
              </div>
              <button
                onClick={handleAnalyze}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-sm hover:from-blue-700 hover:to-blue-800 transition-all shadow-md shadow-blue-200 active:scale-95"
              >
                ✨ Analyze & Get Quote
              </button>
              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-gray-600 text-center transition-colors"
              >
                Change photo
              </button>
            </div>
          )}

          {/* ── STEP: LOADING ── */}
          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center gap-5 py-8">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
                <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">🔍</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-700">Analyzing fabric and dimensions...</p>
                <p className="text-xs text-gray-400 mt-1">This will only take a moment</p>
              </div>
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
              {previewUrl && (
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={previewUrl} alt="Your photo" className="w-full max-h-40 object-cover" />
                </div>
              )}

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-lg shrink-0">
                  {categoria === 'Rug' ? '🪄' : '🛋️'}
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Detected</p>
                  <p className="text-sm font-bold text-gray-800">{result.itemDetectado}</p>
                </div>
              </div>

              {result.sinReferencia ? (
                <div className="text-center bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl py-6 px-4 border border-amber-200">
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-widest mb-1">Estimated Price</p>
                  <p className="text-5xl font-black text-amber-700 tracking-tight">
                    ~{formatCOP(result.precioEstimado)}
                  </p>
                  <p className="text-xs text-amber-500 mt-1">In {ciudad} · no size reference provided</p>
                </div>
              ) : (
                <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl py-6 px-4 border border-blue-100">
                  <p className="text-xs text-blue-500 font-semibold uppercase tracking-widest mb-1">Price Estimate</p>
                  <p className="text-5xl font-black text-blue-700 tracking-tight">
                    {formatCOP(result.precioEstimado)}
                  </p>
                  <p className="text-xs text-blue-400 mt-1">In {ciudad}</p>
                </div>
              )}

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
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                {result.sinReferencia ? 'Confirm exact price on WhatsApp' : 'Book at this price on WhatsApp'}
              </button>

              <button
                onClick={handleReset}
                className="text-xs text-gray-400 hover:text-gray-600 text-center transition-colors"
              >
                ↩ Quote another item
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
                Try again
              </button>
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-center text-blue-200 text-xs mt-4">
          The final price is confirmed by our technician on-site. No commitment required.
        </p>
      </div>
    </section>
  )
}

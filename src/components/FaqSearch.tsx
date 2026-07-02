'use client'

import React, { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'

/**
 * Buscador de FAQ que filtra en el cliente SIN romper el SEO/GEO.
 *
 * Estrategia: la lista de preguntas se renderiza en el servidor (SSR), así que
 * los crawlers de Google y los motores de IA siguen viendo TODO el contenido en
 * el HTML. Este componente solo añade interactividad encima: oculta/muestra los
 * <details> existentes según el término de búsqueda, operando sobre el DOM.
 *
 * Requiere que el markup tenga:
 *   - cada pregunta envuelta en un elemento con [data-faq-item]
 *   - cada grupo envuelto en un elemento con [data-faq-group]
 */
export default function FaqSearch() {
  const [query, setQuery] = useState('')
  const [noResults, setNoResults] = useState(false)

  // Soporta /preguntas-frecuentes?q=término (target del SearchAction del schema
  // WebSite). Se lee en el cliente al montar para no afectar el SSR/estática.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q')
    if (q) setQuery(q)
  }, [])

  useEffect(() => {
    const term = query.trim().toLowerCase()

    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-faq-item]'))
    let visible = 0

    items.forEach((el) => {
      const text = (el.textContent || '').toLowerCase()
      const match = term === '' || text.includes(term)
      el.classList.toggle('hidden', !match)
      if (match) visible++
    })

    // Oculta los encabezados de grupo que se quedaron sin preguntas visibles
    document.querySelectorAll<HTMLElement>('[data-faq-group]').forEach((group) => {
      const anyVisible = group.querySelector('[data-faq-item]:not(.hidden)')
      group.classList.toggle('hidden', !anyVisible)
    })

    setNoResults(term !== '' && visible === 0)

    // Al desmontar, restaura todo (evita dejar elementos ocultos si se navega)
    return () => {
      items.forEach((el) => el.classList.remove('hidden'))
      document
        .querySelectorAll<HTMLElement>('[data-faq-group]')
        .forEach((g) => g.classList.remove('hidden'))
    }
  }, [query])

  return (
    <div className="mb-8">
      <label htmlFor="faq-search" className="sr-only">
        Buscar en preguntas frecuentes
      </label>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca tu duda: secado, manchas, precio, garantía…"
          className="w-full rounded-full border border-gray-200 bg-white py-3.5 pl-12 pr-12 text-gray-800 shadow-sm focus:border-[#3AAA35] focus:outline-none focus:ring-2 focus:ring-[#3AAA35]/30 transition"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
            aria-label="Limpiar búsqueda"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {noResults && (
        <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-800">
          No encontramos una pregunta con <strong>“{query}”</strong>. Escríbenos por WhatsApp y te
          respondemos directo:{' '}
          <a
            href={`https://wa.me/573128052720?text=${encodeURIComponent(
              `Hola, tengo una duda sobre: ${query}`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:no-underline"
          >
            abrir WhatsApp
          </a>
          .
        </div>
      )}
    </div>
  )
}

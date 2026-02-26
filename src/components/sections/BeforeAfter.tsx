'use client'

import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft } from 'lucide-react'

// Aquí definimos los 3 casos de tu Plan 360°
const cases = [
  {
    id: 'sofa',
    title: 'Muebles y Sofás',
    description: 'Extracción de manchas incrustadas y recuperación del color original de la tela.',
    before: '/images/antes-despues/antes-mueble.webp',
    after: '/images/antes-despues/despues-mueble.webp',
  },
  {
    id: 'colchon',
    title: 'Colchones',
    description: 'Eliminación profunda de ácaros, piel muerta y neutralización de olores.',
    before: '/images/antes-despues/antes-colchon.webp',
    after: '/images/antes-despues/despues-colchon.webp',
  },
  {
    id: 'alfombra',
    title: 'Alfombras y Tapetes',
    description: 'Restauración de fibras y lavado anti-bacterias sin dañar los tejidos.',
    before: '/images/antes-despues/antes-tapete.webp',
    after: '/images/antes-despues/despues-tapete.webp',
  }
]

export default function BeforeAfter() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reiniciamos la barra al centro cada vez que cambian de servicio
  useEffect(() => {
    setSliderPosition(50)
  }, [activeSlide])

  // Lógica matemática para calcular la posición exacta del dedo/mouse
  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX)
  const stopDragging = () => setIsDragging(false)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Resultados reales, sin filtros</h2>
        <p className="text-gray-600 mb-10">
          Selecciona un servicio y desliza la barra para ver la suciedad que extraemos en nuestro Plan 360°.
        </p>
        
        {/* Pestañas de navegación táctil (Evita conflictos al deslizar) */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {cases.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveSlide(index)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeSlide === index 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Contenedor Interactivo del Slider */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-xl border border-gray-100">
          <div 
            ref={containerRef}
            className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none bg-gray-200"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={stopDragging}
            onTouchMove={handleTouchMove}
          >
            {/* Imagen AFTER (La versión limpia - actúa como fondo) */}
            <Image 
              src={cases[activeSlide].after}
              alt={`${cases[activeSlide].title} limpio`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover pointer-events-none"
            />

            {/* Imagen BEFORE (La versión sucia - se recorta dinámicamente) */}
            <div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <Image 
                src={cases[activeSlide].before}
                alt={`${cases[activeSlide].title} sucio`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover pointer-events-none"
              />
            </div>

            {/* La línea divisoria y el tirador central */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white drop-shadow-[0_0_5px_rgba(0,0,0,0.5)] z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center pointer-events-none">
                <ChevronLeft className="w-6 h-6 text-blue-600" />
                <ChevronRight className="w-6 h-6 text-blue-600 -ml-3" />
              </div>
            </div>
            
            {/* Etiquetas Superiores */}
            <div className="absolute top-4 left-4 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm z-0">
              ANTES
            </div>
            <div className="absolute top-4 right-4 bg-green-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm z-0">
              DESPUÉS
            </div>
          </div>
          
          <p className="mt-5 text-gray-700 font-medium text-center">
            {cases[activeSlide].description}
          </p>
        </div>
      </div>
    </section>
  )
}
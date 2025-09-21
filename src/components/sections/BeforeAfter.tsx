'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const benefits = [
    "Eliminación del 99.9% de bacterias y ácaros",
    "Recuperación del color y textura original",
    "Ambiente más saludable para tu familia"
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Resultados que Hablan</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Slider */}
          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* Imagen Antes */}
            <div className="relative w-full h-96">
              <Image 
                src="/images/antes-despues/despues-sofa.webp"
                alt="Antes"
                fill
                sizes="100vw"
                loading="lazy"
                decoding="async"
                className="object-cover"
              />
            </div>
            
            {/* Imagen Después */}
            <div 
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-96">
                <Image 
                  src="/images/antes-despues/antes-sofa.webp"
                  alt="Después"
                  fill
                  sizes="100vw"
                  loading="lazy"
                  decoding="async"
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Línea divisora */}
            <div 
              className="absolute top-0 h-full w-1 bg-white shadow-lg"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
                <div className="flex space-x-1">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
            
            {/* Etiquetas */}
            <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              ANTES
            </div>
            <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              DESPUÉS
            </div>
          </div>
          
          {/* Información */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Transformación Total</h3>
            <p className="text-gray-600 text-lg">
              Nuestro proceso de limpieza profunda no solo elimina la suciedad visible, 
              sino que también restaura los colores originales y elimina olores persistentes. 
              Utilizamos equipos de última tecnología y productos eco-amigables.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-center animate-fadeInLeft"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            
            <a 
              href="https://wa.me/573128052720?text=Quiero%20ver%20más%20resultados%20de%20antes%20y%20después"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ver más resultados
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfter
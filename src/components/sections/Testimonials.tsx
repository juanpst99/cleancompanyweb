'use client'

import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      text: "Excelente servicio! Mis muebles quedaron como nuevos. La puntualidad y profesionalismo del equipo es destacable.",
      rating: 5,
      service: "Limpieza de Muebles"
    },
    {
      id: 2,
      name: "Carlos Méndez",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
      text: "Contraté el servicio para mi oficina. Quedé impresionado con los resultados. 100% recomendado.",
      rating: 5,
      service: "Servicio Empresarial"
    },
    {
      id: 3,
      name: "Ana Gómez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
      text: "Mi colchón tenía años sin limpiarse. Ahora duermo tranquila sabiendo que está libre de ácaros. Servicio impecable.",
      rating: 5,
      service: "Limpieza de Colchones"
    },
    {
      id: 4,
      name: "Roberto Silva",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
      text: "Las alfombras de mi casa quedaron espectaculares. Eliminaron manchas que creí imposibles de quitar.",
      rating: 5,
      service: "Limpieza de Alfombras"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Lo que Dicen Nuestros Clientes
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative">
            {/* Decoración */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-400 p-3 rounded-full shadow-lg">
                <Star className="w-6 h-6 text-white fill-current" />
              </div>
            </div>
            
            {/* Testimonial actual */}
            <div className="text-center">
              <img 
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-24 h-24 rounded-full mx-auto mb-6 object-cover shadow-lg"
              />
              <h4 className="font-bold text-xl mb-2">{testimonials[activeIndex].name}</h4>
              <p className="text-blue-600 text-sm mb-4">{testimonials[activeIndex].service}</p>
              
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 text-lg italic max-w-2xl mx-auto">
                "{testimonials[activeIndex].text}"
              </p>
            </div>
            
            {/* Controles */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevious}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              
              {/* Indicadores */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 h-3 bg-blue-600 rounded-full' 
                        : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={handleNext}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
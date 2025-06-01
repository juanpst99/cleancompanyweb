'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse delay-700"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white max-w-3xl mx-auto">
          <Sparkles className="w-16 h-16 mx-auto mb-6 animate-float" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp">
            ¿Listo para Transformar tus Espacios?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeInUp animation-delay-200">
            Cotiza ahora y recibe <span className="text-yellow-400 font-bold">20% de descuento</span> en tu primera limpieza
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 animate-fadeInUp animation-delay-400">
            <h3 className="text-2xl font-semibold mb-4">Promoción por tiempo limitado</h3>
            <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Válido para nuevos clientes
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Aplica en todos nuestros servicios
              </li>
              <li className="flex items-center">
                <span className="text-yellow-400 mr-2">✓</span>
                Sin letra pequeña ni condiciones ocultas
              </li>
            </ul>
          </div>
          
          <a 
            href="https://wa.me/573128052720?text=Hola,%20quiero%20aprovechar%20el%2020%%20de%20descuento%20en%20mi%20primera%20limpieza."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl animate-fadeInUp animation-delay-600"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z"/>
            </svg>
            Cotizar con Descuento
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTA
'use client'

import React from 'react'
import { Phone, ChevronDown } from 'lucide-react'

const Hero = () => {
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#servicios')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white space-y-6 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight animate-fadeInUp">
              Limpieza Profesional que <span className="text-yellow-400">Transforma</span>
            </h2>
            <p className="text-lg sm:text-xl opacity-90 animate-fadeInUp animation-delay-200">
              Expertos en limpieza de tapetes, alfombras, muebles y colchones en Medellín y Bogotá. 
              Resultados garantizados desde 2015.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400 justify-center md:justify-start">
              <a 
                href="https://wa.me/573128052720?text=Hola,%20quiero%20cotizar%20un%20servicio%20de%20limpieza."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Cotizar por WhatsApp</span>
              </a>
              <a 
                href="#servicios"
                onClick={handleScrollToServices}
                className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg text-center"
              >
                Ver Servicios
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 animate-fadeInUp animation-delay-600">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">10+</h3>
                <p className="text-sm sm:text-base opacity-90">Años de experiencia</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">5000+</h3>
                <p className="text-sm sm:text-base opacity-90">Clientes satisfechos</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">100%</h3>
                <p className="text-sm sm:text-base opacity-90">Garantía</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float mt-8 md:mt-0">
            <img 
              src="/images/hero/alfombras.webp"
              alt="Limpieza profesional"
              title="alfombras - Clean Company"
              className="rounded-2xl shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-500 w-full max-w-md mx-auto"
            />
            {/* Badge de descuento - posición ajustada para móviles */}
            <div className="absolute -top-4 -right-4 md:-top-4 md:-right-4 bg-yellow-400 text-blue-900 p-4 sm:p-6 rounded-2xl shadow-xl animate-bounce">
              <div className="text-2xl sm:text-3xl font-bold">20%</div>
              <div className="text-xs sm:text-sm">Descuento primera vez</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white opacity-60" />
      </div>
    </section>
  )
}

export default Hero
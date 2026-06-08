'use client'

import React from 'react'
import Image from 'next/image'
import { Phone, ChevronDown, Check } from 'lucide-react'
import WhatsAppLink from '@/components/WhatsAppLink'
import { SITE, PRICING, formatCOP } from '@/config/site'

const Hero = () => {
  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.querySelector('#servicios')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.dataLayer?.push({
        event: 'navigation_click',
        navigation_target: 'servicios',
        navigation_location: 'hero_cta'
      })
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
            {/* Respuesta factual al frente ("front-loading"): los motores de IA
                citan sobre todo el primer tercio de la página. Incluye qué, dónde,
                método, precio ancla y CTA en una sola frase legible por máquina. */}
            <p className="text-lg sm:text-xl opacity-95 animate-fadeInUp animation-delay-200 max-w-xl mx-auto md:mx-0">
              Lavamos <strong className="font-semibold text-white">alfombras, muebles y colchones a domicilio</strong> en
              Bogotá y Medellín. Recogemos, lavamos por inyección-extracción y entregamos con garantía —
              <strong className="font-semibold text-yellow-300"> desde {formatCOP(PRICING.minDomicilioCOP)}</strong> y
              cotización por WhatsApp en minutos.
            </p>

            {/* CTA primario dominante + secundario discreto (jerarquía de decisión) */}
            <div className="space-y-3 animate-fadeInUp animation-delay-400">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
                <WhatsAppLink
                  message="Hola, quiero cotizar un servicio de limpieza."
                  className="w-full sm:w-auto bg-green-500 text-white px-8 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-green-900/30"
                >
                  <Phone className="w-5 h-5" />
                  <span>Cotizar gratis por WhatsApp</span>
                </WhatsAppLink>
                <a
                  href="#servicios"
                  onClick={handleScrollToServices}
                  className="text-white/90 font-medium underline underline-offset-4 decoration-white/40 hover:decoration-white hover:text-white transition px-2 py-2"
                >
                  Ver servicios
                </a>
              </div>

              {/* Reversión de riesgo junto al CTA (reduce fricción de decisión) */}
              <p className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-sm text-white/85">
                <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-green-300" /> {SITE.guarantee.short}</span>
                <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-green-300" /> Pagas después del servicio</span>
                <span className="inline-flex items-center gap-1"><Check className="w-4 h-4 text-green-300" /> Sin compromiso</span>
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-12 animate-fadeInUp animation-delay-600">
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">{SITE.yearsLabel}</h3>
                <p className="text-sm sm:text-base opacity-90">Años de experiencia</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">+{SITE.clientsServed.toLocaleString('es-CO')}</h3>
                <p className="text-sm sm:text-base opacity-90">Clientes satisfechos</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">100%</h3>
                <p className="text-sm sm:text-base opacity-90">Garantía</p>
              </div>
            </div>
          </div>
          
          <div className="relative animate-float mt-8 md:mt-0">
            <div className="relative aspect-[4/3] w-full max-w-md mx-auto">
            <Image 
              src="/images/hero/alfombras.webp"
              alt="Limpieza profesional de alfombras y tapetes - Clean Company"
              title="alfombras - Clean Company"
              fill
              priority 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-2xl shadow-2xl transform md:rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            </div>
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
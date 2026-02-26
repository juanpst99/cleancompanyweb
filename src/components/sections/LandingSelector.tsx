'use client'

import React, { useState } from 'react'
import { CheckCircle2, MapPin, Sparkles } from 'lucide-react'
import { trackWhatsAppClick } from '@/lib/whatsappTracker'

const services = [
  { id: 'muebles', name: 'Muebles y Sofás', icon: '🛋️' },
  { id: 'colchones', name: 'Colchones', icon: '🛏️' },
  { id: 'alfombras', name: 'Alfombras/Tapetes', icon: '🧶' },
  { id: 'plan360', name: 'Plan 360° (Recomendado)', icon: '⭐', highlight: true },
]

const cities = ['Bogotá', 'Medellín']

export default function LandingSelector() {
  const [selectedService, setSelectedService] = useState('plan360')
  const [selectedCity, setSelectedCity] = useState('Bogotá')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleWhatsAppRedirect = () => {
    setIsSubmitting(true)
    
    // Capturamos el clic y los parámetros (fbclid) antes de salir de la web
    const shortId = trackWhatsAppClick('', '') 

    const serviceName = services.find(s => s.id === selectedService)?.name
    
    // El mensaje está diseñado para quitarle la fricción de pensar qué escribir
    const message = `Hola Clean Company 👋 Quiero cotizar el servicio de *${serviceName}* en *${selectedCity}*. Tengo fotos y medidas. ¿Me ayudas con la disponibilidad por favor?\n\n(Ref: ${shortId})`
    
    const whatsappUrl = `https://wa.me/573128052720?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    setIsSubmitting(false)
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 sm:p-8 border border-gray-100 relative overflow-hidden">
      {/* Etiqueta de escasez sutil */}
      <div className="absolute top-0 right-0 bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-bl-xl border-b border-l border-red-100 flex items-center">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
        Pocos cupos para hoy
      </div>

      <div className="mb-6 mt-2">
        <h3 className="text-xl font-extrabold text-gray-900 mb-1">Cotiza tu servicio en 2 minutos</h3>
        <p className="text-gray-500 text-sm">Selecciona las opciones para armar tu cotización express</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {services.map((srv) => (
          <button
            key={srv.id}
            onClick={() => setSelectedService(srv.id)}
            className={`relative p-4 rounded-2xl border-2 text-left transition-all duration-200 flex flex-col ${
              selectedService === srv.id 
                ? 'border-blue-600 bg-blue-50' 
                : 'border-gray-100 bg-white hover:border-blue-100 hover:bg-gray-50'
            }`}
          >
            {srv.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
                MEJOR VALOR
              </span>
            )}
            <span className="text-2xl mb-1">{srv.icon}</span>
            <span className={`font-semibold text-sm leading-tight ${selectedService === srv.id ? 'text-blue-900' : 'text-gray-700'}`}>
              {srv.name}
            </span>
            {selectedService === srv.id && (
              <CheckCircle2 className="absolute bottom-3 right-3 w-5 h-5 text-blue-600 animate-fade-in-up" />
            )}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <p className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
          <MapPin className="w-4 h-4 mr-1 text-gray-500" /> Ciudad de servicio
        </p>
        <div className="flex gap-3 bg-gray-100 p-1 rounded-xl">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`flex-1 py-2.5 rounded-lg font-bold text-sm transition-all ${
                selectedCity === city
                  ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
        
        {/* Prueba social dinámica (Neuromarketing) */}
        {selectedCity === 'Medellín' ? (
          <p className="text-xs text-green-600 mt-2 font-medium flex items-center justify-center">
             ✓ Unidades listas para despacho desde nuestra planta en La América.
          </p>
        ) : (
          <p className="text-xs text-green-600 mt-2 font-medium flex items-center justify-center">
             ✓ Rutas de atención prioritaria activas hoy.
          </p>
        )}
      </div>

      <button
        onClick={handleWhatsAppRedirect}
        disabled={isSubmitting}
        className="w-full bg-[#25D366] hover:bg-[#22bf5b] text-white text-lg font-extrabold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
      >
        <svg className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
        Cotizar por WhatsApp
      </button>
      <p className="text-center text-gray-400 text-[11px] mt-4 uppercase tracking-wider font-semibold">
        🔒 Sin compromisos • No cobramos por cotizar
      </p>
    </div>
  )
}
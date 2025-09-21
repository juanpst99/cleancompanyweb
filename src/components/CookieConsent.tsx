'use client'

import React, { useState, useEffect } from 'react'
import { X, Cookie, Shield } from 'lucide-react'

declare global {
  interface Window {
    grantConsent: () => void
    showConsentBanner: () => void
    gtmLoaded: boolean
    loadGTM: () => void
  }
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false)
  
  useEffect(() => {
    // Verificar si ya hay consentimiento previo
    const hasConsent = localStorage.getItem('cookieConsent')
    
    // Mostrar banner si no hay consentimiento previo
    if (!hasConsent) {
      // Esperar un poco antes de mostrar el banner para no ser intrusivo
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
    
    // Exponer función global para mostrar el banner
    window.showConsentBanner = () => {
      setShowBanner(true)
    }
  }, [])
  
  const handleAccept = () => {
    // Otorgar consentimiento usando la función global
    if (window.grantConsent) {
      window.grantConsent()
    }
    setShowBanner(false)
  }
  
  const handleReject = () => {
    // Guardar rechazo en localStorage
    localStorage.setItem('cookieConsent', 'denied')
    setShowBanner(false)
  }
  
  if (!showBanner) return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white shadow-2xl border-t border-gray-200 animate-fadeInUp md:bottom-4 md:left-4 md:right-4 md:rounded-2xl md:max-w-md">
      <button
        onClick={handleReject}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Cookie className="w-8 h-8 text-blue-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
            Configuración de Cookies
            <Shield className="w-4 h-4 text-green-600" />
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            Usamos cookies para mejorar tu experiencia y analizar el tráfico del sitio. 
            Al aceptar, nos ayudas a optimizar nuestros servicios de limpieza.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Aceptar todas
            </button>
            
            <button
              onClick={handleReject}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Solo esenciales
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Puedes cambiar tus preferencias en cualquier momento desde el pie de página.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
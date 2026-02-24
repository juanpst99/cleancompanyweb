'use client'

import { useState, useEffect } from 'react'

export const useWhatsAppNumber = () => {
  // Inicializamos con el número principal para evitar errores de hidratación en Next.js
  const [whatsappNumber, setWhatsappNumber] = useState('573128052720')

  useEffect(() => {
    try {
      // Forzamos la zona horaria de Bogotá, Colombia
      const options = { timeZone: 'America/Bogota', weekday: 'short' as const }
      const weekdayStr = new Intl.DateTimeFormat('en-US', options).format(new Date())

      // 'Sun' corresponde a Sunday (Domingo)
      if (weekdayStr === 'Sun') {
        setWhatsappNumber('573209210866') // Tu línea secundaria (Domingos)
      } else {
        setWhatsappNumber('573128052720') // Tu línea principal (Lunes a Sábado)
      }
    } catch (error) {
      // Fallback de seguridad por si el navegador no soporta Intl
      if (new Date().getDay() === 0) { // 0 es domingo
        setWhatsappNumber('573209210866')
      }
    }
  }, [])

  return whatsappNumber
}
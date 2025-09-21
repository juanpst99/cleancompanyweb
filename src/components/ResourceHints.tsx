'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const ResourceHints = () => {
  const pathname = usePathname()
  
  useEffect(() => {
    // Preload imágenes críticas basadas en la ruta actual
    const preloadImages = () => {
      // Si estamos en home, preload las imágenes principales de servicios
      if (pathname === '/') {
        const criticalImages = [
          '/images/servicios/lavado-tapete.webp',
          '/images/servicios/lavado-muebles.webp',
          '/images/servicios/lavado-colchones.webp',
        ]
        
        criticalImages.forEach(src => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.as = 'image'
          link.href = src
          link.type = 'image/webp'
          document.head.appendChild(link)
        })
      }
      
      // Si estamos en una página de servicio, preload imágenes relacionadas
      if (pathname.includes('/servicios/')) {
        const serviceImages: { [key: string]: string[] } = {
          '/servicios/alfombras': [
            '/images/servicios/lavado-alfombras-bogota.webp',
            '/images/antes-despues/despues-sofa.webp',
          ],
          '/servicios/muebles': [
            '/images/servicios/lavado-muebles-bogota.webp',
          ],
          '/servicios/colchones': [
            '/images/servicios/lavado-colchones-bogota.webp',
          ],
        }
        
        const images = serviceImages[pathname] || []
        images.forEach(src => {
          const img = new Image()
          img.src = src
        })
      }
    }
    
    // Ejecutar con un pequeño delay para no bloquear el thread principal
    const timer = setTimeout(preloadImages, 100)
    
    return () => clearTimeout(timer)
  }, [pathname])
  
  // Precargar fuentes adicionales si usamos variantes
  useEffect(() => {
    // Si usamos variantes de Inter (bold, semibold, etc)
    const fontVariants = [
      { weight: '400', style: 'normal' },
      { weight: '500', style: 'normal' },
      { weight: '600', style: 'normal' },
      { weight: '700', style: 'normal' },
    ]
    
    fontVariants.forEach(variant => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.href = `https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2`
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      
      // Solo agregar si no existe ya
      const existing = document.querySelector(`link[href="${link.href}"]`)
      if (!existing) {
        document.head.appendChild(link)
      }
    })
  }, [])
  
  return null
}

export default ResourceHints
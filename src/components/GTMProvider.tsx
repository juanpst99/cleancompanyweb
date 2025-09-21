'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function GTMProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Inicializar dataLayer global
  useEffect(() => {
    // Asegurar que dataLayer existe
    window.dataLayer = window.dataLayer || []
    
    // Push evento inicial
    window.dataLayer.push({
      event: 'gtm_init',
      page_path: pathname,
      timestamp: new Date().toISOString(),
    })

    // Detectar tipo de dispositivo
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    window.dataLayer.push({
      event: 'device_type',
      device: isMobile ? 'mobile' : 'desktop',
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
    })

    // Detectar origen del tráfico
    const referrer = document.referrer
    if (referrer) {
      const referrerDomain = new URL(referrer).hostname
      window.dataLayer.push({
        event: 'traffic_source',
        referrer_domain: referrerDomain,
        referrer_url: referrer,
      })
    }
  }, [pathname])

  // Track errores de JavaScript
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      window.dataLayer?.push({
        event: 'javascript_error',
        error_message: event.message,
        error_source: event.filename,
        error_line: event.lineno,
        error_column: event.colno,
      })
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])

  // Track clics en enlaces externos
  useEffect(() => {
    const handleExternalLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.href) {
        const url = new URL(target.href)
        const currentDomain = window.location.hostname
        
        if (url.hostname !== currentDomain && !url.hostname.includes('wa.me')) {
          window.dataLayer?.push({
            event: 'external_link_click',
            link_url: target.href,
            link_domain: url.hostname,
            link_text: target.textContent || '',
          })
        }
      }
    }

    document.addEventListener('click', handleExternalLinkClick)
    return () => document.removeEventListener('click', handleExternalLinkClick)
  }, [])

  return <>{children}</>
}
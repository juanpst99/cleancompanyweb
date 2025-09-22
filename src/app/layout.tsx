// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import StructuredData from '@/components/SEO/StructuredData' // Asumo que este componente existe
import Script from 'next/script' // Ya lo tenías importado, lo cual es bueno
import CookieConsent from '@/components/CookieConsent'
import ResourceHints from '@/components/ResourceHints'
import GTMProvider from '@/components/GTMProvider'
// (Opcional recomendado) escucha de pageviews en SPA
// import GTMEvents from '@/components/analytics/GTMEvents'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Evitar FOIT (flash of invisible text)
  preload: true, // Precargar fuente (default es true)
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  variable: '--font-inter', // CSS variable para usar en Tailwind
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cleancompany.com.co'),
  title: {
    default:
      'Clean Company | Lavado de Alfombras, Muebles y Colchones en Bogotá y Medellín',
    template: '%s | Clean Company Colombia', // ← cambio
  },
  description:
    'Servicio profesional de lavado de alfombras, muebles y colchones a domicilio en Bogotá y Medellín. ✓ Limpieza de tapetes ✓ Lavado a vapor ✓ Resultados garantizados ✓ Desde 2015',
  keywords: [
    'clean company',
    'clean company colombia',
    'lavado de alfombras bogotá',
    'lavado de colchones medellín',
    'lavado de muebles a domicilio bogotá',
    'limpieza de tapetes profesionales',
    'lavado de tapetes medellín',
    'servicio de limpieza de muebles en casa',
    'lavado de colchones a vapor bogotá',
    'lavado profesional de muebles medellín',
    'empresa de limpieza de alfombras bogotá',
    'limpieza profesional medellín',
    'lavado de alfombras medellín',
    'limpieza de colchones bogotá',
    'lavado de tapetes bogotá',
    'limpieza a domicilio',
    'desinfección de colchones',
    'limpieza de tapicería',
    'lavado de alfombras a domicilio bogotá',
    'lavado de muebles cerca de mí medellín',
    'servicio de lavado de colchones bogotá norte',
    'limpieza de alfombras persas bogotá',
    'lavado de sofás medellín precio',
    'desinfección de colchones medellín',
    'lavado de tapetes orientales bogotá',
    'limpieza de muebles de cuero bogotá',
    'lavado ecológico de alfombras medellín',
    'servicio 24 horas lavado de alfombras bogotá',
    'lavado de colchones antialérgico medellín',
  ],
  authors: [{ name: 'Clean Company' }],
  creator: 'Clean Company',
  publisher: 'Clean Company',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    title:
      'Clean Company | Lavado de Alfombras, Muebles y Colchones en Bogotá y Medellín',
    description:
      'Expertos en limpieza profesional. Lavado de alfombras, muebles y colchones a domicilio. Servicio garantizado en Bogotá y Medellín.',
    url: 'https://cleancompany.com.co',
    siteName: 'Clean Company',
    images: [
      {
        url: '/images/og-main.png', // ← cambio
        width: 1200,
        height: 630,
        alt:
          'Clean Company - Lavado profesional de alfombras, muebles y colchones',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clean Company - Lavado Profesional en Bogotá y Medellín',
    description:
      'Lavado de alfombras, muebles y colchones a domicilio. Servicio profesional garantizado.',
    images: ['/images/og-main.png'], // ← cambio
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: 'https://cleancompany.com.co' },
  verification: {
    google: 'tu-codigo-de-verificacion',
  },
  // themeColor movido a `viewport`
}

// Nuevo bloque: viewport
export const viewport: Viewport = {
  themeColor: '#3AAA35',
}

// TU ID específico de Google Tag Manager
const GTM_ID = 'GTM-WG2MH57'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CO" className={`${inter.variable} scroll-smooth`}>
      <head>
        {/* Resource Hints para optimización */}
        {/* Preconnect a dominios críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
{/* Preconnect a dominios críticos de analítica */}
<link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="" />
<link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="" />
        
        {/* Prefetch de rutas críticas */}
        <link rel="prefetch" href="/servicios/alfombras" />
        <link rel="prefetch" href="/servicios/muebles" />
        <link rel="prefetch" href="/servicios/colchones" />
        
        {/* Preload de imagen hero crítica */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/hero/alfombras.webp" 
          type="image/webp"
        />
        {/* Consent Mode - Configuración por defecto ANTES de GTM */}
        <Script
          id="consent-mode-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Configurar Consent Mode por defecto (denied)
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Establecer consentimiento por defecto como denegado
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'denied',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 2000
              });
              
              // Función global para otorgar consentimiento
              window.grantConsent = function() {
                gtag('consent', 'update', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'analytics_storage': 'granted',
                  'functionality_storage': 'granted',
                  'personalization_storage': 'granted'
                });
                
                // Guardar consentimiento en localStorage
                localStorage.setItem('cookieConsent', 'granted');
                
                // Disparar evento personalizado
                window.dispatchEvent(new CustomEvent('consentGranted'));
                
                // Cargar GTM si no está cargado
                if (!window.gtmLoaded) {
                  loadGTM();
                }
              };
              
              // Función para cargar GTM
              window.loadGTM = function() {
                if (window.gtmLoaded) return;
                window.gtmLoaded = true;
                
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              };
              
              // Verificar consentimiento previo
              if (localStorage.getItem('cookieConsent') === 'granted') {
                gtag('consent', 'update', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'analytics_storage': 'granted',
                  'functionality_storage': 'granted',
                  'personalization_storage': 'granted'
                });
              }
            `,
          }}
        />
        
        {/* Google Tag Manager - Carga diferida */}
        <Script
          id="gtm-lazy-load"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Cargar GTM después de 3 segundos o en la primera interacción
              let gtmLoadTimer;
              let hasInteracted = false;
              
              function handleInteraction() {
                if (!hasInteracted && !window.gtmLoaded) {
                  hasInteracted = true;
                  clearTimeout(gtmLoadTimer);
                  
                  // Solo cargar si hay consentimiento o después de interacción
                  if (localStorage.getItem('cookieConsent') === 'granted') {
                    window.loadGTM();
                  } else {
                    // Si no hay consentimiento previo, mostrar banner (si existe)
                    if (window.showConsentBanner) {
                      window.showConsentBanner();
                    }
                  }
                  
                  // Remover listeners después de la primera interacción
                  document.removeEventListener('scroll', handleInteraction);
                  document.removeEventListener('click', handleInteraction);
                  document.removeEventListener('touchstart', handleInteraction);
                  document.removeEventListener('mousemove', handleInteraction);
                }
              }
              
              // Listeners para detectar interacción
              document.addEventListener('scroll', handleInteraction, { once: true, passive: true });
              document.addEventListener('click', handleInteraction, { once: true });
              document.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
              document.addEventListener('mousemove', handleInteraction, { once: true, passive: true });
              
              // Timer de respaldo: cargar después de 5 segundos si hay consentimiento previo
              gtmLoadTimer = setTimeout(() => {
                if (localStorage.getItem('cookieConsent') === 'granted' && !window.gtmLoaded) {
                  window.loadGTM();
                }
              }, 5000);
            `,
          }}
        />
        
        <StructuredData />
      </head>
      <body className={`${inter.className} font-sans`}>
        {/* Google Tag Manager (noscript) - Solo se activa si GTM se ha cargado */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        <GTMProvider>
          {/* Pageviews en navegaciones SPA (si usas este componente, descomenta el import) */}
          {/* <GTMEvents /> */}
          {children}
        </GTMProvider>
        <CookieConsent />
        <ResourceHints />
      </body>
    </html>
  )
}

// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StructuredData from '@/components/SEO/StructuredData' // Asumo que este componente existe
import Script from 'next/script'; // Ya lo tenías importado, lo cual es bueno

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://cleancompany.com.co'),
  title: {
    default: 'Clean Company | Lavado de Alfombras, Muebles y Colchones en Bogotá y Medellín',
    template: '%s | Clean Company'
  },
  description: 'Servicio profesional de lavado de alfombras, muebles y colchones a domicilio en Bogotá y Medellín. ✓ Limpieza de tapetes ✓ Lavado a vapor ✓ Resultados garantizados ✓ Desde 2015',
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
    'limpieza de tapicería'
  ],
  authors: [{ name: 'Clean Company' }],
  creator: 'Clean Company',
  publisher: 'Clean Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Clean Company | Lavado de Alfombras, Muebles y Colchones en Bogotá y Medellín',
    description: 'Expertos en limpieza profesional. Lavado de alfombras, muebles y colchones a domicilio. Servicio garantizado en Bogotá y Medellín.',
    url: 'https://cleancompany.com.co',
    siteName: 'Clean Company',
    images: [
      {
        url: '/og-image.jpg', // Asegúrate que esta imagen exista en tu carpeta public
        width: 1200,
        height: 630,
        alt: 'Clean Company - Lavado profesional de alfombras, muebles y colchones',
      }
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clean Company - Lavado Profesional en Bogotá y Medellín',
    description: 'Lavado de alfombras, muebles y colchones a domicilio. Servicio profesional garantizado.',
    images: ['/og-image.jpg'], // Asegúrate que esta imagen exista en tu carpeta public
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
  alternates: {
    canonical: 'https://cleancompany.com.co',
  },
  verification: {
    google: 'tu-codigo-de-verificacion', // Reemplaza con tu código de Google Search Console
  },
};

// TU ID específico de Google Tag Manager
const GTM_ID = 'GTM-WG2MH57'; 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CO" className="scroll-smooth">
      <head>
        {/* Google Tag Manager (script para <head>) */}
        <Script
          id="gtm-script-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        {/* Fin Google Tag Manager */}
        <StructuredData />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript para <body>) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />
        {/* Fin Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  )
}

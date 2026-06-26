/**
 * CSP en modo Report-Only: NO bloquea nada (solo reporta violaciones en la
 * consola del navegador). Punto de partida seguro porque el sitio usa GTM,
 * Google Analytics y Meta Pixel. Promover a `Content-Security-Policy` (enforce)
 * SOLO tras validar que no hay violaciones legítimas.
 */
const CSP_REPORT_ONLY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://www.google.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://connect.facebook.net https://*.facebook.com https://www.google.com https://www.google.com.co https://*.g.doubleclick.net",
  "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Dominios externos permitidos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    
    // Formatos modernos para optimización automática
    formats: ['image/avif', 'image/webp'],
    
    // Tamaños optimizados para diferentes breakpoints
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Minimizar metadata de imágenes
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 año
    
    // Habilitar blur placeholders
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Comprimir assets
  compress: true,

  // Redirecciones de URLs legacy del antiguo sitio WordPress (WP -> Next) para
  // evitar 404 en URLs antiguas que pudieran seguir indexadas y consolidar la
  // señal en la entidad canónica. No hay rutas Next con estos prefijos.
  async redirects() {
    return [
      { source: '/cleaning_services', destination: '/', permanent: true },
      { source: '/cleaning_services/:slug*', destination: '/', permanent: true },
      { source: '/producto', destination: '/', permanent: true },
      { source: '/producto/:slug*', destination: '/', permanent: true },
    ]
  },

  // Cabeceras de seguridad para todas las rutas.
  // Las 4 primeras son seguras (no rompen nada); la CSP va en Report-Only.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(self), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy-Report-Only', value: CSP_REPORT_ONLY },
        ],
      },
    ]
  },
  
  // Configuración de compilación moderna
  compiler: {
    // Eliminar console.logs en producción
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn', 'info'],
    } : false,
  },
  
  // Experimental: usar compilación moderna
  experimental: {
    // Optimizaciones de bundle
    optimizeCss: true,

    // Aumenta el límite del body a 10 MB para recibir fotos de alta
    // resolución en el cotizador visual (/api/quote).
    // Las fotos tomadas desde móvil pueden superar los 4 MB por defecto.
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
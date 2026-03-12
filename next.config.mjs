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
  
  // Configuración de compilación moderna
  compiler: {
    // Eliminar console.logs en producción
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
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
# 🚦 Lighthouse CI - Guía de Performance Testing

## Configuración

Este proyecto está configurado con Lighthouse CI para monitoreo automático del rendimiento.

### Objetivos de Rendimiento

| Categoría | Score Mínimo | Estado |
|-----------|--------------|--------|
| **Performance** | ≥ 85% | ✅ Configurado |
| **Accessibility** | ≥ 90% | ✅ Configurado |
| **Best Practices** | ≥ 95% | ✅ Configurado |
| **SEO** | 100% | ✅ Configurado |

### Core Web Vitals Targets

- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **TBT** (Total Blocking Time): < 300ms
- **SI** (Speed Index): < 3.4s

## 🚀 Comandos Disponibles

### Pruebas Rápidas

```bash
# Prueba rápida local con resumen
npm run test:quick

# Prueba completa con build
npm run test:performance
```

### Pruebas Específicas

```bash
# Solo móvil (configuración por defecto)
npm run lh:mobile

# Solo desktop
npm run lh:desktop

# CI completo (todas las URLs)
npm run lh:ci
```

## 📊 Interpretar Resultados

### Performance Score

El score de performance se calcula basándose en:
- **FCP** (10%): Tiempo hasta primer contenido
- **SI** (10%): Velocidad de carga visual
- **LCP** (25%): Tiempo del elemento más grande
- **TBT** (30%): Tiempo de bloqueo del thread
- **CLS** (25%): Estabilidad visual

### Ubicación de Reportes

Los reportes se guardan en:
```
.lighthouseci/
├── lhr-*.json     # Reportes JSON detallados
├── lhr-*.html     # Reportes HTML visuales
└── manifest.json  # Resumen de todas las pruebas
```

## 🎯 Optimizaciones Implementadas

### 1. **LCP Optimizado** (~2.5s)
- ✅ Next/Image con priority en hero
- ✅ fetchPriority="high" en imagen crítica
- ✅ Preload de imagen hero
- ✅ Formatos AVIF/WebP automáticos

### 2. **Reducción de JS** (~174KB menos)
- ✅ GTM diferido con consent mode
- ✅ Target ES2022 (sin polyfills ES5)
- ✅ Tree-shaking de lucide-react
- ✅ ModularizeImports configurado

### 3. **Optimización de CSS**
- ✅ Tailwind CSS con purge automático
- ✅ Font-display: swap para Inter
- ✅ Critical CSS inline (planned)

### 4. **Resource Hints**
- ✅ Preconnect a Google Fonts
- ✅ DNS-prefetch para GTM/GA
- ✅ Prefetch de rutas críticas
- ✅ Preload de fuente principal

### 5. **Imágenes Optimizadas**
- ✅ Lazy loading automático
- ✅ Sizes responsivos
- ✅ Formatos modernos (AVIF/WebP)
- ✅ Blur placeholders

## 🔧 Troubleshooting

### Error: "Performance score below threshold"

**Causas comunes:**
1. Imágenes no optimizadas
2. JavaScript bloqueante
3. CSS render-blocking
4. Fuentes sin preload

**Soluciones:**
```bash
# Ver oportunidades específicas
npm run lh:local

# Revisar bundle size
npm run build
# Verificar tamaño en .next/analyze/
```

### Error: "Build required"

```bash
# Construir antes de probar
npm run build
npm run lh:ci
```

## 📈 Monitoreo Continuo

### GitHub Actions

El workflow `.github/workflows/lighthouse-ci.yml` ejecuta automáticamente:
- En cada push a `main` o `develop`
- En cada Pull Request
- Comenta resultados en PRs

### Configuración Local

Para desarrollo local continuo:
```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Build + test cuando listo
npm run test:performance
```

## 🎭 Perfiles de Prueba

### Mobile (Default)
- Viewport: 360x640
- Network: Fast 3G
- CPU: 4x slowdown
- User Agent: Android

### Desktop
- Viewport: 1920x1080
- Network: No throttling
- CPU: No slowdown
- User Agent: Desktop Chrome

## ✅ Checklist Pre-Deploy

Antes de hacer deploy, verifica:

- [ ] Performance score ≥ 85%
- [ ] Sin imágenes > 200KB
- [ ] LCP < 2.5s en móvil
- [ ] CLS < 0.1
- [ ] Sin console.logs en producción
- [ ] GTM configurado con consent
- [ ] Todas las imágenes usan next/image
- [ ] Fuentes con font-display: swap

## 📚 Referencias

- [Web.dev Metrics](https://web.dev/metrics/)
- [Lighthouse CI Docs](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Core Web Vitals](https://web.dev/vitals/)
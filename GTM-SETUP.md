# 📊 Google Tag Manager Setup - GTM-WG2MH57

## ✅ Configuración Implementada

### 1. **GTM ID Configurado**
- **Container ID:** `GTM-WG2MH57`
- **Ubicación:** `/src/app/layout.tsx`
- **Estrategia:** LazyOnload con Consent Mode

### 2. **Consent Mode Implementado**
- Por defecto: `denied` para todas las cookies
- Función global: `window.grantConsent()`
- Banner de consentimiento incluido
- Almacenamiento en localStorage

### 3. **Eventos Configurados**

#### 📱 **Eventos de Conversión Principales**

| Evento | Trigger | Datos Enviados |
|--------|---------|----------------|
| `whatsapp_click` | Click en botón WhatsApp | service_type, message, value |
| `phone_click` | Click en teléfono | phone_number, location |
| `form_submit` | Envío de formulario | form_name, form_data |
| `quotation_complete` | Cotización completada | service, city, value |

#### 📈 **Eventos de Engagement**

| Evento | Trigger | Datos |
|--------|---------|-------|
| `page_view` | Cambio de página | page_path, page_title |
| `scroll_depth` | Scroll 25/50/75/90/100% | percentage |
| `time_on_page` | 15/30/60/120/180/300s | engagement_time |
| `navigation_click` | Click en navegación | navigation_target |

#### 🛍️ **Enhanced Ecommerce**

| Evento | Trigger | Datos |
|--------|---------|-------|
| `view_item` | Vista de servicio | item_id, item_name, price |
| `select_item` | Click en servicio | item_id, position |
| `add_to_cart` | Agregar a cotización | service, value |
| `begin_checkout` | Iniciar cotización | items, total_value |

## 🚀 Configuración en GTM Console

### Paso 1: Variables

Crear estas variables en GTM:

```javascript
// Variable: Service Value
function() {
  var service = {{dataLayer.service_type}};
  var values = {
    'alfombras': 150000,
    'muebles': 250000,
    'colchones': 200000,
    'vehiculos': 180000,
    'empresarial': 500000
  };
  return values[service] || 180000;
}
```

### Paso 2: Triggers (Activadores)

#### WhatsApp Conversion
- **Tipo:** Custom Event
- **Nombre evento:** `whatsapp_click`
- **Condiciones:** Todas las páginas

#### Form Submit
- **Tipo:** Custom Event
- **Nombre evento:** `form_submit`
- **Condiciones:** `form_name` contains "cotizacion"

#### Scroll Tracking
- **Tipo:** Custom Event
- **Nombre evento:** `scroll`
- **Condiciones:** `scroll_depth` equals 90

### Paso 3: Tags

#### 1. **Google Analytics 4 - Configuration**
```
Tag Type: GA4 Configuration
Measurement ID: G-XXXXXXXXXX
Send page view: Yes
Trigger: All Pages (con Consent Mode)
```

#### 2. **GA4 - WhatsApp Conversion**
```
Tag Type: GA4 Event
Event Name: conversion
Parameters:
  - send_to: AW-XXXXXXXXX/XXXXXXXXX
  - value: {{Service Value}}
  - currency: COP
  - transaction_id: {{Transaction ID}}
Trigger: WhatsApp Click
```

#### 3. **GA4 - Enhanced Ecommerce**
```
Tag Type: GA4 Event
Event Name: {{Event}}
Parameters: Use dataLayer
Trigger: EE Events (view_item, add_to_cart, etc.)
```

#### 4. **Google Ads - Remarketing**
```
Tag Type: Google Ads Remarketing
Conversion ID: AW-XXXXXXXXX
Custom Parameters:
  - service_type: {{dataLayer.service_type}}
  - city: {{dataLayer.city}}
Trigger: All Pages
```

## 📊 Configuración de Conversiones en Google Ads

### Conversiones Principales

1. **WhatsApp Click**
   - Valor: 150,000 - 500,000 COP (según servicio)
   - Ventana: 30 días
   - Modelo: Data-driven

2. **Formulario Enviado**
   - Valor: 100,000 COP
   - Ventana: 7 días
   - Modelo: Last click

3. **Llamada Telefónica**
   - Valor: 200,000 COP
   - Ventana: 1 día
   - Modelo: Last click

## 🔧 Testing y Debugging

### Usar GTM Preview Mode

1. En GTM Console, click "Preview"
2. Ingresa URL: `https://www.cleancompany.com.co`
3. Verificar que se disparan:
   - `gtm_init` al cargar
   - `page_view` en cada página
   - `whatsapp_click` al hacer click

### Chrome DevTools

```javascript
// Ver todos los eventos
dataLayer

// Filtrar eventos específicos
dataLayer.filter(e => e.event === 'whatsapp_click')

// Ver último evento
dataLayer[dataLayer.length - 1]
```

### GTM Debug Helper

Instalar extensión: [Tag Assistant Legacy](https://chrome.google.com/webstore/detail/tag-assistant-legacy/kejbdjndbnbjgmefkgdddjlbokpfnbik)

## 📈 KPIs a Monitorear

### Métricas Primarias
- **Conversiones WhatsApp:** Meta 50/mes
- **Formularios Completados:** Meta 30/mes
- **Tasa de Engagement:** > 60%
- **Tiempo en Sitio:** > 2 minutos

### Métricas Secundarias
- **Scroll Depth 90%:** > 30%
- **Páginas por Sesión:** > 3
- **Bounce Rate:** < 40%
- **Click en Servicios:** > 70%

## 🎯 Audiencias para Remarketing

### Audiencia 1: Hot Leads
- Condición: `whatsapp_click` O `form_submit`
- Duración: 30 días
- Uso: Campañas de conversión

### Audiencia 2: Interesados en Servicio
- Condición: `view_item` AND `time_on_page > 60`
- Duración: 60 días
- Uso: Remarketing específico

### Audiencia 3: Engaged Users
- Condición: `scroll_depth = 90` AND `pages > 2`
- Duración: 90 días
- Uso: Nurturing

## 🔐 Compliance y Privacidad

### GDPR/LGPD Compliance
- ✅ Consent Mode v2 implementado
- ✅ Default: denied
- ✅ Banner de consentimiento
- ✅ Opción de rechazar

### Datos NO Recolectados
- ❌ Información personal identificable (PII)
- ❌ Datos de tarjetas de crédito
- ❌ Información médica
- ❌ Datos de menores

## 📝 Checklist de Implementación

- [x] GTM instalado con ID correcto
- [x] Consent Mode configurado
- [x] Eventos de conversión implementados
- [x] Enhanced Ecommerce configurado
- [x] Tracking de engagement activo
- [ ] Configurar conversiones en Google Ads
- [ ] Crear audiencias de remarketing
- [ ] Configurar objetivos en GA4
- [ ] Implementar Server-side GTM (opcional)

## 🆘 Troubleshooting

### GTM no carga
1. Verificar Consent Mode
2. Revisar bloqueadores de ads
3. Verificar ID correcto

### Eventos no se disparan
1. Abrir Preview Mode
2. Verificar nombres de eventos
3. Revisar condiciones de triggers

### Conversiones no registran
1. Verificar linker de dominios
2. Revisar ventana de conversión
3. Validar valores enviados

## 📚 Referencias

- [GTM Help Center](https://support.google.com/tagmanager)
- [GA4 Documentation](https://developers.google.com/analytics)
- [Consent Mode Guide](https://developers.google.com/tag-platform/security/guides/consent)
- [Enhanced Ecommerce](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce)
# AUDITORIA META CAPI

> **Historial de correcciones**
> - **C1 CORREGIDO** (2026-03-06): `event_time` ahora se envia como entero Unix en el payload CAPI. Cambios: (1) n8n jsonBody — quitadas comillas y aplicado `Number()` a la expresion de `event_time`; (2) `src/app/api/whatsapp/route.ts` — coercion defensiva `Number(data.event_time)` antes de enviar a n8n. Requiere re-importar `Ads_Clicks (7).json` en n8n.
> - **C2 CORREGIDO** (2026-03-06): 3 call sites en `AlfombrasClient.tsx` (lineas 586, 601, 762) corregidos de `const ref = trackWhatsAppClick()` a `const { ref } = trackWhatsAppClick()`. El mensaje de WhatsApp ahora muestra `(Ref: A3X7K)` en vez de `(Ref: [object Object])`.
> - **C3 CORREGIDO** (2026-03-06): `CTA.tsx` ahora usa `trackWhatsAppClick()` con el mismo patron de `WhatsAppButton.tsx`. Genera `event_id`, dispara Pixel browser-side y webhook server-side, incluye `ref` en el mensaje, usa `setTimeout(250ms)` antes de `window.open()`.

---

## 1. Resumen ejecutivo

El flujo de tracking frontend -> API Route -> n8n -> Meta CAPI esta **correctamente implementado y operativo**. El mecanismo de deduplicacion funciona: se genera un `event_id` unico (UUID v4) en el frontend, se envia al Pixel de Meta via `fbq('track', 'Lead', {...}, { eventID })` y simultaneamente se transmite al servidor via `/api/whatsapp` -> n8n -> Meta CAPI con el mismo valor en el campo `event_id`. Meta deduplica correctamente ambos eventos.

Los 3 problemas criticos detectados en la auditoria inicial fueron corregidos:

1. **C1**: `event_time` ahora se envia como entero Unix (no string) en el payload CAPI.
2. **C2**: Los 3 call sites en `AlfombrasClient.tsx` ahora desestructuran correctamente `trackWhatsAppClick()`.
3. **C3**: `CTA.tsx` ahora usa `trackWhatsAppClick()` con deduplicacion completa.

Quedan pendientes hallazgos de severidad alta y media que no afectan la deduplicacion pero representan riesgos operativos y de match quality.

---

## 2. Estado actual

### CRITICO

Sin hallazgos criticos abiertos.

### ALTO

| # | Hallazgo | Archivo | Impacto |
|---|----------|---------|---------|
| A1 | Graph API v19.0 puede estar deprecada | `Ads_Clicks (7).json` - URL del HTTP Request | Meta depreca versiones del Graph API ~2 anios despues del lanzamiento. v19.0 es de enero 2024. Riesgo de rotura sin previo aviso. |
| A2 | Bearer token hardcodeado en el workflow de n8n | `Ads_Clicks (7).json` - headerParameters | Token de acceso expuesto en texto plano en el JSON exportado. Riesgo de seguridad. Deberia usar credenciales de n8n o variable de entorno. |
| A3 | Si GTM no ha cargado al momento del clic, `fbq` no existe y el evento browser no se dispara | `src/app/layout.tsx` (GTM lazy load) + `src/lib/whatsappTracker.ts` linea 40-48 | GTM carga tras interaccion o 5s con consentimiento. Si el usuario hace clic en WhatsApp antes de que cargue GTM, solo se envia el evento server-side. No hay duplicado que deduplicar (safe), pero se pierde la redundancia browser-side. |

### MEDIO

| # | Hallazgo | Archivo | Impacto |
|---|----------|---------|---------|
| M1 | `LandingSelector.tsx` y `Hero.tsx` no tienen delay antes de `window.open()` | `LandingSelector.tsx:33`, `Hero.tsx:39` | A diferencia de `WhatsAppButton.tsx` y `CTA.tsx` (que usan `setTimeout(250ms)`), estos abren WhatsApp inmediatamente. El `fetch` con `keepalive:true` deberia sobrevivir la navegacion, pero `fbq` podria no completar el beacon antes del cambio de contexto. |
| M2 | No hay mecanismo de retry en la API route si n8n falla | `src/app/api/whatsapp/route.ts` linea 34-43 | Si n8n responde con error o timeout, el evento se pierde silenciosamente. Solo se logea un `console.error`. |
| M3 | `ccAttribution` solo persiste atribucion si hay `gclid`, `wbraid`, `gbraid` o `fbclid` | `src/lib/ccAttribution.ts` linea 45 | Trafico organico o directo no persiste atribucion. `getStoredAttribution()` retorna `null` y campos como `utm_source`, `utm_campaign` se pierden si no hay click ID. |

### BAJO

| # | Hallazgo | Archivo | Impacto |
|---|----------|---------|---------|
| B1 | `useGTM().trackWhatsAppClick` en Hero.tsx es independiente de `whatsappTracker.trackWhatsAppClick` | `Hero.tsx` lineas 8-11, 31-36 | Son dos funciones diferentes: una empuja a dataLayer (GTM/GA4), otra dispara Pixel + webhook. No interfieren entre si pero puede causar confusion de mantenimiento. |
| B2 | Consent Mode por defecto es `denied` para todo | `src/app/layout.tsx` lineas 159-168 | Correcto para compliance, pero si el usuario no acepta cookies, tanto `_fbp` como `_fbc` no estaran disponibles. El evento server CAPI se envia igual pero con match quality reducido. |

---

## 3. Trazabilidad del evento

### Flujo completo del evento Lead (WhatsApp Click)

```
FRONTEND (whatsappTracker.ts)
  |
  |-- 1. Genera eventId = crypto.randomUUID()
  |-- 2. Genera ref = 5 chars aleatorios (para WhatsApp visible)
  |-- 3. Lee _fbp (cookie), construye fbc (cookie o fbclid)
  |-- 4. Captura event_source_url = window.location.href
  |-- 5. Calcula event_time = Math.floor(Date.now() / 1000)
  |
  |-- BROWSER PATH (Pixel):
  |     fbq('track', 'Lead',
  |       { content_name: 'WhatsApp', landing_url },
  |       { eventID: eventId })              <-- eventID para dedup
  |
  |-- SERVER PATH (fetch POST /api/whatsapp):
        Body: { ref, event_id, event_time, event_source_url,
                fbp, fbc, fbclid, nombre, telefono,
                gclid, wbraid, gbraid, landing_url }
        |
        API ROUTE (src/app/api/whatsapp/route.ts)
          |-- Enriquece con: client_user_agent, client_ip_address
          |-- Coercion: Number(event_time) para garantizar entero
          |-- Preserva: event_id, fbp, fbc, etc.
          |-- Reenvia todo a N8N_WEBHOOK_URL
          |
          N8N WORKFLOW (Ads_Clicks)
            |
            |-- Webhook recibe el body completo
            |-- En paralelo:
            |     |-- Append row in sheet (Sheet 1: contabilidad)
            |     |-- Append row in sheet1 (Sheet 2: google clics)
            |
            |-- Despues de Sheet 1 -> nodo If:
            |     Condicion: event_id no vacio
            |     |
            |     SI -> HTTP Request a Meta CAPI:
            |           POST https://graph.facebook.com/v19.0/{pixel_id}/events
            |           Authorization: Bearer {token}
            |           Body: {
            |             data: [{
            |               event_name: "Lead",
            |               event_time: 1709742000,  <-- entero Unix (corregido)
            |               event_id: "uuid-...",    <-- mismo UUID del browser
            |               action_source: "website",
            |               event_source_url: "https://...",
            |               user_data: { fbp, fbc, client_user_agent, client_ip_address },
            |               custom_data: { content_name: "WhatsApp", ref, currency: "COP" }
            |             }]
            |           }
            |     NO -> evento no se envia a Meta (correcto: sin event_id no hay que deduplicar)
```

### Puntos de entrada que usan trackWhatsAppClick

| Componente | Archivo | Estado |
|------------|---------|--------|
| WhatsAppButton | `src/components/WhatsAppButton.tsx:15` | OK: `const { ref } = trackWhatsAppClick()` + `setTimeout(250ms)` |
| LandingSelector | `src/components/sections/LandingSelector.tsx:25` | OK: `const { ref } = trackWhatsAppClick('', '')` (sin delay, ver M1) |
| Hero | `src/components/sections/Hero.tsx:31` | OK: `const { ref } = getWhatsAppRef('Hero General', '')` (sin delay, ver M1) |
| Contact | `src/components/sections/Contact.tsx:22` | OK: dispara tracking correctamente |
| ColchonesClient | `src/app/servicios/colchones/ColchonesClient.tsx:71` | OK: `const { ref } = trackWhatsAppClick(...)` |
| MueblesClient | `src/app/servicios/muebles/MueblesClient.tsx:71` | OK: `const { ref } = trackWhatsAppClick(...)` |
| AlfombrasClient | `src/app/servicios/alfombras/AlfombrasClient.tsx:68,285,586,601,762` | OK: todos corregidos (C2) |
| CTA | `src/components/sections/CTA.tsx:8-14` | OK: instrumentado con tracking completo (C3) |

---

## 4. Analisis de deduplicacion

### Veredicto: La deduplicacion **FUNCIONA correctamente**

**Justificacion tecnica:**

1. **Origen del `event_id`**: Se genera en `whatsappTracker.ts:24-27` como `crypto.randomUUID()` (UUID v4, 128 bits de entropia). Fallback a `${Date.now()}-${random hex}` si crypto no esta disponible. Riesgo de colision: practicamente nulo.

2. **Browser path**: `fbq('track', 'Lead', {...}, { eventID: eventId })` en `whatsappTracker.ts:42-47`. Meta Pixel envia este `eventID` con el evento.

3. **Server path**: El mismo `eventId` se envia como `event_id` en el body del POST a `/api/whatsapp` (linea 58), pasa intacto por la API route (no se transforma), llega a n8n como `$node["Webhook"].json.body.event_id`, y se inyecta en el payload CAPI.

4. **Formato consistente**: El UUID es un string en ambos paths (ej: `"a1b2c3d4-e5f6-7890-abcd-ef1234567890"`). No se trunca, no se transforma, no se hashea.

5. **Mismo `event_name`**: Ambos paths envian `"Lead"`. Meta deduplica por la combinacion de `event_name` + `event_id`.

6. **Nodo condicional en n8n**: El nodo `If` verifica que `event_id` no este vacio antes de enviar a Meta CAPI. Si por alguna razon llega vacio, no se envia el evento server-side (evita duplicados sin dedup key).

7. **Cobertura completa**: Todos los puntos de clic a WhatsApp del proyecto ahora pasan por `trackWhatsAppClick()`, garantizando que cada conversion genera un `event_id` compartido entre browser y server.

### Riesgo residual de deduplicacion

- Si GTM/Pixel no ha cargado cuando el usuario hace clic (ver A3), solo se dispara el evento server-side. En este caso no hay evento browser que deduplicar, asi que Meta cuenta **1 evento** (correcto).
- Si la API route falla o n8n esta caido, solo se dispara el evento browser. Meta cuenta **1 evento** (correcto).
- Si ambos disparan exitosamente, Meta recibe 2 eventos con el mismo `event_name=Lead` + `event_id=UUID`, y deduplica a **1 evento** (correcto).

**Conclusion: La deduplicacion esta correctamente implementada. No se detecta doble conteo ni perdida estructural del `event_id`.**

---

## 5. Analisis de match quality

### Parametros evaluados

| Parametro | Se captura | Se transporta | Llega a Meta CAPI | Estado |
|-----------|-----------|---------------|-------------------|--------|
| `fbp` | SI: `getCookie('_fbp')` en whatsappTracker.ts:32 | SI: body.fbp -> API route -> n8n | SI: `user_data.fbp` | OK |
| `fbc` | SI: cookie `_fbc` o construido desde `fbclid` en whatsappTracker.ts:10-14 | SI: body.fbc -> API route -> n8n | SI: `user_data.fbc` | OK |
| `client_ip_address` | SI: extraido de `x-forwarded-for` o `x-real-ip` en route.ts:5-9 | SI: data.client_ip_address -> n8n | SI: `user_data.client_ip_address` | OK |
| `client_user_agent` | SI: `request.headers.get('user-agent')` en route.ts:21 | SI: data.client_user_agent -> n8n | SI: `user_data.client_user_agent` | OK |
| `event_source_url` | SI: `window.location.href` en whatsappTracker.ts:35 | SI: con fallback a referer/landing_url en route.ts:28-29 | SI: campo `event_source_url` | OK |
| `event_time` | SI: `Math.floor(Date.now()/1000)` en whatsappTracker.ts:36 | SI: coercion `Number()` en route.ts:25 | SI: entero Unix en payload CAPI (corregido C1) | OK |
| `fn` (nombre) | Capturado en algunos call sites | SI: body.nombre | NO: no se incluye en user_data del payload CAPI | MEJORA POSIBLE |
| `ph` (telefono) | Capturado en algunos call sites | SI: body.telefono | NO: no se incluye en user_data del payload CAPI | MEJORA POSIBLE |
| `fbclid` | SI: desde URL via ccAttribution.ts:35 | SI: body.fbclid | No directamente: se usa para construir `fbc`, no se envia como campo separado | OK (fbc es suficiente) |

### Evaluacion de match quality esperada

- **Con fbp + fbc + IP + UA**: Meta puede lograr un match quality **bueno** (estimado 6-8/10 en el Event Match Quality score).
- **Sin datos PII hasheados** (email, telefono, nombre): el match quality no alcanza el maximo. Si se tienen nombre y telefono, agregarlos hasheados en SHA256 a `user_data` mejoraria significativamente el match.
- **Dependencia de cookies**: si el usuario no acepto cookies (Consent Mode denied), `_fbp` y `_fbc` seran vacios. El match dependera solo de IP + UA, lo cual es debil.

### Campos que NO requieren hash (confirmado correcto)

Segun la documentacion de Meta CAPI, los siguientes campos se envian en texto plano (no hasheados):
- `fbp` - correcto
- `fbc` - correcto
- `client_ip_address` - correcto
- `client_user_agent` - correcto

---

## 6. Validacion del payload de Meta

### Payload actual (reconstruido desde n8n, post-correccion C1)

```json
{
  "data": [
    {
      "event_name": "Lead",
      "event_time": 1709742000,             // OK: entero Unix (corregido)
      "event_id": "a1b2c3d4-...",           // OK: string UUID
      "action_source": "website",           // OK
      "event_source_url": "https://...",    // OK
      "user_data": {
        "fbp": "fb.1.1709...",              // OK
        "fbc": "fb.1.1709...",              // OK (o vacio)
        "client_user_agent": "Mozilla/...", // OK
        "client_ip_address": "1.2.3.4"     // OK
      },
      "custom_data": {
        "content_name": "WhatsApp",         // OK
        "ref": "A3X7K",                     // OK (para tracking interno)
        "currency": "COP"                   // OK
      }
    }
  ]
}
```

### Validacion campo por campo

| Campo | Esperado por Meta | Estado actual | Veredicto |
|-------|-------------------|---------------|-----------|
| `event_name` | String: nombre estandar o custom | `"Lead"` | OK |
| `event_time` | Entero Unix (seconds) | Entero Unix (corregido C1) | OK |
| `event_id` | String unico | UUID v4 string | OK |
| `action_source` | String enum | `"website"` | OK |
| `event_source_url` | String URL | URL completa | OK |
| `user_data` | Objeto con campos especificos | Presente con fbp, fbc, ua, ip | OK |
| `user_data.fbp` | String | Valor de cookie o vacio | OK |
| `user_data.fbc` | String | Valor de cookie/construido o vacio | OK |
| `user_data.client_user_agent` | String | User-Agent del request | OK |
| `user_data.client_ip_address` | String IPv4/IPv6 | IP del forwarded header | OK |
| `custom_data` | Objeto libre | Presente | OK |
| Estructura `data` | Array de objetos | Array con 1 objeto | OK |
| Endpoint | `graph.facebook.com/v{X}/{pixel_id}/events` | `v19.0/1202018205254794/events` | OK pero version antigua (A1) |
| Auth header | `Bearer {access_token}` | Presente | OK (pero hardcodeado, A2) |
| Content-Type | Depende de n8n httpRequest | n8n envia JSON por defecto | OK |

### Campos opcionales que podrian mejorar match quality

- `user_data.ph` - telefono hasheado SHA256 (disponible en el body como `telefono`)
- `user_data.fn` - nombre hasheado SHA256 (disponible en el body como `nombre`)
- `user_data.ct` - ciudad hasheada SHA256 (disponible en algunos call sites)
- `user_data.country` - hash de "co" (Colombia)
- `user_data.external_id` - podria usar el `ref` como ID externo

---

## 7. Riesgos tecnicos detectados

### 1. Race condition potencial en tracking (M1)
En `LandingSelector.tsx` y `Hero.tsx`, `window.open()` se ejecuta inmediatamente despues de `trackWhatsAppClick()`. Aunque `fetch` con `keepalive:true` deberia sobrevivir la navegacion, `fbq()` podria no completar el beacon HTTP antes del cambio de contexto. `WhatsAppButton.tsx` y `CTA.tsx` correctamente usan `setTimeout(250ms)`.

### 2. Token de Meta expuesto (A2)
El Bearer token del Graph API esta hardcodeado en el JSON del workflow n8n. Si este archivo se comparte o se versiona, el token queda expuesto.

### 3. Graph API v19.0 proxima a deprecacion (A1)
La URL del HTTP Request en n8n usa `v19.0` (enero 2024). Meta depreca versiones ~2 anios despues del lanzamiento. Deberia actualizarse a `v21.0` o superior.

### 4. Pixel puede no estar disponible en el primer clic (A3)
GTM se carga de forma diferida (tras interaccion o 5s con consentimiento). Si el usuario hace clic en WhatsApp antes de que GTM cargue, `fbq` no existe y solo se envia el evento server-side. La deduplicacion no se rompe (solo hay 1 evento), pero se pierde la redundancia browser-side.

### 5. Sin reintentos para eventos fallidos (M2)
Si n8n devuelve error, la API route logea el error pero no reintenta. El evento server-side se pierde silenciosamente.

### 6. Atribucion limitada para trafico organico (M3)
`ccAttribution.ts` solo persiste datos si hay un click ID (`gclid`, `fbclid`, etc.). Trafico organico con UTMs pero sin click IDs pierde los parametros UTM al navegar entre paginas.

---

## 8. Plan de accion recomendado

### Fase 1: Mejoras de alta prioridad (proxima iteracion)

1. **Actualizar Graph API version**: Cambiar `v19.0` a `v21.0` (o la ultima estable) en la URL del HTTP Request de n8n.

2. **Mover Bearer token a credenciales de n8n**: Usar el sistema de credenciales nativo de n8n o variables de entorno en vez de hardcodear el token.

3. **Agregar delay consistente**: Aplicar el patron `setTimeout(250ms)` de WhatsAppButton/CTA a LandingSelector y Hero antes de `window.open()`.

### Fase 2: Mejoras de match quality

4. **Agregar PII hasheado al payload CAPI**: Si `nombre` y `telefono` estan disponibles, hashearlos con SHA256 y agregarlos como `user_data.fn` y `user_data.ph` en el nodo HTTP Request de n8n.

5. **Persistir UTMs sin click ID**: Modificar `ccAttribution.ts` para guardar atribucion cuando hay UTMs aunque no haya click ID.

---

## 9. Solucion principal recomendada

El mayor riesgo operativo abierto es **A1 (Graph API v19.0)**. Meta depreca versiones del Graph API aproximadamente 2 anios despues de su lanzamiento. La version 19.0 data de enero 2024, por lo que esta proxima a su fin de vida o ya fuera del periodo de soporte.

**Solucion recomendada**: Actualizar la URL del HTTP Request en n8n de `v19.0` a `v21.0` (o la version estable mas reciente). Este cambio es de una sola linea en el nodo HTTP Request y elimina el riesgo de rotura por deprecacion.

Como medida complementaria, migrar el Bearer token hardcodeado a credenciales nativas de n8n (A2) para evitar exposicion accidental del token.

---

## 10. Cambios minimos requeridos

| Archivo | Cambio | Justificacion |
|---------|--------|---------------|
| **`Ads_Clicks (7).json`** (URL del HTTP Request) | Actualizar `v19.0` a `v21.0` en la URL del endpoint | A1: evitar deprecacion de API |
| **`Ads_Clicks (7).json`** (headerParameters) | Migrar Bearer token a credenciales de n8n | A2: seguridad del token |
| **`src/components/sections/LandingSelector.tsx`** | Agregar `setTimeout(250ms)` antes de `window.open()` | M1: dar tiempo al beacon de fbq |
| **`src/components/sections/Hero.tsx`** | Agregar `setTimeout(250ms)` antes de `window.open()` | M1: dar tiempo al beacon de fbq |

---

## 11. Estado posterior a correcciones

### Resuelto

| ID | Descripcion | Fecha |
|----|-------------|-------|
| C1 | `event_time` enviado como entero Unix en payload CAPI | 2026-03-06 |
| C2 | Desestructuracion corregida en 3 call sites de AlfombrasClient.tsx | 2026-03-06 |
| C3 | CTA.tsx instrumentado con `trackWhatsAppClick()` y deduplicacion completa | 2026-03-06 |

### Pendiente

| ID | Severidad | Descripcion |
|----|-----------|-------------|
| A1 | Alta | Graph API v19.0 proxima a deprecacion — actualizar a v21.0 |
| A2 | Alta | Bearer token hardcodeado en workflow n8n — migrar a credenciales |
| A3 | Alta | Pixel no disponible si GTM no ha cargado antes del primer clic |
| M1 | Media | LandingSelector y Hero sin delay antes de window.open() |
| M2 | Media | Sin retry en API route si n8n falla |
| M3 | Media | Atribucion no persiste UTMs sin click ID |
| B1 | Baja | Dos funciones trackWhatsAppClick independientes en Hero.tsx |
| B2 | Baja | Consent Mode denied por defecto reduce match quality sin cookies |

### Nueva prioridad tecnica

**No hay hallazgos criticos abiertos.** La deduplicacion Meta funciona correctamente en todos los puntos de entrada. El payload CAPI es valido y completo en sus campos obligatorios.

La siguiente prioridad es **A1 + A2** (actualizar version de Graph API y securizar token), seguido de **M1** (homogeneizar delay en todos los call sites) para maximizar la confiabilidad del beacon de Pixel.

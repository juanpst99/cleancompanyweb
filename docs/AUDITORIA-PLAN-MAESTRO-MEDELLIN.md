# AUDITORÍA INTEGRAL Y PLAN MAESTRO — CLEAN COMPANY MEDELLÍN
## Sistema Comercial Masivo: Rediseño Completo
### Fecha: 19 de marzo de 2026

---

## 1. RESUMEN EJECUTIVO

### Hallazgos principales

1. **El tracking (Pixel + CAPI + deduplicación) está bien implementado.** Es una de las mejores partes del stack. La señal es limpia, la deduplicación por eventId funciona, y el pipeline n8n→CAPI es sólido.

2. **La landing `/promo/hogar-saludable` es técnicamente competente pero comercialmente genérica.** Headline débil, social proof insuficiente (1 testimonio), urgencia cosmética sin deadline real, y desconexión entre lo que prometen los anuncios (shock visual, manchas, ácaros) y lo que entrega la página (proceso limpio y racional).

3. **El cotizador con IA es un activo diferenciador subutilizado.** Está enterrado a mitad de página. Tiene potencial como lead magnet y gancho publicitario pero hoy no está explotado.

4. **La arquitectura de Meta Ads es funcional pero no está diseñada para escalar.** Hay una campaña de adquisición que carga toda la cuenta y un retargeting caro con pool contaminado. No hay separación por temperatura de tráfico ni secuenciación creativa.

5. **El WhatsApp funnel tiene un cuello de botella invisible:** no hay seguimiento estructurado post-clic. El lead llega a WhatsApp y si no responde en el momento, se pierde.

6. **El presupuesto de $55.000 COP/día (~$13 USD) es extremadamente bajo** para alimentar un sistema TOFU/MOFU/BOFU completo. Requiere concentración quirúrgica, no dispersión.

### Qué está sosteniendo ventas hoy
- El creativo `AD_01_Video_CocaCola_Shock` con CPL de ~$3.900
- El ad set `CA_01_Lookalike_1%` y `CA_02_Abierto_Intereses` que generan el 90% de los leads
- La landing hogar-saludable que, aunque genérica, tiene un flujo funcional hacia WhatsApp
- El tracking CAPI que permite a Meta optimizar con señal real

### Qué está frenando el crecimiento
- Landing genérica que no maximiza la intención generada por los anuncios
- Retargeting caro ($17.251 CPL) con audiencia probablemente contaminada
- Sin sistema de seguimiento comercial post-WhatsApp
- Presupuesto fragmentado entre campañas sin priorización clara
- Sin landings específicas por servicio/ángulo para tráfico pago
- Social proof insuficiente en toda la web
- Ciudad por defecto en Bogotá en la landing (el tráfico pago es Medellín)

### Qué no debo tocar todavía
- La campaña de adquisición activa: está generando leads a $4.113 CPL — no reiniciar su aprendizaje
- El tracking CAPI/Pixel: funciona bien, solo necesita mejoras incrementales
- La estructura de precios del cotizador: está calibrada correctamente
- Los creativos ganadores (CocaCola_Shock): no pausar, no editar

### Qué debo atacar primero
1. Corregir la ciudad por defecto de la landing a Medellín para tráfico Medellín
2. Crear landing específica Medellín con headline congruente con creativos ganadores
3. Reconstruir retargeting con audiencia limpia (últimos 14-30 días)
4. Implementar sistema mínimo de seguimiento en WhatsApp
5. Subir el cotizador IA al hero como diferenciador

---

## 2. LECTURA TÉCNICA DEL REPO

### Estructura general
El proyecto es un Next.js con App Router, bien organizado:

```
src/
├── app/
│   ├── page.tsx                    → Homepage
│   ├── layout.tsx                  → Root layout (GTM, Consent Mode, Attribution)
│   ├── api/quote/route.ts          → Cotizador IA (Gemini 3-step pipeline)
│   ├── api/whatsapp/route.ts       → Webhook n8n para CAPI
│   ├── promo/hogar-saludable/      → Landing principal tráfico pago
│   ├── en/healthy-home/            → Landing inglés expats
│   ├── servicios/{alfombras,colchones,muebles,vehiculos,empresarial}/
│   ├── blog/                       → Blog con [slug]
│   └── garantia/                   → Página de garantía
├── components/
│   ├── WhatsAppLink.tsx            → Componente unificado WhatsApp + tracking
│   ├── WhatsAppButton.tsx          → Botón flotante WhatsApp
│   ├── VisualQuoter.tsx            → Cotizador IA (frontend)
│   ├── GTMProvider.tsx             → Inicialización GTM + eventos globales
│   ├── CookieConsent.tsx           → Banner de consentimiento
│   ├── sections/LandingSelector.tsx → Selector de servicios + CTA
│   └── sections/{Hero,Services,BeforeAfter,Testimonials,...}
├── lib/
│   ├── gtm.ts                     → Definiciones de eventos GTM
│   ├── whatsappTracker.ts          → Tracker WhatsApp + CAPI
│   ├── ccAttribution.ts            → Captura UTM/gclid/fbclid
│   └── ccRef.ts                    → Generación de códigos de referencia
├── hooks/
│   ├── useGTM.ts                   → Hook de tracking para componentes
│   └── useWhatsAppNumber.ts        → Número dinámico por día
└── context/
    └── WhatsAppNumberContext.tsx    → Override de número WhatsApp
```

### Lo que está BIEN implementado

**Tracking & CAPI (9/10)**
- `whatsappTracker.ts`: Genera UUID para deduplicación + ref visible de 5 chars
- Pixel browser-side: `fbq('track', 'Lead')` con eventID
- Server-side: POST a `/api/whatsapp` → enriquece con IP/UA → forward a n8n
- `ccAttribution.ts`: Captura gclid, wbraid, gbraid, fbclid, UTMs, landing_url
- Deduplicación: eventId compartido entre Pixel y CAPI
- Consent Mode v2: Default denied, actualiza tras aceptación
- `keepalive: true` en fetch para garantizar delivery

**Cotizador IA (8/10)**
- Pipeline de 3 pasos: validación (flash-lite) → detección (flash) → pricing (JS)
- Manejo de memoria: `createImageBitmap` con resize, canvas cleanup, fallback HEIC
- Rate limiting: 5 req/IP/60s
- Pricing calibrado por ciudad con mínimos y redondeo
- Paso 2b de fallback para tapetes sin referencia
- Timeout de 50s con AbortController

**Performance**
- Imágenes AVIF/WebP con Next.js Image
- Font swap con Inter
- Resource hints (preconnect, prefetch)
- CSS optimization habilitado
- Console logs removidos en producción
- Lazy loading con Suspense boundaries

### Lo que está MAL implementado

**1. Ciudad por defecto en LandingSelector: Bogotá**
- Archivo: `src/components/sections/LandingSelector.tsx`, línea ~10
- `selectedCity: 'Bogotá'` hardcodeado
- TODO el tráfico pago de Medellín llega y ve "Bogotá" seleccionado
- **Impacto: CRÍTICO.** Genera fricción, confusión y pérdida de congruencia anuncio→landing
- **Fix inmediato:** Detectar UTM o query param `?ciudad=medellin` y pre-seleccionar

**2. No hay rate limiting en `/api/whatsapp`**
- Archivo: `src/app/api/whatsapp/route.ts`
- Cualquiera puede spamear el endpoint y saturar n8n
- **Fix:** Copiar el rate limiter de `/api/quote`

**3. WhatsApp Override a número de domingo**
- Archivo: `src/app/promo/hogar-saludable/page.tsx`, línea 19
- `<WhatsAppOverrideProvider number="573209210866">` — fuerza el número de domingo
- ¿Es intencional para routing de promo o es un error? Si es error, genera que los leads de lunes-sábado vayan al número incorrecto
- **Acción:** Validar con el equipo si esto es deliberado

**4. Fallback de eventId no es criptográficamente seguro**
- Archivo: `src/lib/whatsappTracker.ts`, líneas 24-28
- Si `crypto.randomUUID()` no está disponible: `${Date.now()}-${Math.random().toString(16).slice(2)}`
- Riesgo bajo pero posible colisión en ráfagas

**5. Rate limiting in-memory en serverless**
- Archivo: `src/app/api/quote/route.ts`
- El Map se reinicia con cada instancia de Vercel
- No es compartido entre instancias
- Solución real: Redis o Upstash Rate Limit

### Lo que está INCOMPLETO

**1. No hay evento de tracking para selección de servicio en LandingSelector**
- Cuando el usuario cambia entre Muebles/Colchones/Alfombras/Plan 360°, no se registra
- Dato valioso para optimización de campañas

**2. No hay tracking del cotizador como evento de conversión separado**
- `quotation_start` y `quotation_complete` están definidos en `gtm.ts` pero no se disparan en el VisualQuoter
- El cotizador debería enviar evento `InitiateCheckout` o `AddToCart` a Meta

**3. Falta hashed_email y hashed_phone en CAPI**
- El payload a n8n no incluye `em` (email hasheado) ni `ph` (teléfono hasheado)
- Meta recomienda estos campos para mejorar match rate
- Los formularios de servicio capturan nombre y teléfono — se podrían hashear y enviar

**4. Sin eventos de scroll_depth ni time_on_page en la landing promo**
- Los hooks existen pero no están conectados en `/promo/hogar-saludable/page.tsx`
- Dato crucial para entender engagement del tráfico pago

**5. Sin validación de schema en `/api/whatsapp`**
- No hay validación Zod/Yup del payload entrante
- Riesgo de datos malformados llegando a n8n

### Lo que está técnicamente correcto pero comercialmente mal pensado

**1. Plan 360° como opción destacada pero sin precio visible**
- LandingSelector destaca Plan 360° como "MEJOR VALOR" pero no muestra el precio
- El usuario no sabe cuánto cuesta antes de ir a WhatsApp
- Genera leads curiosos pero no cualificados → más trabajo para el vendedor

**2. Formularios de servicio demasiado largos**
- Muebles: nombre + teléfono + ciudad + cuándo + tipo de mueble = 5 campos
- Para tráfico frío de Meta Ads, cada campo extra mata conversión
- Ideal: máximo 2 campos (nombre + teléfono) o directo a WhatsApp

**3. Countdown timer sin deadline real**
- Las páginas de servicio muestran un countdown de "23h 47m" que se reinicia al recargar
- Los usuarios sofisticados lo detectan → pierde credibilidad
- Si vas a usar urgencia, usa cupos reales o fecha real

**4. Descuento dinámico por query param sin validación**
- `?desc=99` mostraría "99% de descuento"
- Cualquiera puede manipular la URL
- Necesita un rango válido (10-30%) hardcodeado

---

## 3. LECTURA COMERCIAL DEL SITIO

### Qué comunica BIEN
- **Profesionalismo:** Imágenes de calidad, lenguaje técnico accesible ("inyección-extracción")
- **Cobertura:** Bogotá y Medellín claramente mencionadas con direcciones físicas
- **Garantía:** "Resultados garantizados o repetimos gratis" — fuerte reversión de riesgo
- **Proceso claro:** 3 pasos (cotiza → agendamos → limpieza) reduce incertidumbre
- **Confianza numérica:** 10+ años, 5000+ clientes, 4.9/5 estrellas

### Qué comunica MAL
- **El headline de la landing no conecta con los creativos ganadores.** Los videos muestran manchas extremas, Coca-Cola derramada, extracción de agua negra. La landing dice "Renueva tu hogar en 1 visita" — es correcto pero no visceral. Hay una desconexión emocional entre el shock del anuncio y la racionalidad de la landing.
- **No hay "dolor" visible.** La landing habla de beneficios limpios pero no confronta el problema (manchas, ácaros, olores, alergias). El tráfico de Meta Ads viene caliente por el shock visual — la landing debería amplificarlo, no enfriarlo.
- **La promesa de descuento es confusa.** La home dice "20% primera vez", la landing promo dice "desodorización gratis", los servicios dicen "{desc}% OFF" dinámico. No hay consistencia en la oferta.

### Qué distrae
- **Secciones empresariales y vehículos** en la home para tráfico que busca servicio residencial
- **Blog** ocupa espacio valioso sin contenido suficiente
- **El selector de servicios en la landing** fuerza una decisión temprana (¿mueble o colchón?) cuando el usuario viene por un ángulo específico del anuncio

### Qué convierte
- **El botón flotante de WhatsApp** — siempre visible, baja fricción
- **El sticky CTA mobile** — "Cotizar por WhatsApp" fijo en bottom
- **Before/After slider** — prueba visual del resultado
- **El cotizador IA cuando se usa** — convierte bien porque da precio inmediato

### Qué genera fricción
- **Ciudad por defecto Bogotá** para tráfico Medellín (CRÍTICO)
- **Necesidad de seleccionar servicio** antes de ver CTA
- **Social proof mínimo:** 1 solo testimonio en la landing
- **FAQ con solo 2 preguntas** — insuficiente para resolver objeciones
- **No hay teléfono visible** — solo WhatsApp como canal
- **Cotizador requiere foto** — alta fricción en tráfico frío que no tiene foto lista

---

## 4. DIAGNÓSTICO DEL FUNNEL

### Mapa completo del funnel

```
Meta Ad (video shock/demo)
  → Clic (CTR 2.5-3.2%)
    → Landing /promo/hogar-saludable
      → Selecciona servicio + ciudad (FRICCIÓN)
        → Clic "Cotizar por WhatsApp" (CONVERSIÓN PRIMARIA)
          → WhatsApp se abre con mensaje pre-armado + ref
            → Espera respuesta del agente (CUELLO DE BOTELLA)
              → Cotización manual
                → Agendamiento
                  → Servicio
                    → ¿Recompra? ¿Reseña? ¿Referido? (NO EXISTE)
```

### Dónde está la mayor pérdida

| Etapa | Pérdida estimada | Causa principal |
|-------|-----------------|-----------------|
| **Ad → Landing** | ~80% rebota | Normal para Meta Ads, pero mejorable con mejor congruencia |
| **Landing → WhatsApp clic** | ~60-70% no clickea | Landing genérica, headline débil, ciudad incorrecta |
| **WhatsApp clic → Conversación real** | ~40-50% no responde | Mensaje pre-armado es bueno, pero si el agente tarda, se pierde |
| **Conversación → Cotización** | ~30% abandona | Depende de velocidad de respuesta y claridad de pricing |
| **Cotización → Agendamiento** | ~20-30% no agenda | Sin seguimiento automatizado, sin urgencia post-cotización |
| **Post-servicio → Recompra** | ~95% no vuelve | No existe ningún sistema de reactivación |

### Dependencia por área

**Depende de la WEB:**
- Congruencia headline-anuncio
- Ciudad pre-seleccionada
- Velocidad de carga
- CTA claro y visible
- Social proof suficiente
- Reducción de fricción (menos campos, menos decisiones)

**Depende del ANUNCIO:**
- Calidad del tráfico (intención vs curiosidad)
- Ángulo emocional correcto
- Segmentación adecuada
- Congruencia con landing

**Depende del CHAT DE WHATSAPP:**
- Velocidad de primera respuesta (<5 min ideal)
- Script de venta estandarizado
- Manejo de objeciones
- Seguimiento a no-respondedores
- Horario de atención visible

**Depende del SEGUIMIENTO COMERCIAL:**
- CRM o sistema de follow-up
- Secuencia de mensajes post-cotización
- Recuperación de leads fríos
- Recordatorios pre-servicio

**Depende de la OFERTA:**
- Claridad del pricing
- Bonos y descuentos consistentes
- Garantía visible
- Comparativa vs competencia

**Depende de SEGMENTACIÓN:**
- Exclusiones correctas (clientes actuales no en adquisición)
- Lookalike de calidad (basado en compradores, no curiosos)
- Retargeting limpio (visitantes recientes, no contaminados)

**Depende de ARQUITECTURA TÉCNICA:**
- CAPI funcionando correctamente ✅
- Deduplicación activa ✅
- Attribution window correcta
- Eventos intermedios (ViewContent, AddToCart) para optimización

---

## 5. DIAGNÓSTICO DE META ADS

### Campañas

**[CAPI] 01_Adquisicion_Medellin_Plan360 — MANTENER**
- 119 resultados, CPL $4.113
- Es la columna vertebral de la cuenta
- NO reiniciar aprendizaje
- Optimización: mejorar la landing para bajar CPL sin tocar la campaña

**[CAPI] 02_Retargeting_Medellin_Plan360 — RECONSTRUIR**
- 11 resultados, CPL $17.251
- Audiencia probablemente contaminada por los primeros 15 días de mala señal
- El pool de retargeting es pequeño (6.930 alcance) y la frecuencia baja (1.37)
- **Hipótesis:** La audiencia incluye visitantes de los primeros 15 días con eventos mal trackados → Meta optimiza hacia gente que no convierte
- **Acción:** Crear nueva campaña de retargeting con audiencia de últimos 14 días (señal limpia) y excluir convertidos

**Campañas inactivas — NO REVIVIR**
- `CC | MED | RT | LEADS | ABO` y `CC | MED | TOFU | LEADS | CBO` tienen learning data de la era de mala señal
- Mejor crear campañas nuevas que heredar aprendizaje contaminado

### Conjuntos de anuncios

**CA_02_Abierto_Intereses_Medellin — ESTRELLA**
- 69 resultados, CPL $4.140
- Funciona bien porque Meta tiene libertad de optimizar con intereses como guía
- **Mantener tal cual.** Es la gallina de los huevos de oro.

**CA_01_Lookalike_1%_Medellin — FUERTE**
- 50 resultados, CPL $4.076
- Buen CPL, buen volumen
- **Mantener.** Eventualmente crear LAL 1% nuevo basado solo en compradores (no leads)

**CA_02_VisitantesWeb — CARO, REPARAR**
- Genera leads pero a CPL alto
- Probablemente incluye visitantes de baja calidad (rebotes, curiosos)
- **Acción:** Filtrar por visitantes que pasaron >30s o hicieron scroll >50%

**CA_01_BaseDatos — SUBEXPLOTADO**
- Los +1000 clientes no están siendo usados correctamente
- **Acción:** Crear Custom Audience de compradores → LAL 1% de compradores → campaña separada
- La base de datos debería ser la fuente de los mejores lookalikes, no un ad set de retargeting

**Broad_Higiene — REEVALUAR**
- CPL históricamente bueno en muestra pequeña
- Broad con señal limpia puede funcionar muy bien en 2026
- Meta recomienda broad cuando la señal CAPI es fuerte
- **Acción:** Crear test con $10.000/día para validar en la nueva era de señal limpia

### Anuncios/Creativos

**GANADORES — NO TOCAR:**
- `AD_01_Video_CocaCola_Shock` (original + copia): CPL $3.885-$3.999, 119 resultados combinados
- Es el mejor creativo por lejos. Demo visual extrema, shock emocional, resultado tangible.
- **Hipótesis validada:** Los creativos de demostración con contraste visual fuerte (mancha → limpieza → resultado) son los que convierten.

**CON POTENCIAL — TESTEAR:**
- `AD_03_Video_Acaros`: CPL históricamente interesante, muestra pequeña. El ángulo de salud/ácaros puede funcionar bien en un ad set de colchones específico.
- `AD_02_Video_Mitad_Mitad`: Concepto de "pongámoslo a prueba" es bueno para credibilidad. Necesita más gasto para validar.

**INEFICIENTES — PAUSAR O REPENSAR:**
- `AD_02_Video_Acaros_Colchon`: Muy caro. El ángulo de ácaros genérico no convierte tan bien como la demo visual directa.
- `dinamica cotiza ahora imagen`: Las imágenes estáticas no compiten con video en este vertical.
- `AD_02_Video_Pongamoslo_A_Prueba` (ambas copias): Alto CTR pero baja conversión = genera curiosidad sin intención comercial. El clic es de "quiero ver qué pasa" no de "quiero contratar".
- `dinamica extraccion agua sucia`: CTR altísimo pero casi no convierte. Mismo problema: engagement ≠ intención.
- `AD_01_Video_5_Cosas_Bono`: Contenido educativo no genera leads directos en BOFU.

**Conclusión sobre creativos:**
- Los creativos tipo "show, don't tell" con resultado visual extremo son los ganadores
- Los creativos educativos o de curiosidad generan engagement pero no leads
- Los creativos estáticos son ineficientes vs. video en este vertical
- El patrón ganador es: MANCHA EXTREMA → PROCESO → RESULTADO IMPECABLE

---

## 6. ARQUITECTURA IDEAL NUEVA

### Principio rector
Con $55.000 COP/día (~$13 USD), NO se puede alimentar un embudo completo TOFU/MOFU/BOFU con ad sets separados. La estrategia debe ser:

1. **Concentrar 80% en lo que ya funciona** (adquisición con creativos ganadores)
2. **10% en test de nuevos creativos/audiencias**
3. **10% en retargeting reconstruido**

### Estructura propuesta

```
CAMPAÑA 1: [CAPI] Adquisicion_MED_Principal
├── Objetivo: Leads (optimizar por Lead event via CAPI)
├── Presupuesto: CBO $44.000/día
├── Ad Set 1: Intereses_Abierto_MED (MANTENER existente)
│   ├── AD_01_Video_CocaCola_Shock
│   └── AD_03_Video_Acaros (test)
├── Ad Set 2: LAL_1%_Compradores_MED (NUEVO - basado en customer list filtrada)
│   ├── AD_01_Video_CocaCola_Shock
│   └── AD_02_Video_Mitad_Mitad (test)
├── Ad Set 3: Broad_MED (TEST - sin intereses, solo geo + edad)
│   ├── AD_01_Video_CocaCola_Shock
│   └── NUEVO creativo de cotizador IA
│
├── Exclusiones globales:
│   - Customer List (compradores últimos 180 días)
│   - Leads convertidos últimos 30 días
│   - Visitantes que ya contactaron (Custom Audience de evento Lead)

CAMPAÑA 2: [CAPI] Retargeting_MED_Limpio
├── Objetivo: Leads
├── Presupuesto: $6.000/día
├── Ad Set 1: Visitantes_Web_14d (NUEVO - solo últimos 14 días, señal limpia)
│   ├── AD con oferta directa: "Ya viste nuestro servicio. Agenda hoy con 20% OFF"
│   └── AD con cotizador: "Cotiza en segundos con nuestra IA"
├── Ad Set 2: Engagers_IG_FB_14d (NUEVO)
│   ├── AD con testimonio video
│   └── AD con antes/después
│
├── Exclusiones:
│   - Customer List
│   - Leads convertidos últimos 7 días

CAMPAÑA 3: [CAPI] Reactivacion_Clientes_MED (FUTURO - Sprint 2)
├── Objetivo: Leads
├── Presupuesto: $5.000/día (cuando se suba presupuesto total)
├── Ad Set 1: Customer List directa
│   ├── AD: "¿Hace cuánto no lavas tu sofá? Vuelve con 15% OFF"
│   └── AD: "Tus vecinos ya están repitiendo. ¿Y tú?"
```

### Despliegue progresivo del presupuesto ($55.000/día)

**Semana 1-2: Validación ($45.000/día activos)**
- Adquisición: $40.000/día (CBO entre los 3 ad sets)
- Retargeting limpio: $5.000/día
- Reserva: $10.000/día sin gastar (buffer)

**Semana 3-4: Lectura y ajuste**
- Si broad funciona → escalar a $15.000/día
- Si retargeting baja CPL → escalar a $8.000/día
- Si algún ad set no funciona después de 5.000 impresiones → pausar

**Mes 2: Escalamiento gradual**
- Si los CPL se mantienen <$5.000 → subir presupuesto 15% cada 48h
- Máximo aumento: de $55.000 → $75.000/día
- Introducir campaña de reactivación de clientes

### Uso correcto de audiencias

**Customer List (+1000 clientes):**
- NO usar como ad set de retargeting directo (son clientes, no prospectos)
- SÍ usar para crear LAL 1% de compradores reales → mejor audiencia de adquisición
- SÍ usar para excluir de campañas de adquisición (no pagar por llegar a quien ya compró)
- SÍ usar en campaña de reactivación/recompra separada (Sprint 2)

**Website Visitors:**
- Reconstruir audiencia desde 0 con los últimos 14-30 días (señal limpia)
- Filtrar por engagement: >30s en sitio O scroll >50% O interacción con cotizador
- Excluir rebotes (<10s)

**Engagers (IG + FB):**
- Crear audiencia de interacción últimos 30 días
- Incluye: video views >50%, likes, comments, shares, saves, profile visits
- Es una audiencia MOFU natural — gente que ya mostró interés

**Lookalikes:**
- LAL 1% de COMPRADORES (no de leads) → mejor calidad
- LAL 1% de leads que agendaron → segundo mejor
- NO crear LAL de visitantes web (demasiado amplio y ruidoso)

### Migración sin romper aprendizaje

1. **NO apagar la campaña de adquisición actual** — sigue funcionando
2. Crear campaña nueva en paralelo con estructura propuesta
3. Una vez que la nueva tenga >50 eventos de conversión → comparar CPL
4. Si nueva < actual → migrar presupuesto gradualmente (20%/día)
5. Si nueva > actual → mantener actual y ajustar nueva
6. **NUNCA** apagar ambas al mismo tiempo

### Saneamiento de audiencias contaminadas
- Las audiencias de los primeros 15 días ya no se pueden "limpiar"
- **Solución:** Crear audiencias nuevas con ventana temporal que empiece DESPUÉS del fix de tracking
- Custom Audiences: crear "Website Visitors - Últimos 14d" (solo señal limpia)
- Los LAL basados en customer list (compradores reales) NO están contaminados — son los más confiables

---

## 7. ESTRATEGIA DE LANDINGS

### Diagnóstico actual

La home NO debe ser la puerta de tráfico pago. Tiene demasiadas secciones, no tiene foco, y mezcla residencial + empresarial + blog.

La landing `/promo/hogar-saludable` es mejor pero tiene problemas:
- Headline genérico
- Ciudad por defecto incorrecta
- Social proof insuficiente
- No hay congruencia con el ángulo del anuncio
- Cotizador IA enterrado

### Arquitectura de landings propuesta

**TIER 1 — Obligatorio (Sprint 1)**

| Landing | URL propuesta | Tráfico destino | Prioridad |
|---------|--------------|-----------------|-----------|
| Landing Medellín General | `/promo/medellin` | Adquisición broad + intereses | ALTA |
| Landing Muebles Medellín | `/promo/medellin/muebles` | Anuncios de muebles/sofás | ALTA |

**TIER 2 — Siguiente iteración (Sprint 2)**

| Landing | URL propuesta | Tráfico destino |
|---------|--------------|-----------------|
| Landing Colchones Medellín | `/promo/medellin/colchones` | Anuncios de ácaros/colchones |
| Landing Tapetes Medellín | `/promo/medellin/tapetes` | Anuncios de alfombras |
| Landing Retargeting | `/promo/medellin/vuelve` | Retargeting |
| Landing Recompra | `/promo/medellin/cliente` | Base de datos clientes |

### Sobre el cotizador IA como activo publicitario

**Veredicto: SÍ tiene potencial, pero con matices.**

**A favor:**
- Es un diferenciador real — ningún competidor local lo tiene
- "Cotiza con IA en segundos" es un hook publicitario fuerte
- Reduce fricción de pricing: el usuario sabe cuánto cuesta antes de hablar
- Genera engagement y tiempo en página (señales positivas para Meta)
- El flow foto→precio→WhatsApp es natural en móvil

**En contra:**
- Requiere que el usuario tenga una foto lista → alta fricción en tráfico frío
- Si la IA falla (foto borrosa, objeto no reconocido), genera frustración
- El pricing "orientativo" sin referencia puede generar expectativas incorrectas

**Recomendación:**
- En TOFU: usarlo como gancho secundario, no como CTA principal. "Cotiza gratis con nuestra IA" como segundo CTA después de WhatsApp directo.
- En Retargeting: usarlo como CTA principal. El usuario ya conoce la marca → más dispuesto a subir foto.
- Como creativo publicitario: SÍ. Un video mostrando el cotizador en acción (tomo foto → precio instantáneo → reservo) sería un creativo potente y diferenciador.
- NO ponerlo como barrera antes de WhatsApp — siempre debe haber una ruta directa a WhatsApp sin pasar por el cotizador.

### Wireframes verbales

#### Landing Medellín General (`/promo/medellin`)

```
[BARRA DE URGENCIA]
"⚡ Solo hoy: Desodorización gratis al agendar en Medellín"

[HERO — 2 columnas]
Izquierda:
  Badge: "Servicio a domicilio en Medellín"
  H1: "¿Tu sofá tiene manchas que no salen?
       Nosotros las eliminamos en 1 visita."
  Sub: "Extracción industrial profunda para muebles,
       colchones y tapetes. Garantía de resultado."
  ⭐⭐⭐⭐⭐ 4.9/5 — Más de 3.200 servicios realizados
  [BOTÓN VERDE] "Cotizar por WhatsApp" → WhatsApp directo
  [LINK SECUNDARIO] "O cotiza con nuestra IA →" → scroll a cotizador

Derecha:
  Video embed: fragmento del video CocaCola_Shock (5-10s loop)
  O imagen before/after impactante

[SOCIAL PROOF BAR]
  3 mini-testimonios con foto + nombre + ciudad + servicio
  "El sofá quedó como nuevo" — Carlos M., Medellín
  "Los colchones de mis hijos sin ácaros" — Laura P., Envigado
  "Alfombra rescatada después de 3 años" — Diego R., El Poblado

[CÓMO FUNCIONA — 3 pasos]
  1. Cotizas por WhatsApp (o con nuestra IA)
  2. Agendamos tu ruta en Medellín
  3. Limpieza profesional + garantía

[BEFORE/AFTER SLIDER]
  Muebles | Colchones | Tapetes (tabs)

[COTIZADOR IA]
  "¿Quieres saber el precio exacto? Sube una foto."
  Ciudad pre-seleccionada: Medellín (hardcoded)
  Categoría: Mueble | Tapete

[FAQ — 5 preguntas]
  ¿Cuánto cuesta?
  ¿Cuánto tarda en secar?
  ¿Sirve para mascotas?
  ¿Atienden en todo Medellín?
  ¿Qué pasa si no queda bien? (garantía)

[STICKY BOTTOM CTA MOBILE]
  "Cotizar por WhatsApp" — siempre visible
```

#### Landing Muebles Medellín (`/promo/medellin/muebles`)

```
[BARRA DE URGENCIA]
"🛋️ Hoy: Protector de tela GRATIS con tu lavado de muebles"

[HERO]
  H1: "Ese sofá tiene más bacterias que tu baño.
       Nosotros lo dejamos como nuevo."
  Sub: "Lavado profesional de muebles a domicilio en Medellín.
       Extracción profunda + secado rápido + garantía."
  Video: clip del proceso de muebles (mancha → extracción → resultado)
  [BOTÓN] "Agendar lavado de muebles" → WhatsApp con mensaje de muebles

[PRECIOS CLAROS]
  Sala en L: desde $160.000
  Sofá 3 puestos: desde $105.000
  Poltrona: desde $45.000
  "Incluye: desodorización + protector de tela GRATIS"

[BEFORE/AFTER SLIDER — solo muebles]

[TESTIMONIOS — solo de muebles]

[COTIZADOR IA — categoría pre-seleccionada: Mueble]

[FAQ específico de muebles]

[STICKY CTA MOBILE]
```

#### Landing Colchones Medellín (`/promo/medellin/colchones`)
```
Ángulo: SALUD + ÁCAROS + HIGIENE
H1: "¿Sabías que tu colchón tiene millones de ácaros?
     Eliminamos el 99% en 1 visita."
Enfoque: miedo → solución → garantía → agendar
Incluir: dato de ácaros, foto microscópica, proceso, resultado
```

#### Landing Tapetes Medellín (`/promo/medellin/tapetes`)
```
Ángulo: RESCATE + TRANSFORMACIÓN
H1: "Ese tapete que ibas a botar puede quedar como nuevo."
Enfoque: costo de reemplazo vs lavado → antes/después → cotizador IA
Cotizador IA como CTA principal (el tapete es el caso de uso perfecto para foto)
```

#### Landing Retargeting (`/promo/medellin/vuelve`)
```
H1: "¿Todavía pensándolo? Mira lo que hicimos esta semana."
Galería de antes/después recientes
Oferta exclusiva: "Solo para ti: 25% OFF si agendas hoy"
Cotizador IA prominente
Testimonios en video
Sin fricción: solo WhatsApp directo
```

#### Landing Recompra (`/promo/medellin/cliente`)
```
H1: "Tus muebles ya extrañan una limpieza profesional."
Referencia a servicio anterior
Oferta de cliente: "15% OFF por ser cliente Clean Company"
Cross-sell: "¿La vez pasada lavamos tus muebles? Ahora prueba colchones."
Programa de referidos: "Refiere a un amigo y ambos ganan"
```

---

## 8. SISTEMA DE VENTAS MASIVO

### CRM y Lead Management

**Estado actual:** n8n recibe el webhook → (inferido) Google Sheets
**Estado necesario:** Sistema estructurado con estados de lead

**Pipeline mínimo viable:**
```
LEAD NUEVO → CONTACTADO → COTIZADO → AGENDADO → SERVICIO REALIZADO → POST-VENTA
```

**Implementación con n8n + Google Sheets (Sprint 1):**
- Sheet principal: Leads con columnas = Ref, Nombre, Teléfono, Ciudad, Servicio, Fuente (utm_source), Estado, Fecha Lead, Fecha Última Acción, Agente Asignado
- Cambio de estado manual por agente en la hoja
- n8n automatiza: creación de fila al recibir webhook, notificación a agente

**Evolución (Sprint 2-3):**
- Migrar a CRM real: Kommo (ex-amoCRM) es ideal para WhatsApp + leads + pipeline
- O HubSpot Free + WhatsApp Business API
- Integración con n8n para automatizaciones

### Automatizaciones por WhatsApp

**Secuencia 1: Lead nuevo (inmediata)**
```
T+0: Lead llega → n8n envía notificación interna a agente
T+0: Respuesta automática: "¡Hola! Recibimos tu solicitud.
      Un asesor te responderá en menos de 5 minutos.
      Mientras tanto, ¿me puedes decir qué servicio necesitas?"
T+5min: Si no ha respondido el agente → alerta interna urgente
T+2h: Si lead no respondió → "¿Sigues interesado? Tenemos cupos
       para esta semana en Medellín 📅"
```

**Secuencia 2: Cotizado pero no agendó**
```
T+24h: "Hola [nombre], ayer te cotizamos [servicio].
        ¿Quieres que te reservemos un cupo para esta semana?"
T+72h: "Último recordatorio: tu cotización de [servicio]
        está por vencer. Agenda antes del [fecha]
        para mantener el precio."
T+7d: "¿Decidiste no avanzar? Si cambias de opinión,
       aquí estamos. Tu código de descuento
       especial VUELVE15 te da 15% OFF."
```

**Secuencia 3: Post-servicio**
```
T+1h: "¡Gracias por confiar en Clean Company!
       ¿Cómo quedó todo? Si tienes alguna duda
       sobre el secado, aquí estamos."
T+24h: "¿Ya secó? Queremos asegurarnos de que
        estés 100% satisfecho."
T+72h: "¿Nos regalas una reseña rápida?
        Tu opinión nos ayuda a mejorar. [link a Google Reviews]"
T+7d: "¿Sabías que también lavamos [cross-sell servicio]?
       Como cliente, tienes 15% OFF en tu próximo servicio."
```

**Secuencia 4: Reactivación (cliente antiguo >60 días)**
```
"Hola [nombre], hace [X] días lavamos tus [servicio].
 Los expertos recomiendan limpiar cada 3-6 meses.
 ¿Quieres que te reservemos un cupo?
 Como cliente frecuente: 15% OFF 🧹"
```

**Secuencia 5: Recuperación de no-respondedores**
```
T+48h sin respuesta: Reintento por WhatsApp con ángulo diferente
T+7d: "Muchos clientes nos dicen que dudaron al inicio
       pero después quedaron encantados.
       ¿Te resolvemos alguna duda?"
T+14d: Mover a audiencia de retargeting en Meta (Custom Audience)
```

### Programa de Referidos

**Mecánica simple:**
- Cliente recibe código único después de su servicio
- "Refiere a un amigo con tu código [REF-CARLOS] y ambos reciben 15% OFF"
- Implementación: campo en Google Sheets, validación manual, descuento aplicado en cotización
- Evolución: automatización con n8n que detecta código de referido y aplica descuento

### Programa de Reseñas

**Flujo:**
1. Post-servicio +72h → pedir reseña por WhatsApp
2. Link directo a Google Reviews (no a la app)
3. Si deja reseña → "Gracias! Como agradecimiento, tienes 10% OFF en tu próximo servicio"
4. Meta: acumular 50+ reseñas en Google Maps para Medellín (SEO local + confianza)

### Cross-sell y Upsell

**Cross-sell (post-servicio):**
- Lavó muebles → ofrecer colchones: "Tus muebles quedaron perfectos. ¿Y los colchones?"
- Lavó colchones → ofrecer muebles: "Si los colchones tenían ácaros, imagina los muebles..."
- Lavó tapetes → ofrecer muebles + colchones: combo Plan 360°

**Upsell (durante cotización):**
- Poltrona → "¿Y si lavamos todo el juego de sala? Desde $160.000"
- Servicio individual → Plan 360°: "Por $X más, incluimos todo"
- Agregar desodorización premium, protector de tela, tratamiento anti-ácaros

---

## 9. BACKLOG PRIORIZADO

### Quick Wins (1-7 días)

| # | Acción | Impacto | Esfuerzo | Archivo |
|---|--------|---------|----------|---------|
| 1 | Cambiar ciudad por defecto a Medellín en LandingSelector para tráfico pago | ALTO | 30 min | `LandingSelector.tsx` |
| 2 | Agregar query param `?ciudad=medellin` a URLs de campaña y detectarlo | ALTO | 1h | `LandingSelector.tsx` |
| 3 | Cambiar headline de la landing a algo congruente con CocaCola_Shock | ALTO | 1h | `hogar-saludable/page.tsx` |
| 4 | Agregar 3-5 testimonios con nombre, ciudad y servicio | ALTO | 2h | `hogar-saludable/page.tsx` |
| 5 | Agregar 3 preguntas más al FAQ (precio, cobertura, garantía) | MEDIO | 1h | `hogar-saludable/page.tsx` |
| 6 | Crear audiencia Website Visitors últimos 14d en Meta | ALTO | 30 min | Meta Ads Manager |
| 7 | Crear LAL 1% de customer list (solo compradores) | ALTO | 30 min | Meta Ads Manager |
| 8 | Pausar creativos ineficientes (lista en sección 5) | MEDIO | 15 min | Meta Ads Manager |
| 9 | Verificar si WhatsApp override a número de domingo es intencional | ALTO | 10 min | Equipo |
| 10 | Agregar evento de tracking a selección de servicio en LandingSelector | MEDIO | 1h | `LandingSelector.tsx` |

### Sprint 1 (2 semanas)

| # | Acción | Impacto | Esfuerzo |
|---|--------|---------|----------|
| 11 | Crear landing `/promo/medellin` con nuevo copy + testimonios + cotizador prominente | ALTO | 3-4 días |
| 12 | Crear landing `/promo/medellin/muebles` | ALTO | 2 días |
| 13 | Reconstruir campaña de retargeting con audiencia limpia | ALTO | 2h |
| 14 | Crear nuevo creativo: video del cotizador IA en acción | ALTO | 1-2 días |
| 15 | Implementar hashed_phone en payload CAPI | MEDIO | 2h |
| 16 | Agregar rate limiting a `/api/whatsapp` | MEDIO | 1h |
| 17 | Implementar tracking de quotation_start/complete en VisualQuoter | MEDIO | 2h |
| 18 | Configurar respuesta automática en WhatsApp Business (primer mensaje) | ALTO | 1h |
| 19 | Crear Google Sheet estructurado para pipeline de leads | ALTO | 2h |
| 20 | Configurar n8n para asignar leads y notificar agentes | ALTO | 3h |
| 21 | Crear ad set Broad_MED de prueba con $10.000/día | MEDIO | 1h |
| 22 | Validar descuento dinámico: limitar rango a 10-30% | MEDIO | 30 min |

### Sprint 2 (30 días)

| # | Acción | Impacto |
|---|--------|---------|
| 23 | Crear landing Colchones Medellín |
| 24 | Crear landing Tapetes Medellín |
| 25 | Crear landing Retargeting con oferta exclusiva |
| 26 | Implementar secuencia de follow-up post-cotización en n8n/WhatsApp |
| 27 | Implementar secuencia post-servicio (reseña + cross-sell) |
| 28 | Crear 2-3 creativos nuevos: testimonios en video, antes/después rápido |
| 29 | Test de Click-to-WhatsApp directo vs. landing para creativos ganadores |
| 30 | Implementar scroll_depth y time_on_page en landing promo |
| 31 | A/B test: cotizador IA en hero vs. debajo del fold |
| 32 | Evaluar migración a CRM (Kommo/HubSpot) |
| 33 | Lanzar campaña de reactivación de clientes antiguos |

### Sprint 3 (60-90 días)

| # | Acción | Impacto |
|---|--------|---------|
| 34 | Lanzar programa de referidos |
| 35 | Landing corporativa/empresarial Medellín |
| 36 | Automatización completa de secuencias WhatsApp |
| 37 | A/B test sistemático de headlines con datos de conversión |
| 38 | Separar campañas por servicio si volumen lo justifica |
| 39 | Crear campaña de video views para construir audiencia de engagers |
| 40 | Implementar lead scoring básico (urgencia + tamaño + servicio) |
| 41 | Dashboard de métricas: CPL, tasa de contacto, tasa de agendamiento, tasa de cierre |
| 42 | Escalar presupuesto a $80-100.000/día si CPL se mantiene |

---

## 10. PLAN DE EJECUCIÓN TÉCNICA

### Cambio 1: Ciudad por defecto + query param (INMEDIATO)

**Archivo:** `src/components/sections/LandingSelector.tsx`
**Qué hacer:**
- Leer `searchParams` de la URL
- Si `?ciudad=medellin` → pre-seleccionar Medellín
- Si no hay param → default Medellín (para la landing de Medellín)
- Opción: crear prop `defaultCity` en LandingSelector y pasarla desde la página

**Riesgo:** Bajo. Es un cambio de estado inicial.
**Validación:** Abrir landing con `?ciudad=medellin` y verificar que Medellín esté seleccionado.
**Métrica:** Tasa de conversión de la landing (antes vs después del cambio).

### Cambio 2: Headline congruente con creativos (INMEDIATO)

**Archivo:** `src/app/promo/hogar-saludable/page.tsx`
**Qué hacer:**
- Cambiar H1 de "Renueva tu hogar en 1 visita" a algo más visceral
- Propuestas:
  - "¿Tu sofá tiene manchas que no salen? Nosotros las eliminamos."
  - "Derramamos Coca-Cola en un sofá. Mira cómo lo dejamos."
  - "Tu colchón tiene millones de ácaros. Eliminamos el 99%."
- El headline debe conectar con el ángulo del creativo que trae al usuario

**Riesgo:** Bajo. Cambio de copy, no de lógica.
**Validación:** Comparar CTR de WhatsApp clic antes vs después (mínimo 7 días de datos).
**Métrica:** Tasa de clic en CTA de WhatsApp.

### Cambio 3: Social proof ampliado (INMEDIATO)

**Archivo:** `src/app/promo/hogar-saludable/page.tsx`
**Qué hacer:**
- Agregar sección de 3-5 testimonios reales con nombre, ciudad, servicio
- Ubicar entre hero y "cómo funciona"
- Incluir fotos o avatares si están disponibles
- Mostrar variedad: muebles + colchones + tapetes

**Riesgo:** Bajo.
**Validación:** Visual en mobile y desktop.
**Métrica:** Scroll depth y tasa de conversión.

### Cambio 4: Cotizador IA con tracking completo (Sprint 1)

**Archivos:** `src/components/VisualQuoter.tsx`, `src/lib/gtm.ts`
**Qué hacer:**
- Disparar `quotation_start` cuando usuario sube foto
- Disparar `quotation_complete` cuando recibe resultado
- Enviar evento `InitiateCheckout` a Meta Pixel cuando completa cotización
- Enviar evento `AddToCart` cuando hace clic en "Reservar por este precio"

**Riesgo:** Bajo-medio. Asegurar que los eventos no dupliquen el Lead event.
**Validación:** Verificar en Meta Events Manager que los eventos llegan con deduplicación.
**Métrica:** Tasa de uso del cotizador, tasa de conversión cotizador→WhatsApp.

### Cambio 5: Nuevas landings Medellín (Sprint 1)

**Archivos nuevos:**
- `src/app/promo/medellin/page.tsx` — landing general
- `src/app/promo/medellin/muebles/page.tsx` — landing muebles

**Qué hacer:**
- Seguir wireframes de sección 7
- Reutilizar componentes: BeforeAfter, VisualQuoter, WhatsAppLink
- Pre-seleccionar Medellín en todos los selectores
- noindex (robots: false) — son landings de ads, no SEO
- Tracking completo desde día 1

**Riesgo:** Medio. Más páginas = más mantenimiento. Usar componentes compartidos.
**Validación:** Test en mobile (80%+ del tráfico viene de móvil).
**Métrica:** CPL por landing, tasa de conversión por landing.

### Cambio 6: Rate limiting en /api/whatsapp (Sprint 1)

**Archivo:** `src/app/api/whatsapp/route.ts`
**Qué hacer:** Copiar el rate limiter de `/api/quote/route.ts` con límite de 10 req/IP/60s.
**Riesgo:** Bajo.
**Validación:** Test manual con múltiples requests.

### Cambio 7: Validación de descuento dinámico (Sprint 1)

**Archivos:** Todos los service pages que leen `?desc=`
**Qué hacer:** Clamp el valor entre 10 y 30: `Math.min(30, Math.max(10, parseInt(desc)))`
**Riesgo:** Bajo.

---

## 11. EXPERIMENTOS PRIORITARIOS

### Experimento 1: Headline visceral vs. racional
- **Hipótesis:** Un headline que conecte con el shock visual del anuncio (manchas, ácaros) convertirá mejor que el actual "Renueva tu hogar en 1 visita"
- **Test:** A/B con UTM diferente: `?v=a` (actual) vs `?v=b` (nuevo)
- **Métrica:** Tasa de WhatsApp clic / visitante
- **Criterio de corte:** 200 visitantes por variante o 14 días
- **Por qué:** El gap anuncio→landing es probablemente el mayor punto de pérdida controlable

### Experimento 2: Cotizador IA en hero vs. below fold
- **Hipótesis:** Mostrar el cotizador IA prominente en el hero aumentará engagement y conversión
- **Test:** Landing A (cotizador abajo) vs Landing B (cotizador en hero, WhatsApp como secundario)
- **Métrica:** Tasa de uso del cotizador + tasa de conversión total
- **Criterio de corte:** 300 visitantes por variante
- **Por qué:** El cotizador es un diferenciador único pero está enterrado

### Experimento 3: Click-to-WhatsApp directo vs. landing
- **Hipótesis:** Para creativos de alta intención (CocaCola_Shock), enviar directo a WhatsApp sin landing podría mejorar CPL
- **Test:** Duplicar ad ganador, uno con destino landing, otro con destino WhatsApp directo
- **Métrica:** CPL y tasa de respuesta en WhatsApp
- **Criterio de corte:** 50 leads por variante
- **Por qué:** Eliminar la landing elimina fricción, pero pierde la oportunidad de cualificar y nutrir

### Experimento 4: Broad vs. Intereses vs. LAL con señal limpia
- **Hipótesis:** Con CAPI funcionando bien, Broad podría performar igual o mejor que segmentación manual
- **Test:** 3 ad sets con mismo creativo, mismo presupuesto, diferente targeting
- **Métrica:** CPL, calidad de lead (tasa de agendamiento)
- **Criterio de corte:** $50.000 COP de gasto por ad set
- **Por qué:** Meta en 2026 favorece broad cuando la señal de conversión es fuerte

### Experimento 5: Creativo del cotizador IA
- **Hipótesis:** Un video mostrando el cotizador IA en acción ("sube foto → precio instantáneo") puede funcionar como creativo diferenciador
- **Test:** Nuevo creativo de cotizador IA vs. CocaCola_Shock en mismo ad set
- **Métrica:** CPL y CTR
- **Criterio de corte:** 5.000 impresiones por creativo
- **Por qué:** Si funciona, abre un ángulo creativo completamente nuevo

### Experimento 6: Oferta de muebles vs. Plan 360°
- **Hipótesis:** Una landing específica de muebles con precio visible convertirá mejor que la landing genérica Plan 360°
- **Test:** Tráfico de anuncio de muebles → landing muebles vs. landing general
- **Métrica:** CPL y tasa de agendamiento
- **Criterio de corte:** 100 leads por variante
- **Por qué:** Congruencia anuncio→landing es una de las palancas más fuertes de CRO

### Experimento 7: Respuesta automática inmediata en WhatsApp
- **Hipótesis:** Una respuesta automática en <30 segundos aumenta la tasa de conversación real
- **Test:** Antes/después de implementar autoresponder
- **Métrica:** Tasa de leads que responden al menos 1 mensaje
- **Criterio de corte:** 50 leads antes vs 50 después
- **Por qué:** La velocidad de primera respuesta es uno de los factores más importantes en lead gen por WhatsApp

### Experimento 8: Precio visible en landing vs. oculto
- **Hipótesis:** Mostrar precios desde/desde ($160k muebles, $45k poltrona) en la landing reduce leads de baja calidad pero mejora tasa de cierre
- **Test:** Landing con tabla de precios visible vs. sin precios
- **Métrica:** CPL + tasa de agendamiento + valor promedio de servicio
- **Criterio de corte:** 100 leads por variante
- **Por qué:** Transparencia de precios pre-cualifica leads y reduce trabajo del vendedor

### Experimento 9: Retargeting con urgencia real
- **Hipótesis:** Un retargeting con oferta exclusiva y deadline real ("25% OFF solo hasta el viernes") convertirá mejor que retargeting genérico
- **Test:** Nuevo ad set de retargeting con oferta de tiempo limitado vs. creativo estándar
- **Métrica:** CPL de retargeting (bajar de $17.251 actual)
- **Criterio de corte:** $30.000 COP de gasto
- **Por qué:** El retargeting actual no tiene diferenciación vs. adquisición

### Experimento 10: Secuencia de follow-up post-cotización
- **Hipótesis:** Una secuencia automática de 3 mensajes en 7 días recupera al menos 10% de leads que cotizaron pero no agendaron
- **Test:** Implementar secuencia y medir recuperación
- **Métrica:** % de leads recuperados que agendan servicio
- **Criterio de corte:** 30 leads en secuencia
- **Por qué:** Es revenue "gratis" — estos leads ya pagaron por adquirirse

### Experimento 11: Testimonio en video como creativo
- **Hipótesis:** Un video de cliente real diciendo "quedé impresionado" + clip del proceso convertirá bien porque combina social proof + demo
- **Test:** Nuevo creativo vs. CocaCola_Shock
- **Métrica:** CPL y CPM (el CPM revela si Meta considera el contenido valioso)
- **Criterio de corte:** 5.000 impresiones
- **Por qué:** Diversificar creativos ganadores reduce riesgo de fatiga creativa

### Experimento 12: Landing con video hero vs. imagen
- **Hipótesis:** Un video autoplay (muted) en el hero de la landing aumenta engagement y reduce bounce
- **Test:** Landing A (imagen) vs Landing B (video loop 5-10s del proceso)
- **Métrica:** Bounce rate, time on page, tasa de conversión
- **Criterio de corte:** 200 visitantes por variante
- **Por qué:** Si los creativos de video son los que traen el tráfico, la landing debería continuar la experiencia visual

---

## 12. CONCLUSIÓN DIRECTA

Si hoy tuviera que rediseñar Clean Company Medellín para convertirlo en una máquina comercial, este es el orden exacto:

### Semana 1: Parches críticos
1. Cambiar ciudad por defecto a Medellín en la landing
2. Cambiar headline a algo visceral y congruente con creativos
3. Agregar 3+ testimonios reales
4. Crear audiencia de Website Visitors últimos 14 días
5. Crear LAL 1% de customer list de compradores
6. Reconstruir retargeting con audiencia limpia

### Semana 2-3: Infraestructura de conversión
7. Crear landing `/promo/medellin` optimizada
8. Crear landing `/promo/medellin/muebles`
9. Configurar autoresponder en WhatsApp Business
10. Crear pipeline de leads en Google Sheets + n8n
11. Lanzar ad set Broad de prueba

### Mes 2: Sistema de ventas
12. Implementar secuencia de follow-up post-cotización
13. Implementar secuencia post-servicio
14. Crear landings de colchones y tapetes
15. Crear 2-3 creativos nuevos (cotizador IA, testimonios, antes/después rápido)
16. Test de Click-to-WhatsApp directo

### Mes 3: Escalar
17. Escalar presupuesto gradualmente según CPL
18. Lanzar campaña de reactivación de clientes
19. Programa de referidos
20. Evaluar CRM formal
21. Dashboard de métricas end-to-end

**La verdad incómoda:** Clean Company tiene un tracking excelente, un producto sólido, creativos ganadores y un cotizador IA único en el mercado. Lo que le falta es un sistema comercial que conecte todo. Hoy es un buen negocio con buen marketing fragmentado. El salto viene de dejar de pensar en "campañas" y empezar a pensar en "sistema": cada lead que entra debe tener un camino claro desde el clic hasta la recompra, y hoy ese camino se rompe después del clic en WhatsApp.

El presupuesto de $55.000/día es suficiente para empezar, pero NO para dispersar. La estrategia correcta es: concentrar en lo que funciona, parchar lo que pierde dinero, construir el sistema de cierre y seguimiento, y escalar solo cuando el funnel completo esté probado.

---

## FUENTES Y REFERENCIAS

### Documentación y mejores prácticas consultadas
- [Meta Ads Best Practices 2026 - LeadsBridge](https://leadsbridge.com/blog/meta-ads-best-practices/)
- [Meta Conversions API Guide 2026 - Dinmo](https://www.dinmo.com/third-party-cookies/solutions/conversions-api/meta-ads/)
- [Meta Conversions API Setup & Optimization 2026 - AdsUploader](https://adsuploader.com/blog/meta-conversions-api)
- [Meta Lead Generation Best Practices 2025 - Dancing Chicken](https://www.dancingchicken.com/post/meta-lead-generation-best-practices-for-2025)
- [Click-to-WhatsApp Ads Guide 2025 - WANotifier](https://wanotifier.com/click-to-whatsapp-ads-guide/)
- [Meta WhatsApp Advertising 2026 - PickyAssist](https://pickyassist.com/blog/meta-whatsapp-advertising-2026/)
- [Best Meta Ads Account Structure 2026 - Flighted](https://www.flighted.co/blog/best-meta-ads-account-structure-2026)
- [Meta Ads Targeting Options 2026 - Cropink](https://cropink.com/meta-ads-targeting-options)
- [Advantage+ Audience Targeting 2026 - Alex Neiman](https://alexneiman.com/meta-advantage-plus-audience-targeting-2026/)
- [Estrategias Meta Ads Colombia 2026 - Marketing Express](https://www.marketing-express.com.co/2026/01/21/7-estrategias-de-meta-ads-en-colombia-2026/)
- [Meta Ads CPM/CPC Benchmarks by Country 2026 - AdAmigo](https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026)
- [Landing Page Best Practices 2026 - Involve.me](https://www.involve.me/blog/landing-page-best-practices)
- [CRO Best Practices - Unbounce](https://unbounce.com/conversion-rate-optimization/cro-best-practices/)
- [Landing Page Optimization Guide 2026 - VWO](https://vwo.com/landing-page-optimization/)
- [WhatsApp Marketing Leads 2026 - Chatarmin](https://chatarmin.com/en/blog/whats-app-marketing-leads)
- [Landing Page Statistics 2026 - Involve.me](https://www.involve.me/blog/landing-page-statistics)
- [Facebook Lookalike Audiences Guide 2026 - SocialRails](https://socialrails.com/blog/facebook-lookalike-audience-guide)
- [WhatsApp for Business 2025 Guide - Birch](https://bir.ch/blog/whatsapp-for-business)

---

*Documento generado el 19 de marzo de 2026 como parte de la auditoría integral de Clean Company Medellín.*
*Basado en: revisión completa del repositorio, navegación de la web pública, análisis de datos de Meta Ads proporcionados, e investigación de mejores prácticas vigentes.*

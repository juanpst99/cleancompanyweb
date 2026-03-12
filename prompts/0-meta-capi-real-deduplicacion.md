Actúa como un Arquitecto de Software Senior y Especialista MarTech, con experiencia avanzada en Next.js (App Router), Google Tag Manager (GTM), Meta Pixel, API de Conversiones de Meta (CAPI), n8n, webhooks y pipelines de atribución/conversión.

## Objetivo principal
Realiza una auditoría técnica profunda, exhaustiva y crítica del flujo completo de eventos entre:

1. el frontend en Next.js,
2. la capa de tracking en GTM / dataLayer / utilidades cliente,
3. el endpoint o webhook receptor,
4. el flujo de n8n provisto en `Ads_Clicks (7).json`,
5. y la solicitud final hacia Meta CAPI,

con el fin de validar que el sistema esté correctamente instrumentado, sincronizado y enviando eventos sin errores de deduplicación, pérdida de atributos clave ni fallas de match quality.

---

## Contexto del sistema
- El frontend captura eventos relevantes, especialmente clics hacia WhatsApp, mediante utilidades como:
  - `src/lib/whatsappTracker.ts`
  - `src/lib/gtm.ts`
  - componentes relacionados
- Estos eventos se envían a un endpoint/webhook que activa un flujo en n8n.
- El flujo de n8n procesa la información, la guarda en Google Sheets y luego envía un evento server-side a Meta mediante CAPI.

---

## Alcance de la auditoría
Debes inspeccionar y contrastar técnicamente todo el recorrido del evento, desde el disparo en frontend hasta la entrega final a Meta.

### 1) Deduplicación de eventos (CRÍTICO)
Verifica si existe un mecanismo real, consistente y confiable de deduplicación entre:
- el evento browser enviado por Pixel / GTM / frontend
- y el evento server-side enviado por n8n vía CAPI

Debes confirmar específicamente:
- si se genera un `event_id` o `eventID` único por evento
- si ese identificador es exactamente el mismo en browser y server
- en qué punto nace ese identificador
- por qué ruta viaja
- si se conserva intacto hasta Meta
- si el formato es consistente
- si existe riesgo de duplicados, colisiones o pérdida del identificador

Conclusión obligatoria:
- indicar claramente si Meta podrá deduplicar correctamente o no
- explicar por qué
- señalar el punto exacto de falla si la deduplicación no es confiable

---

### 2) Calidad de match y enriquecimiento de datos
Audita si se capturan, transportan y utilizan correctamente los parámetros de atribución y datos de usuario necesarios para mejorar el match quality:

#### Parámetros obligatorios a revisar
- `fbp`
- `fbc`
- IP del usuario
- User-Agent
- URL / página origen si aplica
- timestamp del evento
- event source URL si aplica

#### Revisión adicional
Valida si los datos del usuario:
- se están enviando correctamente al webhook
- llegan completos a n8n
- se transforman correctamente antes de enviarse a Meta
- se hashean cuando corresponde
- se omiten erróneamente
- podrían estar llegando vacíos, nulos o con nombres de campo incorrectos

Si encuentras pérdida de señal o campos mal mapeados, indícalo con precisión.

---

### 3) Estructura del payload hacia Meta CAPI
Revisa el nodo `HTTP Request` en n8n y valida que el payload cumpla con la estructura esperada por Meta CAPI para el tipo de evento implementado.

Debes verificar como mínimo:
- `event_name`
- `event_time` en Unix timestamp correcto
- `action_source`
- `event_id`
- `event_source_url` si aplica
- `user_data`
- `custom_data`
- consistencia de nombres de campos
- estructura del arreglo `data`
- endpoint utilizado
- versión del Graph API configurada
- headers relevantes
- formato general del body

Debes señalar:
- qué está correcto
- qué está incompleto
- qué está técnicamente mal
- qué podría causar rechazo, warnings, baja calidad de match o deduplicación fallida

---

### 4) Integridad del flujo end-to-end
Evalúa si el flujo completo presenta riesgos de:
- pérdida de eventos
- doble disparo
- reintentos duplicados
- orden incorrecto de ejecución
- race conditions
- dependencia de variables no persistentes
- divergencia entre datos del navegador y datos del servidor

Si detectas supuestos frágiles, dilo explícitamente.

---

### 5) Impacto en rendimiento y experiencia de usuario
Audita si la instrumentación del tracking en frontend podría afectar:
- Web Vitals
- Lighthouse
- TTI
- INP
- hilo principal
- navegación
- UX general

Valida especialmente si:
- el tracking bloquea interacciones
- las llamadas son síncronas o mal ubicadas
- hay lógica pesada en cliente
- hay riesgo de afectar el clic principal de conversión (ej. WhatsApp)

No propongas optimizaciones cosméticas: céntrate solo en riesgos reales y relevantes.

---

## Metodología esperada
No te limites a describir archivos. Quiero una auditoría real de arquitectura y flujo.

Debes:
1. rastrear el evento desde su origen hasta Meta
2. contrastar frontend, webhook, n8n y payload final
3. identificar fallas estructurales, no solo detalles menores
4. priorizar por severidad e impacto de negocio
5. proponer una única solución principal si detectas un problema crítico de deduplicación o señal

---

## Restricciones obligatorias
- NO modifiques todavía ningún archivo del proyecto
- NO apliques cambios de código
- NO refactorices por gusto
- NO propongas mejoras ajenas al objetivo de auditoría
- NO dañes estética, routing, UX ni funcionalidad actual
- Debes mantener una filosofía de cambios mínimos, quirúrgicos y de alto impacto

---

## Entregable obligatorio
Crea un archivo nuevo en la raíz del proyecto llamado:

`AUDITORIA_META_CAPI.md`

Ese archivo debe contener un informe estructurado con estas secciones exactas:

# AUDITORÍA META CAPI

## 1. Resumen ejecutivo
Explica en lenguaje técnico y directo el estado general del sistema.

## 2. Estado actual
Lista qué está bien y qué está fallando, clasificado por severidad:
- Crítico
- Alto
- Medio
- Bajo

## 3. Trazabilidad del evento
Describe el recorrido del evento de punta a punta:
frontend → GTM/dataLayer → webhook → n8n → Meta CAPI

## 4. Análisis de deduplicación
Explica si la deduplicación funcionará o no, con justificación técnica detallada.

## 5. Análisis de match quality
Evalúa `fbp`, `fbc`, IP, User-Agent y demás señales relevantes.

## 6. Validación del payload de Meta
Revisa la estructura enviada a Meta y señala desviaciones o riesgos.

## 7. Riesgos técnicos detectados
Incluye problemas de arquitectura, consistencia, pérdidas de señal o duplicación.

## 8. Plan de acción recomendado
Propón una solución paso a paso, en orden de implementación.

## 9. Solución principal recomendada
Si detectas un fallo crítico, propone UNA sola solución principal, la más efectiva y con menor riesgo.

## 10. Cambios mínimos requeridos
Indica únicamente los archivos que deberían tocarse y por qué.
Ejemplo:
- `src/lib/whatsappTracker.ts`
- `src/lib/gtm.ts`
- endpoint receptor
- `Ads_Clicks (7).json`

En esta sección no escribas código todavía; solo especifica cambios necesarios y justificación.

---

## Criterios de calidad de tu respuesta
Tu auditoría debe ser:
- técnica
- precisa
- crítica
- accionable
- sin relleno
- orientada a integridad del tracking y atribución real

Si detectas que falta el `event_id` compartido entre browser y server, o cualquier otra falla estructural de deduplicación, debes tratarlo como máxima prioridad y explicarlo con total claridad.

---

## Instrucción final
Una vez hayas creado y completado `AUDITORIA_META_CAPI.md`, avísame por aquí con un resumen ejecutivo breve de los hallazgos, sin aplicar todavía cambios de código. Espera mi aprobación antes de pasar a la fase de implementación..
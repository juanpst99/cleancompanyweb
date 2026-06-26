interface JsonLdProps {
  id: string
  data: Record<string, unknown> | Array<Record<string, unknown>>
}

/**
 * Serializa JSON-LD escapando <, > y & para que un valor que contenga
 * "</script>" (o "<!--") NO rompa el bloque <script> ni permita inyección de
 * HTML. JSON.stringify por sí solo NO escapa estos caracteres.
 */
export function toJsonLdHtml(
  data: Record<string, unknown> | Array<Record<string, unknown>>,
): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

/**
 * Renderiza JSON-LD como <script> NATIVO (no next/script) para que quede en el
 * HTML del servidor (SSR). Los crawlers de IA (GPTBot, ClaudeBot, PerplexityBot)
 * no ejecutan JavaScript; con next/script el schema se inyectaría en el cliente
 * y lo perderían. Este es el patrón oficial de Next App Router para datos
 * estructurados.
 */
export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLdHtml(data) }}
    />
  )
}

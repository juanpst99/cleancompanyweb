'use client'

import { getStoredAttribution } from '@/lib/ccAttribution'

export function formatWhatsappRefLine(): string {
  const a = getStoredAttribution()

  // ID corto y humano
  const id = a?.gclid
    ? `G:${a.gclid}`
    : a?.wbraid
    ? `W:${a.wbraid}`
    : a?.gbraid
    ? `B:${a.gbraid}`
    : 'DIRECT'

  // Timestamp opcional
  const ts = a?.ts ? ` · ${a.ts}` : ''

  // ✅ Línea 1 sola, discreta
  return `🧾 Código de referencia: ${id}${ts}`
}

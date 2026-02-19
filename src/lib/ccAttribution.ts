'use client'

export type CCAttribution = {
  ts: string
  gclid?: string
  wbraid?: string
  gbraid?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  landing_url?: string
}

const STORAGE_KEY = 'cc_attrib_v1'

function nowBogotaTs() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  // Timestamp simple en -05:00 (no perfecto con DST, pero Colombia no usa DST)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}-0500`
}

export function captureAndPersistAttribution(): CCAttribution | null {
  if (typeof window === 'undefined') return null

  const sp = new URLSearchParams(window.location.search)

  const attrib: CCAttribution = {
    ts: nowBogotaTs(),
    gclid: sp.get('gclid') || undefined,
    wbraid: sp.get('wbraid') || undefined,
    gbraid: sp.get('gbraid') || undefined,
    utm_source: sp.get('utm_source') || undefined,
    utm_medium: sp.get('utm_medium') || undefined,
    utm_campaign: sp.get('utm_campaign') || undefined,
    utm_term: sp.get('utm_term') || undefined,
    utm_content: sp.get('utm_content') || undefined,
    landing_url: window.location.href,
  }

  // Solo persistimos si viene click-id (para no llenar storage con tráfico directo)
  if (attrib.gclid || attrib.wbraid || attrib.gbraid) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attrib))
    return attrib
  }

  return null
}

export function getStoredAttribution(): CCAttribution | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as CCAttribution
  } catch {
    return null
  }
}

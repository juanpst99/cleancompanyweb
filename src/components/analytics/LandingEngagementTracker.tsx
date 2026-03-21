'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pushToDataLayer } from '@/lib/gtm'

/**
 * Tracks scroll depth and time on page for promo landing pages.
 *
 * Events pushed to dataLayer (GA4-friendly, no collision with Enhanced Measurement):
 *
 *   landing_scroll_depth  — fires once per threshold (50%, 75%, 100%)
 *     { scroll_percent: number, page_path: string }
 *
 *   landing_time_on_page  — fires once per interval (30s, 60s, 120s, 300s)
 *     { engagement_seconds: number, page_path: string }
 *
 * These events are NOT sent to Meta Pixel. They stay in GTM/dataLayer for
 * GA4 analytics and audience building (e.g. "visitors with scroll ≥ 50%").
 *
 * Render inside any Server Component page. Renders nothing to the DOM.
 */
export default function LandingEngagementTracker() {
  const pathname = usePathname()

  // ── Scroll depth ──────────────────────────────────────────────
  useEffect(() => {
    const thresholds = [50, 75, 100]
    const fired = new Set<number>()

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const pct = Math.round((window.scrollY / scrollHeight) * 100)

      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t)
          pushToDataLayer({
            event: 'landing_scroll_depth',
            scroll_percent: t,
            page_path: pathname,
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // ── Time on page ──────────────────────────────────────────────
  useEffect(() => {
    const intervals = [30, 60, 120, 300]
    const timers: ReturnType<typeof setTimeout>[] = []

    for (const seconds of intervals) {
      timers.push(
        setTimeout(() => {
          pushToDataLayer({
            event: 'landing_time_on_page',
            engagement_seconds: seconds,
            page_path: pathname,
          })
        }, seconds * 1000),
      )
    }

    return () => {
      timers.forEach((t) => clearTimeout(t))
    }
  }, [pathname])

  return null
}

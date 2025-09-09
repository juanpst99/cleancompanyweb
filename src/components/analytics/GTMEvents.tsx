'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function GTMEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : '')
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      event: 'pageview',
      page_location: url,
    })
  }, [pathname, searchParams])

  return null
}


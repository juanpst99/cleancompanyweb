'use client'

import { useEffect } from 'react'
import { captureAndPersistAttribution } from '@/lib/ccAttribution'

export function AttributionInit() {
  useEffect(() => {
    captureAndPersistAttribution()
  }, [])

  return null
}

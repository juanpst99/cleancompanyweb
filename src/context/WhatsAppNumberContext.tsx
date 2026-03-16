'use client'

import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

/**
 * Provides a forced WhatsApp number override for a specific page or section.
 * When a component tree is wrapped with WhatsAppOverrideProvider, every call to
 * useWhatsAppNumber() inside it returns the override number instead of the
 * day-based dynamic number. Pages outside the provider are not affected.
 */
const WhatsAppNumberContext = createContext<string | null>(null)

export function WhatsAppOverrideProvider({
  number,
  children,
}: {
  number: string
  children: ReactNode
}) {
  return (
    <WhatsAppNumberContext.Provider value={number}>
      {children}
    </WhatsAppNumberContext.Provider>
  )
}

export function useWhatsAppOverride(): string | null {
  return useContext(WhatsAppNumberContext)
}

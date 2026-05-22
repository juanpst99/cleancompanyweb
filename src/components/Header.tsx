'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useWhatsAppNumber } from '@/hooks/useWhatsAppNumber'
import { trackWhatsAppClick } from '@/lib/whatsappTracker'

type NavItem =
  | { name: string; href: string }
  | { name: string; children: { name: string; href: string; description?: string }[] }

const NAV_ITEMS: NavItem[] = [
  { name: 'Inicio', href: '/' },
  {
    name: 'Servicios',
    children: [
      { name: 'Lavado de alfombras y tapetes', href: '/servicios/alfombras', description: 'Persas, sintéticas y de área' },
      { name: 'Lavado de muebles y sofás', href: '/servicios/muebles', description: 'Tela, cuero y tapicería' },
      { name: 'Lavado de colchones', href: '/servicios/colchones', description: 'Antiácaros y desinfección' },
      { name: 'Limpieza interior de vehículos', href: '/servicios/vehiculos', description: 'Tapicería, alfombras y techo' },
      { name: 'Servicio empresarial', href: '/servicios/empresarial', description: 'Oficinas, hoteles y PH' },
    ],
  },
  { name: 'Proceso', href: '/proceso-de-lavado' },
  { name: 'Garantía', href: '/garantia' },
  { name: 'Preguntas', href: '/preguntas-frecuentes' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacto', href: '/contacto' },
]

const WA_MESSAGE = 'Hola, quiero cotizar un servicio con Clean Company'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const whatsappNumber = useWhatsAppNumber()

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>, closeFn?: () => void) => {
    e.preventDefault()
    closeFn?.()
    const { ref } = trackWhatsAppClick()
    const fullMessage = `${WA_MESSAGE} (Ref: ${ref})`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`
    if (typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: any[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({ event: 'whatsapp_click', source: 'header_cta', ref, link_url: url })
    }
    setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 250)
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar dropdown al click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const linkColor = scrolled ? 'text-gray-800' : 'text-white'
  const linkHover = scrolled ? 'hover:text-[#3AAA35]' : 'hover:text-yellow-300'

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center" aria-label="Clean Company — Inicio">
            <Image
              src="/images/logo/clean-company-logo.png"
              alt="Clean Company — Limpieza profesional"
              width={300}
              height={80}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-7" ref={dropdownRef}>
            {NAV_ITEMS.map((item) => {
              if ('children' in item) {
                const isOpen = openDropdown === item.name
                return (
                  <li key={item.name} className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                      onMouseEnter={() => setOpenDropdown(item.name)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1 font-medium transition ${linkColor} ${linkHover}`}
                    >
                      {item.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                    {isOpen && (
                      <div
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute left-0 mt-3 w-80 rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-2"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                          >
                            <span className="block font-semibold text-gray-900 text-sm">{child.name}</span>
                            {child.description && (
                              <span className="block text-xs text-gray-500 mt-0.5">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                )
              }
              return (
                <li key={item.name}>
                  <Link href={item.href} className={`font-medium transition ${linkColor} ${linkHover}`}>
                    {item.name}
                  </Link>
                </li>
              )
            })}

            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleWhatsAppClick(e)}
                className="inline-flex items-center gap-2 rounded-full bg-[#3AAA35] text-white px-4 py-2 text-sm font-semibold shadow-sm hover:opacity-95 transition"
              >
                Cotizar por WhatsApp
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className={`lg:hidden ${scrolled ? 'text-gray-900' : 'text-white'}`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-xl p-3 absolute top-full left-3 right-3 max-h-[80vh] overflow-y-auto">
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                if ('children' in item) {
                  const open = openMobileGroup === item.name
                  return (
                    <li key={item.name}>
                      <button
                        type="button"
                        onClick={() => setOpenMobileGroup(open ? null : item.name)}
                        aria-expanded={open}
                        className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-gray-900 font-semibold hover:bg-gray-50"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                      </button>
                      {open && (
                        <ul className="ml-2 mt-1 space-y-1 border-l border-gray-100 pl-3">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                              >
                                <span className="block text-sm font-medium">{child.name}</span>
                                {child.description && (
                                  <span className="block text-xs text-gray-500">{child.description}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                }
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => handleWhatsAppClick(e, () => setIsMenuOpen(false))}
              className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#3AAA35] text-white px-4 py-3 text-sm font-semibold shadow-sm hover:opacity-95 transition"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

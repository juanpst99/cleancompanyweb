'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/#nosotros' },
    { name: 'Servicios', href: '/#servicios' },
    { name: 'Clientes', href: '/#clientes' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contacto', href: '/#contacto' }
  ]

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si es navegación interna a la home o a una sección de la home, usar router push
    if (href === '/' || href.startsWith('/#')) {
      e.preventDefault();
      window.location.href = href;
      setIsMenuOpen(false);
      return;
    }
    // Si es un anchor local en la misma página
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
      return;
    }
    // Por defecto, dejar el comportamiento normal
  }

  return (
    <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
             <Image 
    src="/images/logo/clean-company-logo.png"
    alt="Clean Company - Limpieza profesional"
    width={300}
    height={80}
    className="h-12 w-auto"
    priority
  />
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`font-medium hover:text-blue-400 transition ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${scrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 absolute top-full left-4 right-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href)}
                    className="block py-2 text-gray-700 hover:text-blue-600"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
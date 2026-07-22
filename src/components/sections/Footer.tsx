'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Clock } from 'lucide-react'
import WhatsAppLink from '@/components/WhatsAppLink'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo/clean-company-logo.png"
                alt="Clean Company"
                width={240}
                height={70}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Lavado profesional de alfombras, muebles y colchones a domicilio en Bogotá y
              Medellín desde 2015.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/profile.php?id=100092972695790"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"
                aria-label="Facebook Clean Company"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/cleancompany_colombia/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-pink-600 transition"
                aria-label="Instagram Clean Company"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/servicios/alfombras" className="hover:text-white transition">
                  Lavado de alfombras y tapetes
                </Link>
              </li>
              <li>
                <Link href="/servicios/muebles" className="hover:text-white transition">
                  Lavado de muebles y sofás
                </Link>
              </li>
              <li>
                <Link href="/servicios/colchones" className="hover:text-white transition">
                  Lavado de colchones
                </Link>
              </li>
              <li>
                <Link href="/servicios/vehiculos" className="hover:text-white transition">
                  Limpieza interior de vehículos
                </Link>
              </li>
              <li>
                <Link href="/servicios/empresarial" className="hover:text-white transition">
                  Servicio empresarial
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Información</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/proceso-de-lavado" className="hover:text-white transition">
                  Nuestro proceso
                </Link>
              </li>
              <li>
                <Link href="/garantia" className="hover:text-white transition">
                  Garantía y reclamaciones
                </Link>
              </li>
              <li>
                <Link href="/preguntas-frecuentes" className="hover:text-white transition">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/medellin" className="hover:text-white transition">
                  Cobertura Medellín y área metropolitana
                </Link>
              </li>
              <li>
                <Link href="/oriente" className="hover:text-white transition">
                  Cobertura Oriente antioqueño
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="hover:text-white transition">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto y sedes</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Bogotá</p>
                  <p>Calle 22J #104-30</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Medellín</p>
                  <p>Calle 30 #78-54</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p>Lun – Sáb: 8:00 a. m. – 5:00 p. m.</p>
                  <p>Domingos: línea de emergencia</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="tel:+573128052720" className="hover:text-white transition">
                  +57 312 805 2720
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a
                  href="mailto:cleancompanymed@gmail.com"
                  className="hover:text-white transition"
                >
                  cleancompanymed@gmail.com
                </a>
              </div>
            </div>
            <WhatsAppLink
              message="Hola, quiero más información sobre los servicios de Clean Company."
              className="mt-4 inline-flex items-center bg-[#3AAA35] text-white px-5 py-2 rounded-full hover:opacity-95 transition text-sm font-semibold"
            >
              <Phone className="w-4 h-4 mr-2" />
              Cotizar por WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-gray-400 text-sm">
            <p className="text-center md:text-left">
              &copy; {currentYear} Clean Company. Todos los derechos reservados.
            </p>
            <p>Lavado profesional en Bogotá y Medellín</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
              Lavado profesional de alfombras, muebles y colchones a domicilio en Bogotá y Medellín desde 2015.
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
                <button 
                  onClick={() => scrollToSection('#servicio-alfombras')}
                  className="hover:text-white transition text-left"
                >
                  Lavado de Alfombras
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#servicio-muebles')}
                  className="hover:text-white transition text-left"
                >
                  Lavado de Muebles
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('#servicio-colchones')}
                  className="hover:text-white transition text-left"
                >
                  Lavado de Colchones
                </button>
              </li>
              <li>
                <a href="https://wa.me/573128052720?text=Hola,%20quiero%20información%20sobre%20limpieza%20de%20vehículos" className="hover:text-white transition">
                  Limpieza de Vehículos
                </a>
              </li>
              <li>
                <a href="https://wa.me/573128052720?text=Hola,%20quiero%20información%20sobre%20servicios%20empresariales" className="hover:text-white transition">
                  Servicio Empresarial
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Ubicaciones</h4>
            <div className="space-y-4 text-gray-400">
              <div>
                <p className="font-medium text-white">Bogotá</p>
                <p className="text-sm">Calle 22J #104-30</p>
                <p className="text-sm">Lun-Sáb: 8:00 AM - 5:00 PM</p>
              </div>
              <div>
                <p className="font-medium text-white">Medellín</p>
                <p className="text-sm">Calle 30 #78-54</p>
                <p className="text-sm">Lun-Sáb: 8:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+573128052720" className="hover:text-white transition">
                  +57 312 805 2720
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:cleancompanymed@gmail.com" className="hover:text-white transition text-sm">
                  cleancompanymed@gmail.com
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <div>
                  <p className="text-sm">Servicio a domicilio en</p>
                  <p className="text-sm">Bogotá y Medellín</p>
                </div>
              </div>
            </div>
            <a 
              href="https://wa.me/573128052720"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition mt-4"
            >
              <Phone className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              &copy; {currentYear} Clean Company. Todos los derechos reservados.
            </p>
            <p className="text-gray-400 text-sm">
              Lavado profesional en Bogotá y Medellín
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
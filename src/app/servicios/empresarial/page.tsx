// src/app/servicios/empresarial/page.tsx
import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import { Building, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Servicio de Limpieza Empresarial en Bogotá y Medellín | Clean Company',
  description: 'Limpieza profesional para oficinas, edificios y empresas. Planes mensuales y atención prioritaria. Clean Company.',
  keywords: ['limpieza empresarial bogotá', 'limpieza oficinas medellín', 'servicio limpieza empresas'],
}

export default function EmpresarialPage() {
  return (
    <>
      <Header />
      <WhatsAppButton />
      
      <section className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white mb-6 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>
          
          <div className="text-center text-white max-w-3xl mx-auto">
            <Building className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Servicio Empresarial
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Soluciones de limpieza profesional para empresas, oficinas y edificios en Bogotá y Medellín.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Servicios Corporativos</h2>
              <ul className="text-left max-w-md mx-auto space-y-3">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Limpieza de oficinas y espacios de trabajo
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Mantenimiento de áreas comunes
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Limpieza de salas de juntas
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Planes mensuales personalizados
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  Atención prioritaria
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-400 text-blue-900 p-6 rounded-2xl mb-8 inline-block">
              <p className="text-2xl font-bold">Descuentos especiales</p>
              <p className="text-lg">para contratos anuales</p>
            </div>
            
            <div>
              <a 
                href="https://wa.me/573128052720?text=Hola,%20quiero%20información%20sobre%20servicios%20empresariales"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z"/>
                </svg>
                Solicitar Cotización
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}

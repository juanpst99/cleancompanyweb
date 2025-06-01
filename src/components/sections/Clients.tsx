'use client'

import React from 'react'
import { Building, Hotel, Hospital, Store } from 'lucide-react'

const Clients = () => {
  const clientIcons = [
    { icon: Building, name: "Edificios Corporativos" },
    { icon: Hotel, name: "Hoteles" },
    { icon: Hospital, name: "Clínicas" },
    { icon: Store, name: "Comercios" }
  ]

  return (
    <section id="clientes" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Confían en Nosotros</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Empresas líderes en Colombia eligen Clean Company
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clientIcons.map((client, index) => (
            <div 
              key={index}
              className="bg-white p-12 rounded-2xl shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 group"
            >
              <client.icon className="w-16 h-16 text-gray-400 group-hover:text-blue-600 transition-colors mb-4" />
              <p className="text-sm text-gray-600 text-center">{client.name}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Más de 50 empresas en Medellín y Bogotá confían en nuestros servicios corporativos
          </p>
          <a 
            href="https://wa.me/573128052720?text=Hola,%20quiero%20información%20sobre%20servicios%20corporativos."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Solicitar Plan Empresarial
          </a>
        </div>
      </div>
    </section>
  )
}

export default Clients
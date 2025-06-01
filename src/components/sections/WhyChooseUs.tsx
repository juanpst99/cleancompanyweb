'use client'

import React from 'react'
import { Shield, Clock, Leaf, Users } from 'lucide-react'

const WhyChooseUs = () => {
  const features = [
    {
      icon: Shield,
      title: "100% Garantizado",
      description: "Satisfacción total o repetimos el servicio sin costo",
      bgColor: "bg-blue-100",
      hoverBgColor: "hover:bg-blue-600",
      iconColor: "text-blue-600",
      hoverIconColor: "group-hover:text-white"
    },
    {
      icon: Clock,
      title: "Puntualidad",
      description: "Llegamos a tiempo y cumplimos los plazos acordados",
      bgColor: "bg-green-100",
      hoverBgColor: "hover:bg-green-600",
      iconColor: "text-green-600",
      hoverIconColor: "group-hover:text-white"
    },
    {
      icon: Leaf,
      title: "Eco-Amigable",
      description: "Productos biodegradables que cuidan tu salud",
      bgColor: "bg-emerald-100",
      hoverBgColor: "hover:bg-emerald-600",
      iconColor: "text-emerald-600",
      hoverIconColor: "group-hover:text-white"
    },
    {
      icon: Users,
      title: "Personal Certificado",
      description: "Equipo capacitado y con experiencia comprobada",
      bgColor: "bg-purple-100",
      hoverBgColor: "hover:bg-purple-600",
      iconColor: "text-purple-600",
      hoverIconColor: "group-hover:text-white"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">¿Por qué elegir Clean Company?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Más de una década transformando espacios con los más altos estándares de calidad
        </p>
        
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group text-center transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`${feature.bgColor} ${feature.hoverBgColor} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 shadow-lg`}>
                <feature.icon className={`w-10 h-10 ${feature.iconColor} ${feature.hoverIconColor} transition-colors`} />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
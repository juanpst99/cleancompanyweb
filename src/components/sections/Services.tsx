'use client'

import React from 'react'
import Image from 'next/image'
import { Check, ArrowRight, Car, Building } from 'lucide-react'
import Link from 'next/link'

const Services = () => {
  const services = [
    {
      id: 'alfombras',
      title: "Alfombras y Tapetes",
      description: "Eliminamos manchas difíciles y olores. Recuperamos el color y textura original.",
      image: "/images/servicios/lavado-tapete.webp",
      features: ["Limpieza profunda", "Desinfección total", "Secado rápido"],
      whatsappMessage: "Hola, quiero cotizar limpieza de alfombras",
      link: "/servicios/alfombras"
    },
    {
      id: 'muebles',
      title: "Muebles",
      description: "Renovamos sofás, sillas y todo tipo de tapicería. Como nuevos garantizado.",
      image: "/images/servicios/lavado-sofa.webp",
      features: ["Todo tipo de telas", "Eliminación de ácaros", "Sin daño a la tela"],
      whatsappMessage: "Hola, quiero cotizar limpieza de muebles",
      link: "/servicios/muebles"
    },
    {
      id: 'colchones',
      title: "Colchones",
      description: "Desinfección profunda para un descanso saludable. Eliminamos ácaros y bacterias.",
      image: "/images/servicios/lavado-colchon.webp",
      features: ["Anti-alérgenos", "Eliminación de manchas", "Aroma fresco"],
      whatsappMessage: "Hola, quiero cotizar limpieza de colchones",
      link: "/servicios/colchones"
    }
  ]

  const additionalServices = [
    {
      icon: Car,
      title: "Vehículos",
      desc: "Limpieza detallada interior",
      detail: "Dejamos tu vehículo impecable por dentro. Tapicería, alfombras y techos como nuevos.",
      whatsappMessage: "Hola, quiero cotizar servicio de vehículos",
      link: "/servicios/vehiculos"
    },
    {
      icon: Building,
      title: "Empresarial",
      desc: "Oficinas y edificios",
      detail: "Servicio especializado para empresas. Planes mensuales y atención prioritaria.",
      whatsappMessage: "Hola, quiero cotizar servicio empresarial",
      link: "/servicios/empresarial"
    }
  ]

  return (
    <section id="servicios" className="py-12 sm:py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Nuestros Servicios</h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Soluciones profesionales de limpieza para tu hogar y empresa
        </p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={service.image} 
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-xl sm:text-2xl font-bold">{service.title}</h3>
              </div>
              
              <div className="p-5 sm:p-6">
                <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" />
                     {feature}
                   </li>
                 ))}
               </ul>
               
               <div className="space-y-3">
                 <a 
                   href={`https://wa.me/573128052720?text=${encodeURIComponent(service.whatsappMessage)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-md text-sm sm:text-base"
                 >
                   Cotizar Ahora
                 </a>
                 <Link
                   href={service.link}
                   className="w-full text-blue-600 font-semibold hover:text-blue-700 flex items-center justify-center group text-sm sm:text-base"
                 >
                   Ver más detalles
                   <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>
           </div>
         ))}
       </div>
       
       {/* Additional Services */}
       <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12">
         {additionalServices.map((service, index) => (
           <div key={index} className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
             <div className="flex items-start mb-4">
               <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 sm:p-4 rounded-xl mr-4">
                 <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
               </div>
               <div className="flex-1">
                 <h3 className="text-lg sm:text-xl font-bold mb-1">{service.title}</h3>
                 <p className="text-gray-600 text-sm">{service.desc}</p>
               </div>
             </div>
             <p className="text-gray-600 mb-4 text-sm sm:text-base">{service.detail}</p>
             <div className="flex items-center justify-between">
               <a 
                 href={`https://wa.me/573128052720?text=${encodeURIComponent(service.whatsappMessage)}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group text-sm sm:text-base"
               >
                 Cotizar servicio 
                 <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
               </a>
               {service.link && (
                 <Link
                   href={service.link}
                   className="text-gray-600 hover:text-gray-800 text-sm"
                 >
                   Más info
                 </Link>
               )}
             </div>
           </div>
         ))}
       </div>
     </div>
   </section>
 )
}

export default Services
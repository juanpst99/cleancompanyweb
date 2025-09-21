'use client'

import React from 'react'
import Image from 'next/image'
import { Check, Clock, Shield, Sparkles } from 'lucide-react'

const ServiceDetails = () => {
  const serviceDetails = [
    {
      id: 'alfombras',
      title: 'Limpieza de Alfombras y Tapetes',
      hero: '/images/detalles-servicios/lavado-alfombra.webp',
      description: 'Servicio especializado en limpieza profunda de alfombras y tapetes con tecnología de punta.',
      process: [
        'Inspección inicial y evaluación del estado',
        'Aspirado profundo para remover polvo y partículas',
        'Aplicación de productos especializados eco-amigables',
        'Limpieza con máquinas de extracción profunda',
        'Tratamiento antimanchas y protección de fibras',
        'Secado rápido con equipos especializados'
      ],
      benefits: [
        'Eliminación del 99.9% de bacterias y ácaros',
        'Recuperación del color original',
        'Prolongación de la vida útil de tu alfombra',
        'Ambiente más saludable para tu familia',
        'Eliminación de olores persistentes'
      ],
      faqs: [
        {
          question: '¿Cuánto tiempo tarda en secar?',
          answer: 'Con nuestro sistema de secado rápido, tu alfombra estará lista en 5-6 días.'
        },
        {
          question: '¿Los productos son seguros para mascotas?',
          answer: 'Sí, utilizamos productos 100% biodegradables y seguros para toda la familia.'
        },
        {
          question: '¿Cada cuánto debo limpiar mi alfombra?',
          answer: 'Recomendamos una limpieza profunda cada 6-12 meses según el uso.'
        }
      ]
    },
    {
      id: 'muebles',
      title: 'Limpieza de Muebles y Tapicería',
      hero: '/images/detalles-servicios/lavado-sofa.webp',
      description: 'Renovamos tus muebles con técnicas profesionales que los dejan como nuevos.',
      process: [
        'Evaluación del tipo de tela y estado del mueble',
        'Aspirado minucioso de toda la superficie',
        'Pre-tratamiento de manchas difíciles',
        'Limpieza profunda con equipos especializados',
        'Desinfección y eliminación de ácaros',
        'Acabado con protector de telas'
      ],
      benefits: [
        'Muebles como nuevos sin necesidad de retapizar',
        'Eliminación de manchas y olores',
        'Protección contra futuras manchas',
        'Mayor durabilidad de la tapicería',
        'Ambiente libre de alérgenos'
      ],
      faqs: [
        {
          question: '¿Puedo usar mis muebles el mismo día?',
          answer: 'Sí, nuestro proceso de secado rápido permite usar los muebles en 3-5 horas.'
        },
        {
          question: '¿Trabajan con cuero?',
          answer: 'Sí, tenemos tratamientos especializados para cuero y piel.'
        },
        {
          question: '¿Qué tipos de manchas pueden eliminar?',
          answer: 'Eliminamos manchas de comida, bebidas, mascotas, tinta y más.'
        }
      ]
    },
    {
      id: 'colchones',
      title: 'Limpieza y Desinfección de Colchones',
      hero: '/images/detalles-servicios/lavado-colchon.webp',
      description: 'Servicio especializado para un descanso saludable y libre de alérgenos.',
      process: [
        'Inspección completa del colchón',
        'Aspirado profundo de ambos lados',
        'Aplicación de tratamiento anti-ácaros',
        'Limpieza con vapor a alta temperatura',
        'Desinfección y eliminación de bacterias',
        'Aplicación de protector hipoalergénico'
      ],
      benefits: [
        'Eliminación total de ácaros y bacterias',
        'Mejor calidad del sueño',
        'Reducción de alergias respiratorias',
        'Colchón fresco y sin olores',
        'Prolongación de la vida útil del colchón'
      ],
      faqs: [
        {
          question: '¿Necesito voltear el colchón?',
          answer: 'No te preocupes, nuestro equipo se encarga de limpiar ambos lados.'
        },
        {
          question: '¿Es seguro para bebés?',
          answer: 'Totalmente seguro. Usamos productos hipoalergénicos certificados.'
        },
        {
          question: '¿Con qué frecuencia debo limpiar mi colchón?',
          answer: 'Recomendamos cada 6 meses para mantener un ambiente saludable.'
        }
      ]
    }
  ]

  return (
    <>
      {serviceDetails.map((service) => (
        <section key={service.id} id={`servicio-${service.id}`} className="py-12 sm:py-20 bg-white">
          <div className="container mx-auto px-4">
            {/* Hero del servicio */}
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8 sm:mb-12">
              <Image 
                src={service.hero} 
                alt={service.title}
                fill
                sizes="100vw"
                loading="lazy"
                decoding="async"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 sm:p-8 text-white">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">{service.title}</h2>
                  <p className="text-base sm:text-xl">{service.description}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
              {/* Proceso */}
              <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
                  Nuestro Proceso
                </h3>
                <ol className="space-y-3 sm:space-y-4">
                  {service.process.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-3 flex-shrink-0 text-sm sm:text-base">
                        {index + 1}
                      </span>
                      <p className="text-sm sm:text-base text-gray-700">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Beneficios */}
              <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mr-3" />
                  Beneficios
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-gray-700">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-gray-100 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-3" />
                Preguntas Frecuentes
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="bg-white p-4 sm:p-6 rounded-lg">
                    <h4 className="font-semibold mb-2 text-sm sm:text-base">{faq.question}</h4>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-8 sm:mt-12">
              <a 
                href={`https://wa.me/573128052720?text=${encodeURIComponent(`Hola, quiero más información sobre ${service.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Cotizar {service.title}
              </a>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default ServiceDetails
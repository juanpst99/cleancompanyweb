'use client'

import React from 'react'
import { Award, Target, Eye } from 'lucide-react'

const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Nuestra Historia</h2>
            <p className="text-gray-600 text-lg">
              Desde 2015, Clean Company ha sido líder en servicios de limpieza profesional 
              en Medellín y Bogotá. Nacimos con la visión de transformar espacios y mejorar 
              la calidad de vida de nuestros clientes.
            </p>
            <p className="text-gray-600">
              Con más de 10 años de experiencia, hemos perfeccionado nuestras técnicas y 
              actualizado constantemente nuestros equipos para ofrecer resultados excepcionales. 
              Nuestro compromiso con la excelencia y la satisfacción del cliente nos ha 
              convertido en la primera opción para miles de hogares y empresas.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <Target className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-semibold text-xl mb-3 text-blue-600">Misión</h4>
                <p className="text-sm text-gray-600">
                  Brindar servicios de limpieza que superen expectativas, 
                  creando ambientes saludables y confortables.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <Eye className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-semibold text-xl mb-3 text-blue-600">Visión</h4>
                <p className="text-sm text-gray-600">
                  Ser la empresa líder en limpieza profesional en Colombia, 
                  reconocida por calidad e innovación.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl">
              <Award className="w-12 h-12 mb-4" />
              <h4 className="text-2xl font-bold mb-2">Valores</h4>
              <ul className="space-y-2">
                <li>• Compromiso con la excelencia</li>
                <li>• Honestidad y transparencia</li>
                <li>• Respeto por el medio ambiente</li>
                <li>• Innovación constante</li>
              </ul>
            </div>
            
            <a 
              href="https://wa.me/573128052720?text=Quiero%20conocer%20más%20sobre%20Clean%20Company"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Conoce más
            </a>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
              alt="Equipo Clean Company"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
              <div className="text-5xl font-bold">10+</div>
              <div className="text-lg">Años de Experiencia</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-blue-900 p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">5000+</div>
              <div className="text-sm">Clientes Felices</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
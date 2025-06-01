'use client'

import React from 'react'
import { ArrowRight, Calendar, User } from 'lucide-react'

const Blog = () => {
  const articles = [
    {
      id: 1,
      title: "5 Consejos para Mantener tus Alfombras Limpias",
      excerpt: "Descubre los mejores trucos para prolongar la vida útil de tus alfombras y mantenerlas siempre impecables.",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600",
      date: "15 Mayo 2024",
      author: "Clean Company",
      category: "Consejos"
    },
    {
      id: 2,
      title: "Beneficios de la Limpieza Ecológica",
      excerpt: "Por qué los productos biodegradables son mejores para tu familia y el medio ambiente.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
      date: "10 Mayo 2024",
      author: "Clean Company",
      category: "Salud"
    },
    {
      id: 3,
      title: "¿Cada Cuánto Limpiar tus Muebles?",
      excerpt: "La frecuencia ideal para mantener tus muebles en perfecto estado y libre de ácaros.",
      image: "https://images.unsplash.com/photo-1545378763-505b1a205ad2?w=600",
      date: "5 Mayo 2024",
      author: "Clean Company",
      category: "Mantenimiento"
    }
  ]

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Blog y Consejos</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="overflow-hidden rounded-2xl mb-4 shadow-lg">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {article.category}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {article.author}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600">{article.excerpt}</p>
                
                <a 
                  href="#" 
                  className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group/link"
                >
                  Leer más 
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#"
            className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
          >
            Ver todos los artículos
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog
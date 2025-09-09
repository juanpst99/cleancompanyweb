 import { Metadata } from 'next'
  import Header from '@/components/Header'
  import Footer from '@/components/sections/Footer'
  import WhatsAppButton from '@/components/WhatsAppButton'
  import { ArrowRight, Calendar, User } from 'lucide-react'

  export const metadata: Metadata = {
    title: 'Blog y Consejos de Limpieza | Clean Company',
    description: 'Consejos profesionales para el cuidado de alfombras, muebles y colchones. Aprende las mejores técnicas de limpieza y
  mantenimiento.',
    keywords: ['blog limpieza', 'consejos lavado alfombras', 'cuidado muebles', 'mantenimiento colchones', 'tips limpieza profesional'],
  }

  const articles = [
    {
      id: 1,
      title: "5 Consejos para Mantener tus Alfombras Limpias",
      excerpt: "Descubre los mejores trucos para prolongar la vida útil de tus alfombras y mantenerlas siempre impecables.",
      image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600",
      date: "15 Mayo 2024",
      author: "Clean Company",
      category: "Consejos",
      slug: "5-consejos-mantener-alfombras-limpias"
    },
    {
      id: 2,
      title: "Beneficios de la Limpieza Ecológica",
      excerpt: "Por qué los productos biodegradables son mejores para tu familia y el medio ambiente.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
      date: "10 Mayo 2024",
      author: "Clean Company",
      category: "Salud",
      slug: "beneficios-limpieza-ecologica"
    },
    {
      id: 3,
      title: "¿Cada Cuánto Limpiar tus Muebles?",
      excerpt: "La frecuencia ideal para mantener tus muebles en perfecto estado y libre de ácaros.",
      image: "https://images.unsplash.com/photo-1545378763-505b1a205ad2?w=600",
      date: "5 Mayo 2024",
      author: "Clean Company",
      category: "Mantenimiento",
      slug: "cada-cuanto-limpiar-muebles"
    }
  ]

  export default function BlogPage() {
    return (
      <>
        <Header />
        <WhatsAppButton />

        <main className="min-h-screen pt-20">
          <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="container mx-auto px-4">
              <div className="text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Blog y Consejos de Limpieza</h1>
                <p className="text-xl opacity-90 max-w-2xl mx-auto">
                  Aprende de los expertos: trucos, consejos y guías para mantener tus espacios impecables
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <article
                    key={article.id}
                    className="group cursor-pointer transform hover:-translate-y-2 transition-all duration-300 bg-white rounded-2xl
  overflow-hidden shadow-lg"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
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

                      <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-600">{article.excerpt}</p>

                      <a
                        href={`/blog/${article.slug}`}
                        className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group/link"
                      >
                        Leer más
                        <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                {[4, 5, 6].map((num) => (
                  <div key={num} className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                      <div className="bg-gray-200 h-4 rounded w-24 mb-4"></div>
                      <div className="bg-gray-200 h-6 rounded mb-3"></div>
                      <div className="bg-gray-200 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                    </div>
                    <p className="text-center text-gray-500 mt-4 text-sm">Próximamente</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    )
  }

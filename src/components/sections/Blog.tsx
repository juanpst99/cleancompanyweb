import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'
import { getRecentPosts, formatPostDate } from '@/lib/posts'

const Blog = async () => {
  const articles = await getRecentPosts(3)

  // Si no hay artículos publicados, no renderizamos la sección.
  if (!articles.length) return null

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Blog y Consejos</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group block cursor-pointer transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="overflow-hidden rounded-2xl mb-4 shadow-lg relative">
                <div className="relative h-48 w-full bg-gray-100">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      loading="lazy"
                      decoding="async"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50" />
                  )}
                </div>
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm z-10">
                  {article.category}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  {article.date && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatPostDate(article.date)}
                    </div>
                  )}
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Clean Company
                  </div>
                </div>

                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>

                <span className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group/link">
                  Leer más
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-full hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Blog

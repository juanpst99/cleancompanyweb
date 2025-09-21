'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import {
  Check,
  Sparkles,
  Shield,
  Clock,
  ArrowLeft,
  Star,
  Heart,
  Lock,
  CreditCard,
  Users,
  Leaf,
  ChevronDown,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'

export default function AlfombrasClient() {
  const searchParams = useSearchParams()
  const ciudad = searchParams.get('ciudad') || 'Bogotá y Medellín'
  const descuento = searchParams.get('desc') || '20'
  const utm_campaign = searchParams.get('utm_campaign')

  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    cuando: '',
  })

  useEffect(() => {
    console.log(`Ciudad para mostrar en AlfombrasClient: ${ciudad}`)
  }, [ciudad])

  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 52 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mensaje = `Hola, quiero cotizar lavado de alfombras. Nombre: ${formData.nombre}, Ciudad: ${formData.ciudad}, Cuando: ${formData.cuando}`
    const whatsappUrl = `https://wa.me/573128052720?text=${encodeURIComponent(mensaje)}`

    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: any }).dataLayer) {
      ;(window as unknown as { dataLayer?: any }).dataLayer.push({
        event: 'form_submit',
        form_type: 'cotizacion_alfombras',
        utm_campaign: utm_campaign,
      })
    }

    window.open(whatsappUrl, '_blank')
  }

  const testimoniosAlfombras = [
    {
      nombre: 'María Rodríguez',
      barrio: 'Chicó, Bogotá',
      foto: '/images/testimonios/cliente1.webp',
      texto:
        'Increíble servicio! Mi alfombra persa quedó como nueva. Eliminaron una mancha de vino que tenía años.',
      tiempo: '3 días',
    },
    {
      nombre: 'Carlos Méndez',
      barrio: 'El Poblado, Medellín',
      foto: '/images/testimonios/cliente3.webp',
      texto:
        'Puntuales y profesionales. El olor a humedad desapareció completamente. 100% recomendados.',
      tiempo: '1 semana',
    },
    {
      nombre: 'Ana Gómez',
      barrio: 'Rosales, Bogotá',
      foto: '/images/testimonios/cliente2.webp',
      texto:
        'Excelente relación calidad-precio. Mis alfombras quedaron impecables y el secado fue rapidísimo.',
      tiempo: '5 días',
    },
  ]

  // URLs de WhatsApp correctas y codificadas
  const precioMsg = `Hola, quiero una cotización exacta para lavado de alfombras en ${ciudad}. ¿Me pueden ayudar?`
  const precioHref = `https://wa.me/573128052720?text=${encodeURIComponent(precioMsg)}`
  const ofertaMsg = `Quiero aprovechar la oferta del ${descuento}% en lavado de alfombras`
  const ofertaHref = `https://wa.me/573128052720?text=${encodeURIComponent(ofertaMsg)}`

  return (
    <>
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black opacity-20" />
        <div className="container mx-auto px-4 relative z-10 py-12">
          <Link href="/" className="inline-flex items-center text-white mb-4 hover:opacity-80 transition lg:hidden">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Columna Izquierda */}
            <div className="text-white">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">+5000 clientes satisfechos</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">Lavado de Alfombras en {ciudad}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm opacity-90">4.9/5 (487 reseñas)</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Servicio a domicilio sin costo adicional</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Resultados garantizados o repetimos gratis</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Productos eco-amigables certificados</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Eliminamos manchas difíciles y olores</span>
                </div>
              </div>

              <div className="bg-yellow-400 text-blue-900 px-4 py-3 rounded-lg inline-block mb-6">
                <p className="font-bold text-lg">🔥 Oferta por tiempo limitado</p>
                <p>{descuento}% descuento + Desinfección GRATIS</p>
              </div>

              <div className="flex items-center space-x-6 text-sm opacity-90 lg:hidden">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Garantizado</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Puntual</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>Seguro</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cotiza en 30 segundos</h2>
                <p className="text-gray-600">Sin compromiso • Respuesta inmediata</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />

                <input
                  type="tel"
                  placeholder="WhatsApp (ej: 3001234567)"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />

                <select
                  value={formData.ciudad}
                  onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">Selecciona tu ciudad</option>
                  <option value="bogota">Bogotá</option>
                  <option value="medellin">Medellín</option>
                </select>

                <select
                  value={formData.cuando}
                  onChange={(e) => setFormData({ ...formData, cuando: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                >
                  <option value="">¿Cuándo necesitas el servicio?</option>
                  <option value="hoy">Hoy mismo</option>
                  <option value="manana">Mañana</option>
                  <option value="esta_semana">Esta semana</option>
                  <option value="proxima_semana">Próxima semana</option>
                </select>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z" />
                  </svg>
                  Recibir Cotización por WhatsApp
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">127 personas</span> cotizaron este
                  servicio hoy
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    <span>Datos seguros</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    <span>Pago después</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges desktop */}
          <div className="hidden lg:flex items-center justify-center space-x-12 mt-12 text-white/90">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <span>100% Garantizado</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              <span>Llegamos puntual</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2" />
              <span>Personal certificado</span>
            </div>
            <div className="flex items-center">
              <Leaf className="w-6 h-6 mr-2" />
              <span>Productos eco-amigables</span>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de Urgencia */}
      <section className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-sm sm:text-base">
            <span className="animate-pulse">🔥</span>
            <p className="text-center">
              <strong>Oferta válida solo hoy:</strong> {descuento}% de descuento + Desinfección gratis
            </p>
            <span className="hidden sm:inline font-bold">Quedan 3 cupos para mañana</span>
          </div>
        </div>
      </section>

      {/* Tipos de alfombras */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Limpiamos Todo Tipo de Alfombras y Tapetes</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 p-6 rounded-2xl mb-4 group-hover:bg-blue-600 transition-colors">
                <Sparkles className="w-12 h-12 text-blue-600 mx-auto group-hover:text-white" />
              </div>
              <h3 className="font-semibold">Alfombras Persas</h3>
              <p className="text-sm text-gray-600">Cuidado especial</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-green-100 p-6 rounded-2xl mb-4 group-hover:bg-green-600 transition-colors">
                <svg
                  className="w-12 h-12 text-green-600 mx-auto group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold">Tapetes Modernos</h3>
              <p className="text-sm text-gray-600">Fibras sintéticas</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-purple-100 p-6 rounded-2xl mb-4 group-hover:bg-purple-600 transition-colors">
                <svg
                  className="w-12 h-12 text-purple-600 mx-auto group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Alfombras de Área</h3>
              <p className="text-sm text-gray-600">Grandes espacios</p>
            </div>
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-yellow-100 p-6 rounded-2xl mb-4 group-hover:bg-yellow-600 transition-colors">
                <svg
                  className="w-12 h-12 text-yellow-600 mx-auto group-hover:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold">Tapetes Decorativos</h3>
              <p className="text-sm text-gray-600">Diseños especiales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso con imágenes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Proceso de Lavado Profesional</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ol className="space-y-6">
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Inspección Detallada</h3>
                    <p className="text-gray-600">
                      Evaluamos el tipo de alfombra, fibras y manchas específicas para elegir el mejor tratamiento
                    </p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Aspirado Industrial</h3>
                    <p className="text-gray-600">Removemos hasta el 80% de la suciedad con equipos de alta potencia</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pre-tratamiento de Manchas</h3>
                    <p className="text-gray-600">Aplicamos productos especializados en cada tipo de mancha</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">
                    4
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Lavado con Inyección-Extracción</h3>
                    <p className="text-gray-600">Limpieza profunda que penetra hasta la base de las fibras</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">
                    5
                  </span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Secado Acelerado</h3>
                    <p className="text-gray-600">Tu alfombra lista en 5-6 días con nuestro sistema especializado</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/servicios/lavado-alfombras-bogota.webp"
                  alt="Proceso profesional de lavado de alfombras Clean Company"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading="lazy"
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">{descuento}%</div>
                <div className="text-sm">Descuento hoy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que dicen nuestros clientes sobre el lavado de alfombras
          </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimoniosAlfombras.map((testimonio, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonio.foto}
                  alt={testimonio.nombre}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="rounded-full object-cover mr-4 w-16 h-16"
                />
                <div>
                  <h4 className="font-semibold">{testimonio.nombre}</h4>
                  <p className="text-sm text-gray-600">{testimonio.barrio}</p>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">&quot;{testimonio.texto}&quot;</p>
              <p className="text-xs text-gray-500 mt-3">Servicio realizado hace {testimonio.tiempo}</p>
            </div>
          ))}
        </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              <Check className="inline w-4 h-4 text-green-500 mr-1" />
              Todos los testimonios son 100% reales y verificados
            </p>
          </div>
        </div>
      </section>

      {/* Precios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Precios Justos y Transparentes</h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-gray-600 mb-2">Precio promedio mercado</p>
                  <p className="text-3xl font-bold text-gray-400 line-through">$360.000</p>
                  <p className="text-sm text-gray-500">Por alfombra mediana</p>
                </div>
                <div className="transform scale-110">
                  <p className="text-blue-600 font-semibold mb-2">Precio Clean Company</p>
                  <p className="text-4xl font-bold text-blue-600">$270.000</p>
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm mt-2">
                    Ahorras $90.000
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Con descuento web</p>
                  <p className="text-3xl font-bold text-green-600">$215.000</p>
                  <p className="text-sm text-green-600">¡{descuento} OFF!</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                * Precio referencial para alfombra de 2x3 metros. Cotización exacta según tamaño y estado.
              </p>
              <a
                href={precioHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Obtener Precio Exacto
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Qué pasa si la mancha no sale completamente?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                Tenemos garantía de satisfacción 100%. Si alguna mancha persiste después del primer tratamiento, regresamos
                sin costo adicional para aplicar técnicas especializadas. En el 95% de los casos, eliminamos todas las
                manchas en la primera visita.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Cuánto tiempo tarda en secar mi alfombra?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                Con nuestro sistema de secado acelerado, tu alfombra estará completamente seca en 5 días. El tiempo exacto
                depende del grosor de la alfombra y la ventilación del espacio. Incluimos ventiladores industriales sin costo
                extra para acelerar el proceso.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Los productos dañan los colores de mi alfombra?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                No. Utilizamos productos pH neutro especialmente formulados para cada tipo de fibra. Antes de comenzar,
                hacemos una prueba en un área poco visible. Nuestros productos realzan los colores originales sin dañar las
                fibras.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Es seguro para niños y mascotas?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                Absolutamente seguro. Todos nuestros productos son biodegradables, no tóxicos y certificados. Una vez seca la
                alfombra (5 días), es completamente segura para toda la familia, incluyendo bebés y mascotas.
              </p>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Tienen que llevarse mi alfombra?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                Para poder garantizar el buen secado de la alfombra, debemos llevar tu alfombra a nuestras instalaciones, en
                las cuales contamos con la maquinaria adecuada y especializada para que quede impecable.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Garantías */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestras Garantías</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Satisfacción 100%</h3>
              <p className="text-gray-600">Si no quedas satisfecho, repetimos el servicio sin costo</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Puntualidad</h3>
              <p className="text-gray-600">Llegamos a la hora acordada o te damos 10% de descuento</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Cuidado Total</h3>
              <p className="text-gray-600">Tratamos tu alfombra con el mismo cuidado que la nuestra</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">¿Listo para tener tu alfombra como nueva?</h2>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-8">
            <p className="text-lg font-semibold mb-2">⏰ Oferta especial termina en:</p>
            <div className="flex justify-center space-x-4 text-3xl font-bold">
              <div>
                <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                <p className="text-sm font-normal">Horas</p>
              </div>
              <span>:</span>
              <div>
                <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <p className="text-sm font-normal">Min</p>
              </div>
              <span>:</span>
              <div>
                <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <p className="text-sm font-normal">Seg</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <p className="text-xl flex items-center justify-center">
              <Check className="w-6 h-6 mr-2" />
              {descuento}% de descuento en tu primera limpieza
            </p>
            <p className="text-xl flex items-center justify-center">
              <Check className="w-6 h-6 mr-2" />
              Desinfección profunda GRATIS (valor $30.000)
            </p>
            <p className="text-xl flex items-center justify-center">
              <Check className="w-6 h-6 mr-2" />
              Garantía de satisfacción o repetimos sin costo
            </p>
          </div>

          <a
            href={ofertaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl animate-pulse"
          >
            <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z" />
            </svg>
            Reclamar Oferta Ahora
          </a>

          <p className="mt-6 text-sm opacity-80">* Válido solo para nuevos clientes. Un uso por hogar. Aplica solo en {ciudad}.</p>
        </div>
      </section>

      {/* Botón de chat flotante */}
      <div className="fixed bottom-24 right-8 z-40 hidden md:block">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center animate-bounce">
          <MessageCircle className="w-5 h-5 mr-2" />
          <span>¿Necesitas ayuda?</span>
        </button>
      </div>

      <Footer />
    </>
  )
}

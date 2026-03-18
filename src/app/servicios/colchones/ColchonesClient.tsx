'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import { Check, Moon, Shield, Clock, ArrowLeft, Star, Heart, Lock, CreditCard, Users, Leaf, ChevronDown, MessageCircle, AlertTriangle, Bug, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { trackWhatsAppClick } from '@/lib/whatsappTracker'
import { useWhatsAppNumber } from '@/hooks/useWhatsAppNumber'
import WhatsAppLink from '@/components/WhatsAppLink'

export default function ColchonesClient() {
  const whatsappNumber = useWhatsAppNumber()
  const searchParams = useSearchParams()
  const ciudad = searchParams.get('ciudad') || 'Bogotá y Medellín'
  const descuento = searchParams.get('desc') || '20'
  const utm_campaign = searchParams.get('utm_campaign')
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    ciudad: '',
    cuando: '',
    tamanoColchon: ''
  })

  useEffect(() => {
    console.log(`Ciudad para mostrar en ColchonesClient: ${ciudad}`);
  }, [ciudad]);

  // Contador de urgencia
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 52
  })

  // Efecto para el contador
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Función auxiliar para formatear la ciudad en el mensaje
  const formatCiudad = (val: string) => {
    if (val === 'bogota') return 'Bogotá'
    if (val === 'medellin') return 'Medellín'
    return val || 'No especificada'
  }

  // Función auxiliar para abrir WhatsApp con tracking (solo para form submit)
  const openWhatsApp = (msg: string, eventName: string) => {
    const { ref } = trackWhatsAppClick(formData.nombre, formData.telefono)
    const finalMessage = `${msg}\n\n(Ref: ${ref})`
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMessage)}`

    if (typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: any[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({
        event: 'whatsapp_click',
        form_name: eventName,
        utm_campaign,
        link_url: url,
        ...(formData.nombre && { user_name: formData.nombre }),
        ...(formData.telefono && { phone: formData.telefono }),
        ...(formData.ciudad && { city: formData.ciudad }),
        ...(formData.cuando && { when: formData.cuando }),
      })
    }

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // ⬇️⬇️⬇️ BOTÓN 1: Formulario Principal
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Diccionarios para mejorar la lectura en WhatsApp
    const mapTamano: Record<string, string> = {
      sencillo: 'Sencillo', semidoble: 'Semidoble', doble: 'Doble', queen: 'Queen', king: 'King'
    }
    const mapCuando: Record<string, string> = {
      urgente: 'URGENTE - Hoy/Mañana', esta_semana: 'Esta semana', proxima_semana: 'Próxima semana'
    }

    const baseMessage = `Hola Clean Company, quiero cotizar la desinfección de mi colchón.
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Ciudad: ${formatCiudad(formData.ciudad)}
Tamaño: ${mapTamano[formData.tamanoColchon] || formData.tamanoColchon}
Para cuándo: ${mapCuando[formData.cuando] || formData.cuando}`

    openWhatsApp(baseMessage, 'cotizacion_colchones')

    // (Opcional) micro-evento de "form_submit" para análisis interno
    if (typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: any[] }
      w.dataLayer = w.dataLayer || []
      w.dataLayer.push({
        event: 'form_submit',
        form_type: 'cotizacion_colchones',
        utm_campaign,
      })
    }
  }

  const testimoniosColchones = [
    {
      nombre: "Diego Ramírez",
      barrio: "Laureles, Medellín",
      foto: "/images/testimonios/cliente3.webp",
      texto: "Increíble! Mi hijo dejó de estornudar por las noches. El servicio eliminó todos los ácaros.",
      tiempo: "1 semana"
    },
    {
      nombre: "Sandra López",
      barrio: "Cedritos, Bogotá",
      foto: "/images/testimonios/cliente1.webp",
      texto: "Mi colchón de 10 años quedó como nuevo. Eliminaron manchas antiguas y ahora huele fresco.",
      tiempo: "4 días"
    },
    {
      nombre: "Jorge Herrera",
      barrio: "Envigado, Medellín",
      foto: "/images/testimonios/cliente2.webp",
      texto: "Excelente servicio para personas alérgicas como yo. Noto la diferencia al dormir.",
      tiempo: "2 semanas"
    }
  ]

  const problemasColchon = [
    {
      icon: Bug,
      title: "2 Millones de Ácaros",
      description: "Un colchón puede albergar hasta 2 millones de ácaros del polvo",
      color: "red"
    },
    {
      icon: AlertTriangle,
      title: "Alergias y Asma",
      description: "Los ácaros causan el 70% de las alergias respiratorias",
      color: "yellow"
    },
    {
      icon: Moon,
      title: "Mal Descanso",
      description: "Un colchón sucio afecta la calidad del sueño",
      color: "blue"
    },
    {
      icon: Heart,
      title: "Problemas de Salud",
      description: "Bacterias y hongos pueden causar infecciones",
      color: "purple"
    }
  ]

  return (
    <>
      <Header />
      <WhatsAppButton />
      
      {/* Hero Section Optimizada */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10 py-12">
          <Link href="/" className="inline-flex items-center text-white mb-4 hover:opacity-80 transition lg:hidden">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Columna Izquierda - Contenido */}
            <div className="text-white">
              {/* Badge de confianza */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">+5000 colchones desinfectados</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lavado de Colchones a Vapor en {ciudad}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm opacity-90">4.9/5 (612 reseñas)</span>
              </div>
              
              {/* Beneficios principales */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Eliminación del 99.9% de ácaros y bacterias</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Desinfección profunda con vapor a 180°C</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Productos hipoalergénicos y seguros</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Mejora la calidad del sueño inmediatamente</span>
                </div>
              </div>
              
              {/* Urgencia */}
              <div className="bg-yellow-400 text-blue-900 px-4 py-3 rounded-lg inline-block mb-6">
                <p className="font-bold text-lg">🔥 Oferta especial de temporada</p>
                <p>{descuento}% descuento + Tratamiento anti-ácaros GRATIS</p>
              </div>
              
              {/* Trust badges móvil */}
              <div className="flex items-center space-x-6 text-sm opacity-90 lg:hidden">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Seguro</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>Saludable</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Rápido</span>
                </div>
              </div>
            </div>
            
            {/* Columna Derecha - Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              {/* Alerta de salud */}
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-red-700">
                      <strong>¿Sabías que?</strong> Un colchón sin lavar puede causar alergias, asma y problemas respiratorios
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Protege tu Salud Hoy
                </h2>
                <p className="text-gray-600">Cotización inmediata • Sin compromiso</p>
              </div>
              
              <form id="form-cotizacion" onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  required
                />
                <div>
                  <input
                    type="tel"
                    placeholder="WhatsApp (ej: 3001234567)"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                
                <div>
                  <select 
                    value={formData.ciudad}
                    onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="">Selecciona tu ciudad</option>
                    <option value="bogota">Bogotá</option>
                    <option value="medellin">Medellín</option>
                  </select>
                </div>
                
                <div>
                  <select 
                    value={formData.tamanoColchon}
                    onChange={(e) => setFormData({...formData, tamanoColchon: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="">Tamaño del colchón</option>
                    <option value="sencillo">Sencillo</option>
                    <option value="semidoble">Semidoble</option>
                    <option value="doble">Doble</option>
                    <option value="queen">Queen</option>
                    <option value="king">King</option>
                  </select>
                </div>
                
                <div>
                  <select 
                    value={formData.cuando}
                    onChange={(e) => setFormData({...formData, cuando: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="">¿Cuándo necesitas el servicio?</option>
                    <option value="urgente">URGENTE - Hoy/Mañana</option>
                    <option value="esta_semana">Esta semana</option>
                    <option value="proxima_semana">Próxima semana</option>
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z"/>
                  </svg>
                  Recibir Cotización por WhatsApp
                </button>
              </form>

              {/* Social proof */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">156 personas</span> solicitaron este servicio hoy
                </p>
              </div>
              
              {/* Garantías */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-gray-600">
                 <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    <span>100% seguro</span>
                  </div>
                 <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>Hipoalergénico</span>
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
              <Bug className="w-6 h-6 mr-2" />
              <span>Anti-ácaros</span>
            </div>
           <div className="flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              <span>Hipoalergénico</span>
            </div>
           <div className="flex items-center">
              <Leaf className="w-6 h-6 mr-2" />
              <span>Eco-amigable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de Urgencia */}
      <section className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-sm sm:text-base">
            <span className="animate-pulse">🚨</span>
            <p className="text-center">
              <strong>Alerta de salud:</strong> {descuento}% OFF + Tratamiento anti-ácaros GRATIS
            </p>
            <span className="hidden sm:inline font-bold">Solo hoy</span>
          </div>
        </div>
      </section>

      {/* Por qué es importante */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            ¿Por qué es Vital Lavar tu Colchón?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Tu colchón puede estar afectando tu salud sin que lo sepas. 
            Descubre los peligros ocultos en tu lugar de descanso.
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {problemasColchon.map((problema, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className={`bg-${problema.color}-100 p-6 rounded-2xl mb-4 group-hover:bg-${problema.color}-600 transition-colors`}>
                  
                  <problema.icon className={`w-12 h-12 text-${problema.color}-600 mx-auto group-hover:text-white`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{problema.title}</h3>
                <p className="text-sm text-gray-600">{problema.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6 max-w-3xl mx-auto">
            <div className="flex">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Dato Impactante</h3>
                <p className="text-gray-700">
                  Después de 2 años sin lavar, tu colchón puede pesar hasta 
                  <strong> 2 kilos más</strong> debido a la acumulación de ácaros muertos, 
                  células de piel, sudor y polvo. ¡Es hora de actuar!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso detallado */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proceso de Desinfección Profunda
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ol className="space-y-6">
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">1</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Inspección con Luz UV</h3>
                    <p className="text-gray-600">Detectamos manchas invisibles y evaluamos el nivel de contaminación</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">2</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Aspirado HEPA Profundo</h3>
                    <p className="text-gray-600">Eliminamos ácaros, polvo y partículas con filtro hospitalario</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">3</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Tratamiento Anti-ácaros</h3>
                    <p className="text-gray-600">Aplicamos productos especializados que eliminan ácaros y sus huevos</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">4</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Desinfección con Vapor 180°C</h3>
                    <p className="text-gray-600">Eliminamos el 99.9% de bacterias, virus y hongos</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">5</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Protección Hipoalergénica</h3>
                    <p className="text-gray-600">Aplicamos barrera protectora contra futuros ácaros (incluido gratis)</p>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/3] w-full">
                <Image 
                  src="/images/servicios/lavado-colchones-bogota.webp" 
                  alt="Proceso de desinfección de colchones Clean Company"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-green-500 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm">Eliminación de ácaros</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Historias de Clientes que Mejoraron su Salud
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimoniosColchones.map((testimonio, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonio.foto} 
                    alt={testimonio.nombre}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="rounded-full object-cover mr-4"
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
                <p className="text-gray-700 italic">"{testimonio.texto}"</p>
                <p className="text-xs text-gray-500 mt-3">
                  Servicio realizado hace {testimonio.tiempo}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">
              <Check className="inline w-4 h-4 text-green-500 mr-1" />
              Testimonios verificados de clientes reales
            </p>
          </div>
        </div>
      </section>

      {/* Tabla de precios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Inversión en tu Salud
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-gray-600 mb-2">Precio otros servicios</p>
                  <p className="text-3xl font-bold text-gray-400 line-through">$150.000</p>
                  <p className="text-sm text-gray-500">Por colchón doble</p>
                </div>
                <div className="transform scale-110">
                  <p className="text-blue-600 font-semibold mb-2">Precio Clean Company</p>
                  <p className="text-4xl font-bold text-blue-600">$100.000</p>
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm mt-2">
                    Ahorras $50.000
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Precio con oferta web</p>
                  <p className="text-3xl font-bold text-green-600">$80.000</p>
                  <p className="text-sm text-green-600">¡{descuento}% OFF + Anti-ácaros!</p>
                </div>
              </div>
            </div>
            
            {/* Tabla de precios por tamaño */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">Precios por Tamaño <span className="text-base font-normal text-gray-600">(con {descuento}% descuento aplicado)</span></h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Precios Medellín */}
                <div>
                  <h4 className="font-semibold text-xl text-blue-700 mb-4 text-center border-b-2 border-blue-200 pb-2">Medellín</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span>Colchón Sencillo</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$100.000</span>
                        <span className="font-semibold text-green-600 text-lg">$80.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span>Colchón Semidoble</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$100.000</span>
                        <span className="font-semibold text-green-600 text-lg">$80.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b bg-blue-50 px-3 rounded-md">
                      <span className="font-semibold">Colchón Doble <Star className="inline w-4 h-4 text-yellow-400 fill-current" /></span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$100.000</span>
                        <span className="font-semibold text-green-600 text-lg">$80.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span>Colchón Queen</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$120.000</span>
                        <span className="font-semibold text-green-600 text-lg">$90.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span>Colchón King</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$140.000</span>
                        <span className="font-semibold text-green-600 text-lg">$105.000</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Precios Bogotá */}
                <div>
                  <h4 className="font-semibold text-xl text-purple-700 mb-4 text-center border-b-2 border-purple-200 pb-2">Bogotá</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span>Colchón Sencillo</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$120.000</span>
                        <span className="font-semibold text-green-600 text-lg">$100.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span>Colchón Semidoble</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$120.000</span>
                        <span className="font-semibold text-green-600 text-lg">$100.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b bg-purple-50 px-3 rounded-md">
                      <span className="font-semibold">Colchón Doble <Star className="inline w-4 h-4 text-yellow-400 fill-current" /></span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$120.000</span>
                        <span className="font-semibold text-green-600 text-lg">$100.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span>Colchón Queen</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$130.000</span>
                        <span className="font-semibold text-green-600 text-lg">$110.000</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span>Colchón King</span>
                      <div>
                        <span className="text-gray-400 line-through mr-2">$150.000</span>
                        <span className="font-semibold text-green-600 text-lg">$120.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-green-50 p-4 rounded-lg text-center">
                <p className="text-green-800 font-semibold flex items-center justify-center">
                  <Check className="w-5 h-5 mr-2 flex-shrink-0" />
                  Todos los precios incluyen: Desinfección + Anti-ácaros + Eliminación de olores
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <WhatsAppLink
                message={`Hola, quiero una cotización exacta para lavado de colchones en ${formatCiudad(ciudad)}. ¿Me pueden ayudar?`}
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
              >
                Cotizar Mi Colchón Ahora
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Preguntas Frecuentes sobre Lavado de Colchones
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Cada cuánto debo lavar mi colchón?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                Los expertos recomiendan lavar el colchón cada 6 meses para mantener un ambiente 
                saludable. Si tienes alergias, mascotas o niños pequeños, lo ideal es cada 3-4 meses. 
                Un colchón limpio mejora significativamente la calidad del sueño y tu salud.
              </p>
            </details>
            
            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Es seguro para bebés y personas alérgicas?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                Totalmente seguro. Usamos productos 100% hipoalergénicos, certificados y libres de 
                químicos agresivos. Nuestro proceso está especialmente diseñado para personas con 
                alergias, asma o piel sensible. Ideal para habitaciones de bebés.
              </p>
            </details>
            
            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Eliminan manchas de orina y sudor?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                Sí, nuestro proceso elimina eficazmente manchas de orina, sudor, sangre y otros 
                fluidos corporales. Utilizamos enzimas especiales que descomponen las proteínas 
                y eliminan tanto la mancha como el olor desde la raíz.
              </p>
            </details>
            
            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Cuánto tiempo tarda en secar?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                El colchón estará completamente seco en 4-6 horas. Nuestro sistema de vapor 
                utiliza poca humedad y dejamos ventiladores industriales para acelerar el secado. 
                Puedes dormir en tu colchón la misma noche del servicio.
              </p>
            </details>
            
            <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
              <summary className="font-semibold cursor-pointer flex justify-between items-center">
                ¿Necesito voltear o mover el colchón?
                <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 text-gray-600">
                No te preocupes por nada. Nuestro equipo se encarga de voltear y limpiar ambos 
                lados del colchón. Solo necesitamos acceso a la habitación. Si el colchón es muy 
                pesado, nuestros técnicos están equipados para manejarlo.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Beneficios de salud */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Beneficios Inmediatos para tu Salud
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Moon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Mejor Sueño</h3>
              <p className="text-sm text-gray-600">Dormirás más profundo desde la primera noche</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Sin Alergias</h3>
              <p className="text-sm text-gray-600">Reduce síntomas alérgicos en 90%</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Protección</h3>
              <p className="text-sm text-gray-600">Barrera contra ácaros por 6 meses</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2">Frescura</h3>
              <p className="text-sm text-gray-600">Aroma limpio y ambiente saludable</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">
            Tu Salud No Puede Esperar
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cada noche que pasas en un colchón sucio afecta tu salud. 
            Es hora de tomar acción.
          </p>
          
          {/* Contador */}
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-8">
            <p className="text-lg font-semibold mb-2">⏰ Esta oferta especial termina en:</p>
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
              {descuento}% de descuento + Tratamiento anti-ácaros GRATIS
            </p>
            <p className="text-xl flex items-center justify-center">
              <Check className="w-6 h-6 mr-2" />
              Elimina el 99.9% de ácaros y bacterias
            </p>
            <p className="text-xl flex items-center justify-center">
              <Check className="w-6 h-6 mr-2" />
              Mejora tu salud desde la primera noche
            </p>
          </div>
          
          <WhatsAppLink
            message={`Quiero el ${descuento}% de descuento en lavado de colchones para mejorar mi salud`}
            className="inline-flex items-center bg-green-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl animate-pulse cursor-pointer"
          >
            Proteger Mi Salud Ahora
          </WhatsAppLink>

          <p className="mt-6 text-sm opacity-80">
            * Promoción exclusiva para {formatCiudad(ciudad)}. Un uso por hogar.
          </p>
        </div>
      </section>

      {/* Chat flotante */}
      <div className="fixed bottom-24 right-8 z-40 hidden md:block">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center animate-bounce">
          <MessageCircle className="w-5 h-5 mr-2" />
          <span>¿Preguntas de salud?</span>
        </button>
      </div>

      <Footer />
    </>
  )
}
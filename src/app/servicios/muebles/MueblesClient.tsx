// eslint-disable-next-line @typescript-eslint/no-explicit-any
'use client'

import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import { Check, Sofa, Shield, Clock, ArrowLeft, Star, Heart, Lock, CreditCard, Users, Leaf, ChevronDown, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'



export default function MueblesClient() {
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
    tipoMueble: ''
  })

   useEffect(() => {
    console.log(`Ciudad para mostrar en MueblesClient: ${ciudad}`);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mensaje = `Hola, quiero cotizar lavado de muebles. Nombre: ${formData.nombre}, Ciudad: ${formData.ciudad}, Tipo: ${formData.tipoMueble}, Cuando: ${formData.cuando}`
    const whatsappUrl = `https://wa.me/573128052720?text=${encodeURIComponent(mensaje)}`
    
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        'event': 'form_submit',
        'form_type': 'cotizacion_muebles',
        'utm_campaign': utm_campaign
      })
    }
    
    window.open(whatsappUrl, '_blank')
  }

  const testimoniosMuebles = [
    {
      nombre: "Laura Martínez",
      barrio: "Usaquén, Bogotá",
      foto: "/images/testimonios/cliente1.webp",
      texto: "Mi sofá blanco quedó impecable! Eliminaron manchas de café y vino que tenían meses. Excelente servicio.",
      tiempo: "2 días"
    },
    {
      nombre: "Roberto Castro",
      barrio: "El Poblado, Medellín",
      foto: "/images/testimonios/cliente3.webp",
      texto: "Tengo 3 perros y mis muebles olían terrible. Ahora huelen fresco y se ven como nuevos. Muy recomendados.",
      tiempo: "5 días"
    },
    {
      nombre: "Patricia Díaz",
      barrio: "Chapinero, Bogotá",
      foto: "/images/testimonios/cliente2.webp",
      texto: "El servicio fue rápido y profesional. Mis sillas del comedor quedaron perfectas. Volveré a contratar.",
      tiempo: "1 semana"
    }
  ]

  const tiposMuebles = [
    {
      icon: Sofa,
      title: "Sofás",
      description: "En L, reclinables, modulares",
      color: "blue"
    },
    {
      icon: "🪑",
      title: "Sillas",
      description: "Comedor, oficina, decorativas",
      color: "green",
      isEmoji: true
    },
    {
      icon: "🛏️",
      title: "Cabeceras",
      description: "Tapizadas de todos los estilos",
      color: "purple",
      isEmoji: true
    },
    {
      icon: "🪑",
      title: "Puffs y Bancos",
      description: "Decorativos y funcionales",
      color: "yellow",
      isEmoji: true
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
                <span className="text-sm font-medium">+5000 clientes satisfechos</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Lavado de Muebles a Domicilio en {ciudad}
              </h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm opacity-90">4.9/5 (523 reseñas)</span>
              </div>
              
              {/* Beneficios principales */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Limpieza profunda sin dañar las telas</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Eliminamos manchas, olores y bacterias</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Tu mueble listo para usar en 3-5 horas</span>
                </div>
                <div className="flex items-center">
                  <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>Trabajamos con todo tipo de telas</span>
                </div>
              </div>
              
              {/* Urgencia */}
              <div className="bg-yellow-400 text-blue-900 px-4 py-3 rounded-lg inline-block mb-6">
                <p className="font-bold text-lg">🔥 Oferta por tiempo limitado</p>
                <p>{descuento}% descuento + Protector de telas GRATIS</p>
              </div>
              
              {/* Trust badges móvil */}
              <div className="flex items-center space-x-6 text-sm opacity-90 lg:hidden">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Garantizado</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Rápido</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>Cuidadoso</span>
                </div>
              </div>
            </div>
            
            {/* Columna Derecha - Formulario */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Cotiza tu Lavado de Muebles
                </h2>
                <p className="text-gray-600">Respuesta inmediata • Sin compromiso</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>
                
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
                    value={formData.tipoMueble}
                    onChange={(e) => setFormData({...formData, tipoMueble: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="">¿Qué mueble necesitas lavar?</option>
                    <option value="sofa">Sofá</option>
                    <option value="sillas">Sillas</option>
                    <option value="sofa_l">Sofá en L</option>
                    <option value="comedor">Juego de comedor</option>
                    <option value="otros">Otros</option>
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
                    <option value="hoy">Hoy mismo (urgente)</option>
                    <option value="manana">Mañana</option>
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
                  <span className="font-semibold text-green-600">89 personas</span> cotizaron lavado de muebles hoy
                </p>
              </div>
              
              {/* Garantías */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    <span>100% seguro</span>
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    <span>Pago al finalizar</span>
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
              <span>Secado rápido</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2" />
              <span>Técnicos expertos</span>
            </div>
            <div className="flex items-center">
              <Leaf className="w-6 h-6 mr-2" />
              <span>Productos seguros</span>
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
              <strong>Solo hoy:</strong> {descuento}% OFF + Protector de telas GRATIS
            </p>
            <span className="hidden sm:inline font-bold">¡Últimos 5 cupos!</span>
          </div>
        </div>
      </section>

      {/* Tipos de muebles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Lavamos Todo Tipo de Muebles y Tapicería
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {tiposMuebles.map((tipo, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className={`bg-${tipo.color}-100 p-6 rounded-2xl mb-4 group-hover:bg-${tipo.color}-600 transition-colors`}>
                  {tipo.isEmoji ? (
                    <span className="text-5xl">{tipo.icon}</span>
                  ) : (
                    <tipo.icon className={`w-12 h-12 text-${tipo.color}-600 mx-auto group-hover:text-white`} />
                  )}
                </div>
                <h3 className="font-semibold">{tipo.title}</h3>
                <p className="text-sm text-gray-600">{tipo.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              También lavamos: Poltronas, otomanos, cojines, sillas de bebé y más
            </p>
          </div>
        </div>
      </section>

      {/* Proceso detallado */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proceso Profesional de Lavado de Muebles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/images/servicios/lavado-muebles-bogota.webp" 
                alt="Proceso de lavado profesional de muebles Clean Company"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-black p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">{descuento}%</div>
                <div className="text-sm">Descuento web</div>
              </div>
            </div>
            
            <div>
              <ol className="space-y-6">
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">1</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Evaluación del Tipo de Tela</h3>
                    <p className="text-gray-600">Identificamos el material para aplicar el tratamiento adecuado sin dañar</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">2</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Aspirado Profesional</h3>
                    <p className="text-gray-600">Eliminamos polvo, pelos de mascotas y partículas superficiales</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">3</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Pre-tratamiento de Manchas</h3>
                    <p className="text-gray-600">Aplicamos productos específicos para cada tipo de mancha</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">4</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Lavado Profundo</h3>
                    <p className="text-gray-600">Inyección-extracción que limpia hasta las capas más profundas</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0 group-hover:bg-blue-700 transition">5</span>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Protección de Telas</h3>
                    <p className="text-gray-600">Aplicamos protector invisible contra futuras manchas (GRATIS hoy)</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros clientes hablan del lavado de muebles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimoniosMuebles.map((testimonio, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonio.foto} 
                    alt={testimonio.nombre}
                    className="w-16 h-16 rounded-full object-cover mr-4"
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
              Testimonios 100% reales de clientes verificados
            </p>
          </div>
        </div>
      </section>

      {/* Comparación de precios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compara Nuestros Precios
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-gray-600 mb-2">Precio promedio mercado</p>
                  <p className="text-3xl font-bold text-gray-400 line-through">$200.000</p>
                  <p className="text-sm text-gray-500">Por sofá de 3 puestos</p>
                </div>
                <div className="transform scale-110">
                  <p className="text-blue-600 font-semibold mb-2">Precio Clean Company</p>
                  <p className="text-4xl font-bold text-blue-600">$120.000</p>
                  <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm mt-2">
                    Ahorras $60.000
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Precio con descuento web</p>
                  <p className="text-3xl font-bold text-green-600">$96.000</p>
                  <p className="text-sm text-green-600">¡{descuento}% OFF + Protector!</p>
                </div>
              </div>
            </div>
            
            {/* Tabla de precios por tipo */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Precios por tipo de mueble:</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Sofá 2 puestos</span>
                  <span className="font-semibold">Desde $80.000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Sofá 3 puestos</span>
                  <span className="font-semibold">Desde $90.000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Sofá en L</span>
                  <span className="font-semibold">Desde $135.000</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Silla individual</span>
                  <span className="font-semibold">Desde $10.000</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Juego de comedor (6 sillas)</span>
                  <span className="font-semibold">Desde $85.000</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                * Precios con descuento del {descuento}%. Cotización exacta según estado del mueble.
                *El precio puede variar de acuerdo al tamaño
              </p>
              <a 
                href={`https://wa.me/573128052720?text=Hola,%20quiero%20una%20cotización%20exacta%20para%20lavado%20de%20muebles%20en%20${encodeURIComponent(ciudad)}.%20¿Me%20pueden%20ayudar?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg"
             >
               Obtener Cotización Exacta
             </a>
           </div>
         </div>
       </div>
     </section>

     {/* FAQ */}
     <section className="py-16 bg-white">
       <div className="container mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">
           Preguntas Frecuentes sobre Lavado de Muebles
         </h2>
         
         <div className="max-w-3xl mx-auto space-y-4">
           <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
             <summary className="font-semibold cursor-pointer flex justify-between items-center">
               ¿Qué tipos de tela pueden lavar?
               <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
             </summary>
             <p className="mt-4 text-gray-600">
               Trabajamos con todo tipo de telas: algodón, lino, microfibra, terciopelo, chenille, 
               poliéster, nylon y más. También limpiamos cuero y piel con productos especializados. 
               Antes de iniciar, evaluamos el material para usar el método más seguro.
             </p>
           </details>
           
           <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
             <summary className="font-semibold cursor-pointer flex justify-between items-center">
               ¿El servicio incluye los cojines?
               <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
             </summary>
             <p className="mt-4 text-gray-600">
               Sí, el servicio incluye la limpieza completa del mueble con todos sus cojines 
               (asiento y respaldo). Si tienes cojines decorativos adicionales, podemos incluirlos 
               con un pequeño costo extra.
             </p>
           </details>
           
           <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
             <summary className="font-semibold cursor-pointer flex justify-between items-center">
               ¿Cuánto tiempo debo esperar para usar mis muebles?
               <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
             </summary>
             <p className="mt-4 text-gray-600">
               Con nuestro sistema de secado rápido, podrás usar tus muebles en 3-5 horas. 
               Dejamos ventiladores industriales para acelerar el proceso. En días muy húmedos 
               puede tomar un poco más.
             </p>
           </details>
           
           <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
             <summary className="font-semibold cursor-pointer flex justify-between items-center">
               ¿Eliminan olores de mascotas?
               <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
             </summary>
             <p className="mt-4 text-gray-600">
               Sí, nuestro proceso elimina completamente los olores de mascotas, incluida la orina. 
               Usamos enzimas especiales que neutralizan los olores desde la raíz, no solo los 
               enmascaran. Tu mueble quedará con un aroma fresco y limpio.
             </p>
           </details>
           
           <details className="bg-gray-50 rounded-lg shadow-md p-6 group">
             <summary className="font-semibold cursor-pointer flex justify-between items-center">
               ¿Qué pasa si mi mueble es muy delicado o antiguo?
               <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
             </summary>
             <p className="mt-4 text-gray-600">
               Tenemos experiencia con muebles finos y antiguos. Nuestros técnicos están capacitados 
               para identificar y tratar telas delicadas con métodos especiales de baja humedad. 
               Siempre hacemos una evaluación previa para garantizar la seguridad de tu mueble.
             </p>
           </details>
         </div>
       </div>
     </section>

     {/* Garantías */}
     <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
       <div className="container mx-auto px-4">
         <h2 className="text-3xl font-bold text-center mb-12">
           Lavamos con Garantía Total
         </h2>
         
         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
           <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
             <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Shield className="w-10 h-10 text-green-600" />
             </div>
             <h3 className="font-bold text-xl mb-2">Satisfacción 100%</h3>
             <p className="text-gray-600">
               Si no quedas feliz con el resultado, regresamos sin costo
             </p>
           </div>
           
           <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
             <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Sparkles className="w-10 h-10 text-blue-600" />
             </div>
             <h3 className="font-bold text-xl mb-2">Sin Daños</h3>
             <p className="text-gray-600">
               Garantizamos que tu mueble no sufrirá ningún daño
             </p>
           </div>
           
           <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
             <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
               <Heart className="w-10 h-10 text-purple-600" />
             </div>
             <h3 className="font-bold text-xl mb-2">Productos Seguros</h3>
             <p className="text-gray-600">
               100% seguros para niños y mascotas
             </p>
           </div>
         </div>
       </div>
     </section>

     {/* CTA Final */}
     <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden">
       <div className="absolute inset-0 bg-black opacity-10"></div>
       
       <div className="container mx-auto px-4 text-center relative z-10">
         <h2 className="text-4xl font-bold mb-4">
           Dale Nueva Vida a tus Muebles
         </h2>
         
         {/* Contador */}
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
             {descuento}% de descuento en todos los muebles
           </p>
           <p className="text-xl flex items-center justify-center">
             <Check className="w-6 h-6 mr-2" />
             Protector de telas GRATIS (valor $40.000)
           </p>
           <p className="text-xl flex items-center justify-center">
             <Check className="w-6 h-6 mr-2" />
             Servicio a domicilio sin costo extra
           </p>
         </div>
         
         <a 
           href={`https://wa.me/573128052720?text=Quiero%20aprovechar%20el%20${descuento}%%20de%20descuento%20en%20lavado%20de%20muebles`}
           target="_blank"
           rel="noopener noreferrer"
           className="inline-flex items-center bg-green-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl animate-pulse"
         >
           <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z"/>
           </svg>
           Cotizar Ahora con Descuento
         </a>
         
         <p className="mt-6 text-sm opacity-80">
           * Oferta válida solo para nuevos clientes en {ciudad}. No acumulable.
         </p>
       </div>
     </section>

     {/* Chat flotante */}
     <div className="fixed bottom-24 right-8 z-40 hidden md:block">
       <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center animate-bounce">
         <MessageCircle className="w-5 h-5 mr-2" />
         <span>¿Tienes dudas?</span>
       </button>
     </div>

     <Footer />
   </>
 )
}

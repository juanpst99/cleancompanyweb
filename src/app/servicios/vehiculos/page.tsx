import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import { Car, Check, ArrowLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import ServiceJsonLd from '@/components/SEO/ServiceJsonLd'
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd'
import FAQPageJsonLd, { type FAQItem } from '@/components/SEO/FAQPageJsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'

const PAGE_URL = 'https://cleancompany.com.co/servicios/vehiculos'

export const metadata: Metadata = {
  title: 'Limpieza Interior de Vehículos en Bogotá y Medellín | Clean Company',
  description:
    'Servicio profesional de limpieza interior de vehículos: tapicería, alfombras del carro, techo, paneles y desinfección. A domicilio en Bogotá y Medellín. Cotización por WhatsApp.',
  keywords: [
    'limpieza interior carro bogotá',
    'lavado tapicería auto medellín',
    'limpieza interior vehículo a domicilio',
    'lavado profesional interior auto',
    'desinfección interior carro',
    'eliminar olor a mascota en carro',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Limpieza Interior de Vehículos | Clean Company',
    description:
      'Tapicería, alfombras del carro, techo y paneles como nuevos. Servicio profesional en Bogotá y Medellín.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limpieza Interior de Vehículos | Clean Company',
    description: 'Servicio profesional de limpieza interior para autos, camionetas y SUV.',
  },
}

const faqs: FAQItem[] = [
  {
    question: '¿Trabajan a domicilio en mi parqueadero?',
    answer:
      'Sí. Atendemos en parqueaderos residenciales, empresariales y de centros comerciales en Bogotá y Medellín, siempre que haya acceso a punto eléctrico y espacio razonable para nuestro equipo.',
  },
  {
    question: '¿Cuánto tarda la limpieza interior de un vehículo?',
    answer:
      'En promedio entre 2 y 4 horas según el tamaño del vehículo y el nivel de suciedad. SUV y camionetas grandes pueden requerir más tiempo. Confirmamos un estimado antes de iniciar.',
  },
  {
    question: '¿Eliminan olores fuertes como mascotas, humo o humedad?',
    answer:
      'Sí, aplicamos un protocolo específico para neutralización de olores. En casos extremos puede requerirse más de una sesión; lo documentamos en la inspección inicial y lo conversamos con el cliente.',
  },
  {
    question: '¿Es seguro para los materiales originales del vehículo?',
    answer:
      'Usamos productos pH neutro de grado profesional, aptos para textiles, cueros y plásticos automotrices. Realizamos prueba en zona poco visible cuando el material es delicado.',
  },
  {
    question: '¿Tienen garantía?',
    answer:
      'Sí. Cubrimos nuestro servicio bajo la política de garantía publicada en la página de Garantía, que incluye 3 meses sobre el servicio realizado y la posibilidad de reproceso sin costo cuando aplica.',
  },
]

const whatsappMessage = encodeURIComponent(
  'Hola, quiero cotizar la limpieza interior de mi vehículo con Clean Company.'
)

export default function VehiculosPage() {
  return (
    <>
      <ServiceJsonLd
        slug="vehiculos"
        name="Limpieza interior profesional de vehículos"
        serviceType="Limpieza interior de vehículos"
        alternateName={['Lavado interior de carros', 'Limpieza de tapicería automotriz']}
        description="Lavado profesional del interior de autos, camionetas y SUV: tapicería, alfombras del vehículo, techo interior, paneles y desinfección. Servicio a domicilio en Bogotá y Medellín."
        url={PAGE_URL}
        variants={[
          { name: 'Auto sedán', description: 'Lavado interior completo de auto sedán' },
          { name: 'SUV / camioneta', description: 'Limpieza interior para vehículos más grandes' },
          { name: 'Eliminación de olores', description: 'Tratamiento especializado para olores persistentes' },
        ]}
      />
      <BreadcrumbsJsonLd
        id="vehiculos-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://cleancompany.com.co/' },
          { name: 'Servicios', url: 'https://cleancompany.com.co/#servicios' },
          { name: 'Limpieza interior de vehículos', url: PAGE_URL },
        ]}
      />
      <FAQPageJsonLd id="vehiculos-faq-jsonld" pageUrl={PAGE_URL} items={faqs} />

      <Header />
      <WhatsAppButton />

      <section className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-white mb-6 hover:opacity-80 transition">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>

          <Breadcrumbs
            tone="light"
            className="mb-6"
            items={[
              { name: 'Inicio', url: 'https://cleancompany.com.co/' },
              { name: 'Servicios', url: 'https://cleancompany.com.co/#servicios' },
              { name: 'Limpieza interior de vehículos', url: PAGE_URL },
            ]}
          />

          <div className="text-center max-w-3xl mx-auto">
            <Car className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Limpieza Interior de Vehículos en Bogotá y Medellín
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Lavado profesional del interior de autos, camionetas y SUV: tapicería, alfombras
              del vehículo, techo y paneles. Atendemos a domicilio en parqueaderos residenciales y
              empresariales.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-6 text-center">¿Qué incluye el servicio?</h2>
              <ul className="max-w-xl mx-auto space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Aspirado profundo de tapicería, alfombras y maletero</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Lavado con inyección-extracción de tapicería textil</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Limpieza del techo interior</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Detallado de paneles, consolas y plásticos</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Limpieza de vidrios interiores</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Tratamiento de neutralización de olores</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Inspección inicial documentada con fotos</span>
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/573128052720?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-green-600 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.004 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.75.46 3.39 1.24 4.82L2.004 22l5.41-1.34A9.868 9.868 0 0012.004 22c5.46 0 9.89-4.43 9.89-9.89 0-2.65-1.03-5.14-2.9-7.01A9.818 9.818 0 0012.004 2zm0 1.67c4.54 0 8.22 3.68 8.22 8.22 0 4.54-3.68 8.22-8.22 8.22-1.37 0-2.68-.34-3.82-.97l-.27-.15-2.83.7.72-2.77-.17-.29a8.174 8.174 0 01-1.08-4.02c0-4.54 3.68-8.22 8.22-8.22h.23zm-2.71 4.25c-.17 0-.44.06-.67.31-.23.26-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.05.88 2.48.71 2.93.66.45-.05 1.45-.59 1.65-1.16.2-.57.2-1.05.14-1.16-.06-.11-.23-.17-.48-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.4-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.12-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43-.14 0-.31-.02-.48-.02z" />
              </svg>
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Cuándo conviene una limpieza interior profesional
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong>Antes de vender el vehículo:</strong> recupera el valor estético y mejora la
              impresión del comprador.
            </li>
            <li>
              <strong>Tras un viaje largo o uso intensivo:</strong> elimina polvo, arena y residuos
              acumulados.
            </li>
            <li>
              <strong>Si transportas mascotas:</strong> tratamos olores, pelos y rastros sobre
              tapicería textil.
            </li>
            <li>
              <strong>Si tienes alergias o asma:</strong> reducimos polvo y posibles ácaros en
              tapicería y alfombras del vehículo.
            </li>
            <li>
              <strong>Tras un derrame (líquidos, alimentos, suciedad):</strong> entre más pronto
              actuemos, mayor probabilidad de remover la mancha por completo.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="bg-white rounded-lg shadow-sm p-6 group">
                <summary className="font-semibold cursor-pointer flex justify-between items-center text-gray-900">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={`https://wa.me/573128052720?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#3AAA35] text-white px-8 py-3 rounded-full font-semibold hover:opacity-95 transition"
            >
              Cotizar limpieza interior por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

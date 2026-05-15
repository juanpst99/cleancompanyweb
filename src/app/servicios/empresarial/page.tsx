// src/app/servicios/empresarial/page.tsx
import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import { Building, Check, ArrowLeft, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import ServiceJsonLd from '@/components/SEO/ServiceJsonLd'
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd'
import FAQPageJsonLd, { type FAQItem } from '@/components/SEO/FAQPageJsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'

const PAGE_URL = 'https://cleancompany.com.co/servicios/empresarial'

export const metadata: Metadata = {
  title:
    'Servicio de Limpieza Empresarial en Bogotá y Medellín | Clean Company',
  description:
    'Mantenimiento profesional de tapetes corporativos, lavado de sillas de oficina, alfombras y tapicería empresarial. Planes mensuales y atención prioritaria en Bogotá y Medellín.',
  keywords: [
    'limpieza empresarial bogotá',
    'limpieza oficinas medellín',
    'mantenimiento tapetes oficinas',
    'lavado sillas oficina',
    'limpieza textil corporativa',
    'servicio limpieza empresas',
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Limpieza profesional para empresas | Clean Company',
    description:
      'Mantenimiento de tapetes, sillas y alfombras corporativas para oficinas, hoteles, clínicas, restaurantes y edificios.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limpieza profesional para empresas | Clean Company',
    description:
      'Mantenimiento de tapetes, sillas y alfombras corporativas en Bogotá y Medellín.',
  },
}

const faqs: FAQItem[] = [
  {
    question: '¿Atienden empresas con varias sedes en Bogotá o Medellín?',
    answer:
      'Sí. Coordinamos cronogramas multi-sede para mantener tu operación sin interrupciones. Hacemos visita técnica inicial para cuantificar puestos, m² de tapete y mobiliario.',
  },
  {
    question: '¿Hacen el trabajo fuera del horario laboral?',
    answer:
      'Sí. Para minimizar afectación, ofrecemos servicio nocturno o de fin de semana en oficinas, restaurantes y clínicas, según el cronograma acordado en el contrato.',
  },
  {
    question: '¿Emiten factura electrónica?',
    answer:
      'Sí. Trabajamos con facturación electrónica conforme a la normativa colombiana y manejamos órdenes de servicio, actas de entrega y soportes para áreas administrativas.',
  },
  {
    question: '¿Qué SLA manejan en planes mensuales?',
    answer:
      'Los SLA dependen del contrato firmado: típicamente programamos visitas con agenda fija mensual o quincenal, con tiempos de respuesta de 24 a 72 horas para servicios adicionales no programados.',
  },
  {
    question: '¿Cubren áreas comunes en propiedad horizontal (PH)?',
    answer:
      'Sí. Atendemos a administraciones de PH para limpieza de tapetes en lobbies, ascensores con tapete, salones sociales y zonas comunes con cronograma planificado.',
  },
  {
    question: '¿Tienen experiencia con sectores específicos?',
    answer:
      'Atendemos oficinas, coworkings, hoteles, clínicas, consultorios, restaurantes, retail y edificios. Adaptamos el protocolo a las exigencias higiénicas de cada sector.',
  },
]

const whatsappMessage = encodeURIComponent(
  'Hola, quiero información sobre los servicios empresariales de Clean Company.'
)

export default function EmpresarialPage() {
  return (
    <>
      <ServiceJsonLd
        slug="empresarial"
        name="Servicio de limpieza textil empresarial"
        serviceType="Limpieza empresarial"
        alternateName={[
          'Mantenimiento de tapetes corporativos',
          'Limpieza de oficinas',
          'Servicio de limpieza textil para empresas',
        ]}
        description="Servicio profesional de mantenimiento textil para empresas: lavado de tapetes corporativos, sillas de oficina, alfombras y tapicería. Planes mensuales con SLA, facturación electrónica y atención prioritaria en Bogotá y Medellín."
        url={PAGE_URL}
        variants={[
          { name: 'Oficinas y coworkings', description: 'Mantenimiento periódico de tapetes y sillas' },
          { name: 'Hoteles y clínicas', description: 'Protocolos especializados por exigencias higiénicas' },
          { name: 'Restaurantes y retail', description: 'Cronogramas en horario no operativo' },
          { name: 'Propiedad horizontal (PH)', description: 'Lobbies, salones sociales y áreas comunes' },
        ]}
      />
      <BreadcrumbsJsonLd
        id="empresarial-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://cleancompany.com.co/' },
          { name: 'Servicios', url: 'https://cleancompany.com.co/#servicios' },
          { name: 'Limpieza empresarial', url: PAGE_URL },
        ]}
      />
      <FAQPageJsonLd id="empresarial-faq-jsonld" pageUrl={PAGE_URL} items={faqs} />

      <Header />
      <WhatsAppButton />

      <section className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-white mb-6 hover:opacity-80 transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver al inicio
          </Link>

          <Breadcrumbs
            tone="light"
            className="mb-6"
            items={[
              { name: 'Inicio', url: 'https://cleancompany.com.co/' },
              { name: 'Servicios', url: 'https://cleancompany.com.co/#servicios' },
              { name: 'Limpieza empresarial', url: PAGE_URL },
            ]}
          />

          <div className="text-center max-w-3xl mx-auto">
            <Building className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Limpieza profesional para empresas en Bogotá y Medellín
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Mantenimiento de tapetes corporativos, lavado de sillas de oficina, alfombras y
              tapicería empresarial. Planes mensuales, SLA por contrato y atención prioritaria.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 text-left">
              <h2 className="text-2xl font-semibold mb-6 text-center">Servicios corporativos</h2>
              <ul className="max-w-xl mx-auto space-y-3">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Lavado de tapetes y alfombras corporativas</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Lavado masivo de sillas de oficina y tapicería</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Mantenimiento programado mensual o trimestral</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Servicio en horario nocturno o fin de semana</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Facturación electrónica y soportes administrativos</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Acta de inspección y reporte fotográfico por servicio</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <span>Atención prioritaria para contratos anuales</span>
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
              Solicitar cotización empresarial
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Sectores que atendemos
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Oficinas y coworkings</h3>
              <p>Mantenimiento de tapetes, sillas ergonómicas y zonas de reunión.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Hoteles</h3>
              <p>Alfombras de pasillos, lobby, suites y banquetes con cronograma rotatorio.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Clínicas y consultorios</h3>
              <p>Protocolos higiénicos especializados para áreas con exigencias sanitarias.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Restaurantes y retail</h3>
              <p>Lavado en horario no operativo, sillas con manchas alimentarias frecuentes.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Propiedad horizontal</h3>
              <p>Lobbies, salones sociales y áreas comunes con plan anual.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-1">Inmobiliarias</h3>
              <p>Limpieza textil pre-entrega de inmuebles amoblados.</p>
            </div>
          </div>
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
              Solicitar propuesta empresarial
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

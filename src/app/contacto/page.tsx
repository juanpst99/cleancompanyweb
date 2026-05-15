import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, ChevronDown, Shield, MessageCircle } from 'lucide-react'
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd'
import FAQPageJsonLd, { type FAQItem } from '@/components/SEO/FAQPageJsonLd'
import JsonLd from '@/components/SEO/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ENTITY_IDS } from '@/components/SEO/StructuredData'

const PAGE_URL = 'https://cleancompany.com.co/contacto'

export const metadata: Metadata = {
  title: 'Contacto Clean Company | WhatsApp, sedes y horarios en Bogotá y Medellín',
  description:
    'Contáctanos por WhatsApp, teléfono o correo. Sedes en Bogotá (Calle 22J #104-30) y Medellín (Calle 30 #78-54). Lun–Sáb 8:00–17:00. Cotización rápida y atención profesional.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Contacto Clean Company | Bogotá y Medellín',
    description:
      'Habla con nuestro equipo por WhatsApp. Direcciones, horarios y sedes de Clean Company.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto Clean Company | Bogotá y Medellín',
    description: 'Sedes, horarios y atención por WhatsApp.',
  },
}

const faqs: FAQItem[] = [
  {
    question: '¿Atienden los domingos?',
    answer:
      'Los servicios programados se realizan de lunes a sábado en horario 8:00–17:00. Mantenemos una línea para mensajes el domingo, pero la confirmación y agenda se procesa el lunes hábil siguiente.',
  },
  {
    question: '¿Cómo agendo un servicio?',
    answer:
      'Lo más rápido es escribirnos por WhatsApp con la ciudad, el servicio que necesitas y una foto del mueble, tapete o colchón. Te enviamos una cotización clara, sin compromiso, en minutos.',
  },
  {
    question: '¿Cubren mi barrio en Bogotá o Medellín?',
    answer:
      'Atendemos la mayoría de barrios de Bogotá y del Valle de Aburrá. Confirmamos cobertura exacta al recibir tu dirección por WhatsApp para asegurar disponibilidad de equipo y tiempo de llegada.',
  },
  {
    question: '¿Cuánto tarda la respuesta a una cotización?',
    answer:
      'Respondemos las cotizaciones por WhatsApp en horario laboral de forma prioritaria. En la mayoría de los casos te entregamos precio y opciones de agenda el mismo día.',
  },
  {
    question: '¿Puedo pedir factura electrónica?',
    answer:
      'Sí. Trabajamos con facturación electrónica conforme a la normativa colombiana. Indícanos tus datos al momento de cotizar y enviamos la factura una vez confirmado el servicio.',
  },
]

const whatsappMsg = (extra: string) =>
  encodeURIComponent(`Hola Clean Company, ${extra}`)

const contactPageJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${PAGE_URL}#webpage`,
  name: 'Contacto Clean Company',
  url: PAGE_URL,
  inLanguage: 'es-CO',
  isPartOf: { '@id': ENTITY_IDS.website },
  about: { '@id': ENTITY_IDS.organization },
  primaryImageOfPage: { '@id': ENTITY_IDS.logo },
}

export default function ContactoPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        id="contacto-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://cleancompany.com.co/' },
          { name: 'Contacto', url: PAGE_URL },
        ]}
      />
      <FAQPageJsonLd id="contacto-faq-jsonld" pageUrl={PAGE_URL} items={faqs} />
      <JsonLd id="contacto-webpage-jsonld" data={contactPageJsonLd} />

      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-to-br from-[#0f4f0d] via-[#1f7a1d] to-[#3AAA35] text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            tone="light"
            className="mb-5"
            items={[
              { name: 'Inicio', url: 'https://cleancompany.com.co/' },
              { name: 'Contacto', url: PAGE_URL },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contacto Clean Company — Bogotá y Medellín
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              Te respondemos por WhatsApp en minutos durante el horario laboral. Sin compromiso,
              sin formularios largos: una foto, una ciudad y te enviamos la cotización.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/573128052720?text=${whatsappMsg('quiero cotizar un servicio.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1f7a1d] px-6 py-3 font-semibold shadow-md hover:bg-gray-100 transition"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Cotizar por WhatsApp
              </a>
              <a
                href="tel:+573128052720"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar al +57 312 805 2720
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sedes y canales */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bogotá */}
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Sede Bogotá</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  Calle 22J #104-30, Bogotá D.C.
                </p>
                <p className="flex items-start">
                  <Clock className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  Lunes a sábado, 8:00 a. m. – 5:00 p. m.
                </p>
                <p className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  <a href="tel:+573128052720" className="hover:text-[#3AAA35]">
                    +57 312 805 2720
                  </a>
                </p>
                <p className="flex items-start">
                  <Mail className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  <a href="mailto:cleancompanymed@gmail.com" className="hover:text-[#3AAA35]">
                    cleancompanymed@gmail.com
                  </a>
                </p>
              </div>
              <a
                href={`https://wa.me/573128052720?text=${whatsappMsg('quiero cotizar un servicio en Bogotá.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#3AAA35] text-white px-5 py-2.5 font-semibold hover:opacity-95 transition"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Bogotá
              </a>
              {/* Mapa: si se obtiene la URL del GBP real se reemplaza por iframe seguro */}
              <p className="mt-4 text-xs text-gray-500">
                Mapa próximamente: estamos integrando la ubicación verificada del Google Business Profile.
              </p>
            </article>

            {/* Medellín */}
            <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Sede Medellín</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  Calle 30 #78-54, Medellín, Antioquia
                </p>
                <p className="flex items-start">
                  <Clock className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  Lunes a sábado, 8:00 a. m. – 5:00 p. m.
                </p>
                <p className="flex items-start">
                  <Phone className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  <a href="tel:+573128052720" className="hover:text-[#3AAA35]">
                    +57 312 805 2720
                  </a>
                </p>
                <p className="flex items-start">
                  <Mail className="w-5 h-5 mr-2 mt-0.5 text-[#3AAA35] flex-shrink-0" />
                  <a href="mailto:cleancompanymed@gmail.com" className="hover:text-[#3AAA35]">
                    cleancompanymed@gmail.com
                  </a>
                </p>
              </div>
              <a
                href={`https://wa.me/573128052720?text=${whatsappMsg('quiero cotizar un servicio en Medellín.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#3AAA35] text-white px-5 py-2.5 font-semibold hover:opacity-95 transition"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Medellín
              </a>
              <p className="mt-4 text-xs text-gray-500">
                Mapa próximamente: estamos integrando la ubicación verificada del Google Business Profile.
              </p>
            </article>
          </div>

          {/* Banner confianza (refuerzo sin urgencia falsa) */}
          <aside className="mt-8 rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <Shield className="w-10 h-10 text-[#3AAA35] flex-shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Por qué cotizar con nosotros</h3>
              <p className="text-gray-700 text-sm mt-1">
                Inspección documentada con fotos, garantía escrita de 3 meses, atención por
                WhatsApp en horario laboral, factura electrónica y pago contra entrega o por
                transferencia. Sin urgencias artificiales: la agenda se ofrece por orden de
                cotización.
              </p>
              <Link
                href="/garantia"
                className="mt-2 inline-block text-[#1f7a1d] font-semibold text-sm hover:underline"
              >
                Conoce nuestra política de garantía →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Preguntas frecuentes de contacto
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-white rounded-xl shadow-sm p-5">
                <summary className="font-semibold cursor-pointer flex justify-between items-center text-gray-900">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={`https://wa.me/573128052720?text=${whatsappMsg('tengo una duda y quiero hablar con alguien del equipo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#3AAA35] text-white px-8 py-3 rounded-full font-semibold hover:opacity-95 transition"
            >
              Escríbenos por WhatsApp
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Tu mensaje llega directo a nuestra línea de atención.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

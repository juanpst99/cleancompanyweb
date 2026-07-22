// src/app/medellin/page.tsx
// Landing de cobertura: Medellín y toda el Área Metropolitana del Valle de Aburrá.
// Server component (SSR completo: contenido y schema visibles para crawlers de IA).

import { Metadata } from 'next'
import Link from 'next/link'
import { Check, MapPin, MessageCircle } from 'lucide-react'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import WhatsAppLink from '@/components/WhatsAppLink'
import TrustBar from '@/components/TrustBar'
import JsonLd from '@/components/SEO/JsonLd'
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd'
import FAQPageJsonLd, { type FAQItem } from '@/components/SEO/FAQPageJsonLd'
import { ENTITY_IDS } from '@/components/SEO/StructuredData'
import Breadcrumbs from '@/components/Breadcrumbs'

const PAGE_URL = 'https://www.cleancompany.com.co/medellin'

// Municipios del Área Metropolitana del Valle de Aburrá (cobertura confirmada).
const MUNICIPIOS_SUR = ['Envigado', 'Itagüí', 'Sabaneta', 'La Estrella', 'Caldas']
const MUNICIPIOS_NORTE = ['Bello', 'Copacabana', 'Girardota', 'Barbosa']
const MUNICIPIOS = ['Medellín', ...MUNICIPIOS_SUR, ...MUNICIPIOS_NORTE]

export const metadata: Metadata = {
  title:
    'Lavado de Alfombras, Muebles y Colchones en Medellín y el Área Metropolitana | Clean Company',
  description:
    'Servicio a domicilio en Medellín, Envigado, Itagüí, Sabaneta, Bello, La Estrella, Caldas, Copacabana, Girardota y Barbosa. Tapete desde $37.500/m², sofá desde $90.000. Garantía escrita de 3 meses.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Lavado de alfombras, muebles y colchones en Medellín y el Valle de Aburrá',
    description:
      'Cobertura en los 10 municipios del área metropolitana. Inyección-extracción, garantía escrita y cotización por WhatsApp en minutos.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lavado de alfombras, muebles y colchones en Medellín y el Valle de Aburrá',
    description:
      'Servicio a domicilio en los 10 municipios del área metropolitana de Medellín.',
  },
}

// Tarifas Medellín — sincronizadas a mano con src/app/api/quote/route.ts (TARIFAS.Medellín).
const PRECIOS_MEDELLIN = [
  { item: 'Tapete removible (por m², mínimo 2 m²)', precio: '$37.500 / m²' },
  { item: 'Alfombra fija instalada (por m²)', precio: '$15.000 / m²' },
  { item: 'Sofá de 2 puestos', precio: '$90.000' },
  { item: 'Sofá de 3 puestos', precio: '$105.000' },
  { item: 'Sala en L (hasta 5 puestos)', precio: '$160.000' },
  { item: 'Sala en L grande (5+ módulos)', precio: '$200.000' },
  { item: 'Poltrona / sillón', precio: '$45.000' },
  { item: 'Silla de comedor (mínimo 4)', precio: '$12.000 c/u' },
]

const FAQS_METRO: FAQItem[] = [
  {
    question: '¿Atienden en Envigado, Itagüí y Sabaneta?',
    answer:
      'Sí. Atendemos a domicilio todo el sur del Valle de Aburrá: Envigado, Itagüí, Sabaneta, La Estrella y Caldas, con los mismos precios de Medellín (tapete removible $37.500/m², sofá de 2 puestos $90.000, mínimo de visita $79.900). La agenda y cualquier detalle de desplazamiento se confirman por WhatsApp según tu dirección.',
  },
  {
    question: '¿Llegan a Bello, Copacabana, Girardota y Barbosa?',
    answer:
      'Sí. Cubrimos el norte del área metropolitana: Bello, Copacabana, Girardota y Barbosa. Para estos municipios coordinamos la visita por WhatsApp y confirmamos horario y disponibilidad según la zona; el lavado de tapetes incluye recogida y entrega en tu casa.',
  },
  {
    question: '¿Cuánto cuesta el lavado a domicilio en Medellín y el área metropolitana?',
    answer:
      'En 2026: tapete removible $37.500 por m² (mínimo 2 m²), alfombra fija $15.000 por m², sofá de 2 puestos $90.000, sofá de 3 puestos $105.000, sala en L desde $160.000 y poltrona $45.000. El mínimo de facturación por visita es $79.900. El precio exacto se confirma con una foto por WhatsApp o en la inspección.',
  },
  {
    question: '¿Recogen tapetes en el área metropolitana para lavarlos en planta?',
    answer:
      'Sí. Los tapetes y alfombras medianos o grandes se recogen a domicilio en cualquier municipio del Valle de Aburrá, se lavan en planta con secado controlado y se entregan de vuelta. El ciclo completo toma 5 a 7 días e incluye desinfección.',
  },
]

// Service JSON-LD con cobertura municipio a municipio (señal de entidad para LLMs).
const serviceMetroLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'Lavado de alfombras, muebles y colchones a domicilio en Medellín y el Área Metropolitana',
  serviceType: 'Limpieza textil a domicilio',
  description:
    'Lavado por inyección-extracción de alfombras, tapetes, muebles, colchones e interiores de vehículos en los 10 municipios del Valle de Aburrá, con garantía escrita de 3 meses.',
  url: PAGE_URL,
  provider: { '@id': ENTITY_IDS.localMedellin },
  areaServed: [
    {
      '@type': 'AdministrativeArea',
      name: 'Área Metropolitana del Valle de Aburrá',
    },
    ...MUNICIPIOS.map((m) => ({ '@type': 'City' as const, name: m })),
  ],
  audience: [
    { '@type': 'Audience', name: 'Hogares' },
    { '@type': 'BusinessAudience', name: 'Empresas y oficinas' },
  ],
  termsOfService: 'https://www.cleancompany.com.co/garantia',
}

export default function MedellinPage() {
  const msgCotizar =
    'Hola, quiero cotizar un servicio de limpieza en Medellín / área metropolitana.'

  return (
    <>
      <JsonLd id="service-metro-jsonld" data={serviceMetroLd} />
      <FAQPageJsonLd id="faq-metro-jsonld" pageUrl={PAGE_URL} items={FAQS_METRO} />
      <BreadcrumbsJsonLd
        id="medellin-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
          { name: 'Medellín y área metropolitana', url: PAGE_URL },
        ]}
      />

      <Header />
      <WhatsAppButton />

      {/* Hero — respuesta factual front-loaded (lo que la IA cita) */}
      <section className="relative pt-28 pb-14 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-15" />
        <div className="container mx-auto px-4 relative z-10">
          <Breadcrumbs
            tone="light"
            className="mb-5"
            items={[
              { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
              { name: 'Medellín y área metropolitana', url: PAGE_URL },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lavado de alfombras, muebles y colchones en Medellín y toda el área metropolitana
            </h1>
            <p className="text-lg md:text-xl opacity-95 mb-6">
              Clean Company atiende a domicilio los 10 municipios del Valle de Aburrá:{' '}
              <strong>{MUNICIPIOS.join(', ')}</strong>. Lavamos por inyección-extracción con
              garantía escrita de 3 meses — tapete removible desde{' '}
              <strong>$37.500/m²</strong>, sofá de 2 puestos desde <strong>$90.000</strong> y
              mínimo de visita de <strong>$79.900</strong>. Cotización por WhatsApp en minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-5">
              <WhatsAppLink
                message={msgCotizar}
                className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-base hover:bg-green-600 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Cotizar gratis por WhatsApp
              </WhatsAppLink>
              <Link
                href="/preguntas-frecuentes"
                className="text-white/90 font-medium underline underline-offset-4 decoration-white/40 hover:decoration-white hover:text-white transition px-2 py-2"
              >
                Ver preguntas frecuentes
              </Link>
            </div>
            <TrustBar variant="light" hideCities className="mt-2" />
          </div>
        </div>
      </section>

      {/* Municipios — entidades nombradas (sur y norte del valle) */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-3">
            Cobertura en el Valle de Aburrá
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Mismo equipo, mismos productos pH neutro y la misma garantía en los 10 municipios
            del área metropolitana de Medellín.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" /> Medellín y sur del valle
              </h3>
              <ul className="space-y-2">
                {['Medellín', ...MUNICIPIOS_SUR].map((m) => (
                  <li key={m} className="flex items-center text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Lavado a domicilio en {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" /> Norte del valle
              </h3>
              <ul className="space-y-2">
                {MUNICIPIOS_NORTE.map((m) => (
                  <li key={m} className="flex items-center text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Lavado a domicilio en {m}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Para el norte del valle coordinamos horario y disponibilidad por WhatsApp según
                la zona.
              </p>
              <p className="text-sm text-gray-500 mt-3">
                ¿Estás en el Oriente antioqueño?{' '}
                <Link href="/oriente" className="text-blue-600 hover:underline">
                  Ver cobertura en Rionegro, La Ceja y Marinilla
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios Medellín — tabla citable (tarifas reales) */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-3">
            Precios en Medellín y el área metropolitana (2026)
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Tarifas de referencia sin membresía. El valor exacto se confirma con una foto por
            WhatsApp o en la inspección; el mínimo de facturación por visita es{' '}
            <strong>$79.900</strong>.
          </p>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold">Servicio</th>
                  <th className="px-5 py-3 font-semibold text-right">Precio</th>
                </tr>
              </thead>
              <tbody>
                {PRECIOS_MEDELLIN.map((p, i) => (
                  <tr key={p.item} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-5 py-3 text-gray-700">{p.item}</td>
                    <td className="px-5 py-3 text-right font-semibold text-blue-700">
                      {p.precio}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Colchones y vehículos se cotizan por WhatsApp según tamaño y estado. Servicios:{' '}
            <Link href="/servicios/alfombras" className="text-blue-600 hover:underline">
              alfombras
            </Link>
            {', '}
            <Link href="/servicios/muebles" className="text-blue-600 hover:underline">
              muebles
            </Link>
            {' y '}
            <Link href="/servicios/colchones" className="text-blue-600 hover:underline">
              colchones
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ metropolitana (entra al schema FAQPage) */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Preguntas frecuentes del área metropolitana
          </h2>
          <div className="space-y-3">
            {FAQS_METRO.map((faq) => (
              <details key={faq.question} className="group bg-gray-50 rounded-xl shadow-sm p-5">
                <summary className="font-semibold cursor-pointer text-gray-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA cierre */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿En qué municipio estás? Te cotizamos en minutos
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Envíanos una foto de tu tapete, sofá o colchón por WhatsApp y recibe el precio al
            instante. Pagas después del servicio, con garantía escrita.
          </p>
          <WhatsAppLink
            message={msgCotizar}
            className="inline-flex items-center bg-green-500 text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-green-600 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Cotizar por WhatsApp
          </WhatsAppLink>
        </div>
      </section>

      <Footer />
    </>
  )
}

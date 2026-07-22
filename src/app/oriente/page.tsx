// src/app/oriente/page.tsx
// Landing de cobertura: Oriente antioqueño (Rionegro, La Ceja, Marinilla, Llanogrande,
// El Retiro, Guarne, La Unión y San Antonio de Pereira).
// Server component (SSR completo: contenido y schema visibles para crawlers de IA).
// Mismo molde que /medellin.

import { Metadata } from 'next'
import Link from 'next/link'
import { Check, MapPin, MessageCircle, Truck } from 'lucide-react'
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
import { MUNICIPIOS_ORIENTE, MINIMO_POR_ZONA } from '@/lib/ciudades'

const PAGE_URL = 'https://www.cleancompany.com.co/oriente'
const MINIMO = MINIMO_POR_ZONA.oriente // $99.900

export const metadata: Metadata = {
  title:
    'Lavado de Muebles, Colchones y Tapetes en Rionegro y el Oriente Antioqueño | Clean Company',
  description:
    'Servicio a domicilio en Rionegro, Llanogrande, La Ceja, Marinilla, El Retiro, Guarne, La Unión y San Antonio de Pereira. Sofá desde $90.000, tapete desde $37.500/m². Garantía escrita de 3 meses.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Lavado de muebles, colchones y tapetes en el Oriente antioqueño',
    description:
      'Cobertura en Rionegro, Llanogrande, La Ceja, Marinilla y todo el Oriente. Inyección-extracción, garantía escrita y cotización por WhatsApp en minutos.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lavado de muebles, colchones y tapetes en el Oriente antioqueño',
    description: 'Servicio a domicilio en Rionegro, La Ceja, Marinilla, Llanogrande y más.',
  },
}

// Tarifas Oriente — sincronizadas a mano con src/app/api/quote/route.ts (TARIFAS.Oriente).
// Mismos precios de Medellín; el mínimo de visita sí es mayor.
const PRECIOS_ORIENTE = [
  { item: 'Sofá de 2 puestos', precio: '$90.000' },
  { item: 'Sofá de 3 puestos', precio: '$105.000' },
  { item: 'Sala en L (hasta 5 puestos)', precio: '$160.000' },
  { item: 'Sala en L grande (5+ módulos)', precio: '$200.000' },
  { item: 'Poltrona / sillón', precio: '$45.000' },
  { item: 'Silla de comedor (mínimo 4)', precio: '$12.000 c/u' },
  { item: 'Tapete removible (por m², mínimo 2 m²)', precio: '$37.500 / m²' },
  { item: 'Alfombra fija instalada (por m²)', precio: '$15.000 / m²' },
]

const FAQS_ORIENTE: FAQItem[] = [
  {
    question: '¿Atienden en Rionegro, La Ceja y Marinilla?',
    answer:
      'Sí. Atendemos a domicilio todo el Oriente antioqueño: Rionegro, Llanogrande, San Antonio de Pereira, La Ceja, Marinilla, El Retiro, Guarne y La Unión. Los precios son los mismos de Medellín (sofá de 2 puestos $90.000, tapete removible $37.500/m²); el mínimo de facturación por visita en el Oriente es $99.900. La agenda se confirma por WhatsApp según tu dirección.',
  },
  {
    question: '¿Cómo funciona el lavado de tapetes en el Oriente?',
    answer:
      'Recogemos el tapete o la alfombra en tu casa, lo lavamos en planta con secado controlado y te lo devolvemos limpio y desinfectado. El ciclo completo toma 5 a 7 días. La recogida y la entrega están incluidas en el precio del servicio.',
  },
  {
    question: '¿Lavan los muebles y colchones en mi casa o se los llevan?',
    answer:
      'Los muebles, salas y colchones se lavan en tu casa, el mismo día, con máquina de inyección-extracción y productos de pH neutro. Secan entre 3 y 6 horas según el clima y el tipo de tela. No hay que desmontar nada ni sacar los muebles.',
  },
  {
    question: '¿Cuánto cuesta el lavado a domicilio en el Oriente antioqueño?',
    answer:
      'En 2026: sofá de 2 puestos $90.000, sofá de 3 puestos $105.000, sala en L desde $160.000, poltrona $45.000, tapete removible $37.500 por m² (mínimo 2 m²) y alfombra fija $15.000 por m². El mínimo de facturación por visita es $99.900. El precio exacto se confirma con una foto por WhatsApp.',
  },
  {
    question: '¿Tienen garantía en el Oriente?',
    answer:
      'Sí, la misma garantía escrita de 3 meses que en Medellín. Si algo no queda bien, volvemos sin costo. Además entregamos acta de inspección antes del servicio, donde queda registrado el estado de cada pieza.',
  },
]

// Service JSON-LD con cobertura municipio a municipio (señal de entidad para LLMs).
const serviceOrienteLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${PAGE_URL}#service`,
  name: 'Lavado de muebles, colchones y tapetes a domicilio en el Oriente antioqueño',
  serviceType: 'Limpieza textil a domicilio',
  description:
    'Lavado por inyección-extracción de muebles, colchones, tapetes y alfombras en Rionegro, Llanogrande, La Ceja, Marinilla, El Retiro, Guarne, La Unión y San Antonio de Pereira, con garantía escrita de 3 meses.',
  url: PAGE_URL,
  provider: { '@id': ENTITY_IDS.localMedellin },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Oriente antioqueño' },
    ...MUNICIPIOS_ORIENTE.map((m) => ({ '@type': 'City' as const, name: m })),
  ],
  audience: [
    { '@type': 'Audience', name: 'Hogares' },
    { '@type': 'BusinessAudience', name: 'Fincas, hoteles y empresas' },
  ],
  termsOfService: 'https://www.cleancompany.com.co/garantia',
}

export default function OrientePage() {
  const msgCotizar =
    'Hola, quiero cotizar un servicio de limpieza en el Oriente antioqueño (Rionegro / La Ceja / Marinilla).'

  return (
    // Usa la línea normal de Clean Company (principal L-S, secundaria los domingos),
    // igual que el resto del sitio.
    <>
      <JsonLd id="service-oriente-jsonld" data={serviceOrienteLd} />
      <FAQPageJsonLd id="faq-oriente-jsonld" pageUrl={PAGE_URL} items={FAQS_ORIENTE} />
      <BreadcrumbsJsonLd
        id="oriente-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
          { name: 'Oriente antioqueño', url: PAGE_URL },
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
              { name: 'Oriente antioqueño', url: PAGE_URL },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lavado de muebles, colchones y tapetes en Rionegro y el Oriente antioqueño
            </h1>
            <p className="text-lg md:text-xl opacity-95 mb-6">
              Clean Company atiende a domicilio{' '}
              <strong>{MUNICIPIOS_ORIENTE.join(', ')}</strong>. Lavamos por
              inyección-extracción con garantía escrita de 3 meses — sofá de 2 puestos desde{' '}
              <strong>$90.000</strong>, tapete removible desde <strong>$37.500/m²</strong> y
              mínimo de visita de <strong>$99.900</strong>. Cotización por WhatsApp en minutos.
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

      {/* Municipios — entidades nombradas */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-3">
            Cobertura en el Oriente antioqueño
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Mismos productos pH neutro, misma garantía escrita y los mismos precios de
            Medellín, ahora con equipo en la zona.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" /> Municipios que atendemos
              </h3>
              <ul className="space-y-2">
                {MUNICIPIOS_ORIENTE.map((m) => (
                  <li key={m} className="flex items-center text-gray-700">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Lavado a domicilio en {m}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" /> Cómo funciona
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Muebles, salas y colchones:</strong> se lavan en tu casa el mismo
                    día, con máquina de inyección-extracción. Secan en 3 a 6 horas.
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Tapetes y alfombras removibles:</strong> los recogemos, los lavamos
                    en planta con secado controlado y te los devolvemos en 5 a 7 días. Recogida
                    y entrega incluidas.
                  </span>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>
                    <strong>Antes de empezar:</strong> acta de inspección con el estado de cada
                    pieza y garantía escrita de 3 meses.
                  </span>
                </li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Mínimo de facturación por visita en el Oriente:{' '}
                <strong>${MINIMO.toLocaleString('es-CO')}</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios — tabla citable */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-3">
            Precios en el Oriente antioqueño (2026)
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Las mismas tarifas de Medellín. El valor exacto se confirma con una foto por
            WhatsApp o en la inspección; el mínimo de facturación por visita es{' '}
            <strong>${MINIMO.toLocaleString('es-CO')}</strong>.
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
                {PRECIOS_ORIENTE.map((p, i) => (
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
            <Link
              href="/servicios/muebles?ciudad=Rionegro"
              className="text-blue-600 hover:underline"
            >
              muebles
            </Link>
            {', '}
            <Link
              href="/servicios/colchones?ciudad=Rionegro"
              className="text-blue-600 hover:underline"
            >
              colchones
            </Link>
            {' y '}
            <Link
              href="/servicios/alfombras?ciudad=Rionegro"
              className="text-blue-600 hover:underline"
            >
              tapetes y alfombras
            </Link>
            {'. También lavamos '}
            <Link
              href="/servicios/cortinas?ciudad=Rionegro"
              className="text-blue-600 hover:underline"
            >
              cortinas
            </Link>
            {' (las descolgamos y las volvemos a colgar).'}
          </p>
        </div>
      </section>

      {/* FAQ (entra al schema FAQPage) */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-8">
            Preguntas frecuentes del Oriente antioqueño
          </h2>
          <div className="space-y-3">
            {FAQS_ORIENTE.map((faq) => (
              <details key={faq.question} className="group bg-gray-50 rounded-xl shadow-sm p-5">
                <summary className="font-semibold cursor-pointer text-gray-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            ¿Estás en Medellín o el área metropolitana?{' '}
            <Link href="/medellin" className="text-blue-600 hover:underline">
              Ver cobertura del Valle de Aburrá
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CTA cierre */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿En qué municipio estás? Te cotizamos en minutos
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Envíanos una foto de tu sofá, colchón o tapete por WhatsApp y recibe el precio al
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

import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'
import {
  ShieldCheck,
  FileSearch,
  Sparkles,
  ClipboardCheck,
  Building2,
  Users,
  MapPin,
  MessageCircle,
  ChevronDown,
} from 'lucide-react'
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd'
import FAQPageJsonLd, { type FAQItem } from '@/components/SEO/FAQPageJsonLd'
import JsonLd from '@/components/SEO/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ENTITY_IDS } from '@/components/SEO/StructuredData'

const PAGE_URL = 'https://cleancompany.com.co/nosotros'

export const metadata: Metadata = {
  title: 'Nosotros | Clean Company — Lavado profesional en Bogotá y Medellín',
  description:
    'Conoce Clean Company: empresa colombiana de limpieza textil profesional con operación en Bogotá y Medellín. Procesos, garantía escrita y atención por WhatsApp.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Nosotros | Clean Company',
    description:
      'Empresa colombiana de limpieza textil. Atendemos hogares y empresas en Bogotá y Medellín.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros | Clean Company',
    description:
      'Empresa colombiana de limpieza textil. Operamos en Bogotá y Medellín.',
  },
}

const faqs: FAQItem[] = [
  {
    question: '¿Desde cuándo opera Clean Company?',
    answer:
      'Clean Company opera de manera continua atendiendo hogares y empresas en Bogotá y Medellín. La fecha exacta de constitución legal y registro mercantil está disponible para clientes empresariales que la soliciten.',
  },
  {
    question: '¿Qué hace diferente a Clean Company de otros servicios de lavado?',
    answer:
      'Trabajamos con inspección documentada antes de iniciar cualquier servicio, productos pH neutro de grado profesional, garantía escrita de 3 meses respaldada por política pública y atención dedicada por WhatsApp con un código de referencia por servicio.',
  },
  {
    question: '¿Atienden tanto hogares como empresas?',
    answer:
      'Sí. Atendemos hogares particulares para lavado de tapetes, muebles y colchones; y también ofrecemos servicios empresariales con planes mensuales para oficinas, hoteles, clínicas, restaurantes, retail y propiedad horizontal.',
  },
  {
    question: '¿En qué ciudades operan?',
    answer:
      'Bogotá D.C. y Medellín (Antioquia) son nuestras ciudades de operación directa, con cobertura en sus áreas metropolitanas. Confirmamos cobertura exacta de tu barrio por WhatsApp antes de agendar.',
  },
  {
    question: '¿Qué garantía ofrecen?',
    answer:
      'Tres meses de garantía escrita conforme a la Ley 1480/2011 (Estatuto del Consumidor de Colombia), con acta de inspección, plazo de 5 días hábiles para reportar inconformidades y procedimiento documentado. Detalle completo en nuestra página de Garantía.',
  },
]

const valuesJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${PAGE_URL}#webpage`,
  name: 'Nosotros — Clean Company',
  url: PAGE_URL,
  inLanguage: 'es-CO',
  isPartOf: { '@id': ENTITY_IDS.website },
  about: { '@id': ENTITY_IDS.organization },
  primaryImageOfPage: { '@id': ENTITY_IDS.logo },
}

export default function NosotrosPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        id="nosotros-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://cleancompany.com.co/' },
          { name: 'Nosotros', url: PAGE_URL },
        ]}
      />
      <FAQPageJsonLd id="nosotros-faq-jsonld" pageUrl={PAGE_URL} items={faqs} />
      <JsonLd id="nosotros-webpage-jsonld" data={valuesJsonLd} />

      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative pt-28 pb-14 bg-gradient-to-br from-[#0f4f0d] via-[#1f7a1d] to-[#3AAA35] text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            tone="light"
            className="mb-5"
            items={[
              { name: 'Inicio', url: 'https://cleancompany.com.co/' },
              { name: 'Nosotros', url: PAGE_URL },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Quiénes somos: una empresa colombiana de limpieza textil profesional
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              Clean Company atiende hogares y empresas en Bogotá y Medellín. Trabajamos con
              procesos documentados, productos profesionales y garantía escrita para que cada
              cotización por WhatsApp termine en un servicio en el que puedas confiar.
            </p>
          </div>
        </div>
      </section>

      {/* Qué nos define */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition">
              <FileSearch className="w-10 h-10 text-[#3AAA35]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-gray-900 mt-3">Inspección documentada</h2>
              <p className="text-gray-700 mt-2 text-sm">
                Antes de cada servicio levantamos un acta con fotos: material, antigüedad
                aparente, desgaste, manchas previas y fragilidades. Eso reduce malentendidos y
                protege tu pieza.
              </p>
            </article>
            <article className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition">
              <Sparkles className="w-10 h-10 text-[#3AAA35]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-gray-900 mt-3">Productos profesionales</h2>
              <p className="text-gray-700 mt-2 text-sm">
                Usamos productos pH neutro de grado profesional, seleccionados según el material:
                fibras naturales, sintéticas, cuero o telas delicadas. Hacemos prueba en zona
                poco visible cuando aplica.
              </p>
            </article>
            <article className="rounded-2xl border border-gray-100 p-6 hover:shadow-md transition">
              <ShieldCheck className="w-10 h-10 text-[#3AAA35]" aria-hidden="true" />
              <h2 className="text-xl font-bold text-gray-900 mt-3">Garantía escrita 3 meses</h2>
              <p className="text-gray-700 mt-2 text-sm">
                Política pública conforme a la Ley 1480/2011. Si algo no quedó como acordamos,
                tienes 5 días hábiles para reportarlo y procedimiento claro de respuesta.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            Cómo trabajamos en cada servicio
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-800">
            {[
              { i: 1, t: 'Cotización por WhatsApp', d: 'Una foto, tu ciudad y el material. Te respondemos con cotización clara y agenda disponible.' },
              { i: 2, t: 'Inspección y acta', d: 'Antes de iniciar dejamos por escrito el estado de la pieza, riesgos y método.' },
              { i: 3, t: 'Aspirado profundo', d: 'Removemos partículas sólidas, pelos y polvo con equipo industrial.' },
              { i: 4, t: 'Pretratamiento de manchas', d: 'Aplicamos productos específicos según mancha y material.' },
              { i: 5, t: 'Lavado por inyección–extracción', d: 'Lavado profesional con productos pH neutro y vapor profesional cuando aplica.' },
              { i: 6, t: 'Secado y entrega con QA', d: 'Secado controlado, revisión final y comprobante de servicio.' },
            ].map((s) => (
              <li key={s.i} className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-full bg-[#3AAA35] text-white flex items-center justify-center font-bold">
                    {s.i}
                  </span>
                  <h3 className="font-semibold text-gray-900">{s.t}</h3>
                </div>
                <p className="text-sm text-gray-700">{s.d}</p>
              </li>
            ))}
          </ol>
          <div className="text-center mt-8">
            <Link
              href="/proceso-de-lavado"
              className="inline-block text-[#1f7a1d] font-semibold hover:underline"
            >
              Ver proceso completo paso a paso →
            </Link>
          </div>
        </div>
      </section>

      {/* Cobertura y a quién atendemos */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <MapPin className="w-6 h-6 mr-2 text-[#3AAA35]" />
                Dónde operamos
              </h2>
              <p className="text-gray-700 mb-3">
                Atendemos directamente en Bogotá y Medellín con sedes físicas en cada ciudad.
                Confirmamos cobertura por barrio al recibir tu dirección por WhatsApp.
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Sede Bogotá: Calle 22J #104-30</li>
                <li>• Sede Medellín: Calle 30 #78-54</li>
                <li>• Horario: Lun – Sáb, 8:00 a. m. – 5:00 p. m.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <Users className="w-6 h-6 mr-2 text-[#3AAA35]" />
                A quién atendemos
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <Sparkles className="w-4 h-4 text-[#3AAA35] mr-2 mt-1 flex-shrink-0" />
                  Hogares: alfombras, sofás, sillas, colchones y tapicería en general.
                </li>
                <li className="flex items-start">
                  <Building2 className="w-4 h-4 text-[#3AAA35] mr-2 mt-1 flex-shrink-0" />
                  Empresas: oficinas, coworkings, hoteles, clínicas, restaurantes, retail.
                </li>
                <li className="flex items-start">
                  <ClipboardCheck className="w-4 h-4 text-[#3AAA35] mr-2 mt-1 flex-shrink-0" />
                  Propiedad horizontal: lobbies, salones sociales, áreas comunes.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Confianza ética */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Una promesa que sí podemos sostener
          </h2>
          <p className="text-gray-700">
            No prometemos lo que no podemos cumplir. Cada mancha se evalúa antes; cada pieza se
            documenta; cada compromiso queda por escrito. Si algo no salió como debía, lo
            arreglamos según nuestra política de garantía pública.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/garantia"
              className="inline-flex items-center justify-center rounded-full bg-[#3AAA35] text-white px-6 py-3 font-semibold hover:opacity-95 transition"
            >
              Leer política de garantía
            </Link>
            <a
              href={`https://wa.me/573128052720?text=${encodeURIComponent('Hola, quiero conocer más sobre Clean Company y cotizar un servicio.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#3AAA35] text-[#1f7a1d] px-6 py-3 font-semibold hover:bg-white transition"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Hablar con el equipo
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Preguntas frecuentes sobre la empresa
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-gray-50 rounded-xl shadow-sm p-5">
                <summary className="font-semibold cursor-pointer flex justify-between items-center text-gray-900">
                  {faq.question}
                  <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

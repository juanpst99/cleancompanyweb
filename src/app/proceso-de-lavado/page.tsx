import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'
import { ChevronDown, MessageCircle, ShieldCheck, ClipboardCheck } from 'lucide-react'
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd'
import FAQPageJsonLd, { type FAQItem } from '@/components/SEO/FAQPageJsonLd'
import JsonLd from '@/components/SEO/JsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'

const PAGE_URL = 'https://www.cleancompany.com.co/proceso-de-lavado'

export const metadata: Metadata = {
  title: 'Cómo lavamos tu tapete, mueble o colchón paso a paso | Clean Company',
  description:
    'Proceso profesional de Clean Company: inspección documentada, aspirado industrial, pretratamiento de manchas, lavado por inyección-extracción, secado controlado y entrega con QA.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Proceso de lavado profesional | Clean Company',
    description:
      'Conoce el paso a paso de cómo lavamos alfombras, muebles y colchones en Bogotá y Medellín.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Proceso de lavado profesional | Clean Company',
    description: 'Inspección, lavado, secado controlado y entrega con QA.',
  },
}

const faqs: FAQItem[] = [
  {
    question: '¿Cuánto tarda el proceso completo?',
    answer:
      'Depende del servicio. El lavado de muebles o colchones suele dejarse listo en el mismo día con secado parcial; alfombras y tapetes se llevan a planta y el ciclo completo (recogida, lavado, secado, entrega) toma típicamente 5 a 7 días.',
  },
  {
    question: '¿Pueden garantizar que toda mancha sale?',
    answer:
      'No prometemos eliminación 100% de manchas. Algunas (orina antigua, tintas, óxido, decoloraciones por sol) pueden no remover por completo. En la inspección te decimos honestamente qué resultado esperar y aplicamos las técnicas que mejor convienen al material.',
  },
  {
    question: '¿Por qué llevarse el tapete a planta?',
    answer:
      'Para asegurar secado controlado y un lavado profundo necesitamos equipos y espacio que no caben en la mayoría de hogares. Eso reduce riesgo de humedad residual, olores y daños por secado al aire.',
  },
  {
    question: '¿El proceso es seguro para niños y mascotas?',
    answer:
      'Usamos productos pH neutro de grado profesional. Una vez la pieza está completamente seca no quedan residuos tóxicos. Recomendamos esperar al secado completo antes de que mascotas o bebés entren en contacto directo.',
  },
  {
    question: '¿Qué hago si tengo dudas durante el servicio?',
    answer:
      'Cada servicio tiene un código de referencia que aparece en el mensaje de WhatsApp. Puedes responder en cualquier momento al chat de Clean Company y tu duda queda asociada a tu servicio para seguimiento.',
  },
]

const howToJsonLd: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${PAGE_URL}#howto`,
  name: 'Cómo lavamos profesionalmente alfombras, muebles y colchones',
  description:
    'Proceso paso a paso que aplica Clean Company para lavar alfombras, tapetes, muebles y colchones en Bogotá y Medellín.',
  totalTime: 'P5D',
  tool: [
    { '@type': 'HowToTool', name: 'Equipo de inyección-extracción profesional' },
    { '@type': 'HowToTool', name: 'Aspiradora industrial' },
    { '@type': 'HowToTool', name: 'Productos pH neutro de grado profesional' },
    { '@type': 'HowToTool', name: 'Vapor profesional para tratamiento textil' },
  ],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Cotización y agenda', text: 'Recibimos foto y ciudad por WhatsApp, devolvemos cotización clara y agenda disponible.' },
    { '@type': 'HowToStep', position: 2, name: 'Inspección documentada', text: 'Levantamos acta con fotos de material, manchas y riesgos antes de iniciar.' },
    { '@type': 'HowToStep', position: 3, name: 'Aspirado industrial', text: 'Removemos partículas, polvo y pelos con aspiradora de alta potencia.' },
    { '@type': 'HowToStep', position: 4, name: 'Pretratamiento de manchas', text: 'Aplicamos productos específicos para cada tipo de mancha y material.' },
    { '@type': 'HowToStep', position: 5, name: 'Lavado profesional', text: 'Inyección-extracción y/o lavado a vapor según el material y el tipo de servicio.' },
    { '@type': 'HowToStep', position: 6, name: 'Secado controlado', text: 'Secado dirigido para evitar humedad residual, olores y daños por secado al aire.' },
    { '@type': 'HowToStep', position: 7, name: 'Entrega con QA', text: 'Revisamos el resultado, te entregamos la pieza y dejamos constancia del servicio.' },
  ],
}

const TYPE_PROCESSES: { id: string; titulo: string; descripcion: string; pasos: string[]; nota: string }[] = [
  {
    id: 'alfombras',
    titulo: 'Alfombras y tapetes',
    descripcion:
      'Para piezas medianas y grandes recomendamos lavado en planta con secado controlado. Para alfombras delicadas (persas, antiguas, fibras naturales) aplicamos protocolos específicos.',
    pasos: [
      'Inspección con fotos: material, antigüedad, tintes, daños previos.',
      'Aspirado industrial profundo.',
      'Pretratamiento de manchas por tipo.',
      'Lavado por inyección-extracción.',
      'Secado controlado en planta.',
      'Revisión final y entrega.',
    ],
    nota:
      'En piezas antiguas o de tintes naturales puede haber limitaciones en la remoción de manchas; lo documentamos antes de iniciar.',
  },
  {
    id: 'muebles',
    titulo: 'Muebles, sofás y sillas',
    descripcion:
      'Atendemos a domicilio en la mayoría de muebles. Diferenciamos protocolos para telas, cuero y tapicería sensible.',
    pasos: [
      'Inspección y prueba en zona poco visible si el material es delicado.',
      'Aspirado profundo en costuras y respaldos.',
      'Pretratamiento de manchas y zonas de alto contacto.',
      'Lavado por inyección-extracción o limpieza específica para cuero.',
      'Secado dirigido para acelerar disponibilidad de uso.',
      'Entrega con recomendaciones de uso post-lavado.',
    ],
    nota:
      'En muebles de cuero usamos productos específicos. No prometemos remover decoloraciones permanentes ni daños estructurales previos.',
  },
  {
    id: 'colchones',
    titulo: 'Colchones',
    descripcion:
      'Servicio a domicilio para colchones sencillos, dobles, queen, king y pillow top. Tratamiento antiácaros incluido cuando aplica al material.',
    pasos: [
      'Inspección visual con fotos: manchas, decoloraciones, deformaciones.',
      'Aspirado profundo en ambas caras.',
      'Pretratamiento específico de manchas (sudor, líquidos, mascotas).',
      'Lavado a vapor profesional con productos sanitizantes.',
      'Secado controlado para evitar humedad residual.',
      'Entrega con recomendación de tiempo antes de uso normal.',
    ],
    nota:
      'Manchas profundas en el núcleo del colchón pueden no remover completamente. Te indicamos resultado esperado antes de iniciar.',
  },
]

export default function ProcesoPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        id="proceso-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
          { name: 'Proceso de lavado', url: PAGE_URL },
        ]}
      />
      <FAQPageJsonLd id="proceso-faq-jsonld" pageUrl={PAGE_URL} items={faqs} />
      <JsonLd id="proceso-howto-jsonld" data={howToJsonLd} />

      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative pt-28 pb-14 bg-gradient-to-br from-[#0f4f0d] via-[#1f7a1d] to-[#3AAA35] text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            tone="light"
            className="mb-5"
            items={[
              { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
              { name: 'Proceso de lavado', url: PAGE_URL },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cómo lavamos tu tapete, mueble o colchón paso a paso
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              Aquí explicamos todo lo que pasa entre tu primer WhatsApp y la entrega del servicio.
              Sin promesas mágicas: solo procesos profesionales, garantía escrita y resultado
              comprobable.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/573128052720?text=${encodeURIComponent('Hola, quiero cotizar un servicio.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1f7a1d] px-6 py-3 font-semibold shadow-md hover:bg-gray-100 transition"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Cotizar por WhatsApp
              </a>
              <Link
                href="/garantia"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 font-semibold hover:bg-white/10 transition"
              >
                <ShieldCheck className="w-5 h-5 mr-2" />
                Ver política de garantía
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso general */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Proceso general en 7 pasos
          </h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(howToJsonLd.step as { name: string; text: string; position: number }[]).map((s) => (
              <li
                key={s.position}
                className="rounded-2xl bg-gray-50 border border-gray-100 p-5 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-9 h-9 rounded-full bg-[#3AAA35] text-white flex items-center justify-center font-bold">
                    {s.position}
                  </span>
                  <h3 className="font-semibold text-gray-900">{s.name}</h3>
                </div>
                <p className="text-sm text-gray-700">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-center text-sm text-gray-500 max-w-2xl mx-auto">
            Fotos y video del proceso disponibles próximamente. Si quieres ver el detalle hoy
            mismo, pídenos un video por WhatsApp del servicio que necesitas.
          </p>
        </div>
      </section>

      {/* Variaciones por tipo */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Variaciones del proceso según el tipo de servicio
          </h2>
          <div className="space-y-5">
            {TYPE_PROCESSES.map((p) => (
              <article
                key={p.id}
                id={p.id}
                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{p.titulo}</h3>
                <p className="text-gray-700 mb-4">{p.descripcion}</p>
                <ol className="grid sm:grid-cols-2 gap-2 text-sm text-gray-800 list-decimal list-inside marker:text-[#3AAA35]">
                  {p.pasos.map((paso) => (
                    <li key={paso}>{paso}</li>
                  ))}
                </ol>
                <div className="mt-4 flex items-start gap-2 text-sm text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-3">
                  <ClipboardCheck className="w-5 h-5 text-[#3AAA35] flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Honestidad operativa:</strong> {p.nota}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Preguntas frecuentes sobre el proceso
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
          <div className="mt-10 text-center">
            <a
              href={`https://wa.me/573128052720?text=${encodeURIComponent('Hola, leí su proceso y quiero cotizar.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#3AAA35] text-white px-8 py-3 rounded-full font-semibold hover:opacity-95 transition"
            >
              Cotizar mi servicio por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

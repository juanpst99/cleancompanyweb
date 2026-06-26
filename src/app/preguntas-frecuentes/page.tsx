import { Metadata } from 'next'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import Link from 'next/link'
import { ChevronDown, MessageCircle } from 'lucide-react'
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd'
import FAQPageJsonLd, { type FAQItem } from '@/components/SEO/FAQPageJsonLd'
import Breadcrumbs from '@/components/Breadcrumbs'
import FaqSearch from '@/components/FaqSearch'

const PAGE_URL = 'https://www.cleancompany.com.co/preguntas-frecuentes'

export const metadata: Metadata = {
  title: 'Preguntas frecuentes | Clean Company — Lavado profesional Bogotá y Medellín',
  description:
    'Respuestas a dudas frecuentes sobre lavado de tapetes, muebles, colchones, vehículos y servicio empresarial. Tiempos, precios, garantía, pagos y cobertura.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Preguntas frecuentes | Clean Company',
    description:
      'Tiempos, precios, garantía, pagos, cobertura y todo lo que necesitas saber antes de cotizar.',
    url: PAGE_URL,
    siteName: 'Clean Company',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Preguntas frecuentes | Clean Company',
    description:
      'Tiempos, precios, garantía, pagos y cobertura para lavado profesional en Bogotá y Medellín.',
  },
}

type Group = {
  id: string
  titulo: string
  faqs: FAQItem[]
}

const GROUPS: Group[] = [
  {
    id: 'tapetes',
    titulo: 'Alfombras y tapetes',
    faqs: [
      {
        question: '¿Cada cuánto debo lavar una alfombra?',
        answer:
          'Para uso normal en hogar se recomienda lavado profesional cada 12 a 18 meses. Si tienes mascotas, alergias, niños pequeños o tráfico alto, considera lavado cada 6 a 12 meses para mantener la pieza en buen estado y reducir ácaros.',
      },
      {
        question: '¿Lavan alfombras persas u orientales?',
        answer:
          'Sí. Aplicamos un protocolo específico para fibras naturales y tintes vegetales, incluyendo pruebas previas y secado controlado. En piezas antiguas documentamos riesgos en el acta de inspección antes de iniciar.',
      },
      {
        question: '¿Cuánto tarda el secado del tapete?',
        answer:
          'En planta el ciclo completo (recogida, lavado, secado y entrega) suele tomar 5 a 7 días. Tiempos exactos dependen del material, el grosor y la temporada.',
      },
      {
        question: '¿Tienen que llevarse mi tapete?',
        answer:
          'Para tapetes y alfombras medianos o grandes, llevamos la pieza a planta para garantizar lavado profundo y secado controlado. Eso reduce el riesgo de humedad residual y olores.',
      },
    ],
  },
  {
    id: 'muebles',
    titulo: 'Muebles y sofás',
    faqs: [
      {
        question: '¿Cuánto tarda en secar un sofá después del lavado?',
        answer:
          'Con secado dirigido un sofá lavado por inyección-extracción suele quedar utilizable en pocas horas y completamente seco al día siguiente, dependiendo del tipo de relleno y la ventilación del espacio.',
      },
      {
        question: '¿Lavan sofás de cuero?',
        answer:
          'Sí. Para cuero usamos productos específicos: limpieza, hidratación y nutrición de la piel. No aplicamos técnicas pensadas para tela en cuero porque pueden deteriorar el material.',
      },
      {
        question: '¿Necesito mover mis muebles?',
        answer:
          'En la mayoría de los casos coordinamos para trabajar el mueble en su sitio. Si requiere espacio adicional para acceso del equipo, te lo indicamos al cotizar para que estés prevenido.',
      },
      {
        question: '¿Pueden quitar olor a mascota de un sofá?',
        answer:
          'Aplicamos pretratamiento específico y sanitizantes profesionales. En casos severos puede requerirse más de una sesión o tratamientos puntuales adicionales. Te indicamos el resultado esperado antes de iniciar.',
      },
    ],
  },
  {
    id: 'colchones',
    titulo: 'Colchones',
    faqs: [
      {
        question: '¿Cada cuánto debo lavar mi colchón?',
        answer:
          'Para un adulto sin alergias, cada 6 a 12 meses. Con mascotas que duermen en cama, alergias respiratorias, niños pequeños o accidentes recientes, se recomienda lavado profesional inmediato o cronograma trimestral.',
      },
      {
        question: '¿Eliminan ácaros del colchón?',
        answer:
          'Aplicamos tratamiento antiácaros con productos sanitizantes profesionales. Logramos reducción significativa de la población de ácaros y alérgenos. No prometemos eliminación total porque biológicamente los ácaros pueden retornar con el uso.',
      },
      {
        question: '¿Salen manchas viejas?',
        answer:
          'En manchas superficiales recientes la probabilidad es alta; en manchas profundas, oxidaciones o líquidos que llegaron al núcleo del colchón, el resultado puede ser parcial. En la inspección te indicamos qué esperar honestamente.',
      },
      {
        question: '¿Cuánto tarda en secar un colchón?',
        answer:
          'Con secado controlado puedes usar la cama esa misma noche (cubriendo con sábana limpia tras unas horas). Si la habitación tiene baja ventilación, el secado completo puede tardar hasta 24 horas adicionales.',
      },
    ],
  },
  {
    id: 'vehiculos',
    titulo: 'Vehículos',
    faqs: [
      {
        question: '¿Atienden en parqueaderos residenciales y empresariales?',
        answer:
          'Sí. Coordinamos atención en parqueaderos residenciales, oficinas y centros comerciales en Bogotá y Medellín siempre que haya acceso a punto eléctrico y espacio razonable para nuestro equipo.',
      },
      {
        question: '¿Cuánto tarda la limpieza interior de un vehículo?',
        answer:
          'Entre 2 y 4 horas según el tamaño y nivel de suciedad. SUV o camionetas grandes pueden requerir más tiempo. Confirmamos un estimado antes de iniciar el servicio.',
      },
      {
        question: '¿Eliminan olores fuertes (mascotas, humo, humedad)?',
        answer:
          'Aplicamos protocolo específico para neutralización de olores. En casos extremos puede requerirse más de una sesión. Lo documentamos en la inspección y lo conversamos con el cliente.',
      },
    ],
  },
  {
    id: 'empresarial',
    titulo: 'Servicio empresarial',
    faqs: [
      {
        question: '¿Atienden empresas con varias sedes?',
        answer:
          'Sí. Coordinamos cronogramas multi-sede y hacemos visita técnica inicial para cuantificar puestos, m² de tapete y mobiliario, y definir un plan de mantenimiento.',
      },
      {
        question: '¿Pueden trabajar fuera de horario laboral?',
        answer:
          'Sí. Para minimizar afectación, atendemos en horario nocturno o de fin de semana en oficinas, restaurantes y clínicas, según el cronograma acordado.',
      },
      {
        question: '¿Qué tipos de contrato manejan?',
        answer:
          'Servicios puntuales (una vez), mantenimientos mensuales o trimestrales y planes anuales. Los términos se documentan en una propuesta firmada.',
      },
    ],
  },
  {
    id: 'garantia-pagos',
    titulo: 'Garantía, pagos y cobertura',
    faqs: [
      {
        question: '¿Qué cubre la garantía?',
        answer:
          'Tres meses de garantía escrita conforme a la Ley 1480/2011 (Estatuto del Consumidor). El detalle completo, plazos de reclamación y cobertura están en nuestra página de Garantía.',
      },
      {
        question: '¿Cuáles son las formas de pago?',
        answer:
          'Aceptamos efectivo contra entrega, transferencia bancaria, tarjetas débito y crédito, y opciones digitales. Los clientes empresariales reciben factura electrónica con plazo según acuerdo contractual.',
      },
      {
        question: '¿En qué ciudades operan?',
        answer:
          'Bogotá D.C. y Medellín (Antioquia). Confirmamos cobertura exacta de tu barrio o municipio al recibir tu dirección por WhatsApp, antes de cerrar la agenda.',
      },
      {
        question: '¿Hacen factura electrónica?',
        answer:
          'Sí. Trabajamos con facturación electrónica conforme a la normativa colombiana. Indícanos los datos al cotizar.',
      },
      {
        question: '¿Cómo solicito una reclamación si algo no quedó bien?',
        answer:
          'Tienes 5 días hábiles desde la entrega para notificarnos por WhatsApp o correo. Respondemos con un procedimiento documentado de inspección y solución según nuestra política de garantía.',
      },
    ],
  },
]

const ALL_FAQS: FAQItem[] = GROUPS.flatMap((g) => g.faqs)

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <BreadcrumbsJsonLd
        id="faq-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
          { name: 'Preguntas frecuentes', url: PAGE_URL },
        ]}
      />
      <FAQPageJsonLd id="faq-full-jsonld" pageUrl={PAGE_URL} items={ALL_FAQS} />

      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative pt-28 pb-12 bg-gradient-to-br from-[#0f4f0d] via-[#1f7a1d] to-[#3AAA35] text-white">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            tone="light"
            className="mb-5"
            items={[
              { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
              { name: 'Preguntas frecuentes', url: PAGE_URL },
            ]}
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Preguntas frecuentes sobre lavado profesional
            </h1>
            <p className="text-lg md:text-xl opacity-95">
              Las dudas más comunes que recibimos antes de agendar. Si no encuentras tu respuesta,
              escríbenos por WhatsApp y te ayudamos en minutos.
            </p>
          </div>
        </div>
      </section>

      {/* Navegación por grupos */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-16 z-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="Categorías de preguntas frecuentes">
            <ul className="flex flex-wrap gap-2 justify-center">
              {GROUPS.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="inline-block rounded-full bg-gray-100 hover:bg-[#3AAA35] hover:text-white text-gray-800 text-sm font-semibold px-4 py-2 transition"
                  >
                    {g.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Grupos de FAQs */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Buscador en vivo (isla cliente — el contenido sigue en el HTML para SEO/IA) */}
          <FaqSearch />

          <div className="space-y-12">
          {GROUPS.map((group) => (
            <article key={group.id} id={group.id} data-faq-group className="scroll-mt-32">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                {group.titulo}
              </h2>
              <div className="space-y-3">
                {group.faqs.map((faq) => (
                  <details key={faq.question} data-faq-item className="group bg-white rounded-xl shadow-sm p-5">
                    <summary className="font-semibold cursor-pointer flex justify-between items-center text-gray-900">
                      {faq.question}
                      <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                    </summary>
                    <p className="mt-3 text-gray-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>

      {/* CTA cierre */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            ¿Tu pregunta no aparece aquí?
          </h2>
          <p className="text-gray-700 mb-6">
            Escríbenos por WhatsApp con tu duda. Respondemos directamente, sin filtros ni bots.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/573128052720?text=${encodeURIComponent('Hola, tengo una duda sobre el servicio de Clean Company.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#3AAA35] text-white px-6 py-3 font-semibold hover:opacity-95 transition"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Escribirnos por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#3AAA35] text-[#1f7a1d] px-6 py-3 font-semibold hover:bg-gray-50 transition"
            >
              Ver sedes y horarios
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

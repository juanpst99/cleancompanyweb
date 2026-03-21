import React from 'react'
import WhatsAppLink from '@/components/WhatsAppLink'
import {
  Star,
  Heart,
  Gift,
  Users,
  Sofa,
  Moon,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import LandingEngagementTracker from '@/components/analytics/LandingEngagementTracker'

export const metadata = {
  title: 'Bienvenido de Vuelta | Clean Company Medellín',
  robots: {
    index: false,
    follow: false,
  },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function FaqChevron() {
  return (
    <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

const WA_MESSAGE = 'Hola Clean Company, soy cliente y quiero agendar un nuevo servicio en Medellín. Quiero usar mi 15% de descuento.'
const WA_REFERIDO = 'Hola Clean Company, un amigo me recomendó. Quiero cotizar un servicio en Medellín.'

// ─── Datos estáticos ──────────────────────────────────────────────────────────

const crossSellServices = [
  {
    icon: Sofa,
    title: 'Muebles y Sofás',
    description: '¿La vez pasada lavamos tus colchones o tapetes? Tu sofá también acumula ácaros, manchas y olores.',
    cta: 'Cotizar muebles',
    message: 'Hola Clean Company, soy cliente y quiero cotizar lavado de muebles en Medellín con mi 15% OFF.',
  },
  {
    icon: Moon,
    title: 'Colchones',
    description: 'Los expertos recomiendan lavar colchones cada 6-12 meses. Elimina ácaros y duerme más limpio.',
    cta: 'Cotizar colchones',
    message: 'Hola Clean Company, soy cliente y quiero cotizar higienización de colchones en Medellín con mi 15% OFF.',
  },
  {
    icon: Sparkles,
    title: 'Tapetes y Alfombras',
    description: 'Recupera los colores originales de tu tapete. Recogemos, lavamos en planta y entregamos como nuevo.',
    cta: 'Cotizar tapetes',
    message: 'Hola Clean Company, soy cliente y quiero cotizar lavado de tapetes en Medellín con mi 15% OFF.',
  },
]

const testimonials = [
  {
    quote: 'Ya es la tercera vez que los llamo. Cada vez queda igual de impecable. Son mi servicio fijo cada 6 meses.',
    name: 'Laura P.',
    city: 'Laureles',
    service: 'Muebles',
  },
  {
    quote: 'La primera vez lavaron los muebles. Quedaron tan bien que volví por los colchones. Ahora ya lavaron todo.',
    name: 'Felipe M.',
    city: 'El Poblado',
    service: 'Muebles + Colchones',
  },
  {
    quote: 'Recomendé a mi vecina y ambas recibimos descuento. Excelente servicio y atención.',
    name: 'Sandra V.',
    city: 'Envigado',
    service: 'Referido',
  },
]

const faqs = [
  {
    q: '¿El 15% aplica para cualquier servicio?',
    a: 'Sí. El descuento de cliente aplica para muebles, colchones y tapetes. Solo menciónalo al escribirnos por WhatsApp.',
  },
  {
    q: '¿Cada cuánto debo repetir la limpieza?',
    a: 'Recomendamos cada 6-12 meses para muebles y colchones, y cada 12 meses para tapetes. Depende del uso, mascotas y condiciones del hogar.',
  },
  {
    q: '¿Cómo funciona el programa de referidos?',
    a: 'Refiere a un amigo o familiar. Cuando agende su primer servicio, ambos reciben descuento. Solo dile que mencione tu nombre al escribirnos.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClienteMedellinLanding() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0">
      <LandingEngagementTracker />

      {/* ── Top Bar ────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center py-3 px-4 text-sm font-bold tracking-wide">
        <Heart className="w-4 h-4 inline-block mr-1.5 -mt-0.5 text-red-400" />
        Cliente Clean Company: <span className="text-yellow-400">15% OFF</span> en tu próximo servicio.
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
            <Heart className="w-3.5 h-3.5" />
            Exclusivo para clientes
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Tus muebles ya extrañan{' '}
            <span className="text-blue-600">una limpieza profesional.</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Ya sabes cómo trabajamos y cómo queda. Vuelve con <strong>15% de descuento</strong> en cualquier servicio.
            Muebles, colchones o tapetes — tú eliges.
          </p>

          {/* CTA Principal */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-4">
            <WhatsAppLink
              message={WA_MESSAGE}
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white text-lg font-extrabold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Agendar con 15% OFF
            </WhatsAppLink>
          </div>

          <p className="text-xs text-gray-400">
            Solo menciona que eres cliente al escribirnos. Sin códigos complicados.
          </p>
        </div>
      </section>

      {/* ── Cross-sell ─────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">¿Qué te falta por lavar?</h2>
            <p className="text-gray-500">La vez pasada fue un servicio. Esta vez, completa toda tu casa.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {crossSellServices.map((srv) => (
              <div key={srv.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <srv.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{srv.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{srv.description}</p>
                <WhatsAppLink
                  message={srv.message}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white font-bold py-3 px-4 rounded-xl shadow transition-all text-sm"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  {srv.cta}
                </WhatsAppLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programa de Referidos ───────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Users className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Refiere a un amigo y ambos ganan
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Recomienda Clean Company a un amigo o familiar.
            Cuando agende su primer servicio, ambos reciben descuento.
            Solo dile que mencione tu nombre al escribirnos.
          </p>
          <WhatsAppLink
            message={WA_REFERIDO}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-extrabold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5 shrink-0" fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Enviar link a un amigo
          </WhatsAppLink>
        </div>
      </section>

      {/* ── Social Proof — Clientes repetidores ────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-500 mb-6">Clientes que vuelven y refieren</p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">Medellin, {t.city} &middot; {t.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Preguntas de clientes frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
                <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                  <span>{faq.q}</span>
                  <span className="transition group-open:rotate-180">
                    <FaqChevron />
                  </span>
                </summary>
                <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA de cierre ──────────────────────────────────────────── */}
      <section className="py-14 bg-gray-900">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ya confías en nosotros. Vuelve con tu 15% OFF.
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Escríbenos, elige tu servicio y te agendamos esta semana.
          </p>

          <div className="flex flex-col items-center gap-4">
            <WhatsAppLink
              message={WA_MESSAGE}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white text-lg font-extrabold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Agendar con mi 15% OFF
            </WhatsAppLink>

            <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-xs">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 15% OFF por ser cliente</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Pagas al finalizar</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Refiere y ganan ambos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sticky Bottom CTA (mobile) ─────────────────────────────── */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden flex justify-center">
        <WhatsAppLink
          message={WA_MESSAGE}
          className="w-full max-w-sm bg-[#25D366] text-white font-extrabold py-3.5 rounded-xl shadow-md text-center block text-lg"
        >
          Agendar con 15% OFF
        </WhatsAppLink>
      </div>

    </main>
  )
}

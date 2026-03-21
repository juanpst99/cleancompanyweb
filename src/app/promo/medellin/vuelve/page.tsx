import React from 'react'
import BeforeAfter from '@/components/sections/BeforeAfter'
import VisualQuoter from '@/components/VisualQuoter'
import WhatsAppLink from '@/components/WhatsAppLink'
import {
  Star,
  ShieldCheck,
  Clock,
  MessageCircle,
  CheckCircle2,
  Gift,
} from 'lucide-react'
import LandingEngagementTracker from '@/components/analytics/LandingEngagementTracker'

export const metadata = {
  title: 'Agenda tu Servicio en Medellín | Clean Company',
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

const WA_MESSAGE = 'Hola Clean Company, quiero agendar un servicio en Medellín. Vi la oferta del 25% OFF.'

// ─── Datos estáticos ──────────────────────────────────────────────────────────

// TODO: Reemplazar por testimonios en video cuando haya assets reales disponibles.
// Por ahora se usan testimonios en texto como sustituto funcional.
const testimonials = [
  {
    quote: 'Al principio dudé, pero después de ver el resultado quedé impresionada. Mi sala quedó irreconocible.',
    name: 'Andrea L.',
    city: 'El Poblado',
    service: 'Muebles',
  },
  {
    quote: 'Llevaba meses pensándolo. Me arrepiento de no haberlo hecho antes. El colchón quedó como nuevo.',
    name: 'Camilo R.',
    city: 'Laureles',
    service: 'Colchones',
  },
  {
    quote: 'Cotizamos reemplazar la alfombra y costaba $800.000. Clean Company la dejó como nueva por una fracción.',
    name: 'Roberto C.',
    city: 'Envigado',
    service: 'Tapetes',
  },
]

const faqs = [
  {
    q: '¿Cuánto demora el servicio?',
    a: 'Muebles y colchones: 1-3 horas a domicilio. Tapetes: recogemos, lavamos en planta y entregamos en ~7 días. Secado de muebles entre 2-6 horas.',
  },
  {
    q: '¿Cómo funciona el pago?',
    a: 'Pagas al finalizar el servicio, una vez revises el resultado. Aceptamos efectivo, transferencia y Nequi. Sin anticipos.',
  },
  {
    q: '¿Qué pasa si no queda bien?',
    a: 'Garantía de satisfacción: si no estás conforme, repetimos la limpieza sin costo. Revisas el trabajo con nuestro técnico antes de que se retire.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VuelveMedellinLanding() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0">
      <LandingEngagementTracker />

      {/* ── Top Bar — Oferta exclusiva retargeting ─────────────────── */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center py-3 px-4 text-sm font-bold tracking-wide">
        <Gift className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
        Solo para ti: <span className="text-yellow-400">25% OFF</span> si agendas hoy. Escríbenos y pregunta por tu descuento.
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-1 text-yellow-400 mb-4">
            <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
            <span className="text-gray-900 font-bold text-sm ml-2">4.9/5 &mdash; Más de 3,200 servicios</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            ¿Todavía pensándolo?{' '}
            <span className="text-blue-600">Mira lo que hicimos esta semana.</span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Muebles, colchones y tapetes como nuevos a domicilio en Medellín.
            Hoy tienes <strong>25% de descuento</strong> exclusivo si agendas.
          </p>

          {/* Dual CTA: WhatsApp directo + Cotizador IA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto mb-4">
            <WhatsAppLink
              message={WA_MESSAGE}
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white text-lg font-extrabold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Agendar con 25% OFF
            </WhatsAppLink>
            <a
              href="#cotizador-ia"
              className="flex-1 flex items-center justify-center gap-2 bg-white text-blue-700 text-lg font-bold py-4 px-6 rounded-xl shadow border border-blue-200 hover:bg-blue-50 transition-all"
            >
              Calcular precio con IA
            </a>
          </div>

          <p className="text-xs text-gray-400">
            Te respondemos en menos de 5 minutos. Sin compromisos.
          </p>
        </div>
      </section>

      {/* ── Before / After — "Mira lo que hicimos" ─────────────────── */}
      <BeforeAfter />

      {/* ── Oferta exclusiva destacada ──────────────────────────────── */}
      <section className="py-10 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Gift className="w-10 h-10 mx-auto mb-3 text-yellow-400" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Solo para ti: <span className="text-yellow-400">25% OFF</span> si agendas hoy
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Ya nos conoces. Este descuento exclusivo es para que des el paso. Escríbenos, menciona la oferta y te aplicamos el descuento.
          </p>
          <WhatsAppLink
            message={WA_MESSAGE}
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white font-extrabold py-4 px-8 rounded-xl shadow-lg transition-all"
          >
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            Quiero mi 25% OFF
          </WhatsAppLink>
        </div>
      </section>

      {/* ── Cotizador IA — Prominente ──────────────────────────────── */}
      <section id="cotizador-ia" className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              ¿Quieres saber cuánto cuesta antes de escribirnos?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Sube una foto de tu mueble o tapete y nuestra IA te da un precio estimado al instante. Sin compromisos.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <VisualQuoter defaultCity="Medellín" />
          </div>
        </div>
      </section>

      {/* ── Social Proof ───────────────────────────────────────────── */}
      {/* TODO: Reemplazar por testimonios en video cuando haya assets reales */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-gray-500 mb-6">Lo que dicen quienes ya dieron el paso</p>
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

      {/* ── Razones para decidir hoy ───────────────────────────────── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Por qué agendar hoy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Respuesta en minutos</h3>
              <p className="text-sm text-gray-600">Escribes por WhatsApp y te cotizamos de inmediato. Nada de esperar.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Garantía de satisfacción</h3>
              <p className="text-sm text-gray-600">Si no quedas conforme, repetimos la limpieza gratis. Sin letra pequeña.</p>
            </div>
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Pagas al finalizar</h3>
              <p className="text-sm text-gray-600">Sin anticipos. Revisas el resultado y pagas solo si estás satisfecho.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Antes de agendar, resolvemos tus dudas</h2>
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
      <section className="py-16 bg-blue-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Cientos de hogares en Medellín ya lo hicieron.
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Escríbenos hoy con tu 25% OFF, te agendamos esta semana y pagas solo cuando veas el resultado.
          </p>

          <div className="flex flex-col items-center gap-4">
            <WhatsAppLink
              message={WA_MESSAGE}
              className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 text-lg font-extrabold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5 shrink-0" fill="#25D366" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Agendar con mi 25% OFF
            </WhatsAppLink>

            <div className="flex flex-wrap justify-center gap-4 text-blue-100 text-xs">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Garantía de satisfacción</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Pagas al finalizar</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Respuesta en minutos</span>
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
          Agendar con 25% OFF
        </WhatsAppLink>
      </div>

    </main>
  )
}

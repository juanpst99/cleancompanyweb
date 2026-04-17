import React from 'react'
import BeforeAfter from '@/components/sections/BeforeAfter'
import VisualQuoter from '@/components/VisualQuoter'
import WhatsAppLink from '@/components/WhatsAppLink'
import {
  MapPin,
  Droplets,
  Clock,
  ShieldCheck,
  Star,
  MessageCircle,
  CalendarCheck,
  Home,
} from 'lucide-react'
import LandingEngagementTracker from '@/components/analytics/LandingEngagementTracker'

export const metadata = {
  title: 'Lavado de Tapetes y Alfombras en Medellín | Clean Company',
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

const WA_MESSAGE = 'Hola Clean Company, quiero cotizar el lavado de tapetes/alfombras a domicilio en Medellín.'

// ─── Datos estáticos ──────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: 'Pensé que el tapete estaba para botar, pero lo rescataron totalmente. Quedó con los colores originales.',
    name: 'María José G.',
    city: 'Envigado',
  },
  {
    quote: 'Mi alfombra persa tenía una mancha de vino de años. La sacaron completa. Increíble servicio.',
    name: 'Daniela F.',
    city: 'El Poblado',
  },
  {
    quote: 'Cotizamos reemplazar la alfombra y costaba $800.000. Clean Company la dejó como nueva por una fracción.',
    name: 'Roberto C.',
    city: 'Laureles',
  },
]

const faqs = [
  {
    q: '¿Cuánto cuesta lavar un tapete?',
    a: 'Depende del tamaño. En Medellín, tapetes removibles desde $37.500/m² (mínimo 2 m²). Sube una foto al cotizador con IA para un estimado instantáneo o escríbenos por WhatsApp con las medidas.',
  },
  {
    q: '¿Pueden lavar alfombras fijas (de pared a pared)?',
    a: 'Sí. Las alfombras instaladas se lavan in situ con inyección-extracción. El precio es diferente: desde $15.000/m² con un mínimo de $350.000. Contáctanos por WhatsApp para cotización exacta.',
  },
  {
    q: '¿Se llevan mi tapete o lo lavan en casa?',
    a: 'Para tapetes removibles, los recogemos y los llevamos a nuestra planta para garantizar un secado completo y profundo. Para alfombras fijas, el lavado es a domicilio.',
  },
  {
    q: '¿Cuánto tarda en estar listo?',
    a: 'Tapetes removibles tardan aproximadamente 7 días (recogida, lavado, secado y entrega). Alfombras fijas quedan listas el mismo día con secado en 4-6 horas.',
  },
  {
    q: '¿Funciona con manchas viejas o muy incrustadas?',
    a: 'Sí. Nuestro proceso de inyección-extracción está diseñado para manchas difíciles: vino, café, grasa, tinta, mascotas. El resultado depende del tipo de fibra y antigüedad, pero en la mayoría de los casos logramos eliminarlas o reducirlas significativamente.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TapetesMedellinLanding() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0">
      <LandingEngagementTracker />

      {/* ── Top Bar Urgencia ────────────────────────────────────────── */}
      <div className="bg-gray-900 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        <span className="text-yellow-400 mr-2">🧶</span>
        Hoy: Desinfección GRATIS con tu lavado de tapetes en Medellín.
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section id="hero" className="relative bg-white pt-10 pb-16 lg:pt-20 lg:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">

            {/* Copy */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center space-x-2 bg-green-50 text-[#3AAA35] px-3 py-1 rounded-full text-sm font-bold mb-6">
                <MapPin className="w-4 h-4" />
                <span>Lavado de Tapetes a Domicilio en Medellín</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                ¿Ese tapete lo ibas a botar?{' '}
                <span className="text-[#3AAA35]">Nosotros lo rescatamos.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Lavado profesional de tapetes y alfombras con extracción industrial.
                Reemplazar cuesta 5x más. Nosotros lo dejamos como nuevo desde <strong>$85.000</strong> en Medellín.
              </p>

              {/* Beneficios */}
              <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0 mb-8">
                <li className="flex items-start">
                  <Droplets className="w-6 h-6 text-[#3AAA35] mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Extracción profunda de manchas, olores, polvo y alérgenos.</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-6 h-6 text-[#3AAA35] mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Recogemos, lavamos y entregamos. Sin complicaciones.</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="w-6 h-6 text-[#3AAA35] mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Seguro para fibras delicadas, persas, shaggy y sintéticos.</span>
                </li>
              </ul>

              {/* CTA Principal */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-6">
                <WhatsAppLink
                  message={WA_MESSAGE}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white text-lg font-extrabold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Cotizar Lavado de Tapete
                </WhatsAppLink>
              </div>

              {/* Social proof inline */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 inline-block text-left">
                <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-900 font-bold text-sm ml-2">4.9/5 en lavado de tapetes</span>
                </div>
                <p className="text-xs text-gray-600 italic">
                  &ldquo;Cotizamos reemplazar la alfombra y costaba $800.000. Clean Company la dejo como nueva por una fraccion.&rdquo;{' '}
                  <span className="font-semibold">&mdash; Roberto C., Medellin</span>
                </p>
              </div>
            </div>

            {/* Cotizador IA — posición protagonista para tapetes */}
            <div className="lg:col-span-6 relative z-10">
              <div className="text-center mb-3 lg:mb-4">
                <p className="text-sm font-semibold text-gray-500">
                  Sube una foto de tu tapete y conoce el precio al instante
                </p>
              </div>
              <VisualQuoter defaultCity="Medellín" defaultCategory="Tapete" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Social Proof ───────────────────────────────────────────── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
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
                <p className="text-xs text-gray-500">Medellin, {t.city} &middot; Tapetes</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como Funciona ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tu tapete como nuevo en 3 pasos</h2>
            <p className="text-gray-500">Recogemos, lavamos y entregamos. Tu solo nos abres la puerta.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-100 text-[#3AAA35] rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Envias foto o medidas</h3>
              <p className="text-gray-600 text-sm">Usa nuestro cotizador con IA o mandanos foto por WhatsApp. Te damos precio exacto al instante.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-100 text-[#3AAA35] rounded-full flex items-center justify-center mb-4">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Recogemos tu tapete</h3>
              <p className="text-gray-600 text-sm">Agendamos recogida a domicilio en Medellin. Lo llevamos a nuestra planta para lavado profesional.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-100 text-[#3AAA35] rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Entrega como nuevo</h3>
              <p className="text-gray-600 text-sm">En ~7 dias lo devolvemos limpio, desinfectado y con los colores recuperados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Before / After ─────────────────────────────────────────── */}
      <BeforeAfter />

      {/* ── Referencia de precios ──────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Referencia de precios en Medellín</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Tapete removible</p>
              <p className="text-2xl font-black text-[#3AAA35]">$37.500<span className="text-sm font-semibold text-gray-500">/m²</span></p>
              <p className="text-xs text-gray-500 mt-1">Minimo 2 m². Incluye recogida y entrega.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Alfombra fija (pared a pared)</p>
              <p className="text-2xl font-black text-[#3AAA35]">$15.000<span className="text-sm font-semibold text-gray-500">/m²</span></p>
              <p className="text-xs text-gray-500 mt-1">Lavado a domicilio. Minimo $350.000.</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            Precio exacto segun tamaño y tipo de fibra. Usa el cotizador con IA o escríbenos por WhatsApp.
          </p>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Preguntas sobre lavado de tapetes</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-green-100 transition-all duration-300">
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

      {/* ── Sticky Bottom CTA (mobile) ─────────────────────────────── */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden flex justify-center">
        <WhatsAppLink
          message={WA_MESSAGE}
          className="w-full max-w-sm bg-[#25D366] text-white font-extrabold py-3.5 rounded-xl shadow-md text-center block text-lg"
        >
          Cotizar Lavado de Tapete
        </WhatsAppLink>
      </div>

    </main>
  )
}

import React, { Suspense } from 'react'
import LandingSelector from '@/components/sections/LandingSelector'
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
  Sofa,
  Moon,
  Tag,
} from 'lucide-react'
import LandingEngagementTracker from '@/components/analytics/LandingEngagementTracker'

export const metadata = {
  title: 'Lavado Profesional a Domicilio en Medellín | Clean Company',
  robots: {
    index: false,
    follow: false,
  },
}

// ─── Chevron SVG reutilizado en FAQ (evita repetir inline) ────────────────────
function FaqChevron() {
  return (
    <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

// ─── Datos estáticos ──────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: 'Tenía una mancha de vino de meses y la sacaron completa. El sofá quedó mejor que cuando lo compré.',
    name: 'Andrea L.',
    city: 'El Poblado',
    service: 'Muebles',
  },
  {
    quote: 'Mis hijos dejaron de estornudar en la noche después de la limpieza del colchón. Muy profesionales.',
    name: 'Camilo R.',
    city: 'Laureles',
    service: 'Colchones',
  },
  {
    quote: 'Pensé que el tapete estaba para botar, pero lo rescataron totalmente. Puntuales y cuidadosos.',
    name: 'María José G.',
    city: 'Envigado',
    service: 'Tapetes',
  },
]

const faqs = [
  {
    q: '¿Cuánto cuesta aproximadamente?',
    a: 'Depende del tipo y tamaño del mueble. En Medellín, un sofá de 2 puestos desde $90.000 y una sala en L desde $160.000. Usa nuestro cotizador con IA para un estimado instantáneo o escríbenos por WhatsApp.',
  },
  {
    q: '¿Cuánto tiempo tarda en secar?',
    a: 'Con la extracción industrial retiramos gran parte de la humedad durante el proceso. En condiciones normales y con buena ventilación, el secado suele estar entre 2 y 6 horas dependiendo del tipo de tela.',
  },
  {
    q: '¿Sirve para olores fuertes de mascotas?',
    a: 'Sí. Usamos un tratamiento especializado junto con la extracción profunda. El resultado final depende del tiempo que lleve la mancha en la espuma, pero en la mayoría de los casos el olor se reduce significativamente.',
  },
  {
    q: '¿Atienden en todo Medellín?',
    a: 'Sí. Cubrimos Medellín y el Área Metropolitana: Envigado, Sabaneta, Itagüí, Bello, La Estrella y Copacabana. Operamos con rutas de despacho diarias desde nuestra planta en La América.',
  },
  {
    q: '¿Qué pasa si no quedo satisfecho?',
    a: 'Ofrecemos garantía de satisfacción. Si al finalizar no estás conforme con el resultado, repetimos la limpieza sin costo adicional. Revisas el trabajo junto con nuestro técnico antes de que se retire.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MedellinLanding() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0">
      <LandingEngagementTracker />

      {/* ── Top Bar Urgencia ────────────────────────────────────────── */}
      <div className="bg-gray-900 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        <span className="text-yellow-400 mr-2">⚡</span>
        Solo hoy: Desodorización gratis al agendar tu servicio en Medellín.
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section id="hero" className="relative bg-white pt-10 pb-16 lg:pt-20 lg:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

            {/* Copy */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center space-x-2 bg-green-50 text-[#3AAA35] px-3 py-1 rounded-full text-sm font-bold mb-6">
                <MapPin className="w-4 h-4" />
                <span>Servicio a Domicilio en Medellín</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                ¿Manchas que no salen?{' '}
                <span className="text-[#3AAA35]">Las eliminamos en 1 visita.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Extracción industrial profunda para muebles, colchones y tapetes a domicilio en Medellín.
                Sin químicos agresivos, con garantía de resultado.
              </p>

              {/* Beneficios */}
              <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0 mb-8">
                <li className="flex items-start">
                  <Droplets className="w-6 h-6 text-[#3AAA35] mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Equipos de inyección-extracción y productos biodegradables.</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-6 h-6 text-[#3AAA35] mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Secado optimizado y servicio con respaldo de garantía.</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="w-6 h-6 text-[#3AAA35] mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Técnicos uniformados y capacitados. Sin sorpresas.</span>
                </li>
              </ul>

              {/* CTA Principal: WhatsApp */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0 mb-6">
                <WhatsAppLink
                  message="Hola Clean Company, quiero cotizar un servicio de limpieza profesional a domicilio en Medellín."
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22bf5b] text-white text-lg font-extrabold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Cotizar por WhatsApp
                </WhatsAppLink>
              </div>

              {/* CTA Secundario: Cotizador IA */}
              <a href="#cotizador-ia" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3AAA35] hover:text-[#266d25] transition-colors">
                O calcula el precio con nuestra IA &darr;
              </a>

              {/* Social proof inline */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 inline-block text-left mt-6">
                <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-900 font-bold text-sm ml-2">4.9/5 (Mas de 3,200 servicios)</span>
                </div>
                <p className="text-xs text-gray-600 italic">
                  &ldquo;El sofa quedo como nuevo y el olor a humedad desaparecio por completo.&rdquo;{' '}
                  <span className="font-semibold">&mdash; Carlos M., Medellin</span>
                </p>
              </div>
            </div>

            {/* Selector interactivo */}
            <div className="lg:col-span-6 relative z-10">
              <Suspense>
                <LandingSelector defaultCity="Medellín" />
              </Suspense>
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
                <p className="text-xs text-gray-500">Medellin, {t.city} &middot; {t.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Como Funciona ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Asi de facil funciona</h2>
            <p className="text-gray-500">Desde tu celular hasta la sala de tu casa, sin complicaciones.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-100 text-[#3AAA35] rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Cotizas por WhatsApp</h3>
              <p className="text-gray-600 text-sm">Nos cuentas que necesitas lavar. Si envias foto, te cotizamos al instante. Sin compromisos.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-100 text-[#3AAA35] rounded-full flex items-center justify-center mb-4">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Agendamos tu ruta</h3>
              <p className="text-gray-600 text-sm">Elegimos el dia y bloque horario que te funcione segun nuestras rutas activas en Medellin.</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-green-100 text-[#3AAA35] rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Limpieza y Garantia</h3>
              <p className="text-gray-600 text-sm">Nuestros tecnicos uniformados llegan con maquinaria industrial. Revisas el resultado y te respaldamos con garantia de satisfaccion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Precios ────────────────────────────────────────────────── */}
      <section id="precios" className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Precios en Medellín</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Sin letras pequeñas. Conoce el precio real antes de escribirnos.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">

            {/* Muebles */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sofa className="w-5 h-5 text-[#3AAA35]" />
                <h3 className="font-extrabold text-gray-900">Muebles y Sofás</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Sofá 2 puestos', price: '$90.000' },
                  { label: 'Sofá 3 puestos', price: '$105.000' },
                  { label: 'Sala en L (hasta 5 puestos)', price: '$160.000' },
                  { label: 'Sala en L grande (5+)', price: '$200.000' },
                  { label: 'Poltrona / Sillón', price: '$45.000' },
                  { label: 'Silla comedor (mín. 4)', price: '$12.000 c/u' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{r.label}</span>
                    <span className="font-bold text-[#3AAA35] whitespace-nowrap ml-2">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Colchones */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-5 h-5 text-[#3AAA35]" />
                <h3 className="font-extrabold text-gray-900">Colchones</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Sencillo (1.00 m)', price: '$90.000' },
                  { label: 'Semidoble (1.20 m)', price: '$95.000' },
                  { label: 'Doble (1.40 m)', price: '$100.000' },
                  { label: 'Queen (1.60 m)', price: '$110.000' },
                  { label: 'King (2.00 m)', price: '$130.000' },
                  { label: 'Base + Espaldar', price: '$90.000' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{r.label}</span>
                    <span className="font-bold text-[#3AAA35] whitespace-nowrap ml-2">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tapetes */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-[#3AAA35]" />
                <h3 className="font-extrabold text-gray-900">Tapetes y Alfombras</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Pack 1.20×1.70 m', price: '$90.000' },
                  { label: 'Pack 1.60×2.30 m', price: '$138.000' },
                  { label: 'Pack 2.00×3.00 m', price: '$225.000' },
                  { label: 'Tapete suelto (tarifa)', price: '$37.500/m²' },
                  { label: 'Tapete persa / delicado', price: '$50.000/m²' },
                  { label: 'Alfombra fija instalada', price: '$15.000/m²' },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{r.label}</span>
                    <span className="font-bold text-[#3AAA35] whitespace-nowrap ml-2">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            Mínimo a domicilio $79.900 · Mínimo alfombra fija $350.000 · Precios sujetos a inspección (materiales delicados o suciedad extrema pueden tener recargo)
          </p>
        </div>
      </section>

      {/* ── Before / After ─────────────────────────────────────────── */}
      <BeforeAfter />

      {/* ── Cotizador IA ───────────────────────────────────────────── */}
      <section id="cotizador-ia" className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-[#3AAA35] text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              Opcional &mdash; sin compromisos
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Calcula tu precio en segundos con IA
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Sube una foto de tu mueble o tapete y nuestra inteligencia artificial te da un precio estimado al instante.
              Si prefieres, puedes cotizar directo por WhatsApp.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <VisualQuoter defaultCity="Medellín" />
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Preguntas frecuentes</h2>
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
          message="Hola Clean Company, quiero cotizar un servicio de limpieza profesional a domicilio en Medellín."
          className="w-full max-w-sm bg-[#25D366] text-white font-extrabold py-3.5 rounded-xl shadow-md text-center block text-lg"
        >
          Cotizar por WhatsApp
        </WhatsAppLink>
      </div>

    </main>
  )
}

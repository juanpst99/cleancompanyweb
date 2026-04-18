import React, { Suspense } from 'react'
import LandingSelector from '@/components/sections/LandingSelector'
import BeforeAfter from '@/components/sections/BeforeAfter' // <-- IMPORTAMOS TU SLIDER
import VisualQuoter from '@/components/VisualQuoter'
import { WhatsAppOverrideProvider } from '@/context/WhatsAppNumberContext'
import { ShieldCheck, Droplets, Clock, Star, MessageCircle, CalendarCheck, Home, Sofa, Moon, Tag } from 'lucide-react'
import LandingEngagementTracker from '@/components/analytics/LandingEngagementTracker'

// Optimizacion Next.js: robots como objeto
export const metadata = {
  title: 'Plan 360° Hogar Saludable | Clean Company',
  robots: {
    index: false,
    follow: false,
  },
}

export default function HogarSaludableLanding() {
  return (
    <WhatsAppOverrideProvider number="573209210866">
    <main className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0">
      <LandingEngagementTracker />

      {/* Top Bar Urgencia */}
      <div className="bg-gray-900 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        <span className="text-yellow-400 mr-2">⚡</span> 
        Promoción especial: Desodorización gratis al agendar tu Plan 360° hoy.
      </div>

      {/* Hero Section (Above the fold) */}
      <section id="cotizador" className="relative bg-white pt-10 pb-16 lg:pt-20 lg:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Copy Principal - Blindado para Meta Ads */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Extracción Industrial a Domicilio</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                ¿Manchas que no salen? <span className="text-blue-600">Las eliminamos en 1 visita.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Extracción industrial profunda para muebles, colchones y tapetes a domicilio en Medellín. Sin químicos agresivos, con garantía de resultado.
              </p>

              {/* Beneficios rápidos */}
              <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0 mb-8">
                <li className="flex items-start">
                  <Droplets className="w-6 h-6 text-blue-500 mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Equipos de inyección-extracción y productos biodegradables.</span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-500 mr-3 shrink-0" />
                  <span className="text-gray-700 font-medium">Secado optimizado y servicio con respaldo de garantía.</span>
                </li>
              </ul>
              
              {/* Prueba Social Real y Agresiva */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 inline-block text-left">
                <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-900 font-bold text-sm ml-2">4.9/5 (Más de 3,200 servicios)</span>
                </div>
                <p className="text-xs text-gray-600 italic">
                  "El sofá quedó como nuevo y el olor a humedad desapareció por completo. Muy puntuales." <br/>
                  <span className="font-semibold">— Carlos M.</span>
                </p>
              </div>
            </div>

            {/* El Selector Interactivo */}
            <div className="lg:col-span-6 relative z-10">
              <Suspense>
                <LandingSelector defaultCity="Medellín" />
              </Suspense>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof Ampliado */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Tenía una mancha de vino de meses y la sacaron completa. El sofá quedó mejor que cuando lo compré.', name: 'Andrea L.', city: 'Medellín, El Poblado', service: 'Muebles' },
              { quote: 'Mis hijos dejaron de estornudar en la noche después de la limpieza del colchón. Muy profesionales.', name: 'Camilo R.', city: 'Medellín, Laureles', service: 'Colchones' },
              { quote: 'Pensé que el tapete estaba para botar, pero lo rescataron totalmente. Súper puntuales y cuidadosos.', name: 'María José G.', city: 'Medellín, Envigado', service: 'Tapetes' },
            ].map((t) => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center space-x-1 text-yellow-400 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-3">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-bold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.city} &middot; {t.service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN: Cómo funciona (Protección contra clientes problema) */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Cómo funciona nuestro servicio?</h2>
            <p className="text-gray-500">Transparencia total, desde tu celular hasta la sala de tu casa.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Cotizas por WhatsApp</h3>
              <p className="text-gray-600 text-sm">Nos cuentas qué necesitas lavar (si envías foto, es más rápido). Te damos el precio exacto en minutos, sin compromisos.</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Agendamos tu ruta</h3>
              <p className="text-gray-600 text-sm">Seleccionamos el día y bloque horario que mejor te funcione según nuestras rutas activas de despacho.</p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Limpieza y Garantía</h3>
              <p className="text-gray-600 text-sm">Nuestros técnicos uniformados llegan con maquinaria industrial. Revisas el resultado al finalizar y te respaldamos con nuestra garantía de satisfacción.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Precios */}
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
                <Sofa className="w-5 h-5 text-blue-600" />
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
                    <span className="font-bold text-blue-600 whitespace-nowrap ml-2">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Colchones */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Moon className="w-5 h-5 text-blue-600" />
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
                    <span className="font-bold text-blue-600 whitespace-nowrap ml-2">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tapetes */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-blue-600" />
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
                    <span className="font-bold text-blue-600 whitespace-nowrap ml-2">{r.price}</span>
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

      {/* EL SLIDER INTERACTIVO (Reutilizamos tu componente ya creado) */}
      <BeforeAfter />

      {/* Cotizador Visual IA */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Calcula tu estimado en segundos
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Sube una foto de tus muebles o tapetes y nuestra IA te dará un precio aproximado al instante, sin compromisos.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <VisualQuoter />
          </div>
        </div>
      </section>

      {/* FAQ Semántico (Manejo de expectativas reales) */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Dudas frecuentes (FAQ)</h2>
          
          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>¿Cuánto tiempo tarda en secar?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                Con la extracción industrial retiramos gran parte de la humedad durante el proceso. En condiciones normales y con buena ventilación, el secado suele estar entre 2 y 6 horas dependiendo del tipo de tela.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>¿Sirve para olores fuertes de mascotas (orina)?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                Sí, podemos ayudar a reducir significativamente los olores de mascotas. Usamos un tratamiento especializado junto con la extracción profunda. El resultado final depende del tiempo que lleve la mancha en la espuma.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>¿Cuánto cuesta aproximadamente?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                El precio depende del tipo y tamaño del mueble. En Medellín, un sofá de 2 puestos desde $90.000 y una sala en L desde $160.000. Puedes obtener un estimado inmediato con nuestro cotizador con IA o escribirnos por WhatsApp para un precio exacto.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>¿Atienden en todo Medellín?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                Sí. Cubrimos Medellín y el Área Metropolitana: Envigado, Sabaneta, Itagüí, Bello, La Estrella y Copacabana. Operamos con rutas de despacho diarias desde nuestra planta en La América.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>¿Qué pasa si no quedo satisfecho con el resultado?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                Ofrecemos garantía de satisfacción. Si al finalizar el servicio no estás conforme con el resultado, repetimos la limpieza sin costo adicional. Revisas el trabajo junto con nuestro técnico antes de que se retire.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* Sticky Bottom CTA exclusivo para móviles */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden flex justify-center">
        <a
          href="#cotizador"
          className="w-full max-w-sm bg-[#25D366] text-white font-extrabold py-3.5 rounded-xl shadow-md text-center block text-lg"
        >
          Cotizar por WhatsApp
        </a>
      </div>

    </main>
    </WhatsAppOverrideProvider>
  )
}
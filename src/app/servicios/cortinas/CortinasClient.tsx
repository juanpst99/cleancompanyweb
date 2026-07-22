'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Check, Star, ArrowLeft, MessageCircle, Camera, Truck, Sparkles,
  Wind, ShieldCheck, Sun, Clock,
} from 'lucide-react'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import Footer from '@/components/sections/Footer'
import WhatsAppLink from '@/components/WhatsAppLink'
import TrustBar from '@/components/TrustBar'
import Breadcrumbs from '@/components/Breadcrumbs'
import CoberturaCiudad from '@/components/CoberturaCiudad'
import { FAQS_CORTINAS } from './faqs'

const PAGE_URL = 'https://www.cleancompany.com.co/servicios/cortinas'

/**
 * Ilustración del hero. Es CSS puro a propósito: todavía no hay fotografías
 * reales de cortinas y preferimos una pieza gráfica honesta antes que una foto
 * de otro servicio o una imagen generada haciéndose pasar por un trabajo real.
 * Cuando lleguen las fotos de la proveedora, este bloque se reemplaza por un
 * <Image /> sin tocar el resto de la página.
 */
function IlustracionCortinas() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[320px] w-full overflow-hidden rounded-3xl shadow-2xl sm:h-[400px]"
      style={{ background: 'linear-gradient(180deg,#BFDBFE 0%,#EFF6FF 68%,#F8FAFC 100%)' }}
    >
      {/* sol difuso entrando por la ventana */}
      <div
        className="absolute left-1/2 top-14 h-32 w-32 -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle at 40% 35%,#FEF3C7,#FDE68A 55%,rgba(253,230,138,0) 72%)' }}
      />
      {/* riel */}
      <div className="absolute left-[7%] right-[7%] top-6 h-[7px] rounded-full bg-gradient-to-b from-slate-400 to-slate-600">
        <span className="absolute -left-2 -top-1 h-[15px] w-[15px] rounded-full bg-slate-600" />
        <span className="absolute -right-2 -top-1 h-[15px] w-[15px] rounded-full bg-slate-600" />
      </div>
      {/* velo central */}
      <div
        className="absolute bottom-[26px] left-[28%] right-[28%] top-[30px]"
        style={{
          background:
            'linear-gradient(180deg,rgba(255,255,255,.7),rgba(255,255,255,.28)),repeating-linear-gradient(90deg,rgba(255,255,255,.92) 0 9px,rgba(226,232,240,.5) 9px 18px)',
        }}
      />
      {/* cortinas laterales */}
      {(['left', 'right'] as const).map((lado) => (
        <div
          key={lado}
          className={`absolute bottom-[26px] top-[30px] w-[32%] rounded-b-2xl ${lado === 'left' ? 'left-[7%]' : 'right-[7%]'}`}
          style={{
            background:
              'repeating-linear-gradient(90deg,#F8FAFC 0 15px,#E2E8F0 15px 28px,#F1F5F9 28px 42px)',
            transform: `skewX(${lado === 'left' ? '-1.5deg' : '1.5deg'})`,
            filter: 'drop-shadow(0 8px 18px rgba(51,65,85,.22))',
          }}
        />
      ))}
      {/* alféizar */}
      <div className="absolute bottom-0 left-0 right-0 h-[26px] bg-gradient-to-b from-slate-200 to-slate-300" />
    </div>
  )
}

const PASOS = [
  {
    icon: Camera,
    titulo: 'Envíanos una foto',
    texto: 'Por WhatsApp, con el alto aproximado de la cortina. Te cotizamos en minutos, sin compromiso.',
  },
  {
    icon: Truck,
    titulo: 'Nosotros las descolgamos',
    texto: 'Vamos a tu casa, las descolgamos y nos las llevamos. Tú no tienes que desmontar nada.',
  },
  {
    icon: Sparkles,
    titulo: 'Te las devolvemos colgadas',
    texto: 'En 5 días: lavadas según su tela, desinfectadas y de vuelta en su riel, listas para usar.',
  },
]

const RAZONES = [
  {
    icon: Wind,
    titulo: 'Polvo y ácaros de años',
    texto: 'La cortina es el textil que más tiempo pasa sin lavarse en una casa. Filtra todo el aire que entra por la ventana.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Olores y alergias',
    texto: 'Retienen humo, grasa de cocina y humedad. Lavarlas se nota en el aire de toda la habitación.',
  },
  {
    icon: Sun,
    titulo: 'El sol castiga la tela',
    texto: 'El lavado correcto según la fibra conserva el color y alarga la vida de la cortina.',
  },
]

const TIPOS = [
  'Blackout y opacas',
  'Velos y telas sheer',
  'Lino y algodón',
  'Cortinas romanas',
  'Estores de tela',
  'Persianas',
  'Telas decorativas',
  'Cenefas',
]

export default function CortinasClient() {
  const searchParams = useSearchParams()
  const ciudadParam = searchParams.get('ciudad')
  const ciudad = ciudadParam || 'Bogotá y Medellín'

  const msgCotizar = `Hola, quiero cotizar el lavado de mis cortinas 🪟 (${ciudad}).`

  return (
    <>
      <Header />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 pt-20">
        <div className="absolute inset-0 bg-black opacity-20" />

        <div className="container relative z-10 mx-auto px-4 py-12">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-white transition hover:opacity-80 lg:hidden"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Volver
          </Link>

          <Breadcrumbs
            tone="light"
            className="mb-5 hidden lg:flex"
            items={[
              { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
              { name: 'Lavado de cortinas', url: PAGE_URL },
            ]}
          />

          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Columna izquierda — mensaje */}
            <div className="text-white">
              <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <Star className="mr-2 h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">Lavado profesional desde 2015</span>
              </div>

              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Lavado de Cortinas en {ciudad}
              </h1>

              <p className="mb-4 text-lg font-medium opacity-95">
                Como nuevas, sin que tengas que descolgar una sola.
              </p>

              <CoberturaCiudad ciudad={ciudadParam} />

              <div className="mb-8 space-y-3">
                <div className="flex items-center">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-400" />
                  <span>Las descolgamos y las volvemos a colgar — incluido</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-400" />
                  <span>Blackout, velos, lino, romanas y también persianas</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-400" />
                  <span>Entrega en 5 días, desinfectadas y planchadas</span>
                </div>
                <div className="flex items-center">
                  <Check className="mr-3 h-5 w-5 flex-shrink-0 text-green-400" />
                  <span>Acta de inspección y garantía escrita de 3 meses</span>
                </div>
              </div>

              <WhatsAppLink
                message={msgCotizar}
                className="inline-flex transform items-center gap-2 rounded-full bg-green-500 px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-green-600"
              >
                <MessageCircle className="h-5 w-5" />
                Cotizar gratis por WhatsApp
              </WhatsAppLink>
              <p className="mt-3 text-sm opacity-80">
                Envías una foto y el alto aproximado. Precio en minutos, sin compromiso.
              </p>

              <TrustBar variant="light" hideCities className="mt-6" />
            </div>

            {/* Columna derecha — ilustración */}
            <div className="hidden lg:block">
              <IlustracionCortinas />
            </div>
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
            Tus cortinas listas en 3 pasos
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
            Sin escaleras, sin desmontar rieles y sin adivinar precios. Nosotros nos encargamos
            de todo el proceso.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {PASOS.map((paso, i) => (
              <div
                key={paso.titulo}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {i + 1}
                </div>
                <paso.icon className="mx-auto mb-3 h-6 w-6 text-blue-600" aria-hidden="true" />
                <h3 className="mb-2 text-lg font-bold text-gray-900">{paso.titulo}</h3>
                <p className="text-sm text-gray-600">{paso.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ LAVARLAS ─────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50 py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-3 text-center text-3xl font-bold text-gray-900">
            Lo que tus cortinas guardan sin que lo veas
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
            Es el textil que más se aplaza en la casa — justamente porque descolgarlo es un
            fastidio. Esa parte la hacemos nosotros.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {RAZONES.map((r) => (
              <div key={r.titulo} className="rounded-2xl border border-gray-100 bg-white p-6">
                <r.icon className="mb-3 h-7 w-7 text-blue-600" aria-hidden="true" />
                <h3 className="mb-2 text-lg font-bold text-gray-900">{r.titulo}</h3>
                <p className="text-sm text-gray-600">{r.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIPOS DE CORTINA ─────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-16">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900">Lavamos todos los tipos</h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Cada tela lleva un proceso distinto — por eso cotizamos con una foto en lugar de
            dar un precio genérico.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TIPOS.map((t) => (
              <span
                key={t}
                className="rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm font-semibold text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 text-left">
            <Clock className="h-6 w-6 flex-shrink-0 text-blue-600" aria-hidden="true" />
            <p className="text-sm text-gray-700">
              <strong className="text-gray-900">Entrega en 5 días.</strong> Recogemos, lavamos
              según la fibra con secado controlado y volvemos a colgarlas.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-gray-50 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Preguntas frecuentes sobre el lavado de cortinas
          </h2>
          <div className="space-y-3">
            {FAQS_CORTINAS.map((faq) => (
              <details key={faq.question} className="group rounded-xl bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-semibold text-gray-900">
                  {faq.question}
                </summary>
                <p className="mt-3 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            ¿Buscas otro servicio?{' '}
            <Link href="/servicios/muebles" className="text-blue-600 hover:underline">
              Muebles
            </Link>
            {', '}
            <Link href="/servicios/colchones" className="text-blue-600 hover:underline">
              colchones
            </Link>
            {' o '}
            <Link href="/servicios/alfombras" className="text-blue-600 hover:underline">
              tapetes y alfombras
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── CIERRE ───────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Una foto. Un precio. Cortinas nuevas.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            Cotización gratis por WhatsApp — hoy mismo. Pagas después del servicio, con garantía
            escrita.
          </p>
          <WhatsAppLink
            message={msgCotizar}
            className="inline-flex transform items-center rounded-full bg-green-500 px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-green-600"
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            Cotizar mis cortinas
          </WhatsAppLink>
        </div>
      </section>

      <Footer />
    </>
  )
}

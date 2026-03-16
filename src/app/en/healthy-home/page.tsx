import React from 'react'
import type { Metadata } from 'next'
import LandingSelectorEn from '@/components/en/LandingSelectorEn'
import BeforeAfterEn from '@/components/en/BeforeAfterEn'
import VisualQuoterEn from '@/components/en/VisualQuoterEn'
import { WhatsAppOverrideProvider } from '@/context/WhatsAppNumberContext'
import {
  ShieldCheck,
  Droplets,
  Clock,
  Star,
  MessageCircle,
  CalendarCheck,
  Home,
  Globe,
  BadgeCheck,
  Timer,
} from 'lucide-react'

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Professional Deep Cleaning in Medellín | Trusted by Expats | Clean Company',
  description:
    'Expert sofa, mattress & rug deep cleaning for expats and digital nomads in Medellín. English-friendly team, same-day quotes, on-time guarantee. Book instantly via WhatsApp.',
  keywords: [
    'apartment cleaning Medellín',
    'expat cleaning service Colombia',
    'sofa cleaning Medellín',
    'deep cleaning Airbnb Medellín',
    'house cleaning El Poblado',
    'cleaning service digital nomads Medellín',
    'mattress sanitization Medellín',
    'rug cleaning Laureles',
    'upholstery cleaning Colombia',
    'furnished apartment cleaning Medellín',
    'inglés limpieza Medellín',
    'cleaning service Envigado',
  ],
  openGraph: {
    title: 'Deep Cleaning & Sanitization in Medellín — Clean Company',
    description:
      'Professional sofa, mattress and rug cleaning for expats in Medellín. No Spanish needed. Instant quotes. Satisfaction guaranteed.',
    url: 'https://cleancompany.com.co/en/healthy-home',
    siteName: 'Clean Company',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Cleaning & Sanitization in Medellín | Clean Company',
    description:
      'Trusted by expats and digital nomads in Medellín. English-friendly team. Book on WhatsApp.',
  },
  alternates: {
    canonical: 'https://cleancompany.com.co/en/healthy-home',
    languages: {
      'es-CO': 'https://cleancompany.com.co/promo/hogar-saludable',
    },
  },
  robots: { index: true, follow: true },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HealthyHomeLanding() {
  return (
    <WhatsAppOverrideProvider number="573209210866">
    <main className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0">

      {/* Urgency Bar */}
      <div className="bg-gray-900 text-white text-center py-2 px-4 text-xs font-medium tracking-wide">
        <span className="text-yellow-400 mr-2">⚡</span>
        Limited offer: Free deodorization included when you book your Deep Cleaning Package today.
      </div>

      {/* ── Hero Section ──────────────────────────────────────────────────────── */}
      <section id="quoter" className="relative bg-white pt-10 pb-16 lg:pt-20 lg:pb-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

            {/* Hero copy */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Industrial Deep Cleaning · At Your Door</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
                Your apartment, hotel-clean — in{' '}
                <span className="text-blue-600">one visit</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                We deep-clean sofas, mattresses and rugs using industrial extraction equipment.
                No language barrier. No hidden fees. Just spotless results — backed by our
                satisfaction guarantee.
              </p>

              {/* Key benefits */}
              <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0 mb-8">
                <li className="flex items-start">
                  <Globe className="w-6 h-6 text-blue-500 mr-3 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">
                    <strong>English-friendly team</strong> — quote, book and communicate entirely in English.
                  </span>
                </li>
                <li className="flex items-start">
                  <Droplets className="w-6 h-6 text-blue-500 mr-3 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">
                    Injection-extraction machines and biodegradable products — safe for kids and pets.
                  </span>
                </li>
                <li className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-500 mr-3 shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium">
                    On-time arrival, optimized drying, and a written satisfaction guarantee.
                  </span>
                </li>
              </ul>

              {/* Social proof */}
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 inline-block text-left">
                <div className="flex items-center space-x-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-900 font-bold text-sm ml-2">4.9/5 · 3,200+ services completed</span>
                </div>
                <p className="text-xs text-gray-600 italic">
                  "The sofa looks brand new and the musty smell is completely gone. Team was on time and super professional."<br />
                  <span className="font-semibold">— James R., expat in El Poblado</span>
                </p>
              </div>
            </div>

            {/* Interactive quote selector */}
            <div className="lg:col-span-6 relative z-10">
              <LandingSelectorEn />
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Expats Trust Us ────────────────────────────────────────────────── */}
      <section className="py-16 bg-blue-600 border-b border-blue-700">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Built for expats. Trusted by 3,200+ customers.</h2>
            <p className="text-blue-200 max-w-xl mx-auto">
              We know living abroad means higher standards and less tolerance for surprises.
              Here's our commitment to you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white text-center">
              <div className="w-14 h-14 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Zero Language Barrier</h3>
              <p className="text-blue-100 text-sm">
                Quote, schedule and confirm entirely in English via WhatsApp — no Google Translate needed.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white text-center">
              <div className="w-14 h-14 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                <BadgeCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">International Standards</h3>
              <p className="text-blue-100 text-sm">
                Industrial injection-extraction equipment, certified biodegradable products, and uniformed technicians.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white text-center">
              <div className="w-14 h-14 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Timer className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">On-Time Guarantee</h3>
              <p className="text-blue-100 text-sm">
                We show up in the agreed time window. If we're late, we'll let you know in advance — always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How it works — start to finish</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We know you value predictability. Here's exactly what happens from your first message to the moment we leave.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Step 1</div>
              <h3 className="text-lg font-bold mb-2">Get a quote</h3>
              <p className="text-gray-600 text-sm">
                Send us a photo and a short description on WhatsApp. We'll reply with a fixed price in minutes — in English.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <CalendarCheck className="w-8 h-8" />
              </div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Step 2</div>
              <h3 className="text-lg font-bold mb-2">Schedule a slot</h3>
              <p className="text-gray-600 text-sm">
                Pick a day and time window that works for you. We confirm the appointment and send a reminder the day before.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8" />
              </div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Step 3</div>
              <h3 className="text-lg font-bold mb-2">We clean</h3>
              <p className="text-gray-600 text-sm">
                Our uniformed technicians arrive with industrial equipment. A typical session takes 1–3 hours depending on items.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">Step 4</div>
              <h3 className="text-lg font-bold mb-2">You review & pay</h3>
              <p className="text-gray-600 text-sm">
                Inspect the results before we leave. Payment is made after the job is done. Satisfaction guarantee included.
              </p>
            </div>
          </div>

          {/* Drying time note */}
          <div className="mt-8 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 max-w-2xl mx-auto">
            <Droplets className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              <strong>Drying time:</strong> Our extraction process removes most moisture during the service.
              Under normal ventilation, sofas and mattresses are dry within <strong>2–6 hours</strong> depending on fabric type.
            </p>
          </div>
        </div>
      </section>

      {/* ── Before / After Slider ─────────────────────────────────────────────── */}
      <BeforeAfterEn />

      {/* ── AI Visual Quoter ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Get an instant price estimate
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Upload a photo of your sofa or rug and our AI will give you an approximate price on the spot — no commitment required.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <VisualQuoterEn />
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>Can I communicate entirely in English?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                Yes, 100%. Our WhatsApp customer service line handles quotes, scheduling and follow-up entirely in English. You will never need to write or speak Spanish at any point.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>How long does the service take and when can I use my sofa again?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                A typical session takes 1–3 hours on-site depending on the number of items. Our extraction process removes most of the moisture during cleaning, so drying usually takes 2–6 hours. We recommend good ventilation after the service.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>Do you service Airbnbs, furnished apartments and short-term rentals?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                Absolutely. We regularly work with Airbnb hosts, property managers and expats in furnished apartments across El Poblado, Laureles, Envigado, and the rest of Medellín and Bogotá. We can coordinate access directly with you or your host.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>Is the price I see the final price?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                The AI-generated estimate is a close approximation. Our technician will confirm the exact price on-site before starting any work — no surprises. Payment is only made after the job is completed and you're satisfied.
              </div>
            </details>

            <details className="group border border-gray-200 rounded-xl bg-gray-50 open:bg-white open:ring-1 open:ring-blue-100 transition-all duration-300">
              <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-gray-800">
                <span>Are your products safe for pets and children?</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </summary>
              <div className="text-gray-600 px-5 pb-5 leading-relaxed">
                Yes. We exclusively use biodegradable, pH-neutral cleaning solutions that are safe for households with children and pets. Once dry (2–6 hours), your furniture and rugs are completely safe to use.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ── Sticky Bottom CTA (mobile only) ──────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50 lg:hidden flex justify-center">
        <a
          href="#quoter"
          className="w-full max-w-sm bg-[#25D366] text-white font-extrabold py-3.5 rounded-xl shadow-md text-center block text-lg"
        >
          Get a Free Quote on WhatsApp
        </a>
      </div>

    </main>
    </WhatsAppOverrideProvider>
  )
}

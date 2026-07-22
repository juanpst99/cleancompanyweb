// src/app/servicios/cortinas/page.tsx
// Este es un Componente de Servidor. NO LLEVA 'use client';
//
// Landing de lavado de cortinas. 100% cotización: el precio depende del tipo de
// cortina y su tamaño, así que la página NUNCA publica tarifas (decisión del
// dueño, jul-2026) — todo el recorrido lleva a cotizar con una foto por WhatsApp.
//
// Hereda el sistema de "ciudad variable" (?ciudad=Rionegro) igual que los demás
// servicios: title, description, keywords y el H1 se personalizan solos.

import { Metadata } from 'next';
import CortinasClient from './CortinasClient';
import { Suspense } from 'react';
import ServiceJsonLd from '@/components/SEO/ServiceJsonLd';
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd';
import FAQPageJsonLd from '@/components/SEO/FAQPageJsonLd';
import { FAQS_CORTINAS } from './faqs';

const PAGE_URL = 'https://www.cleancompany.com.co/servicios/cortinas';

export async function generateMetadata(
  { searchParams }: { params: any; searchParams: any }
): Promise<Metadata> {
  // En Next.js 15 searchParams es una Promise: hay que await antes de leerlo.
  const resolvedSearchParams = await searchParams;

  // ciudad desde query (?ciudad=), con fallback
  const ciudadParam = resolvedSearchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';

  const nombreEmpresa = 'Clean Company';

  const title = `Lavado de Cortinas a Domicilio en ${ciudad} | ${nombreEmpresa}`;
  const description =
    `Lavado profesional de cortinas en ${ciudad}. Nosotros las descolgamos, las lavamos ` +
    `según su tela y las volvemos a colgar. Entrega en 5 días. Cotiza gratis con una foto.`;

  return {
    title,
    description,
    keywords: [
      `lavado de cortinas ${ciudad.toLowerCase()}`,
      `limpieza de cortinas ${ciudad.toLowerCase()}`,
      `lavado de cortinas a domicilio ${ciudad.toLowerCase()}`,
      `lavanderia de cortinas ${ciudad.toLowerCase()}`,
      `lavado de cortinas blackout ${ciudad.toLowerCase()}`,
      `lavado de cortinas de tela ${ciudad.toLowerCase()}`,
      `limpieza de cortinas y velos ${ciudad.toLowerCase()}`,
      `lavado de cortinas romanas ${ciudad.toLowerCase()}`,
      `lavado cortinas precio ${ciudad.toLowerCase()}`,
      `descolgar y lavar cortinas ${ciudad.toLowerCase()}`,
      `desinfección de cortinas ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
    ],
    alternates: {
      canonical: PAGE_URL,
    },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function CortinasPage() {
  return (
    <>
      <ServiceJsonLd
        slug="cortinas"
        name="Lavado profesional de cortinas a domicilio"
        serviceType="Lavado de cortinas"
        alternateName={['Limpieza de cortinas', 'Lavandería de cortinas', 'Lavado de velos y blackout']}
        description="Lavado profesional de cortinas a domicilio en Bogotá, Medellín y el Oriente antioqueño. Descolgamos, lavamos según el tipo de tela, desinfectamos y volvemos a colgar. Entrega en 5 días con garantía escrita."
        url={PAGE_URL}
        variants={[
          { name: 'Blackout', description: 'Lavado de cortinas blackout y opacas' },
          { name: 'Velos y sheer', description: 'Lavado delicado de velos y telas translúcidas' },
          { name: 'Lino y algodón', description: 'Lavado de cortinas en fibras naturales' },
          { name: 'Cortinas romanas', description: 'Lavado de cortinas romanas y estores de tela' },
        ]}
      />
      <FAQPageJsonLd id="cortinas-faq-jsonld" pageUrl={PAGE_URL} items={FAQS_CORTINAS} />
      <BreadcrumbsJsonLd
        id="cortinas-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
          { name: 'Servicios', url: 'https://www.cleancompany.com.co/#servicios' },
          { name: 'Lavado de cortinas', url: PAGE_URL },
        ]}
      />
      <Suspense>
        <CortinasClient />
      </Suspense>
    </>
  );
}

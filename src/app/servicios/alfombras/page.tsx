// src/app/servicios/alfombras/page.tsx
// Este es un Componente de Servidor. NO LLEVA 'use client';

import { Metadata } from 'next';
import AlfombrasClient from './AlfombrasClient';
import { Suspense } from 'react';
import ServiceJsonLd from '@/components/SEO/ServiceJsonLd';
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd';

// Tipado moderno para Next.js 15+ (params y searchParams son Promesas)
type Props = {
  params: Promise<{ [key: string]: string | string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  // 1. ESPERAMOS los parámetros (Esta es la solución mágica al error de la página duplicada)
  const resolvedSearchParams = await searchParams;

  // ciudad desde query (?ciudad=), con fallback
  const ciudadParam = resolvedSearchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';

  // descuento desde query (?desc=), con fallback
  const descParam = resolvedSearchParams.desc;
  const descuento = Array.isArray(descParam) ? descParam[0] : descParam || '15';

  const nombreServicio = 'Alfombras';
  const nombreEmpresa = 'Clean Company';

  const title = `Lavado de Alfombras y Tapetes en ${ciudad} | ${descuento}% Descuento`;
  const description =
    `Lavado profesional de alfombras y tapetes a domicilio en ${ciudad}. ` +
    `Eliminamos manchas difíciles y malos olores. ¡${descuento}% OFF en tu primera limpieza!`;

  return {
    title,
    description,
    keywords: [
      `lavado de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `limpieza de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `desinfección de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `${nombreServicio.toLowerCase()} en ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
      `lavado de ${nombreServicio.toLowerCase()}`,
      `limpieza de ${nombreServicio.toLowerCase()}`,
      `lavado de tapetes ${ciudad.toLowerCase()}`,
      `limpieza de alfombras persas ${ciudad.toLowerCase()}`,
      `lavado alfombras a domicilio precio ${ciudad.toLowerCase()}`,
      `servicio limpieza tapetes ${ciudad.toLowerCase()}`,
      `lavado alfombras orientales ${ciudad.toLowerCase()}`,
      `desinfección de alfombras ${ciudad.toLowerCase()}`,
      `quitar manchas alfombras ${ciudad.toLowerCase()}`,
      `lavado ecológico alfombras ${ciudad.toLowerCase()}`,
      `limpieza profunda tapetes ${ciudad.toLowerCase()}`,
    ],
    alternates: {
      canonical: 'https://www.cleancompany.com.co/servicios/alfombras',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.cleancompany.com.co/servicios/alfombras',
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

// Render del cliente
export default function AlfombrasPage() {
  return (
    <>
      <ServiceJsonLd
        slug="alfombras"
        name="Lavado profesional de alfombras y tapetes"
        serviceType="Lavado de alfombras"
        alternateName={['Limpieza de alfombras', 'Lavado de tapetes']}
        description="Lavado profesional por inyección-extracción de alfombras y tapetes, con tratamiento de manchas, desinfección y secado controlado. Servicio a domicilio y en planta para Bogotá y Medellín."
        url="https://www.cleancompany.com.co/servicios/alfombras"
        variants={[
          { name: 'Alfombras persas y orientales', description: 'Cuidado especial para fibras naturales y tintes vegetales' },
          { name: 'Tapetes sintéticos modernos', description: 'Inyección-extracción a alta potencia' },
          { name: 'Alfombras de área grandes', description: 'Lavado en planta con secado controlado' },
        ]}
      />
      <BreadcrumbsJsonLd
        id="alfombras-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
          { name: 'Servicios', url: 'https://www.cleancompany.com.co/#servicios' },
          { name: 'Lavado de alfombras y tapetes', url: 'https://www.cleancompany.com.co/servicios/alfombras' },
        ]}
      />
      <Suspense fallback={<div className="min-h-screen bg-gray-50"></div>}>
        <AlfombrasClient />
      </Suspense>
    </>
  );
}
// src/app/servicios/muebles/page.tsx
// Este es un Componente de Servidor. NO LLEVA 'use client';

import { Metadata } from 'next';
import MueblesClient from './MueblesClient';
import { Suspense } from 'react';
import ServiceJsonLd from '@/components/SEO/ServiceJsonLd';
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd';

// (Opcional) Tipado si luego lo necesitas
interface MueblesPageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: { params: any; searchParams: any }
): Promise<Metadata> {
  // ciudad desde query (?ciudad=), con fallback
  const ciudadParam = searchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';

  // descuento desde query (?desc=), con fallback
  const descParam = searchParams.desc;
  const descuento = Array.isArray(descParam) ? descParam[0] : descParam || '20';

  const nombreServicio = 'Muebles';
  const nombreEmpresa = 'Clean Company';

  const title = `Lavado de Muebles y Sofás en ${ciudad} | Hasta ${descuento}% OFF`;
  const description =
    `Limpieza profesional de muebles, sofás y sillas a domicilio en ${ciudad}. ` +
    `Renovamos tu tapicería sin dañar las telas. ¡Obtén ${descuento}% de descuento!`;

  return {
    title,
    description,
    keywords: [
      `lavado de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `limpieza de sofás ${ciudad.toLowerCase()}`,
      `limpieza de sillas ${ciudad.toLowerCase()}`,
      `desinfección de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `${nombreServicio.toLowerCase()} en ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
      `lavado de sofás a domicilio ${ciudad.toLowerCase()}`,
      `limpieza de muebles de tela ${ciudad.toLowerCase()}`,
      `lavado de muebles de cuero ${ciudad.toLowerCase()}`,
      `limpieza tapicería ${ciudad.toLowerCase()}`,
      `lavado sillones ${ciudad.toLowerCase()}`,
      `desinfección sofás ${ciudad.toLowerCase()}`,
      `lavado muebles precio ${ciudad.toLowerCase()}`,
      `limpieza profesional sofás ${ciudad.toLowerCase()}`,
      `quitar manchas muebles ${ciudad.toLowerCase()}`,
      `renovar tapicería ${ciudad.toLowerCase()}`,
    ],
    alternates: {
      canonical: 'https://cleancompany.com.co/servicios/muebles',
    },
    openGraph: {
      title,
      description,
      url: 'https://cleancompany.com.co/servicios/muebles',
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
export default function MueblesPage() {
  return (
    <>
      <ServiceJsonLd
        slug="muebles"
        name="Lavado profesional de muebles, sofás y tapicería"
        serviceType="Lavado de muebles"
        alternateName={['Limpieza de sofás', 'Lavado de tapicería', 'Limpieza de muebles']}
        description="Lavado profesional de muebles, sofás, sillas y tapicería a domicilio en Bogotá y Medellín. Inyección-extracción, productos pH neutro, secado controlado y garantía de satisfacción."
        url="https://cleancompany.com.co/servicios/muebles"
        variants={[
          { name: 'Sofás de tela', description: 'Limpieza profunda con inyección-extracción' },
          { name: 'Sofás de cuero', description: 'Limpieza con productos específicos para cuero' },
          { name: 'Sillas y sillones', description: 'Lavado individual de sillas, sillones y poltronas' },
        ]}
      />
      <BreadcrumbsJsonLd
        id="muebles-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://cleancompany.com.co/' },
          { name: 'Servicios', url: 'https://cleancompany.com.co/#servicios' },
          { name: 'Lavado de muebles y sofás', url: 'https://cleancompany.com.co/servicios/muebles' },
        ]}
      />
      <Suspense>
        <MueblesClient />
      </Suspense>
    </>
  );
}

// src/app/servicios/colchones/page.tsx
// Componente de Servidor. NO lleva 'use client';

import { Metadata } from 'next';
import ColchonesClient from './ColchonesClient';
import { Suspense } from 'react';
import ServiceJsonLd from '@/components/SEO/ServiceJsonLd';
import BreadcrumbsJsonLd from '@/components/SEO/BreadcrumbsJsonLd';

// (Opcional) Tipado de props si luego lo necesitas
interface ColchonesPageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: { params: any; searchParams: any }
): Promise<Metadata> {
  // En Next.js 15 searchParams es una Promise: hay que await antes de leerlo.
  const resolvedSearchParams = await searchParams;

  const ciudadParam = resolvedSearchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';

  const descParam = resolvedSearchParams.desc;
  const descuento = Array.isArray(descParam) ? descParam[0] : descParam || '20';

  const nombreServicio = 'Colchones';
  const nombreEmpresa = 'Clean Company';

  const title = `Lavado de Colchones a Domicilio en ${ciudad} | ${descuento}% OFF`;
  const description =
    `Lavado profesional y desinfección de colchones a domicilio en ${ciudad}. ` +
    `Tratamiento antiácaros, inspección documentada y garantía escrita. ${descuento}% de descuento en tu primer servicio.`;

  return {
    title,
    description,
    keywords: [
      `lavado de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `limpieza de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `desinfección de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `eliminar ácaros colchón ${ciudad.toLowerCase()}`,
      `${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
      `oferta lavado de ${nombreServicio.toLowerCase()}`,
      `lavado de colchones precio ${ciudad.toLowerCase()}`,
      `limpieza profunda de colchones ${ciudad.toLowerCase()}`,
      `desinfección antialérgica colchones ${ciudad.toLowerCase()}`,
      `servicio lavado colchones a domicilio ${ciudad.toLowerCase()}`,
      `eliminar manchas colchón ${ciudad.toLowerCase()}`,
      `lavado ecológico colchones ${ciudad.toLowerCase()}`,
      `limpieza de colchones profesional ${ciudad.toLowerCase()}`,
      `tratamiento antiácaros colchones ${ciudad.toLowerCase()}`,
    ],
    alternates: {
      canonical: 'https://www.cleancompany.com.co/servicios/colchones',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.cleancompany.com.co/servicios/colchones',
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

export default function ColchonesPage() {
  return (
    <>
      <ServiceJsonLd
        slug="colchones"
        name="Lavado y desinfección profesional de colchones"
        serviceType="Lavado de colchones"
        alternateName={['Limpieza de colchones', 'Desinfección de colchones']}
        description="Lavado y desinfección de colchones a domicilio en Bogotá y Medellín. Proceso de aspirado, inyección-extracción, tratamiento antiácaros y secado controlado, con acta de inspección y garantía."
        url="https://www.cleancompany.com.co/servicios/colchones"
        variants={[
          { name: 'Colchón sencillo', description: 'Lavado y desinfección de colchón de 1 plaza' },
          { name: 'Colchón doble / queen', description: 'Lavado y desinfección de colchón doble o queen' },
          { name: 'Colchón king / pillow top', description: 'Lavado especial para colchones pillow top y king' },
        ]}
      />
      <BreadcrumbsJsonLd
        id="colchones-breadcrumbs-jsonld"
        items={[
          { name: 'Inicio', url: 'https://www.cleancompany.com.co/' },
          { name: 'Servicios', url: 'https://www.cleancompany.com.co/#servicios' },
          { name: 'Lavado de colchones', url: 'https://www.cleancompany.com.co/servicios/colchones' },
        ]}
      />
      <Suspense>
        <ColchonesClient />
      </Suspense>
    </>
  );
}

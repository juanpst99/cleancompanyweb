// src/app/servicios/alfombras/page.tsx
// Este es un Componente de Servidor. NO LLEVA 'use client';

import { Metadata } from 'next';
import AlfombrasClient from './AlfombrasClient';
import { Suspense } from 'react';

// (Opcional) Tipado si luego lo necesitas
interface AlfombrasPageProps {
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
    openGraph: {
      title,
      description,
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
      // images: ['https://www.tu-dominio.com/images/servicio-alfombras.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images: ['https://www.tu-dominio.com/images/servicio-alfombras-twitter.jpg'],
    },
    // alternates: {
    //   canonical: `https://cleancompany.com.co/servicios/alfombras${searchParams.ciudad ? `?ciudad=${Array.isArray(searchParams.ciudad) ? searchParams.ciudad[0] : searchParams.ciudad}` : ''}${searchParams.desc ? `${searchParams.ciudad ? '&' : '?'}desc=${Array.isArray(searchParams.desc) ? searchParams.desc[0] : searchParams.desc}` : ''}`,
    // },
  };
}

// Render del cliente
export default function AlfombrasPage() {
  return (
    <Suspense>
      <AlfombrasClient />
    </Suspense>
  );
}

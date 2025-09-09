// src/app/servicios/muebles/page.tsx
// Este es un Componente de Servidor. NO LLEVA 'use client';

import { Metadata } from 'next';
import MueblesClient from './MueblesClient';
import { Suspense } from 'react';

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
    openGraph: {
      title,
      description,
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
      // images: ['https://www.tu-dominio.com/images/servicio-muebles.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images: ['https://www.tu-dominio.com/images/servicio-muebles-twitter.jpg'],
    },
    // alternates: {
    //   canonical: `https://cleancompany.com.co/servicios/muebles${searchParams.ciudad ? `?ciudad=${Array.isArray(searchParams.ciudad) ? searchParams.ciudad[0] : searchParams.ciudad}` : ''}${searchParams.desc ? `${searchParams.ciudad ? '&' : '?'}desc=${Array.isArray(searchParams.desc) ? searchParams.desc[0] : searchParams.desc}` : ''}`,
    // },
  };
}

// Render del cliente
export default function MueblesPage() {
  return (
    <Suspense>
      <MueblesClient />
    </Suspense>
  );
}

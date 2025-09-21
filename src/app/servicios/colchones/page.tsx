// src/app/servicios/colchones/page.tsx
// Componente de Servidor. NO lleva 'use client';

import { Metadata } from 'next';
import ColchonesClient from './ColchonesClient';
import { Suspense } from 'react';

// (Opcional) Tipado de props si luego lo necesitas
interface ColchonesPageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: { params: any; searchParams: any }
): Promise<Metadata> {
  const ciudadParam = searchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';

  const descParam = searchParams.desc;
  const descuento = Array.isArray(descParam) ? descParam[0] : descParam || '20';

  const nombreServicio = 'Colchones';
  const nombreEmpresa = 'Clean Company';

  const title = `Lavado de Colchones a Domicilio en ${ciudad} | ${descuento}% OFF`;
  const description =
    `Expertos en lavado y desinfección de colchones a domicilio en ${ciudad}. ` +
    `Eliminamos 99.9% de ácaros y manchas. ¡Aprovecha ${descuento}% de descuento hoy!`;

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
    openGraph: {
      title,
      description,
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
      // images: ['https://www.tu-dominio.com/images/servicio-colchones.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images: ['https://www.tu-dominio.com/images/servicio-colchones-twitter.jpg'],
    },
  };
}

export default function ColchonesPage() {
  return (
    <Suspense>
      <ColchonesClient />
    </Suspense>
  );
}

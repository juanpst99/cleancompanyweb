// src/app/servicios/colchones/page.tsx
// Este es un Componente de Servidor. NO LLEVA 'use client';

import { Metadata } from 'next';
import ColchonesClient from './ColchonesClient'; // Importa tu componente de cliente

// Define la interfaz para las props que espera esta página
interface ColchonesPageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined }; // Tipo CORREGIDO y más genérico
}

export async function generateMetadata(
  { params, searchParams }: ColchonesPageProps
): Promise<Metadata> {
  // Accedemos a los parámetros de forma segura
  const ciudadParam = searchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';

  const descParam = searchParams.desc;
  const descuento = Array.isArray(descParam) ? descParam[0] : descParam || '20'; // Descuento por defecto
  
  const nombreServicio = 'Colchones';
  const nombreEmpresa = 'Clean Company'; // Reemplaza si es necesario

  const title = `Lavado de ${nombreServicio} en ${ciudad} | ${descuento}% Descuento - ${nombreEmpresa}`;
  const description = `Servicio de lavado y desinfección de ${nombreServicio.toLowerCase()} en ${ciudad}. ✓ Eliminamos ácaros ✓ Anti-alérgenos. ¡Cotiza y recibe ${descuento}% de descuento con ${nombreEmpresa}!`;

  return {
    title: title,
    description: description,
    keywords: [
      `lavado de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `limpieza de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `desinfección de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `eliminar ácaros colchón ${ciudad.toLowerCase()}`,
      `${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
      `oferta lavado de ${nombreServicio.toLowerCase()}`
    ],
    openGraph: {
      title: title,
      description: description,
      // images: [`https://www.tuempresa.com/images/servicio-colchones.jpg`], // URL absoluta a una imagen
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      // images: [`https://www.tuempresa.com/images/servicio-colchones-twitter.jpg`], // URL absoluta a una imagen
    },
    // alternates: {
    //   canonical: `https://www.tuempresa.com/servicios/colchones${searchParams.ciudad ? `?ciudad=${Array.isArray(searchParams.ciudad) ? searchParams.ciudad[0] : searchParams.ciudad}` : ''}${searchParams.desc ? `&desc=${Array.isArray(searchParams.desc) ? searchParams.desc[0] : searchParams.desc}` : ''}`,
    // },
  };
}

// El componente de página ahora renderiza el componente de cliente,
// pasando los searchParams por si el cliente los necesita.
export default function ColchonesPage({ searchParams }: ColchonesPageProps) {
  return <ColchonesClient />;
}

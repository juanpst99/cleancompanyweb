// src/app/servicios/alfombras/page.tsx
// Este es un Componente de Servidor. NO LLEVA 'use client';

import { Metadata } from 'next';
import AlfombrasClient from './AlfombrasClient'; // Importa tu componente de cliente

// Define la interfaz para las props que espera esta página
interface AlfombrasPageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined }; // Tipo CORREGIDO y más genérico
}

export async function generateMetadata(
  { params, searchParams }: AlfombrasPageProps
): Promise<Metadata> {
  // Ahora accedemos a 'ciudad' de forma segura, sabiendo que puede ser string, array o undefined
  const ciudadParam = searchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';
  
  const nombreServicio = 'Alfombras';
  const nombreEmpresa = 'Clean Company'; // Reemplaza si es necesario

  const title = `Lavado de ${nombreServicio} a Domicilio en ${ciudad} | ${nombreEmpresa}`;
  const description = `Servicio profesional de lavado y desinfección de ${nombreServicio.toLowerCase()} en ${ciudad}. Eliminamos manchas, ácaros y olores. ¡Cotiza ahora con ${nombreEmpresa}!`;

  return {
    title: title,
    description: description,
    keywords: [
      `lavado de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `limpieza de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `desinfección de ${nombreServicio.toLowerCase()} ${ciudad.toLowerCase()}`,
      `${nombreServicio.toLowerCase()} en ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
      `lavado de ${nombreServicio.toLowerCase()}`,
      `limpieza de ${nombreServicio.toLowerCase()}`
    ],
    openGraph: {
      title: title,
      description: description,
      // images: [`https://www.tuempresa.com/images/servicio-alfombras.jpg`], // URL absoluta a una imagen
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      // images: [`https://www.tuempresa.com/images/servicio-alfombras-twitter.jpg`], // URL absoluta a una imagen
    },
    // alternates: {
    //   canonical: `https://www.tuempresa.com/servicios/alfombras${searchParams.ciudad ? `?ciudad=${Array.isArray(searchParams.ciudad) ? searchParams.ciudad[0] : searchParams.ciudad}` : ''}`,
    // },
  };
}

// El componente de página ahora renderiza el componente de cliente.
// No necesita pasar searchParams si AlfombrasClient usa el hook useSearchParams()
export default function AlfombrasPage({ searchParams }: AlfombrasPageProps) {
  // Si AlfombrasClient usa useSearchParams(), no necesitas pasarle searchParams como prop.
  return <AlfombrasClient />;
}

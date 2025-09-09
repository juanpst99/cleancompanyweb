// src/app/servicios/empresarial/page.tsx
// Componente de Servidor. NO lleva 'use client';

import { Metadata } from 'next';
import EmpresarialClient from './EmpresarialClient';
import { Suspense } from 'react';

// (Opcional) Tipado si luego lo necesitas
interface EmpresarialPageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params, searchParams }: { params: any; searchParams: any }
): Promise<Metadata> {
  const ciudadParam = searchParams.ciudad;
  const ciudad = Array.isArray(ciudadParam) ? ciudadParam[0] : ciudadParam || 'Bogotá y Medellín';

  const descParam = searchParams.desc;
  const descuento = Array.isArray(descParam) ? descParam[0] : descParam || '15';

  const nombreServicio = 'Servicio Empresarial';
  const nombreEmpresa = 'Clean Company';

  const title = `Limpieza Empresarial para Oficinas en ${ciudad} | ${descuento}% OFF`;
  const description =
    `Soluciones de limpieza integral para oficinas y espacios comerciales en ${ciudad}. ` +
    `Planes periódicos para muebles, tapetes y colchones. Calidad garantizada. ¡${descuento}% de descuento!`;

  return {
    title,
    description,
    keywords: [
      `limpieza empresarial ${ciudad.toLowerCase()}`,
      `limpieza de oficinas ${ciudad.toLowerCase()}`,
      `servicio de aseo empresarial ${ciudad.toLowerCase()}`,
      `mantenimiento de oficinas ${ciudad.toLowerCase()}`,
      `limpieza de tapetes para oficinas ${ciudad.toLowerCase()}`,
      `lavado de muebles corporativos ${ciudad.toLowerCase()}`,
      `planes de limpieza empresas ${ciudad.toLowerCase()}`,
      `limpieza espacios comerciales ${ciudad.toLowerCase()}`,
      `outsourcing de aseo ${ciudad.toLowerCase()}`,
      `servicio programado de limpieza ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
    ],
    openGraph: {
      title,
      description,
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
      // images: ['https://www.tu-dominio.com/images/servicio-empresarial.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images: ['https://www.tu-dominio.com/images/servicio-empresarial-twitter.jpg'],
    },
  };
}

export default function EmpresarialPage() {
  return (
    <Suspense>
      <EmpresarialClient />
    </Suspense>
  );
}

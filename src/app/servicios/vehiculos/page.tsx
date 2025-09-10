// src/app/servicios/vehiculos/page.tsx
// Componente de Servidor. NO lleva 'use client';

import { Metadata } from 'next';

// (Opcional) Tipado si luego lo necesitas
interface VehiculosPageProps {
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

  const nombreServicio = 'Vehículos';
  const nombreEmpresa = 'Clean Company';

  const title = `Limpieza Interior de Vehículos en ${ciudad} | ${descuento}% OFF`;
  const description =
    `Lavado detallado de interiores de vehículo en ${ciudad}: tapicería, alfombras y paneles. ` +
    `Eliminamos manchas y malos olores con productos especializados. ¡Aprovecha ${descuento}%!`;

  return {
    title,
    description,
    keywords: [
      `limpieza interior de vehículos ${ciudad.toLowerCase()}`,
      `lavado tapicería automotriz ${ciudad.toLowerCase()}`,
      `lavado de sillas de carro ${ciudad.toLowerCase()}`,
      `limpieza de alfombras de carro ${ciudad.toLowerCase()}`,
      `desinfección interior carro ${ciudad.toLowerCase()}`,
      `limpieza a vapor interior carro ${ciudad.toLowerCase()}`,
      `detailing interior basico ${ciudad.toLowerCase()}`,
      `quitar malos olores carro ${ciudad.toLowerCase()}`,
      `lavado interior camioneta ${ciudad.toLowerCase()}`,
      `lavado interior automotriz precio ${ciudad.toLowerCase()}`,
      nombreEmpresa.toLowerCase(),
    ],
    openGraph: {
      title,
      description,
      siteName: nombreEmpresa,
      locale: 'es_CO',
      type: 'website',
      // images: ['https://www.tu-dominio.com/images/servicio-vehiculos.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // images: ['https://www.tu-dominio.com/images/servicio-vehiculos-twitter.jpg'],
    },
  };
}

export default function VehiculosPage() {
  return <div>Servicio de limpieza interior de vehículos</div>;
}

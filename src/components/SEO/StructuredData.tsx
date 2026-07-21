import { toJsonLdHtml } from './JsonLd'
import { SITE, hasReviews } from '@/config/site'

// AggregateRating GATED: solo se emite si hay reseñas reales configuradas en
// src/config/site.ts. Nunca se publica una calificación inventada (riesgo de
// acción manual de Google + pérdida de confianza ante motores de IA).
const aggregateRating = hasReviews()
  ? {
      '@type': 'AggregateRating',
      ratingValue: SITE.reviews.rating,
      reviewCount: SITE.reviews.count,
      bestRating: 5,
      worstRating: 1,
    }
  : null

// Centraliza los `@id` para mantener un grafo coherente entre páginas.
export const ENTITY_IDS = {
  organization: 'https://www.cleancompany.com.co/#organization',
  website: 'https://www.cleancompany.com.co/#website',
  logo: 'https://www.cleancompany.com.co/#logo',
  localBogota: 'https://www.cleancompany.com.co/#bogota',
  localMedellin: 'https://www.cleancompany.com.co/#medellin',
  contactBogota: 'https://www.cleancompany.com.co/#contact-bogota',
  contactMedellin: 'https://www.cleancompany.com.co/#contact-medellin',
} as const

const LOGO_URL = 'https://www.cleancompany.com.co/images/logo/clean-company-logo.png'

const KNOWS_ABOUT = [
  'Lavado de alfombras',
  'Lavado de tapetes',
  'Lavado de muebles',
  'Lavado de sofás',
  'Lavado de colchones',
  'Limpieza de tapicería',
  'Desinfección textil',
  'Eliminación de ácaros',
  'Eliminación de manchas',
  'Limpieza interior de vehículos',
  'Limpieza empresarial',
  'Fibras textiles',
  'Lavado por inyección-extracción',
]

// Horario unificado (Lun–Sáb 8:00–17:00 según Footer). Revisión pendiente para Domingo.
const OPENING_HOURS_WEEK = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '08:00',
  closes: '17:00',
}

const OPENING_HOURS_SUNDAY = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: 'Sunday',
  opens: '08:00',
  closes: '14:00',
}

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ENTITY_IDS.organization,
  name: 'Clean Company',
  url: 'https://www.cleancompany.com.co',
  logo: {
    '@type': 'ImageObject',
    '@id': ENTITY_IDS.logo,
    url: LOGO_URL,
    width: 512,
    height: 512,
  },
  image: { '@id': ENTITY_IDS.logo },
  slogan: 'Limpieza profesional con resultados garantizados',
  description:
    'Empresa colombiana especializada en lavado profesional de alfombras, tapetes, muebles y colchones a domicilio en Bogotá y Medellín desde 2015.',
  foundingDate: '2015',
  email: 'cleancompanymed@gmail.com',
  telephone: '+57-312-805-2720',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      '@id': ENTITY_IDS.contactBogota,
      telephone: '+57-312-805-2720',
      contactType: 'customer service',
      areaServed: 'CO',
      availableLanguage: ['es'],
      hoursAvailable: OPENING_HOURS_WEEK,
    },
    {
      '@type': 'ContactPoint',
      '@id': ENTITY_IDS.contactMedellin,
      telephone: '+57-320-921-0866',
      contactType: 'customer service',
      areaServed: 'CO',
      availableLanguage: ['es'],
      hoursAvailable: OPENING_HOURS_SUNDAY,
    },
  ],
  // sameAs conecta la entidad con sus perfiles oficiales (clave para que la IA
  // resuelva "Clean Company" como una sola marca y le dé confianza).
  // TODO (alto impacto GEO): añadir aquí el perfil de Google Business Profile
  // (Maps) de Bogotá y Medellín, y TikTok/YouTube/LinkedIn si existen — solo URLs reales.
  sameAs: [
    'https://www.facebook.com/profile.php?id=100092972695790',
    'https://www.instagram.com/cleancompany_colombia/',
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Bogotá',
      containedInPlace: { '@type': 'Country', name: 'Colombia' },
    },
    {
      '@type': 'City',
      name: 'Medellín',
      containedInPlace: { '@type': 'Country', name: 'Colombia' },
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Área Metropolitana del Valle de Aburrá',
      containedInPlace: { '@type': 'Country', name: 'Colombia' },
    },
  ],
  knowsAbout: KNOWS_ABOUT,
  ...(aggregateRating ? { aggregateRating } : {}),
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': ENTITY_IDS.website,
  url: 'https://www.cleancompany.com.co',
  name: 'Clean Company',
  description:
    'Lavado profesional de alfombras, tapetes, muebles y colchones a domicilio en Bogotá y Medellín.',
  inLanguage: 'es-CO',
  publisher: { '@id': ENTITY_IDS.organization },
  // Búsqueda real del sitio: el buscador de /preguntas-frecuentes acepta ?q=
  // (FaqSearch lo lee al montar). Señal de sitelinks/asistentes.
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate:
        'https://www.cleancompany.com.co/preguntas-frecuentes?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

const buildLocalBusiness = (params: {
  id: string
  name: string
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  latitude: number
  longitude: number
  city: string
  region: string
  radiusMeters: number
  /** Municipios/áreas adicionales cubiertas (se nombran como entidades). */
  extraAreas?: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'CleaningService'],
  '@id': params.id,
  name: params.name,
  parentOrganization: { '@id': ENTITY_IDS.organization },
  url: 'https://www.cleancompany.com.co',
  image: { '@id': ENTITY_IDS.logo },
  telephone: '+57-312-805-2720',
  email: 'cleancompanymed@gmail.com',
  priceRange: '$$',
  currenciesAccepted: 'COP',
  paymentAccepted: 'Cash, Credit Card, Debit Card, Bank Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: params.streetAddress,
    addressLocality: params.addressLocality,
    addressRegion: params.addressRegion,
    postalCode: params.postalCode,
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: params.latitude,
    longitude: params.longitude,
  },
  openingHoursSpecification: [OPENING_HOURS_WEEK],
  areaServed: [
    { '@type': 'City', name: params.city },
    { '@type': 'AdministrativeArea', name: params.region },
    ...(params.extraAreas ?? []).map((name) => ({ '@type': 'City', name })),
  ],
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: params.latitude,
      longitude: params.longitude,
    },
    geoRadius: String(params.radiusMeters),
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `Servicios Clean Company ${params.city}`,
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Lavado de Alfombras y Tapetes' },
        areaServed: { '@type': 'City', name: params.city },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Lavado de Muebles y Sofás' },
        areaServed: { '@type': 'City', name: params.city },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Lavado y Desinfección de Colchones' },
        areaServed: { '@type': 'City', name: params.city },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Limpieza Interior de Vehículos' },
        areaServed: { '@type': 'City', name: params.city },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Limpieza Empresarial' },
        areaServed: { '@type': 'City', name: params.city },
      },
    ],
  },
  ...(aggregateRating ? { aggregateRating } : {}),
})

const localBogota = buildLocalBusiness({
  id: ENTITY_IDS.localBogota,
  name: 'Clean Company Bogotá',
  streetAddress: 'Calle 22J #104-30',
  addressLocality: 'Bogotá',
  addressRegion: 'Bogotá D.C.',
  postalCode: '110111',
  latitude: 4.71099,
  longitude: -74.07209,
  city: 'Bogotá',
  region: 'Cundinamarca',
  radiusMeters: 30000,
})

const localMedellin = buildLocalBusiness({
  id: ENTITY_IDS.localMedellin,
  name: 'Clean Company Medellín',
  streetAddress: 'Calle 30 #78-54',
  addressLocality: 'Medellín',
  addressRegion: 'Antioquia',
  postalCode: '050001',
  latitude: 6.25184,
  longitude: -75.56359,
  city: 'Medellín',
  region: 'Antioquia',
  // Radio ampliado para cubrir el Valle de Aburrá (norte hasta Barbosa).
  radiusMeters: 30000,
  // Área Metropolitana del Valle de Aburrá — municipios nombrados como
  // entidades (los LLMs resuelven cobertura por nombre, no por geocírculo).
  extraAreas: [
    'Envigado',
    'Itagüí',
    'Sabaneta',
    'La Estrella',
    'Caldas',
    'Bello',
    'Copacabana',
    'Girardota',
    'Barbosa',
  ],
})

const StructuredData = () => {
  return (
    <>
      <script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdHtml(organization) }}
      />
      <script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdHtml(website) }}
      />
      <script
        id="structured-data-local-bogota"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdHtml(localBogota) }}
      />
      <script
        id="structured-data-local-medellin"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdHtml(localMedellin) }}
      />
    </>
  )
}

export default StructuredData

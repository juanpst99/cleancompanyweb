import JsonLd from './JsonLd'
import { ENTITY_IDS } from './StructuredData'

interface ServiceJsonLdProps {
  slug: string
  name: string
  description: string
  serviceType: string
  alternateName?: string[]
  url: string
  /** Si se restringe a una ciudad concreta */
  city?: 'Bogotá' | 'Medellín'
  /** Ofertas/variantes opcionales */
  variants?: { name: string; description?: string }[]
}

const ALL_CITIES = [
  { '@type': 'City' as const, name: 'Bogotá' },
  { '@type': 'City' as const, name: 'Medellín' },
]

export default function ServiceJsonLd({
  slug,
  name,
  description,
  serviceType,
  alternateName,
  url,
  city,
  variants,
}: ServiceJsonLdProps) {
  const providerId = city === 'Bogotá'
    ? ENTITY_IDS.localBogota
    : city === 'Medellín'
    ? ENTITY_IDS.localMedellin
    : ENTITY_IDS.organization

  const areaServed = city
    ? [{ '@type': 'City', name: city }]
    : ALL_CITIES

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    serviceType,
    description,
    url,
    provider: { '@id': providerId },
    areaServed,
    audience: [
      { '@type': 'Audience', name: 'Hogares' },
      { '@type': 'BusinessAudience', name: 'Empresas y oficinas' },
    ],
    termsOfService: 'https://www.cleancompany.com.co/garantia',
  }

  if (alternateName?.length) {
    data.alternateName = alternateName
  }

  if (variants?.length) {
    data.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `Variantes de ${serviceType.toLowerCase()}`,
      itemListElement: variants.map((v) => ({
        '@type': 'Offer',
        name: v.name,
        description: v.description,
      })),
    }
  }

  return <JsonLd id={`service-jsonld-${slug}`} data={data} />
}

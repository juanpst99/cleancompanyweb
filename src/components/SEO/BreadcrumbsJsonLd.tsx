import JsonLd from './JsonLd'

export interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsJsonLdProps {
  id?: string
  items: BreadcrumbItem[]
}

export default function BreadcrumbsJsonLd({
  id = 'breadcrumbs-jsonld',
  items,
}: BreadcrumbsJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd id={id} data={data} />
}

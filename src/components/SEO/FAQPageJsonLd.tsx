import JsonLd from './JsonLd'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQPageJsonLdProps {
  id?: string
  pageUrl?: string
  items: FAQItem[]
}

export default function FAQPageJsonLd({
  id = 'faqpage-jsonld',
  pageUrl,
  items,
}: FAQPageJsonLdProps) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  if (pageUrl) {
    data['@id'] = `${pageUrl}#faq`
  }

  return <JsonLd id={id} data={data} />
}

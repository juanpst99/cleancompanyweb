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

  // speakable: marca preguntas y respuestas como contenido apto para lectura
  // por asistentes de voz e IA (señal directa de extracción).
  data.speakable = {
    '@type': 'SpeakableSpecification',
    cssSelector: ['[data-faq-item] summary', '[data-faq-item] p'],
  }

  return <JsonLd id={id} data={data} />
}

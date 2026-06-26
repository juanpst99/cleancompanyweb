import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { BreadcrumbItem } from './SEO/BreadcrumbsJsonLd'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
  tone?: 'light' | 'dark'
}

/**
 * Breadcrumbs visibles (UI). El marcado JSON-LD equivalente se inyecta con
 * <BreadcrumbsJsonLd /> usando los mismos `items`.
 */
export default function Breadcrumbs({
  items,
  className = '',
  tone = 'dark',
}: BreadcrumbsProps) {
  const baseColor = tone === 'light' ? 'text-white/80' : 'text-gray-600'
  const sepColor = tone === 'light' ? 'text-white/50' : 'text-gray-400'
  const lastColor = tone === 'light' ? 'text-white' : 'text-gray-900'

  return (
    <nav aria-label="Breadcrumbs" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.url} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className={`font-medium ${lastColor}`}>
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.url.replace('https://www.cleancompany.com.co', '')}
                  className={`hover:underline ${baseColor}`}
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <ChevronRight className={`w-4 h-4 ${sepColor}`} aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

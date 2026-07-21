import { MetadataRoute } from 'next'
import fs from 'node:fs/promises'
import path from 'node:path'

const BASE = 'https://www.cleancompany.com.co'

type Entry = MetadataRoute.Sitemap[number]

async function getBlogEntries(): Promise<Entry[]> {
  const dir = path.join(process.cwd(), 'content', 'blog')
  try {
    const files = await fs.readdir(dir)
    return Promise.all(
      files
        .filter((f) => f.endsWith('.md'))
        .map(async (f) => {
          const slug = f.replace(/\.md$/, '')
          const stat = await fs.stat(path.join(dir, f))
          return {
            url: `${BASE}/blog/${slug}`,
            lastModified: stat.mtime,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          }
        })
    )
  } catch {
    return []
  }
}

const STATIC: Entry[] = [
  { url: `${BASE}`,                          priority: 1.0, changeFrequency: 'weekly' },
  { url: `${BASE}/servicios/alfombras`,      priority: 0.9, changeFrequency: 'monthly' },
  { url: `${BASE}/servicios/muebles`,        priority: 0.9, changeFrequency: 'monthly' },
  { url: `${BASE}/servicios/colchones`,      priority: 0.9, changeFrequency: 'monthly' },
  { url: `${BASE}/servicios/vehiculos`,      priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/servicios/empresarial`,    priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/medellin`,                 priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE}/proceso-de-lavado`,        priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/preguntas-frecuentes`,     priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/nosotros`,                 priority: 0.6, changeFrequency: 'monthly' },
  { url: `${BASE}/contacto`,                 priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE}/garantia`,                 priority: 0.5, changeFrequency: 'yearly' },
  { url: `${BASE}/blog`,                     priority: 0.6, changeFrequency: 'weekly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blog = await getBlogEntries()
  const now = new Date()
  return [
    ...STATIC.map((s) => ({ ...s, lastModified: now })),
    ...blog,
  ]
}

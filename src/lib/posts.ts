import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Lectura de artículos del blog desde content/blog/*.md.
 * Se usa en el listado /blog y en la sección "Blog" del home para mostrar
 * SIEMPRE los artículos reales (sin contenido de relleno).
 */

export type PostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string // "YYYY-MM-DD"
  coverImage?: string
  readingTime?: string
  category: string
  tags: string[]
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export async function getAllPosts(): Promise<PostMeta[]> {
  let files: string[] = []
  try {
    files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'))
  } catch {
    return [] // sin carpeta de blog -> sin posts (no rompe el render)
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, '')
      const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf8')
      // Windows-safe: trimStart() elimina el BOM inicial (U+FEFF es whitespace)
      // y cualquier espacio antes del frontmatter, sin depender de un literal BOM.
      const normalized = raw.trimStart()
      const { data } = matter(normalized)
      const fm = data as Partial<PostMeta>

      return {
        slug,
        title: fm.title ?? slug,
        excerpt: fm.excerpt ?? '',
        date: fm.date ?? '',
        coverImage: fm.coverImage,
        readingTime: fm.readingTime,
        category: fm.category ?? 'Clean Company',
        tags: Array.isArray(fm.tags) ? fm.tags : [],
      }
    }),
  )

  // Orden por fecha desc (formato YYYY-MM-DD permite comparar como string)
  posts.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  return posts
}

export async function getRecentPosts(limit = 3): Promise<PostMeta[]> {
  return (await getAllPosts()).slice(0, limit)
}

const MESES_ES = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
]

/** Formatea "2026-02-21" -> "21 feb 2026" sin desfase de zona horaria. */
export function formatPostDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return iso
  const [, year, month, day] = m
  const mes = MESES_ES[Number(month) - 1] ?? month
  return `${Number(day)} ${mes} ${year}`
}

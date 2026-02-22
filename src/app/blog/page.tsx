// src/app/blog/page.tsx
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

type PostFrontmatter = {
  title?: string;
  date?: string; // "YYYY-MM-DD"
  excerpt?: string;
  coverImage?: string; // "/images/..."
  readingTime?: string;
  category?: string;
  tags?: string[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function formatDate(dateStr?: string) {
  return dateStr ?? "";
}

export default async function BlogIndexPage() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");

      // ✅ Windows-safe: quita BOM + whitespace antes del frontmatter
      const normalized = raw.replace(/^\uFEFF/, "").trimStart();

      const { data } = matter(normalized);
      const fm = data as PostFrontmatter;

      return {
        slug,
        title: fm.title ?? slug,
        excerpt: fm.excerpt ?? "",
        date: fm.date ?? "",
        coverImage: fm.coverImage,
        readingTime: fm.readingTime,
        category: fm.category ?? "Clean Company",
        tags: Array.isArray(fm.tags) ? fm.tags : [],
      };
    })
  );

  // orden por fecha desc (si viene YYYY-MM-DD)
  posts.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Blog
          </h1>
          <p className="mt-2 text-zinc-600">
            Consejos y guías para el cuidado profesional del hogar.
          </p>
        </div>

        <a
          href="https://wa.me/573128052720"
          className="inline-flex items-center justify-center rounded-xl bg-[#3AAA35] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
        >
          Cotizar por WhatsApp
        </a>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {/* Cover */}
            <div className="relative h-44 w-full bg-zinc-100">
              {p.coverImage ? (
                <Image
                  src={p.coverImage}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50" />
              )}

              {/* Category badge */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur">
                  {p.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5">
              <h2 className="text-lg font-semibold leading-snug text-zinc-900 group-hover:underline group-hover:underline-offset-4">
                {p.title}
              </h2>

              {p.excerpt ? (
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {p.excerpt}
                </p>
              ) : null}

              {/* Tags */}
              {p.tags.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Meta */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                {p.date ? <span>{formatDate(p.date)}</span> : null}
                {p.readingTime ? (
                  <>
                    <span className="text-zinc-300">•</span>
                    <span>{p.readingTime}</span>
                  </>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
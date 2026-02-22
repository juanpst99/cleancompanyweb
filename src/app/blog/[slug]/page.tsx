// src/app/blog/[slug]/page.tsx
import type { ReactNode } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

// Ajusta a tu frontmatter real
type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  readingTime?: string;
  category?: string;
  tags?: string[];
};

type Post = PostFrontmatter & {
  slug: string;
  html: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function estimateReadingTimeFromMarkdown(md: string) {
  const text = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-\[\]\(\)!]/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf8");

  // ✅ quita BOM + cualquier whitespace antes del frontmatter (Windows-safe)
  const normalized = raw.replace(/^\uFEFF/, "").trimStart();

  const { data, content } = matter(normalized);
  const fm = data as Partial<PostFrontmatter>;

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const html = processed.toString();

  return {
    slug,
    title: fm.title ?? slug,
    date: fm.date ?? "",
    excerpt: fm.excerpt ?? "",
    coverImage: fm.coverImage,
    category: fm.category,
    tags: fm.tags,
    readingTime: fm.readingTime ?? estimateReadingTimeFromMarkdown(content),
    html,
  };
}

async function getAllSlugs() {
  const files = await fs.readdir(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// ✅ SSG rutas
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ✅ SEO (Next 15: params es Promise)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

function BlogPostLayout({ post, children }: { post: Post; children: ReactNode }) {
  return (
    <div className="bg-white">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-zinc-200">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white" />
        <div className="relative mx-auto max-w-3xl px-6 py-10">
          <p className="text-sm font-semibold text-[#3AAA35]">
            Clean Company • Blog
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 md:text-4xl">
            {post.title}
          </h1>

          <p className="mt-3 text-base leading-7 text-zinc-600">
            {post.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
            <span>{post.date}</span>
            <span className="text-zinc-300">•</span>
            <span>{post.readingTime ?? "6–8 min lectura"}</span>
            <span className="text-zinc-300">•</span>
            <span>Bogotá / Medellín</span>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/573128052720"
              className="inline-flex items-center justify-center rounded-xl bg-[#3AAA35] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Cotizar por WhatsApp
            </a>

            <a
              href="/servicios/colchones"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Ver servicio de colchones
            </a>
          </div>
        </div>
      </header>

      {/* CUERPO */}
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1fr_360px]">
        <article className="prose prose-clean prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:scroll-mt-24">
          {children}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-zinc-900">
              ¿Listo para agendar?
            </p>
            <p className="mt-2 text-sm text-zinc-600">
              Te cotizamos en menos de 2 minutos por WhatsApp.
            </p>
            <a
              href="https://wa.me/573128052720"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#3AAA35] px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
            >
              Agendar ahora
            </a>

            <div className="mt-4 rounded-xl bg-zinc-50 p-4">
              <p className="text-xs font-semibold text-zinc-700">Servicio</p>
              <p className="mt-1 text-sm text-zinc-600">
                Bogotá y Medellín • Domicilio
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

// ✅ PageProps en Next 15: params es Promise
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // ✅ Render del HTML del Markdown
  const content = <div dangerouslySetInnerHTML={{ __html: post.html }} />;

  return <BlogPostLayout post={post}>{content}</BlogPostLayout>;
}
import { MetadataRoute } from 'next'

const BASE = 'https://www.cleancompany.com.co'

const DISALLOW_QUERY_AND_PRIVATE = [
  '/api/',
  '/admin/',
  '/_next/',
  '/promo/',
  '/*?utm_*',
  '/*&utm_*',
  '/*?desc=',
  '/*&desc=',
  '/*?ciudad=',
  '/*&ciudad=',
  '/*?gclid=',
  '/*?fbclid=',
  '/*?ref=',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW_QUERY_AND_PRIVATE,
      },
      { userAgent: 'Googlebot',           allow: '/', disallow: DISALLOW_QUERY_AND_PRIVATE },
      { userAgent: 'Googlebot-Image',     allow: '/' },
      { userAgent: 'Google-Extended',     allow: '/' },
      { userAgent: 'Bingbot',             allow: '/', disallow: DISALLOW_QUERY_AND_PRIVATE },
      { userAgent: 'OAI-SearchBot',       allow: '/' },
      { userAgent: 'ChatGPT-User',        allow: '/' },
      { userAgent: 'GPTBot',              allow: '/' },
      { userAgent: 'PerplexityBot',       allow: '/' },
      { userAgent: 'Perplexity-User',     allow: '/' },
      { userAgent: 'Claude-Web',          allow: '/' },
      { userAgent: 'Claude-SearchBot',    allow: '/' },
      { userAgent: 'ClaudeBot',           allow: '/' },
      { userAgent: 'anthropic-ai',        allow: '/' },
      { userAgent: 'Applebot',            allow: '/' },
      { userAgent: 'Applebot-Extended',   allow: '/' },
      { userAgent: 'CCBot',               allow: '/' },
      { userAgent: 'Bytespider',          disallow: '/' },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}

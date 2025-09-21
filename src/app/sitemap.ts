import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cleancompany.com.co'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/servicios/alfombras`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/muebles`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/colchones`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios/vehiculos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9, // actualizado
    },
    {
      url: `${baseUrl}/servicios/empresarial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9, // actualizado
    },
    {
      url: `${baseUrl}/garantia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7, // nuevo
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}

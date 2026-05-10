import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ersurer.com'

  const services = [
    'aspnet-core-development',
    'web-api-development',
    'crm-software-development',
    'admin-panel-development',
    'enterprise-architecture'
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectRoutes = ['crm-platform', 'admin-panel-system', 'qr-menu-system'].map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogRoutes = [
    'aspnet-core-enterprise-api-development',
    'clean-architecture-dotnet',
    'rest-api-security-best-practices',
    'scalable-backend-architecture',
    'microservices-vs-modular-monolith'
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...services,
    ...projectRoutes,
    ...blogRoutes
  ]
}

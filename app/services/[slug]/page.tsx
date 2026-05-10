import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Zap, Shield, Database } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Script from 'next/script'

// Define the static services data (In a real app, this might come from a database/CMS)
const servicesData = {
  'aspnet-core-development': {
    title: 'ASP.NET Core Enterprise Development',
    description: 'Kurumsal düzeyde ölçeklenebilir, yüksek performanslı ve güvenli ASP.NET Core uygulamaları geliştirme hizmetleri.',
    longDescription: 'ASP.NET Core kullanarak modern, bulut tabanlı, İnternete bağlı uygulamalar oluşturuyoruz. MVC ve Razor Pages mimarilerini kullanarak, işletmenizin özel ihtiyaçlarına tam olarak uyan, yüksek trafikli kurumsal çözümler sunuyoruz.',
    features: ['High-Performance Architecture', 'Entity Framework Core Integration', 'Cross-Platform Deployment', 'Secure Authentication & Authorization'],
    icon: Database,
    relatedBlogs: ['scalable-backend-systems', 'clean-architecture-in-net']
  },
  'web-api-development': {
    title: 'High-Performance Web API Development',
    description: 'Mikroservisler ve mobil uygulamalar için RESTful ve gRPC tabanlı hızlı Web API çözümleri.',
    longDescription: 'Sistemler arası entegrasyonu sağlamak ve client (React, Vue, Mobil) uygulamalarınız için hızlı, güvenli veri akışı oluşturmak adına REST ve gRPC mimarilerinde API tasarımları gerçekleştiriyoruz.',
    features: ['RESTful & gRPC Protocols', 'Swagger/OpenAPI Documentation', 'JWT & OAuth2 Security', 'Rate Limiting & Caching'],
    icon: Zap,
    relatedBlogs: ['rest-api-security']
  },
  'crm-software-development': {
    title: 'Custom CRM Software Development',
    description: 'Müşteri ilişkilerinizi yönetmek için şirketinize özel, akıllı CRM yazılım çözümleri.',
    longDescription: 'Hazır paket programların kısıtlamalarından kurtulun. Şirketinizin iş akışlarına %100 uyumlu, özel raporlama ekranlarına sahip ve diğer yazılımlarınızla entegre çalışabilen Özel CRM sistemleri geliştiriyoruz.',
    features: ['Custom Workflow Automation', 'Third-party API Integrations', 'Real-time Analytics Dashboard', 'Role-Based Access Control (RBAC)'],
    icon: CheckCircle,
    relatedBlogs: ['aspnet-core-enterprise-guide']
  },
  'admin-panel-development': {
    title: 'Enterprise Admin Panel Development',
    description: 'Verilerinizi güvenle ve kolayca yönetebileceğiniz gelişmiş yönetim panelleri.',
    longDescription: 'Karmaşık verilerinizi anlamlı raporlara dönüştüren, kullanımı kolay ve modern arayüzlere sahip (React/Next.js destekli) gelişmiş yönetici paneli çözümleri.',
    features: ['Interactive Data Tables', 'Chart & Graph Integrations', 'Data Export/Import (Excel, PDF)', 'Audit Logging'],
    icon: Shield,
    relatedBlogs: ['scalable-backend-systems']
  },
  'enterprise-architecture': {
    title: 'Enterprise Architecture Consulting',
    description: 'Monolitik sistemlerden Mikroservis mimarisine geçiş ve bulut altyapı danışmanlığı.',
    longDescription: 'Yazılım altyapınızın geleceğe hazır olması için doğru mimariyi seçmek hayati önem taşır. Domain-Driven Design (DDD), Clean Architecture ve CQRS patternlerini kullanarak işletmenize özel sağlam mimariler tasarlıyoruz.',
    features: ['Microservices Design', 'Event-Driven Architecture', 'Cloud Infrastructure (Azure)', 'Performance Optimization'],
    icon: Database,
    relatedBlogs: ['microservices-vs-monolith', 'clean-architecture-in-net']
  }
}

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({ slug }))
}

export const dynamic = 'force-static'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    return { title: 'Service Not Found' }
  }

  return {
    title: `${service.title} | Consulting Services`,
    description: service.description,
    alternates: {
      canonical: `https://ersurer.com/services/${params.slug}`
    },
    openGraph: {
      title: service.title,
      description: service.description,
      type: 'article',
      url: `https://ersurer.com/services/${params.slug}`
    }
  }
}

export default function ServicePage({ params }: Props) {
  const service = servicesData[params.slug as keyof typeof servicesData]

  if (!service) {
    notFound()
  }

  const Icon = service.icon

  // Structured Data for the specific Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": service.title,
        "description": service.longDescription,
        "provider": {
          "@type": "Person",
          "name": "Resul Ersürer",
          "url": "https://www.ersurer.com"
        },
        "serviceType": "Software Development"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ersurer.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.ersurer.com/#services"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": service.title,
            "item": `https://www.ersurer.com/services/${params.slug}`
          }
        ]
      }
    ]
  }

  return (
    <main className="min-h-screen selection:bg-indigo-500/30 bg-slate-950">
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navigation />

      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link href="/#services" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Hizmetlere Dön
        </Link>

        <header className="mb-12">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-6 border border-white/10 shadow-xl">
            <Icon className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            {service.title}
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed font-light">
            {service.description}
          </p>
        </header>

        <section className="prose prose-invert prose-indigo max-w-none mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Hizmet Detayları</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {service.longDescription}
          </p>

          <h3 className="text-xl font-bold text-white mt-12 mb-6">Öne Çıkan Özellikler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Smart Internal Linking (Silo) */}
        {service.relatedBlogs.length > 0 && (
          <aside className="mb-16 p-8 rounded-3xl glass border border-indigo-500/20">
            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest text-sm">İlgili Blog Yazıları</h3>
            <div className="flex flex-col gap-3">
              {service.relatedBlogs.map((blogSlug, index) => (
                <Link key={index} href={`/blog/${blogSlug}`} className="text-indigo-400 hover:text-indigo-300 hover:underline transition-all">
                  {blogSlug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} →
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* CTA Section */}
        <section className="p-8 sm:p-12 rounded-3xl mesh-gradient relative overflow-hidden text-center border border-white/10">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-white">Bu Hizmete İhtiyacınız Mı Var?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Projenizi ölçeklendirmek ve kurumsal standartlara taşımak için hemen iletişime geçin. Sizin için en uygun mimariyi birlikte belirleyelim.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Projeyi Başlat
            </Link>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}

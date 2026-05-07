'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, ChevronRight } from 'lucide-react'

const projects = [
  {
    title: 'Enterprise CRM Platformu',
    category: 'Full Stack & Automation',
    desc: 'Büyük ölçekli satış ekipleri için geliştirilmiş, gerçek zamanlı raporlama ve AI destekli müşteri analitiği sunan özel CRM çözümü.',
    tech: ['ASP.NET Core', 'SQL Server', 'React', 'SignalR'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80\u0026w=2426\u0026auto=format\u0026fit=crop',
    link: '#',
    github: '#',
  },
  {
    title: 'Global Lojistik Takip Sistemi',
    category: 'Backend & Integration',
    desc: 'Dünya çapında 50+ ülkede kullanılan, çoklu API entegrasyonuna sahip yüksek erişilebilirlikli lojistik takip altyapısı.',
    tech: ['Microservices', 'Docker', 'Azure', 'Web API'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80\u0026w=2340\u0026auto=format\u0026fit=crop',
    link: '#',
    github: '#',
  },
  {
    title: 'Akıllı QR Menü \u0026 Rezervasyon',
    category: 'SaaS Solution',
    desc: 'Restoran ve cafeler için geliştirilmiş, sipariş yönetimi ve dijital ödeme sistemlerini kapsayan kapsamlı SaaS platformu.',
    tech: ['Next.js', 'PostgreSQL', 'Node.js', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80\u0026w=2340\u0026auto=format\u0026fit=crop',
    link: '#',
    github: '#',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-950/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
            >
              Portfolyo
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-bold text-white"
            >
              Öne Çıkan <span className="gradient-text">Projelerim</span>
            </motion.h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="group flex items-center gap-2 text-white font-semibold hover:text-indigo-400 transition-colors">
              Tüm Projeleri Gör
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group flex flex-col bg-slate-900/40 rounded-[2rem] border border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10 opacity-60" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex-grow flex flex-col">
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest px-2 py-1 rounded bg-indigo-500/10">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a 
                    href={project.link}
                    className="flex-grow flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-indigo-400 hover:text-white transition-all duration-300"
                  >
                    Projeyi İncele
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <a 
                    href={project.github}
                    className="p-3 rounded-xl glass border border-white/10 text-white hover:bg-white/10 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Globe, Zap, Settings, ShieldCheck } from 'lucide-react'

const services = [
  {
    title: 'Özel Backend Geliştirme',
    desc: 'ASP.NET Core ve Web API kullanarak yüksek performanslı, güvenli ve ölçeklenebilir sunucu taraflı çözümler.',
    icon: Code2,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Kurumsal Admin Panelleri',
    desc: 'İş süreçlerinizi yönetmek için modern, hızlı ve kullanıcı dostu özel yönetim arayüzleri ve dashboardlar.',
    icon: Settings,
    color: 'from-purple-500 to-pink-600',
  },
  {
    title: 'CRM & Otomasyon',
    desc: 'Manuel işlemleri azaltan, verimliliği artıran ve müşteri ilişkilerinizi güçlendiren akıllı otomasyon sistemleri.',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Sistem Entegrasyonları',
    desc: 'Farklı platformlar ve API\'lar arasında sorunsuz veri akışı sağlayan mimari tasarımlar ve implementasyonlar.',
    icon: Database,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    title: 'Bulut Mimarisi & DevOps',
    desc: 'Azure ve Docker kullanarak uygulamalarınızın kesintisiz ve yüksek erişilebilirlikte çalışmasını sağlayan kurulumlar.',
    icon: Globe,
    color: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Güvenlik & Optimizasyon',
    desc: 'Mevcut sistemlerinizin güvenlik açıklarını kapatma ve performans darboğazlarını giderme çalışmaları.',
    icon: ShieldCheck,
    color: 'from-rose-500 to-red-600',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Hizmetlerim
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            İşletmeniz İçin <span className="gradient-text">Güçlü Çözümler</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Teknoloji yığınım ve deneyimimle, işletmenizin dijital dönüşümünü hızlandırıyor ve operasyonel mükemmellik sağlıyorum.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-3xl glass border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden"
            >
              {/* Background Glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-8 shadow-lg shadow-black/20`}>
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                {service.title}
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm">
                {service.desc}
              </p>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

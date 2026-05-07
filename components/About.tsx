'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Globe, Zap, Cpu, Server, Layers, Workflow } from 'lucide-react'

const skills = [
  { icon: Code2, name: 'ASP.NET Core', level: 95, color: 'from-blue-400 to-indigo-500' },
  { icon: Database, name: 'Web API \u0026 Microservices', level: 90, color: 'from-purple-400 to-pink-500' },
  { icon: Server, name: 'SQL Server \u0026 PostgreSQL', level: 92, color: 'from-cyan-400 to-blue-500' },
  { icon: Workflow, name: 'CRM \u0026 Otomasyon', level: 88, color: 'from-emerald-400 to-teal-500' },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Side: About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">Hakkımda</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-8 leading-tight">
              Sadece Kod Yazmıyorum, <br />
              <span className="gradient-text">Değer Üretiyorum</span>
            </h3>
            
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Modern teknolojileri kullanarak ölçeklenebilir backend sistemleri, kurumsal admin panelleri ve iş otomasyon araçları oluşturma konusunda uzmanlaşmış bir <span className="text-white font-semibold">Backend Mimarıyım.</span>
              </p>
              <p>
                İş gereksinimlerini derinlemesine anlayarak, bunları büyümeyi ve verimliliği artıran teknik çözümlere dönüştürüyorum. Temiz kod prensipleri ve modern mimari yaklaşımlarla, işletmenizin gelecekteki ihtiyaçlarına da yanıt verecek sistemler kuruyorum.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="p-6 rounded-2xl glass border border-white/5">
                  <div className="text-3xl font-black text-white mb-1">5+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Yıllık Deneyim</div>
                </div>
                <div className="p-6 rounded-2xl glass border border-white/5">
                  <div className="text-3xl font-black text-white mb-1">50+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Başarılı Proje</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Skills \u0026 "Currently Building" */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative overflow-hidden"
            >
              <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-indigo-400" />
                Teknoloji Yığınım
              </h4>
              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-gray-300 font-bold text-sm tracking-wide">{skill.name}</span>
                      <span className="text-indigo-400 font-black text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: 'circOut' }}
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Currently Building Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 rounded-[2.5rem] gradient-bg relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-white/80 text-xs font-black uppercase tracking-[0.2em] mb-4">
                  <Layers className="w-4 h-4 animate-bounce" />
                  Şu An Ne Geliştiriyorum?
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Multi-Tenant AI SaaS Altyapısı
                </h4>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Ölçeklenebilir, yapay zeka destekli ve mikroservis mimarisine sahip yeni nesil bir SaaS framework üzerinde çalışıyorum.
                </p>
                <div className="flex items-center gap-4 text-xs font-bold text-white">
                  <span className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                    Aktif Geliştirme
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10">v0.8.4</span>
                </div>
              </div>
              
              {/* Decorative graphic */}
              <div className="absolute -right-8 -bottom-8 opacity-20 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Workflow size={120} className="text-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

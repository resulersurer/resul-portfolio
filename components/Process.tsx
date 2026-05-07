'use client'

import { motion } from 'framer-motion'
import { Search, Lightbulb, Code2, Rocket, CheckCircle2 } from 'lucide-react'

const steps = [
  {
    title: 'Analiz \u0026 Strateji',
    desc: 'İş gereksinimlerinizi derinlemesine inceliyor ve en verimli teknik yol haritasını oluşturuyorum.',
    icon: Search,
    color: 'bg-blue-500/10 text-blue-400',
  },
  {
    title: 'Mimari Tasarım',
    desc: 'Ölçeklenebilir, güvenli ve geleceğe hazır bir sistem mimarisi tasarlıyorum.',
    icon: Lightbulb,
    color: 'bg-purple-500/10 text-purple-400',
  },
  {
    title: 'Geliştirme \u0026 Test',
    desc: 'En iyi uygulamalarla kodluyor, her aşamada titizlikle test ederek sağlam bir yapı kuruyorum.',
    icon: Code2,
    color: 'bg-indigo-500/10 text-indigo-400',
  },
  {
    title: 'Deployment \u0026 Yayım',
    desc: 'Sistemi bulut altyapısına optimize ederek canlıya alıyor ve sorunsuz geçiş sağlıyorum.',
    icon: Rocket,
    color: 'bg-cyan-500/10 text-cyan-400',
  },
]

export default function Process() {
  return (
    <section id="process" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-950/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Süreç
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
          >
            Fikirden <span className="gradient-text">Gerçeğe</span> Dönüşüm
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Projelerimi disiplinli ve şeffaf bir süreçle yöneterek, hedeflerinize en hızlı ve güvenilir şekilde ulaşmanızı sağlıyorum.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Number */}
              <div className="absolute -top-6 -left-2 text-8xl font-black text-white/[0.03] select-none group-hover:text-white/[0.05] transition-colors duration-500">
                0{index + 1}
              </div>

              {/* Icon Container */}
              <div className={`w-20 h-20 rounded-3xl ${step.color} border border-white/5 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                <step.icon size={32} />
                {/* Completed Marker */}
                <div className="absolute -right-2 -bottom-2 bg-slate-900 rounded-full p-1 border border-white/10">
                  <CheckCircle2 size={16} className="text-green-400" />
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                {step.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed px-4 group-hover:text-gray-400 transition-colors duration-300">
                {step.desc}
              </p>

              {/* Mobile Connector */}
              {index !== steps.length - 1 \u0026\u0026 (
                <div className="md:hidden w-px h-12 bg-gradient-to-b from-indigo-500/20 to-transparent mt-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Mail, MessageSquare, Send, Calendar, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Text \u0026 Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4">İletişim</h2>
            <h3 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-tight">
              Birlikte <span className="gradient-text">Geliştirelim</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-md">
              Yeni bir proje fikriniz mi var veya mevcut sisteminizi ölçeklendirmek mi istiyorsunuz? Hemen iletişime geçin, teknik stratejinizi birlikte kurgulayalım.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'resul@ersurer.com', href: 'mailto:resul@ersurer.com' },
                { icon: MessageSquare, label: 'WhatsApp', value: '+90 5XX XXX XX XX', href: '#' },
                { icon: Calendar, label: 'Toplantı Planla', value: 'Calendly Üzerinden', href: '#' },
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href}
                  className="flex items-center gap-6 p-4 rounded-2xl glass border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group w-fit pr-10"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{item.label}</div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-10 rounded-[3rem] glass border border-white/10 relative overflow-hidden"
          >
            {/* Form Title */}
            <h4 className="text-2xl font-bold text-white mb-8">Hızlı Mesaj Gönder</h4>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Ad Soyad</label>
                  <input 
                    type="text" 
                    placeholder="Resul Ersürer"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">E-Posta</label>
                  <input 
                    type="email" 
                    placeholder="resul@example.com"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Konu</label>
                <select className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all duration-300 appearance-none">
                  <option>Backend Projesi</option>
                  <option>API Entegrasyonu</option>
                  <option>Otomasyon Sistemleri</option>
                  <option>Diğer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mesajınız</label>
                <textarea 
                  rows={4} 
                  placeholder="Projenizden bahsedin..."
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-5 gradient-bg text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 group transition-all duration-300"
              >
                Mesajı Gönder
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </motion.button>
            </form>

            {/* Decorative dots */}
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

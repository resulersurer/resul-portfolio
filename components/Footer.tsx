'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Mail, href: 'mailto:resul@ersurer.com', label: 'Email' },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="flex items-center gap-2"
            >
              <img src="/images/logo.png" alt="Ersürer Logo" className="h-10 w-auto" />
            </motion.div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
              Enterprise düzeyde ölçeklenebilir backend mimarileri ve akıllı otomasyon sistemleri inşa eden kurumsal yazılım ortağınız.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    whileHover={{ y: -5, backgroundColor: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)' }}
                    className="w-12 h-12 rounded-2xl glass border border-white/5 flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-all duration-300"
                    aria-label={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em]">Hızlı Linkler</h4>
            <ul className="space-y-4">
              {[
                { name: 'Hizmetler', href: '#services' },
                { name: 'Portfolyo', href: '#portfolio' },
                { name: 'Hakkımda', href: '#about' },
                { name: 'İletişim', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 flex items-center group text-sm">
                    <span className="w-0 group-hover:w-4 h-px bg-indigo-400 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick View */}
          <div className="space-y-8">
            <h4 className="text-white font-bold text-sm uppercase tracking-[0.2em]">Uzmanlıklar</h4>
            <ul className="space-y-4 text-sm">
              <li className="text-gray-400">ASP.NET Core \u0026 Web API</li>
              <li className="text-gray-400">Microservices Mimarisi</li>
              <li className="text-gray-400">Azure \u0026 Cloud Solutions</li>
              <li className="text-gray-400">CRM \u0026 ERP Otomasyonları</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 text-gray-500 text-sm">
            <p>© {currentYear} Resul Ersürer. Tüm hakları saklıdır.</p>
            <span className="hidden md:block w-1 h-1 bg-gray-700 rounded-full" />
            <p className="flex items-center gap-1.5">
              Next.js \u0026 Tailwind ile <Heart className="w-4 h-4 text-red-500 fill-current" /> ile geliştirildi.
            </p>
          </div>
          
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-indigo-500 transition-all duration-300"
            aria-label="Yukarı Çık"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

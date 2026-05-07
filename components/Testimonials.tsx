'use client'

import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Ahmet Yılmaz',
    role: 'CTO, Tech Solutions',
    content: 'Resul ile çalışmak projemiz için verdiğimiz en iyi karardı. Karmaşık backend mimarimizi mükemmel bir şekilde kurguladı ve teslimat süresinden önce tamamladı.',
    image: 'https://i.pravatar.cc/150?u=ahmet',
  },
  {
    name: 'Elif Kaya',
    role: 'Ürün Müdürü, E-Ticaret A.Ş.',
    content: 'Otomasyon sistemlerimiz sayesinde verimliliğimiz %40 arttı. Teknik bilgisi kadar çözüm odaklı yaklaşımı da bizi çok etkiledi.',
    image: 'https://i.pravatar.cc/150?u=elif',
  },
  {
    name: 'Murat Demir',
    role: 'Kurucu, Startup Hub',
    content: 'Yüksek trafikli uygulamamızın performans darboğazlarını 1 hafta içinde çözdü. Gerçek bir backend uzmanı arıyorsanız doğru yerdesiniz.',
    image: 'https://i.pravatar.cc/150?u=murat',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-950/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-4"
          >
            Yorumlar
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Müşteri <span className="gradient-text">Deneyimleri</span>
          </motion.h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] glass border border-white/5 flex flex-col relative group overflow-hidden"
            >
              {/* Floating Quote Icon */}
              <div className="absolute top-6 right-8 text-white/5 group-hover:text-indigo-500/20 transition-colors duration-500">
                <Quote size={80} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-indigo-400 text-indigo-400" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed italic mb-8 flex-grow relative z-10">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>

              {/* Decorative side line */}
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

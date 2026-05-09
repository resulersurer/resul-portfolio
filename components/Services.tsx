'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Database, Globe, Zap, Settings, ShieldCheck, Copy, X, CheckCircle, Loader2, Wallet, AlertCircle } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import toast, { Toaster } from 'react-hot-toast'

const ICON_MAP: Record<string, any> = {
  Code2, Database, Globe, Zap, Settings, ShieldCheck
}

const WALLET_ADDRESS = 'TWResKHqM7tpuAuFyioAWfQbrj5XfV2LCi'

interface Service {
  id: string
  title: string
  description: string
  price: number
  priceUnit: string
  icon: string
  color: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [txid, setTxid] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services')
      const data = await res.json()
      if (data.services) setServices(data.services)
    } catch (err) {
      console.error('Error fetching services:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const openPaymentModal = (serviceTitle: string) => {
    setSelectedService(serviceTitle)
    setIsModalOpen(true)
    setTxid('')
    setIsSuccess(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedService(null)
      setTxid('')
      setIsSubmitting(false)
      setIsSuccess(false)
    }, 300)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(WALLET_ADDRESS)
    toast.success('Cüzdan adresi kopyalandı', {
      icon: '✓',
      style: {
        background: '#10b981',
        color: '#fff',
      },
    })
  }

  const handleSubmit = async () => {
    if (txid.length < 20) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    toast.success('Ödeme bildirimi alındı!', {
      icon: '✓',
      style: {
        background: '#10b981',
        color: '#fff',
      },
    })
    
    // Close modal after success
    setTimeout(() => {
      closeModal()
    }, 2000)
  }

  const isTxidValid = txid.length >= 20

  return (
    <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <Toaster position="top-center" />
      
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
              className="group relative p-8 rounded-3xl glass border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col"
            >
              {/* Background Glow */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
              
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 mb-8 shadow-lg shadow-black/20`}>
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                  {(() => {
                    const Icon = ICON_MAP[service.icon] || Code2
                    return <Icon className="w-7 h-7 text-white" />
                  })()}
                </div>
              </div>

              <h4 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors duration-300">
                {service.title}
              </h4>
              <p className="text-gray-400 leading-relaxed text-sm flex-grow">
                {service.description}
              </p>

              {/* USDT Payment Button */}
              <button
                onClick={() => openPaymentModal(service.title)}
                className="mt-6 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                USDT ile Öde
              </button>

              {/* Bottom decorative line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* USDT Payment Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-gray-900/95 border border-gray-700/50 rounded-2xl p-5 sm:p-6 max-w-md w-full shadow-2xl backdrop-blur-xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">USDT TRC20</h3>
                    {selectedService && (
                      <p className="text-xs text-gray-400">{selectedService}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* QR Code Section */}
              <div className="mb-5">
                <div className="flex justify-center mb-3">
                  <div className="p-3 sm:p-4 bg-white rounded-xl shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20">
                    <QRCodeSVG value={WALLET_ADDRESS} size={140} className="sm:w-[160px] sm:h-[160px]" />
                  </div>
                </div>
                
                {/* Network Badge */}
                <div className="flex justify-center mb-2">
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs font-medium text-emerald-400">
                    USDT • TRC20 Network
                  </span>
                </div>
                
                <p className="text-center text-xs text-gray-500">
                  QR kodu Binance veya Trust Wallet ile okutabilirsiniz.
                </p>
              </div>

              {/* Wallet Address */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Cüzdan Adresi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={WALLET_ADDRESS}
                    readOnly
                    className="flex-1 px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                  <button
                    onClick={copyAddress}
                    className="p-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-all active:scale-95"
                    title="Kopyala"
                  >
                    <Copy className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Warning */}
              <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-200 leading-relaxed">
                    Sadece USDT TRC20 ağı üzerinden gönderim yapınız. Yanlış ağdan yapılan transferlerde varlık kaybı yaşanabilir.
                  </p>
                </div>
              </div>

              {/* Payment Steps Info Card */}
              <div className="mb-4 p-3 bg-gray-800/50 border border-gray-700/50 rounded-xl">
                <h4 className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                  Ödeme Adımları
                </h4>
                <ol className="space-y-1.5 text-xs text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-medium">1.</span>
                    <span>QR kodu okutun veya adresi kopyalayın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-medium">2.</span>
                    <span>USDT TRC20 ağı üzerinden gönderim yapın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-medium">3.</span>
                    <span>İşlem tamamlandıktan sonra TXID girin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-medium">4.</span>
                    <span>"Ödeme Bildir" butonuna basın</span>
                  </li>
                </ol>
              </div>

              {/* TXID Input */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  TXID / Transaction Hash
                </label>
                <input
                  type="text"
                  value={txid}
                  onChange={(e) => setTxid(e.target.value)}
                  placeholder="İşlem numarasını girin (en az 20 karakter)"
                  className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className={`text-xs ${txid.length > 0 && !isTxidValid ? 'text-red-400' : 'text-gray-500'}`}>
                    {txid.length}/20 karakter
                  </span>
                  {isTxidValid && (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Geçerli
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSubmit}
                  disabled={!isTxidValid || isSubmitting || isSuccess}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                    isSuccess
                      ? 'bg-emerald-500 text-white'
                      : !isTxidValid
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90 active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Bildirildi!
                    </>
                  ) : (
                    'Ödeme Bildir'
                  )}
                </button>
                
                <button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="py-2.5 px-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium text-sm transition-all disabled:opacity-50"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Mail, Wallet, Settings, ExternalLink, ClipboardList, LogOut 
} from 'lucide-react'

interface AdminSidebarProps {
  activeTab: 'messages' | 'payments' | 'services' | 'projects'
  setActiveTab: (tab: 'messages' | 'payments' | 'services' | 'projects') => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  unreadCount: number
  pendingPayments: number
  handleLogout: () => void
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  unreadCount,
  pendingPayments,
  handleLogout
}: AdminSidebarProps) {
  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900/95 lg:bg-slate-900/50 
      backdrop-blur-xl border-r border-white/5 flex flex-col
      transition-transform duration-300 lg:translate-x-0
      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-8 lg:mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">Admin<span className="text-indigo-400">Hub</span></span>
        </div>

        <nav className="space-y-2">
          <button 
            onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'messages' 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Mail className="w-4 h-4" />
            Gelen Mesajlar
            {unreadCount > 0 && (
              <span className="ml-auto bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full">{unreadCount}</span>
            )}
          </button>
          <button 
            onClick={() => { setActiveTab('payments'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'payments' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wallet className="w-4 h-4" />
            USDT Ödemeleri
            {pendingPayments > 0 && (
              <span className="ml-auto bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingPayments}</span>
            )}
          </button>
          <button 
            onClick={() => { setActiveTab('services'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'services' 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            Hizmet Yönetimi
          </button>
          <button 
            onClick={() => { setActiveTab('projects'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'projects' 
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Proje Yönetimi
          </button>
          <a 
            href="/admin/firmalar"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-slate-400 hover:text-white hover:bg-white/5"
          >
            <ClipboardList className="w-4 h-4" />
            Firma Takip
          </a>
        </nav>
      </div>

      <div className="mt-auto p-4 lg:p-6 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-bold text-sm transition-all"
        >
          <LogOut className="w-4 h-4" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  )
}

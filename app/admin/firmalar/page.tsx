'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Search,
  Filter,
  Phone,
  MessageSquare,
  CalendarDays,
  CheckCircle2,
  X,
  Pencil,
  Trash2,
  ExternalLink,
  ClipboardList,
  Clock3,
  Calendar,
  Zap,
  ArrowUpDown,
  ChevronLeft,
  FileText,
  CheckSquare,
} from 'lucide-react'

const WEBSITE_STATUSES = [
  'Web sitesi yok',
  'Web sitesi görünmüyor',
  'Sadece sosyal medya var',
  'Eski web sitesi var',
  'Doğrulanacak',
]

const LEAD_STATUSES = [
  'Yeni',
  'Aranacak',
  'Arandı',
  'Ulaşılamadı',
  'İlgileniyor',
  'Teklif Gönderildi',
  'Randevu Alındı',
  'Müşteri Oldu',
  'İlgilenmiyor',
]

const MEETING_TYPES = ['Telefon', 'WhatsApp', 'Yüz yüze', 'Online']
const MEETING_STATUS = ['Planlandı', 'Tamamlandı', 'İptal', 'Ertelendi']

interface Meeting {
  id: string
  type: string
  scheduledAt: string
  status: string
  notes: string | null
}

interface LeadCompany {
  id: string
  name: string
  sector: string
  district: string
  phone: string
  websiteStatus: string
  leadStatus: string
  lastContactedAt: string | null
  nextFollowUpAt: string | null
  notes: string | null
  meetings: Meeting[]
  createdAt: string
  updatedAt: string
}

const initialForm = {
  name: '',
  sector: '',
  district: '',
  phone: '',
  websiteStatus: 'Web sitesi yok',
  leadStatus: 'Yeni',
  lastContactedAt: '',
  nextFollowUpAt: '',
  notes: '',
}

const initialMeeting = {
  type: 'Telefon',
  date: '',
  time: '',
  status: 'Planlandı',
  notes: '',
}

export default function AdminLeadPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<LeadCompany[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sectorFilter, setSectorFilter] = useState('')
  const [districtFilter, setDistrictFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false)
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<LeadCompany | null>(null)
  const [formState, setFormState] = useState(initialForm)
  const [meetingState, setMeetingState] = useState(initialMeeting)
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/leads')
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }

      if (!response.ok) {
        throw new Error('Leads not fetched')
      }

      const data = await response.json()
      setLeads(data.leads)
    } catch (err) {
      console.error(err)
      setError('Firma verileri yüklenirken sorun oluştu')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = [lead.name, lead.phone].some((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
      const matchesSector = sectorFilter ? lead.sector === sectorFilter : true
      const matchesDistrict = districtFilter ? lead.district === districtFilter : true
      const matchesStatus = statusFilter ? lead.leadStatus === statusFilter : true
      return matchesSearch && matchesSector && matchesDistrict && matchesStatus
    })
  }, [leads, searchQuery, sectorFilter, districtFilter, statusFilter])

  const uniqueOptions = (field: 'sector' | 'district') => {
    return Array.from(new Set(leads.map((item) => item[field]))).sort()
  }

  const formatDate = (value: string | null) => {
    if (!value) return '-'
    return new Date(value).toLocaleString('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const sanitizePhone = (value: string) => {
    return value.replace(/[^0-9+]/g, '')
  }

  const openPhone = (phone: string) => {
    window.open(`tel:${sanitizePhone(phone)}`)
  }

  const openWhatsApp = (phone: string) => {
    const clean = sanitizePhone(phone).replace(/^\+/, '')
    window.open(`https://wa.me/${clean}`)
  }

  const resetForm = () => {
    setFormState(initialForm)
    setEditingLead(null)
  }

  const openAddLead = () => {
    resetForm()
    setIsLeadModalOpen(true)
  }

  const handleEditLead = (lead: LeadCompany) => {
    setEditingLead(lead)
    setFormState({
      name: lead.name,
      sector: lead.sector,
      district: lead.district,
      phone: lead.phone,
      websiteStatus: lead.websiteStatus,
      leadStatus: lead.leadStatus,
      lastContactedAt: lead.lastContactedAt ? lead.lastContactedAt.slice(0, 16) : '',
      nextFollowUpAt: lead.nextFollowUpAt ? lead.nextFollowUpAt.slice(0, 16) : '',
      notes: lead.notes ?? '',
    })
    setIsLeadModalOpen(true)
  }

  const handleSubmitLead = async () => {
    const payload: Record<string, any> = {
      name: formState.name.trim(),
      sector: formState.sector.trim(),
      district: formState.district.trim(),
      phone: formState.phone.trim(),
      websiteStatus: formState.websiteStatus,
      leadStatus: formState.leadStatus,
      notes: formState.notes.trim(),
    }

    if (formState.lastContactedAt) payload.lastContactedAt = new Date(formState.lastContactedAt).toISOString()
    if (formState.nextFollowUpAt) payload.nextFollowUpAt = new Date(formState.nextFollowUpAt).toISOString()

    try {
      const response = await fetch(editingLead ? `/api/admin/leads/${editingLead.id}` : '/api/admin/leads', {
        method: editingLead ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Kaydedilemedi')

      const data = await response.json()
      if (editingLead) {
        setLeads((prev) => prev.map((item) => (item.id === editingLead.id ? { ...item, ...data.lead } : item)))
      } else {
        setLeads((prev) => [data.lead, ...prev])
      }
      setIsLeadModalOpen(false)
      resetForm()
    } catch (err) {
      console.error(err)
      alert('Firma kaydedilirken hata oluştu')
    }
  }

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Bu firmayı silmek istediğinizden emin misiniz?')) return
    try {
      const response = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' })
      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Silinemedi')
      setLeads((prev) => prev.filter((item) => item.id !== id))
    } catch (err) {
      console.error(err)
      alert('Silme işlemi sırasında hata oluştu')
    }
  }

  const handleOpenMeeting = (leadId: string) => {
    setSelectedLeadId(leadId)
    setMeetingState(initialMeeting)
    setIsMeetingModalOpen(true)
  }

  const handleSubmitMeeting = async () => {
    if (!selectedLeadId) return
    if (!meetingState.date || !meetingState.time) {
      alert('Lütfen tarih ve saat seçin')
      return
    }

    try {
      const response = await fetch(`/api/admin/leads/${selectedLeadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meeting: {
            type: meetingState.type,
            status: meetingState.status,
            scheduledAt: new Date(`${meetingState.date}T${meetingState.time}`).toISOString(),
            notes: meetingState.notes.trim(),
          },
        }),
      })

      if (response.status === 401) {
        router.push('/admin/login')
        return
      }
      if (!response.ok) throw new Error('Randevu oluşturulamadı')

      const data = await response.json()
      setLeads((prev) => prev.map((item) => (item.id === selectedLeadId ? { ...item, ...data.lead } : item)))
      setIsMeetingModalOpen(false)
      setSelectedLeadId(null)
    } catch (err) {
      console.error(err)
      alert('Randevu oluşturulurken hata oluştu')
    }
  }

  const leadSummary = useMemo(() => {
    return {
      total: filteredLeads.length,
      planned: filteredLeads.filter((lead) => lead.leadStatus === 'Randevu Alındı').length,
      newLeads: filteredLeads.filter((lead) => lead.leadStatus === 'Yeni').length,
    }
  }, [filteredLeads])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-slate-400 text-xs uppercase tracking-[0.3em] mb-2">
              <ClipboardList className="w-4 h-4" />
              Firma Takip / Leads
            </div>
            <h1 className="text-3xl font-black">İstanbul Potansiyel Firmalar</h1>
            <p className="mt-2 text-slate-400 max-w-2xl">
              Web sitesi olmayan ya da doğrulanması gereken potansiyel firmaların takibi için özel admin yönetim paneli.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/admin"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              Admin Dashboard
            </a>
            <button
              onClick={openAddLead}
              className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400 transition"
            >
              <Plus className="w-4 h-4" />
              Firma Ekle
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3 mb-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20">
            <p className="text-slate-400 text-sm">Toplam Firma</p>
            <p className="mt-2 text-3xl font-black text-white">{leadSummary.total}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20">
            <p className="text-slate-400 text-sm">Yeni Leads</p>
            <p className="mt-2 text-3xl font-black text-white">{leadSummary.newLeads}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20">
            <p className="text-slate-400 text-sm">Randevu Alındı</p>
            <p className="mt-2 text-3xl font-black text-white">{leadSummary.planned}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/20 mb-6">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr] items-end">
            <label className="block">
              <span className="text-sm text-slate-400">Ara / Firma adı / Telefon</span>
              <div className="mt-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Firma ara..."
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm text-slate-400">Sektör</span>
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 px-4 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Tümü</option>
                {uniqueOptions('sector').map((sector) => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-slate-400">İlçe</span>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 px-4 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Tümü</option>
                {uniqueOptions('district').map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm text-slate-400">Lead Durumu</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 py-3 px-4 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">Tümü</option>
                {LEAD_STATUSES.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-900/80 shadow-xl shadow-slate-950/20">
          <table className="min-w-full divide-y divide-white/10 text-left">
            <thead className="bg-slate-950/95 text-slate-400 text-[13px] uppercase tracking-[0.18em]">
              <tr>
                <th className="px-4 py-4">Firma</th>
                <th className="px-4 py-4">Sektör</th>
                <th className="px-4 py-4">İlçe</th>
                <th className="px-4 py-4">Telefon</th>
                <th className="px-4 py-4">Web Durumu</th>
                <th className="px-4 py-4">Lead Durumu</th>
                <th className="px-4 py-4">Son Görüşme</th>
                <th className="px-4 py-4">Takip</th>
                <th className="px-4 py-4">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-white">{lead.name}</div>
                    {lead.notes ? <div className="mt-1 text-slate-400 text-sm truncate max-w-[220px]">{lead.notes}</div> : <div className="mt-1 text-slate-500 text-sm">Not yok</div>}
                  </td>
                  <td className="px-4 py-4 text-slate-300">{lead.sector}</td>
                  <td className="px-4 py-4 text-slate-300">{lead.district}</td>
                  <td className="px-4 py-4 text-slate-300">
                    <div className="flex flex-col gap-2">
                      <span>{lead.phone}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => openPhone(lead.phone)} className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-200 hover:bg-slate-700 transition"><Phone className="w-3.5 h-3.5" /> Ara</button>
                        <button onClick={() => openWhatsApp(lead.phone)} className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-emerald-200 hover:bg-emerald-500/30 transition"><Zap className="w-3.5 h-3.5" /> WhatsApp</button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{lead.websiteStatus}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] bg-white/5 text-slate-100">
                      {lead.leadStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-300">{formatDate(lead.lastContactedAt)}</td>
                  <td className="px-4 py-4 text-slate-300">{formatDate(lead.nextFollowUpAt)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => handleEditLead(lead)} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-slate-200 hover:bg-white/10 transition"><Pencil className="w-4 h-4" /> Düzenle</button>
                      <button onClick={() => handleOpenMeeting(lead.id)} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-blue-500/10 px-3 py-2 text-[12px] text-blue-200 hover:bg-blue-500/20 transition"><CalendarDays className="w-4 h-4" /> Randevu</button>
                      <button onClick={() => handleDeleteLead(lead.id)} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-red-500/10 px-3 py-2 text-[12px] text-red-200 hover:bg-red-500/20 transition"><Trash2 className="w-4 h-4" /> Sil</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && !loading && (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-slate-500">Filtrelerinize uygun firma bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black">{editingLead ? 'Firma Düzenle' : 'Yeni Firma Ekle'}</h2>
                <p className="mt-1 text-slate-400 text-sm">Potansiyel firmanın bilgilerini girin ve takip sürecini yönetin.</p>
              </div>
              <button onClick={() => setIsLeadModalOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-400">Firma Adı</span>
                <input value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Sektör</span>
                <input value={formState.sector} onChange={(e) => setFormState({ ...formState, sector: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">İlçe</span>
                <input value={formState.district} onChange={(e) => setFormState({ ...formState, district: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Telefon</span>
                <input value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Web sitesi durumu</span>
                <select value={formState.websiteStatus} onChange={(e) => setFormState({ ...formState, websiteStatus: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20">
                  {WEBSITE_STATUSES.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Lead durumu</span>
                <select value={formState.leadStatus} onChange={(e) => setFormState({ ...formState, leadStatus: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20">
                  {LEAD_STATUSES.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Son görüşme tarihi</span>
                <input type="datetime-local" value={formState.lastContactedAt} onChange={(e) => setFormState({ ...formState, lastContactedAt: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Takip tarihi</span>
                <input type="datetime-local" value={formState.nextFollowUpAt} onChange={(e) => setFormState({ ...formState, nextFollowUpAt: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm text-slate-400">Notlar</span>
                <textarea value={formState.notes} onChange={(e) => setFormState({ ...formState, notes: e.target.value })} rows={4} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button onClick={() => setIsLeadModalOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">İptal</button>
              <button onClick={handleSubmitLead} className="rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition">Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {isMeetingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-slate-950/60">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-black">Randevu / Görüşme Oluştur</h2>
                <p className="mt-1 text-slate-400 text-sm">Seçili firma için telefon, WhatsApp veya yüz yüze görüşme planlayın.</p>
              </div>
              <button onClick={() => setIsMeetingModalOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm text-slate-400">Görüşme Tipi</span>
                <select value={meetingState.type} onChange={(e) => setMeetingState({ ...meetingState, type: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20">
                  {MEETING_TYPES.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Durum</span>
                <select value={meetingState.status} onChange={(e) => setMeetingState({ ...meetingState, status: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20">
                  {MEETING_STATUS.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Randevu Tarihi</span>
                <input type="date" value={meetingState.date} onChange={(e) => setMeetingState({ ...meetingState, date: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block">
                <span className="text-sm text-slate-400">Randevu Saati</span>
                <input type="time" value={meetingState.time} onChange={(e) => setMeetingState({ ...meetingState, time: e.target.value })} className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm text-slate-400">Notlar</span>
                <textarea value={meetingState.notes} onChange={(e) => setMeetingState({ ...meetingState, notes: e.target.value })} rows={4} className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
              <button onClick={() => setIsMeetingModalOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 transition">İptal</button>
              <button onClick={handleSubmitMeeting} className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition">Oluştur</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

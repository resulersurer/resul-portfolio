import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const leads = await prisma.leadCompany.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        meetings: {
          orderBy: { scheduledAt: 'desc' },
        },
      },
    })

    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Leadleri getirirken hata:', error)
    return NextResponse.json({ error: 'Leadler yüklenemedi' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const {
      name,
      sector,
      district,
      phone,
      websiteStatus,
      leadStatus,
      notes,
      lastContactedAt,
      nextFollowUpAt,
    } = body

    if (!name || !sector || !district || !phone) {
      return NextResponse.json({ error: 'Firma adı, sektör, ilçe ve telefon gereklidir.' }, { status: 400 })
    }

    const lead = await prisma.leadCompany.create({
      data: {
        name,
        sector,
        district,
        phone,
        websiteStatus: websiteStatus || 'Web sitesi yok',
        leadStatus: leadStatus || 'Yeni',
        notes: notes || null,
        lastContactedAt: lastContactedAt ? new Date(lastContactedAt) : null,
        nextFollowUpAt: nextFollowUpAt ? new Date(nextFollowUpAt) : null,
      },
    })

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    console.error('Lead oluştururken hata:', error)
    return NextResponse.json({ error: 'Lead oluşturulamadı' }, { status: 500 })
  }
}

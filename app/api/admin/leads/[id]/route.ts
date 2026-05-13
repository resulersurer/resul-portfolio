import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '@/lib/auth'

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    const body = await request.json()
    const { name, sector, district, phone, websiteStatus, leadStatus, notes, lastContactedAt, nextFollowUpAt, meeting } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (sector !== undefined) updateData.sector = sector
    if (district !== undefined) updateData.district = district
    if (phone !== undefined) updateData.phone = phone
    if (websiteStatus !== undefined) updateData.websiteStatus = websiteStatus
    if (leadStatus !== undefined) updateData.leadStatus = leadStatus
    if (notes !== undefined) updateData.notes = notes || null
    if (lastContactedAt !== undefined) updateData.lastContactedAt = lastContactedAt ? new Date(lastContactedAt) : null
    if (nextFollowUpAt !== undefined) updateData.nextFollowUpAt = nextFollowUpAt ? new Date(nextFollowUpAt) : null

    let lead = null
    if (Object.keys(updateData).length > 0) {
      lead = await prisma.leadCompany.update({
        where: { id: params.id },
        data: updateData,
        include: {
          meetings: {
            orderBy: { scheduledAt: 'desc' },
          },
        },
      })
    } else {
      lead = await prisma.leadCompany.findUnique({
        where: { id: params.id },
        include: {
          meetings: {
            orderBy: { scheduledAt: 'desc' },
          },
        },
      })
    }

    if (meeting) {
      await prisma.leadMeeting.create({
        data: {
          companyId: params.id,
          type: meeting.type,
          status: meeting.status,
          scheduledAt: new Date(meeting.scheduledAt),
          notes: meeting.notes || null,
        },
      })
    }

    const updatedLead = await prisma.leadCompany.findUnique({
      where: { id: params.id },
      include: {
        meetings: {
          orderBy: { scheduledAt: 'desc' },
        },
      },
    })

    return NextResponse.json({ success: true, lead: updatedLead })
  } catch (error) {
    console.error('Lead güncellenirken hata:', error)
    return NextResponse.json({ error: 'Lead güncellenemedi' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await isAuthenticated(request)
  if (authError) return authError

  try {
    await prisma.leadCompany.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead silinirken hata:', error)
    return NextResponse.json({ error: 'Lead silinemedi' }, { status: 500 })
  }
}

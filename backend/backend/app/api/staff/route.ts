import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const storeId = req.nextUrl.searchParams.get('storeId')

    const staff = await prisma.staff.findMany({
      where: storeId ? { storeId } : undefined,
      include: {
        sessions: {
          where: { status: { in: ['pending', 'started'] } },
          include: {
            room: true,
            serviceItem: true,
          },
        },
      },
      orderBy: [{ queuePosition: 'asc' }, { createdAt: 'asc' }],
    })

    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { storeId, name, phone, employeeNo } = await req.json()

    if (!storeId || !name?.trim()) {
      return NextResponse.json({ error: '缺少必要欄位' }, { status: 400 })
    }

    const maxPos = await prisma.staff.aggregate({
      where: { storeId },
      _max: { queuePosition: true },
    })

    const staff = await prisma.staff.create({
      data: {
        storeId,
        name: name.trim(),
        phone: phone?.trim() || null,
        employeeNo: employeeNo?.trim() || null,
        status: 'queue',
        queuePosition: (maxPos._max.queuePosition ?? -1) + 1,
      },
    })

    return NextResponse.json(staff)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { staffId, status, queuePosition, name, phone, employeeNo } = await req.json()

    const updateData: Record<string, unknown> = {}
    if (status !== undefined) updateData.status = status
    if (queuePosition !== undefined) updateData.queuePosition = queuePosition
    if (name !== undefined) updateData.name = name.trim()
    if (phone !== undefined) updateData.phone = phone?.trim() || null
    if (employeeNo !== undefined) updateData.employeeNo = employeeNo?.trim() || null

    const staffMember = await prisma.staff.update({
      where: { id: staffId },
      data: updateData,
    })

    return NextResponse.json(staffMember)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { staffId } = await req.json()

    if (!staffId) {
      return NextResponse.json({ error: '缺少 staffId' }, { status: 400 })
    }

    await prisma.staff.delete({ where: { id: staffId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

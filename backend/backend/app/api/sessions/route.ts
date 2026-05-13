import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const storeId = req.nextUrl.searchParams.get('storeId')

    const sessions = await prisma.serviceSession.findMany({
      where: storeId ? { storeId } : undefined,
      include: {
        room: true,
        staff: true,
        member: true,
        serviceItem: true,
      },
      orderBy: { arrivalTime: 'desc' },
    })

    return NextResponse.json(sessions)
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const session = await prisma.serviceSession.create({
      data: {
        storeId: data.storeId,
        roomId: data.roomId,
        staffId: data.staffId,
        serviceItemId: data.serviceItemId,
        arrivalTime: new Date(data.arrivalTime),
        status: 'pending',
      },
      include: {
        room: true,
        staff: true,
        serviceItem: true,
      },
    })

    // 更新房間狀態
    await prisma.room.update({
      where: { id: data.roomId },
      data: { status: 'serving' },
    })

    // 更新師傅狀態
    await prisma.staff.update({
      where: { id: data.staffId },
      data: { status: 'serving' },
    })

    return NextResponse.json(session, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { sessionId, status } = await req.json()

    const session = await prisma.serviceSession.update({
      where: { id: sessionId },
      data: { status, endTime: status === 'completed' ? new Date() : undefined },
      include: {
        room: true,
        staff: true,
      },
    })

    // 如果完成，更新房間和師傅狀態
    if (status === 'completed') {
      await prisma.room.update({
        where: { id: session.roomId },
        data: { status: 'cleaning' },
      })

      await prisma.staff.update({
        where: { id: session.staffId },
        data: { status: 'queue' },
      })
    }

    return NextResponse.json(session)
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

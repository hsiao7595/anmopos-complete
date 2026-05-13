import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const storeId = req.nextUrl.searchParams.get('storeId')

    const rooms = await prisma.room.findMany({
      where: storeId ? { storeId } : undefined,
      include: {
        sessions: {
          where: { status: { in: ['pending', 'started'] } },
          include: {
            staff: true,
            serviceItem: true,
          },
        },
      },
      orderBy: { number: 'asc' },
    })

    return NextResponse.json(rooms)
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { roomId, status } = await req.json()

    const room = await prisma.room.update({
      where: { id: roomId },
      data: { status },
    })

    return NextResponse.json(room)
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

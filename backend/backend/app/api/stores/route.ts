import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const stores = await prisma.store.findMany({
      include: {
        _count: {
          select: {
            rooms: true,
            staff: true,
            orders: true,
          },
        },
      },
    })

    return NextResponse.json(stores)
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

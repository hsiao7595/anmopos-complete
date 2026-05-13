import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    // 檢查數據庫連接
    await prisma.$queryRaw`SELECT 1`

    const stores = await prisma.store.count()
    const rooms = await prisma.room.count()
    const staff = await prisma.staff.count()

    return NextResponse.json(
      {
        status: 'ok',
        message: '✅ 後台系統運行正常',
        timestamp: new Date().toISOString(),
        database: {
          stores,
          rooms,
          staff,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: '❌ 數據庫連接失敗',
        error: String(error),
      },
      { status: 500 }
    )
  }
}

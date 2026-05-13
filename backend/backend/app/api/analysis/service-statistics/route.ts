import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

const STORE_ID_MAP: Record<string, string> = {
  'store-main': 'store-2',
  'store-zubulao': 'store-1',
}

function normalizeStoreId(storeId: string): string {
  return STORE_ID_MAP[storeId] ?? storeId
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const storeId = searchParams.get('storeId')
    const year = searchParams.get('year')
    const month = searchParams.get('month')

    if (!storeId) {
      return NextResponse.json(
        { error: '需要 storeId 參數' },
        { status: 400 }
      )
    }

    const normalizedStoreId = normalizeStoreId(storeId)

    const where: Record<string, unknown> = { storeId: normalizedStoreId }

    // 如果指定月份，過濾日期
    if (year && month) {
      const paddedMonth = String(month).padStart(2, '0')
      const startDate = `${year}-${paddedMonth}-01`
      const endDate = `${year}-${paddedMonth}-${new Date(Number(year), Number(month), 0).getDate()}`
      where.date = {
        gte: startDate,
        lte: endDate,
      }
    }

    // 從資料庫查詢
    const entries = await prisma.guestEntry.findMany({
      where,
      orderBy: [{ date: 'desc' }, { arrivalTime: 'desc' }],
    })

    // 統計各服務項目
    const serviceStats: Record<string, { count: number; people: number; amount: number }> = {}
    let totalCustomers = 0
    let totalAmount = 0

    entries.forEach((entry) => {
      const service = entry.serviceType || '未分類'
      if (!serviceStats[service]) {
        serviceStats[service] = { count: 0, people: 0, amount: 0 }
      }
      serviceStats[service].count++
      serviceStats[service].people += entry.people
      serviceStats[service].amount += entry.amount
      totalCustomers += entry.people
      totalAmount += entry.amount
    })

    // 轉換為陣列並排序
    const stats = Object.entries(serviceStats)
      .map(([service, data]) => ({
        service,
        count: data.count,
        people: data.people,
        percentage: totalCustomers > 0 ? ((data.people / totalCustomers) * 100).toFixed(1) : '0',
        amount: data.amount,
      }))
      .sort((a, b) => b.people - a.people)

    return NextResponse.json({
      storeId: normalizedStoreId,
      period: year && month ? `${year}-${String(month).padStart(2, '0')}` : '全期間',
      totalCustomers,
      totalAmount,
      totalEntries: entries.length,
      serviceStats: stats,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

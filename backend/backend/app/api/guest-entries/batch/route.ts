import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

const STORE_ID_MAP: Record<string, string> = {
  'store-main': 'store-2',
  'store-zubulao': 'store-1',
}

function normalizeStoreId(storeId: string): string {
  return STORE_ID_MAP[storeId] ?? storeId
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const entries = data.entries || []

    if (!Array.isArray(entries)) {
      return NextResponse.json(
        { error: 'entries 必須是陣列' },
        { status: 400 }
      )
    }

    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ index: number; error: string }>,
    }

    // 逐筆處理，確保數據完整性
    for (let i = 0; i < entries.length; i++) {
      try {
        const entry = entries[i]
        const storeId = normalizeStoreId(entry.storeId)

        const fields = {
          storeId,
          date: String(entry.date ?? ''),
          arrivalTime: String(entry.arrivalTime ?? ''),
          people: Number(entry.people) || 1,
          serviceType: String(entry.serviceType ?? ''),
          minutes: Number(entry.minutes) || 0,
          master: String(entry.master ?? ''),
          room: String(entry.room ?? ''),
          checkoutTime: String(entry.checkoutTime ?? ''),
          amount: Number(entry.amount) || 0,
          paymentMethod: String(entry.paymentMethod ?? 'cash'),
          note: String(entry.note ?? ''),
          source: String(entry.source ?? 'import'),
        }

        // 使用 upsert 防止重複
        if (entry.externalId) {
          await prisma.guestEntry.upsert({
            where: { externalId: entry.externalId },
            update: fields,
            create: { ...fields, externalId: entry.externalId },
          })
        } else {
          await prisma.guestEntry.create({ data: fields })
        }

        results.success++
      } catch (error) {
        results.failed++
        results.errors.push({
          index: i,
          error: error instanceof Error ? error.message : String(error),
        })
      }
    }

    return NextResponse.json(results, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

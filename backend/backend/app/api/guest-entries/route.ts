import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

const STORE_ID_MAP: Record<string, string> = {
  'store-main': 'store-2',
  'store-zubulao': 'store-1',
}

function normalizeStoreId(storeId: string): string {
  return STORE_ID_MAP[storeId] ?? storeId
}

function lastDayOfMonth(year: string, month: string): string {
  const day = new Date(Number(year), Number(month), 0).getDate()
  return `${year}-${String(month).padStart(2, '0')}-${day}`
}

function buildFields(data: Record<string, unknown>, storeId: string) {
  return {
    storeId,
    date: String(data.date ?? ''),
    arrivalTime: String(data.arrivalTime ?? ''),
    people: Number(data.people) || 1,
    serviceType: String(data.serviceType ?? ''),
    minutes: Number(data.minutes) || 0,
    master: String(data.master ?? ''),
    room: String(data.room ?? ''),
    checkoutTime: String(data.checkoutTime ?? ''),
    amount: Number(data.amount) || 0,
    paymentMethod: String(data.paymentMethod ?? 'cash'),
    note: String(data.note ?? ''),
    source: String(data.source ?? 'manual'),
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const storeId = searchParams.get('storeId')
    const year = searchParams.get('year')
    const month = searchParams.get('month')

    const where: Record<string, unknown> = {}
    if (storeId) where.storeId = normalizeStoreId(storeId)
    if (year && month) {
      const paddedMonth = String(month).padStart(2, '0')
      where.date = {
        gte: `${year}-${paddedMonth}-01`,
        lte: lastDayOfMonth(year, month),
      }
    }

    const entries = await prisma.guestEntry.findMany({
      where,
      orderBy: [{ date: 'asc' }, { arrivalTime: 'asc' }],
    })

    return NextResponse.json(entries)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const storeId = normalizeStoreId(data.storeId)
    const fields = buildFields(data, storeId)

    const entry = data.externalId
      ? await prisma.guestEntry.upsert({
          where: { externalId: data.externalId },
          update: fields,
          create: { ...fields, externalId: data.externalId },
        })
      : await prisma.guestEntry.create({ data: fields })

    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()
    await prisma.guestEntry.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

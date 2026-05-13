import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const storeId = searchParams.get('storeId')

    if (!storeId) {
      return NextResponse.json(
        { error: '需要 storeId' },
        { status: 400 }
      )
    }

    const accounts = await prisma.account.findMany({
      where: { storeId },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        status: true,
        lastLogin: true,
      },
    })

    return NextResponse.json(accounts)
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password, fullName, employeeNo, storeId, role } = await req.json()

    if (!username || !password || !storeId) {
      return NextResponse.json(
        { error: '缺少必要欄位' },
        { status: 400 }
      )
    }

    // 檢查帳號是否已存在
    const existing = await prisma.account.findFirst({
      where: { username },
    })

    if (existing) {
      return NextResponse.json(
        { error: '帳號已存在' },
        { status: 409 }
      )
    }

    const account = await prisma.account.create({
      data: {
        storeId,
        username,
        password, // 生產環境應使用bcrypt加密
        fullName: fullName || username,
        employeeNo,
        role: role || 'staff',
        status: 'active',
      },
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

// 初始化預設帳號
export async function PUT(req: NextRequest) {
  try {
    const stores = await prisma.store.findMany()

    const defaultAccounts = []

    for (const store of stores) {
      // 檢查是否已有預設帳號
      const existing = await prisma.account.findFirst({
        where: {
          storeId: store.id,
          username: 'admin',
        },
      })

      if (!existing) {
        const account = await prisma.account.create({
          data: {
            storeId: store.id,
            username: 'admin',
            password: 'demo123', // 預設密碼
            fullName: '管理員',
            role: 'admin',
            status: 'active',
          },
        })
        defaultAccounts.push(account)
      }
    }

    return NextResponse.json({
      message: '預設帳號初始化完成',
      created: defaultAccounts.length,
      accounts: defaultAccounts.map(a => ({
        storeId: a.storeId,
        username: a.username,
        role: a.role,
      })),
    })
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

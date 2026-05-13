import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { username, password, storeId } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: '請輸入帳號和密碼' },
        { status: 400 }
      )
    }

    // 查詢帳號
    const account = await prisma.account.findFirst({
      where: {
        username,
        ...(storeId && { storeId }),
      },
      include: { store: true },
    })

    if (!account) {
      return NextResponse.json(
        { error: '帳號或密碼錯誤' },
        { status: 401 }
      )
    }

    // 檢查帳號狀態
    if (account.status === 'locked') {
      return NextResponse.json(
        { error: '帳號已被鎖定，請聯絡管理員' },
        { status: 403 }
      )
    }

    if (account.status === 'inactive') {
      return NextResponse.json(
        { error: '帳號已停用' },
        { status: 403 }
      )
    }

    // 簡單的密碼驗證（生產環境應使用bcrypt）
    const passwordMatch = password === account.password

    if (!passwordMatch) {
      return NextResponse.json(
        { error: '帳號或密碼錯誤' },
        { status: 401 }
      )
    }

    // 更新最後登入時間
    await prisma.account.update({
      where: { id: account.id },
      data: { lastLogin: new Date() },
    })

    // 設置session cookie
    const response = NextResponse.json(
      {
        success: true,
        accountId: account.id,
        username: account.username,
        fullName: account.fullName || account.username,
        role: account.role,
        store: {
          id: account.store.id,
          name: account.store.name,
        },
      },
      { status: 200 }
    )

    // 設置secure cookie
    response.cookies.set('auth-token', JSON.stringify({
      accountId: account.id,
      storeId: account.storeId,
      username: account.username,
      role: account.role,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24小時
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '登入失敗' },
      { status: 500 }
    )
  }
}

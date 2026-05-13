import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 允许访问的路由（不需要认证）
  const publicRoutes = ['/login', '/api/auth/login', '/api/auth/accounts', '/api/stores']

  // 检查是否是公开路由
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // 检查认证 cookie
  const authToken = request.cookies.get('auth-token')

  if (!authToken) {
    // 如果是 API 路由，返回 401
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: '未认证' }, { status: 401 })
    }

    // 如果是页面路由，重定向到登入页
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public 文件夹中的文件
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}

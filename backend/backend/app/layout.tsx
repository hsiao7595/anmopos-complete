import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "按摩店POS後台 - 進場系統",
  description: "實時進場、房間管理、師傅輪排",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-50">
        <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-6">
            <span className="font-bold text-gray-800 text-sm mr-2">按摩店後台</span>
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition px-3 py-1 rounded-lg hover:bg-blue-50"
            >
              監控中心
            </Link>
            <Link
              href="/staff"
              className="text-sm text-gray-600 hover:text-blue-600 font-medium transition px-3 py-1 rounded-lg hover:bg-blue-50"
            >
              師傅管理
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

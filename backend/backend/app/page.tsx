'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

export default function Home() {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    })

    newSocket.on('connect', () => {
      console.log('Connected to server')
      setConnected(true)
      setMessage('✅ 已連接到後台')
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server')
      setConnected(false)
      setMessage('❌ 已斷開連接')
    })

    newSocket.on('error', (error) => {
      console.error('Socket error:', error)
      setMessage(`⚠️ 錯誤: ${error}`)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-2">按摩店POS</h1>
        <p className="text-center text-gray-600 mb-8">後台進場系統 v1.0</p>

        <div className="space-y-6">
          <div className={`p-4 rounded-lg text-center font-semibold ${
            connected
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {message || '初始化中...'}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg space-y-2 text-sm">
            <p className="font-semibold text-blue-900">🚀 開發進度</p>
            <ul className="text-blue-800 space-y-1 ml-4">
              <li>✅ Next.js 14 框架</li>
              <li>✅ Prisma + SQLite</li>
              <li>✅ Socket.io 層</li>
              <li>⏳ API 路由</li>
              <li>⏳ 前台集成</li>
              <li>⏳ UI 頁面</li>
            </ul>
          </div>

          <div className="pt-4 border-t space-y-2">
            <p className="text-xs text-gray-500">連接地址:</p>
            <code className="block bg-gray-100 p-2 rounded text-xs text-gray-700 break-all">
              http://localhost:3001
            </code>
          </div>
        </div>
      </div>
    </main>
  )
}

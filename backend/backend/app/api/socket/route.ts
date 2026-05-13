import { NextRequest } from 'next/server'
import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

let io: SocketIOServer

export async function GET(req: NextRequest) {
  if (!io) {
    const httpServer = createServer()
    io = new SocketIOServer(httpServer, {
      cors: {
        origin: ['http://localhost:3000', 'http://localhost:5173', '*'],
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      console.log('👤 客戶端連接:', socket.id)

      socket.on('guest:checkin', (data) => {
        console.log('📍 新進場:', data)
        io.emit('guest:checkin', data)
      })

      socket.on('room:status-change', (data) => {
        console.log('🚪 房間狀態變化:', data)
        io.emit('room:status-change', data)
      })

      socket.on('staff:status-change', (data) => {
        console.log('👨 師傅狀態變化:', data)
        io.emit('staff:status-change', data)
      })

      socket.on('order:checkout', (data) => {
        console.log('💰 結帳:', data)
        io.emit('order:checkout', data)
      })

      socket.on('disconnect', () => {
        console.log('👤 客戶端斷開:', socket.id)
      })
    })
  }

  return new Response('Socket.io server running')
}

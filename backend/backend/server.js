import http from 'http'
import { Server } from 'socket.io'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const httpServer = http.createServer()
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173', '*'],
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.SOCKET_PORT || 3001

io.on('connection', (socket) => {
  console.log('🟢 客戶端連接:', socket.id)

  socket.emit('connection:success', {
    message: '✅ 已連接到 Socket.io 服務器',
    timestamp: new Date().toISOString(),
  })

  // 進場事件
  socket.on('guest:checkin', async (data) => {
    console.log('📍 新進場:', data)

    // 先廣播（不等待 DB），確保實時性
    io.emit('guest:checkin', {
      storeId: data.storeId,
      storeName: data.storeName || '',
      roomId: data.roomId,
      roomNumber: data.roomNumber || data.roomId,
      roomName: data.roomName || data.roomNumber || data.roomId,
      staffId: data.staffId,
      staffName: data.staffName || '',
      serviceName: data.serviceName || '',
      arrivalTime: data.arrivalTime || new Date().toISOString(),
      timestamp: new Date().toISOString(),
    })

    // 嘗試儲存至 DB（非同步，失敗不影響廣播）
    try {
      if (data.storeId && data.roomId && data.staffId && data.serviceItemId) {
        const session = await prisma.serviceSession.create({
          data: {
            storeId: data.storeId,
            roomId: data.roomId,
            staffId: data.staffId,
            serviceItemId: data.serviceItemId,
            arrivalTime: new Date(data.arrivalTime),
            status: 'pending',
          },
        })
        await prisma.room.update({ where: { id: data.roomId }, data: { status: 'serving' } })
        await prisma.staff.update({ where: { id: data.staffId }, data: { status: 'serving' } })
        socket.emit('guest:checkin:success', { sessionId: session.id })
      }
    } catch (error) {
      console.log('⚠️ DB 儲存失敗（事件已廣播）:', error.message)
    }
  })

  // 房間狀態變化
  socket.on('room:status-change', async (data) => {
    console.log('🚪 房間狀態變化:', data)

    io.emit('room:status-change', {
      roomId: data.roomId,
      roomNumber: data.roomNumber || data.roomId,
      roomName: data.roomName || data.roomNumber || data.roomId,
      status: data.status,
      timestamp: new Date().toISOString(),
    })

    try {
      if (data.roomId && !data.roomId.startsWith('room-') && !data.roomId.startsWith('zbl-')) {
        await prisma.room.update({ where: { id: data.roomId }, data: { status: data.status } })
      }
    } catch (error) {
      console.log('⚠️ DB 更新失敗（事件已廣播）:', error.message)
    }
  })

  // 師傅狀態變化
  socket.on('staff:status-change', async (data) => {
    console.log('👨 師傅狀態變化:', data)

    io.emit('staff:status-change', {
      staffId: data.staffId,
      staffName: data.staffName || '',
      status: data.status,
      queuePosition: data.queuePosition,
      timestamp: new Date().toISOString(),
    })

    try {
      if (data.staffId && !data.staffId.startsWith('staff-')) {
        await prisma.staff.update({
          where: { id: data.staffId },
          data: { status: data.status, queuePosition: data.queuePosition },
        })
      }
    } catch (error) {
      console.log('⚠️ DB 更新失敗（事件已廣播）:', error.message)
    }
  })

  // 結帳事件
  socket.on('order:checkout', async (data) => {
    console.log('💰 結帳:', data)

    io.emit('order:checkout', {
      sessionId: data.sessionId,
      roomId: data.roomId,
      roomName: data.roomName || '',
      staffId: data.staffId,
      staffName: data.staffName || '',
      amount: data.amount,
      paymentMethod: data.paymentMethod || 'cash',
      timestamp: new Date().toISOString(),
    })

    try {
      if (data.sessionId && data.sessionId.startsWith('cm')) {
        const session = await prisma.serviceSession.update({
          where: { id: data.sessionId },
          data: { status: 'completed', endTime: new Date() },
          include: { room: true, staff: true },
        })
        await prisma.room.update({ where: { id: session.roomId }, data: { status: 'cleaning' } })
        await prisma.staff.update({ where: { id: session.staffId }, data: { status: 'queue' } })
      }
    } catch (error) {
      console.log('⚠️ DB 更新失敗（事件已廣播）:', error.message)
    }
  })

  socket.on('disconnect', () => {
    console.log('🔴 客戶端斷開:', socket.id)
  })
})

httpServer.listen(PORT, () => {
  console.log(`\n🚀 Socket.io 服務器運行在: http://localhost:${PORT}`)
  console.log('✅ 准備接收連接...\n')
})

process.on('SIGINT', async () => {
  console.log('\n正在關閉...')
  await prisma.$disconnect()
  process.exit(0)
})

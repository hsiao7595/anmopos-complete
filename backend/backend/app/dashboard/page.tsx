'use client'

import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

interface Store {
  id: string
  name: string
  color: string
}

interface Room {
  id: string
  number: string
  status: string
}

interface Staff {
  id: string
  name: string
  status: string
  queuePosition: number
}

interface SessionDisplay {
  id: string
  arrivalTime: string
  roomName: string
  staffName: string
  serviceName?: string
  status?: string
}

export default function Dashboard() {
  const [connected, setConnected] = useState(false)
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStore, setSelectedStore] = useState('store-1')
  const [rooms, setRooms] = useState<Room[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [sessions, setSessions] = useState<SessionDisplay[]>([])
  const [todayGuests, setTodayGuests] = useState(0)

  // Socket.io 連接
  useEffect(() => {
    const socket = io('http://localhost:3001', {
      reconnection: true,
      reconnectionDelay: 1000,
      transports: ['websocket', 'polling'],
    })

    socket.on('connect', () => {
      setConnected(true)
      console.log('✅ 後台已連接')
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })

    // 進場事件（來自前台 POS）
    socket.on('guest:checkin', (data) => {
      const display: SessionDisplay = {
        id: data.id || String(Date.now()),
        arrivalTime: data.arrivalTime || new Date().toISOString(),
        roomName: data.roomName || data.roomNumber || '未知',
        staffName: data.staffName || '未知',
        serviceName: data.serviceName || '',
        status: 'active',
      }
      setSessions((prev) => [display, ...prev.slice(0, 14)])
      setTodayGuests((prev) => prev + 1)
    })

    // 房間狀態變化
    socket.on('room:status-change', (data) => {
      setRooms((prev) =>
        prev.map((r) => (r.id === data.roomId ? { ...r, status: data.status } : r))
      )
    })

    // 師傅狀態變化
    socket.on('staff:status-change', (data) => {
      setStaff((prev) =>
        prev.map((s) => (s.id === data.staffId ? { ...s, status: data.status } : s))
      )
    })

    // 結帳事件 - 重新整理房間和師傅列表
    socket.on('order:checkout', () => {
      fetch(`/api/rooms?storeId=${selectedStore}`)
        .then((res) => res.json())
        .then((data) => setRooms(data))
      fetch(`/api/staff?storeId=${selectedStore}`)
        .then((res) => res.json())
        .then((data) => setStaff(data))
    })

    return () => socket.disconnect()
  }, [selectedStore])

  // 從 API 載入資料
  useEffect(() => {
    fetch('/api/stores')
      .then((res) => res.json())
      .then((data) => setStores(data))

    fetch(`/api/rooms?storeId=${selectedStore}`)
      .then((res) => res.json())
      .then((data) => setRooms(data))

    fetch(`/api/staff?storeId=${selectedStore}`)
      .then((res) => res.json())
      .then((data) => setStaff(data))

    fetch(`/api/sessions?storeId=${selectedStore}`)
      .then((res) => res.json())
      .then((data: any[]) => {
        // 統計今日進場
        const today = new Date().toDateString()
        const todaySessions = data.filter(
          (s) => new Date(s.arrivalTime).toDateString() === today
        )
        setTodayGuests(todaySessions.length)

        // 顯示最近10筆
        setSessions(
          data.slice(0, 10).map((s) => ({
            id: s.id,
            arrivalTime: s.arrivalTime,
            roomName: s.room?.number ? `${s.room.number}號房` : '—',
            staffName: s.staff?.name || '—',
            serviceName: s.serviceItem?.name || '',
            status: s.status,
          }))
        )
      })
  }, [selectedStore])

  const statusColors: Record<string, string> = {
    idle: 'bg-blue-100 text-blue-800 border-blue-200',
    serving: 'bg-purple-200 text-purple-900 border-purple-300',
    cleaning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    maintenance: 'bg-red-100 text-red-800 border-red-200',
    queue: 'bg-green-100 text-green-800 border-green-200',
    break: 'bg-gray-100 text-gray-600 border-gray-200',
    leave: 'bg-orange-100 text-orange-800 border-orange-200',
    offduty: 'bg-zinc-100 text-zinc-400 border-zinc-200',
  }

  const statusLabel: Record<string, string> = {
    idle: '空房',
    serving: '服務中',
    cleaning: '清理中',
    maintenance: '維修',
    queue: '候排',
    break: '休息',
    leave: '請假',
    offduty: '下班',
    pending: '待服務',
    started: '服務中',
    completed: '已完成',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* 頭部 */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-800">按摩店 POS 後台監控</h1>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${connected ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                {connected ? '即時連線中' : '未連線'}
              </span>
            </div>
            <div className="flex gap-2">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => setSelectedStore(store.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    selectedStore === store.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {store.name}
                </button>
              ))}
            </div>
          </div>

          {/* 統計卡片 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-500 mb-1">今日進客</p>
              <p className="text-3xl font-bold text-blue-600">{todayGuests}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-xs text-gray-500 mb-1">服務中房間</p>
              <p className="text-3xl font-bold text-purple-600">
                {rooms.filter((r) => r.status === 'serving').length}
                <span className="text-base font-normal text-gray-400"> / {rooms.length}</span>
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-xs text-gray-500 mb-1">候排師傅</p>
              <p className="text-3xl font-bold text-green-600">
                {staff.filter((s) => s.status === 'queue').length}
                <span className="text-base font-normal text-gray-400"> / {staff.length}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* 房間面板 */}
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <h2 className="text-base font-bold mb-3 text-gray-700">房間狀態</h2>
            <div className="grid grid-cols-3 gap-2">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-3 rounded-lg text-center font-semibold border text-sm ${statusColors[room.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}
                >
                  <div className="text-base font-bold">{room.number} 號</div>
                  <div className="text-xs mt-0.5 opacity-70">{statusLabel[room.status] || room.status}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 師傅輪排 */}
          <div className="bg-white rounded-xl shadow-sm border p-5">
            <h2 className="text-base font-bold mb-3 text-gray-700">師傅輪排</h2>
            <div className="space-y-1.5 max-h-72 overflow-y-auto">
              {staff.map((s, idx) => (
                <div
                  key={s.id}
                  className={`px-3 py-2 rounded-lg flex justify-between items-center border text-sm ${statusColors[s.status] || 'bg-gray-50 border-gray-200'}`}
                >
                  <span className="font-semibold">{idx + 1}. {s.name}</span>
                  <span className="text-xs">{statusLabel[s.status] || s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 進場紀錄 */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h2 className="text-base font-bold mb-3 text-gray-700">最近進場紀錄</h2>
          {sessions.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">尚無進場紀錄</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-xs text-gray-500">
                    <th className="text-left pb-2 pr-4">時間</th>
                    <th className="text-left pb-2 pr-4">房間</th>
                    <th className="text-left pb-2 pr-4">師傅</th>
                    <th className="text-left pb-2 pr-4">服務</th>
                    <th className="text-left pb-2">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-2 pr-4 text-xs text-gray-500 whitespace-nowrap">
                        {new Date(session.arrivalTime).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-2 pr-4 font-semibold">{session.roomName}</td>
                      <td className="py-2 pr-4">{session.staffName}</td>
                      <td className="py-2 pr-4 text-xs text-gray-500 max-w-xs truncate">{session.serviceName || '—'}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          session.status === 'completed'
                            ? 'bg-gray-100 text-gray-500'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {statusLabel[session.status || 'active'] || '服務中'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

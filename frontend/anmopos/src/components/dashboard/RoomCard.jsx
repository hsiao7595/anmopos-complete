import { useState, useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { roomStatusLabels, roomStatusColors, getRoomAlert } from '../../logic/roomStatusLogic'
import { Clock, X, Play, Zap } from 'lucide-react'

export default function RoomCard({ room }) {
  const { sessions, staff, bookings, createSession, cutSession, endSession, updateRoomStatus } = useAppStore()
  const [showOrderMenu, setShowOrderMenu] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const currentSession = sessions.find(s => s.roomId === room.id)
  const booking = bookings.find(b => b.roomId === room.id && b.status === 'scheduled')
  const currentStaff = currentSession ? staff.find(s => s.id === currentSession.staffId) : null

  const renderRoomContent = () => {
    if (room.status === 'empty') {
      return (
        <div className="space-y-2">
          <p className="text-xs text-gray-600">空房</p>
          <div className="space-y-1">
            <button
              onClick={() => setShowOrderMenu(true)}
              className="w-full text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              <Play size={12} className="inline mr-1" />
              開始服務
            </button>
          </div>
        </div>
      )
    }

    if (room.status === 'pending') {
      return (
        <div className="space-y-1">
          <p className="text-xs font-medium text-amber-700">⏳ 已到客</p>
          {currentStaff && <p className="text-xs">{currentStaff.name}</p>}
          <button
            onClick={() => cutSession(currentSession.id)}
            className="w-full text-xs bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600"
          >
            <Zap size={12} className="inline mr-1" />
            切單
          </button>
        </div>
      )
    }

    if (room.status === 'busy' && currentSession) {
      const { services } = useAppStore()
      const service = services.find(s => s.id === currentSession.serviceId)
      const endTime = new Date(currentSession.endTime)
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
      const minutes = Math.floor(remaining / 60)
      const seconds = remaining % 60

      return (
        <div className="space-y-1">
          <p className="text-xs font-medium text-red-700">服務中</p>
          <p className="text-xs text-gray-600">{currentStaff?.name || '待分配'}</p>
          <p className="text-sm font-bold text-red-600">
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </p>
          <button
            onClick={() => endSession(currentSession.id)}
            className="w-full text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            <X size={12} className="inline mr-1" />
            結束
          </button>
        </div>
      )
    }

    if (room.status === 'reserved' && booking) {
      return (
        <div className="space-y-1">
          <p className="text-xs font-medium text-purple-700">預留</p>
          <p className="text-xs font-medium">{booking.customerName}</p>
          <p className="text-xs text-gray-600">{booking.customerPhone}</p>
          <p className="text-xs text-gray-600">
            {new Date(booking.scheduledAt).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="space-y-1">
            <button
              onClick={() => useAppStore.getState().markBookingArrived(booking.id)}
              className="w-full text-xs bg-emerald-500 text-white px-2 py-1 rounded hover:bg-emerald-600"
            >
              已到客
            </button>
            <button
              onClick={() => useAppStore.getState().cancelBooking(booking.id)}
              className="w-full text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
            >
              取消預留
            </button>
          </div>
        </div>
      )
    }

    if (room.status === 'cleaning') {
      return (
        <div className="space-y-1">
          <p className="text-xs text-gray-600">清潔中</p>
          <button
            onClick={() => updateRoomStatus(room.id, 'empty')}
            className="w-full text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            完成清潔
          </button>
        </div>
      )
    }

    return <p className="text-xs text-gray-600">{roomStatusLabels[room.status]}</p>
  }

  return (
    <div className={`rounded-lg p-3 border-2 ${roomStatusColors[room.status] || 'bg-gray-100 border-gray-300'}`}>
      <div className="mb-2">
        <p className="font-bold text-sm">{room.roomNo}</p>
        <p className="text-xs text-gray-700">{room.name}</p>
      </div>

      {renderRoomContent()}

      {showOrderMenu && (
        <QuickOrderMenu
          room={room}
          onClose={() => setShowOrderMenu(false)}
          onSelect={(staffId) => {
            createSession({
              staffId,
              roomId: room.id,
              serviceId: 'srv-001',
              isPending: false,
            })
            setShowOrderMenu(false)
          }}
        />
      )}
    </div>
  )
}

function QuickOrderMenu({ room, onClose, onSelect }) {
  const { staff } = useAppStore()
  const availableStaff = staff.filter(s => s.status === 'empty' || s.status === 'resting')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-xs">
        <h3 className="font-bold mb-3">選擇師傅</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {availableStaff.map(s => (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              className="w-full text-left p-2 hover:bg-gray-100 rounded border"
            >
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-gray-600">{s.specialties.join(', ')}</p>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full mt-3 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          取消
        </button>
      </div>
    </div>
  )
}

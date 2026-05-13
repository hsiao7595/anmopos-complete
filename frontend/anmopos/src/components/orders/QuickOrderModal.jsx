import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { X, AlertCircle } from 'lucide-react'

export default function QuickOrderModal({ isOpen, onClose }) {
  const { rooms, staff, services, createSession } = useAppStore()
  const [selectedRoom, setSelectedRoom] = useState('')
  const [selectedStaff, setSelectedStaff] = useState('')
  const [selectedService, setSelectedService] = useState(services[0]?.id || '')
  const [isPending, setIsPending] = useState(false)

  const assignableStaff = staff.filter(s => s.status === 'empty' || s.status === 'resting')
  const availableRooms = rooms.filter(r => r.status === 'empty' || r.status === 'reserved')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedRoom || !selectedStaff || !selectedService) return

    createSession({
      roomId: selectedRoom,
      staffId: selectedStaff,
      serviceId: selectedService,
      isPending,
    })

    setSelectedRoom('')
    setSelectedStaff('')
    setSelectedService(services[0]?.id || '')
    setIsPending(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">快速開單</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {assignableStaff.length === 0 && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded flex gap-2">
              <AlertCircle size={20} className="text-yellow-700 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">⚠️ 暫無空閒師傅，請先變更師傅狀態或稍後再試</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">房間</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">選擇房間</option>
              {availableRooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.roomNo} - {room.name}
                  {room.status === 'reserved' && ' (已預留)'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">師傅</label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
              disabled={assignableStaff.length === 0}
            >
              <option value="">選擇師傅</option>
              {assignableStaff.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.specialties.join(', ')}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">服務項目</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} ({service.duration}分鐘 - ${service.price})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input
              type="checkbox"
              id="isPending"
              checked={isPending}
              onChange={(e) => setIsPending(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="isPending" className="text-sm text-gray-700">
              待切單（客人已到但尚未開始）
            </label>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={!selectedRoom || !selectedStaff || !selectedService}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              確認開單
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

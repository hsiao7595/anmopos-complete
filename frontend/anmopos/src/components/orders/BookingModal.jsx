import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { X } from 'lucide-react'

export default function BookingModal({ isOpen, onClose }) {
  const { rooms, staff, services, createBooking } = useAppStore()
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [selectedService, setSelectedService] = useState(services[0]?.id || '')
  const [selectedStaff, setSelectedStaff] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!customerName || !customerPhone || !selectedService || !scheduledAt) return

    createBooking({
      customerName,
      customerPhone,
      serviceItemId: selectedService,
      staffId: selectedStaff || null,
      scheduledAt,
      guestCount: parseInt(guestCount),
      roomId: selectedRoom || null,
      note,
    })

    // Reset form
    setCustomerName('')
    setCustomerPhone('')
    setGuestCount(1)
    setSelectedService(services[0]?.id || '')
    setSelectedStaff('')
    setSelectedRoom('')
    setScheduledAt('')
    setNote('')
    onClose()
  }

  if (!isOpen) return null

  const availableRooms = rooms.filter(r => r.status === 'empty')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">新增預約</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名 *</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">電話 *</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">人數</label>
            <input
              type="number"
              min="1"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">服務項目 *</label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            >
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} (${service.price})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">預約時間 *</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">指定師傅</label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">不指定</option>
              {staff.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">指定房間</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">不指定</option>
              {availableRooms.map(room => (
                <option key={room.id} value={room.id}>
                  {room.roomNo} - {room.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">備註</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              rows="2"
            />
          </div>

          <div className="flex gap-2 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              新增預約
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

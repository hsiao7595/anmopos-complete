import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { Zap, X } from 'lucide-react'
import QuickOrderModal from './QuickOrderModal'

export default function BookingsList({ onQuickOrder }) {
  const { bookings, services, rooms, createSession, markBookingArrived, cancelBooking } = useAppStore()
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState(null)

  const activeBookings = bookings.filter(b => b.status === 'scheduled' || b.status === 'arrived')

  const handleMarkArrived = (bookingId) => {
    markBookingArrived(bookingId)
  }

  const handleDirectOrder = (booking) => {
    setSelectedBookingId(booking.id)
    setShowOrderModal(true)
  }

  const getServiceName = (serviceId) => {
    return services.find(s => s.id === serviceId)?.name || '-'
  }

  const getRoomName = (roomId) => {
    return rooms.find(r => r.id === roomId)?.name || '-'
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">姓名</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">電話</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">服務項目</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">預約時間</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">房間</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">狀態</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {activeBookings.map(booking => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{booking.customerName}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{booking.customerPhone}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{getServiceName(booking.serviceItemId)}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(booking.scheduledAt).toLocaleString('zh-TW')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{getRoomName(booking.roomId)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      booking.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {booking.status === 'scheduled' ? '已預約' : '已到客'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm space-x-2">
                    {booking.status === 'scheduled' && (
                      <button
                        onClick={() => handleMarkArrived(booking.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        已到客
                      </button>
                    )}
                    {booking.status === 'arrived' && booking.roomId && (
                      <button
                        onClick={() => handleDirectOrder(booking)}
                        className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-medium"
                      >
                        <Zap size={14} />
                        直接開單
                      </button>
                    )}
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {activeBookings.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>暫無預約</p>
          </div>
        )}
      </div>

      {showOrderModal && selectedBookingId && (
        <QuickOrderModalForBooking
          isOpen={showOrderModal}
          bookingId={selectedBookingId}
          onClose={() => {
            setShowOrderModal(false)
            setSelectedBookingId(null)
          }}
        />
      )}
    </div>
  )
}

function QuickOrderModalForBooking({ isOpen, bookingId, onClose }) {
  const { bookings, rooms, staff, services, createSession, markBookingArrived } = useAppStore()
  const booking = bookings.find(b => b.id === bookingId)
  const [selectedStaff, setSelectedStaff] = useState('')

  if (!booking) return null

  const assignableStaff = staff.filter(s => s.status === 'empty' || s.status === 'resting')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedStaff) return

    createSession({
      roomId: booking.roomId,
      staffId: selectedStaff,
      serviceId: booking.serviceItemId,
      isPending: false,
    })

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="border-b p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">確認開單</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="bg-gray-50 p-3 rounded">
            <p><strong>客戶：</strong> {booking.customerName}</p>
            <p><strong>電話：</strong> {booking.customerPhone}</p>
            <p><strong>服務：</strong> {services.find(s => s.id === booking.serviceItemId)?.name}</p>
            <p><strong>房間：</strong> {rooms.find(r => r.id === booking.roomId)?.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">選擇師傅 *</label>
            <select
              value={selectedStaff}
              onChange={(e) => setSelectedStaff(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">請選擇</option>
              {assignableStaff.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.specialties.join(', ')}
                </option>
              ))}
            </select>
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
              disabled={!selectedStaff}
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-400"
            >
              開單
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

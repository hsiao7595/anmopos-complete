import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { Plus } from 'lucide-react'
import StaffQueue from './StaffQueue'
import RoomGrid from './RoomGrid'
import BookingsList from '../orders/BookingsList'
import BookingModal from '../orders/BookingModal'
import QuickOrderModal from '../orders/QuickOrderModal'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('staff')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const { storeName } = useAppStore()

  const tabs = [
    { id: 'staff', label: '現場師傅' },
    { id: 'rooms', label: '房間位置' },
    { id: 'bookings', label: '本日預約' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{storeName} - POS 系統</h1>
            <button
              onClick={() => setShowBookingModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              新增預約
            </button>
          </div>

          <div className="flex gap-2 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'staff' && <StaffQueue />}
        {activeTab === 'rooms' && <RoomGrid />}
        {activeTab === 'bookings' && <BookingsList onQuickOrder={() => setShowOrderModal(true)} />}
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />

      <QuickOrderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />
    </div>
  )
}

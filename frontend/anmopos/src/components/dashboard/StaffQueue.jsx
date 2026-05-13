import { useAppStore } from '../../store/useAppStore'
import { ChevronDown } from 'lucide-react'

const statusPriority = {
  empty: 0,
  resting: 1,
  reserved: 2,
  arriving: 3,
  working: 4,
  out: 5,
  day_off: 6,
  off: 7,
}

const statusLabels = {
  empty: '閒置',
  resting: '休息中',
  reserved: '已預約',
  arriving: '即將到達',
  working: '服務中',
  out: '外出',
  day_off: '休假',
  off: '下班',
}

const statusColors = {
  empty: 'bg-green-100 text-green-800',
  resting: 'bg-yellow-100 text-yellow-800',
  reserved: 'bg-blue-100 text-blue-800',
  arriving: 'bg-purple-100 text-purple-800',
  working: 'bg-red-100 text-red-800',
  out: 'bg-gray-100 text-gray-800',
  day_off: 'bg-gray-200 text-gray-800',
  off: 'bg-gray-300 text-gray-800',
}

export default function StaffQueue() {
  const { staff, bookings, updateStaffStatus } = useAppStore()

  const staffWithBookings = staff.map(s => ({
    ...s,
    booking: bookings.find(b => b.staffId === s.id && b.status === 'scheduled'),
  }))

  const sortedStaff = [...staffWithBookings].sort((a, b) => {
    const priorityA = statusPriority[a.status] ?? 999
    const priorityB = statusPriority[b.status] ?? 999
    return priorityA - priorityB
  })

  const getNextStatus = (currentStatus) => {
    const statusOrder = ['empty', 'resting', 'working', 'out', 'day_off']
    const currentIndex = statusOrder.indexOf(currentStatus)
    return statusOrder[(currentIndex + 1) % statusOrder.length]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedStaff.map(staffMember => (
        <div
          key={staffMember.id}
          className="bg-white rounded-lg shadow p-4 border-l-4"
          style={{
            borderLeftColor:
              staffMember.status === 'empty' ? '#10b981' :
              staffMember.status === 'working' ? '#ef4444' :
              staffMember.status === 'resting' ? '#f59e0b' :
              '#6b7280',
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{staffMember.avatar}</div>
              <div>
                <h3 className="font-bold text-lg">{staffMember.name}</h3>
                <div className="flex gap-2 items-center">
                  <span className={`text-xs px-2 py-1 rounded ${statusColors[staffMember.status]}`}>
                    {statusLabels[staffMember.status]}
                  </span>
                  {staffMember.booking && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                      預約 {new Date(staffMember.booking.scheduledAt).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const nextStatus = getNextStatus(staffMember.status)
                updateStaffStatus(staffMember.id, nextStatus)
              }}
              className="p-2 hover:bg-gray-100 rounded"
              title="切換狀態"
            >
              <ChevronDown size={20} />
            </button>
          </div>

          <div className="text-sm text-gray-600">
            <p className="font-medium">專長：</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {staffMember.specialties.map((specialty, idx) => (
                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

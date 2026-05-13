import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockStaff } from '../data/mockStaff'
import { mockServices } from '../data/mockServices'
import { mockRooms, mockBookings } from '../data/mockRooms'

const updateStaffStatus = (staff, staffId, newStatus) => {
  return staff.map(s => s.id === staffId ? { ...s, status: newStatus } : s)
}

const mergeById = (saved, mock) => {
  const map = new Map(mock.map(item => [item.id, item]))
  saved.forEach(item => map.set(item.id, item))
  return Array.from(map.values())
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      storeId: 'yushou',
      storeName: '御手足悦',
      staff: mockStaff,
      services: mockServices,
      rooms: mockRooms,
      bookings: mockBookings,
      sessions: [],

      initializeStore: (storeId, storeName) => {
        const state = get()
        const storeRooms = mockRooms.filter(r => r.storeId === storeId)

        set({
          storeId,
          storeName,
          rooms: storeRooms,
          staff: mockStaff,
          services: mockServices,
          bookings: state.bookings,
          sessions: state.sessions,
        })
      },

      createSession: (payload) => {
        const { staff: currentStaff, rooms: currentRooms } = get()
        const newSession = {
          id: `session-${Date.now()}`,
          staffId: payload.staffId,
          roomId: payload.roomId,
          serviceId: payload.serviceId,
          startTime: null,
          endTime: null,
          status: payload.isPending ? 'pending' : 'active',
          createdAt: new Date().toISOString(),
        }

        if (!payload.isPending) {
          const service = get().services.find(s => s.id === payload.serviceId)
          if (service) {
            const now = new Date()
            newSession.startTime = now.toISOString()
            newSession.endTime = new Date(now.getTime() + service.duration * 60000).toISOString()
          }
        }

        const updatedRoom = currentRooms.find(r => r.id === payload.roomId)
        if (updatedRoom) {
          updatedRoom.status = payload.isPending ? 'pending' : 'busy'
          updatedRoom.currentSessionId = newSession.id
        }

        const updatedStaff = !payload.isPending
          ? updateStaffStatus(currentStaff, payload.staffId, 'working')
          : currentStaff

        set(state => ({
          sessions: [...state.sessions, newSession],
          staff: updatedStaff,
          rooms: currentRooms,
        }))

        return newSession
      },

      cutSession: (sessionId) => {
        const { sessions, staff: currentStaff, rooms: currentRooms } = get()
        const session = sessions.find(s => s.id === sessionId)
        if (!session) return

        const service = get().services.find(s => s.id === session.serviceId)
        const now = new Date()
        const startTime = now.toISOString()
        const endTime = service
          ? new Date(now.getTime() + service.duration * 60000).toISOString()
          : now.toISOString()

        const updatedSession = {
          ...session,
          startTime,
          endTime,
          status: 'active',
        }

        const updatedRoom = currentRooms.find(r => r.id === session.roomId)
        if (updatedRoom) {
          updatedRoom.status = 'busy'
        }

        const updatedStaff = updateStaffStatus(currentStaff, session.staffId, 'working')

        set(state => ({
          sessions: state.sessions.map(s => s.id === sessionId ? updatedSession : s),
          staff: updatedStaff,
          rooms: currentRooms,
        }))
      },

      endSession: (sessionId) => {
        const { sessions, rooms: currentRooms } = get()
        const session = sessions.find(s => s.id === sessionId)
        if (!session) return

        const updatedRoom = currentRooms.find(r => r.id === session.roomId)
        if (updatedRoom) {
          updatedRoom.status = 'cleaning'
          updatedRoom.currentSessionId = null
        }

        set(state => ({
          sessions: state.sessions.map(s =>
            s.id === sessionId ? { ...s, status: 'completed' } : s
          ),
          rooms: currentRooms,
        }))
      },

      updateRoomStatus: (roomId, status) => {
        const { rooms: currentRooms } = get()
        const updatedRoom = currentRooms.find(r => r.id === roomId)
        if (updatedRoom) {
          updatedRoom.status = status
        }
        set({ rooms: currentRooms })
      },

      updateStaffStatus: (staffId, status) => {
        const { staff: currentStaff } = get()
        const updatedStaff = updateStaffStatus(currentStaff, staffId, status)
        set({ staff: updatedStaff })
      },

      createBooking: (payload) => {
        const newBooking = {
          id: `booking-${Date.now()}`,
          storeId: get().storeId,
          customerName: payload.customerName,
          customerPhone: payload.customerPhone,
          serviceItemId: payload.serviceItemId,
          staffId: payload.staffId || null,
          scheduledAt: payload.scheduledAt,
          guestCount: payload.guestCount || 1,
          roomId: payload.roomId || null,
          note: payload.note || '',
          status: 'scheduled',
          createdAt: new Date().toISOString(),
        }

        if (payload.roomId) {
          get().updateRoomStatus(payload.roomId, 'reserved')
        }

        set(state => ({
          bookings: [...state.bookings, newBooking],
        }))

        return newBooking
      },

      cancelBooking: (bookingId) => {
        const { bookings, rooms: currentRooms } = get()
        const booking = bookings.find(b => b.id === bookingId)
        if (!booking) return

        if (booking.roomId) {
          const room = currentRooms.find(r => r.id === booking.roomId)
          if (room && room.status === 'reserved') {
            room.status = 'empty'
          }
        }

        set({
          bookings: bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'cancelled' } : b
          ),
          rooms: currentRooms,
        })
      },

      markBookingArrived: (bookingId) => {
        set(state => ({
          bookings: state.bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'arrived' } : b
          ),
        }))
      },

      migrateState: (savedState) => {
        if (savedState) {
          set({
            storeId: savedState.storeId,
            storeName: savedState.storeName,
            staff: mergeById(savedState.staff || [], mockStaff),
            services: mergeById(savedState.services || [], mockServices),
            rooms: mergeById(savedState.rooms || [], mockRooms),
            bookings: mergeById(savedState.bookings || [], mockBookings),
            sessions: savedState.sessions || [],
          })
        }
      },
    }),
    {
      name: 'app-store',
      version: 1,
    }
  )
)

import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import RoomCard from './RoomCard'

export default function RoomGrid() {
  const { rooms } = useAppStore()
  const regularRooms = rooms.filter(r => r.type === 'room')
  const footRooms = rooms.filter(r => r.type === 'foot')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">按摩房間</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {regularRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>

      {footRooms.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-900">按腳區</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {footRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

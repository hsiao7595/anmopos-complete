
import React from 'react';
const RoomCard = ({ room }) => {
  const isUrgent = room.status === 'busy' && room.timeLeft <= 10;
  const getStatusColor = () => {
    if (room.status === 'empty') return 'border-emerald-500 bg-emerald-500/10 text-emerald-400';
    if (room.status === 'cleaning') return 'border-orange-500 bg-orange-500/10 text-orange-400';
    if (isUrgent) return 'border-red-500 bg-red-500/20 text-red-400 animate-pulse border-2';
    return 'border-blue-500 bg-blue-500/10 text-blue-400';
  };
  return (
    <div className={`p-4 rounded-xl border-2 transition-all ${getStatusColor()} flex flex-col justify-between h-40 shadow-md`}>
      <div className="flex justify-between items-start">
        <span className="text-2xl font-bold">{room.name}</span>
        <span className="text-xs px-2 py-1 rounded bg-black/30 uppercase tracking-wider">
          {room.status === 'busy' ? '服務中' : room.status === 'empty' ? '空閒' : '清消中'}
        </span>
      </div>
      <div className="text-center">
        {room.status === 'busy' ? (
          <div className="text-4xl font-mono font-bold">{room.timeLeft}<span className="text-sm ml-1">min</span></div>
        ) : (
          <div className="text-4xl opacity-20">--</div>
        )}
      </div>
      <div className="flex justify-between items-center text-sm border-t border-white/10 pt-2">
        <span>{room.staff ? `師傅: ${room.staff}` : '待指派'}</span>
        <button className="bg-white/10 hover:bg-white/20 p-1 rounded">詳情</button>
      </div>
    </div>
  );
};
const RoomGrid = ({ rooms }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {rooms.map(room => <RoomCard key={room.id} room={room} />)}
    </div>
  );
};
export default RoomGrid;

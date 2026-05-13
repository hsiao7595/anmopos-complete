export const roomStatusLabels = {
  empty: '空房',
  busy: '服務中',
  cleaning: '清潔中',
  maintenance: '維修中',
  reserved: '預留',
  pending: '已到客',
}

export const roomStatusColors = {
  empty: 'bg-green-100 border-green-300',
  busy: 'bg-blue-100 border-blue-300',
  cleaning: 'bg-yellow-100 border-yellow-300',
  maintenance: 'bg-red-100 border-red-300',
  reserved: 'bg-purple-100 border-purple-300',
  pending: 'bg-amber-100 border-amber-300',
}

export const getRoomAlert = (room, sessions) => {
  const session = sessions.find(s => s.roomId === room.id && (s.status === 'active' || s.status === 'pending'))
  if (!session) return null

  if (session.status === 'pending') {
    return { type: 'info', message: '⏳ 已到客，等待切單' }
  }

  if (session.endTime && new Date(session.endTime) < new Date()) {
    return { type: 'warning', message: '⏰ 時間已到，需要續單或結帳' }
  }

  return null
}

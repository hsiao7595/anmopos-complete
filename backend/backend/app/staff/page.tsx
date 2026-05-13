'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Staff {
  id: string
  name: string
  phone: string | null
  employeeNo: string | null
  status: string
  queuePosition: number
  storeId: string
}

interface Store {
  id: string
  name: string
  color: string
}

const STATUS_LABELS: Record<string, string> = {
  queue: '候排',
  serving: '服務中',
  break: '休息',
  leave: '請假',
  offduty: '下班',
}

const STATUS_COLORS: Record<string, string> = {
  queue: 'bg-green-100 text-green-800 border-green-200',
  serving: 'bg-purple-100 text-purple-800 border-purple-200',
  break: 'bg-gray-100 text-gray-600 border-gray-200',
  leave: 'bg-orange-100 text-orange-800 border-orange-200',
  offduty: 'bg-zinc-100 text-zinc-400 border-zinc-200',
}

const STATUSES = ['queue', 'break', 'leave', 'offduty'] as const

export default function StaffManagement() {
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStore, setSelectedStore] = useState('store-1')
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [newStaff, setNewStaff] = useState({ name: '', phone: '', employeeNo: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ name: '', phone: '', employeeNo: '' })
  const [saving, setSaving] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/stores')
      .then((r) => r.json())
      .then(setStores)
  }, [])

  useEffect(() => {
    loadStaff()
  }, [selectedStore])

  const loadStaff = async () => {
    setLoading(true)
    const res = await fetch(`/api/staff?storeId=${selectedStore}`)
    const data = await res.json()
    setStaff(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  const addStaff = async () => {
    if (!newStaff.name.trim()) return
    setSaving(true)
    await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storeId: selectedStore, ...newStaff }),
    })
    setNewStaff({ name: '', phone: '', employeeNo: '' })
    setShowAdd(false)
    setSaving(false)
    loadStaff()
  }

  const deleteStaff = async (id: string, name: string) => {
    if (!confirm(`確定要刪除師傅「${name}」？\n\n此操作無法復原。`)) return
    await fetch('/api/staff', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId: id }),
    })
    loadStaff()
  }

  const updateStatus = async (staffId: string, status: string) => {
    await fetch('/api/staff', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId, status }),
    })
    setStaff((prev) => prev.map((s) => (s.id === staffId ? { ...s, status } : s)))
  }

  const startEdit = (s: Staff) => {
    setEditingId(s.id)
    setEditData({ name: s.name, phone: s.phone || '', employeeNo: s.employeeNo || '' })
  }

  const saveEdit = async (staffId: string) => {
    setSaving(true)
    await fetch('/api/staff', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ staffId, ...editData }),
    })
    setEditingId(null)
    setSaving(false)
    loadStaff()
  }

  const filtered = staff.filter((s) => {
    const matchStatus = filterStatus === 'all' || s.status === filterStatus
    const matchSearch =
      !search ||
      s.name.includes(search) ||
      (s.employeeNo || '').includes(search) ||
      (s.phone || '').includes(search)
    return matchStatus && matchSearch
  })

  const currentStore = stores.find((s) => s.id === selectedStore)

  const statusCount = (status: string) => staff.filter((s) => s.status === status).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* 頁頭 */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <div className="flex justify-between items-start mb-5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <Link
                  href="/dashboard"
                  className="text-xs text-gray-400 hover:text-blue-600 transition"
                >
                  ← 監控中心
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">師傅管理</h1>
              <p className="text-sm text-gray-500 mt-0.5">新增、編輯、刪除師傅資料與狀態</p>
            </div>
            <div className="flex gap-2">
              {stores.map((store) => (
                <button
                  key={store.id}
                  onClick={() => { setSelectedStore(store.id); setEditingId(null); setShowAdd(false) }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    selectedStore === store.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {store.name}
                </button>
              ))}
            </div>
          </div>

          {/* 統計列 */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-sm text-gray-500">
              共 <span className="font-bold text-gray-800">{staff.length}</span> 位師傅
            </span>
            <span className="text-gray-300">|</span>
            {(['queue', 'serving', 'break', 'leave', 'offduty'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(filterStatus === st ? 'all' : st)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                  filterStatus === st
                    ? STATUS_COLORS[st] + ' shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {STATUS_LABELS[st]}
                <span className="bg-black/10 rounded-full px-1.5 py-0.5 text-xs leading-none">
                  {statusCount(st)}
                </span>
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <input
                className="border rounded-lg px-3 py-1.5 text-sm w-36 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="搜尋姓名/編號"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => { setShowAdd(!showAdd); setEditingId(null) }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition whitespace-nowrap"
              >
                + 新增師傅
              </button>
            </div>
          </div>

          {/* 新增表單 */}
          {showAdd && (
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <h3 className="text-sm font-bold text-green-900 mb-3">
                新增師傅 — {currentStore?.name}
              </h3>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">員工編號</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="如: 001"
                    value={newStaff.employeeNo}
                    onChange={(e) => setNewStaff((p) => ({ ...p, employeeNo: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && addStaff()}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">師傅姓名 <span className="text-red-500">*</span></label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="必填"
                    value={newStaff.name}
                    onChange={(e) => setNewStaff((p) => ({ ...p, name: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && addStaff()}
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600 mb-1 block">聯絡電話</label>
                  <input
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                    placeholder="選填"
                    value={newStaff.phone}
                    onChange={(e) => setNewStaff((p) => ({ ...p, phone: e.target.value }))}
                    onKeyDown={(e) => e.key === 'Enter' && addStaff()}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addStaff}
                  disabled={saving || !newStaff.name.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? '儲存中...' : '確認新增'}
                </button>
                <button
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300"
                >
                  取消
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 師傅列表 */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">載入中...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              {search || filterStatus !== 'all' ? '找不到符合的師傅' : '尚無師傅資料，請點上方「新增師傅」'}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-16">編號</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">姓名</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-36">電話</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 w-20">狀態</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">快速切換狀態</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 w-28">操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) =>
                  editingId === s.id ? (
                    <tr key={s.id} className="border-b bg-blue-50">
                      <td className="px-4 py-2">
                        <input
                          className="w-14 border rounded px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value={editData.employeeNo}
                          onChange={(e) => setEditData((p) => ({ ...p, employeeNo: e.target.value }))}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          className="w-full border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value={editData.name}
                          onChange={(e) => setEditData((p) => ({ ...p, name: e.target.value }))}
                          autoFocus
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          className="w-full border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                          value={editData.phone}
                          onChange={(e) => setEditData((p) => ({ ...p, phone: e.target.value }))}
                        />
                      </td>
                      <td colSpan={2} />
                      <td className="px-4 py-2 text-right">
                        <button
                          onClick={() => saveEdit(s.id)}
                          disabled={saving}
                          className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg mr-1 hover:bg-blue-700 disabled:opacity-50"
                        >
                          {saving ? '...' : '儲存'}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                          取消
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={s.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                        {s.employeeNo ? `#${s.employeeNo}` : '—'}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{s.name}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{s.phone || '—'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${
                            STATUS_COLORS[s.status] || 'bg-gray-100 text-gray-500 border-gray-200'
                          }`}
                        >
                          {STATUS_LABELS[s.status] || s.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {STATUSES.map((st) => (
                            <button
                              key={st}
                              onClick={() => updateStatus(s.id, st)}
                              className={`text-xs px-2 py-0.5 rounded border transition ${
                                s.status === st
                                  ? STATUS_COLORS[st]
                                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              {STATUS_LABELS[st]}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => startEdit(s)}
                          className="text-xs px-3 py-1.5 bg-gray-100 rounded-lg mr-1 hover:bg-gray-200 transition"
                        >
                          編輯
                        </button>
                        <button
                          onClick={() => deleteStaff(s.id, s.name)}
                          className="text-xs px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                          刪除
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* 底部計數 */}
        {!loading && filtered.length > 0 && (
          <p className="text-center text-xs text-gray-400">
            顯示 {filtered.length} / {staff.length} 位師傅
          </p>
        )}
      </div>
    </div>
  )
}

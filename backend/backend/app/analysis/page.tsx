'use client'

import { useEffect, useState } from 'react'

interface ServiceStat {
  service: string
  count: number
  people: number
  percentage: string
  amount: number
}

interface AnalysisData {
  storeId: string
  period: string
  totalCustomers: number
  totalAmount: number
  totalEntries: number
  serviceStats: ServiceStat[]
}

export default function AnalysisPage() {
  const [stores, setStores] = useState<Array<{ id: string; name: string }>>([])
  const [selectedStore, setSelectedStore] = useState('store-1')
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString())
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 獲取店鋪列表
  useEffect(() => {
    fetch('/api/stores')
      .then((res) => res.json())
      .then((stores) => {
        setStores(stores)
        if (stores.length > 0) {
          setSelectedStore(stores[0].id)
        }
      })
      .catch((err) => setError('無法獲取店鋪列表'))
  }, [])

  // 查詢分析數據
  const handleQuery = async () => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        storeId: selectedStore,
        year,
        month,
      })

      const response = await fetch(`/api/analysis/service-statistics?${params}`)

      if (!response.ok) {
        throw new Error('查詢失敗')
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '查詢出錯')
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  // 初始載入
  useEffect(() => {
    if (selectedStore) {
      handleQuery()
    }
  }, [selectedStore])

  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* 頁面標題 */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📊 項目分析統計
          </h1>
          <p className="text-gray-600">
            查看各服務項目的客戶分布和營收情況
          </p>
        </div>

        {/* 查詢條件 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* 店鋪選擇 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                店鋪
              </label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 年份選擇 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                年份
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {years.map((y) => (
                  <option key={y} value={y.toString()}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* 月份選擇 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                月份
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map((m) => (
                  <option key={m} value={m.toString()}>
                    {String(m).padStart(2, '0')} 月
                  </option>
                ))}
              </select>
            </div>

            {/* 查詢按鈕 */}
            <div className="flex items-end">
              <button
                onClick={handleQuery}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? '⏳ 查詢中...' : '🔍 查詢'}
              </button>
            </div>
          </div>
        </div>

        {/* 錯誤信息 */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
            ❌ {error}
          </div>
        )}

        {/* 統計概覽 */}
        {data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-blue-600">
                  {data.totalCustomers}
                </div>
                <div className="text-gray-600 text-sm mt-2">總客戶人數</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-green-600">
                  {data.totalEntries}
                </div>
                <div className="text-gray-600 text-sm mt-2">總進客筆數</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-purple-600">
                  ${(data.totalAmount / 1000).toFixed(0)}K
                </div>
                <div className="text-gray-600 text-sm mt-2">總營收</div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-orange-600">
                  {data.serviceStats.length}
                </div>
                <div className="text-gray-600 text-sm mt-2">服務項目種類</div>
              </div>
            </div>

            {/* 詳細統計表 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <h2 className="text-xl font-bold">📈 服務項目分析</h2>
                <p className="text-blue-100 text-sm">
                  時期: {data.period}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        服務項目
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        次數
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        客戶人數
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        佔比
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                        營收
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.serviceStats.map((stat, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-blue-50 transition"
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">
                          {stat.service || '(未分類)'}
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">
                          {stat.count}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-semibold text-blue-600">
                            {stat.people}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                                style={{
                                  width: `${parseFloat(stat.percentage)}%`,
                                }}
                              />
                            </div>
                            <span className="font-semibold text-gray-700 min-w-fit">
                              {stat.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-600">
                          ${stat.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {data.serviceStats.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-500">
                  📭 暫無數據
                </div>
              )}
            </div>

            {/* 圖表視覺化 */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                👥 客戶分布圖
              </h3>
              <div className="space-y-4">
                {data.serviceStats.slice(0, 10).map((stat) => (
                  <div key={stat.service} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-gray-700 truncate">
                      {stat.service || '(未分類)'}
                    </div>
                    <div className="flex-1">
                      <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex items-center">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-400 to-blue-500 flex items-center justify-end pr-3 transition-all duration-300"
                          style={{
                            width: `${parseFloat(stat.percentage) * 2}%`,
                          }}
                        >
                          <span className="text-white text-sm font-semibold">
                            {stat.people > 0 ? stat.people : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm text-gray-600">
                      {stat.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {!data && !loading && !error && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center text-gray-500">
            <p className="text-lg">👆 選擇條件後點擊「查詢」按鈕</p>
          </div>
        )}
      </div>
    </div>
  )
}

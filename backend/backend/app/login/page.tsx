'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Store {
  id: string
  name: string
}

export default function LoginPage() {
  const router = useRouter()
  const [stores, setStores] = useState<Store[]>([])
  const [selectedStore, setSelectedStore] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [initializing, setInitializing] = useState(true)

  // 初始化預設帳號和獲取店鋪列表
  useEffect(() => {
    const initSystem = async () => {
      try {
        // 獲取店鋪列表
        const storesRes = await fetch('/api/stores')
        const storesData = await storesRes.json()
        setStores(storesData)

        if (storesData.length > 0) {
          setSelectedStore(storesData[0].id)

          // 嘗試初始化預設帳號
          const initRes = await fetch('/api/auth/accounts', {
            method: 'PUT',
          })

          if (initRes.ok) {
            console.log('✅ 預設帳號已初始化')
          }
        }
      } catch (err) {
        console.error('初始化失敗:', err)
      } finally {
        setInitializing(false)
      }
    }

    initSystem()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          storeId: selectedStore,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || '登入失敗')
        return
      }

      const data = await response.json()

      // 保存到localStorage
      localStorage.setItem('auth-user', JSON.stringify(data))

      // 跳轉到dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : '登入失敗，請稍後重試')
    } finally {
      setLoading(false)
    }
  }

  if (initializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-700 font-medium">系統初始化中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* 標題區域 */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">按摩店管理系統</h1>
            <p className="text-amber-100">後台登入</p>
          </div>

          {/* 登入表單 */}
          <div className="px-6 py-8">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* 店鋪選擇 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  選擇店鋪
                </label>
                <select
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none bg-white"
                >
                  <option value="">選擇店鋪</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 用户名輸入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  帳號
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="輸入帳號"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* 密碼輸入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  密碼
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="輸入密碼"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* 登入按鈕 */}
              <button
                type="submit"
                disabled={loading || !selectedStore || !username || !password}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition mt-6"
              >
                {loading ? '⏳ 登入中...' : '🔓 登入系統'}
              </button>
            </form>

            {/* 錯誤提示 */}
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            {/* 預設帳號提示 */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">所有帳號預設密碼:</span> demo123
              </p>
              <p className="text-xs text-yellow-700 mt-2">
                請儘快選擇更改
              </p>
            </div>

            {/* 員工登入選項 */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <p className="text-sm text-gray-600 text-center font-medium">
                員工編號
              </p>
              <input
                type="text"
                placeholder="例如 YS001"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                disabled
              />
              <input
                type="text"
                placeholder="師傅自設密碼"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                disabled
              />
              <button
                type="button"
                disabled
                className="w-full bg-gray-300 text-gray-600 font-bold py-2 rounded-lg cursor-not-allowed"
              >
                師傅登入
              </button>
            </div>
          </div>
        </div>

        {/* 頁腳信息 */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>© 2026 按摩店管理系統</p>
          <p>如有問題，請聯絡系統管理員</p>
        </div>
      </div>
    </div>
  )
}

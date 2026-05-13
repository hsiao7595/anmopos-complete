'use client'

import { useState } from 'react'

interface ImportResult {
  success: number
  failed: number
  errors: Array<{ index: number; error: string }>
}

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [message, setMessage] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (selected) {
      setFile(selected)
      setMessage('')
      setResult(null)
    }
  }

  const handleImport = async () => {
    if (!file) {
      setMessage('❌ 請先選擇檔案')
      return
    }

    setImporting(true)
    setMessage('📤 正在導入...')

    try {
      const text = await file.text()
      const data = JSON.parse(text)

      const response = await fetch('/api/guest-entries/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result: ImportResult = await response.json()

      if (!response.ok) {
        setMessage(`❌ 導入失敗: ${(result as any).error}`)
      } else {
        setResult(result)
        setMessage(
          `✅ 導入完成! 成功: ${result.success}, 失敗: ${result.failed}`
        )
      }
    } catch (error) {
      setMessage(`❌ 錯誤: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 批量導入進客數據</h1>
        <p className="text-gray-600 mb-6">將轉換後的JSON檔案導入到系統</p>

        <div className="space-y-6">
          {/* 文件選擇 */}
          <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center hover:bg-amber-50 transition">
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              disabled={importing}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              {file ? (
                <div>
                  <p className="text-green-600 font-semibold text-lg">✓ {file.name}</p>
                  <p className="text-sm text-gray-500 mt-2">點擊更換檔案</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl mb-2">📁</p>
                  <p className="text-lg font-medium text-gray-700">
                    點擊或拖入JSON檔案
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    格式: imported_data.json
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* 狀態信息 */}
          {message && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">{message}</p>
            </div>
          )}

          {/* 導入結果 */}
          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">導入結果</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-100 rounded p-4">
                  <p className="text-sm text-green-700">成功</p>
                  <p className="text-2xl font-bold text-green-800">{result.success}</p>
                </div>
                <div className="bg-red-100 rounded p-4">
                  <p className="text-sm text-red-700">失敗</p>
                  <p className="text-2xl font-bold text-red-800">{result.failed}</p>
                </div>
              </div>

              {result.errors.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold text-red-700 mb-2">
                    失敗詳情 (顯示前5筆):
                  </p>
                  <div className="bg-white border border-red-200 rounded p-3 max-h-40 overflow-y-auto">
                    {result.errors.slice(0, 5).map((err, i) => (
                      <div key={i} className="text-sm text-red-600 mb-1">
                        <span className="font-mono">第 {err.index + 1} 行</span>:
                        {' '}
                        {err.error}
                      </div>
                    ))}
                    {result.errors.length > 5 && (
                      <p className="text-sm text-gray-500 mt-2">
                        ...還有 {result.errors.length - 5} 筆
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 導入按鈕 */}
          <button
            onClick={handleImport}
            disabled={!file || importing}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-lg hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {importing ? '⏳ 導入中...' : '🚀 開始導入'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">📋 使用說明</h3>
          <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
            <li>先執行 Python 轉換工具: convert_reports.py</li>
            <li>選擇生成的 imported_data.json 檔案</li>
            <li>點擊「開始導入」按鈕</li>
            <li>檢查導入結果</li>
            <li>在「進客分析」頁面查看統計數據</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

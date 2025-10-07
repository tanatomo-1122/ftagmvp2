'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function ListPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // フォームの状態
  const [formData, setFormData] = useState({
    name: '',
    qty: '',
    exp: '',
    note: '',
    contact: ''
  })

  // URLクエリパラメータから初期値を設定
  useEffect(() => {
    const name = searchParams.get('name') || ''
    const qty = searchParams.get('qty') || ''
    const exp = searchParams.get('exp') || ''

    setFormData(prev => ({
      ...prev,
      name,
      qty,
      exp
    }))
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '出品に失敗しました')
      }

      // 成功時は掲示板ページに遷移
      router.push('/board')
    } catch (err) {
      setError(err instanceof Error ? err.message : '出品に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">List an item</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 商品名 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Item name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                maxLength={50}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Milk"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.name.length}/50 characters</p>
            </div>

            {/* 数量 */}
            <div>
              <label htmlFor="qty" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (approx.)
              </label>
              <input
                type="text"
                id="qty"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1 L, 3 pcs, 1 pack"
              />
            </div>

            {/* 期限 */}
            <div>
              <label htmlFor="exp" className="block text-sm font-medium text-gray-700 mb-2">
                Use-by / Best-before date
              </label>
              <input
                type="date"
                id="exp"
                name="exp"
                value={formData.exp}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* メモ */}
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
                Notes / Short message
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                maxLength={140}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Stored in the fridge; fresh"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.note.length}/140 characters</p>
            </div>

            {/* 連絡方法 */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                Contact for handover
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Tanaka, @tanaka123, tanaka@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">Nickname, social handle, or a temporary contact</p>
            </div>

            {/* 出品ボタン */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || !formData.name.trim()}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Listing...' : 'List item'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/board')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              View listings →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ListPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    }>
      <ListPageContent />
    </Suspense>
  )
}

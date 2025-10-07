'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Listing } from '@/lib/supabase'

export default function BoardPage() {
  const router = useRouter()
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'データの取得に失敗しました')
      }

      setListings(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'データの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatExpDate = (expString?: string) => {
    if (!expString) return null
    const date = new Date(expString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchListings}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            再試行
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ftag 掲示板</h1>
          <p className="text-gray-600">地域の食品シェアリング掲示板</p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => router.push('/list')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            商品を出品する
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">まだ出品された商品がありません</p>
            <p className="text-gray-400 mt-2">最初の商品を出品してみませんか？</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{listing.name}</h3>
                  
                  {listing.qty && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">数量:</span> {listing.qty}
                    </p>
                  )}
                  
                  {listing.exp && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">期限:</span> {formatExpDate(listing.exp)}
                    </p>
                  )}
                </div>

                {listing.note && (
                  <div className="mb-4">
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                      {listing.note}
                    </p>
                  </div>
                )}

                {listing.contact && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">連絡先:</span> {listing.contact}
                    </p>
                  </div>
                )}

                <div className="text-xs text-gray-400 border-t pt-3">
                  投稿日時: {formatDate(listing.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            最新20件を表示中
          </p>
        </div>
      </div>
    </div>
  )
}

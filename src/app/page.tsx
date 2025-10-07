import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ftag</h1>
          <p className="text-xl text-gray-600 mb-8">地域の食品シェアリングプラットフォーム</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            QRコードをスキャンして簡単に食品を出品し、地域の人々とシェアしましょう。
            食品ロスを減らし、地域コミュニティを活性化します。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">出品する</h2>
            <p className="text-gray-600 mb-4">
              商品のQRコードをスキャンして、簡単に食品を出品できます。
            </p>
            <Link
              href="/list"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              出品ページへ
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">掲示板を見る</h2>
            <p className="text-gray-600 mb-4">
              地域で出品されている食品を確認し、必要なものを探しましょう。
            </p>
            <Link
              href="/board"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              掲示板へ
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">QRコードの使い方</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">QRコードをスキャン</h3>
                <p className="text-gray-600">スマートフォンのカメラで商品のQRコードを読み取ります</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">商品情報を確認</h3>
                <p className="text-gray-600">自動で入力された商品情報を確認し、必要に応じて修正します</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">出品する</h3>
                <p className="text-gray-600">連絡方法やメモを入力して「出品する」ボタンを押します</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">QRコードの例</h3>
          <p className="text-yellow-700 mb-4">
            以下のようなURL形式のQRコードを作成して商品に貼り付けてください：
          </p>
          <div className="bg-white p-4 rounded border font-mono text-sm text-gray-800">
            https://yourapp.com/list?name=牛乳&qty=1L&exp=2025-01-15
          </div>
          <p className="text-yellow-700 text-sm mt-2">
            ※ 実際のURLはデプロイ後に変更してください
          </p>
        </div>
      </div>
    </div>
  )
}
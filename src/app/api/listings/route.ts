import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/listings - 最新20件の掲示板データを取得
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'データの取得に失敗しました' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// POST /api/listings - 新しい商品を出品
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, qty, exp, note, contact } = body

    // バリデーション
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: '商品名は必須です' }, { status: 400 })
    }

    if (name.length > 50) {
      return NextResponse.json({ error: '商品名は50文字以内で入力してください' }, { status: 400 })
    }

    if (note && note.length > 140) {
      return NextResponse.json({ error: 'メモは140文字以内で入力してください' }, { status: 400 })
    }

    // スパムチェック（簡易版）
    const spamPatterns = [
      /https?:\/\//i,
      /www\./i,
      /@[a-zA-Z0-9._%+-]+@/i, // 複数の@マーク
    ]

    const textToCheck = `${name} ${note || ''} ${contact || ''}`
    for (const pattern of spamPatterns) {
      if (pattern.test(textToCheck)) {
        return NextResponse.json({ error: '不適切な内容が含まれています' }, { status: 400 })
      }
    }

    const { data, error } = await supabase
      .from('listings')
      .insert([
        {
          name: name.trim(),
          qty: qty?.trim() || null,
          exp: exp || null,
          note: note?.trim() || null,
          contact: contact?.trim() || null,
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'データの保存に失敗しました' }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

-- Ftag MVP2 データベーススキーマ
-- Supabaseで実行してください

-- listingsテーブルの作成
CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  qty text,
  exp date,
  note text,
  contact text,
  created_at timestamp with time zone DEFAULT now()
);

-- インデックスの作成（パフォーマンス向上）
CREATE INDEX idx_listings_created_at ON listings(created_at DESC);

-- Row Level Security (RLS) の設定
-- 最初は無効化（開発時）
-- ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- 匿名ユーザーでも投稿・閲覧可能にするポリシー（本番時）
-- CREATE POLICY "Allow anonymous insert" ON listings FOR INSERT WITH CHECK (true);
-- CREATE POLICY "Allow anonymous select" ON listings FOR SELECT USING (true);

-- サンプルデータ（開発用）
INSERT INTO listings (name, qty, exp, note, contact) VALUES
('牛乳', '1L', '2025-01-15', '冷蔵庫で保管中', '田中さん'),
('りんご', '3個', '2025-01-20', '新鮮です', '佐藤さん'),
('パン', '1斤', '2025-01-12', '朝食用', '山田さん');

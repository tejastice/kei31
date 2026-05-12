# kei31.com 仕様書（1ページ構成版）

## 概要

AIマンガ家けいすけの公式サイト。1ページ完結のシンプルなプロフィール／リンク集サイト。

参考: https://kei31ai.com/

---

## サイト構成

シンプルな1ページ構成。階層は廃止し、`manga/` `programming/` などのサブページは削除済み。

### ページ構造

```
[ヘッダー]
  - ブランドロゴ + サイト名
  - ナビ: NEWS / LINKS

[main]
  - NEWS セクション（featured 1件 + リスト 2件）
  - LINKS セクション

[フッター]
```

---

## NEWS セクション

合計 3件 の構成。

### Featured（1件目）

- 大きめの画像 + 見出し + リード + CTAボタン
- レイアウト: 画像左 / テキスト右（モバイルでも横並び維持）
- 「お知らせの1件目」として機能する（旧HEROの役割を兼ねる）

### News List（残り2件）

- 各アイテム: サムネ（96×72）+ 日付 + タグ + テキスト + リンク
- カード全体がクリッカブル

### 現在の掲載内容

1. **Featured**: Substackフォロー訴求（2026.05）
2. **List 1**: Brain「ビデオポッドキャストの作り方」発売（2026.05）
3. **List 2**: けいすけの秘密基地 最新30巻 発売（2026.02）

---

## LINKS セクション

シンプルなモノクロアイコン + タイトル + 説明のカード型グリッド。

### 表示順

1. X (Twitter)
2. メルマガ
3. Substack
4. YouTube
5. Spotify
6. note
7. Kindle 著者ページ
8. AIけいすけ
9. Udemy講座
10. Instagram
11. Threads
12. 公式LINE
13. LINE オープンチャット
14. Voicy
15. stand.fm
16. Brain
17. AIマンガ交流サーバー（Discord）
18. ZQN Discord
19. 【点睛】AIマンガの作り方（Discord）

### アイコン仕様

- インラインSVG、`currentColor` でテーマ色追従
- すべて公式ロゴ（自作トレースは使わない）
- 白黒モノトーン（グレースケール禁止、純粋なBW）

---

## レスポンシブ

ブレークポイントは **768px** の1段階のみ。

### デスクトップ（>768px）

- コンテナ最大幅: 1100px
- LINKSグリッド: 3カラム
- Featured: 画像220px + テキスト（横並び）

### モバイル（≤768px）

- LINKSグリッド: **2カラム**
- Featured: 画像120px + テキスト（**横並びを維持**）
- パディング・ギャップを縮小

---

## デザイントークン

```css
--bg: #ffffff
--bg-alt: #f6f6f4
--fg: #1a1a1a
--fg-sub: #666
--line: #e5e5e2
--maxw: 1100px
```

---

## 技術スタック

- 静的サイト（HTML/CSS/JS、フレームワーク不使用）
- GitHub Pages デプロイ（CNAME 設定済み）
- 文字コード: UTF-8
- フォント: システムフォント
- JS は最小（スムーススクロールのみ）

---

## ファイル構成

```
20260512_kei31_com/
├─ index.html           # 1ページ本体
├─ style.css            # スタイル一式
├─ script.js            # スムーススクロール
├─ CNAME                # GitHub Pages 用
├─ requirements.md      # 本書
├─ url_memo.txt         # 個人URL控え（.gitignore済）
├─ apple-touch-icon.png
├─ favicon 各種
└─ images/
   ├─ icons/            # SVG アイコン素材
   ├─ cover-pages/      # 書籍カバー
   ├─ brain-video-podcast.png
   ├─ keisuke-base.jpg
   └─ profile.png
```

※ 旧 `manga/` `programming/` ディレクトリは削除済み

---

## 運用ルール

- `url_memo.txt` は個人メモ。`.gitignore` 対象。
- 新刊・新コンテンツ告知は NEWS の3件を入れ替える形で更新。
- LINKS 追加時はモノクロSVGアイコンを揃えてから掲載。

# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## リポジトリ概要

これはAI生成マンガ・コミックブックのコンテンツリポジトリです。アセットとメディアファイルのみが含まれており、コードや開発環境はありません。

## リポジトリ構造

- `images_sample/` - 元素材（高解像度）の番号とタイトルで整理されたマンガ巻
  - 各巻は以下のパターンに従います: `000X_[巻数]巻_[タイトル]/`
  - サブディレクトリ:
    - `cover.jpg/png` - 巻のカバー画像
    - `pages/` - フル解像度のマンガページ
    - `insta/` - Instagram最適化版のページ
    - その他の形式: `.mobi`ブック、圧縮アーカイブ
- `images/` - Webサイトで実際に使用する最適化済み画像（`images_sample/`から縮小・最適化したもの）
- `tools/` - 開発した様々なツール類

## コンテンツ構成

- 巻は連番で番号付けされています（0001-0009）
- ページ画像は各巻内で連番で番号付けされています
- Instagram版には変種が含まれる場合があります（例：代替形式用の`X_.jpg`）
- 一部の巻には補助資料が含まれています（Excelファイル、ノート、壁紙）

## 一般的なタスク

### 画像の準備・最適化
- `images_sample/`から必要な画像を選択
- Web用に適切なサイズに縮小・最適化
- 最適化済み画像を`images/`フォルダに配置

### ファイル管理
- 画像表示ツールを使用してコンテンツを確認
- 標準ファイル操作を使用してファイルを整理
- 配布用に必要に応じてアーカイブを圧縮/展開

### 開発関連
- Webサイト開発時は`images/`フォルダの最適化済み画像を使用
- 元素材が必要な場合は`images_sample/`を参照

### 画像最適化ガイドライン
Web用画像は以下の基準で最適化すること：
- **作品カバー画像**: 縦800px統一、JPEG品質70-80%
- **ヒーロー画像**: 縦800px、JPEG品質70%
- **プロフィール画像**: 最大幅300px、PNG
- **プログラミングセクション用画像**: 1200x800px（3:2比率）、50-100KB、JPEG品質90%
- **ファイルサイズ**: 1つの画像は500KB以下を目標
- **総画像サイズ**: ページ全体で2MB以下に抑制

#### images_sampleから画像を移動する際の処理手順

1. **リネーム**: 日本語ファイル名を英語に変更
   ```bash
   # 例: 炎上シミュレーター.jpg → enjo-simulator-screenshot.jpg
   mv "images_sample/炎上シミュレーター.jpg" "images/enjo-simulator-screenshot.jpg"
   ```

2. **リサイズ**: 適切な解像度に調整（Web表示用）
   ```bash
   # 最大1200px幅にリサイズ
   sips -Z 1200 "images/enjo-simulator-screenshot.jpg"
   ```

3. **クロップ**: カードレイアウトに適したアスペクト比に調整
   ```bash
   # 1200x800px（3:2比率）にクロップ
   sips -c 800 1200 "images/enjo-simulator-screenshot.jpg"
   ```

4. **品質調整**: ファイルサイズ50-100KB目標でJPEG品質を調整
   ```bash
   # JPEG品質90%に設定
   sips -s formatOptions 90 "images/enjo-simulator-screenshot.jpg"
   ```

sipsコマンドの使用例：
```bash
# サイズ変更
sips -Z 400 input.jpg --out output.jpg

# JPEG品質調整
sips -s formatOptions 70 image.jpg
```


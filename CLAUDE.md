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
- **ファイルサイズ**: 1つの画像は500KB以下を目標
- **総画像サイズ**: ページ全体で2MB以下に抑制

sipsコマンドの使用例：
```bash
# サイズ変更
sips -Z 400 input.jpg --out output.jpg

# JPEG品質調整
sips -s formatOptions 70 image.jpg
```

## 書籍一覧

タイトル	アフィリンク
著者ページ	
みんなのマンガ物語	https://amzn.to/3Zi50W6
けいすけの秘密基地	https://amzn.to/3JbbOLI
勝利の女神さん	
けいすけのAIマンガ短編集	https://amzn.to/3vz9N9i
1巻 突然ですがAIでマンガを描きました	https://amzn.to/3Sg4nXY
2巻 日常に潜む不思議編	https://amzn.to/3HHkF7p
AIとCanvaでできる！マンガの作り方	https://amzn.to/4ejIIYe
3巻 決意して1日でマンガ家になりゴリ押しで突き進む話	https://amzn.to/3I7MAxm
4巻 あちらのお客様からク〇リプです	https://amzn.to/3uLg55h
5巻 成功という毒薬	https://amzn.to/3IBotaH
6巻 ドリルはあるかしら？	https://amzn.to/3x6RpF9
ビットコインの物語	https://amzn.to/49lGGnt
7巻 マンガの才能	https://amzn.to/4aLS9hu
8巻 黙れジジイ	https://amzn.to/3JlxzJ2
9巻 脳筋マンガ家	https://amzn.to/3Wc7IuI
AIとプロンプトでできる！マンガに使える衣装・表情・ポーズ	https://amzn.to/3WExnw6
10巻 クラスのツンデレ女子がスマホ越しにたまに本音を漏らす件について	https://amzn.to/3UZGnLh
11巻 Theさいたま	https://amzn.to/3V7uPph
12巻 そんな意見は窓から捨てろ	https://amzn.to/4bG0vb0
13巻 ああ忙しい	https://amzn.to/3VtmDA4
縦3話 仕事が無いのに43万円のPCを買ってマンガ家になった話	
14巻 Aボタン連打主義	https://amzn.to/3VijLo2
15巻 男と女は永久にわかり合えないことの証明	https://amzn.to/3RlDd2e
縦4話 マンガ家1カ月目の収益がＸＸＸ円だった話	
縦5話 AIでマンガの作り方をマンガにした話	
縦6話 SNSで超バズったマンガを販売したらＸＸＸ円の売り上げになった話	
実践的！AIマンガで使えるCanvaテクニック	https://amzn.to/3KUrJiw
縦7話 辞めるタイミング	
16巻 なぜあなたの話はうすっぺらいのか？	https://amzn.to/3W0ZfKt
心のAボタン押せてますか？	https://amzn.to/4csoB9A
17巻 正論は正しくない	https://amzn.to/3W1vsju
18巻 自分で考えましょう	https://amzn.to/4bUYjvP
19巻 エンジニアによくあるヤバい依頼	https://amzn.to/4dQiiNl
20巻 この人プログラミングに向いてないなと思う瞬間	https://amzn.to/473EYrj
天才美少女漫画家のありがたい教え: 1巻	https://amzn.to/4d1Jkko
21巻 マンガをバズらせる方法	https://amzn.to/3MIgZVs
Kindleインディーズマンガとフリップトゥーンではじめる！マンガ出版マニュアル	https://amzn.to/4ddxH9Q
22巻 マンガをバズらせるために調査した話	https://amzn.to/4eaSgF7
目指せ収益化！SNSマンガ家のためのマネタイズ戦略	https://amzn.to/3TLVaYS
23巻 売り上げの話をしよう	https://amzn.to/3zCPUQH
マンガで分かる！CanvaとChatGPTでLINEスタンプを作ろう！	https://amzn.to/4hrvYBp
24巻 サラリーマンに〇〇管理術はムダです	https://amzn.to/4fxJG3M
マンガでわかる！XTEPの使い方と応用例	https://amzn.to/4hWh3zc
25巻 スパムDMにガツンと言ってやった話	https://amzn.to/3X1yJR9
天才美少女漫画家のありがたい教え: 2巻	https://amzn.to/4kw1O0L
26巻	https://amzn.to/44ytVY1
27巻AIの進化	https://amzn.to/3S2HFTv
# REQUIREMENTS

## 1. Purpose
3D制作の公開事例を参照し、ユーザーの目的に合う複数事例から設計原理を抽出して、実行可能な制作指示へ再構成する。

## 2. Primary user
- iPhone中心
- 3D制作の専門家でなくても使える
- Web制作、教材、ゲーム、可視化など複数用途を横断する

## 3. Core flow
1. 「何を作りたいか」を日本語で入力
2. 目的を用途・技術・端末・操作・表現などへ構造化
3. 関連事例を複数件提示
4. 各事例から採用可能な技法を抽出
5. 複数事例を合成した制作仕様を生成
6. Astra / Three.js / Blender 等向けの完成指示をコピー
7. 実行結果・修正・成功例を自分のライブラリへ保存

## 4. Core
- 全文検索
- フィルタ: model / technology / use case / interaction / world / asset / device / GitHub有無
- 出典表示
- source typeの区別
- 複数選択
- 採用技法の比較
- 制作指示生成
- コピー
- お気に入り
- 自作メモ
- 成功例保存
- manual.html

## 5. Delight
- 「似ているが違う」事例の推薦
- iPhone向け大きなタップ領域
- 目的別スターター: ゲーム / 世界 / 建築 / キャラクター / 地図 / 教育 / 商品 / 3D Web / 映像 / シミュレーション
- GitHub付き事例の強調
- 制作指示を Phase 1 / 2 / 3 に分割
- 修正プロンプト生成

## 6. Signature
- 1件コピーではなく複数事例の設計原理を合成する Prompt Compiler
- External Library と My Proven Library を分離し、後者を育てる
- 画像→3D→シーン配置まで一つの制作フローとして扱う

## 7. Data fields
- id
- title
- sourceUrl
- sourceSite
- sourceType
- model
- author
- publishedAt
- githubUrl
- license
- technologies[]
- useCases[]
- interactions[]
- worldTypes[]
- assetTypes[]
- devices[]
- derivedPrinciples[]
- notes
- favorite
- importedAt
- lastCheckedAt

## 8. Rights / source rules
- 公開ページの存在と参照可能性は、原文全文・画像・コードの再配布許可を意味しない。
- メタデータ・リンク・自作タグ・自作分析を基本保存対象とする。
- 原文全文、画像、コードは個別ライセンス・利用条件を確認して扱う。
- 作者原文とsource-derived briefを混同しない。

## 9. Device / accessibility
- 320 / 375 / 768 / 1440px
- iPhone縦画面優先
- タップ領域44px以上を基本
- キーボードなしでも主要操作可能
- 十分な文字サイズ・コントラスト・フォーカス表示

## 10. Completion criteria for MVP
- 目的入力→検索→3件以上比較→技法選択→制作指示生成→コピーまで完走できる
- 出典が各事例から辿れる
- 自作メモ・お気に入りが再読込後も残る
- manual.htmlと実装が一致
- 第三者コンテンツの扱いがルール化されている

# MASTER ARCHITECTURE

## 1. Architecture principle
初版は静的Webアプリで開始し、第三者ソースの全文コピーを正本にしない。参照メタデータと自作分析をローカルJSONで扱う。将来、件数・同期要件が増えた場合のみ外部DBへ移行する。

## 2. Layers

### A. Source Catalog
第三者の公開事例を指す索引。
- URL
- title
- author
- model
- date
- source type
- GitHub有無
- 自作タグ
- 自作の設計原理

### B. Prompt Compiler
ユーザーの目的と選択した複数事例から、制作仕様を組み立てる。

出力セクション:
- PROJECT
- USER
- TARGET EXPERIENCE
- REFERENCE PATTERNS
- WORLD
- OBJECTS
- ART DIRECTION
- CAMERA
- CONTROLS
- GAME / EXPERIENCE LOOP
- EDITABILITY
- PERFORMANCE
- RESPONSIVE
- SAVE
- FAILURE STATES
- DELIVERABLES
- ACCEPTANCE TESTS
- IMPLEMENTATION PHASES
- SELF REVIEW

### C. My Proven Library
第三者ソースとは分離して、自分の試行結果を保存。
- 元の制作指示
- 修正指示
- 結果メモ
- 成功/失敗
- 評価
- 再利用タグ

## 3. Initial files
- `index.html`
- `style.css`
- `app.js`
- `manual.html`
- `data/catalog.json`
- `data/taxonomy.json`
- `my-hub.json`

## 4. Storage
MVP:
- catalog: repository static JSON
- user settings / favorites / notes / proven items: localStorage

将来候補:
- 端末間同期が必要になった場合のみSupabase等を検討
- 同期導入時もCatalogとPersonal Dataを分離

## 5. Search
初版はクライアント側検索。
重み付け候補:
1. title
2. useCases / technologies / interactions
3. derivedPrinciples
4. model / author
5. free-text notes

## 6. Compiler strategy
API非依存を基本とし、選択されたタグ・技法・ユーザー入力から構造化テンプレートを生成する。生成AIに渡す最終指示をコピーできる状態にする。

将来、API連携を明示採択した場合のみ、自動要約・自動推薦を追加する。

## 7. Security / publication
- GitHub repository: Private推奨
- Web app: Cloudflare Limitedが原則
- secrets: repositoryに保存しない
- Public化は明示採択時のみ

## 8. Migration rule
データ形式変更時は、旧catalogのバックアップと変換スクリプトまたは変換手順を用意してから変更する。

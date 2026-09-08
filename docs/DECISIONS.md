# DECISIONS

## D-001 — Reference-first, not mirror-first
**Status:** adopted

第三者サイトを丸ごと複製するのではなく、参照URL・メタデータ・自作分析を中心に保持する。原文全文・画像・コードは権利確認済みのものだけ扱う。

## D-002 — Separate external references from personal proven prompts
**Status:** adopted

`Source Catalog` と `My Proven Library` を分離する。第三者由来情報と、自分が実際に試した制作指示・修正履歴を混ぜない。

## D-003 — Prompt Compiler as the product core
**Status:** adopted

単一作例のコピーではなく、複数作例の設計原理を選択・合成し、実行用の構造化指示へ変換する。

## D-004 — Static-first MVP
**Status:** adopted

MVPはHTML/CSS/JavaScript + JSON + localStorage。端末間同期やAI APIは必要性が実証された後に検討する。

## D-005 — Deployment policy
**Status:** adopted

Web公開は原則Cloudflare Limited。My Hub本体はPrivate。Public化は個別の明示採択時のみ。

## D-006 — Repository privacy
**Status:** pending correction

意図はPrivate。ただし2026-09-08の実測では `branzfamily01/3d-prompt-atlas` はGitHub上でPublic。第三者コンテンツの大量収録前にPrivateへ修正する。

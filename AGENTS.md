# AGENTS.md

## Project
3D Prompt Atlas

## Goal
公開された3D制作事例を、出典を保ったまま検索・比較・分析し、ユーザー自身の制作指示へ再構成する。

## Non-negotiables
- 第三者のプロンプト本文・画像・コードを、権利確認なしに大量複製しない。
- 参照元URL・作者・モデル・日付・source typeを保持する。
- 作者原文と、Tripo等が公開情報から再構成したbriefを区別する。
- 自作の分析・タグ・制作指示・成功例を第三者ソースと分離する。
- 既存データを壊す移行をしない。
- 秘密情報をGitHubへ保存しない。
- iPhone縦画面を主要対象として設計する。
- 新機能より、検索→比較→合成→コピー→保存の中心フロー完成を優先する。

## Source of truth
- `docs/REQUIREMENTS.md`
- `docs/MASTER_ARCHITECTURE.md`
- `docs/DECISIONS.md`
- `docs/PROJECT_STATE.md`

## Release policy
最終公開は原則 Cloudflare Limited。My Hub本体はPrivateを維持する。Public化は明示採択時のみ。

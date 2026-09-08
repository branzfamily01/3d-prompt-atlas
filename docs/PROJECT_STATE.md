# PROJECT STATE

Last updated: 2026-09-08 JST

## Current phase
Phase 1 — working static MVP, corpus expansion blocked by repository privacy mismatch

## Confirmed
- Repository exists: `branzfamily01/3d-prompt-atlas`
- Default branch: `main`
- GitHub connector has admin/push permission
- Repository visibility is currently **Public**
- Tripo 3D Prompts currently exposes 285 curated prompts across 5 model groups; GPT-6 Astra has 153 entries
- Tripo states that entries distinguish author exact prompts from source-derived briefs
- Tripo recommends checking GitHub repository licenses before code reuse
- Tripo Terms / Help Center indicate different ownership/commercial-use rules for Free vs Paid user-generated Tripo assets; this is separate from rights in third-party prompt pages and source repositories

## Completed
- README / AGENTS / requirements / architecture / decisions / project state
- content.md / art-direction.md
- Static MVP UI (`index.html`, `style.css`, `app.js`)
- Search taxonomy
- Safe starter source catalog: 10 Tripo entries using metadata, source URLs and our own derived principles rather than copying the prompt corpus
- Search / filters / purpose-based ranking
- Multi-select comparison
- Derived-principle selection
- Prompt Compiler output
- Favorites via localStorage
- My Proven Library via localStorage
- manual.html
- my-hub.json prepared with `visibility: limited`
- GitHub Actions validation workflow
- Validation passed: JavaScript syntax, JSON parsing, required-file checks

## Current blocker before corpus ingestion
The repository was intended to be Private, but GitHub currently reports it as Public. Do not import a substantial third-party prompt corpus or private user experiment history until visibility is corrected.

## Next implementation steps after privacy correction
1. Re-check repository visibility is Private
2. Harvest all Tripo pages as source metadata, without assuming prompt/asset redistribution rights
3. Classify each entry by source type, model, technology, use case, interaction, device, GitHub availability and derived principles
4. Add GitHub license status where source code exists
5. Expand catalog from 10 starter entries toward the full current collection
6. Test recommendation quality with real tasks such as 3D education/map/game use cases
7. Run 6-Pass Review at 320 / 375 / 768 / 1440px
8. Prepare Cloudflare Limited deployment only after the app itself is ready
9. Register in My Hub only after real Limited URL and manual URL are verified

## Not yet done
- Full Tripo catalog ingestion
- Visual browser/device verification
- External AI API integration (not required for current MVP)
- Cloudflare Limited deployment
- My Hub registry update / launch verification
- Release ZIP

## Release status
Not released. The current app is an MVP committed to `main` and syntax/data validation has passed, but repository privacy and visual/functional browser verification remain outstanding.

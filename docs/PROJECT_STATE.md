# PROJECT STATE

Last updated: 2026-09-08 JST

## Current phase
Phase 0 — source investigation / architecture / safe repository initialization

## Confirmed
- Repository exists: `branzfamily01/3d-prompt-atlas`
- Default branch: `main`
- GitHub connector has admin/push permission
- Repository visibility is currently **Public**
- Tripo 3D Prompts currently exposes 285 curated prompts across 5 model groups; GPT-6 Astra has 153 entries
- Tripo states that entries distinguish author exact prompts from source-derived briefs
- Tripo recommends checking GitHub repository licenses before code reuse

## Completed
- README initialized
- AGENTS.md added
- Requirements defined
- Master architecture defined
- Initial decisions recorded
- Third-party-copy safeguards defined

## Blocker before corpus ingestion
Repository should be changed from Public to Private before storing any substantial third-party prompt corpus or private user experiment history.

## Next implementation steps
1. Add static MVP shell
2. Add taxonomy
3. Add safe source catalog containing metadata + links + derived tags only
4. Implement search / filters / multi-select / compiler
5. Implement favorites / notes / proven-library local storage
6. Add manual.html
7. Responsive + release review
8. Only after repo privacy correction: decide whether any full prompt text can be stored, source by source

## Not yet done
- No full Tripo corpus imported
- No external AI API integration
- No Cloudflare deployment
- No My Hub registration
- No release claim

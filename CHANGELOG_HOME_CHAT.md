# JetClicks Home Message + Chat Contact Changes

## Home page
- The main Home page H1 remains unchanged.
- The supporting paragraph below the H1 is now loaded from the public configuration API.
- The private studio console can choose from 15 prepared message templates.
- The admin can write a custom paragraph (up to 1,400 characters).
- "Reset to original" restores the original bundled paragraph.
- The selected message is persisted through the existing Settings storage, including Google Sheets deployments.
- The original paragraph remains the fallback when the configuration API is unavailable.

## Customer service chat
- Name, email, and phone number are now required before any visitor message or handoff can be sent.
- The message composer, suggestion buttons, and "Talk to JetClicks" handoff remain disabled until the three contact fields are valid.
- The API validates the same requirements server-side, so bypassing the browser UI does not allow incomplete chat submissions.
- Existing saved contact details can be reused for an existing conversation.

## Verification
- TypeScript project check: passed (`tsc -b`).
- `git diff --check`: passed.
- API-level checks: template selection, custom Home message, reset, missing-contact rejection, and invalid-phone rejection all passed.
- Production Vite build could not be executed in this Linux verification environment because the supplied `node_modules` is missing the platform-specific Rollup Linux native package. This is an environment/dependency issue; the source TypeScript check passes.

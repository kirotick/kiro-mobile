# kiro-mobile

Owner and manager mobile app (Expo / React Native) for Android, iOS and the web, talking to the kiro-backend API.

Part of KIRO (Kitchen Intelligence & Restaurant Operations). Owner: @kirotick. Migrated with full history from `kirotick/KIRO_POS` (commit `252de09`), see kiro-documentation/governance/REPOSITORY_MIGRATION_PLAN.md.

## What this repository owns
- Mobile screens: Login, Home, Sales, Invoice, Stock, Staff, Ask
- API client and formatting logic (`src/api.js`, `src/format.js`)

Nothing here may be copied into another KIRO repository; other repositories use it by version or through its API.

## Depends on
- **kiro-backend** HTTPS API (`EXPO_PUBLIC_API_URL`)

## Build
`npm install`, then `npm start` (Expo). Web build: `npm run build:web`.

## Test
`npm test` (logic tests; needs esbuild from `npm install`, or kiro-qa-testing checked out next to this folder).

## Branches, reviews and releases
`main` is production and protected: changes arrive only by pull request with passing checks (see CONTRIBUTING.md). Versions follow semantic versioning; every release is a git tag `vMAJOR.MINOR.PATCH` with notes in CHANGELOG.md, so each deployment maps to one exact commit. Rollback = redeploy the previous tag.

## Security
See SECURITY.md. Never commit secrets: `.env` files are ignored, and secret scanning with push protection plus gitleaks in CI block them.

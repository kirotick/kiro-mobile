# Changelog for kiro-mobile

All notable changes are recorded here. Versions follow semantic versioning.

## v1.0.0 (unreleased, store preparation)
- App ID `in.kiro.admin` on both stores, version 1.0.0, Android versionCode 1, iOS build 1.
- KIRO icon (1024 px, no transparency), Android adaptive icon, splash screen, web favicon, Google Play icon (512 px).
- `eas.json` build profiles (preview .apk, production .aab and iOS) and submit settings.
- No extra Android permissions; iOS export compliance set (standard HTTPS only).
- `react-native` 0.79.5 to 0.79.6 (expo-doctor 18/18); added `expo-splash-screen`; `package-lock.json` committed for reproducible builds.
- `test/store-config.test.js`: store rules checked by `npm test`.
- `store/STORE_LISTING.md`: listing text, Data safety and App Privacy answers.

## v1.0.0 (2026-11-05)
- Created from `kirotick/KIRO_POS` (commit `252de09`) with the full history of the files it owns.
- Added README, CONTRIBUTING, SECURITY, CODEOWNERS, pull request template, Dependabot and CI with pinned actions.

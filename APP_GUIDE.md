# KIRO Admin app (React Native + Expo)

Phone app for the owner, manager and accountant: today's sales, **invoice numbers and invoice lookup**, **who is using KIRO** (staff, last active, bills today), GST, payment modes, stock insights (dead stock, fast movers, expiry, low stock) and **Ask KIRO**. It talks only to the KIRO API in `../kiro-server/node` (endpoints below). POS cashiers get a minimal Home screen (their own sales only); their billing screen is the web app.

```
src/App.js          login gate, role-based tabs, token handling
src/api.js          API client (timeouts, 401 -> sign out, safe error messages)
src/session.js      token in the phone's secure storage (expo-secure-store)
src/format.js       paise -> ₹ with Indian grouping
src/screens/        Login, Home, Sales, Invoice, Stock, Staff, Ask
e2e/                test harness: real screens in Chromium -> real API handlers -> real PostgreSQL
test/               unit tests for api.js and format.js
```

## Run it
1. Deploy the API (`../server/node/README.md`), or run it locally. Run migrations `001_phonepe.sql`, `002_core.sql` and `003_nightly.sql`.
2. `cp .env.example .env` and set **`EXPO_PUBLIC_API_URL`** to the API address (https in production; for a phone on Wi-Fi use your computer's LAN address). This is the only setting; it is public by design and holds no secret.
3. `npm install` then `npx expo install --fix` (aligns Expo package versions to your Expo SDK), then `npx expo start` and scan the QR code with Expo Go.
4. Before publishing: set `android.package` and `ios.bundleIdentifier` in `app.json` to your own IDs, then build with EAS (`npx eas build`).

## Run it as a website
The same code runs in a browser (Expo web, via `react-native-web`).
1. `npm install` (the web packages are already in `package.json`; run `npx expo install --fix` once).
2. Try it locally: `npx expo start --web`. Your API must allow that address: set `CORS_ORIGINS=http://localhost:8081` in the server `.env`.
3. Publish it: `npm run build:web` creates a static `dist/` folder. Upload it to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages), with every path falling back to `index.html`. Build with `EXPO_PUBLIC_API_URL` set to your **https** API.
4. Add the website's exact address to `CORS_ORIGINS` on the API (e.g. `https://admin.yourshop.com`). Without it the browser blocks the calls.

On the web the login token is kept in the browser's `localStorage` (no secure store exists in browsers), so sign out on shared computers. Serve the site over https only.

## Publishing to Google Play and the App Store
Ready in this repository: app ID `in.kiro.admin` (permanent), version 1.0.0, KIRO icon, Android adaptive icon, splash screen, `eas.json` build profiles, no extra Android permissions, iOS export compliance answered. `npm test` checks these store rules. Listing text, Data safety and App Privacy answers: [store/STORE_LISTING.md](store/STORE_LISTING.md).

Still needed, in this order:
1. **Owner:** Apple Developer Program (yearly fee) and Google Play Console (one-time fee) accounts, and a D-U-N-S number to enrol as an organisation.
2. **Owner:** fill in the legal name, address and privacy email on the website's privacy and delete-account pages (kiro-web).
3. Deploy the KIRO API (kiro-backend) over https and create a demo shop login for the store reviewers.
4. `npm install -g eas-cli`, `eas login` (owner's Expo account), `eas init` (adds the project ID to app.json), then `eas env:create --environment production --name EXPO_PUBLIC_API_URL --value https://<api address> --visibility plaintext` (same for `preview`).
5. Test build on a phone: `eas build --profile preview --platform android` (installable .apk). iPhone test builds need the Apple account.
6. Store builds: `eas build --profile production --platform all`, then `eas submit --profile production` (Android goes to the internal testing track as a draft). Store passwords and keys stay in EAS and the store consoles, never in this repository.
7. Once approved, copy the public store addresses into the website's app links and **`STORE_LINKS` in `demo/page.template.html`**. Only addresses on `play.google.com` or `apps.apple.com` are accepted.

`demo/` holds the sample-data showcase page (the real screens with a fake in-browser API). It is for showing the app, not for production.

## API endpoints the app uses
`POST /api/auth/login` · `GET /api/me` · `GET /api/reports/summary?period=today|yesterday|week|month|year|all[&mine=1]` · `GET /api/sales?period=&q=&limit=` · `GET /api/sales/:id` · `GET /api/sales/lookup?no=` · `GET /api/staff` (owner) · `GET /api/reports/insights` · `POST /api/ask {question}`

## Who sees what (enforced by the server; the app just hides tabs)
| Role | Tabs |
|---|---|
| Owner | Home, Sales, Stock, Ask KIRO, Staff, More |
| Manager, Accounts | Home, Sales, Stock, Ask KIRO, More (no staff logins) |
| POS cashier | Home (own sales only), More |

## Tests
- `npm test`: 5 unit tests (money formatting, request building, 401/timeout/network handling).
- `TEST_PG_HOST=... TEST_PG_PORT=... TEST_PG_DB=... node e2e/run.js`: the real screens run in headless Chromium against a real PostgreSQL through the real API handlers: login errors, home numbers, sales search, invoice detail, stock, staff, Ask KIRO, all four roles, expired token, switched-off login, session restore after reload. 34 checks.

## Honest limits
- **Not run on a phone or emulator** (no Expo or Android tooling in my sandbox, and the npm registry was blocked). The e2e uses a stand-in for `react-native` that draws the same component tree as web elements, so it proves the data flow, permissions and behaviour but not native look, keyboard, or Expo-specific behaviour. Do one pass in Expo Go on a real phone before release.
- Package versions in `package.json` are a starting point; run `npx expo install --fix`.
- Sign-in uses the server's JWT (12 hours). There is no refresh token, "forgot password" or push notification yet.
- Ask KIRO is a keyword assistant over your data, not a language model.
- Read-only app: it does not create bills, edit stock or manage staff.

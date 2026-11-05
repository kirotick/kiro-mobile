# KIRO Admin: store listing and privacy answers

Prepared 2026-11-05 from the code in this repository. Everything here is a draft for the owner to check before pasting into Google Play Console and App Store Connect. Character limits are the stores' own; counts are noted where they matter.

## Identity
| | Value |
|---|---|
| App name | KIRO Admin |
| Android package / iOS bundle ID | `in.kiro.admin` (permanent after the first upload) |
| Version | 1.0.0 (Android versionCode and iOS build number are increased automatically by EAS) |
| Category | Business (both stores) |
| Price | Free |
| Privacy policy | https://kiro-pos.netlify.app/privacy.html |
| Account deletion | https://kiro-pos.netlify.app/delete-account.html |
| Support / marketing site | https://kiro-pos.netlify.app/ |
| Icons | `assets/icon.png` (1024, no transparency, App Store), `assets/store-icon-512.png` (Google Play) |

## Text
**Apple subtitle** (max 30): `Sales, invoices and staff` (25)

**Google short description** (max 80): `Today's sales, invoices, GST, stock and staff for your KIRO shop, on your phone.` (80)

**Apple promotional text** (max 170): `See today's sales, find any invoice and check who is billing, straight from your KIRO server. No ads, no tracking.`

**Full description** (both stores, max 4000):
```
KIRO Admin is the phone app for owners, managers and accountants of shops and restaurants that use KIRO for billing.

Sign in with the login your KIRO server gives you and see:
• Today's sales, bills and payment modes (UPI, cash, card, credit)
• Invoice numbers and invoice lookup
• GST totals
• Stock: low stock, fast movers, dead stock and expiry
• Staff: who is using KIRO, last active and bills today
• Ask KIRO: plain-language answers about your sales, built from your own figures

Cashiers get a simple home screen with their own sales only.

Private by design
• No ads, no analytics, no tracking
• Your sign-in is kept in the phone's secure storage
• Each shop sees only its own data
• UPI payments are shown as "confirmed by cashier, not verified" until you match them with your bank statement. KIRO never takes or holds money.

KIRO Admin needs a KIRO account. Ask your shop owner, or contact KIRO through the website.
```

**Apple keywords** (max 100, comma separated, no spaces): `pos,billing,restaurant,shop,gst,invoice,sales,upi,stock,staff,cafe,india` (72)

**What's new (1.0.0):** `First release.`

## App review (both stores)
Reviewers must be able to sign in. Before submitting:
1. The KIRO API must be live over https (kiro-backend on Render, not deployed yet), and the production build must have `EXPO_PUBLIC_API_URL` set to it (EAS environment variable, environment "production").
2. Create a **demo shop** with sample sales on the production database and a login for reviewers (`npm run users -- add-shop ... --db production --confirm-production` in kiro-backend/api). Put the login and password only in the store consoles' "App review / App access" fields, never in this repository.
3. Note for the reviewer: "KIRO Admin is a companion app for businesses that already use KIRO billing. Use the demo login above; it shows a sample shop."

## Google Play: Data safety form
| Question | Answer |
|---|---|
| Does the app collect or share user data? | Yes, collects. Not shared (the server and database hosts process data for us; Google does not count that as sharing). |
| Encrypted in transit? | Yes (HTTPS only) |
| Can users ask for deletion? | Yes: https://kiro-pos.netlify.app/delete-account.html |
| Personal info: Name | Collected. Staff names, and customer names on invoices if the shop records them. Purpose: App functionality. Required. |
| Personal info: Phone number | Collected. Customer phone numbers on invoices if the shop records them. Purpose: App functionality. Optional (only if the shop records it). |
| Personal info: User IDs | Collected. Login ID. Purpose: App functionality, Account management. Required. |
| Financial info: Other financial info | Collected. Sales, invoices, payment modes, GST totals of the business. Purpose: App functionality. Required. |
| App activity, location, contacts, photos, audio, device IDs | Not collected |
| Ads | No ads |
| Target audience | 18 and over |

## Apple: App Privacy ("nutrition label")
| Data type | Collected | Linked to the user | Used for tracking | Purpose |
|---|---|---|---|---|
| Contact Info: Name | Yes | Yes | No | App Functionality |
| Contact Info: Phone Number | Yes | Yes | No | App Functionality |
| Identifiers: User ID | Yes | Yes | No | App Functionality |
| Financial Info: Other Financial Info | Yes | Yes | No | App Functionality |
| Everything else | No | | | |

Export compliance: the app uses only standard HTTPS, so `ITSAppUsesNonExemptEncryption` is set to `false` in `app.json`.

Age rating questionnaire: answer "None" to every content question (no violence, gambling, user-generated content, web browsing, etc.).

## Screenshots needed
- iPhone 6.9" (1320 × 2868) or 6.5" (1284 × 2778): at least 3. Suggested screens: Home (today's sales), Invoice lookup, Stock, Staff.
- Android phone: at least 2 (1080 × 1920 or larger, 16:9 or 9:16).
- Google Play feature graphic: 1024 × 500.
Take them from the demo shop once the API is live, so they show real screens with sample data.

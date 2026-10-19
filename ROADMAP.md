# Loonie Roadmap

Loonie started as "invoiced.ca", a freelancer invoicing tool (see [docs/spec.pdf](docs/spec.pdf)). It is now three services built on the same tax engine: **Tax Tools**, **Money Coach** and **Quotes**. All development uses made-up sample data.

## Done
- [x] Canadian tax engine (`lib/tax.ts`): every province, international zero-rating, small-supplier case
- [x] Jest tests for the tax engine (16 passing)
- [x] Dashboard, client list, invoice builder and settings screens (sample data)
- [x] Zustand stores and TypeScript types

## Phase 0: Pivot clean-up
- [ ] App shell with three sections: Tax Tools, Money Coach, Quotes
- [ ] Turn the invoice builder into the quote builder (rename types, store and routes)
- [ ] Public layout for Tax Tools (no sidebar, no login) alongside the signed-in dashboard layout
- [ ] Move hard-coded sample data into one seed/fixtures file
- [ ] Replace the hard-coded user ("Michelle", "Pro Plan") in the sidebar with real account data

## Phase 1: Tax Tools (public, no account)
- [ ] GST/HST calculator: amount + province → each tax line and total, forwards and backwards (tax-included prices)
- [ ] "Do I charge tax?" wizard: your province, client location, registered or not → the answer and the note to put on the invoice
- [ ] $30K small-supplier threshold checker
- [ ] Quarterly / annual remittance estimator
- [ ] Guides: GST vs HST vs PST, invoicing US clients, zero-rated exports, QST for Quebec
- [ ] Shareable result links and SEO metadata for every tool

## Phase 2: Accounts and database
- [ ] Supabase auth: email + Google login
- [ ] Tables for profiles, income entries, clients, quotes, quote line items, quote taxes
- [ ] Row-level security so users only see their own data
- [ ] Onboarding: province, GST/HST registered toggle, business name
- [ ] Seed script with fake data

## Phase 3: Money Coach (free account)
- [ ] Log income entries (amount, date, client province or country)
- [ ] Set-aside meter: how much to keep for GST/HST and income tax, using `lib/tax.ts`
- [ ] Running total toward the $30K threshold, with a warning at 80% and 100%
- [ ] Monthly and yearly charts
- [ ] Remittance reminders based on filing frequency
- [ ] CSV export

## Phase 4: Quotes (paid plan)
- [ ] Quote builder with live tax per client province (reusing the current invoice builder)
- [ ] Public share link for each quote
- [ ] One-click accept / decline for the client, with status on the dashboard
- [ ] Quote PDF with @react-pdf/renderer
- [ ] Send quote by email with Resend
- [ ] Duplicate a quote, quote templates

## Phase 5: Plans and payments
- [ ] Lemon Squeezy checkout for the Quotes plan, test mode only
- [ ] Webhook handler with signature check (created / cancelled / expired)
- [ ] Free tier limits and upgrade prompts

## Phase 6: Launch
- [ ] Landing page explaining the three services
- [ ] Deploy to Vercel
- [ ] Tests for API routes, totals and rounding edge cases
- [ ] GitHub Actions CI: lint, type-check, test
- [ ] Accessibility and mobile layout pass

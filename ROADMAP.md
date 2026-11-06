# Loonie Roadmap

Loonie is three services built on one Canadian tax engine: **Tax Tools**, **Money Coach** and **Quotes**. It runs entirely in the browser: no accounts, no database, no server. All development uses made-up sample data.

## Status

| Phase | Status | Estimate |
|---|---|---|
| Done: tax engine, sample screens | ✅ | |
| Phase 0: Online with a basic UI | started: live on Vercel | 3–5 h |
| Phase 1: Get the tax right | not started | 4–6 h |
| Phase 2: Pivot clean-up | not started | 4–6 h |
| Phase 3: Tax Tools | not started | 6–8 h |
| Phase 4: Money Coach | not started | 6–8 h |
| Phase 5: Quotes | not started | 6–8 h |
| Phase 6: Invoice Unblocker | not started | 5–7 h |
| Phase 7: Ready to share | not started | 3–5 h |
| **Total planned** | | **37–53 h** |

Each item is sized to be one or two commits.

## Principles

1. **Your data stays on your device.** No sign-up, no database, no server. What you enter is kept in your browser, and you can export it.
2. **The tax has to be right.** A wrong rate on a quote costs a freelancer money. Every rate has a source and a date, and every rule has a test.
3. **Sample data always.** The app runs with made-up clients and figures out of the box, clearly labelled.
4. **Guidance, not tax advice.** Loonie explains the rules; it does not replace an accountant or the CRA.

---

## ✅ Done

- [x] Canadian tax engine (`lib/tax.ts`): every province, international zero-rating, small-supplier case
- [x] Jest tests for the tax engine (16 passing)
- [x] Dashboard, client list, invoice builder and settings screens (sample data)
- [x] Zustand stores and TypeScript types

## Phase 0: Online with a basic UI (3–5 h)

A first look at all three services, live on the web. Screens only: everything is hard-coded sample data and nothing is wired to the tax engine yet.

- [ ] Home page that introduces Tax Tools, Money Coach and Quotes
- [ ] One placeholder screen per service, with hard-coded sample figures, labelled as sample data
- [ ] Navigation between the three services that works on a phone
- [x] Deploy to Vercel, with the live link in the README ([loonie-alpha.vercel.app](https://loonie-alpha.vercel.app))

**Done when:** the live link opens on a phone and every screen is reachable, with no keys or accounts needed.

## Phase 1: Get the tax right (4–6 h)

- [ ] Check every rate against the CRA's current table and record the date checked
- [ ] Keep the rates in one table with a "rates as of" date, so a rate change is one edit plus a test
- [ ] Reject an unknown province code instead of quietly charging GST 5%
- [ ] Return the small-supplier note when the seller is not registered (the rules table promises it, the engine returns nothing)
- [ ] Say plainly that zero-rating for clients outside Canada is a simplification, and when it does not apply
- [ ] Tests for rounding edge cases and for every rule above

**Done when:** every rate in the app matches the CRA table on a stated date, and a test fails if one is changed by mistake.

## Phase 2: Pivot clean-up (4–6 h)

- [ ] App shell with three sections: Tax Tools, Money Coach, Quotes
- [ ] Turn the invoice builder into the quote builder (rename types, store and routes)
- [ ] Public layout for Tax Tools alongside the main app layout
- [ ] Move all sample data into one fixtures file, with made-up names
- [ ] Remove the hard-coded user and plan from the sidebar
- [ ] One small storage module that saves to the browser, so the rest of the app never touches `localStorage` directly

**Done when:** the three sections are reachable, nothing is hard-coded to one person, and a reload keeps what was entered.

## Phase 3: Tax Tools (6–8 h)

- [ ] GST/HST calculator: amount + province → each tax line and total, forwards and backwards (tax-included prices)
- [ ] "Do I charge tax?" wizard: your province, client location, registered or not → the answer and the note to put on the quote
- [ ] $30K small-supplier threshold checker
- [ ] Quarterly / annual remittance estimator
- [ ] Guides: GST vs HST vs PST, billing US clients, zero-rated exports, QST for Quebec
- [ ] Shareable result links that carry the inputs in the URL, so nothing is stored anywhere

**Done when:** each tool gives the same answer as the tax engine's tests, and a shared link reopens the same result.

## Phase 4: Money Coach (6–8 h)

- [ ] Log income entries (amount, date, client province or country), saved in the browser
- [ ] Set-aside meter: how much to keep for GST/HST and income tax, using `lib/tax.ts`
- [ ] Running total toward the $30K threshold, with a warning at 80% and 100%
- [ ] Monthly and yearly charts
- [ ] Remittance reminders based on filing frequency, shown in the app
- [ ] Export and import as CSV and JSON, so data can be backed up or moved to another device

**Done when:** an export → import round trip gives identical entries, and the threshold warning appears at the right totals in a test.

## Phase 5: Quotes (6–8 h)

- [ ] Quote builder with live tax per client province (reusing the current invoice builder)
- [ ] Print-ready quote and save as PDF from the browser
- [ ] Share a quote as a link that carries the quote itself, with no server
- [ ] Mark a quote sent, accepted or declined, with status on the dashboard
- [ ] Duplicate a quote, quote templates

**Done when:** a quote for each province type (HST, GST + PST, GST only, outside Canada) prints with the right tax lines.

## Phase 6: Invoice Unblocker (5–7 h)

Late payment is often not a forgetful client: UK government research with 300 businesses found 36% blamed their own late payments on admin errors, 31% on disputed invoices and 23% on technical issues such as invoices not arriving.

- [ ] Track every sent quote or invoice with a "why is it stuck?" status: missing PO number, wrong details, missing proof of delivery, awaiting approval, disputed
- [ ] A checklist of the documents each blocker needs
- [ ] One clear next action and who owns it
- [ ] Industry checklists for buyer requirements (start with one trade, e.g. construction subcontractors), so invoices go out complete the first time
- [ ] Timeline of every follow-up

**Done when:** a stuck invoice shows its blocker, the missing items and the next step.

## Phase 7: Ready to share (3–5 h)

- [ ] Landing page that shows the finished services, replacing the Phase 0 home page
- [ ] End-to-end tests for the main flows
- [ ] Accessibility and mobile layout pass
- [ ] CHANGELOG and version 1.0

## Out of scope

- Accounts, sign-in, databases or cloud sync
- Payments, subscriptions or paid plans
- Sending email on the user's behalf
- Filing returns with the CRA, or income tax advice beyond a set-aside estimate
- Real client or financial data in the repo

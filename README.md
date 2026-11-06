# Loonie

[![test](https://github.com/Michelle-Vava/loonie/actions/workflows/test.yml/badge.svg)](https://github.com/Michelle-Vava/loonie/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Money tools for Canadian freelancers, with the sales tax worked out for you.

**▶ Live demo: [loonie-alpha.vercel.app](https://loonie-alpha.vercel.app)**. Everything on it is made-up sample data.

Loonie is three services in one app, all powered by the same Canadian tax engine:

| Service | What it does |
|---------|-------------|
| **Tax Tools** | GST/HST/PST/QST calculators, a "do I charge tax on this client?" wizard, a $30K small-supplier threshold checker, and plain-language guides |
| **Money Coach** | Log income as it comes in; Loonie tells you how much to set aside for sales tax and income tax, and warns you before you cross $30K |
| **Quotes** | Build project quotes with the correct tax for the client's province, print them or share them as a link |

**Who it's for:** Canadian freelancers and solo businesses who work with clients across provinces or outside Canada and don't want to look up tax rules every time.

**Status:** early build. The Canadian tax engine is done and tested. The dashboard, client list, quote builder (currently an invoice builder) and settings screens exist with made-up sample data. Next: a basic version online, then checking every rate against the CRA, then Tax Tools and Money Coach. See [ROADMAP.md](ROADMAP.md).

---

## No accounts, no database

Loonie runs entirely in your browser. There is no sign-up, no server and no database: what you enter stays on your device, and you will be able to export it. All clients, quotes and income figures in this repo are made up.

Loonie explains the tax rules; it is not tax advice. Check with the CRA or an accountant for your situation.

---

## Tax rules

| Client | Tax applied |
|--------|-------------|
| Outside Canada | 0%, zero-rated export note (ETA s.123) |
| Seller not GST/HST registered | No tax lines, small-supplier note |
| ON | HST 13% |
| NS, NB, PEI, NL | HST 15% |
| BC | GST 5% + PST 7% |
| SK | GST 5% + PST 6% |
| MB | GST 5% + RST 7% |
| QC | GST 5% + QST 9.975% |
| AB, YT, NT, NU | GST 5% |

These are the rules as the engine applies them today. Checking each one against the CRA's current table is Phase 1 of the roadmap.

All of this lives in [`lib/tax.ts`](lib/tax.ts), with tests in [`__tests__/tax.test.ts`](__tests__/tax.test.ts).

---

## Built with

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + TypeScript |
| State | Zustand |
| Styling | Tailwind CSS |
| Storage | The browser (planned) |
| Tests | Jest |

---

## Project structure

```
app/
├── (dashboard)/
│   ├── layout.tsx            # Sidebar + app shell
│   ├── dashboard/page.tsx    # Overview + stats
│   ├── invoices/new/page.tsx # Builder with live tax calculation (becoming the quote builder)
│   ├── clients/page.tsx      # Client list
│   └── settings/page.tsx     # Business profile + GST/HST settings
lib/
└── tax.ts                    # Canadian sales tax engine
store/                        # Zustand stores
types/                        # Invoice, client and tax types
__tests__/tax.test.ts         # Tax engine tests
```

---

## Running locally

Requires Node.js 20 or newer. No keys or accounts needed.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Checks:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

GitHub Actions runs all four on every push and pull request. Every push to `main` also deploys to the live demo on Vercel.

---

## License

[MIT](LICENSE) © 2026 Michelle Vava

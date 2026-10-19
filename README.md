# Loonie

Money tools for Canadian freelancers, with the sales tax worked out for you.

Loonie is three services in one app, all powered by the same Canadian tax engine:

| Service | What it does | Account |
|---------|-------------|---------|
| **Tax Tools** | Free GST/HST/PST/QST calculators, a "do I charge tax on this client?" wizard, a $30K small-supplier threshold checker, and plain-language guides | None, free and public |
| **Money Coach** | Log income as it comes in; Loonie tells you how much to set aside for sales tax and income tax, and warns you before you cross $30K | Free account |
| **Quotes** | Build polished project quotes with the correct tax for the client's province, share them by link, and let clients accept in one click | Paid plan |

**Who it's for:** Canadian freelancers and solo businesses who work with clients across provinces or outside Canada and don't want to look up tax rules every time.

**Status:** early build. The Canadian tax engine is done and fully tested. The dashboard, client list, quote builder (currently an invoice builder) and settings screens exist with made-up sample data. Tax Tools, Money Coach, auth and the database are next. See [ROADMAP.md](ROADMAP.md).

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

All of this lives in [`lib/tax.ts`](lib/tax.ts), with a test for every case in [`__tests__/tax.test.ts`](__tests__/tax.test.ts).

---

## Built with

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + TypeScript |
| State | Zustand |
| Database + auth | Supabase (PostgreSQL) |
| Payments | Lemon Squeezy (planned) |
| Email | Resend (planned) |
| Tests | Jest |
| Hosting | Vercel (planned) |

---

## Project structure

```
app/
├── (dashboard)/
│   ├── layout.tsx            # Sidebar + shell for signed-in screens
│   ├── dashboard/page.tsx    # Overview + stats
│   ├── invoices/new/page.tsx # Builder with live tax calculation (becoming the quote builder)
│   ├── clients/page.tsx      # Client list
│   └── settings/page.tsx     # Business profile + GST/HST settings
lib/
├── tax.ts                    # Canadian sales tax engine
└── supabase.ts               # Supabase client helpers
store/                        # Zustand stores
types/                        # Invoice, client and tax types
__tests__/tax.test.ts         # Tax engine tests
docs/                         # Original spec and UI prototype (from when this was "invoiced.ca"), SEO plan
```

---

## Running locally

```bash
npm install
cp .env.example .env.local   # fill in your own keys
npm run dev
```

Open `http://localhost:3000`. The current screens run on sample data, so you can explore them without filling in the keys.

Run the tests:

```bash
npm test
```

---

## Sample data only

All clients, quotes and income figures in this repo are made up. No real client or financial data is stored or committed.

---

## License

[MIT](LICENSE) © 2026 Michelle Vava

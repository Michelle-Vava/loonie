'use client'

import Link from 'next/link'

const mockInvoices = [
  { id: '1', number: 'INV-009', client: 'Acme Corp', country: '🇺🇸 United States', amount: '$2,500.00 USD', tax: 'Zero-rated', issued: 'Apr 10, 2026', due: 'May 10, 2026', status: 'sent' },
  { id: '2', number: 'INV-008', client: 'Maple Media', country: '🇨🇦 Ontario, Canada', amount: '$1,695.00 CAD', tax: 'incl. HST 13%', issued: 'Apr 1, 2026', due: 'May 1, 2026', status: 'paid' },
  { id: '3', number: 'INV-007', client: 'Halifax Brew Co.', country: '🇨🇦 Nova Scotia, Canada', amount: '$977.50 CAD', tax: 'incl. HST 15%', issued: 'Mar 15, 2026', due: 'Apr 14, 2026', status: 'overdue' },
  { id: '4', number: 'INV-006', client: 'TechStart BC', country: '🇨🇦 British Columbia', amount: '$2,520.00 CAD', tax: 'incl. GST + PST', issued: 'Mar 5, 2026', due: 'Apr 4, 2026', status: 'paid' },
  { id: '5', number: 'INV-005', client: 'Montreal Agency', country: '🇨🇦 Quebec, Canada', amount: '$1,807.38 CAD', tax: 'incl. GST + QST', issued: 'Feb 20, 2026', due: 'Mar 22, 2026', status: 'paid' },
]

const statusStyles: Record<string, { bg: string; color: string; label: string }> = {
  draft:   { bg: '#f0f0f0',   color: '#666',     label: 'Draft' },
  sent:    { bg: '#dbeafe',   color: '#1d4ed8',  label: 'Sent' },
  paid:    { bg: '#dcfce7',   color: '#166534',  label: 'Paid' },
  overdue: { bg: '#fee2e2',   color: '#991b1b',  label: 'Overdue' },
}

export default function DashboardPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start px-8 pt-8">
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--forest)', letterSpacing: '-0.5px' }}>
            Invoices
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>April 2026 · Nova Scotia, Canada</p>
        </div>
        <Link
          href="/invoices/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
          style={{ background: 'var(--sage)', fontSize: 13.5 }}
        >
          + New Invoice
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 px-8 py-6">
        {[
          { label: 'Paid This Month', value: '$4,200', note: '3 invoices settled', accent: 'var(--mint)' },
          { label: 'Outstanding', value: '$2,750', note: '2 invoices pending', accent: 'var(--amber)' },
          { label: 'Overdue', value: '$850', note: '1 invoice past due', accent: 'var(--red)' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5 relative overflow-hidden"
            style={{ background: 'white', border: '1.5px solid var(--border)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: stat.accent }} />
            <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 500 }}>
              {stat.label}
            </div>
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: 'var(--forest)', marginTop: 6, letterSpacing: '-1px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 4 }}>{stat.note}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="px-8 pb-8">
        <div className="flex justify-between items-center mb-3">
          <span style={{ fontSize: 13, fontWeight: 600 }}>Recent Invoices</span>
          <div className="flex gap-2">
            {['All', 'Sent', 'Paid', 'Overdue'].map((f, i) => (
              <button
                key={f}
                className="px-3 py-1 rounded-full text-xs font-medium border transition-colors"
                style={{
                  border: '1.5px solid var(--border)',
                  background: i === 0 ? 'rgba(45,106,79,0.05)' : 'white',
                  color: i === 0 ? 'var(--sage)' : 'var(--muted)',
                  borderColor: i === 0 ? 'var(--sage)' : 'var(--border)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full" style={{ borderCollapse: 'collapse', background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'var(--warm)', borderBottom: '1.5px solid var(--border)' }}>
              {['Invoice #', 'Client', 'Amount', 'Issued', 'Due', 'Status'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((inv, i) => {
              const s = statusStyles[inv.status]
              return (
                <tr key={inv.id} style={{ borderBottom: i < mockInvoices.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ fontFamily: "'DM Serif Display', serif", fontWeight: 600, color: 'var(--forest)' }}>{inv.number}</span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 500, fontSize: 13.5 }}>{inv.client}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{inv.country}</div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{inv.amount}</div>
                    <div style={{ fontSize: 11.5, color: inv.tax === 'Zero-rated' ? 'var(--sage)' : 'var(--muted)' }}>{inv.tax}</div>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: 13 }}>{inv.issued}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: 13 }}>{inv.due}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: s.bg, color: s.color, padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                      {s.label}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

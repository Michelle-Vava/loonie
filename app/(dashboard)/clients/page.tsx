'use client'

const mockClients = [
  { name: 'Acme Corp', email: 'billing@acmecorp.com', country: '🇺🇸 United States', tax: 'Zero-rated', lastInvoice: 'Apr 10, 2026', total: '$7,500 USD' },
  { name: 'Maple Media', email: 'accounts@maplemedia.ca', country: '🇨🇦 Ontario', tax: 'HST 13%', lastInvoice: 'Apr 1, 2026', total: '$4,800 CAD' },
  { name: 'Halifax Brew Co.', email: 'finance@halifaxbrew.ca', country: '🇨🇦 Nova Scotia', tax: 'HST 15%', lastInvoice: 'Mar 15, 2026', total: '$2,300 CAD' },
  { name: 'TechStart BC', email: 'ap@techstartbc.com', country: '🇨🇦 British Columbia', tax: 'GST + PST', lastInvoice: 'Mar 5, 2026', total: '$6,100 CAD' },
  { name: 'Montreal Agency', email: 'billing@mtlagency.ca', country: '🇨🇦 Quebec', tax: 'GST + QST', lastInvoice: 'Feb 20, 2026', total: '$3,200 CAD' },
]

export default function ClientsPage() {
  return (
    <div>
      <div className="flex justify-between items-start px-8 pt-8 pb-6">
        <div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--forest)', letterSpacing: '-0.5px' }}>Clients</h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>5 saved clients</p>
        </div>
        <button style={{ background: 'var(--sage)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>
          + Add Client
        </button>
      </div>

      <div className="px-8 pb-8">
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: 'var(--warm)', borderBottom: '1.5px solid var(--border)' }}>
              {['Client', 'Country / Province', 'Tax Treatment', 'Last Invoice', 'Total Billed'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.7px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockClients.map((c, i) => (
              <tr key={c.name} style={{ borderBottom: i < mockClients.length - 1 ? '1px solid var(--border)' : 'none', cursor: 'pointer' }}>
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.email}</div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13.5 }}>{c.country}</td>
                <td style={{ padding: '14px 16px' }}>
                  <span style={{ background: '#f0f0f0', color: '#555', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{c.tax}</span>
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--muted)', fontSize: 13 }}>{c.lastInvoice}</td>
                <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: 13.5 }}>{c.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

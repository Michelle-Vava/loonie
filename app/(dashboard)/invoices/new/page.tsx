'use client'

import { useState, useEffect } from 'react'
import { useInvoiceStore } from '@/store/invoiceStore'
import { calculateTax } from '@/lib/tax'
import type { TaxLine } from '@/types/tax'

const PROVINCES = [
  { code: 'NS', name: 'Nova Scotia' }, { code: 'ON', name: 'Ontario' },
  { code: 'BC', name: 'British Columbia' }, { code: 'AB', name: 'Alberta' },
  { code: 'QC', name: 'Quebec' }, { code: 'MB', name: 'Manitoba' },
  { code: 'SK', name: 'Saskatchewan' }, { code: 'NB', name: 'New Brunswick' },
  { code: 'PEI', name: 'PEI' }, { code: 'NL', name: 'Newfoundland' },
  { code: 'YT', name: 'Yukon' }, { code: 'NT', name: 'NWT' }, { code: 'NU', name: 'Nunavut' },
]

const label = (text: string) => (
  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 500, color: 'var(--muted)', marginBottom: 5, letterSpacing: '0.2px' }}>
    {text}
  </label>
)

const inputStyle = {
  width: '100%', padding: '9px 12px', border: '1.5px solid var(--border)',
  borderRadius: 7, fontFamily: 'inherit', fontSize: 13.5, color: 'var(--ink)',
  background: 'var(--paper)', outline: 'none',
}

export default function NewInvoicePage() {
  const { lineItems, addLineItem, removeLineItem, updateLineItem } = useInvoiceStore()
  const [currency, setCurrency] = useState<'CAD' | 'USD'>('CAD')
  const [clientCountry, setClientCountry] = useState('US')
  const [clientProvince, setClientProvince] = useState('NS')
  const [taxLines, setTaxLines] = useState<TaxLine[]>([])

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const taxTotal = taxLines.reduce((sum, t) => sum + t.amount, 0)
  const total = subtotal + taxTotal

  useEffect(() => {
    const lines = calculateTax('NS', clientCountry, clientCountry === 'CA' ? clientProvince : null, subtotal, true)
    setTaxLines(lines)
  }, [clientCountry, clientProvince, subtotal])

  const sectionStyle = {
    background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 16,
  }

  const sectionTitle = (t: string) => (
    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase' as const, letterSpacing: '0.8px', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
      {t}
    </div>
  )

  return (
    <div>
      <div className="px-8 pt-8 pb-4">
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--forest)', letterSpacing: '-0.5px' }}>
          New Invoice
        </h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Fill in the details — tax is calculated automatically</p>
      </div>

      <div className="flex gap-6 px-8 pb-8 items-start">
        {/* Left column */}
        <div className="flex-1">
          {/* Client */}
          <div style={sectionStyle}>
            {sectionTitle('Client')}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                {label('Client Name')}
                <input style={inputStyle} defaultValue="Acme Corp" />
              </div>
              <div>
                {label('Client Email')}
                <input type="email" style={inputStyle} defaultValue="billing@acmecorp.com" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                {label('Country')}
                <select style={inputStyle} value={clientCountry} onChange={e => setClientCountry(e.target.value)}>
                  <option value="US">🇺🇸 United States</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="other">Other International</option>
                </select>
              </div>
              {clientCountry === 'CA' && (
                <div>
                  {label('Province')}
                  <select style={inputStyle} value={clientProvince} onChange={e => setClientProvince(e.target.value)}>
                    {PROVINCES.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                  </select>
                </div>
              )}
              <div>
                {label('Invoice #')}
                <input style={inputStyle} defaultValue="INV-010" />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div style={sectionStyle}>
            {sectionTitle('Invoice Details')}
            <div className="grid grid-cols-2 gap-3">
              <div>
                {label('Issue Date')}
                <input type="date" style={inputStyle} defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
              <div>
                {label('Due Date')}
                <input type="date" style={inputStyle} defaultValue={new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]} />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div style={sectionStyle}>
            {sectionTitle('Line Items')}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--warm)', borderBottom: '1.5px solid var(--border)' }}>
                  {['Description', 'Qty', 'Rate', 'Amount', ''].map((h, i) => (
                    <th key={i} style={{ textAlign: 'left', padding: '8px 10px', fontSize: 10.5, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: 600, width: ['45%','12%','18%','18%','7%'][i] }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 10px' }}>
                      <input style={inputStyle} value={item.description} onChange={e => updateLineItem(idx, 'description', e.target.value)} placeholder="Description" />
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <input type="number" style={{ ...inputStyle, textAlign: 'center' }} value={item.quantity} onChange={e => updateLineItem(idx, 'quantity', parseFloat(e.target.value) || 0)} />
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <input type="number" style={inputStyle} value={item.rate} onChange={e => updateLineItem(idx, 'rate', parseFloat(e.target.value) || 0)} />
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <input style={{ ...inputStyle, background: 'var(--warm)', fontWeight: 600 }} value={`$${item.amount.toFixed(2)}`} readOnly />
                    </td>
                    <td style={{ padding: '8px 10px' }}>
                      <button onClick={() => removeLineItem(idx)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 16, padding: 4 }}>×</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={addLineItem}
              style={{ background: 'none', border: '1.5px dashed var(--border)', color: 'var(--sage)', padding: '8px 16px', borderRadius: 7, fontSize: 12.5, fontWeight: 500, cursor: 'pointer', marginTop: 10, width: '100%', fontFamily: 'inherit' }}
            >
              + Add line item
            </button>
          </div>

          {/* Notes */}
          <div style={sectionStyle}>
            {sectionTitle('Notes & Payment Instructions')}
            <div>
              {label('Payment Instructions')}
              <textarea style={{ ...inputStyle, minHeight: 70, resize: 'vertical' } as React.CSSProperties} defaultValue="E-Transfer to michelle@example.com · Payment due within 30 days. Thank you!" />
            </div>
          </div>
        </div>

        {/* Summary sidebar */}
        <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, padding: 22, width: 300, position: 'sticky', top: 20 }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: 'var(--forest)', marginBottom: 16 }}>
            Invoice Summary
          </div>

          {/* Currency toggle */}
          <div style={{ display: 'flex', background: 'var(--warm)', borderRadius: 8, padding: 3, marginBottom: 16, border: '1.5px solid var(--border)' }}>
            {(['CAD', 'USD'] as const).map(c => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                style={{ flex: 1, padding: 6, textAlign: 'center', fontSize: 12.5, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'all 0.15s', background: currency === c ? 'white' : 'transparent', color: currency === c ? 'var(--forest)' : 'var(--muted)', boxShadow: currency === c ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' }}
              >
                {c} $
              </button>
            ))}
          </div>

          {/* Tax box */}
          <div style={{ background: 'rgba(45,106,79,0.04)', border: '1.5px solid rgba(45,106,79,0.15)', borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--sage)', marginBottom: 10 }}>
              🇨🇦 Tax Calculation
            </div>
            {taxLines.length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic' }}>No tax (seller not registered)</div>
            ) : taxLines.map((t, i) => (
              <div key={i}>
                {t.rate === 0 ? (
                  <>
                    <div style={{ fontSize: 13, color: 'var(--muted)', fontStyle: 'italic' }}>No tax charged</div>
                    {t.note && <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 6, fontStyle: 'italic' }}>{t.note}</div>}
                  </>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
                    <span>{t.name} ({(t.rate * 100).toFixed(t.rate === 0.09975 ? 3 : 0)}%)</span>
                    <span>${t.amount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Totals */}
          {[
            { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
            ...taxLines.filter(t => t.rate > 0).map(t => ({ label: `${t.name}`, value: `$${t.amount.toFixed(2)}` })),
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)' }}>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 15, paddingTop: 12, color: 'var(--forest)' }}>
            <span>Total</span>
            <span>{currency} ${total.toFixed(2)}</span>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
            <button style={{ background: 'var(--sage)', color: 'white', border: 'none', padding: 12, borderRadius: 8, fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
              📧 Send to Client
            </button>
            <button style={{ background: 'white', color: 'var(--ink)', border: '1.5px solid var(--border)', padding: 10, borderRadius: 8, fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              📄 Preview PDF
            </button>
            <button style={{ background: 'none', color: 'var(--muted)', border: 'none', padding: 8, fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer' }}>
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

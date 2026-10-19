'use client'

import { useState } from 'react'

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div
      onClick={() => setOn(!on)}
      style={{ width: 40, height: 22, background: on ? 'var(--sage)' : 'var(--border)', borderRadius: 11, position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
    >
      <div style={{ width: 18, height: 18, background: 'white', borderRadius: '50%', position: 'absolute', top: 2, left: on ? 20 : 2, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </div>
  )
}

const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid var(--border)', borderRadius: 7, fontFamily: 'inherit', fontSize: 13.5, color: 'var(--ink)', background: 'var(--paper)', outline: 'none' }
const label = (t: string) => <label style={{ display: 'block', fontSize: 11.5, fontWeight: 500, color: 'var(--muted)', marginBottom: 5 }}>{t}</label>

export default function SettingsPage() {
  return (
    <div>
      <div className="px-8 pt-8 pb-6">
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: 'var(--forest)', letterSpacing: '-0.5px' }}>Settings</h1>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>Manage your business profile and preferences</p>
      </div>

      <div className="px-8 pb-8" style={{ maxWidth: 640 }}>
        {/* Business Profile */}
        <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest)', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
            🏢 Business Profile
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>{label('Full Name')}<input style={inputStyle} defaultValue="Michelle Johnson" /></div>
            <div>{label('Business Name')}<input style={inputStyle} defaultValue="Michelle Dev Studio" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              {label('Province')}
              <select style={inputStyle}>
                <option>Nova Scotia</option>
                <option>Ontario</option>
                <option>British Columbia</option>
                <option>Alberta</option>
                <option>Quebec</option>
              </select>
            </div>
            <div>
              {label('Default Currency')}
              <select style={inputStyle}>
                <option>CAD — Canadian Dollar</option>
                <option>USD — US Dollar</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>{label('GST/HST Number')}<input style={inputStyle} defaultValue="123 456 789 RT0001" /></div>
            <div>{label('QST Number (Quebec only)')}<input style={inputStyle} placeholder="Leave blank if not applicable" /></div>
          </div>
          <button style={{ background: 'var(--sage)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>
            Save Changes
          </button>
        </div>

        {/* Tax Settings */}
        <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--forest)', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
            🧾 Tax Settings
          </div>
          {[
            { label: 'I am registered for GST/HST', desc: 'Enables tax lines on Canadian client invoices. Toggle off if under $30K/yr threshold.', defaultOn: true },
            { label: 'Show zero-rated note on international invoices', desc: 'Adds CRA zero-rated export note to US/international invoices automatically.', defaultOn: true },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{row.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{row.desc}</div>
              </div>
              <Toggle defaultOn={row.defaultOn} />
            </div>
          ))}
        </div>

        {/* Subscription */}
        <div style={{ background: 'white', border: '1.5px solid var(--border)', borderRadius: 12, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: 'var(--forest)', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
            💳 Subscription
            <span style={{ background: 'linear-gradient(135deg, var(--sage), var(--forest))', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
              Pro · Active
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>Monthly Plan</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>$19 CAD/month · Next billing: May 18, 2026</div>
            </div>
            <button style={{ background: 'white', color: 'var(--ink)', border: '1.5px solid var(--border)', padding: '9px 18px', borderRadius: 8, fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              Manage Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

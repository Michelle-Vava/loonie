'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', icon: '▦', label: 'Dashboard' },
  { href: '/invoices/new', icon: '✏', label: 'New Invoice' },
  { href: '/clients', icon: '👤', label: 'Clients' },
  { href: '/settings', icon: '⚙', label: 'Settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Sidebar */}
      <aside
        className="w-[220px] min-h-screen flex flex-col py-7 fixed top-0 left-0 bottom-0"
        style={{ background: 'var(--forest)' }}
      >
        <div className="px-6 pb-8 mb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: 'white', letterSpacing: '-0.3px' }}>
            Loonie
          </div>
          <div style={{ fontSize: 10, color: 'var(--mint)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>
            🇨🇦 Canadian Freelancers
          </div>
        </div>

        <div style={{ fontSize: 9.5, letterSpacing: '1.8px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', padding: '0 24px 6px' }}>
          Main
        </div>

        <nav className="flex flex-col">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-6 py-2.5 text-sm transition-all"
                style={{
                  color: active ? 'white' : 'rgba(255,255,255,0.55)',
                  background: active ? 'rgba(82,183,136,0.12)' : 'transparent',
                  borderLeft: active ? '2px solid var(--mint)' : '2px solid transparent',
                  fontWeight: active ? 500 : 400,
                  fontSize: 13.5,
                }}
              >
                <span style={{ width: 18, textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto px-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
              style={{ background: 'var(--mint)', color: 'var(--forest)' }}
            >
              M
            </div>
            <div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.75)' }}>Michelle</div>
              <div style={{ fontSize: 10, color: 'var(--mint)' }}>Pro Plan ✓</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1" style={{ marginLeft: 220 }}>
        {children}
      </main>
    </div>
  )
}

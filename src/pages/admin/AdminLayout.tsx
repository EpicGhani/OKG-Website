import { useState } from 'react'
import type { CSSProperties } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/authContext'
import { Icon } from '../../ui'

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/games', label: 'Games', end: false },
  { to: '/admin/articles', label: 'Articles', end: false },
  { to: '/admin/devlogs', label: 'Devlogs', end: false },
  { to: '/admin/media', label: 'Media', end: false },
]

const navLinkStyle = (isActive: boolean): CSSProperties => ({
  fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em',
  padding: '10px 12px', borderRadius: 'var(--radius-sm)', textDecoration: 'none', whiteSpace: 'nowrap',
  color: isActive ? 'var(--itim-900)' : 'var(--text-on-dark-muted)',
  background: isActive ? 'var(--pula-300)' : 'transparent',
  fontWeight: isActive ? 700 : 500,
})

const footerLink: CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-on-dark-muted)', textDecoration: 'none', paddingLeft: 12, whiteSpace: 'nowrap' }
const signoutBtn: CSSProperties = { textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--pula-300)', paddingLeft: 12, whiteSpace: 'nowrap' }

export function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    setMenuOpen(false)
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--buhangin-100)', paddingLeft: 10, flexShrink: 0 }}>Obra Kasi</div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} style={({ isActive }) => navLinkStyle(isActive)}>{item.label}</NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a href="/" style={footerLink}>← View site</a>
          <button onClick={handleLogout} style={signoutBtn}>Sign out</button>
        </div>

        <button className="admin-burger" type="button" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}
          style={{ alignItems: 'center', justifyContent: 'center', width: 40, height: 40, cursor: 'pointer', background: 'transparent', border: '1.5px solid var(--itim-600)', borderRadius: 'var(--radius-sm)', color: 'var(--buhangin-100)' }}>
          <Icon name={menuOpen ? 'x' : 'menu'} size={20} />
        </button>

        {menuOpen && (
          <div className="admin-mobile-menu" style={{ position: 'absolute', top: '100%', left: 0, right: 0, flexDirection: 'column', gap: 4, padding: '12px 16px 16px', background: 'var(--surface-ink)', borderTop: '1.5px solid var(--itim-700)', boxShadow: 'var(--shadow-lg)', zIndex: 40 }}>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)} style={({ isActive }) => navLinkStyle(isActive)}>{item.label}</NavLink>
            ))}
            <div style={{ height: 1, background: 'var(--itim-700)', margin: '8px 0' }} />
            <a href="/" style={footerLink}>← View site</a>
            <button onClick={handleLogout} style={signoutBtn}>Sign out</button>
          </div>
        )}
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
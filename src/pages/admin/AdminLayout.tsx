import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/authContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/devlogs', label: 'Devlogs', end: false },
  { to: '/admin/games', label: 'Games', end: false },
  { to: '/admin/media', label: 'Media', end: false },
]

export function AdminLayout() {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div style={{ display: 'flex', minHeight: '100svh', background: 'var(--bg)' }}>
      <aside style={{ width: 240, flexShrink: 0, background: 'var(--surface-ink)', color: 'var(--text-on-dark)', padding: '28px 18px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--buhangin-100)', paddingLeft: 10 }}>Obra Kasi</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.04em',
                padding: '10px 12px', borderRadius: 'var(--radius-sm)', textDecoration: 'none',
                color: isActive ? 'var(--itim-900)' : 'var(--text-on-dark-muted)',
                background: isActive ? 'var(--pula-300)' : 'transparent',
                fontWeight: isActive ? 700 : 500,
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <a href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-on-dark-muted)', textDecoration: 'none', paddingLeft: 12 }}>← View site</a>
          <button onClick={handleLogout} style={{ textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--pula-300)', paddingLeft: 12 }}>Sign out</button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '40px 48px', minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  )
}
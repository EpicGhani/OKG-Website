import { useEffect, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button, Icon } from '../ui'
import logoCream from '../assets/logo-cream.png'

const nav = [
  { id: 'studio', label: 'Studio', to: '/#studio' },
  { id: 'what-we-do', label: 'What we do', to: '/#what-we-do' },
  { id: 'games', label: 'Games', to: '/#games' },
  { id: 'devlog', label: 'Devlog', to: '/devlog' },
  { id: 'work-with-us', label: 'Work with us', to: '/#work-with-us' },
]

const linkBase: CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
  padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', textDecoration: 'none',
  transition: 'color var(--dur-fast)',
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const ids = ['studio', 'what-we-do', 'games', 'work-with-us']
      let current = 'home'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActiveItem = (n: (typeof nav)[number]) => {
    const isRoute = !n.to.includes('#')
    return isRoute ? location.pathname === n.to : location.pathname === '/' && active === n.id
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'color-mix(in srgb, var(--itim-900) 94%, transparent)' : 'var(--surface-ink)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1.5px solid var(--itim-600)',
      transition: 'background var(--dur-base) var(--ease-out)',
    }}>
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)', height: '72px',
        display: 'flex', alignItems: 'center', gap: '28px', boxSizing: 'border-box',
      }}>
        <Link to="/" onClick={() => setMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none' }}>
          <img src={logoCream} alt="Obra Kasi" style={{ height: '40px', display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em', color: 'var(--buhangin-100)', textTransform: 'uppercase' }}>
            Obra Kasi Games
          </span>
        </Link>

        <nav className="ok-nav-desktop" style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
          {nav.map((n) => {
            const isActive = isActiveItem(n)
            const onEnter = (e: MouseEvent<HTMLAnchorElement>) => { if (!isActive) e.currentTarget.style.color = 'var(--buhangin-100)' }
            const onLeave = (e: MouseEvent<HTMLAnchorElement>) => { if (!isActive) e.currentTarget.style.color = 'var(--text-on-dark-muted)' }
            return (
              <Link key={n.id} to={n.to} onMouseEnter={onEnter} onMouseLeave={onLeave}
                style={{ ...linkBase, fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--pula-300)' : 'var(--text-on-dark-muted)' }}>
                {n.label}
              </Link>
            )
          })}
        </nav>

        <Link className="ok-nav-desktop" to="/#work-with-us" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Button variant="stamp" size="sm">Contact</Button>
        </Link>

        <button className="ok-burger" type="button" aria-label="Menu" onClick={() => setMenuOpen((o) => !o)}
          style={{ marginLeft: 'auto', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, cursor: 'pointer', background: 'transparent', border: '1.5px solid var(--itim-600)', borderRadius: 'var(--radius-sm)', color: 'var(--buhangin-100)' }}>
          <Icon name={menuOpen ? 'x' : 'menu'} size={20} />
        </button>
      </div>

      {menuOpen && (
         <div className="ok-mobile-menu" style={{ position: 'absolute', top: '100%', left: 0, right: 0, flexDirection: 'column', padding: '12px clamp(20px, 5vw, 40px) 20px', borderTop: '1.5px solid var(--itim-700)', background: 'var(--surface-ink)', boxShadow: 'var(--shadow-lg)' }}>
          {nav.map((n) => (
            <Link key={n.id} to={n.to} onClick={() => setMenuOpen(false)}
              style={{ ...linkBase, padding: '12px 6px', fontWeight: isActiveItem(n) ? 700 : 500, color: isActiveItem(n) ? 'var(--pula-300)' : 'var(--text-on-dark-muted)' }}>
              {n.label}
            </Link>
          ))}
          <Link to="/#work-with-us" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', marginTop: 8 }}>
            <Button variant="stamp" size="sm" block>Contact</Button>
          </Link>
        </div>
      )}
    </header>
  )
}
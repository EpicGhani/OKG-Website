import { useEffect, useState } from 'react'
import { Button } from '../ui'
import logoCream from '../assets/logo-cream.png'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

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

  const nav = [
    { id: 'studio', label: 'Studio' },
    { id: 'what-we-do', label: 'What we do' },
    { id: 'games', label: 'Games' },
    { id: 'work-with-us', label: 'Work with us' },
  ]

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'color-mix(in srgb, var(--itim-900) 94%, transparent)' : 'var(--surface-ink)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1.5px solid var(--itim-600)',
      transition: 'background var(--dur-base) var(--ease-out)',
    }}>
      <div style={{
        maxWidth: 'var(--container)', margin: '0 auto', padding: '0 40px', height: '72px',
        display: 'flex', alignItems: 'center', gap: '28px', boxSizing: 'border-box',
      }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none' }}>
          <img src={logoCream} alt="Obra Kasi" style={{ height: '40px', display: 'block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em', color: 'var(--buhangin-100)', textTransform: 'uppercase' }}>
            Obra Kasi Games
          </span>
        </a>

        <nav style={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
          {nav.map((n) => (
            <a key={n.id} href={'#' + n.id} style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase',
              fontWeight: active === n.id ? 700 : 500,
              color: active === n.id ? 'var(--pula-300)' : 'var(--text-on-dark-muted)',
              padding: '10px 14px', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
              textDecoration: 'none', transition: 'color var(--dur-fast)',
            }}
              onMouseEnter={(e) => { if (active !== n.id) e.currentTarget.style.color = 'var(--buhangin-100)' }}
              onMouseLeave={(e) => { if (active !== n.id) e.currentTarget.style.color = 'var(--text-on-dark-muted)' }}
            >{n.label}</a>
          ))}
        </nav>

        <a href="#work-with-us" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Button variant="stamp" size="sm">Contact</Button>
        </a>
      </div>
    </header>
  )
}
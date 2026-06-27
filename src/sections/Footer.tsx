import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import logoCream from '../assets/logo-cream.png'

const studio = [
  { label: 'Our story', to: '/#studio' },
  { label: 'Games', to: '/games' },
  { label: 'Devlog', to: '/devlog' },
  { label: 'Contact', to: '/#work-with-us' },
]
const community = ['Discord', 'Steam', 'Itch.io', 'YouTube']

const colHeading: CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--pula-300)', margin: '0 0 16px' }
const listStyle: CSSProperties = { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '11px' }
const linkStyle: CSSProperties = { color: 'var(--buhangin-100)', textDecoration: 'none', fontSize: '14px', opacity: 0.85 }

export function Footer() {
  return (
    <footer style={{ background: 'var(--itim-900)', color: 'var(--buhangin-100)' }}>
      <div className="ok-band-okir" style={{ height: '22px', '--mark-color': 'var(--pula-500)', opacity: 0.6 } as CSSProperties} />

      <div className="stack-mobile" style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '56px clamp(20px, 5vw, 40px) 36px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '36px', boxSizing: 'border-box' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img src={logoCream} alt="Obra Kasi" style={{ height: '42px', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}>Obra Kasi</span>
          </div>
          <p style={{ margin: 0, color: 'var(--itim-300)', fontSize: '14px', lineHeight: 1.6, maxWidth: '34ch' }}>
            We build rooted games from the islands. Folklore, pattern, and play, all generated locally.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
          <div>
            <p style={colHeading}>Studio</p>
            <ul style={listStyle}>
              {studio.map((s) => (
                <li key={s.label}><Link to={s.to} style={linkStyle}>{s.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p style={colHeading}>Community</p>
            <ul style={listStyle}>
              {community.map((c) => (
                <li key={c}><a href="#" style={linkStyle}>{c}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px) 36px', display: 'flex', justifyContent: 'space-between', color: 'var(--itim-400)', fontSize: '12px', fontFamily: 'var(--font-mono)', flexWrap: 'wrap', gap: 12, boxSizing: 'border-box' }}>
        <span>© 2026 Obra Kasi Games · Proudly rooted in Manila</span>
        <span>Tabi-tabi po.</span>
      </div>
    </footer>
  )
}
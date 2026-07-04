import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDevlogs } from '../../data/useDevlogs'
import { useGames } from '../../data/useGames'
import { useArticles } from '../../data/useArticles'

export function Dashboard() {
  const { devlogs } = useDevlogs()
  const { games } = useGames()
  const { articles } = useArticles()
  const [hover, setHover] = useState<string | null>(null)

  const stats = [
    { label: 'Games', value: games.length, to: '/admin/games' },
    { label: 'Articles', value: articles.length, to: '/admin/articles' },
    { label: 'Devlogs', value: devlogs.length, to: '/admin/devlogs' },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: '8px 0 0' }}>Manage your content.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20, marginTop: 32 }}>
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            onMouseEnter={() => setHover(s.label)}
            onMouseLeave={() => setHover(null)}
            style={{
              textDecoration: 'none', display: 'block',
              background: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', padding: '24px 26px',
              boxShadow: hover === s.label ? '6px 6px 0 var(--itim-800)' : 'var(--shadow-stamp-sm)',
              transform: hover === s.label ? 'translate(-2px, -2px)' : 'none',
              transition: 'transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap)',
            }}
          >
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</p>
            <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, color: 'var(--primary)' }}>{s.value}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
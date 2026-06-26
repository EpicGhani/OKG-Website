import { useGames } from '../../data/useGames'
import { useDevlogs } from '../../data/useDevlogs'

export function Dashboard() {
  const { devlogs } = useDevlogs()
  const { games } = useGames()
  const stats = [
    { label: 'Devlogs', value: devlogs.length },
    { label: 'Games', value: games.length },
  ]

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>Dashboard</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: '8px 0 0' }}>Manage your content.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 20, marginTop: 32 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: 'var(--surface)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-stamp-sm)', padding: '24px 26px' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.label}</p>
            <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, color: 'var(--primary)' }}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
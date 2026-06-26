import { Link } from 'react-router-dom'
import { useDevlogs } from '../../data/useDevlogs'
import { deleteDevlog } from '../../data/devlogMutations'
import { resolveAccent, Button } from '../../ui'
import { formatDevlogDate } from '../../data/formatDate'

export function AdminDevlogs() {
  const { devlogs, loading, refetch } = useDevlogs()

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    const { error } = await deleteDevlog(slug)
    if (error) window.alert(error)
    else refetch()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>Devlogs</h1>
        <Link to="/admin/devlogs/new" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="sm">New devlog</Button>
        </Link>
      </div>

      {loading ? (
        <p style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
      ) : (
        <div style={{ marginTop: 28, border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface)' }}>
          {devlogs.map((d, i) => {
            const accent = resolveAccent(d)
            return (
              <div key={d.slug} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderTop: i === 0 ? 'none' : '1.5px solid var(--border)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: accent.color, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)', width: 44 }}>#{d.n}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {d.title}
                    {d.status === 'draft' && <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>Draft</span>}
                  </p>
                  <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{d.kicker} · {formatDevlogDate(d.created_at)}</p>
                </div>
                <Link to={`/admin/devlogs/${d.slug}/edit`} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary)', textDecoration: 'none' }}>Edit</Link>
                <button onClick={() => handleDelete(d.slug, d.title)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--pula-700)' }}>Delete</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
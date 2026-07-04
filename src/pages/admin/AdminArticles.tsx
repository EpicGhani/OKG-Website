import { Link } from 'react-router-dom'
import { useArticles } from '../../data/useArticles'
import { deleteArticle } from '../../data/articleMutations'
import { accentFor, Button } from '../../ui'
import { formatDevlogDate } from '../../data/formatDate'

export function AdminArticles() {
  const { articles, loading, refetch } = useArticles()

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    const { error } = await deleteArticle(slug)
    if (error) window.alert(error)
    else refetch()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>Articles</h1>
        <Link to="/admin/articles/new" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="sm">New article</Button>
        </Link>
      </div>

      {loading ? (
        <p style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
      ) : (
        <div style={{ marginTop: 28, border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface)' }}>
          {articles.map((a, i) => {
            const accent = accentFor(a.accent, a.slug)
            return (
              <div key={a.slug} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderTop: i === 0 ? 'none' : '1.5px solid var(--border)' }}>
                {a.cover_image ? (
                  <img src={a.cover_image} alt="" style={{ width: 64, height: 40, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-ink)', flexShrink: 0 }} />
                ) : (
                  <span style={{ width: 64, height: 40, borderRadius: 'var(--radius-sm)', background: accent.soft, border: `1.5px solid ${accent.color}`, flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {a.title}
                    {!a.published && <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>Draft</span>}
                  </p>
                  <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{a.author}{a.author && ' · '}{formatDevlogDate(a.created_at)}</p>
                </div>
                <Link to={`/admin/articles/${a.slug}/edit`} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--primary)', textDecoration: 'none' }}>Edit</Link>
                <button onClick={() => handleDelete(a.slug, a.title)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--pula-700)' }}>Delete</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
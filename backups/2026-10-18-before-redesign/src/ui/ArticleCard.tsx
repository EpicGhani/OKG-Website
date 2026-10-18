import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { accentFor, patternClassFor } from './devlogAccents'
import { formatDevlogDate } from '../data/formatDate'
import type { Article } from '../data/types'

export function ArticleCard({ article }: { article: Article }) {
  const [hover, setHover] = useState(false)
  const accent = accentFor(article.accent, article.slug)
  const patternClass = patternClassFor(article.pattern)

  return (
    <Link to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--surface)',
          border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          boxShadow: hover ? '6px 6px 0 var(--itim-800)' : 'var(--shadow-stamp-sm)',
          transform: hover ? 'translate(-2px, -2px)' : 'none',
          transition: 'transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap)',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden', background: accent.soft }}>
          {article.cover_image ? (
            <img src={article.cover_image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': accent.soft, opacity: 0.35 } as CSSProperties} />
          )}
        </div>
        <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {article.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {article.tags.map((t) => <Badge key={t} tone="ink" variant="soft" size="sm">{t}</Badge>)}
            </div>
          )}
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 23, lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>{article.title}</h3>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, fontWeight: 300 }}>{article.excerpt}</p>
          <p style={{ marginTop: 'auto', paddingTop: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
            {article.author}{article.author && ' · '}{formatDevlogDate(article.created_at)}
          </p>
        </div>
      </article>
    </Link>
  )
}
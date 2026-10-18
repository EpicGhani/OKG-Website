import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { Band, Icon } from './Bits'
import { accentFor, patternClassFor } from './devlogAccents'
import { formatDevlogDate } from '../data/formatDate'
import type { Article } from '../data/types'
import '../styles/ui/article-card.css'

export function ArticleCard({ article, layout = 'default', compact = false, excerpt = article.excerpt }: { article: Article; layout?: 'default' | 'featured'; compact?: boolean; excerpt?: string }) {
  const [hover, setHover] = useState(false)
  const accent = accentFor(article.accent, article.slug)
  const patternClass = patternClassFor(article.pattern)

  return (
    <Link className={`article-card article-card--${layout}`} to={`/articles/${article.slug}`} style={{ textDecoration: 'none' }}>
      <article
        className="article-card__body"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          height: '100%', background: 'var(--surface)',
          border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          boxShadow: hover ? '6px 6px 0 var(--itim-800)' : 'var(--shadow-stamp-sm)',
          transform: hover ? 'translate(-2px, -2px)' : 'none',
          transition: 'transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap)',
        }}
      >
        {compact ? <Band kind={accent.band} color={accent.color} height={20} /> : <div className="article-card__visual" style={{ position: 'relative', overflow: 'hidden', background: accent.soft }}>
          {article.cover_image ? (
            <img src={article.cover_image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': accent.soft, opacity: 0.35 } as CSSProperties} />
          )}
        </div>}
        <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          {!compact && article.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {article.tags.map((t) => <Badge key={t} tone="ink" variant="soft" size="sm">{t}</Badge>)}
            </div>
          )}
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--update-title-size, 23px)', lineHeight: 1.15, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>{article.title}</h3>
          {!compact && <p style={{ fontSize: 'var(--update-body-size, 14.5px)', lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, fontWeight: 'var(--update-body-weight, 300)' }}>{excerpt}</p>}
          <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontFamily: 'var(--font-mono)', fontSize: 'var(--update-meta-size, 11px)', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
            <span>{!compact && article.author && `${article.author} · `}{formatDevlogDate(article.created_at)}</span>
            {(compact || layout === 'featured') && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: accent.color }}>Read <Icon name="arrow-right" size={14} /></span>}
          </div>
        </div>
      </article>
    </Link>
  )
}

import { Link, useParams } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Button, Container, Icon, Band, Badge, RichText, accentFor, patternClassFor } from '../ui'
import { useArticle } from '../data/useArticles'
import { formatDevlogDate } from '../data/formatDate'
import { useSeo } from '../lib/useSeo'

export function ArticleDetailPage() {
  const { slug } = useParams()
  const { article, loading } = useArticle(slug)
  useSeo(article ? `${article.title} — Obra Kasi` : undefined, article?.excerpt)

  if (loading) {
    return (
      <main>
        <section style={{ minHeight: '70svh', display: 'flex', alignItems: 'center', background: 'var(--bg)' }}>
          <Container style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
          </Container>
        </section>
      </main>
    )
  }

  if (!article) {
    return (
      <main>
        <section style={{ position: 'relative', background: 'var(--bg)', minHeight: '70svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
          <Container style={{ position: 'relative', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>404</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--primary)', margin: '14px 0 0' }}>Article not found</h1>
            <Link to="/articles" style={{ display: 'inline-block', marginTop: 24, textDecoration: 'none' }}>
              <Button variant="outline" size="sm" iconLeft={<Icon name="arrow-left" size={15} />}>All articles</Button>
            </Link>
          </Container>
        </section>
      </main>
    )
  }

  const accent = accentFor(article.accent, article.slug)
  const patternClass = patternClassFor(article.pattern)

  return (
    <main>
      <section style={{ position: 'relative', background: accent.soft, overflow: 'hidden', paddingTop: 120 }}>
        <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': accent.soft, opacity: 0.16 } as CSSProperties} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--buhangin-300)', mixBlendMode: 'multiply', opacity: 0.2, pointerEvents: 'none' }} />
        <Container style={{ position: 'relative', paddingBottom: 48, maxWidth: 820 }}>
          <Link to="/articles" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" iconLeft={<Icon name="arrow-left" size={15} />}>All articles</Button>
          </Link>
          {article.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 24 }}>
              {article.tags.map((t) => <Badge key={t} tone="ink" variant="soft" size="sm">{t}</Badge>)}
            </div>
          )}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5.5vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text)', margin: '16px 0 0', textWrap: 'balance' }}>{article.title}</h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em', color: 'var(--itim-700)', margin: '16px 0 0' }}>
            {article.author && <>By {article.author} · </>}{formatDevlogDate(article.created_at)}
          </p>
        </Container>
        <Band kind={accent.band} color={accent.color} height={22} style={{ position: 'relative', opacity: 0.6 }} />
      </section>

      {article.cover_image && (
        <section style={{ background: 'var(--bg)' }}>
          <Container style={{ paddingTop: 40, maxWidth: 900 }}>
            <img src={article.cover_image} alt={article.title} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border-ink)', display: 'block' }} />
          </Container>
        </section>
      )}

      <section style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
        <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
        <Container style={{ position: 'relative', paddingTop: 40, paddingBottom: 72, maxWidth: 760 }}>
          <RichText markdown={article.body ?? ''} />
        </Container>
      </section>
    </main>
  )
}
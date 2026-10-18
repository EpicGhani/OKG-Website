import { Link } from 'react-router-dom'
import { Button, Container, Icon, Mark, Band, ArticleCard } from '../ui'
import { useArticles } from '../data/useArticles'
import { useSeo } from '../lib/useSeo'

export function ArticlesPage() {
  const { articles, loading } = useArticles()
  const published = articles.filter((a) => a.published)
  useSeo('Articles — Obra Kasi Games', 'Writing from the studio — craft, culture, and the work of making games.')

  return (
    <main>
      <section style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden', paddingTop: 120 }}>
        <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
        <Mark kind="bituin" color="var(--bughaw-300)" size={340} style={{ position: 'absolute', top: -110, right: -110, opacity: 0.3 }} />
        <Container style={{ position: 'relative', paddingBottom: 56 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" iconLeft={<Icon name="arrow-left" size={15} />}>Back home</Button>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--primary)', margin: '20px 0 0' }}>Words from the bench</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '54ch', margin: '18px 0 0', fontWeight: 300 }}>Notes on craft, culture, and the work of making rooted games.</p>
        </Container>
        <Band kind="okir" color="var(--pula-500)" height={22} style={{ position: 'relative', opacity: 0.5 }} />
      </section>

      <section style={{ position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}>
        <Container style={{ position: 'relative', paddingTop: 64, paddingBottom: 96 }}>
          {loading ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading articles…</p>
          ) : (
            <div className="cards-grid">
              {published.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
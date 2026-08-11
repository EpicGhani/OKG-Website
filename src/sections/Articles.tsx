import { Link } from 'react-router-dom'
import { Button, Icon, Container, SectionHead, ArticleCard } from '../ui'
import { useArticles } from '../data/useArticles'

export function Articles() {
  const { articles, loading } = useArticles()
  const latest = articles.filter((a) => a.published).slice(0, 3)

  return (
    <section id="articles" style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
      <Container style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
          <SectionHead kicker="**Reading" title="**Words from the bench" />
          <Link to="/articles" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" iconRight={<Icon name="arrow-right" size={16} />}>**Read all articles</Button>
          </Link>
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
        ) : latest.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>No articles yet.</p>
        ) : (
          <div className="featured-row">
            {latest.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        )}
      </Container>
    </section>
  )
}
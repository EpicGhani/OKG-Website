import { Link } from 'react-router-dom'
import { Button, Container, Icon, Mark, Band, GameCard } from '../ui'
import { useGames } from '../data/useGames'
import { useSeo } from '../lib/useSeo'


export function GamesPage() {
  const { games, loading } = useGames()
  const published = games.filter((g) => g.published)
  useSeo('Games — Obra Kasi Games', 'Worlds woven by hand — every title from the bench.')

  return (
    <main>
      <section style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden', paddingTop: 120 }}>
        <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
        <Mark kind="sun" color="var(--luntian-200)" size={360} style={{ position: 'absolute', top: -120, right: -120, opacity: 0.4 }} />
        <Container style={{ position: 'relative', paddingBottom: 56 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" iconLeft={<Icon name="arrow-left" size={15} />}>Back home</Button>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--primary)', margin: '20px 0 0' }}>Worlds woven by hand</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '54ch', margin: '18px 0 0', fontWeight: 300 }}>
            Every title from the bench — folklore, pattern, and play, rooted in the islands.
          </p>
        </Container>
        <Band kind="okir" color="var(--pula-500)" height={22} style={{ position: 'relative', opacity: 0.5 }} />
      </section>

      <section style={{ position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}>
        <Container style={{ position: 'relative', paddingTop: 64, paddingBottom: 96 }}>
          {loading ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading games…</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 30 }}>
              {published.map((g) => <GameCard key={g.slug} game={g} />)}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
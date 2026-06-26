import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Band, Container, SectionHead, GameCard } from '../ui'
import { useGames } from '../data/useGames'

export function Games() {
  const { games, loading } = useGames()
  const featured = games.filter((g) => g.featured && g.published).slice(0, 3)

  return (
    <section id="games" style={{ position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}>
      <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': 'var(--bughaw-500)', opacity: 0.03 } as CSSProperties} />
      <Band kind="gayaman" color="var(--luntian-400)" height={24} style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.35 }} />

      <Container style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
          <SectionHead kicker="Our games" title="Worlds woven by hand" />
          <Link to="/games" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" iconRight={<Icon name="arrow-right" size={16} />}>See all titles</Button>
          </Link>
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading games…</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
            {featured.map((g, i) => {
              const mid = (featured.length - 1) / 2
              const tilt = Math.max(-3, Math.min(3, (i - mid) * 1.5))
              return <GameCard key={g.slug} game={g} tilt={tilt} />
            })}
          </div>
        )}
      </Container>
    </section>
  )
}
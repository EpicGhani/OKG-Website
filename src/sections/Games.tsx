import type { CSSProperties } from 'react'
import { Button, Badge, Icon, Band, Container, SectionHead, GameCover } from '../ui'
import { games } from '../data/content'

export function Games() {
  return (
    <section id="games" style={{ position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}>
      <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': 'var(--bughaw-500)', opacity: 0.03 } as CSSProperties} />
      <Band kind="gayaman" color="var(--luntian-400)" height={24} style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.35 }} />

      <Container style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
          <SectionHead kicker="Our games" title="Worlds woven by hand" />
          <a href="#games" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" iconRight={<Icon name="arrow-right" size={16} />}>See all titles</Button>
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
          {games.map((g, i) => (
            <div key={g.id}>
              <GameCover game={g} height={340} interactive rotate={i === 1 ? 0 : i === 0 ? -1.2 : 1.2} />
              <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge tone={g.statusTone} variant="solid">{g.status}</Badge>
                {g.genres.map((x) => <Badge key={x} tone="ink" variant="outline">{x}</Badge>)}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
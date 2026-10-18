import { Link } from 'react-router-dom'
import type { Game } from '../data/types'
import { useSeo } from '../lib/useSeo'
import { Band, Container, Eyebrow, Icon } from '../ui'
import '../styles/pages/game-coming-soon.css'

export function GameComingSoonPage({ game }: { game: Game }) {
  const title = game.title
  useSeo(`${title} — Obra Kasi Games`, `${title} is in development. Its game page is coming soon.`)

  return (
    <main className="game-coming-soon">
      <div className="game-coming-soon__pattern ok-tile-binakol" aria-hidden="true" />
      <Container>
        <div className="game-coming-soon__content">
          <Eyebrow color="var(--buhangin-300)">{game.status || 'In development'}</Eyebrow>
          <h1>{title}</h1>
          {game.tagline && <p className="game-coming-soon__subtitle">{game.tagline}</p>}
          <div className="game-coming-soon__band" aria-hidden="true"><Band kind="kalinga" color="var(--pula-400)" height={26} /></div>
          <h2>Game page coming soon</h2>
          <p>We’re getting this game’s page ready. Check back for more from our worlds in the making.</p>
          <div className="game-coming-soon__links">
            <Link to="/#home"><Icon name="arrow-left" size={18} /> Back to our games</Link>
            <Link to="/#updates">Studio updates <Icon name="arrow-right" size={18} /></Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

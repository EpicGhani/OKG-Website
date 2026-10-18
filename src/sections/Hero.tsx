import { useFeaturedGames } from '../data/useGames'
import { GameBanner } from '../ui/GameBanner'
import { Band, Mark } from '../ui'
import '../styles/sections/hero.css'

export function Hero() {
  const { games, loading, error, retry } = useFeaturedGames()
  return (
    <section id="home" className="game-hero" aria-labelledby="game-hero-heading">
      <div className="game-hero__pattern ok-tile-binakol" aria-hidden="true" />
      <div className="game-hero__motif game-hero__motif--sun" aria-hidden="true">
        <Mark kind="sun" color="var(--pula-400)" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="game-hero__motif game-hero__motif--star" aria-hidden="true">
        <Mark kind="bituin" color="var(--luntian-300)" style={{ width: '100%', height: '100%' }} />
      </div>
      <h1 id="game-hero-heading" className="game-hero__sr-only">Games in development at Obra Kasi Games</h1>
      {loading ? <div className="game-hero__banners" aria-label="Loading games" aria-busy="true">{[0,1,2].map(n=><div key={n} className="game-banner game-banner--loading" />)}</div>
        : error ? <div className="game-hero__message" role="alert"><p>{error}</p><button type="button" onClick={retry}>Try again</button></div>
        : games.length ? <div className="game-hero__banners" data-count={games.length}>{games.map(game=><GameBanner key={game.slug} game={game} />)}</div>
        : <p className="game-hero__message">More from our worlds in the making soon.</p>}
      <div className="game-hero__trim" aria-hidden="true"><Band kind="okir" color="var(--pula-400)" height={22} /></div>
    </section>
  )
}

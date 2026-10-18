import { heroGames } from '../data/heroGames'
import { Link } from 'react-router-dom'
import { Band, Mark } from '../ui'
import '../styles/sections/hero.css'

export function Hero() {
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
      <div className="game-hero__banners">
        {heroGames.map((game) => (
          <Link key={game.id} to={game.path} className={`game-banner game-banner--${game.id}${game.foreground ? ' game-banner--has-art' : ''}`} aria-labelledby={`${game.id}-title`} aria-describedby={`${game.id}-status`}>
            {/* Clip only the background; the foreground must remain a sibling. */}
            <div className="game-banner__panel" aria-hidden="true">
              {game.background && <img className="game-banner__background" src={game.background} alt="" fetchPriority="high" />}
              <div className="game-banner__shade" />
            </div>
            <div className="game-banner__foreground" aria-hidden="true">
              {game.foreground ? <img src={game.foreground} srcSet={game.foregroundSrcSet} sizes="(max-width: 700px) min(468px, 100vw), (max-width: 1400px) 36vw, 450px" alt="" decoding="async" /> : (
                <div className="game-banner__placeholder">
                  <Band kind={game.id === 'hearthleaf' ? 'kalinga' : game.id === 'monster-girl' ? 'gayaman' : 'terrace'} color="var(--banner-accent)" height={22} />
                </div>
              )}
            </div>
            <div className="game-banner__title-layer">
              <div className={`game-banner__wordmark${game.foregroundIncludesTitle && game.foreground ? ' game-hero__sr-only' : ''}`}>
                <h2 id={`${game.id}-title`}>
                  {game.titleLines.map((line) => <span key={line}>{line}</span>)}
                </h2>
                {game.subtitle && <p>{game.subtitle}</p>}
              </div>
            </div>
            <p id={`${game.id}-status`} className="game-banner__status"><span /> In development</p>
          </Link>
        ))}
      </div>
      <div className="game-hero__trim" aria-hidden="true"><Band kind="okir" color="var(--pula-400)" height={22} /></div>
    </section>
  )
}

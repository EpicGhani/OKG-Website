import { Link } from 'react-router-dom'
import type { Game } from '../data/types'
import { getBannerSettings } from '../data/heroGames'
import { Band } from './Bits'
import '../styles/sections/hero.css'

export function GameBanner({game, preview = false}: {game: Game; preview?: boolean}) {
  const banner = getBannerSettings(game)
  const id = `${preview ? 'preview-' : ''}${game.slug}`
  const classes = `game-banner game-banner--${banner.theme}${banner.foreground ? ' game-banner--has-art' : ''}${banner.pixel_art ? ' game-banner--pixel-art' : ''} game-banner--${banner.foreground_layout}`
  const content = <>
    <div className="game-banner__panel" aria-hidden="true">
      {banner.background && <picture>
        {banner.background_small && <source media="(max-width: 700px)" srcSet={banner.background_small} />}
        <img className="game-banner__background" src={banner.background} alt="" decoding="async" />
      </picture>}
      <div className="game-banner__shade" />
    </div>
    <div className="game-banner__foreground" aria-hidden="true">
      {banner.foreground ? <picture>
        {banner.foreground_small && <source media="(max-width: 700px)" srcSet={banner.foreground_small} />}
        <img src={banner.foreground} alt="" decoding="async" />
      </picture> : <div className="game-banner__placeholder"><Band kind="kalinga" color="var(--banner-accent)" height={22} /></div>}
    </div>
    <div className="game-banner__title-layer"><div className={`game-banner__wordmark${banner.includes_title && banner.foreground ? ' game-hero__sr-only' : ''}`}>
      <h2 id={`${id}-title`}>{(banner.title_lines.length ? banner.title_lines : [game.title]).map((line,i) => <span key={i}>{line}</span>)}</h2>
      {banner.subtitle && <p>{banner.subtitle}</p>}
    </div></div>
    {game.status && <p id={`${id}-status`} className="game-banner__status"><span />{game.status}</p>}
  </>
  return preview ? <div className={classes}>{content}</div> : <Link to={`/games/${encodeURIComponent(game.slug)}`} className={classes} aria-labelledby={`${id}-title`} aria-describedby={game.status ? `${id}-status` : undefined}>{content}</Link>
}

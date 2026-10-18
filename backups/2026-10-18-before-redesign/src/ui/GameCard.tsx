import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { Band, Mark } from './Bits'
import { accentFor, patternClassFor } from './devlogAccents'
import type { Game } from '../data/types'

export function GameCard({ game, tilt = 0 }: { game: Game; tilt?: number }) {
  const [hover, setHover] = useState(false)
  const accent = accentFor(game.accent, game.slug)
  const patternClass = patternClassFor(game.pattern)

  return (
    <Link to={`/games/${game.slug}`} style={{ textDecoration: 'none' }}>
      <article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div style={{
          height: 360, display: 'flex', flexDirection: 'column', overflow: 'hidden',
          borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', background: accent.soft,
          boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-md)',
          transform: hover ? 'translateY(-8px) rotate(0deg)' : `rotate(${tilt}deg)`,
          transformOrigin: 'center bottom',
          transition: 'transform var(--dur-slow) var(--ease-snap), box-shadow var(--dur-base) var(--ease-out)',
        }}>
          <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
            {game.cover_image ? (
              <img src={game.cover_image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <>
                <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': accent.soft, opacity: 0.4 } as CSSProperties} />
                <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': accent.color, opacity: 0.06 } as CSSProperties} />
              </>
            )}

            {/* warm paper wash — the organic tint (tune opacity here) */}
            <div style={{ position: 'absolute', inset: 0, background: 'var(--buhangin-300)', mixBlendMode: 'multiply', opacity: 0.55, pointerEvents: 'none' }} />

            {!game.cover_image && (
              <>
                <Mark kind="sun" color={accent.color} size={66} style={{ position: 'absolute', top: 16, right: 16, opacity: 0.32 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 55, color: 'var(--itim-800)', textAlign: 'center', lineHeight: 1, letterSpacing: '-0.02em' }}>{game.title}</span>
                </div>
              </>
            )}
          </div>

          <Band kind={accent.band} color={accent.color} height={20} style={{ position: 'relative', opacity: 0.85 }} />

          <div style={{ position: 'relative', background: 'var(--itim-800)', color: 'var(--buhangin-100)', padding: '11px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{game.tagline}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--itim-300)', flexShrink: 0 }}>{game.year}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          {game.status && <Badge tone={game.status_accent ?? 'pula'} variant="solid">{game.status}</Badge>}
          {game.genres.map((g) => <Badge key={g} tone="ink" variant="outline">{g}</Badge>)}
        </div>
      </article>
    </Link>
  )
}
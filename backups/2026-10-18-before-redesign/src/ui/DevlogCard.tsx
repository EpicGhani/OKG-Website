import { useState } from 'react'
import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Band, Mark, Icon } from './Bits'
import type { Devlog as DevlogEntry } from '../data/types'
import type { Accent } from './devlogAccents'
import { formatDevlogDate } from '../data/formatDate'
import { resolvePatternClass } from './devlogAccents'

export function DevlogCard({ entry, accent }: { entry: DevlogEntry; accent: Accent }) {
  const [hover, setHover] = useState(false)
  const patternClass = resolvePatternClass(entry)
  return (
    <Link to={`/devlog/${entry.slug}`} style={{ textDecoration: 'none' }}>
      <article
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          position: 'relative', height: '100%', boxSizing: 'border-box', overflow: 'hidden',
          background: 'var(--bg)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border-ink)',
          boxShadow: hover ? '6px 6px 0 var(--itim-800)' : 'var(--shadow-stamp-sm)',
          transform: hover ? 'translate(-2px,-2px)' : 'none',
          transition: 'transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        <div style={{ position: 'relative', background: accent.soft, padding: '20px 24px 14px', overflow: 'hidden' }}>
          <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': accent.soft, opacity: 0.18 } as CSSProperties} />
          <Mark kind="sun" color={accent.color} size={54} style={{ position: 'absolute', top: -10, right: -10, opacity: 0.25 }} />
          <span style={{ position: 'relative', fontFamily: 'var(--font-display)', fontSize: 46, lineHeight: 1, color: accent.color }}>#{entry.n}</span>
        </div>
        <Band kind={accent.band} color={accent.color} height={16} style={{ opacity: 0.6 }} />

        <div style={{ padding: '22px 24px 26px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent.color }}>{entry.kicker}</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1.12, letterSpacing: '-0.01em', color: 'var(--text)', margin: 0 }}>{entry.title}</h3>
          <div style={{ marginTop: 'auto', paddingTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{formatDevlogDate(entry.created_at)}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-mono)', fontSize: 12, color: accent.color }}>
              Read <Icon name="arrow-right" size={14} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
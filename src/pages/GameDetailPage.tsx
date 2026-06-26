import { Link, useParams } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Button, Container, Icon, Mark, Band, Badge, RichText, accentFor, patternClassFor } from '../ui'
import { useGame } from '../data/useGames'

export function GameDetailPage() {
  const { slug } = useParams()
  const { game, loading } = useGame(slug)

  if (loading) {
    return (
      <main>
        <section style={{ minHeight: '70svh', display: 'flex', alignItems: 'center', background: 'var(--bg)' }}>
          <Container style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
          </Container>
        </section>
      </main>
    )
  }

  if (!game) {
    return (
      <main>
        <section style={{ position: 'relative', background: 'var(--bg)', minHeight: '70svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
          <Container style={{ position: 'relative', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>404</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--primary)', margin: '14px 0 0' }}>Game not found</h1>
            <Link to="/games" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 24, textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>
              <Icon name="arrow-left" size={14} /> All games
            </Link>
          </Container>
        </section>
      </main>
    )
  }

  const accent = accentFor(game.accent, game.slug)
  const patternClass = patternClassFor(game.pattern)

  return (
    <main>
      {/* hero */}
      <section style={{ position: 'relative', background: accent.soft, overflow: 'hidden', paddingTop: 120 }}>
        <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': accent.soft, opacity: 0.18 } as CSSProperties} />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--buhangin-300)', mixBlendMode: 'multiply', opacity: 0.2, pointerEvents: 'none' }} />
        <Container style={{ position: 'relative', paddingBottom: 56 }}>
          <Link to="/games" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" iconLeft={<Icon name="arrow-left" size={15} />}>All games</Button>
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 40, alignItems: 'center', marginTop: 24 }}>
            <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '2px solid var(--border-ink)', boxShadow: 'var(--shadow-stamp)', background: 'var(--buhangin-100)' }}>
              {game.cover_image ? (
                <img src={game.cover_image} alt={game.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <>
                  <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': 'var(--buhangin-100)', opacity: 0.4 } as CSSProperties} />
                  <Mark kind="sun" color={accent.color} size={80} style={{ position: 'absolute', top: 18, right: 18, opacity: 0.3 }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 46, color: 'var(--itim-800)', textAlign: 'center', lineHeight: 1 }}>{game.title}</span>
                  </div>
                </>
              )}
            </div>

            <div>
              {game.status && <Badge tone={game.status_accent ?? 'pula'} variant="solid">{game.status}</Badge>}
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--text)', margin: '16px 0 0' }}>{game.title}</h1>
              <p style={{ fontSize: 20, lineHeight: 1.5, color: 'var(--itim-muted)', margin: '16px 0 0', fontWeight: 300, maxWidth: '46ch' }}>{game.tagline}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap', alignItems: 'center' }}>
                {game.year && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--itim-700)', fontWeight: 700, marginRight: 4 }}>{game.year}</span>}
                {game.genres.map((g) => <Badge key={g} tone="ink" variant="soft">{g}</Badge>)}
              </div>
            </div>
          </div>
        </Container>
        <Band kind={accent.band} color={accent.color} height={22} style={{ position: 'relative', opacity: 0.6 }} />
      </section>

      {/* description */}
      {game.description && (
        <section style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
          <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
          <Container style={{ position: 'relative', paddingTop: 56, paddingBottom: 56, maxWidth: 820 }}>
            <RichText markdown={game.description} />
          </Container>
        </section>
      )}

      {/* screenshots */}
      {game.screenshots && game.screenshots.length > 0 && (
        <section style={{ position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}>
          <Container style={{ position: 'relative', paddingTop: 56, paddingBottom: 80 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 38px)', letterSpacing: '-0.02em', color: 'var(--text)', margin: '0 0 28px' }}>Screenshots</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
              {game.screenshots.map((src, i) => (
                <img key={i} src={src} alt={`${game.title} screenshot ${i + 1}`} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-ink)', display: 'block' }} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* links */}
      {game.links && game.links.length > 0 && (
        <section style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
          <Container style={{ position: 'relative', paddingTop: 48, paddingBottom: 96 }}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {game.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', textDecoration: 'none', fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-semibold)', fontSize: 15, color: 'var(--text-on-brand)', background: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
                  {link.label} <Icon name="arrow-up-right" size={16} />
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  )
}
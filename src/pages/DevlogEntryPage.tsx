import { Link, useParams } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { Button, Container, Icon, Mark, Band, resolveAccent, resolvePatternClass, RichText } from '../ui'
import { useDevlog } from '../data/useDevlogs'
import { formatDevlogDate, formatEdited, wasEdited } from '../data/formatDate'


export function DevlogEntryPage() {
  const { slug } = useParams()
  const { devlog: entry, loading } = useDevlog(slug)

  if (loading) {
    return (
      <main>
        <section style={{ position: 'relative', background: 'var(--bg)', minHeight: '70svh', display: 'flex', alignItems: 'center' }}>
          <Container style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>Loading…</p>
          </Container>
        </section>
      </main>
    )
  }

  if (!entry) {
    return (
      <main>
        <section style={{ position: 'relative', background: 'var(--bg)', minHeight: '70svh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
          <Container style={{ position: 'relative', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>404</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--primary)', margin: '14px 0 0' }}>Entry not found</h1>
            <p style={{ fontSize: 17, color: 'var(--text-muted)', margin: '16px 0 28px', fontWeight: 300 }}>That devlog wandered off. Tabi-tabi po.</p>
            <Link to="/devlog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>
              <Icon name="arrow-left" size={14} /> All devlogs
            </Link>
          </Container>
        </section>
      </main>
    )
  }

  const accent = resolveAccent(entry)
  const patternClass = resolvePatternClass(entry)

  return (
    <main>
      <section style={{ position: 'relative', background: accent.soft, overflow: 'hidden', paddingTop: 120 }}>
        <div className={patternClass} style={{ position: 'absolute', inset: 0, '--pat-color': accent.color, '--pat-bg': accent.soft, opacity: 0.12 } as CSSProperties} />
        <Mark kind="sun" color={accent.color} size={320} style={{ position: 'absolute', top: -110, right: -110, opacity: 0.2 }} />
        <Container style={{ position: 'relative', paddingBottom: 48, maxWidth: 820 }}>
          <Link to="/devlog" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" iconLeft={<Icon name="arrow-left" size={15} />}>All devlogs</Button>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '24px 0 0' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1, color: accent.color }}>#{entry.n}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--itim-700)' }}>{entry.kicker}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 60px)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text)', margin: '14px 0 0' }}>{entry.title}</h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--itim-600)', margin: '16px 0 0' }}>{formatDevlogDate(entry.created_at)}{wasEdited(entry.created_at, entry.updated_at) ? ` · Edited ${formatEdited(entry.updated_at)}` : ''}</p>
        </Container>
        <Band kind={accent.band} color={accent.color} height={20} style={{ position: 'relative', opacity: 0.6 }} />
      </section>

      <section style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
        <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
        <Container style={{ position: 'relative', paddingTop: 56, paddingBottom: 96, maxWidth: 820 }}>
          <RichText markdown={entry.body ?? ''} />
        </Container>
      </section>
    </main>
  )
}
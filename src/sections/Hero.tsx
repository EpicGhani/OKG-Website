import type { CSSProperties } from 'react'
import { Button, Container, Mark, Band, Icon, Eyebrow } from '../ui'

export function Hero() {
  return (
    <section id="home" style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden', minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
      <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
      <Mark kind="sun" color="var(--pula-200)" size={460} style={{ position: 'absolute', top: '-130px', right: '-150px', opacity: 0.5 }} />
      <Mark kind="sun" color="var(--luntian-200)" size={240} style={{ position: 'absolute', bottom: '40px', left: '-90px', opacity: 0.4 }} />
      <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': 'var(--bughaw-500)', opacity: 0.03 } as CSSProperties} />

      <Container style={{ position: 'relative', textAlign: 'center', maxWidth: 1000, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Eyebrow>Filipino game studio · Manila</Eyebrow>
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(54px, 9vw, 116px)', lineHeight: 0.94,
          letterSpacing: '-0.03em', color: 'var(--primary)', margin: '22px 0 0', textWrap: 'balance',
        }}>
          Laro nang malaya.
        </h1>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, margin: '22px 0 0' }}>
          <Band kind="okir" color="var(--pula-500)" height={18} style={{ width: 90, opacity: 0.7 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Play freely</span>
          <Band kind="okir" color="var(--pula-500)" height={18} style={{ width: 90, opacity: 0.7 }} />
        </div>

        <p style={{ fontSize: 'clamp(18px, 2.1vw, 22px)', lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '50ch', margin: '26px auto 0', fontWeight: 300 }}>
          We make rooted games from the islands. Folklore, pattern, and play, all generated close to home and built to travel the world.
        </p>

        <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#games" style={{ textDecoration: 'none' }}>
            <Button variant="stamp" size="lg" iconRight={<Icon name="arrow-right" size={17} />}>See the games</Button>
          </a>
          <a href="#what-we-do" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="lg" iconLeft={<Icon name="compass" size={17} />}>What we do</Button>
          </a>
        </div>

        <div style={{ display: 'flex', gap: 22, marginTop: 40, alignItems: 'center', justifyContent: 'center', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: 12, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Mark kind="sun" color="var(--text-faint)" size={13} /> 3 titles in the works</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-faint)' }} />
          <span>40k+ wishlists</span>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--text-faint)' }} />
          <span>Rooted in Manila</span>
        </div>
      </Container>

      <Band kind="kalinga" color="var(--pula-500)" height={26} style={{ position: 'relative', opacity: 0.5 }} />
    </section>
  )
}
import type { CSSProperties, ReactNode } from 'react'
import { Button, Badge, Container, SectionHead, Mark, Icon, ArtFrame } from '../ui'
import { services } from '../data/content'

function PhaseTag({ children, tone = 'pula' }: { children: ReactNode; tone?: 'pula' | 'luntian' | 'sand' }) {
  return <Badge tone={tone} variant="soft" size="sm">{children}</Badge>
}

function Diamond({ color = 'var(--primary)' }: { color?: string }) {
  return <span style={{ width: 9, height: 9, background: color, transform: 'rotate(45deg)', flexShrink: 0, marginTop: 6, display: 'inline-block' }} />
}

function PhaseHeading({ children }: { children: ReactNode }) {
  return <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.4vw, 40px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--text)', margin: '14px 0 0' }}>{children}</h3>
}

function PhaseBody({ children }: { children: ReactNode }) {
  return <p style={{ fontSize: 17, lineHeight: 1.66, color: 'var(--text-muted)', margin: '18px 0 0', maxWidth: '46ch', fontWeight: 300 }}>{children}</p>
}

export function WhatWeDo() {
  const [one, two, three] = services

  return (
    <section id="what-we-do" style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
      <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': 'var(--pula-500)', opacity: 0.025 } as CSSProperties} />

      <Container style={{ position: 'relative', paddingTop: 96, paddingBottom: 48, textAlign: 'center' }}>
        <SectionHead kicker="What we do" title="Digital weaving services" align="center" max={760} />
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '56ch', margin: '20px auto 0', fontWeight: 300 }}>
          We intertwine ancestral Filipino narrative with modern game technology. We do not just write code, we weave interactive legacies, from first idea to global launch.
        </p>
      </Container>

      {/* Phase one — text left, art right */}
      <Container style={{ position: 'relative', paddingTop: 40, paddingBottom: 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          <div>
            <PhaseTag tone="pula">{one.phase}</PhaseTag>
            <PhaseHeading>{one.title}</PhaseHeading>
            <PhaseBody>{one.body}</PhaseBody>
            <ul style={{ listStyle: 'none', margin: '26px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {one.points?.map(([h, b]) => (
                <li key={h} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <Diamond color="var(--primary)" />
                  <span style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text)' }}>
                    <strong style={{ fontWeight: 700 }}>{h}.</strong>{' '}
                    <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>{b}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32 }}>
              <a href="#work-with-us" style={{ textDecoration: 'none' }}>
                <Button variant="primary" size="md" iconRight={<Icon name="arrow-right" size={16} />}>{one.cta}</Button>
              </a>
            </div>
          </div>
          {one.art && <ArtFrame art={one.art} height={400} />}
        </div>
      </Container>

      {/* Phase two — art left, text + grid right */}
      <Container style={{ position: 'relative', paddingTop: 40, paddingBottom: 72 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          {two.art && <ArtFrame art={two.art} height={400} />}
          <div>
            <PhaseTag tone="luntian">{two.phase}</PhaseTag>
            <PhaseHeading>{two.title}</PhaseHeading>
            <PhaseBody>{two.body}</PhaseBody>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 26 }}>
              {two.grid?.map(([h, b]) => (
                <div key={h} style={{ borderLeft: '2.5px solid var(--secondary)', padding: '6px 0 6px 16px' }}>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: 15.5, color: 'var(--text)' }}>{h}</p>
                  <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, fontWeight: 300 }}>{b}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <a href="#work-with-us" style={{ textDecoration: 'none' }}>
                <Button variant="secondary" size="md" iconRight={<Icon name="arrow-right" size={16} />}>{two.cta}</Button>
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Phase three — forest panel, three columns */}
      <Container style={{ position: 'relative', paddingBottom: 96 }}>
        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--secondary)', color: 'var(--text-on-dark)', border: '2.5px solid var(--border-ink)', boxShadow: 'var(--shadow-stamp)' }}>
          <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': 'var(--buhangin-100)', opacity: 0.045 } as CSSProperties} />
          <Mark kind="sun" color="var(--buhangin-100)" size={260} style={{ position: 'absolute', top: '-70px', right: '-70px', opacity: 0.1 }} />
          <div style={{ position: 'relative', padding: '56px 48px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
              <PhaseTag tone="sand">{three.phase}</PhaseTag>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-0.02em', color: 'var(--buhangin-100)', margin: '16px 0 0' }}>{three.title}</h3>
            <p style={{ fontSize: 17.5, lineHeight: 1.6, color: 'var(--luntian-100)', maxWidth: '60ch', margin: '18px auto 0', fontWeight: 300 }}>{three.body}</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, margin: '44px auto 0', maxWidth: 820, textAlign: 'left' }}>
              {three.cols?.map(([h, b]) => (
                <div key={h} style={{ borderTop: '2px solid var(--buhangin-400)', paddingTop: 16 }}>
                  <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--buhangin-300)' }}>{h}</p>
                  <p style={{ margin: '10px 0 0', fontSize: 15, lineHeight: 1.55, color: 'var(--luntian-100)', fontWeight: 300 }}>{b}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 44 }}>
              <a href="#work-with-us" style={{ textDecoration: 'none' }}>
                <Button variant="stamp" size="lg" iconRight={<Icon name="arrow-right" size={17} />}>{three.cta}</Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
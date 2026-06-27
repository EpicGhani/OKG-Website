import type { CSSProperties } from 'react'
import { Container, Mark, Band, Eyebrow } from '../ui'

const pillars: [string, string, string][] = [
  ['Laro nang malaya', 'Play freely', 'Creative freedom over formula. We chase the game that only we could make.'],
  ['Bayanihan', 'Built together', 'Cooperative craft, from the design bench to the community we build with.'],
  ['Tabi-tabi po', 'With respect', 'We borrow from tradition with care, and check our work with the people who hold it.'],
]

export function Statement() {
  return (
    <section id="studio" style={{ position: 'relative', background: 'var(--surface-ink)', color: 'var(--text-on-dark)', overflow: 'hidden', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Mark kind="sun" color="var(--pula-500)" size={380} style={{ position: 'absolute', top: '-90px', left: '-110px', opacity: 0.14 }} />
      <Mark kind="bituin" color="var(--bughaw-400)" size={200} style={{ position: 'absolute', bottom: '-40px', right: '-30px', opacity: 0.14 }} />
      <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': 'var(--buhangin-100)', opacity: 0.03 } as CSSProperties} />

      <Container style={{ position: 'relative', paddingTop: 110, paddingBottom: 110 }}>
        <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow color="var(--pula-300)">Who we are</Eyebrow>
          </div>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4.2vw, 52px)', lineHeight: 1.18,
            letterSpacing: '-0.015em', color: 'var(--buhangin-100)', margin: '26px 0 0', textWrap: 'balance',
          }}>
            We make games from where we stand. Stories, patterns, and play drawn from{' '}
            <span style={{ color: 'var(--pula-300)' }}>Filipino soil</span>, told with the care of{' '}
            <span style={{ color: 'var(--bughaw-300)' }}>handmade craft</span>.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--text-on-dark-muted)', maxWidth: '60ch', margin: '28px auto 0', fontWeight: 300 }}>
            Obra Kasi means the work of the home. We are a studio built on creative freedom and rooted inspiration, turning local legend into worlds you can wander, fight through, and call your own.
          </p>
        </div>

        <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 64, borderTop: '1.5px solid var(--itim-600)' }}>
          {pillars.map(([tl, en, body], i) => (
            <div key={tl} style={{ padding: '34px 28px', borderLeft: i === 0 ? 'none' : '1.5px solid var(--itim-600)' }}>
              <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--buhangin-100)', letterSpacing: '-0.01em' }}>{tl}</p>
              <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--pula-300)' }}>{en}</p>
              <p style={{ margin: '14px 0 0', fontSize: 15, lineHeight: 1.6, color: 'var(--text-on-dark-muted)', fontWeight: 300 }}>{body}</p>
            </div>
          ))}
        </div>
      </Container>

      <Band kind="okir" color="var(--pula-500)" height={24} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, opacity: 0.55 }} />
    </section>
  )
}
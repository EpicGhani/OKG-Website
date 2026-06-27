import { useState } from 'react'
import { Button, Icon, Mark, Band, Container, Eyebrow } from '../ui'
import { engagements } from '../data/content'
import type { Engagement } from '../data/types'

function EngageCard({ item }: { item: Engagement }) {
  const accent = item.tone === 'pula' ? 'var(--pula-500)' : 'var(--luntian-500)'
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        border: '2.5px solid var(--border-ink)',
        boxShadow: hover ? '7px 7px 0 var(--itim-800)' : 'var(--shadow-stamp)',
        transform: hover ? 'translate(-2px, -2px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-snap), box-shadow var(--dur-base) var(--ease-snap)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ height: 8, background: accent }} />
      <div style={{ padding: '32px 32px 36px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent }}>{item.kicker}</span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 32, letterSpacing: '-0.02em', color: 'var(--text)', margin: '10px 0 0' }}>{item.title}</h3>
        <p style={{ fontSize: 16, lineHeight: 1.62, color: 'var(--text-muted)', margin: '14px 0 0', fontWeight: 300 }}>{item.body}</p>
        <ul style={{ listStyle: 'none', margin: '22px 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {item.points.map((p) => (
            <li key={p} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 15, color: 'var(--text)' }}>
              <Icon name="check" size={17} color={accent} strokeWidth={2.5} />
              {p}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 'auto' }}>
          <Button variant={item.tone === 'pula' ? 'primary' : 'secondary'} size="md" iconRight={<Icon name="arrow-right" size={16} />}>{item.cta}</Button>
        </div>
      </div>
    </div>
  )
}

export function WorkWithUs() {
  return (
    <section id="work-with-us" style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden' }}>
      <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
      <Mark kind="sun" color="var(--luntian-200)" size={360} style={{ position: 'absolute', bottom: '-110px', right: '-120px', opacity: 0.4 }} />

      <Container style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Eyebrow>Work with us</Eyebrow>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.2vw, 50px)', lineHeight: 1.04, letterSpacing: '-0.02em', color: 'var(--text)', margin: '14px 0 0' }}>
            Come build with us
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', margin: '18px auto 0', maxWidth: '52ch', fontWeight: 300 }}>
            Two ways in. Hire the bench for development, or bring us your game and let us help it reach the islands and beyond.
          </p>
        </div>

        <div className="stack-mobile" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 48 }}>
          {engagements.map((item) => <EngageCard key={item.id} item={item} />)}
        </div>

        {/* Contact strip */}
        <div style={{
          marginTop: 28, background: 'var(--surface-ink)', color: 'var(--text-on-dark)', borderRadius: 'var(--radius-lg)',
          padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
          position: 'relative', overflow: 'hidden',
        }}>
          <Band kind="okir" color="var(--pula-400)" height={20} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, opacity: 0.5 }} />
          <div>
            <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--buhangin-100)' }}>Have something honest in the works?</p>
            <p style={{ margin: '6px 0 0', fontSize: 15, color: 'var(--text-on-dark-muted)', fontWeight: 300 }}>Tell us about it. We read every note, tabi-tabi po.</p>
          </div>
          <a href="mailto:hello@obrakasi.ph" style={{ textDecoration: 'none' }}>
            <Button variant="stamp" size="lg" iconRight={<Icon name="arrow-up-right" size={17} />}>hello@obrakasi.ph</Button>
          </a>
        </div>
      </Container>
    </section>
  )
}
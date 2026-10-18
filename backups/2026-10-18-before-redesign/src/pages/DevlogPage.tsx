import { Link } from 'react-router-dom'
import { Button, Container, Icon, Mark, Band, DevlogCard, resolveAccent } from '../ui'
import { useDevlogs } from '../data/useDevlogs'
import { useSeo } from '../lib/useSeo'


export function DevlogPage() {
  const { devlogs, loading } = useDevlogs()
  useSeo('Devlog — Obra Kasi Games', 'Notes from the workbench — what we are building, breaking, and learning.')


  return (
    <main>
      <section style={{ position: 'relative', background: 'var(--bg)', overflow: 'hidden', paddingTop: 120 }}>
        <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
        <Mark kind="sun" color="var(--pula-200)" size={360} style={{ position: 'absolute', top: -120, right: -120, opacity: 0.4 }} />
        <Container style={{ position: 'relative', paddingBottom: 56 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" iconLeft={<Icon name="arrow-left" size={15} />}>Back home</Button>
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, letterSpacing: '-0.02em', color: 'var(--primary)', margin: '20px 0 0' }}>From the workbench</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-muted)', maxWidth: '54ch', margin: '18px 0 0', fontWeight: 300 }}>
            Every note from the bench — what we are building, breaking, and learning, tabi-tabi po.
          </p>
        </Container>
        <Band kind="okir" color="var(--pula-500)" height={22} style={{ position: 'relative', opacity: 0.5 }} />
      </section>

      <section style={{ position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}>
        <Container style={{ position: 'relative', paddingTop: 64, paddingBottom: 96 }}>
          {loading ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading devlogs…</p>
          ) : (
            <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
              {devlogs.filter((d) => d.status === 'published').map((d) => (
                <DevlogCard key={d.slug} entry={d} accent={resolveAccent(d)} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </main>
  )
}
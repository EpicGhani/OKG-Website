import { Link } from 'react-router-dom'
import { Button, Icon, Band, Mark, Container, SectionHead, DevlogCard, resolveAccent } from '../ui'
import { useDevlogs } from '../data/useDevlogs'

export function Devlog() {
  const { devlogs, loading } = useDevlogs()
    const latest = devlogs.filter((d) => d.status === 'published').slice(0, 5)

  return (
    <section id="devlog" style={{ position: 'relative', background: 'var(--surface)', overflow: 'hidden' }}>
      <div className="ok-paper-grain" style={{ position: 'absolute', inset: 0 }} />
      <Mark kind="bituin" color="var(--bughaw-400)" size={300} style={{ position: 'absolute', top: -80, left: -90, opacity: 0.08 }} />
      <Band kind="fret" color="var(--luntian-400)" height={20} style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0.3 }} />

      <Container style={{ position: 'relative', paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
          <SectionHead kicker="Devlog" title="From the workbench" />
          <Link to="/devlog" style={{ textDecoration: 'none' }}>
            <Button variant="ghost" iconRight={<Icon name="arrow-right" size={16} />}>Read all devlogs</Button>
          </Link>
        </div>

        {loading ? (
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading devlogs…</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
            {latest.map((d) => (
              <DevlogCard key={d.slug} entry={d} accent={resolveAccent(d)} />
            ))}
          </div>
        )}
      </Container>

      <Band kind="okir" color="var(--pula-500)" height={24} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, opacity: 0.55 }} />
    </section>
  )
}
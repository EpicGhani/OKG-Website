import { Link, useNavigate } from 'react-router-dom'
import { DevlogForm } from './DevlogForm'
import { createDevlog } from '../../data/devlogMutations'
import { useDevlogs } from '../../data/useDevlogs'
import type { Devlog } from '../../data/types'

export function NewDevlog() {
  const navigate = useNavigate()
  const { devlogs } = useDevlogs()

  const maxN = devlogs.reduce((max, d) => Math.max(max, parseInt(d.n, 10) || 0), 0)
  const nextNumber = String(maxN + 1).padStart(3, '0')

  const handleSubmit = async (entry: Devlog) => {
    const result = await createDevlog(entry)
    if (!result.error) navigate('/admin/devlogs')
    return result
  }

  return (
    <div>
      <Link to="/admin/devlogs" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← Devlogs</Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: '12px 0 24px' }}>New devlog</h1>
      <DevlogForm submitLabel="Publish" onSubmit={handleSubmit} nextNumber={nextNumber} />
    </div>
  )
}
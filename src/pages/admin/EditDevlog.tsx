import { Link, useNavigate, useParams } from 'react-router-dom'
import { DevlogForm } from './DevlogForm'
import { useDevlog } from '../../data/useDevlogs'
import { updateDevlog } from '../../data/devlogMutations'
import type { Devlog } from '../../data/types'

export function EditDevlog() {
  const { slug } = useParams()
  const { devlog: entry, loading } = useDevlog(slug)
  const navigate = useNavigate()

  const handleSubmit = async (updated: Devlog) => {
    const result = await updateDevlog(slug ?? '', updated)
    if (!result.error) navigate('/admin/devlogs')
    return result
  }

  if (loading) return <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
  if (!entry) return <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Not found. <Link to="/admin/devlogs">Back</Link></p>

  return (
    <div>
      <Link to="/admin/devlogs" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← Devlogs</Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: '12px 0 24px' }}>Edit devlog</h1>
      <DevlogForm initial={entry} submitLabel="Save changes" onSubmit={handleSubmit} />
    </div>
  )
}
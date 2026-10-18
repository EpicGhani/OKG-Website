import { Link, useNavigate, useParams } from 'react-router-dom'
import { GameForm } from './GameForm'
import { useGame } from '../../data/useGames'
import { updateGame } from '../../data/gameMutations'
import type { Game } from '../../data/types'

export function EditGame() {
  const { slug } = useParams()
  const { game, loading } = useGame(slug)
  const navigate = useNavigate()
  const handleSubmit = async (updated: Game) => {
    const result = await updateGame(slug ?? '', updated)
    if (!result.error) navigate('/admin/games')
    return result
  }
  if (loading) return <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
  if (!game) return <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Not found. <Link to="/admin/games">Back</Link></p>
  return (
    <div>
      <Link to="/admin/games" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← Games</Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: '12px 0 24px' }}>Edit game</h1>
      <GameForm initial={game} submitLabel="Save changes" onSubmit={handleSubmit} />
    </div>
  )
}
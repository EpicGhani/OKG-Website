import { Link, useNavigate } from 'react-router-dom'
import { GameForm } from './GameForm'
import { createGame } from '../../data/gameMutations'
import type { Game } from '../../data/types'

export function NewGame() {
  const navigate = useNavigate()
  const handleSubmit = async (game: Game) => {
    const result = await createGame(game)
    if (!result.error) navigate('/admin/games')
    return result
  }
  return (
    <div>
      <Link to="/admin/games" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← Games</Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: '12px 0 24px' }}>New game</h1>
      <GameForm submitLabel="Publish" onSubmit={handleSubmit} />
    </div>
  )
}
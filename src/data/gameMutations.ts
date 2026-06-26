import { supabase } from '../lib/supabase'
import type { Game } from './types'

export async function createGame(game: Game) {
  const { error } = await supabase.from('games').insert(game)
  return { error: error ? error.message : null }
}

export async function updateGame(slug: string, game: Game) {
  const { error } = await supabase.from('games').update(game).eq('slug', slug)
  return { error: error ? error.message : null }
}

export async function deleteGame(slug: string) {
  const { error } = await supabase.from('games').delete().eq('slug', slug)
  return { error: error ? error.message : null }
}
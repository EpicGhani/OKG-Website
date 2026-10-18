import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Game } from './types'

const COLUMNS = 'slug, title, tagline, description, status, status_accent, year, genres, cover_image, screenshots, links, accent, pattern, featured, published, created_at, updated_at'

export function useGames() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    supabase.from('games').select(COLUMNS).order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setGames((data ?? []) as Game[])
        setLoading(false)
      })
    return () => { active = false }
  }, [reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])
  return { games, loading, error, refetch }
}

export function useGame(slug: string | undefined) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(!!slug)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let active = true
    supabase.from('games').select(COLUMNS).eq('slug', slug).maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setGame((data as Game) ?? null)
        setLoading(false)
      })
    return () => { active = false }
  }, [slug])

  return { game, loading, error }
}
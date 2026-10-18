import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Game } from './types'
import { selectHeroGames } from './heroGames'

const COLUMNS = 'slug, title, tagline, description, status, status_accent, year, genres, cover_image, screenshots, links, accent, pattern, featured, published, created_at, updated_at, hero_order, hero_banner, game_page_ready'

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
        setError(error?.message ?? null)
        if (!error) setGames((data ?? []) as Game[])
        setLoading(false)
      })
    return () => { active = false }
  }, [reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])
  return { games, loading, error, refetch }
}

export function useGame(slug: string | undefined, includeDrafts = false) {
  const key = `${includeDrafts}:${slug ?? ''}`
  const [state, setState] = useState<{key: string; game: Game | null; error: string | null} | null>(null)

  useEffect(() => {
    if (!slug) return
    let active = true
    let query = supabase.from('games').select(COLUMNS).eq('slug', slug)
    if (!includeDrafts) query = query.eq('published', true)
    query.maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        setState({key,game:error ? null : (data as Game) ?? null,error:error?.message ?? null})
      }, () => { if (active) setState({key,game:null,error:'Unable to load the game.'}) })
    return () => { active = false }
  }, [slug, includeDrafts, key])

  return state?.key === key ? {game:state.game,loading:false,error:state.error} : {game:null,loading:!!slug,error:null}
}

export function useFeaturedGames() {
  const [state, setState] = useState<{games: Game[]; loading: boolean; error: string | null}>({games: [], loading: true, error: null})
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    let active = true
    supabase.from('games').select('slug,title,tagline,status,year,genres,published,featured,hero_order,hero_banner,game_page_ready')
      .eq('published', true).eq('featured', true).order('hero_order').order('slug').limit(3)
      .then(({data,error}) => {
        if (active) setState({games: selectHeroGames((data ?? []) as Game[]), loading:false, error:error ? 'Our games could not be loaded. Please try again.' : null})
      }, () => { if (active) setState({games: [], loading:false, error:'Our games could not be loaded. Please try again.'}) })
    return () => { active = false }
  }, [attempt])
  const retry = () => { setState({games:[], loading:true, error:null}); setAttempt(n=>n+1) }
  return {...state, retry}
}

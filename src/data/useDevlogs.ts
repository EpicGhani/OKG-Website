import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Devlog } from './types'

const COLUMNS = 'slug, n, kicker, title, accent, body, pattern, status, created_at, updated_at'

export function useDevlogs() {
  const [devlogs, setDevlogs] = useState<Devlog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    supabase
      .from('devlogs')
      .select(COLUMNS)
      .order('n', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setDevlogs((data ?? []) as Devlog[])
        setLoading(false)
      })
    return () => { active = false }
  }, [reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])

  return { devlogs, loading, error, refetch }
}

export function useDevlog(slug: string | undefined) {
  const [state, setState] = useState<{ devlog: Devlog | null; loading: boolean; error: string | null }>(
    { devlog: null, loading: !!slug, error: null },
  )

  useEffect(() => {
    if (!slug) return
    let active = true
    supabase
      .from('devlogs')
      .select(COLUMNS)
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        setState({ devlog: (data as Devlog) ?? null, loading: false, error: error ? error.message : null })
      })
    return () => { active = false }
  }, [slug])

  return state
}
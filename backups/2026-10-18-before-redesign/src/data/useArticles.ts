import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { Article } from './types'

const COLUMNS = 'slug, title, excerpt, author, cover_image, body, tags, accent, pattern, published, created_at, updated_at'

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true
    supabase.from('articles').select(COLUMNS).order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setArticles((data ?? []) as Article[])
        setLoading(false)
      })
    return () => { active = false }
  }, [reloadKey])

  const refetch = useCallback(() => setReloadKey((k) => k + 1), [])
  return { articles, loading, error, refetch }
}

export function useArticle(slug: string | undefined) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(!!slug)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let active = true
    supabase.from('articles').select(COLUMNS).eq('slug', slug).maybeSingle()
      .then(({ data, error }) => {
        if (!active) return
        if (error) setError(error.message)
        else setArticle((data as Article) ?? null)
        setLoading(false)
      })
    return () => { active = false }
  }, [slug])

  return { article, loading, error }
}
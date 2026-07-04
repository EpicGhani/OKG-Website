import { supabase } from '../lib/supabase'
import type { Article } from './types'

export async function createArticle(article: Article) {
  const { error } = await supabase.from('articles').insert(article)
  return { error: error ? error.message : null }
}

export async function updateArticle(slug: string, article: Article) {
  const { error } = await supabase.from('articles').update(article).eq('slug', slug)
  return { error: error ? error.message : null }
}

export async function deleteArticle(slug: string) {
  const { error } = await supabase.from('articles').delete().eq('slug', slug)
  return { error: error ? error.message : null }
}
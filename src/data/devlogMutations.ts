import { supabase } from '../lib/supabase'
import type { Devlog } from './types'

export async function createDevlog(entry: Devlog) {
  const { error } = await supabase.from('devlogs').insert(entry)
  return { error: error ? error.message : null }
}

export async function updateDevlog(slug: string, entry: Devlog) {
  const { error } = await supabase.from('devlogs').update(entry).eq('slug', slug)
  return { error: error ? error.message : null }
}

export async function deleteDevlog(slug: string) {
  const { error } = await supabase.from('devlogs').delete().eq('slug', slug)
  return { error: error ? error.message : null }
}
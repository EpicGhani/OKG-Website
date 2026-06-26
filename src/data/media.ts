import { supabase } from '../lib/supabase'

export type MediaFile = { name: string; path: string; url: string; folder: string }

export const MEDIA_FOLDERS = ['devlog', 'games'] as const

export async function listMedia(folders: readonly string[] = MEDIA_FOLDERS): Promise<{ files: MediaFile[]; error: string | null }> {
  const all: MediaFile[] = []
  for (const folder of folders) {
    const { data, error } = await supabase.storage
      .from('media')
      .list(folder, { limit: 1000, sortBy: { column: 'created_at', order: 'desc' } })
    if (error) return { files: [], error: error.message }
    for (const f of data ?? []) {
      if (!f.name || f.name.startsWith('.')) continue
      const path = `${folder}/${f.name}`
      const { data: pub } = supabase.storage.from('media').getPublicUrl(path)
      all.push({ name: f.name, path, url: pub.publicUrl, folder })
    }
  }
  return { files: all, error: null }
}

export async function deleteMedia(path: string): Promise<{ error: string | null }> {
  const { error } = await supabase.storage.from('media').remove([path])
  return { error: error ? error.message : null }
}
import { supabase } from './supabase'

export async function uploadImage(
  file: File,
  folder = 'devlog',
): Promise<{ url: string | null; error: string | null }> {
  const safeName = file.name.replace(/[^a-z0-9.]+/gi, '-').toLowerCase()
  const path = `${folder}/${Date.now()}-${safeName}`

  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })
  if (error) return { url: null, error: error.message }

  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}
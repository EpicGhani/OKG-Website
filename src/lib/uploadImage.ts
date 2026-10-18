import { supabase } from './supabase'
import { prepareImageUpload } from './prepareImageUpload'

export async function uploadImage(
  file: File,
  folder = 'devlog',
): Promise<{ url: string | null; error: string | null }> {
  try {
    file = await prepareImageUpload(file)
  } catch (error) {
    return { url: null, error: error instanceof Error ? error.message : 'Could not prepare this image for upload.' }
  }
  const safeName = file.name.replace(/[^a-z0-9.]+/gi, '-').toLowerCase()
  const path = `${folder}/${Date.now()}-${safeName}`

  const { error } = await supabase.storage.from('media').upload(path, file, {
    cacheControl: '3600',
    contentType: file.type,
    upsert: false,
  })
  if (error) return { url: null, error: error.message }

  const { data } = supabase.storage.from('media').getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}

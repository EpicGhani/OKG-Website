import { supabase } from './supabase'

/** The database is authoritative; never trust email/user_metadata in the browser. */
export async function checkEditorAccess(): Promise<{ allowed: boolean; error: string | null }> {
  try {
    const { data, error } = await supabase.rpc('is_site_editor')
    if (error) return { allowed: false, error: 'Editor access could not be verified. Please contact the site administrator.' }
    return { allowed: data === true, error: data === true ? null : 'This account does not have editing access.' }
  } catch {
    return { allowed: false, error: 'Unable to verify editor access. Check your connection and try again.' }
  }
}

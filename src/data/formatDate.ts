export function formatDevlogDate(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function formatEdited(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function wasEdited(created?: string, updated?: string) {
  if (!created || !updated) return false
  return new Date(updated).getTime() - new Date(created).getTime() > 60_000 // >1 min
}
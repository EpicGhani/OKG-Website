import type { Devlog as DevlogEntry, DevlogAccent } from '../data/types'

export type Accent = { color: string; soft: string; band: string }

const accents: Record<DevlogAccent, Accent> = {
  pula: { color: 'var(--pula-500)', soft: 'var(--pula-100)', band: 'kalinga' },
  luntian: { color: 'var(--luntian-500)', soft: 'var(--luntian-100)', band: 'gayaman' },
  bughaw: { color: 'var(--bughaw-500)', soft: 'var(--bughaw-100)', band: 'terrace' },
  ink: { color: 'var(--itim-800)', soft: 'var(--itim-100)', band: 'fret' },
}

const accentOrder: DevlogAccent[] = ['pula', 'luntian', 'bughaw', 'ink']

export const PATTERNS = [
  'banig', 'butil', 'chevron', 'diamond', 'kawayan', 'sabit',
  'sawtooth', 'stitch', 'tnalak', 'ulan', 'warp', 'weave',
] as const

const DEFAULT_PATTERN = 'tnalak'

export function accentFor(accent: DevlogAccent | undefined, seed = ''): Accent {
  if (accent && accents[accent]) return accents[accent]
  const sum = [...seed].reduce((total, ch) => total + ch.charCodeAt(0), 0)
  return accents[accentOrder[sum % accentOrder.length]]
}

export function patternClassFor(pattern?: string): string {
  const name = pattern && (PATTERNS as readonly string[]).includes(pattern) ? pattern : DEFAULT_PATTERN
  return `ok-pattern-${name}`
}

export function resolveAccent(entry: DevlogEntry): Accent {
  return accentFor(entry.accent, entry.n)
}

export function resolvePatternClass(entry: DevlogEntry): string {
  return patternClassFor(entry.pattern)
}
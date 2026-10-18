import type { ServiceArt } from './types'

/** Coming-soon collections. Replace the icon art with product images when ready. */
export const merchCollections: (ServiceArt & { id: string })[] = [
  { id: 'boardgames', label: 'Board games', sub: 'Coming soon', icon: 'dices', fg: 'var(--pula-500)', bg: 'var(--buhangin-100)', band: 'kalinga' },
  { id: 'shirts', label: 'Shirts', sub: 'Coming soon', icon: 'shirt', fg: 'var(--luntian-500)', bg: 'var(--buhangin-100)', band: 'gayaman' },
  { id: 'plushies', label: 'Plushies', sub: 'Coming soon', icon: 'heart', fg: 'var(--bughaw-500)', bg: 'var(--buhangin-100)', band: 'terrace' },
  { id: 'stickers', label: 'Stickers', sub: 'Coming soon', icon: 'sticker', fg: 'var(--pula-500)', bg: 'var(--buhangin-100)', band: 'okir' },
]

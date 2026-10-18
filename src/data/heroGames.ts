/** Independent of the CMS until the new game pages are ready.
 * Asset export guide: public/images/hero/README.md.
 */
export type HeroGame = {
  id: 'hearthleaf' | 'monster-girl' | 'veridian'
  titleLines: string[]
  path: string
  subtitle?: string
  background: string | null
  foreground: string | null
  foregroundSrcSet?: string
  foregroundIncludesTitle: boolean
}

export const heroGames: HeroGame[] = [
  {
    id: 'hearthleaf', titleLines: ['Hearthleaf', 'Corner'],
    path: '/games/hearthleaf-corner',
    background: null, foreground: null, foregroundIncludesTitle: false,
  },
  {
    id: 'monster-girl', titleLines: ['Monster', 'Girl', 'Tactics'],
    path: '/games/monster-girl-tactics',
    subtitle: 'Strategy + Tactics + Dungeons',
    background: null, foreground: '/images/hero/monster-girl-foreground.webp', foregroundIncludesTitle: false,
  },
  {
    id: 'veridian', titleLines: ['Steps to', 'Veridian'],
    path: '/games/steps-to-veridian',
    background: null, foreground: '/images/library/bintu.webp', foregroundIncludesTitle: false,
    foregroundSrcSet: '/images/library/bintu-480.webp 480w, /images/library/bintu.webp 1000w',
  },
]

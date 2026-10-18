import type { Game, GameBannerSettings } from './types'

export const defaultBanner: GameBannerSettings = {
  theme: 'default', background: '', background_small: '', foreground: '', foreground_small: '',
  title_lines: [], subtitle: '', includes_title: false, pixel_art: false, foreground_layout: 'character',
}

export function safeImagePath(value: unknown): string {
  if (typeof value !== 'string') return ''
  const path = value.trim()
  if (/^\/(?!\/)/.test(path) && !/[\\\s<>"']/.test(path)) return path
  try { const url = new URL(path); return url.protocol === 'https:' && !url.username && !url.password ? url.href : '' } catch { return '' }
}

/** No game identities or assets are embedded here; the CMS owns all content. */
export function getBannerSettings(game: Pick<Game, 'hero_banner'>): GameBannerSettings {
  const raw = game.hero_banner ?? {}
  return {
    theme: ['hearthleaf','monster-girl','veridian'].includes(raw.theme ?? '') ? raw.theme as GameBannerSettings['theme'] : 'default',
    background: safeImagePath(raw.background), background_small: safeImagePath(raw.background_small),
    foreground: safeImagePath(raw.foreground), foreground_small: safeImagePath(raw.foreground_small),
    title_lines: Array.isArray(raw.title_lines) ? raw.title_lines.filter((line): line is string => typeof line === 'string' && !!line.trim()).map(line => line.trim()).slice(0,4) : [],
    subtitle: typeof raw.subtitle === 'string' ? raw.subtitle : '',
    includes_title: raw.includes_title === true, pixel_art: raw.pixel_art === true,
    foreground_layout: raw.foreground_layout === 'logo' ? 'logo' : 'character',
  }
}

export function selectHeroGames(games: Game[]): Game[] {
  return games.filter(game => game.published === true && game.featured === true)
    .sort((a,b) => (a.hero_order ?? 100) - (b.hero_order ?? 100) || a.slug.localeCompare(b.slug)).slice(0,3)
}

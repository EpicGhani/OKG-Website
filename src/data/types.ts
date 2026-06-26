export type Tone = 'pula' | 'luntian' | 'sand'

export type DevlogAccent = 'pula' | 'luntian' | 'bughaw' | 'ink'

export type GameLink = { label: string; url: string }

export interface Game {
  slug: string
  title: string
  tagline: string
  description?: string
  status: string
  status_accent?: DevlogAccent
  year: string
  genres: string[]
  cover_image?: string
  screenshots?: string[]
  links?: GameLink[]
  accent?: DevlogAccent
  pattern?: string
  featured?: boolean
  published?: boolean
  created_at?: string
  updated_at?: string
}

export type FeaturePair = [string, string]

export interface ServiceArt {
  label: string
  sub: string
  icon: string
  fg: string
  bg: string
  band: string
}

export interface Service {
  n: string
  phase: string
  title: string
  body: string
  points?: FeaturePair[]
  grid?: FeaturePair[]
  cols?: FeaturePair[]
  cta: string
  art?: ServiceArt
}

export interface Engagement {
  id: string
  kicker: string
  title: string
  body: string
  points: string[]
  cta: string
  tone: Tone
}

export interface Devlog {
  slug: string
  n: string
  kicker: string
  title: string
  pattern?: string
  accent?: DevlogAccent
  body?: string
  created_at?: string
  updated_at?: string
  status?: DevlogStatus
}

export type DevlogStatus = 'draft' | 'published'
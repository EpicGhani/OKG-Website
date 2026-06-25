export type Tone = 'pula' | 'luntian' | 'sand'

export interface Game {
  id: string
  title: string
  tagline: string
  status: string
  statusTone: Tone
  year: string
  genres: string[]
  pattern: string
  band: string
  coverFg: string
  coverBg: string
  coverInk: string
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
  n: string
  kicker: string
  title: string
  date: string
}
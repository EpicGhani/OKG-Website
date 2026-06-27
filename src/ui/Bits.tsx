import type { CSSProperties, ReactNode } from 'react'
import { icons } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import type { ServiceArt } from '../data/types'

type Style = CSSProperties & Record<`--${string}`, string | number>

interface ContainerProps {
  children?: ReactNode
  style?: CSSProperties
  width?: string | number
}
export function Container({ children, style = {}, width = 'var(--container)' }: ContainerProps) {
  return (
    <div style={{ maxWidth: width, margin: '0 auto', width: '100%', padding: '0 clamp(20px, 5vw, 40px)', boxSizing: 'border-box', ...style }}>
      {children}
    </div>
  )
}

interface MarkProps { kind?: string; color?: string; size?: number; style?: CSSProperties }
export function Mark({ kind = 'sun', color = 'var(--pula-500)', size = 48, style = {} }: MarkProps) {
  return <span className={'ok-mark-' + kind} style={{ '--mark-color': color, width: size, height: size, ...style } as Style} />
}

interface BandProps { kind?: string; color?: string; height?: number; style?: CSSProperties }
export function Band({ kind = 'kalinga', color = 'var(--pula-500)', height = 24, style = {} }: BandProps) {
  return <div className={'ok-band-' + kind} style={{ '--mark-color': color, height, ...style } as Style} />
}

interface IconProps { name: string; size?: number; color?: string; strokeWidth?: number; style?: CSSProperties }
export function Icon({ name, size = 18, color = 'currentColor', strokeWidth = 2, style }: IconProps) {
  const key = name.split(/[-_]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
  const LucideIcon = icons[key as keyof typeof icons]
  if (!LucideIcon) return null
  return <LucideIcon size={size} color={color} strokeWidth={strokeWidth} style={style} />
}

interface ArtFrameProps { art: ServiceArt; height?: number }
export function ArtFrame({ art, height = 360 }: ArtFrameProps) {
  return (
    <div style={{
      position: 'relative', height, borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      background: art.bg, border: '2.5px solid var(--border-ink)', boxShadow: 'var(--shadow-stamp)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div className="ok-tile-binakol" style={{ position: 'absolute', inset: 0, '--mark-color': art.fg, opacity: 0.1 } as Style} />
      <Band kind={art.band} color={art.fg} height={22} style={{ position: 'absolute', top: 18, left: 18, right: 18, opacity: 0.5, width: 'auto' }} />
      <Band kind={art.band} color={art.fg} height={22} style={{ position: 'absolute', bottom: 18, left: 18, right: 18, opacity: 0.5, width: 'auto' }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 24 }}>
        <span style={{ display: 'inline-flex', width: 76, height: 76, borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--border-ink)', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <Icon name={art.icon} size={34} color={art.fg} strokeWidth={1.75} />
        </span>
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text)', letterSpacing: '-0.01em' }}>{art.label}</p>
          <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', color: art.fg }}>{art.sub}</p>
        </div>
      </div>
    </div>
  )
}

interface SectionHeadProps {
  kicker: ReactNode
  title: ReactNode
  color?: string
  kickerColor?: string
  align?: 'left' | 'center'
  max?: number | string
}
export function SectionHead({ kicker, title, color = 'var(--text)', kickerColor, align = 'left', max }: SectionHeadProps) {
  return (
    <div style={{ textAlign: align, maxWidth: max, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>
      <div style={{ display: 'flex', justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
        <Eyebrow color={kickerColor}>{kicker}</Eyebrow>
      </div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4.2vw, 50px)', lineHeight: 1.02, letterSpacing: '-0.02em', color, margin: '14px 0 0' }}>{title}</h2>
    </div>
  )
}
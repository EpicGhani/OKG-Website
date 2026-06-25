import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

type BadgeTone = 'pula' | 'luntian' | 'bughaw' | 'ink' | 'sand'
type BadgeVariant = 'solid' | 'soft' | 'outline'
type BadgeSize = 'sm' | 'md'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  tone?: BadgeTone
  variant?: BadgeVariant
  size?: BadgeSize
  style?: CSSProperties
}

export function Badge({ children, tone = 'pula', variant = 'soft', size = 'md', style = {}, ...rest }: BadgeProps) {
  const palette = {
    pula: { solidBg: 'var(--pula-500)', softBg: 'var(--pula-100)', softFg: 'var(--pula-700)', line: 'var(--pula-500)' },
    luntian: { solidBg: 'var(--luntian-500)', softBg: 'var(--luntian-100)', softFg: 'var(--luntian-700)', line: 'var(--luntian-500)' },
    bughaw: { solidBg: 'var(--bughaw-500)', softBg: 'var(--bughaw-100)', softFg: 'var(--bughaw-700)', line: 'var(--bughaw-500)' },
    ink: { solidBg: 'var(--itim-800)', softBg: 'var(--itim-100)', softFg: 'var(--itim-800)', line: 'var(--itim-800)' },
    sand: { solidBg: 'var(--buhangin-300)', softBg: 'var(--buhangin-200)', softFg: 'var(--itim-700)', line: 'var(--buhangin-400)' },
  }[tone]

  const sizes = {
    sm: { padding: '2px 8px', fontSize: '10px' },
    md: { padding: '4px 11px', fontSize: '11px' },
  }[size]

  const variants = {
    solid: { background: palette.solidBg, color: tone === 'sand' ? 'var(--itim-800)' : 'var(--buhangin-100)', border: 'var(--border-width) solid transparent' },
    soft: { background: palette.softBg, color: palette.softFg, border: 'var(--border-width) solid transparent' },
    outline: { background: 'transparent', color: palette.softFg, border: 'var(--border-width) solid ' + palette.line },
  }[variant]

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '5px',
        fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', borderRadius: 'var(--radius-sm)', lineHeight: 1.3,
        whiteSpace: 'nowrap', ...sizes, ...variants, ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  )
}
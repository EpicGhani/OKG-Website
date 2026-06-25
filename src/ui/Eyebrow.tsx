import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  color?: string
  rule?: boolean
  style?: CSSProperties
}

export function Eyebrow({ children, color = 'var(--primary)', rule = true, style = {}, ...rest }: EyebrowProps) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700,
        letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color, ...style,
      }}
      {...rest}
    >
      {rule && <span style={{ width: '26px', height: '2px', background: color, display: 'inline-block' }} />}
      {children}
    </span>
  )
}
import { useState } from 'react'
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'stamp'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  style?: CSSProperties
}

export function Button({
  children, variant = 'primary', size = 'md', block = false, disabled = false,
  iconLeft = null, iconRight = null, type = 'button', onClick, style = {}, ...rest
}: ButtonProps) {
  const sizes = {
    sm: { padding: '7px 14px', fontSize: '13px', gap: '7px' },
    md: { padding: '11px 22px', fontSize: '15px', gap: '9px' },
    lg: { padding: '15px 30px', fontSize: '17px', gap: '11px' },
  }

  const base: CSSProperties = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : 'auto',
    alignItems: 'center', justifyContent: 'center',
    gap: sizes[size].gap, padding: sizes[size].padding, fontSize: sizes[size].fontSize,
    fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-semibold)', lineHeight: 1,
    letterSpacing: '0.005em', border: 'var(--border-width) solid transparent',
    borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    textDecoration: 'none', whiteSpace: 'nowrap', boxSizing: 'border-box',
  }

  const variants: Record<ButtonVariant, CSSProperties> = {
    primary: { background: 'var(--primary)', color: 'var(--text-on-brand)', borderColor: 'var(--primary)' },
    secondary: { background: 'var(--secondary)', color: 'var(--text-on-dark)', borderColor: 'var(--secondary)' },
    outline: { background: 'transparent', color: 'var(--text)', borderColor: 'var(--border-ink)' },
    ghost: { background: 'transparent', color: 'var(--text)', borderColor: 'transparent' },
    stamp: { background: 'var(--buhangin-100)', color: 'var(--itim-800)', borderColor: 'var(--itim-800)', borderWidth: 'var(--border-width-bold)', boxShadow: 'var(--shadow-stamp-sm)' },
  }

  const [hover, setHover] = useState(false)
  const [press, setPress] = useState(false)

  const hoverStyle: CSSProperties = !disabled && hover ? ({
    primary: { background: 'var(--primary-hover)', borderColor: 'var(--primary-hover)' },
    secondary: { background: 'var(--secondary-hover)', borderColor: 'var(--secondary-hover)' },
    outline: { background: 'var(--itim-800)', color: 'var(--text-on-dark)' },
    ghost: { background: 'color-mix(in srgb, var(--itim-800) 8%, transparent)' },
    stamp: { boxShadow: 'var(--shadow-stamp)', transform: 'translate(-1px,-1px)' },
  } as Record<ButtonVariant, CSSProperties>)[variant] : {}

  const pressStyle: CSSProperties = !disabled && press
    ? (variant === 'stamp' ? { transform: 'translate(2px,2px)', boxShadow: 'none' } : { transform: 'translateY(1px)' })
    : {}

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false) }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...pressStyle, ...style }}
      {...rest}
    >
      {iconLeft}{children}{iconRight}
    </button>
  )
}
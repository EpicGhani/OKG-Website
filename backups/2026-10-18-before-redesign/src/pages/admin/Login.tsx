import { useState } from 'react'
import type { FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import type { CSSProperties } from 'react'
import { useAuth } from '../../lib/authContext'
import { Button } from '../../ui'

const inputStyle: CSSProperties = {
  width: '100%', boxSizing: 'border-box', padding: '11px 14px',
  fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text)',
  background: 'var(--bg)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-md)',
}

export function Login() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const result = await signIn(email, password)
    setBusy(false)
    if (result.error) setError(result.error)
    else navigate('/admin', { replace: true })
  }

  return (
    <div style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-ink)', padding: 24 }}>
      <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: 380, background: 'var(--surface)', border: '2.5px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-stamp)', padding: '36px 32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>Admin sign in</h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', margin: '6px 0 24px' }}>Obra Kasi dashboard</p>

        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />

        <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '16px 0 6px' }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />

        {error && <p style={{ color: 'var(--pula-700)', fontSize: 13, margin: '14px 0 0' }}>{error}</p>}

        <div style={{ marginTop: 24 }}>
          <Button type="submit" variant="primary" size="md" block disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</Button>
        </div>
      </form>
    </div>
  )
}
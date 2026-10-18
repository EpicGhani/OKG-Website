import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useAuth } from '../../lib/authContext'
import { checkEditorAccess } from '../../lib/checkEditorAccess'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { session, loading, signOut } = useAuth()
  const location = useLocation()
  const [access, setAccess] = useState<{ token: string; allowed: boolean; error: string | null } | null>(null)
  const token = session?.access_token
  useEffect(() => {
    if (!token) return
    let active = true
    checkEditorAccess().then(result => { if (active) setAccess({ token, ...result }) })
    return () => { active = false }
  }, [token])

  if (loading || (token && access?.token !== token)) {
    return (
      <div style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
        Checking session…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  if (!access?.allowed) {
    return <main style={{ maxWidth: 560, margin: '12vh auto', padding: 24 }}>
      <h1>Editing access unavailable</h1>
      <p role="alert">{access?.error}</p>
      <button type="button" onClick={() => void signOut()}>Sign out</button>
    </main>
  }

  return <>{children}</>
}

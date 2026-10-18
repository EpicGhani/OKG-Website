import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '../sections/Header'
import { Footer } from '../sections/Footer'

export function Layout() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        let frame = 0
        const alignTarget = () => {
          cancelAnimationFrame(frame)
          frame = requestAnimationFrame(() => el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }))
        }
        // Published cards and images can change the target's position after navigation.
        // Keep it aligned while loading, but yield as soon as the visitor interacts.
        const observer = new ResizeObserver(alignTarget)
        observer.observe(el.closest('main') ?? el)
        const interactionEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const
        const stopAligning = () => {
          observer.disconnect()
          cancelAnimationFrame(frame)
          interactionEvents.forEach((event) => window.removeEventListener(event, stopAligning))
        }
        interactionEvents.forEach((event) => window.addEventListener(event, stopAligning, { passive: true }))
        alignTarget()
        return stopAligning
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, key])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100svh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

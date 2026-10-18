import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { publicPages, siteOrigin } from '../data/siteSeo.mjs'

export function RouteMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/'
    const page = publicPages[path as keyof typeof publicPages]
    const admin = path === '/admin' || path.startsWith('/admin/')
    document.title = admin ? 'Admin — Obra Kasi Games' : page?.title ?? 'Obra Kasi Games'
    const setMeta = (attribute: string, name: string, value: string) => {
      let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`)
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(attribute, name); document.head.append(meta) }
      meta.content = value
    }
    setMeta('name', 'robots', admin ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large')
    setMeta('property', 'og:url', siteOrigin + path)
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', siteOrigin + path)
    const description = page?.description ?? publicPages['/'].description
    setMeta('name', 'description', description)
    setMeta('property', 'og:description', description)
    setMeta('name', 'twitter:description', description)
    setMeta('property', 'og:title', document.title)
    setMeta('name', 'twitter:title', document.title)
  }, [pathname])
  return null
}

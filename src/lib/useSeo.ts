import { useEffect } from 'react'

const DEFAULT_TITLE = 'Obra Kasi Games'

export function useSeo(title?: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = title
      for (const selector of ['meta[property="og:title"]','meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content',title)
    }
    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
      for (const selector of ['meta[property="og:description"]','meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content',description)
    }
    return () => { document.title = DEFAULT_TITLE }
  }, [title, description])
}

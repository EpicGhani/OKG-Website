import { useArticles } from './useArticles'
import { useDevlogs } from './useDevlogs'
import type { Article, Devlog } from './types'

export type StudioUpdate = {
  id: string
  date?: string
} & ({ kind: 'article'; content: Article } | { kind: 'devlog'; content: Devlog })

function timestamp(date?: string) {
  const value = date ? Date.parse(date) : 0
  return Number.isFinite(value) ? value : 0
}

/** Share the existing publishing rules; never show drafts in the showcase. */
export function useStudioUpdates() {
  const articles = useArticles()
  const devlogs = useDevlogs()
  const updates: StudioUpdate[] = [
    ...articles.articles.filter((article) => article.published).map((article): StudioUpdate => ({
      id: `article:${article.slug}`,
      kind: 'article',
      content: article,
      date: article.created_at,
    })),
    ...devlogs.devlogs.filter((devlog) => devlog.status === 'published').map((devlog): StudioUpdate => ({
      id: `devlog:${devlog.slug}`,
      kind: 'devlog',
      content: devlog,
      date: devlog.created_at,
    })),
  ].sort((a, b) => timestamp(b.date) - timestamp(a.date)).slice(0, 4)

  return {
    updates,
    loading: articles.loading || devlogs.loading,
    error: Boolean(articles.error || devlogs.error),
    retry: () => { articles.refetch(); devlogs.refetch() },
  }
}

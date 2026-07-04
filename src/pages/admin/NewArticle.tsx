import { Link, useNavigate } from 'react-router-dom'
import { ArticleForm } from './ArticleForm'
import { createArticle } from '../../data/articleMutations'
import type { Article } from '../../data/types'

export function NewArticle() {
  const navigate = useNavigate()
  const handleSubmit = async (a: Article) => {
    const result = await createArticle(a)
    if (!result.error) navigate('/admin/articles')
    return result
  }
  return (
    <div>
      <Link to="/admin/articles" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← Articles</Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: '12px 0 24px' }}>New article</h1>
      <ArticleForm submitLabel="Publish" onSubmit={handleSubmit} />
    </div>
  )
}
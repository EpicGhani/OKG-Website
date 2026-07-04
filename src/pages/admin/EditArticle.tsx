import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArticleForm } from './ArticleForm'
import { useArticle } from '../../data/useArticles'
import { updateArticle } from '../../data/articleMutations'
import type { Article } from '../../data/types'

export function EditArticle() {
  const { slug } = useParams()
  const { article, loading } = useArticle(slug)
  const navigate = useNavigate()
  const handleSubmit = async (updated: Article) => {
    const result = await updateArticle(slug ?? '', updated)
    if (!result.error) navigate('/admin/articles')
    return result
  }
  if (loading) return <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
  if (!article) return <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Not found. <Link to="/admin/articles">Back</Link></p>
  return (
    <div>
      <Link to="/admin/articles" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}>← Articles</Link>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: '12px 0 24px' }}>Edit article</h1>
      <ArticleForm initial={article} submitLabel="Save changes" onSubmit={handleSubmit} />
    </div>
  )
}
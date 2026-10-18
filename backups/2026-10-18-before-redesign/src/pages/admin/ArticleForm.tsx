import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useBlocker } from 'react-router-dom'
import { Button, RichText, ArticleCard, PATTERNS } from '../../ui'
import { MediaPicker } from './MediaPicker'
import { useUnsavedChanges } from '../../lib/useUnsavedChanges'
import type { Article, DevlogAccent } from '../../data/types'

const accentOptions: { value: DevlogAccent; color: string }[] = [
  { value: 'pula', color: 'var(--pula-500)' },
  { value: 'luntian', color: 'var(--luntian-500)' },
  { value: 'bughaw', color: 'var(--bughaw-500)' },
  { value: 'ink', color: 'var(--itim-800)' },
]

const cheatsheet: [string, string][] = [
  ['# / ##', 'Heading'], ['**bold**', 'Bold'], ['*italic*', 'Italic'],
  ['- item', 'Bullet list'], ['1. item', 'Numbered'], ['[text](url)', 'Link'],
  ['![alt](url)', 'Image'], ['> quote', 'Quote'], ['`code`', 'Code'],
]

const field: CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '10px 13px', fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text)', background: 'var(--bg)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-md)' }
const labelStyle: CSSProperties = { display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 6px' }
const miniBtn: CSSProperties = { padding: '8px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, borderRadius: 'var(--radius-md)', border: '2px solid var(--border-ink)', background: 'var(--bg)', color: 'var(--text)' }

function slugify(s: string) { return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') }

function AccentDots({ value, onChange }: { value: DevlogAccent; onChange: (a: DevlogAccent) => void }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {accentOptions.map((opt) => (
        <button key={opt.value} type="button" onClick={() => onChange(opt.value)} title={opt.value}
          style={{ width: 32, height: 32, cursor: 'pointer', borderRadius: '50%', background: opt.color, border: value === opt.value ? '3px solid var(--text)' : '3px solid var(--border)' }} />
      ))}
    </div>
  )
}

export function ArticleForm({ initial, submitLabel, onSubmit }: { initial?: Article; submitLabel: string; onSubmit: (a: Article) => Promise<{ error: string | null }> }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug))
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '')
  const [author, setAuthor] = useState(initial?.author ?? '')
  const [tagsText, setTagsText] = useState((initial?.tags ?? []).join(', '))
  const [accent, setAccent] = useState<DevlogAccent>(initial?.accent ?? 'bughaw')
  const [pattern, setPattern] = useState(initial?.pattern ?? 'weave')
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? '')
  const [body, setBody] = useState(initial?.body ?? '')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [pickerTarget, setPickerTarget] = useState<'cover' | 'body' | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const pendingPublished = useRef(initial?.published ?? true)
  const bypass = useRef(false)

  const onTitleChange = (v: string) => { setTitle(v); if (!slugTouched) setSlug(slugify(v)) }

  const insertAtCursor = (text: string) => {
    const ta = textareaRef.current
    const start = ta ? ta.selectionStart : body.length
    const end = ta ? ta.selectionEnd : body.length
    setBody((b) => b.slice(0, start) + text + b.slice(end))
    requestAnimationFrame(() => { if (!ta) return; ta.focus(); const p = start + text.length; ta.setSelectionRange(p, p) })
  }

  const onPick = (url: string, name: string) => {
    if (pickerTarget === 'cover') setCoverImage(url)
    else if (pickerTarget === 'body') insertAtCursor(`\n\n![${name}](${url})\n\n`)
    setPickerTarget(null)
  }

  const tags = tagsText.split(',').map((s) => s.trim()).filter(Boolean)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true); setError(null); bypass.current = true
    const entry: Article = { slug: slug || slugify(title), title, excerpt, author, cover_image: coverImage || undefined, body, tags, accent, pattern, published: pendingPublished.current }
    const result = await onSubmit(entry)
    setBusy(false)
    if (result.error) { bypass.current = false; setError(result.error) }
  }

  const previewArticle: Article = { slug: slug || 'preview', title: title || 'Untitled', excerpt, author, cover_image: coverImage || undefined, tags, accent, pattern }

  const dirty =
    JSON.stringify({ title, slug, excerpt, author, tagsText, accent, pattern, coverImage, body }) !==
    JSON.stringify({ title: initial?.title ?? '', slug: initial?.slug ?? '', excerpt: initial?.excerpt ?? '', author: initial?.author ?? '', tagsText: (initial?.tags ?? []).join(', '), accent: initial?.accent ?? 'bughaw', pattern: initial?.pattern ?? 'weave', coverImage: initial?.cover_image ?? '', body: initial?.body ?? '' })
  useUnsavedChanges(dirty)
  const blocker = useBlocker(useCallback(() => dirty && !bypass.current, [dirty]))
  useEffect(() => {
    if (blocker.state !== 'blocked') return
    if (window.confirm('You have unsaved changes. Leave without saving?')) blocker.proceed()
    else blocker.reset()
  }, [blocker])

  return (
    <form onSubmit={handleSubmit}>
      <div className="devlog-editor-grid">
        <div>
          <div>
            <label style={labelStyle}>Title</label>
            <input value={title} onChange={(e) => onTitleChange(e.target.value)} required style={field} />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Slug {slugTouched ? '(custom)' : '(auto)'}</label>
            <input value={slug} onChange={(e) => { setSlugTouched(true); setSlug(e.target.value) }} style={field} />
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Excerpt</label>
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} placeholder="A short summary…" style={{ ...field, resize: 'vertical', lineHeight: 1.5 }} />
          </div>
          <div className='stack-mobile' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" style={field} />
            </div>
            <div>
              <label style={labelStyle}>Tags (comma-separated)</label>
              <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="Craft, Culture" style={field} />
            </div>
          </div>
          <div className='stack-mobile' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>Accent</label>
              <AccentDots value={accent} onChange={setAccent} />
            </div>
            <div>
              <label style={labelStyle}>Pattern</label>
              <select value={pattern} onChange={(e) => setPattern(e.target.value)} style={{ ...field, cursor: 'pointer', textTransform: 'capitalize' }}>
                {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Cover image</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {coverImage && <img src={coverImage} alt="cover" style={{ width: 80, height: 45, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '2px solid var(--border-ink)' }} />}
              <button type="button" onClick={() => setPickerTarget('cover')} style={miniBtn}>{coverImage ? 'Change' : 'Choose cover'}</button>
              {coverImage && <button type="button" onClick={() => setCoverImage('')} style={{ ...miniBtn, color: 'var(--pula-700)', borderColor: 'var(--pula-500)' }}>Remove</button>}
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ ...labelStyle, margin: 0 }}>Body (Markdown)</span>
              <span className="md-help" tabIndex={0}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', background: 'var(--itim-800)', color: 'var(--buhangin-100)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'help' }}>?</span>
                <span className="md-help__pop">
                  {cheatsheet.map(([s, l]) => (
                    <span key={l} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <code style={{ color: 'var(--pula-300)' }}>{s}</code><span style={{ opacity: 0.7 }}>{l}</span>
                    </span>
                  ))}
                </span>
              </span>
            </div>
            <textarea ref={textareaRef} value={body} onChange={(e) => setBody(e.target.value)} rows={16} style={{ ...field, resize: 'vertical', lineHeight: 1.6, fontFamily: 'var(--font-mono)', fontSize: 13 }} />
            <div style={{ marginTop: 8 }}>
              <button type="button" onClick={() => setPickerTarget('body')} style={miniBtn}>🖼 Add image</button>
            </div>
          </div>

          {error && <p style={{ color: 'var(--pula-700)', fontSize: 13, margin: '18px 0 0' }}>{error}</p>}

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <Button type="submit" variant="outline" size="md" disabled={busy} onClick={() => { pendingPublished.current = false }}>Save draft</Button>
            <Button type="submit" variant="primary" size="md" disabled={busy} onClick={() => { pendingPublished.current = true }}>{busy ? 'Saving…' : submitLabel}</Button>
          </div>
        </div>

        <div style={{ position: 'sticky', top: 24 }}>
          <p style={labelStyle}>Live preview</p>
          <div style={{ maxWidth: 380, pointerEvents: 'none' }}>
            <ArticleCard article={previewArticle} />
          </div>
          {body && (
            <div style={{ marginTop: 24 }}>
              <p style={labelStyle}>Body preview</p>
              <RichText markdown={body} />
            </div>
          )}
        </div>
      </div>

      {pickerTarget && <MediaPicker uploadFolder="articles" onPick={onPick} onClose={() => setPickerTarget(null)} />}
    </form>
  )
}
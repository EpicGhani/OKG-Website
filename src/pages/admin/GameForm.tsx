import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useBlocker } from 'react-router-dom'
import { Button, RichText, GameCard, PATTERNS } from '../../ui'
import { MediaPicker } from './MediaPicker'
import { useUnsavedChanges } from '../../lib/useUnsavedChanges'
import type { Game, GameLink, DevlogAccent } from '../../data/types'

const accentOptions: { value: DevlogAccent; color: string }[] = [
  { value: 'pula', color: 'var(--pula-500)' },
  { value: 'luntian', color: 'var(--luntian-500)' },
  { value: 'bughaw', color: 'var(--bughaw-500)' },
  { value: 'ink', color: 'var(--itim-800)' },
]

const field: CSSProperties = {
  width: '100%', boxSizing: 'border-box', padding: '10px 13px',
  fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text)',
  background: 'var(--bg)', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-md)',
}
const labelStyle: CSSProperties = {
  display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 6px',
}
const miniBtn: CSSProperties = {
  padding: '8px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12,
  borderRadius: 'var(--radius-md)', border: '2px solid var(--border-ink)', background: 'var(--bg)', color: 'var(--text)',
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

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

export function GameForm({
  initial, submitLabel, onSubmit,
}: {
  initial?: Game
  submitLabel: string
  onSubmit: (game: Game) => Promise<{ error: string | null }>
}) {
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug))
  const [title, setTitle] = useState(initial?.title ?? '')
  const [tagline, setTagline] = useState(initial?.tagline ?? '')
  const [status, setStatus] = useState(initial?.status ?? '')
  const [statusAccent, setStatusAccent] = useState<DevlogAccent>(initial?.status_accent ?? 'pula')
  const [year, setYear] = useState(initial?.year ?? '')
  const [genresText, setGenresText] = useState((initial?.genres ?? []).join(', '))
  const [accent, setAccent] = useState<DevlogAccent>(initial?.accent ?? 'pula')
  const [pattern, setPattern] = useState(initial?.pattern ?? 'tnalak')
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? '')
  const [screenshots, setScreenshots] = useState<string[]>(initial?.screenshots ?? [])
  const [links, setLinks] = useState<GameLink[]>(initial?.links ?? [])
  const [description, setDescription] = useState(initial?.description ?? '')
  const [featured, setFeatured] = useState(Boolean(initial?.featured))
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [pickerTarget, setPickerTarget] = useState<'cover' | 'screenshot' | null>(null)
  const pendingPublished = useRef(initial?.published ?? true)
  const bypass = useRef(false)

  const onTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  const genres = genresText.split(',').map((s) => s.trim()).filter(Boolean)

  const previewGame: Game = {
    slug: slug || 'preview', title: title || 'Untitled', tagline, status,
    status_accent: statusAccent, year, genres, cover_image: coverImage || undefined, accent, pattern,
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    bypass.current = true
    const entry: Game = {
      slug: slug || slugify(title), title, tagline, description, status, status_accent: statusAccent, year, genres,
      cover_image: coverImage || undefined, screenshots,
      links: links.filter((l) => l.label.trim() && l.url.trim()),
      accent, pattern, featured, published: pendingPublished.current,
    }
    const result = await onSubmit(entry)
    setBusy(false)
    if (result.error) { bypass.current = false; setError(result.error) }
  }

  const onPick = (url: string) => {
    if (pickerTarget === 'cover') setCoverImage(url)
    else if (pickerTarget === 'screenshot') setScreenshots((s) => [...s, url])
    setPickerTarget(null)
  }

  const dirty =
    JSON.stringify({ slug, title, tagline, status, statusAccent, year, genresText, accent, pattern, coverImage, screenshots, links, description, featured }) !==
    JSON.stringify({
      slug: initial?.slug ?? '', title: initial?.title ?? '', tagline: initial?.tagline ?? '',
      status: initial?.status ?? '', statusAccent: initial?.status_accent ?? 'pula', year: initial?.year ?? '',
      genresText: (initial?.genres ?? []).join(', '), accent: initial?.accent ?? 'pula', pattern: initial?.pattern ?? 'tnalak',
      coverImage: initial?.cover_image ?? '', screenshots: initial?.screenshots ?? [], links: initial?.links ?? [],
      description: initial?.description ?? '', featured: Boolean(initial?.featured),
    })
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
        {/* LEFT */}
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
            <label style={labelStyle}>Tagline</label>
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="A folklore brawler from the islands." style={field} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>Status label</label>
              <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Now playing" style={field} />
            </div>
            <div>
              <label style={labelStyle}>Year</label>
              <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="2025" style={field} />
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Status badge color</label>
            <AccentDots value={statusAccent} onChange={setStatusAccent} />
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Genres (comma-separated)</label>
            <input value={genresText} onChange={(e) => setGenresText(e.target.value)} placeholder="Action, Folklore" style={field} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>Card accent</label>
              <AccentDots value={accent} onChange={setAccent} />
            </div>
            <div>
              <label style={labelStyle}>Card pattern</label>
              <select value={pattern} onChange={(e) => setPattern(e.target.value)} style={{ ...field, cursor: 'pointer', textTransform: 'capitalize' }}>
                {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Cover image</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {coverImage && <img src={coverImage} alt="cover" style={{ width: 56, height: 72, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '2px solid var(--border-ink)' }} />}
              <button type="button" onClick={() => setPickerTarget('cover')} style={miniBtn}>{coverImage ? 'Change' : 'Choose cover'}</button>
              {coverImage && <button type="button" onClick={() => setCoverImage('')} style={{ ...miniBtn, color: 'var(--pula-700)', borderColor: 'var(--pula-500)' }}>Remove</button>}
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Screenshots</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              {screenshots.map((src, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={src} alt={`shot ${i + 1}`} style={{ width: 88, height: 56, objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '2px solid var(--border-ink)', display: 'block' }} />
                  <button type="button" onClick={() => setScreenshots((s) => s.filter((_, j) => j !== i))}
                    style={{ position: 'absolute', top: -8, right: -8, width: 20, height: 20, borderRadius: '50%', cursor: 'pointer', border: '1.5px solid var(--border-ink)', background: 'var(--bg)', color: 'var(--pula-700)', fontSize: 11, lineHeight: 1 }}>✕</button>
                </div>
              ))}
              <button type="button" onClick={() => setPickerTarget('screenshot')} style={miniBtn}>+ Add</button>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Links</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {links.map((link, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <input value={link.label} onChange={(e) => setLinks((ls) => ls.map((l, j) => j === i ? { ...l, label: e.target.value } : l))} placeholder="Steam" style={{ ...field, flex: '0 0 130px' }} />
                  <input value={link.url} onChange={(e) => setLinks((ls) => ls.map((l, j) => j === i ? { ...l, url: e.target.value } : l))} placeholder="https://…" style={field} />
                  <button type="button" onClick={() => setLinks((ls) => ls.filter((_, j) => j !== i))} style={{ ...miniBtn, flexShrink: 0, color: 'var(--pula-700)', borderColor: 'var(--pula-500)' }}>✕</button>
                </div>
              ))}
              <button type="button" onClick={() => setLinks((ls) => [...ls, { label: '', url: '' }])} style={{ ...miniBtn, alignSelf: 'flex-start' }}>+ Add link</button>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Description (Markdown)</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={8} style={{ ...field, resize: 'vertical', lineHeight: 1.6, fontFamily: 'var(--font-mono)', fontSize: 13 }} />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)' }}>
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
            Featured on homepage
          </label>

          {error && <p style={{ color: 'var(--pula-700)', fontSize: 13, margin: '18px 0 0' }}>{error}</p>}

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <Button type="submit" variant="outline" size="md" disabled={busy} onClick={() => { pendingPublished.current = false }}>Save draft</Button>
            <Button type="submit" variant="primary" size="md" disabled={busy} onClick={() => { pendingPublished.current = true }}>{busy ? 'Saving…' : submitLabel}</Button>
          </div>
        </div>

        {/* RIGHT — live preview */}
        <div style={{ position: 'sticky', top: 24 }}>
          <p style={labelStyle}>Live preview</p>
          <div style={{ maxWidth: 300, pointerEvents: 'none' }}>
            <GameCard game={previewGame} />
          </div>
          {description && (
            <div style={{ marginTop: 24 }}>
              <p style={labelStyle}>Description preview</p>
              <RichText markdown={description} />
            </div>
          )}
        </div>
      </div>

      {pickerTarget && <MediaPicker uploadFolder="games" onPick={onPick} onClose={() => setPickerTarget(null)} />}
    </form>
  )
}
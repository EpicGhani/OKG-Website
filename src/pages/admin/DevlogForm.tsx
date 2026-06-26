import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { useBlocker } from 'react-router-dom'
import { Button, RichText, resolveAccent, PATTERNS } from '../../ui'
import { formatDevlogDate } from '../../data/formatDate'
import { MediaPicker } from './MediaPicker'
import type { Devlog, DevlogAccent, DevlogStatus } from '../../data/types'
import { useUnsavedChanges } from '../../lib/useUnsavedChanges'

const accentOptions: { value: DevlogAccent; color: string }[] = [
  { value: 'pula', color: 'var(--pula-500)' },
  { value: 'luntian', color: 'var(--luntian-500)' },
  { value: 'bughaw', color: 'var(--bughaw-500)' },
  { value: 'ink', color: 'var(--itim-800)' },
]

const cheatsheet: [string, string][] = [
  ['# / ##', 'Heading'],
  ['**bold**', 'Bold'],
  ['*italic*', 'Italic'],
  ['- item', 'Bullet list'],
  ['1. item', 'Numbered'],
  ['[text](url)', 'Link'],
  ['![alt](url)', 'Image'],
  ['> quote', 'Quote'],
  ['`code`', 'Code'],
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

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function DevlogForm({
  initial, submitLabel, onSubmit, nextNumber,
}: {
  initial?: Devlog
  submitLabel: string
  onSubmit: (entry: Devlog) => Promise<{ error: string | null }>
  nextNumber?: string
}) {
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug))
  const n = initial?.n ?? nextNumber ?? '—'
  const [kicker, setKicker] = useState(initial?.kicker ?? '')
  const [title, setTitle] = useState(initial?.title ?? '')
  const [accent, setAccent] = useState<DevlogAccent>(initial?.accent ?? 'pula')
  const [pattern, setPattern] = useState(initial?.pattern ?? 'tnalak')
  const [bodyMarkdown, setBodyMarkdown] = useState(initial?.body ?? '')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [showPicker, setShowPicker] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const pendingStatus = useRef<DevlogStatus>(initial?.status ?? 'published')
  const bypass = useRef(false)

  const onTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) setSlug(slugify(value))
  }

  const insertAtCursor = (text: string) => {
    const ta = textareaRef.current
    const start = ta ? ta.selectionStart : bodyMarkdown.length
    const end = ta ? ta.selectionEnd : bodyMarkdown.length
    setBodyMarkdown((b) => b.slice(0, start) + text + b.slice(end))
    requestAnimationFrame(() => {
      if (!ta) return
      ta.focus()
      const pos = start + text.length
      ta.setSelectionRange(pos, pos)
    })
  }

  const handlePick = (url: string, name: string) => {
    insertAtCursor(`\n\n![${name}](${url})\n\n`)
    setShowPicker(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    bypass.current = true
    const entry: Devlog = { slug: slug || slugify(title), n, kicker, title, accent, pattern, body: bodyMarkdown, status: pendingStatus.current }
    const result = await onSubmit(entry)
    setBusy(false)
    if (result.error) { bypass.current = false; setError(result.error) }
  }

  const dirty =
    JSON.stringify({ slug, kicker, title, accent, pattern, body: bodyMarkdown }) !==
    JSON.stringify({
      slug: initial?.slug ?? '',
      kicker: initial?.kicker ?? '',
      title: initial?.title ?? '',
      accent: initial?.accent ?? 'pula',
      pattern: initial?.pattern ?? 'tnalak',
      body: initial?.body ?? '',
    })
  useUnsavedChanges(dirty)
  const blocker = useBlocker(useCallback(() => dirty && !bypass.current, [dirty]))
  useEffect(() => {
    if (blocker.state !== 'blocked') return
    if (window.confirm('You have unsaved changes. Leave without saving?')) {
      blocker.proceed()
    } else {
      blocker.reset()
    }
  }, [blocker])
  const accentStyle = resolveAccent({ slug: '', n, kicker, title, accent })
  const previewDate = formatDevlogDate(initial?.created_at ?? new Date().toISOString())

  return (
    <form onSubmit={handleSubmit}>
      <div className="devlog-editor-grid">
        {/* LEFT — fields + actions */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Number (auto)</label>
              <input value={n} readOnly style={{ ...field, background: 'var(--surface)', color: 'var(--text-muted)' }} />
            </div>
            <div>
              <label style={labelStyle}>Slug {slugTouched ? '(custom)' : '(auto from title)'}</label>
              <input value={slug} onChange={(e) => { setSlugTouched(true); setSlug(e.target.value) }} placeholder="auto from title" style={field} />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Kicker</label>
            <input value={kicker} onChange={(e) => setKicker(e.target.value)} placeholder="Anito" required style={field} />
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={labelStyle}>Title</label>
            <input value={title} onChange={(e) => onTitleChange(e.target.value)} required style={field} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
            <div>
              <label style={labelStyle}>Accent</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {accentOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAccent(opt.value)}
                    title={opt.value}
                    style={{
                      width: 34, height: 34, cursor: 'pointer', borderRadius: '50%',
                      background: opt.color,
                      border: accent === opt.value ? '3px solid var(--text)' : '3px solid var(--border)',
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label style={labelStyle}>Pattern</label>
              <select value={pattern} onChange={(e) => setPattern(e.target.value)} style={{ ...field, cursor: 'pointer', textTransform: 'capitalize' }}>
                {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ ...labelStyle, margin: 0 }}>Body (Markdown)</span>
              <span className="md-help" tabIndex={0}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 16, height: 16, borderRadius: '50%', background: 'var(--itim-800)', color: 'var(--buhangin-100)', fontFamily: 'var(--font-mono)', fontSize: 10, cursor: 'help' }}>?</span>
                <span className="md-help__pop">
                  {cheatsheet.map(([syntax, label]) => (
                    <span key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <code style={{ color: 'var(--pula-300)' }}>{syntax}</code>
                      <span style={{ opacity: 0.7 }}>{label}</span>
                    </span>
                  ))}
                </span>
              </span>
            </div>
            <textarea
              ref={textareaRef}
              value={bodyMarkdown}
              onChange={(e) => setBodyMarkdown(e.target.value)}
              rows={16}
              style={{ ...field, resize: 'vertical', lineHeight: 1.6, fontFamily: 'var(--font-mono)', fontSize: 13 }}
            />
            <div style={{ marginTop: 8 }}>
              <button
                type="button"
                onClick={() => setShowPicker(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontSize: 12, borderRadius: 'var(--radius-md)',
                  border: '2px solid var(--border-ink)', background: 'var(--bg)', color: 'var(--text)',
                }}
              >
                🖼 Add image
              </button>
            </div>
          </div>

          {error && <p style={{ color: 'var(--pula-700)', fontSize: 13, margin: '18px 0 0' }}>{error}</p>}

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <Button type="submit" variant="outline" size="md" disabled={busy} onClick={() => { pendingStatus.current = 'draft' }}>Save draft</Button>
            <Button type="submit" variant="primary" size="md" disabled={busy} onClick={() => { pendingStatus.current = 'published' }}>{busy ? 'Saving…' : submitLabel}</Button>
          </div>
        </div>

        {/* RIGHT — live preview */}
        <div style={{ position: 'sticky', top: 24 }}>
          <p style={labelStyle}>Live preview</p>
          <article style={{ border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg)' }}>
            <div style={{ background: accentStyle.soft, padding: '20px 22px', position: 'relative', overflow: 'hidden' }}>
              <div className={`ok-pattern-${pattern}`} style={{ position: 'absolute', inset: 0, '--pat-color': accentStyle.color, '--pat-bg': accentStyle.soft, opacity: 0.12 } as CSSProperties} />
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: accentStyle.color, lineHeight: 1 }}>#{n}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: accentStyle.color }}>{kicker || 'Kicker'}</span>
              </div>
              <h3 style={{ position: 'relative', fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.01em', color: 'var(--text)', margin: '10px 0 0' }}>{title || 'Untitled'}</h3>
              <p style={{ position: 'relative', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', margin: '10px 0 0' }}>{previewDate}</p>
            </div>
            <div style={{ padding: '20px 22px' }}>
              <RichText markdown={bodyMarkdown || '_Start writing…_'} />
            </div>
          </article>
        </div>
      </div>

      {showPicker && <MediaPicker uploadFolder="devlog" onPick={handlePick} onClose={() => setShowPicker(false)} />}
    </form>
  )
}
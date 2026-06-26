import { useCallback, useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { useDevlogs } from '../../data/useDevlogs'
import { useGames } from '../../data/useGames'
import { listMedia, deleteMedia, MEDIA_FOLDERS } from '../../data/media'
import type { MediaFile } from '../../data/media'

const smallBtn: CSSProperties = {
  flex: 1, padding: '6px 8px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11,
  borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-ink)', background: 'var(--bg)', color: 'var(--text)',
}
const chip = (active: boolean): CSSProperties => ({
  padding: '6px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'capitalize',
  borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-ink)',
  background: active ? 'var(--itim-800)' : 'var(--bg)', color: active ? 'var(--buhangin-100)' : 'var(--text)', fontWeight: active ? 700 : 500,
})

export function AdminMedia() {
  const { devlogs } = useDevlogs()
  const { games } = useGames()
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    let active = true
    listMedia().then(({ files, error }) => {
      if (!active) return
      if (error) setError(error)
      else setFiles(files)
      setLoading(false)
    })
    return () => { active = false }
  }, [reloadKey])

  const usageFor = useCallback((url: string) => {
    const names: string[] = []
    devlogs.forEach((d) => { if ((d.body ?? '').includes(url)) names.push(d.title) })
    games.forEach((g) => {
      if ((g.description ?? '').includes(url) || g.cover_image === url || (g.screenshots ?? []).includes(url)) names.push(g.title)
    })
    return names
  }, [devlogs, games])

  const handleDelete = async (file: MediaFile) => {
    const used = usageFor(file.url)
    const msg = used.length
      ? `"${file.name}" is used in ${used.length} ${used.length === 1 ? 'entry' : 'entries'}:\n${used.map((t) => '• ' + t).join('\n')}\n\nDelete anyway? It will break in those.`
      : `Delete "${file.name}"? This cannot be undone.`
    if (!window.confirm(msg)) return
    const { error } = await deleteMedia(file.path)
    if (error) { window.alert(error); return }
    setReloadKey((k) => k + 1)
  }

  const copyUrl = (file: MediaFile) => {
    navigator.clipboard?.writeText(file.url)
    setCopied(file.path)
    window.setTimeout(() => setCopied((c) => (c === file.path ? null : c)), 1500)
  }

  const shown = filter === 'all' ? files : files.filter((f) => f.folder === filter)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, letterSpacing: '-0.02em', color: 'var(--text)', margin: 0 }}>Media</h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)' }}>{shown.length} files</span>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: 14, margin: '8px 0 0' }}>Shared across devlogs & games. "Unused" ones are safe to delete.</p>

      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        {['all', ...MEDIA_FOLDERS].map((f) => (
          <button key={f} type="button" onClick={() => setFilter(f)} style={chip(filter === f)}>{f}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
      ) : error ? (
        <p style={{ marginTop: 28, color: 'var(--pula-700)', fontSize: 13 }}>{error}</p>
      ) : shown.length === 0 ? (
        <p style={{ marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>No images here yet.</p>
      ) : (
        <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 18 }}>
          {shown.map((file) => {
            const used = usageFor(file.url)
            const isUsed = used.length > 0
            return (
              <div key={file.path} style={{ border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: 130, background: 'var(--bg)', overflow: 'hidden' }}>
                  <img src={file.url} alt={file.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: 8, left: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '2px 7px', borderRadius: 4, background: 'var(--itim-800)', color: 'var(--buhangin-100)' }}>{file.folder}</span>
                </div>
                <div style={{ padding: '12px 12px 14px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  <span style={{
                    alignSelf: 'flex-start', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '2px 8px', borderRadius: 4,
                    color: isUsed ? 'var(--luntian-700)' : 'var(--text-muted)',
                    background: isUsed ? 'var(--luntian-100)' : 'var(--buhangin-200)',
                  }}>{isUsed ? `Used · ${used.length}` : 'Unused'}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', wordBreak: 'break-all' }}>{file.name}</span>
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <button onClick={() => copyUrl(file)} style={smallBtn}>{copied === file.path ? 'Copied!' : 'Copy URL'}</button>
                    <button onClick={() => handleDelete(file)} style={{ ...smallBtn, color: 'var(--pula-700)', borderColor: 'var(--pula-500)' }}>Delete</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
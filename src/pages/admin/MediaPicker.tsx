import { useEffect, useState } from 'react'
import type { ChangeEvent, CSSProperties } from 'react'
import { listMedia, MEDIA_FOLDERS } from '../../data/media'
import type { MediaFile } from '../../data/media'
import { uploadImage } from '../../lib/uploadImage'

const tabBtn = (active: boolean): CSSProperties => ({
  padding: '7px 14px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 12,
  borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-ink)',
  background: active ? 'var(--itim-800)' : 'var(--bg)', color: active ? 'var(--buhangin-100)' : 'var(--text)',
  fontWeight: active ? 700 : 500,
})
const chip = (active: boolean): CSSProperties => ({
  padding: '5px 12px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'capitalize',
  borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border)',
  background: active ? 'var(--itim-800)' : 'var(--bg)', color: active ? 'var(--buhangin-100)' : 'var(--text-muted)', fontWeight: active ? 700 : 500,
})

export function MediaPicker({
  uploadFolder, onPick, onClose,
}: {
  uploadFolder: string
  onPick: (url: string, name: string) => void
  onClose: () => void
}) {
  const [tab, setTab] = useState<'library' | 'upload'>('library')
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
  }, [])

  const onUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    setError(null)
    const { url, error } = await uploadImage(file, uploadFolder)
    setUploading(false)
    if (error) { setError(error); return }
    if (url) onPick(url, file.name)
  }

  const shown = filter === 'all' ? files : files.filter((f) => f.folder === filter)

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 720, maxHeight: '85vh', display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '2.5px solid var(--border-ink)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 18px', borderBottom: '1.5px solid var(--border)' }}>
          <button type="button" onClick={() => setTab('library')} style={tabBtn(tab === 'library')}>Library</button>
          <button type="button" onClick={() => setTab('upload')} style={tabBtn(tab === 'upload')}>Upload new</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 'auto', padding: '6px 10px', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 13, border: '1.5px solid var(--border-ink)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', color: 'var(--text)' }}>✕</button>
        </div>

        <div style={{ padding: 18, overflow: 'auto' }}>
          {error && <p style={{ color: 'var(--pula-700)', fontSize: 13, margin: '0 0 12px' }}>{error}</p>}

          {tab === 'upload' ? (
            <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '48px 24px', border: '2px dashed var(--border-ink)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>{uploading ? 'Uploading…' : 'Click to choose an image or GIF'}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>Uploads to: {uploadFolder}/</span>
              <input type="file" accept="image/*" onChange={onUpload} style={{ display: 'none' }} />
            </label>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                {['all', ...MEDIA_FOLDERS].map((f) => (
                  <button key={f} type="button" onClick={() => setFilter(f)} style={chip(filter === f)}>{f}</button>
                ))}
              </div>
              {loading ? (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>Loading…</p>
              ) : shown.length === 0 ? (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>No images here yet.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
                  {shown.map((f) => (
                    <button key={f.path} type="button" onClick={() => onPick(f.url, f.name)} title={`${f.name} (${f.folder})`}
                      style={{ position: 'relative', padding: 0, cursor: 'pointer', border: '2px solid var(--border-ink)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg)', aspectRatio: '1 / 1' }}>
                      <img src={f.url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <span style={{ position: 'absolute', bottom: 4, left: 4, fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', padding: '1px 5px', borderRadius: 3, background: 'var(--itim-800)', color: 'var(--buhangin-100)' }}>{f.folder}</span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
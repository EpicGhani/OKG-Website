import { Link } from 'react-router-dom'
import { useStudioUpdates } from '../data/useStudioUpdates'
import type { StudioUpdate } from '../data/useStudioUpdates'
import { studioUpdatesArtwork } from '../data/studioUpdates'
import { shortExcerpt } from '../data/shortExcerpt'
import { ArticleCard, DevlogCard, resolveAccent, Eyebrow, Band, Mark } from '../ui'
import '../styles/sections/studio-updates.css'

function UpdateCard({ update, featured = false }: { update: StudioUpdate; featured?: boolean }) {
  return update.kind === 'article'
    ? <ArticleCard article={update.content} layout={featured ? 'featured' : 'default'} compact={!featured} excerpt={featured ? shortExcerpt(update.content.excerpt) : undefined} />
    : <DevlogCard entry={update.content} accent={resolveAccent(update.content)} compact={!featured} />
}

export function StudioUpdates() {
  const { updates, loading, error, retry } = useStudioUpdates()
  const [selected, ...remaining] = updates

  return (
    <section id="updates" className="studio-updates" aria-labelledby="studio-updates-title">
      <div className="studio-updates__trim studio-updates__trim--top" aria-hidden="true"><Band kind="kalinga" color="var(--pula-500)" height={22} /></div>
      <header className="studio-updates__header studio-updates__container">
        <div>
          <Eyebrow>From the studio</Eyebrow>
          <h2 id="studio-updates-title">NEWS - DEVLOGS - ART</h2>
        </div>
        <div className="studio-updates__header-motif" aria-hidden="true"><Band kind="okir" color="var(--pula-500)" height={24} /></div>
      </header>

      <div className="studio-updates__band">
        <div className="studio-updates__container studio-updates__layout">
          <div className="studio-updates__stories" aria-busy={loading}>
            {loading ? (
              <p className="studio-updates__message" role="status">Loading studio updates…</p>
            ) : selected ? (
              <>
                <div id="studio-update-feature" className="studio-updates__feature">
                  <UpdateCard update={selected} featured />
                </div>
                {remaining.length > 0 && (
                  <div className="studio-updates__cards" aria-label="More studio updates">
                    {remaining.map((update) => (
                      <UpdateCard key={update.id} update={update} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="studio-updates__message" role="status">
                <p>{error ? 'Studio updates could not be loaded.' : 'New stories are on their way.'}</p>
                {error && <button type="button" onClick={retry}>Try again</button>}
              </div>
            )}
          </div>

          <div className="studio-updates__art" aria-hidden="true">
            <div className="studio-updates__art-backdrop" />
            {studioUpdatesArtwork.characterImage ? (
              <img src={studioUpdatesArtwork.characterImage} srcSet={studioUpdatesArtwork.characterSrcSet} sizes="(max-width: 1100px) 325px, (max-width: 1760px) 30vw, 500px" alt="" loading="lazy" decoding="async" />
            ) : (
              <div className="studio-updates__art-placeholder">
                <Mark kind="sun" color="var(--buhangin-300)" size={220} />
                <Mark kind="bituin" color="var(--luntian-200)" size={64} />
              </div>
            )}
            <div className="studio-updates__art-band"><Band kind="gayaman" color="var(--buhangin-300)" height={20} /></div>
          </div>
        </div>
      </div>

      <footer className="studio-updates__footer studio-updates__container">
        <p>More from the studio: <Link to="/articles">News</Link> / <Link to="/devlog">Devlogs</Link> / <span title="Art gallery planned">Art</span></p>
      </footer>
    </section>
  )
}

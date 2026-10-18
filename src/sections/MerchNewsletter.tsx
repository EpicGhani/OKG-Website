import { useEffect, useRef, useState } from 'react'
import { ArtFrame, Band, Button, Container, Eyebrow, Icon, Mark } from '../ui'
import { merchCollections } from '../data/merch'
import '../styles/sections/merch-newsletter.css'

export function MerchNewsletter() {
  const railRef = useRef<HTMLDivElement>(null)
  const [navigation, setNavigation] = useState({ previous: false, next: false })

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const update = () => setNavigation({
      previous: rail.scrollLeft > 2,
      next: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 2,
    })
    const observer = new ResizeObserver(update)
    observer.observe(rail)
    rail.addEventListener('scroll', update, { passive: true })
    return () => { observer.disconnect(); rail.removeEventListener('scroll', update) }
  }, [])

  function scrollCollections(direction: number) {
    const rail = railRef.current
    if (!rail) return
    const card = rail.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(rail).columnGap) || 0
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    rail.scrollBy({ left: direction * ((card?.offsetWidth ?? rail.clientWidth) + gap), behavior: reduceMotion ? 'instant' : 'smooth' })
  }

  return (
    <section id="merch" className="merch-section" aria-labelledby="merch-title">
      <Container width="var(--community-width)" style={{ paddingInline: 'var(--community-gutter)' }}>
        <div className="merch-panel">
          <div className="merch-panel__pattern ok-tile-binakol" aria-hidden="true" />
          <div className="merch-panel__sun" aria-hidden="true"><Mark kind="sun" color="var(--buhangin-100)" size={260} /></div>

          <div className="merch-panel__content">
            <header className="merch-panel__header">
              <div>
                <Eyebrow color="var(--buhangin-300)">A little piece of our worlds</Eyebrow>
                <h2 id="merch-title">Merch</h2>
              </div>
              {(navigation.previous || navigation.next) && (
                <div className="merch-panel__navigation" aria-label="Browse merch collections">
                  <Button className="merch-panel__arrow" variant="stamp" aria-label="Previous merch collections" aria-controls="merch-collections" disabled={!navigation.previous} onClick={() => scrollCollections(-1)}><Icon name="arrow-left" size={22} /></Button>
                  <Button className="merch-panel__arrow" variant="stamp" aria-label="Next merch collections" aria-controls="merch-collections" disabled={!navigation.next} onClick={() => scrollCollections(1)}><Icon name="arrow-right" size={22} /></Button>
                </div>
              )}
            </header>

            <div id="merch-collections" className="merch-panel__collections" ref={railRef} role="list" aria-label="Upcoming merch collections" tabIndex={0}>
              {merchCollections.map((collection) => (
                <div className="merch-panel__collection" key={collection.id} role="listitem">
                  <ArtFrame art={collection} height="clamp(260px, 17vw, 330px)" />
                </div>
              ))}
            </div>

            <div className="merch-panel__divider" aria-hidden="true"><Band kind="okir" color="var(--buhangin-300)" height={22} /></div>

            <div className="newsletter" aria-labelledby="newsletter-title">
              <div className="newsletter__intro">
                <div className="newsletter__label"><span className="newsletter__icon" aria-hidden="true"><Icon name="mail" size={26} /></span><Eyebrow color="var(--buhangin-300)">Newsletter</Eyebrow></div>
                <h3 id="newsletter-title">Letters from the studio</h3>
                <p>If you want us to spam you with news, updates, invites, and other fun stuff..</p>
              </div>
              <div className="newsletter__signup">
                <label htmlFor="newsletter-email">Your email address</label>
                <div className="newsletter__fields">
                  <input id="newsletter-email" type="email" placeholder="you@example.com" disabled aria-describedby="newsletter-availability" />
                  <Button variant="stamp" size="lg" disabled>Coming soon</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="merch-panel__trim" aria-hidden="true"><Band kind="gayaman" color="var(--buhangin-300)" height={24} /></div>
        </div>
      </Container>
    </section>
  )
}

import { Band, Container, Eyebrow, Icon } from '../ui'
import { studioArtwork, studioContact, studioSupport } from '../data/studio'
import '../styles/sections/work-with-us.css'

function StudioArtwork({ kind }: { kind: keyof typeof studioArtwork }) {
  const artwork = studioArtwork[kind]
  return (
    <div className={`studio-story__art studio-story__art--${kind}`} aria-hidden="true">
      {artwork.image ? <img src={artwork.image} srcSet={artwork.srcSet} sizes="(max-width: 900px) 280px, 340px" width={960} height={701} alt="" loading="lazy" decoding="async" /> : (
        <>
          <div className="studio-story__art-pattern ok-tile-binakol" />
          <div className="studio-story__art-symbol"><Icon name={artwork.icon} size={140} strokeWidth={1} /></div>
          <div className="studio-story__art-band"><Band kind={artwork.band} color="var(--buhangin-300)" height={24} /></div>
        </>
      )}
    </div>
  )
}

export function WorkWithUs() {
  return (
    <section className="studio-story" aria-labelledby="studio-about-title">
      <div className="studio-story__pattern ok-tile-binakol" aria-hidden="true" />
      <div className="studio-story__trim" aria-hidden="true"><Band kind="gayaman" color="var(--luntian-300)" height={22} /></div>
      <Container width={1760} style={{ paddingInline: 'clamp(24px, 4vw, 64px)' }}>
        <div className="studio-story__grid">
          <div id="about-us" className="studio-story__about">
            <Eyebrow color="var(--buhangin-300)">The people behind the games</Eyebrow>
            <h2 id="studio-about-title">About us</h2>
            <div className="studio-story__meaning">
              <div className="studio-story__definition"><h3>Obra</h3><span>Creation or masterpiece</span></div>
              <p>Aspiration needs execution. There is a fine line between arrogance and ambition. That line is drawn by the people
who put their money where their mouth is. We learn, we earn, and we play the game of the industry. And while we
have the time and energy, we will continue this tiring but important journey.</p>
            </div>
            <div className="studio-story__meaning">
              <div className="studio-story__definition"><h3>Kasi</h3><span>Love and care</span></div>
              <p>It’s cheesy, we know, but it is our honest dream. We’ve been making games for others for so long, professionally and
with integrity. But now we want to make games that we think are awesome and cool. Not just because we need to,
as part of our job. But because we want to, as creatives and as lifelong gamers.</p>
            </div>
          </div>

          <StudioArtwork kind="roots" />

          <div id="work-with-us" className="studio-story__work" aria-labelledby="studio-work-title">
            <Eyebrow color="var(--luntian-200)">Pull up a seat</Eyebrow>
            <h2 id="studio-work-title">Work with us</h2>
            <p className="studio-story__lead">We make games because we want to. But we still need to pay the bills.</p>
            <p>Selfishly and with passion. Not afraid to admit it, too tired to deny it. We still have our dayjobs, we still have to make games for hire.</p>
            <p>So
if you want to help us bring our vision to life because you think you might like what we do, then we welcome you to the bonfire. We’ll
do whatever it takes to be successful on our own if we need to, but helpful hands and potential friends are welcome along the way.</p>
            <a className="studio-story__contact" href={`mailto:${studioContact.email}`}>
              <Icon name="mail" size={22} /><span>{studioContact.email}</span><Icon name="arrow-up-right" size={18} />
            </a>

            <div className="studio-story__support" aria-labelledby="studio-support-title">
              <h3 id="studio-support-title">Or support the studio</h3>
              <p>Donation options are on the way.</p>
              <ul className="studio-story__platforms">
                {studioSupport.map((platform) => (
                  <li key={platform.name}>
                    {platform.url ? (
                      <a href={platform.url} target="_blank" rel="noopener noreferrer"><Icon name={platform.icon} size={22} /><span>{platform.name}</span><Icon name="arrow-up-right" size={14} /></a>
                    ) : (
                      <button type="button" disabled><Icon name={platform.icon} size={22} /><span>{platform.name}</span><small>Coming soon</small></button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <StudioArtwork kind="compass" />
        </div>
      </Container>
    </section>
  )
}

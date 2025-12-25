function Service() {
  return(
    <section className="section service">
      <div className="sectionInner">
        <h1>Services</h1>
        <p className="muted">We offer various services for game development, these are:</p>

        <div className="serviceGrid">
          <div className="serviceCard"> 
            <div className="serviceCardInner">
              <div className="serviceFace serviceFront paperStock">
                <div className="paperInner">
                  <div className="serviceFrontContent">
                    <div className="serviceIconWrap" aria-hidden="true">
                      <span className="serviceIconFoil" style={{WebkitMaskImage: `url("/icons/dnd.svg")`, maskImage: `url("/icons/dnd.svg")`, }}/>
                    </div>
                    <p className="foilTextSmall">Design & Documentation</p>
                  </div>
                </div>
              </div>

              <div className="serviceFace serviceBack paperStock">
                <div className="paperInner">
                  <div className="serviceBackContent">
                    <p className="serviceHook">We help shape ideas into clear, buildable game concepts.</p>
                    <p className="serviceDescription">
                      This phase focuses on <strong>Game Design, Technical Planning, and Creative Direction </strong>
                      to make sure everyone is aligned before production starts.<br/><br/>
                      <strong>Best for: </strong><br/>
                      Early-stage ideas, pitching, or teams that need structure before coding begins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="serviceCard"  target="_blank" rel="noreferrer">
            <div className="serviceCardInner">
              <div className="serviceFace serviceFront paperStock">
                <div className="paperInner">
                  <div className="serviceFrontContent">
                    <div className="serviceIconWrap" aria-hidden="true">
                      <span className="serviceIconFoil" style={{WebkitMaskImage: `url("/icons/proto.svg")`, maskImage: `url("/icons/proto.svg")`, }}/>
                    </div>
                    <p className="foilTextSmall">Prototype / Vertical Slice</p>
                  </div>
                </div>
              </div>

              <div className="serviceFace serviceBack paperStock">
                <div className="paperInner">
                  <div className="serviceBackContent">
                    <p className="serviceHook">We turn concepts into something playable.</p>
                    <p className="serviceDescription">
                      This stage produces a <strong>Working Prototype or Vertical Slice </strong>
                      that proves the game's core idea, feel, and technical direction.<br/><br/>
                      <strong>Best for: </strong><br/>
                      Pitching to publishers, testing gameplay ideas, or validating a project before full production.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="serviceCard"  target="_blank" rel="noreferrer">
            <div className="serviceCardInner">
              <div className="serviceFace serviceFront paperStock">
                <div className="paperInner">
                  <div className="serviceFrontContent">
                    <div className="serviceIconWrap" aria-hidden="true">
                      <span className="serviceIconFoil" style={{WebkitMaskImage: `url("/icons/dev.svg")`, maskImage: `url("/icons/dev.svg")`, }}/>
                    </div>
                    <p className="foilTextSmall">Full Production</p>
                  </div>
                </div>
              </div>

              <div className="serviceFace serviceBack paperStock">
                <div className="paperInner">
                  <div className="serviceBackContent">
                    <p className="serviceHook">From concept to release-ready.</p>
                    <p className="serviceDescription">
                      We handle <strong>End-to-end Game Development</strong>, 
                      scaling the project from a solid foundation into a complete shippable game.<br/><br/>
                      <strong>Best for: </strong><br/>
                      Teams or creators ready to commit to full production and bring a game to market.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p><br/><br/>Wether you're starting with an idea or already have somthing playable, we can step in at any stage of development.</p>
      </div>
    </section>
  );
}

export default Service;
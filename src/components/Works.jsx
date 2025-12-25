function Works() {
  return (
    <section className="section works" id="works">
      <div className="sectionInner">
        <h1>Previous Works</h1>
        <p className="muted">A few projects and collaborations we've worked on.</p>
        <div>

          {/* Repeate cards for each project, Should be in an array map */}
          <div className="grid grid3">
            <div className="card">
              <h3>Project Title</h3>
              <p className="muted">Short teaser about the game. Platform • Genre • Year</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Works;
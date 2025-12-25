function Hero({hasWorks}) {
  return (
    <section className="section hero">
      <div className="heroBg" aria-hidden="true"/>
      <div className="sectionInner">
        <h1 className="heroTitle">Games are our Obra.<br/><span className="accent">Made in PH.</span></h1>
        <p className="muted heroText">We're a small team of passionate devs crafting unique worlds, one pixel at a time.</p>
        <div className="btnRow">
          <a className="btn heroBtn" href="#contact">Work with us</a>
          {hasWorks && <a className="btnOutline heroOutline" href="#works">See our work</a>}
        </div>
      </div>
    </section>
  );
}

export default Hero;
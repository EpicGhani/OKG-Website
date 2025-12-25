import AboutImg from "../assets/about.png";

function About() {
  return (
    <section className="section about" id="about">
      <div className="sectionInner">
        <div className="aboutLayout">
          <div className="aboutContent">
            <h1>About <span>Obra Kasi Games</span></h1>
            <p>
              Obra Kasi Games was founded by industry veterans who grew tired of the corporate grind and wanted
              to return to what truly matters, creating games we believe in.
            </p>
            <p>
              Our team brings years of experience from AA and independent projects alike.
              Led by a senior <strong>Game Designer &amp; Producer</strong> and a senior <strong>Game Developer &amp; Full-stack Engineer</strong>,
              we've gathered a group of multi-skilled talents from <strong>UI/UX Designers</strong> and <strong>Level Designers </strong>
              to <strong>2D</strong> and <strong>3D Artists</strong>, each contributing their craft to build meaningful, engaging experiences.
            </p>
            {/* <p>
              We offer <strong>full-cycle game development services</strong>, from concept and design documentation
              to final deployment. Whether you need a prototype, a vertical slice, or a complete product,
              we can handle development, design pitches, and creative direction with efficiency and passion.
            </p> */}
          </div>

          <div className="aboutImageWrap">
            <img className="aboutImage" src={AboutImg} alt="About section visual / placeholder"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
import { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import './About.css';

const skills = [
  ['Python', 'FastAPI'],
  ['JavaScript', 'React'],
  ['SQL', 'Firebase'],
  ['Git', 'n8n'],
];

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="about section fade-up" ref={ref} aria-label="About me">
      <SectionHeading>about me</SectionHeading>

      <div className="about__grid">
        <div className="about__text">
          <p>
            I am a Computer Science student at Acadia University drawn to the parts of software
            you do not usually see: the APIs, data flows, and model internals that make things
            actually work. I like understanding systems from the ground up, which is why I write
            backend services by hand instead of leaning on tools that hide the details. Right now
            I am building AI agent workflows for Wayfair&apos;s supply chain team.
          </p>

          <p className="about__skills-label">
            Here are some technologies I have been working with:
          </p>

          <ul className="about__skills">
            {skills.map(([a, b]) => (
              <li key={a + b} className="about__skill-pair">
                <span className="about__skill">
                  <span className="about__bullet" aria-hidden>&#9655;</span>
                  {a}
                </span>
                <span className="about__skill">
                  <span className="about__bullet" aria-hidden>&#9655;</span>
                  {b}
                </span>
              </li>
            ))}
          </ul>

          <p className="about__outside">
            Outside of code, I run and I am a long time FIFA player.
          </p>
        </div>

        <div className="about__photo-wrap">
          <div className="about__photo-frame">
            <img
              src="/ali-photo.jpeg"
              alt="Muhammad Ali"
              className="about__photo"
              loading="lazy"
              width="300"
              height="370"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

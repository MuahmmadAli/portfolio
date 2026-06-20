import { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import './Experience.css';

const tags = ['n8n', 'Google Gemini', 'Workflow Automation', 'Agents'];

export default function Experience() {
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
    <section id="experience" className="experience section fade-up" ref={ref} aria-label="Experience">
      <SectionHeading>where I have worked</SectionHeading>

      <div className="exp__card">
        <div className="exp__header">
          <div>
            <h3 className="exp__role">AI Agent Engineering Externship</h3>
            <p className="exp__org">
              <span className="exp__org-name">Wayfair</span>
            </p>
          </div>
          <time className="exp__dates" dateTime="2026-06/2026-08">
            June &mdash; August 2026
          </time>
        </div>

        <p className="exp__desc">
          Building supply chain intelligence agents for Wayfair&apos;s operations team using
          n8n workflows orchestrated with Google Gemini. Deliverable is a live dashboard
          demo presented at the end of the program.
        </p>

        <ul className="exp__tags" aria-label="Technologies used">
          {tags.map(t => (
            <li key={t} className="exp__tag">{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

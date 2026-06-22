import { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import './Projects.css';

const ExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
  </svg>
);

const projects = [
  {
    title: 'FocusFlow',
    desc: 'A full stack productivity app with task management and AI assisted planning, deployed and live.',
    tech: ['React 19', 'Firebase', 'Claude API', 'Tailwind CSS'],
    live: 'https://focus-flow-e9b2e.web.app',
    github: 'https://github.com/MuahmmadAli/focusflow',
  },
  {
    title: 'Task and Notes API',
    desc: 'A CRUD REST API for tasks and notes, built to learn backend fundamentals that Firebase normally abstracts away: request validation, data modeling, persistence. In progress.',
    tech: ['Python', 'FastAPI'],
    // TODO: add GitHub URL once repo is published
  },
  {
    title: 'Wayfair Supply Chain Agents',
    desc: 'AI agent workflows that pull and process supply chain data, built with n8n and Google Gemini, surfaced through a live dashboard.',
    tech: ['n8n', 'Google Gemini', 'Workflow Automation'],
  },
];

function ProjectCard({ title, desc, tech, live, github }) {
  return (
    <article className="proj__card">
      <div className="proj__top">
        <span className="proj__folder"><FolderIcon /></span>
        <div className="proj__links">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" aria-label={`${title} GitHub repository`} className="proj__link">
              <GithubIcon />
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noreferrer" aria-label={`${title} live demo`} className="proj__link">
              <ExternalLink />
            </a>
          )}
        </div>
      </div>

      <h3 className="proj__title">{title}</h3>
      <p className="proj__desc">{desc}</p>

      <ul className="proj__tech" aria-label="Technologies">
        {tech.map(t => <li key={t} className="proj__tech-item">{t}</li>)}
      </ul>
    </article>
  );
}

export default function Projects() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="projects section fade-up" ref={ref} aria-label="Projects">
      <SectionHeading>some things I have built</SectionHeading>

      <div className="proj__grid">
        {projects.map(p => <ProjectCard key={p.title} {...p} />)}
      </div>
    </section>
  );
}

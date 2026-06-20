import AsciiPortrait from './AsciiPortrait';
import useReducedMotion from '../hooks/useReducedMotion';
import './Hero.css';

export default function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero__portrait">
        <AsciiPortrait reducedMotion={reducedMotion} />
      </div>

      <div className="hero__content">
        <p className="hero__greeting">hi, <span className="hero__name">Muhammad</span> here.<span className="hero__cursor" aria-hidden>_</span></p>

        <p className="hero__sub">
          Computer Science student building backend systems and applied machine learning.
          I write code from the ground up by day and I am building AI agent workflows at Wayfair.
        </p>

        <a href="mailto:muhammadali68309@gmail.com" className="hero__cta" aria-label="Send me an email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          Say hi!
        </a>
      </div>
    </section>
  );
}

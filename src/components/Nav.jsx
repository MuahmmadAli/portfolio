import { useState, useEffect } from 'react';
import './Nav.css';

const links = [
  { label: 'About', num: '01', href: '#about' },
  { label: 'Experience', num: '02', href: '#experience' },
  { label: 'Projects', num: '03', href: '#projects' },
  { label: 'Contact', num: '04', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <a href="#hero" className="nav__logo" aria-label="Home">
        <span className="nav__logo-bracket">&lt;</span>
        <span className="nav__logo-name">MA</span>
        <span className="nav__logo-bracket">/&gt;</span>
      </a>

      <nav aria-label="Main navigation">
        <ul className="nav__links">
          {links.map(({ label, num, href }) => (
            <li key={label}>
              <a href={href} className="nav__link">
                <span className="nav__link-num">{num}.</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/Muhammad_Ali_CV.pdf"
          className="nav__resume"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}

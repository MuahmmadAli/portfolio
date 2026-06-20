import { useRef, useEffect } from 'react';
import SectionHeading from './SectionHeading';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current?.classList.add('visible'); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="contact section fade-up" ref={ref} aria-label="Contact">
      <SectionHeading>get in touch</SectionHeading>

      <div className="contact__body">
        <p className="contact__copy">
          Open to backend and AI/ML engineering internships for Fall and Winter 2026.
          Feel free to reach out.
        </p>

        <a
          href="mailto:muhammadali68309@gmail.com"
          className="contact__btn"
          aria-label="Send me an email"
        >
          Say hello
        </a>
      </div>
    </section>
  );
}

import './SectionHeading.css';

export default function SectionHeading({ children }) {
  return (
    <div className="section-heading">
      <h2 className="section-heading__text">
        <span className="section-heading__slash" aria-hidden>/</span>
        {' '}{children}
      </h2>
      <div className="section-heading__line" aria-hidden />
    </div>
  );
}

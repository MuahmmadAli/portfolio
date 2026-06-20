import './Sidebar.css';

export default function EmailSidebar() {
  return (
    <aside className="sidebar sidebar--right" aria-label="Contact email">
      <a
        href="mailto:muhammadali68309@gmail.com"
        className="sidebar__email"
      >
        muhammadali68309@gmail.com
      </a>
      <div className="sidebar__line" aria-hidden />
    </aside>
  );
}

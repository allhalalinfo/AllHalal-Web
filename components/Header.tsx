export default function Header() {
  return (
    <header className="header">
      <div className="container-wide">
        <div className="header-content-new">
          <a href="/" className="logo">ALLHALAL</a>
          <nav className="nav-new">
            <a href="/#features">Features</a>
            <span className="nav-divider"></span>
            <a href="/legal">Legal</a>
            <span className="nav-divider"></span>
            <a href="/contact">Contact</a>
          </nav>
          <a href="https://apps.apple.com/app/allhalal" className="btn-download-new">Download iOS</a>
        </div>
      </div>
    </header>
  );
}

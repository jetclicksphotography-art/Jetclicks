import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link to="/" className="footer-brand-lockup" aria-label="JetClicks home">
            <span className="footer-brand-mark">
              <img src="/images/jetclicks-logo.png" alt="" />
            </span>
            <span className="footer-brand">JetClicks</span>
          </Link>
          <p>Photography for weddings, people, events, and brands.</p>
        </div>
        <div>
          <span className="footer-label">Explore</span>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <span className="footer-label">Start here</span>
          <Link to="/booking">Make an inquiry</Link>
          <Link to="/contact">Contact the studio</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} JetClicks Photography</span>
        <span>Designed for real conversations, not complicated forms.</span>
      </div>
    </footer>
  );
}

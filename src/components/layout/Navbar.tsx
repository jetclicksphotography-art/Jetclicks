import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["/", "Home"],
    ["/portfolio", "Portfolio"],
    ["/services", "Services"],
    ["/about", "About"],
    ["/contact", "Contact"],
  ];

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="JetClicks home">
          <span className="brand-mark">
            <img src="/images/jetclicks-logo.png" alt="" />
          </span>
          <span className="brand-name">JetClicks</span>
        </Link>

        <nav className={`desktop-nav ${open ? "mobile-open" : ""}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <Link
            className="nav-cta"
            to="/booking"
            onClick={() => setOpen(false)}
          >
            Start an inquiry
          </Link>
        </nav>

        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

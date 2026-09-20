import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
export function Contact() {
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Contact</span>
        <h1>
          Have a question?
          <br />
          <i>Let's talk.</i>
        </h1>
        <p>
          For availability, packages, collaborations, or anything else, send a
          message and we'll get back to you.
        </p>
      </section>
      <section className="contact-grid">
        <div>
          <span className="contact-icon">
            <Mail />
          </span>
          <span className="eyebrow">Email</span>
          <h3>JetClicks@Gmail.Com</h3>
        </div>
        <div>
          <span className="contact-icon">
            <Phone />
          </span>
          <span className="eyebrow">Phone</span>
          <h3>+63 900 000 0000</h3>
        </div>
        <div>
          <span className="contact-icon">
            <MapPin />
          </span>
          <span className="eyebrow">Based in</span>
          <h3>Philippines · Available nationwide</h3>
        </div>
      </section>
      <section className="cta compact">
        <span className="eyebrow">Ready?</span>
        <h2>Start with an inquiry.</h2>
        <Link className="button button-solid" to="/booking">
          Start an inquiry
        </Link>
      </section>
    </main>
  );
}

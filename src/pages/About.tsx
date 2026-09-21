import { Link } from "react-router-dom";
export function About() {
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">About the studio</span>
        <h1>
          Quiet direction.
          <br />
          <i>Real moments.</i>
        </h1>
        <p>
          JetClicks is an independent photography studio built around thoughtful
          observation and photographs that feel like the people in them.
        </p>
      </section>
      <section className="about-grid">
        <img
          src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=85"
          alt="Photographer working at an event"
        />
        <div>
          <span className="eyebrow">Our approach</span>
          <h2>Present without getting in the way.</h2>
          <p>
            We believe the best photographs often happen just before or after
            the moment everyone expects. Our work balances gentle direction with
            enough space for real interactions to happen.
          </p>
          <p>
            Whether we're covering a wedding, a portrait session, or a brand
            shoot, the goal remains simple: make photographs that still mean
            something years from now.
          </p>
          <Link className="text-link" to="/booking">
            Work with us →
          </Link>
        </div>
      </section>
    </main>
  );
}

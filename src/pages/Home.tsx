import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { featured } from "../data/portfolio";
import { PortfolioCard } from "../components/portfolio/PortfolioCard";
import { useState } from "react";
import { PortfolioModal } from "../components/portfolio/PortfolioModal";

export function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Photography studio · Philippines</span>
          <h1>
            Images that hold onto <i>the feeling.</i>
          </h1>
          <p>
            Honest, considered photography for weddings, people, events, and
            brands. We focus on the moments you'll want to remember—not just the
            ones that look good on a screen.
          </p>
          <div className="hero-actions">
            <Button to="/portfolio">Explore the work</Button>
            <Button to="/booking" variant="outline">
              Start an inquiry <ArrowUpRight size={17} />
            </Button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90"
            alt="Wedding couple in an editorial photograph"
          />
          <span className="image-note">01 / FEATURED STORY</span>
        </div>
      </section>
      <section className="intro section">
        <div className="section-kicker">The studio</div>
        <div className="intro-copy">
          <h2>We photograph people, not poses.</h2>
          <p>
            From a quiet portrait session to a packed wedding reception, our
            approach stays the same: observe carefully, direct when needed, and
            leave room for the moments that happen naturally.
          </p>
          <Link className="text-link" to="/about">
            More about the studio →
          </Link>
        </div>
      </section>
      <section className="section featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Selected work</span>
            <h2>A few stories we've photographed.</h2>
          </div>
          <Link className="text-link" to="/portfolio">
            View all work →
          </Link>
        </div>
        <div className="featured-grid">
          {featured.map((item, i) => (
            <PortfolioCard
              key={item.id}
              item={item}
              large={i === 0}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>
      </section>
      <section className="services-strip">
        <div>
          <span className="eyebrow">What we photograph</span>
          <h2>Built around your occasion.</h2>
        </div>
        <div className="service-links">
          {[
            "Wedding",
            "Debut",
            "Portraits",
            "Events",
            "Corporate",
            "Product",
          ].map((x) => (
            <Link key={x} to="/portfolio">
              {x}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </section>
      <section className="process section">
        <span className="eyebrow">Simple from here</span>
        <h2>From first message to final gallery.</h2>
        <div className="process-grid">
          {[
            [
              "01",
              "Tell us what you're planning",
              "Share your date, location, and what matters to you.",
            ],
            [
              "02",
              "We shape the coverage",
              "We'll discuss the right approach, timing, and package.",
            ],
            [
              "03",
              "We photograph it",
              "You enjoy the day. We stay attentive to the details.",
            ],
            [
              "04",
              "Your gallery arrives",
              "Your images are edited and delivered as a considered collection.",
            ],
          ].map(([n, t, d]) => (
            <div className="process-item" key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="cta">
        <span className="eyebrow">Have something in mind?</span>
        <h2>Let's talk about what you're planning.</h2>
        <Button to="/booking">Start an inquiry</Button>
      </section>
      {selected !== null && (
        <PortfolioModal
          items={featured}
          index={selected}
          onClose={() => setSelected(null)}
          onChange={setSelected}
        />
      )}
    </main>
  );
}

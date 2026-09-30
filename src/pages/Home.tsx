import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { categories, featured, films } from "../data/portfolio";
import { PortfolioCard } from "../components/portfolio/PortfolioCard";
import { useEffect, useState } from "react";
import { PortfolioModal } from "../components/portfolio/PortfolioModal";

/** Hero slides cross-fade through the studio's strongest frames. */
const heroSlides = [
  { image: "/images/portfolio/wedding/wedding-10.webp", label: "Weddings", alt: "Bride and groom facing each other at a gilded church altar surrounded by white flowers" },
  { image: "/images/portfolio/prenup/prenup-01.webp", label: "Prenup", alt: "Couple holding hands beneath a tree with limestone cliffs behind them" },
  { image: "/images/portfolio/proposal/proposal-06.webp", label: "Proposals", alt: "Couple embracing on an empty sandbar as the sun sets over the water" },
  { image: "/images/portfolio/wedding/wedding-05.webp", label: "Weddings", alt: "Bride with a long veil and groom in cream embracing on a palm-lined beach" },
  { image: "/images/portfolio/wedding/wedding-15.webp", label: "Weddings", alt: "Bride framed in a flower-covered doorway at the top of the aisle, seen past the guests" },
];

const HERO_INTERVAL = 120_000; // two minutes

function HeroImage() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      HERO_INTERVAL,
    );
    return () => window.clearInterval(timer);
  }, []);
  return (
    <div className="hero-image">
      {heroSlides.map((slide, i) => (
        <img
          key={slide.image}
          className={`hero-slide ${i === index ? "is-active" : ""}`}
          src={i === index ? slide.image : undefined}
          alt={i === 0 ? slide.alt : ""}
          aria-hidden={i === index ? undefined : true}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={i === 0 ? "high" : "low"}
        />
      ))}
      <span className="image-note">
        {String(index + 1).padStart(2, "0")} / {heroSlides[index].label.toUpperCase()}
      </span>
    </div>
  );
}

export function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<number | null>(null);
  const homeFilms = films.slice(0, 4);
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
        <HeroImage />
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
      {homeFilms.length > 0 && (
        <section className="section films-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Films · Same-day edit</span>
              <h2>The day, as it moved.</h2>
            </div>
            <Link className="text-link" to="/portfolio?c=Films">
              View all films →
            </Link>
          </div>
          <div className="film-grid">
            {homeFilms.map((item, i) => (
              <PortfolioCard
                key={item.id}
                item={item}
                large={i === 0}
                onClick={() => setSelectedFilm(i)}
              />
            ))}
          </div>
        </section>
      )}
      <section className="services-strip">
        <div>
          <span className="eyebrow">What we photograph</span>
          <h2>Built around your occasion.</h2>
        </div>
        <div className="service-links">
          {categories.map((x) => (
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
      {selectedFilm !== null && (
        <PortfolioModal
          items={homeFilms}
          index={selectedFilm}
          onClose={() => setSelectedFilm(null)}
          onChange={setSelectedFilm}
        />
      )}
    </main>
  );
}

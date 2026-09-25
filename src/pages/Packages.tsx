import { ArrowUpRight, Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { packageCategories, packages, peso } from "../data/packages";
import type { PackageCategory, PackageItem } from "../types";

function PackageCard({ item }: { item: PackageItem }) {
  return (
    <article className={`package-card ${item.featured ? "is-featured" : ""}`}>
      <header className="package-head">
        <div>
          <span className="package-category">{item.category}</span>
          <h3>{item.name}</h3>
        </div>
        <span className={`package-kind ${item.kind === "Photo only" ? "is-photo" : ""}`}>
          {item.kind}
        </span>
      </header>

      <p className="package-price">
        {peso(item.price)}
        {item.duration && <span>{item.duration}</span>}
      </p>

      {item.note && <p className="package-note">{item.note}</p>}

      <div className="package-block">
        <span className="package-label">Team</span>
        <ul>
          {item.crew.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="package-block">
        <span className="package-label">You receive</span>
        <ul className="package-checks">
          {item.deliverables.map((line) => (
            <li key={line}>
              <Check size={14} aria-hidden="true" />
              {line}
            </li>
          ))}
        </ul>
      </div>

      {item.addOn && <p className="package-addon">{item.addOn}</p>}

      <Link className="package-cta" to={`/booking?package=${item.id}`}>
        Inquire about {item.name}
        <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}

export function Packages() {
  const [active, setActive] = useState<PackageCategory | "All">("All");
  const shown = useMemo(
    () => (active === "All" ? packages : packages.filter((p) => p.category === active)),
    [active],
  );

  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Packages &amp; offerings</span>
        <h1>
          Coverage, priced
          <br />
          <i>plainly.</i>
        </h1>
        <p>
          Every package below includes the full team, the session length, and the
          finished gallery. Nothing is hidden until the quote — if something needs
          adjusting for your date, we will shape it with you.
        </p>
      </section>

      <section className="packages-section">
        <div className="filter-row">
          <button
            className={active === "All" ? "filter active" : "filter"}
            onClick={() => setActive("All")}
          >
            All packages
          </button>
          {packageCategories.map((c) => (
            <button
              key={c}
              className={active === c ? "filter active" : "filter"}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="package-grid">
          {shown.map((item) => (
            <PackageCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="packages-notes">
        <div>
          <span className="eyebrow">Good to know</span>
          <h2>What every package includes.</h2>
        </div>
        <ul>
          <li>
            <strong>Aerial coverage</strong>
            <span>Drone photos or shots are part of every tier, weather and venue permitting.</span>
          </li>
          <li>
            <strong>Enhanced photos</strong>
            <span>Every delivered image is colour-graded and retouched, not a raw dump.</span>
          </li>
          <li>
            <strong>Same-day edit</strong>
            <span>Available on Maple and Cedar for ₱15,000 — a short film screened at your reception.</span>
          </li>
          <li>
            <strong>Half-day weddings</strong>
            <span>Ivy and Beech are built for half coverage, so you are not paying for hours you do not need.</span>
          </li>
        </ul>
      </section>

      <section className="cta">
        <span className="eyebrow">Found the one?</span>
        <h2>Let's check your date.</h2>
        <p className="cta-sub">
          Tell us the package you have in mind and we will confirm availability.
        </p>
        <Link className="button button-solid" to="/booking">
          Start an inquiry
        </Link>
      </section>
    </main>
  );
}

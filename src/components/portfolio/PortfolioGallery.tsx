import { useEffect, useMemo, useState } from "react";
import type { PortfolioCategory, PortfolioItem } from "../../types";
import { categories, films, portfolio } from "../../data/portfolio";
import { api } from "../../lib/api";
import { PortfolioCard } from "./PortfolioCard";
import { PortfolioModal } from "./PortfolioModal";

export function PortfolioGallery({
  initialCategory,
}: {
  initialCategory?: PortfolioCategory;
}) {
  const [active, setActive] = useState<PortfolioCategory | "All">(
    initialCategory ?? "All",
  );
  const [selected, setSelected] = useState<number | null>(null);
  // Studio-uploaded photos, newest first, in front of the curated set.
  const [dynamic, setDynamic] = useState<PortfolioItem[]>([]);
  useEffect(() => {
    let alive = true;
    api<{ portfolio: PortfolioItem[] }>("/api/portfolio")
      .then((res) => {
        if (alive) setDynamic(res.portfolio || []);
      })
      .catch(() => {
        /* gallery still has its curated set */
      });
    return () => {
      alive = false;
    };
  }, []);

  const items = useMemo(() => {
    const allPhotos = [...dynamic, ...portfolio];
    if (active === "All") return [...dynamic, ...films, ...portfolio];
    if (active === "Films") return films;
    return allPhotos.filter((x) => x.category === active);
  }, [active, dynamic]);

  // Only show a category filter once it has at least one photo (curated or
  // uploaded), so empty categories stay hidden until the studio fills them.
  const shownFilters = useMemo(() => {
    const present = categories.filter(
      (c) => portfolio.some((p) => p.category === c) || dynamic.some((d) => d.category === c),
    );
    return films.length ? [...present, "Films" as const] : present;
  }, [dynamic]);

  const pick = (next: PortfolioCategory | "All") => {
    setSelected(null);
    setActive(next);
  };

  return (
    <section className="gallery-section">
      <div className="filter-row">
        <button
          className={active === "All" ? "filter active" : "filter"}
          onClick={() => pick("All")}
        >
          All work
        </button>
        {shownFilters.map((c) => (
          <button
            key={c}
            className={active === c ? "filter active" : "filter"}
            onClick={() => pick(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className={`gallery-grid ${active === "Films" ? "films-grid" : ""}`}>
        {items.map((item, i) => (
          <PortfolioCard
            key={item.id}
            item={item}
            large={i === 0}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>
      {selected !== null && (
        <PortfolioModal
          items={items}
          index={selected}
          onClose={() => setSelected(null)}
          onChange={setSelected}
        />
      )}
    </section>
  );
}

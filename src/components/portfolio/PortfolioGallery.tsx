import { useMemo, useState } from "react";
import type { PortfolioCategory } from "../../types";
import { categories, portfolio } from "../../data/portfolio";
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
  const items = useMemo(
    () =>
      active === "All"
        ? portfolio
        : portfolio.filter((x) => x.category === active),
    [active],
  );
  return (
    <section className="gallery-section">
      <div className="filter-row">
        <button
          className={active === "All" ? "filter active" : "filter"}
          onClick={() => setActive("All")}
        >
          All work
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={active === c ? "filter active" : "filter"}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
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

import { useSearchParams } from "react-router-dom";
import { PortfolioGallery } from "../components/portfolio/PortfolioGallery";
import { galleryFilters } from "../data/portfolio";
import type { PortfolioCategory } from "../types";

export function Portfolio() {
  const [params] = useSearchParams();
  const requested = params.get("c");
  const initialCategory = galleryFilters.find((c) => c === requested) as
    | PortfolioCategory
    | undefined;
  return (
    <main>
      <section className="page-hero">
        <span className="eyebrow">Selected work</span>
        <h1>
          Stories, people,
          <br />
          <i>in between.</i>
        </h1>
        <p>
          Browse the studio's work by photography type. Select an image to open
          the full gallery view.
        </p>
      </section>
      <PortfolioGallery key={requested ?? "all"} initialCategory={initialCategory} />
    </main>
  );
}

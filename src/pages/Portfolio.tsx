import { PortfolioGallery } from "../components/portfolio/PortfolioGallery";
export function Portfolio() {
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
      <PortfolioGallery />
    </main>
  );
}

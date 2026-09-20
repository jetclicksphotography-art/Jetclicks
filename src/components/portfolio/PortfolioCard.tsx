import type { PortfolioItem } from "../../types";

export function PortfolioCard({
  item,
  onClick,
  large = false,
}: {
  item: PortfolioItem;
  onClick: () => void;
  large?: boolean;
}) {
  return (
    <button
      className={`portfolio-card ${large ? "portfolio-card-large" : ""}`}
      onClick={onClick}
    >
      <img src={item.image} alt={item.alt} loading="lazy" />
      <span className="portfolio-overlay">
        <small>{item.category}</small>
        <strong>{item.title}</strong>
        <em>{item.location}</em>
      </span>
    </button>
  );
}

import { Play } from "lucide-react";
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
  const isFilm = Boolean(item.videoId);
  return (
    <button
      className={`portfolio-card ${large ? "portfolio-card-large" : ""}`}
      onClick={onClick}
      aria-label={`${isFilm ? "Play" : "Open"} ${item.title}`}
    >
      <img src={item.thumb} alt={item.alt} loading="lazy" />
      {isFilm && (
        <span className="portfolio-play" aria-hidden="true">
          <Play size={17} fill="currentColor" />
        </span>
      )}
      <span className="portfolio-overlay">
        <small>{item.category}</small>
        <strong>{item.title}</strong>
        {item.location && <em>{item.location}</em>}
        {isFilm && item.duration && <em>{item.duration}</em>}
      </span>
    </button>
  );
}

import { Play } from "lucide-react";
import type { PortfolioItem } from "../../types";

function mobileThumb(src: string) {
  return src.endsWith("-thumb.webp") ? src.replace(/\.webp$/, "-400.webp") : null;
}

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
  const smallThumb = mobileThumb(item.thumb);

  return (
    <button
      className={`portfolio-card ${large ? "portfolio-card-large" : ""}`}
      onClick={onClick}
      aria-label={`${isFilm ? "Play" : "Open"} ${item.title}`}
    >
      <img
        src={item.thumb}
        srcSet={smallThumb ? `${smallThumb} 400w, ${item.thumb} 800w` : undefined}
        sizes="(max-width: 620px) 100vw, (max-width: 850px) 50vw, 33vw"
        alt={item.alt}
        loading="lazy"
        decoding="async"
      />
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

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import type { PortfolioItem } from "../../types";

interface Props {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}

/** Player URL for a film. The iframe only exists while the lightbox is open. */
function embedSrc(item: PortfolioItem) {
  return item.videoHost === "vimeo"
    ? `https://player.vimeo.com/video/${item.videoId}?autoplay=1&title=0&byline=0&portrait=0`
    : `https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

export function PortfolioModal({ items, index, onClose, onChange }: Props) {
  const item = items[index];
  const isFilm = Boolean(item.videoId);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // The player takes the arrow keys for scrubbing, so only photos step.
      if (isFilm) return;
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft")
        onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [index, isFilm, items.length, onChange, onClose]);
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <button className="modal-close" onClick={onClose} aria-label="Close">
        <X />
      </button>
      <button
        className="gallery-arrow left"
        onClick={() => onChange((index - 1 + items.length) % items.length)}
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>
      <div className="modal-content">
        {isFilm ? (
          <div className="modal-video">
            <iframe
              key={item.id}
              src={embedSrc(item)}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <img src={item.image} alt={item.alt} />
        )}
        <div className="modal-caption">
          <span>{item.category}</span>
          <h2>{item.title}</h2>
          <p>
            {item.location ? `${item.location} · ` : ""}
            {isFilm && item.duration ? `${item.duration} · ` : ""}
            {index + 1} / {items.length}
          </p>
        </div>
      </div>
      <button
        className="gallery-arrow right"
        onClick={() => onChange((index + 1) % items.length)}
        aria-label="Next"
      >
        <ChevronRight />
      </button>
    </div>
  );
}

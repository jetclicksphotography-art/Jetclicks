import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import type { PortfolioItem } from "../../types";

interface Props {
  items: PortfolioItem[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}

export function PortfolioModal({ items, index, onClose, onChange }: Props) {
  const item = items[index];
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
  }, [index, items.length, onChange, onClose]);
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
        <img src={item.image} alt={item.alt} />
        <div className="modal-caption">
          <span>{item.category}</span>
          <h2>{item.title}</h2>
          <p>
            {item.location} · {index + 1} / {items.length}
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

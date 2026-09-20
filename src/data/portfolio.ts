import type { PortfolioCategory, PortfolioItem } from "../types";

export const categories: PortfolioCategory[] = [
  "Wedding",
  "Debut",
  "Portraits",
  "Events",
  "Corporate",
  "Product",
];

export const portfolio: PortfolioItem[] = [
  { id: "w1", category: "Wedding", title: "Quiet vows", location: "Palawan", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85", alt: "Wedding couple outdoors" },
  { id: "w2", category: "Wedding", title: "After the ceremony", location: "Manila", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=85", alt: "Wedding couple embracing" },
  { id: "w3", category: "Wedding", title: "The celebration", location: "Cebu", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85", alt: "Wedding celebration" },
  { id: "w4", category: "Wedding", title: "Golden hour", location: "Batangas", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=85", alt: "Wedding portrait at sunset" },
  { id: "d1", category: "Debut", title: "Eighteen", location: "Manila", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=85", alt: "Birthday celebration" },
  { id: "d2", category: "Debut", title: "The entrance", location: "Quezon City", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=85", alt: "Event entrance" },
  { id: "p1", category: "Portraits", title: "Natural light", location: "Makati", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85", alt: "Portrait in natural light" },
  { id: "p2", category: "Portraits", title: "Studio study", location: "Manila", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=85", alt: "Studio portrait" },
  { id: "e1", category: "Events", title: "On the floor", location: "Manila", image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1400&q=85", alt: "Conference event" },
  { id: "c1", category: "Corporate", title: "People at work", location: "Makati", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85", alt: "Corporate team" },
  { id: "pr1", category: "Product", title: "Object study", location: "Studio", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85", alt: "Product photography" },
];

export const featured = portfolio.slice(0, 4);
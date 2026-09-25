import type { PackageCategory, PackageItem } from "../types";

export const services = [
  { name: "Wedding", description: "Full-day storytelling, ceremony coverage, portraits, and a curated gallery.", details: "From intimate ceremonies to full celebrations." },
  { name: "Portraits", description: "Relaxed portrait sessions built around natural expressions and clean direction.", details: "Individual, couple, family, and editorial sessions." },
  { name: "Debut & Events", description: "Thoughtful event coverage focused on people, details, and the moments between.", details: "Debuts, birthdays, conferences, and private events." },
  { name: "Corporate & Product", description: "Polished visual content for teams, brands, products, and campaigns.", details: "Studio and on-location production." },
];

export const packageCategories: PackageCategory[] = [
  "Pre-wedding",
  "Wedding",
  "Proposal",
  "Birthdays",
];

/**
 * Transcribed from the studio's JET-CLICKS-PHOTOGRAPHY package sheet.
 * Prices are in Philippine pesos. Update here and the page follows.
 */
export const packages: PackageItem[] = [
  // --- Pre-wedding -------------------------------------------------------
  {
    id: "olive",
    category: "Pre-wedding",
    name: "Olive",
    price: 30999,
    kind: "Photo and video",
    duration: "8-hour session",
    crew: ["2 JCP photography team", "2 JCP videography team", "1 JCP assistant"],
    deliverables: ["200-300 enhanced photos", "2-4 minute video", "Aerial shots"],
  },
  {
    id: "pine",
    category: "Pre-wedding",
    name: "Pine",
    price: 19999,
    kind: "Photo and video",
    duration: "8-hour session",
    crew: ["1 JCP photographer", "1 JCP videographer", "1 JCP assistant"],
    deliverables: ["100-200 enhanced photos", "2-3 minute video", "Aerial shots"],
  },
  {
    id: "ash",
    category: "Pre-wedding",
    name: "Ash",
    price: 7999,
    kind: "Photo only",
    duration: "8-hour session",
    crew: ["1 JCP photographer", "1 JCP assistant"],
    deliverables: ["100-200 enhanced photos", "Aerial photos"],
  },

  // --- Wedding -----------------------------------------------------------
  {
    id: "maple",
    category: "Wedding",
    name: "Maple",
    price: 48999,
    kind: "Photo and video",
    duration: "12-14 hours coverage",
    crew: ["3 JCP photography team", "3 JCP videography team", "1 JCP assistant"],
    deliverables: ["1000+ enhanced photos", "4-6 minute video highlights", "Aerial shots"],
    addOn: "+₱15,000 for a same-day edit",
    featured: true,
  },
  {
    id: "cedar",
    category: "Wedding",
    name: "Cedar",
    price: 33999,
    kind: "Photo and video",
    duration: "12-14 hours coverage",
    crew: ["2 JCP photography team", "2 JCP videography team", "1 JCP assistant"],
    deliverables: ["800-1000 enhanced photos", "4-6 minute video highlights", "Aerial shots"],
    addOn: "+₱15,000 for a same-day edit",
  },
  {
    id: "ivy",
    category: "Wedding",
    name: "Ivy",
    price: 18999,
    kind: "Photo and video",
    duration: "6-8 hours coverage",
    crew: ["1 JCP photography team", "1 JCP videography team"],
    deliverables: ["200-400 enhanced photos", "2-3 minute video highlights", "Aerial shots"],
    note: "Exclusive for half wedding coverage",
  },
  {
    id: "heather",
    category: "Wedding",
    name: "Heather",
    price: 13999,
    kind: "Photo only",
    duration: "12-14 hours coverage",
    crew: ["2 JCP photography team"],
    deliverables: ["800-1000 enhanced photos", "Aerial photos"],
  },
  {
    id: "beech",
    category: "Wedding",
    name: "Beech",
    price: 7999,
    kind: "Photo only",
    duration: "6-8 hours coverage",
    crew: ["1 JCP photographer"],
    deliverables: ["200-400 enhanced photos", "Aerial photos"],
    note: "Exclusive for half wedding coverage",
  },

  // --- Proposal ----------------------------------------------------------
  {
    id: "apple",
    category: "Proposal",
    name: "Apple",
    price: 18999,
    kind: "Photo and video",
    duration: "3-hour session",
    crew: ["1 JCP photographer", "1 JCP videographer", "1 JCP assistant"],
    deliverables: ["100-200 enhanced photos", "2-4 minute video", "Aerial shots"],
  },
  {
    id: "cactus",
    category: "Proposal",
    name: "Cactus",
    price: 7499,
    kind: "Photo only",
    crew: ["1 JCP photographer", "1 JCP assistant"],
    deliverables: ["100-200 enhanced photos", "Aerial photos"],
  },

  // --- Birthdays ---------------------------------------------------------
  {
    id: "birthday-party-av",
    category: "Birthdays",
    name: "Birthday party coverage",
    price: 18999,
    kind: "Photo and video",
    duration: "4-5 hours coverage",
    crew: ["1 JCP photographer", "1 JCP videographer", "1 JCP assistant"],
    deliverables: ["200-400 enhanced photos", "2-3 minute video", "Aerial shots"],
  },
  {
    id: "birthday-party-photo",
    category: "Birthdays",
    name: "Birthday party coverage",
    price: 6499,
    kind: "Photo only",
    duration: "4-5 hours coverage",
    crew: ["1 JCP photographer"],
    deliverables: ["200-400 enhanced photos", "Aerial photos"],
  },
  {
    id: "birthday-shoot-av",
    category: "Birthdays",
    name: "Birthday photoshoot",
    price: 17999,
    kind: "Photo and video",
    duration: "6 hours coverage",
    crew: ["1 JCP photographer", "1 JCP videographer"],
    deliverables: ["100-300 enhanced photos", "2-4 minute video", "Aerial shots"],
  },
  {
    id: "birthday-shoot-photo",
    category: "Birthdays",
    name: "Birthday photoshoot",
    price: 5499,
    kind: "Photo only",
    duration: "2-3 hours coverage",
    crew: ["1 JCP photographer"],
    deliverables: ["100-200 enhanced photos", "Aerial photos"],
  },
];

/** ₱30,999 - no decimals, since every package is priced in whole pesos. */
export const peso = (amount: number) => `₱${amount.toLocaleString("en-PH")}`;

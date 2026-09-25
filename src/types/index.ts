export type PortfolioCategory =
  | "Wedding"
  | "Prenup"
  | "Proposal"
  | "Birthdays"
  | "Portrait"
  | "Island tour"
  | "Family"
  | "Drones"
  | "Corporate"
  | "Ceremony"
  | "Films";

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  /** Optional venue/city caption. Left unset until the studio confirms each one. */
  location?: string;
  /** Full-size file used in the lightbox. */
  image: string;
  /** Smaller file used for the gallery cards. */
  thumb: string;
  alt: string;
  /** YouTube or Vimeo id. When set, the item is a film and plays in the lightbox. */
  videoId?: string;
  /** Which player to embed. Defaults to YouTube when omitted. */
  videoHost?: "youtube" | "vimeo";
  /** Run time shown on the card, e.g. "4:12". */
  duration?: string;
}

export type PackageCategory = "Pre-wedding" | "Wedding" | "Proposal" | "Birthdays";

export interface PackageItem {
  id: string;
  category: PackageCategory;
  /** Tree or plant name the studio uses for the tier. */
  name: string;
  /** Whole pesos. Formatted for display by `peso()`. */
  price: number;
  kind: "Photo and video" | "Photo only";
  /** Session or coverage length. Omitted where the sheet does not state one. */
  duration?: string;
  crew: string[];
  deliverables: string[];
  /** Paid extra, e.g. same-day edit. */
  addOn?: string;
  /** Condition attached to the tier. */
  note?: string;
  /** Highlights the flagship tier in the grid. */
  featured?: boolean;
}

export interface InquiryData {
  service: string;
  date: string;
  location: string;
  coverage: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  agreementAccepted: boolean;
  agreementId?: string;
}

export interface ChatMessage {
  id: string;
  at: string;
  from: "client" | "bot" | "admin";
  text: string;
}

export interface Conversation {
  conversationId: string;
  createdAt: string;
  updatedAt: string;
  status: "open" | "needs-human";
  name: string;
  email: string;
  source: string;
  unread: boolean;
  messages: ChatMessage[];
  messageCount?: number;
  clientMessageCount?: number;
  lastMessageAt?: string;
  lastMessageFrom?: string;
  lastMessagePreview?: string;
  lastClientMessageAt?: string;
}

export interface BookingRecord {
  bookingId: string;
  createdAt: string;
  updatedAt: string;
  status: "new" | "confirmed" | "ongoing" | "finished" | "cancelled";
  flagged: boolean;
  service: string;
  date: string;
  location: string;
  coverage: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  agreementAccepted: boolean;
  agreementId: string;
  notes: string;
  /** Archived bookings drop out of the active queue and live in the archive. */
  archived: boolean;
}

export interface AdminLog {
  timestamp: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  metadataJson: string;
}

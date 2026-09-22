export type PortfolioCategory =
  | "Wedding"
  | "Debut"
  | "Portraits"
  | "Events"
  | "Corporate"
  | "Product";

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  location: string;
  image: string;
  alt: string;
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
}

export interface AdminLog {
  timestamp: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  metadataJson: string;
}

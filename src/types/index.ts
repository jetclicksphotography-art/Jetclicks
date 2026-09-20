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
}
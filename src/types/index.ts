export interface ServiceItem {
  id: string;
  category: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
}

export interface TestimonialItem {
  name: string;
  treatment: string;
  location: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface DoctorInfo {
  name: string;
  shortName: string;
  credentials: string[];
  philosophy: string;
  bioShort: string;
  bioLong: string;
}

export interface ContactInfo {
  phones: string[];
  primaryPhone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  address: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  fullAddress: string;
  mapEmbedUrl: string;
  coordinates: { lat: number; lng: number };
}

export interface HoursInfo {
  weekdays: { label: string; open: string; close: string };
  sunday: { label: string; open: string; close: string };
  openHour: number;
  openMinute: number;
  weekdayCloseHour: number;
  weekdayCloseMinute: number;
  sundayCloseHour: number;
  sundayCloseMinute: number;
}

export interface BrandInfo {
  name: string;
  fullName: string;
  tagline: string;
  subTagline: string;
  city: string;
  area: string;
  established: string;
  yearsInHealthcare: number;
  rating: number;
  reviewCount: number;
  reviewPlatform: string;
}

export interface SEOInfo {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string;
  ogImage: string;
}

export interface ClinicData {
  brand: BrandInfo;
  doctor: DoctorInfo;
  contact: ContactInfo;
  hours: HoursInfo;
  stats: StatItem[];
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  faq: FAQItem[];
  social: {
    instagram: string;
    facebook: string;
    justdial: string;
  };
  seo: SEOInfo;
}

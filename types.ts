
import { LucideIcon } from 'lucide-react';

export enum ViewState {
  HOME = 'HOME',
  NEWS = 'NEWS',
  BEACHES = 'BEACHES',
  SIGHTSEEING = 'SIGHTSEEING',
  ACTIVITIES = 'ACTIVITIES',
  DINING = 'DINING',
  SHOPPING = 'SHOPPING',
  HEALTH = 'HEALTH',
  SERVICES = 'SERVICES',
  EVENTS = 'EVENTS',
  FORUM = 'FORUM',
  CITIZEN_SERVICES = 'CITIZEN_SERVICES',
  MAP = 'MAP',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN',
  AI_CHAT = 'AI_CHAT'
}

export interface NavItem {
  id: ViewState;
  label: string;
  icon: LucideIcon;
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export interface Ad {
  id: string;
  clientName: string;
  imageUrl: string;
  linkUrl: string;
  position: 'page-top' | 'page-bottom' | 'menu-top' | 'menu-bottom';
  startDate: string; // ISO Date YYYY-MM-DD
  endDate: string;   // ISO Date YYYY-MM-DD
  isActive: boolean;
  category?: 'General' | 'Commerce' | 'Tourism'; // For filtering by admin role
}

export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  lat?: number;
  lng?: number;
  startDateTime?: string; // ISO 8601 format: YYYYMMDDTHHmmss
  endDateTime?: string;   // ISO 8601 format: YYYYMMDDTHHmmss
}

export interface Promotion {
  title: string;
  description: string;
  discountCode?: string;
  expiresAt?: string;
  beaconUuid?: string; // Link to physical hardware (UUID/Major/Minor)
}

export interface CensusItem {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  isOpen: boolean;
  images: string[];
  website?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  hours: {
    weekdays: string;
    weekend: string;
  };
  lat?: number;
  lng?: number;
  promotion?: Promotion; // New field for Beacon/Geofencing
}

export interface CensusCategory {
  id: string;
  title: string;
  items: CensusItem[];
}

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN_GENERAL' | 'ADMIN_CULTURE' | 'ADMIN_SPORTS' | 'ADMIN_COMMERCE';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: string;
}

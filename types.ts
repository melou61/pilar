
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
  AI_CHAT = 'AI_CHAT',
  PROFILE = 'PROFILE',
  SEARCH = 'SEARCH',
  POSTCARD = 'POSTCARD',
  LENS = 'LENS',
  SIDEBAR = 'SIDEBAR'
}

export type NewsCategory = 'GENERAL' | 'DIFUNTOS' | 'TRABAJO' | 'CASAS' | 'OTROS';

export interface NavItem {
  id: ViewState;
  label: string;
  icon: LucideIcon;
  isMain?: boolean;
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
  view: ViewState; // Página donde aparece
  filterContext?: string; // Filtro específico (ej: 'beaches' en MAP o 'CENTRO' en SHOPPING)
  startDate: string; 
  endDate: string;   
  isActive: boolean;
  category?: 'General' | 'Commerce' | 'Tourism';
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
  isFestival?: boolean; 
  startDateTime?: string; 
  endDateTime?: string;   
}

export interface Promotion {
  title: string;
  description: string;
  discountCode?: string;
  expiresAt?: string;
  beaconUuid?: string;
  beaconHardwareId?: string;
  proximityRange: 'IMMEDIATE' | 'NEAR' | 'FAR';
  frequencyPerDay: number; 
  maxDistanceMeters: number; 
  activeTimeMinutes: number; 
  interactionsCount?: number;
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
  zone: 'CENTRO' | 'LA_TORRE' | 'MIL_PALMERAS' | 'CAMPOVERDE' | 'EL_MOJON';
  priceRange?: '€' | '€€' | '€€€' | '€€€€';
  featuredItems?: string[];
  images: string[];
  videoUrl?: string;
  website?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  hours: {
    weekdays: string;
    weekend: string;
  };
  lat?: number;
  lng?: number;
  promotion?: Promotion;
}

export interface NewsItem {
  id: string;
  source: string;
  sourceType: 'official' | 'social' | 'press';
  icon: string;
  date: string;
  title: string;
  content: string;
  image?: string;
  url: string;
  category: NewsCategory;
  isSyncing?: boolean;
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
  active?: boolean;
  lastSeen?: string;
}

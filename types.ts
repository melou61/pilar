
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
  // Metrics
  impressions?: number;
  clicks?: number;
  budget?: number; // Total budget for ROI calc
  costPerClick?: number;
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
  rating?: number; // Added for rating system
  reviewCount?: number; // Added for rating system   
}

export interface LocalizedContent {
  title: string;
  description: string;
}

export interface Promotion {
  // Legacy fields (optional for backward compatibility)
  title?: string;
  description?: string;
  
  // Beacon Configuration
  isActive: boolean;
  hardwareId?: string; // MAC address or Serial
  uuid?: string; // iBeacon UUID
  major?: number;
  minor?: number;
  
  // Signal Settings
  range: 'IMMEDIATE' | 'NEAR' | 'FAR'; // Defines TX Power
  transmissionPower?: number; // dBm
  broadcastInterval?: number; // ms
  maxDistanceMeters: number; // Slider value 1-100m
  
  // Frequency Capping Rules
  frequencyRules: {
    maxPerHour: number;
    maxPerDay: number;
    maxPerWeek: number;
  };

  // Content
  imageUrl?: string; // Custom image for the notification
  discountCode?: string;
  expiresAt?: string;
  multilingualContent: Record<string, LocalizedContent>; // Key: 'es', 'en', etc.
  
  // Stats
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

export interface ForumPost {
  id: string;
  user: string;
  avatar: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  time: string;
  badge?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Added for moderation
}

export interface CensusCategory {
  id: string;
  title: string;
  items: CensusItem[];
}

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN_GENERAL' | 'ADMIN_CULTURE' | 'ADMIN_SPORTS' | 'ADMIN_COMMERCE' | 'EDITOR_CONTENT' | 'EDITOR_NEWS' | 'EDITOR_FORUM';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: string;
  active?: boolean;
  lastSeen?: string;
  password?: string;
}

export interface Medal {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or Icon Name
  dateEarned: string;
  color: string;
}


import React, { useState, useEffect } from 'react';
import { ViewState, NavItem, Ad, Event, Language, AdminRole, CensusItem, AdminUser } from './types';
import { 
  Home, Newspaper, Waves, Eye, Activity, UtensilsCrossed, 
  ShoppingBag, Calendar, MapIcon, Landmark, Sparkles, User, ShieldCheck, MessageSquare, Heart, Scan
} from './components/Icons';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { ShoppingView } from './components/ShoppingView';
import { SearchView } from './components/SearchView';
import { BeachesView } from './components/BeachesView';
import { SightseeingView } from './components/SightseeingView';
import { DiningView } from './components/DiningView'; 
import { ActivitiesView } from './components/ActivitiesView';
import { CitizenServicesView } from './components/CitizenServicesView';
import { MapView } from './components/MapView';
import { NewsView } from './components/NewsView';
import { EventsView } from './components/EventsView';
import { AIChatView } from './components/AIChatView';
import { HomeView } from './components/HomeView';
import { AdminDashboard } from './components/AdminDashboard';
import { ShareModal } from './components/ShareModal';
import { PostcardCreator } from './components/PostcardCreator';
import { ForumView } from './components/ForumView';
import { ProfileView } from './components/ProfileView';
import { HealthView } from './components/HealthView';
import { BeaconModal } from './components/BeaconModal';
import { PHLensView } from './components/PHLensView';
import { MobileNav } from './components/MobileNav';
import { LegalModal } from './components/LegalModal';
import { SecurityGuard } from './components/Security'; // Import Security
import { translations, languages } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS, TERMS_OF_SERVICE, PRIVACY_POLICY } from './data';

// --- CONSTANTES DE ANUNCIOS (MODAS Y FERRETERIA) ---
const IMG_MODAS = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80';
const IMG_FERRETERIA = 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80';

// --- ANUNCIOS INICIALES PARA TODAS LAS VISTAS ---
const INITIAL_ADS: Ad[] = [
  // --- HOME (Premium Spots) ---
  { id: 'ad-home-1', clientName: 'Modas Lucía', position: 'page-top', imageUrl: IMG_MODAS, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.HOME, isPremium: true, language: 'es' },
  { id: 'ad-home-1-en', clientName: 'Lucía Fashion', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.HOME, isPremium: true, language: 'en' },
  { id: 'ad-home-2', clientName: 'Ferretería El Pilar', position: 'page-bottom', imageUrl: IMG_FERRETERIA, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.HOME, isPremium: true },
  
  // --- SIDEBAR (Premium Spots) ---
  { id: 'ad-menu-1', clientName: 'Mesón El Puerto', position: 'menu-top', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SIDEBAR, isPremium: true },
  { id: 'ad-menu-2', clientName: 'Turismo Pilar', position: 'menu-bottom', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SIDEBAR, isPremium: true },

  // --- MAPA (Contextuales) ---
  { id: 'ad-map-gen', clientName: 'Pizzería La Plaza', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad50?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.MAP, filterContext: 'all' },
  { id: 'ad-map-rest', clientName: 'Restaurante Los Arcos', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7ed9d8607c?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.MAP, filterContext: 'Hostelería y restauración' },
  { id: 'ad-map-health', clientName: 'Clínica Dental Sonrisas', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.MAP, filterContext: 'Salud y belleza' },

  // --- NOTICIAS (Contextuales) ---
  { id: 'ad-news-gen', clientName: 'Ferretería El Pilar', position: 'page-top', imageUrl: IMG_FERRETERIA, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.NEWS, filterContext: 'ALL' },
  { id: 'ad-news-job', clientName: 'Academia English', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.NEWS, filterContext: 'TRABAJO' },
  { id: 'ad-news-home', clientName: 'Inmobiliaria Pilar', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.NEWS, filterContext: 'CASAS' },
  { id: 'ad-news-funeraria', clientName: 'Floristería Azahar', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.NEWS, filterContext: 'DIFUNTOS' },

  // --- TIENDAS (Contextuales por Zona) ---
  { id: 'ad-shop-gen', clientName: 'Modas Lucía', position: 'page-top', imageUrl: IMG_MODAS, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SHOPPING, filterContext: 'all' },
  { id: 'ad-shop-torre', clientName: 'Supermercado Saura', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SHOPPING, filterContext: 'LA_TORRE' },
  { id: 'ad-shop-mil', clientName: 'Chiringuito Pirata', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SHOPPING, filterContext: 'MIL_PALMERAS' },

  // --- GASTRONOMIA (Contextuales por Zona) ---
  { id: 'ad-din-gen', clientName: 'Vinos de la Tierra', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.DINING, filterContext: 'all' },
  { id: 'ad-din-torre', clientName: 'Marisquería La Lonja', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.DINING, filterContext: 'LA_TORRE' },
  { id: 'ad-din-centro', clientName: 'Restaurante Los Arcos', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.DINING, filterContext: 'CENTRO' },

  // --- EVENTOS (Contextuales por Categoría) ---
  { id: 'ad-evt-gen', clientName: 'Ferretería El Pilar', position: 'page-top', imageUrl: IMG_FERRETERIA, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.EVENTS, filterContext: 'all' },
  { id: 'ad-evt-trad', clientName: 'Artesanía Local', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1455612693675-112974d4880b?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.EVENTS, filterContext: 'TRADICIÓN' },
  { id: 'ad-evt-rel', clientName: 'Floristería Azahar', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.EVENTS, filterContext: 'RELIGIOSO' },

  // --- FORO (Contextuales) ---
  { id: 'ad-for-gen', clientName: 'Ferretería El Pilar', position: 'page-top', imageUrl: IMG_FERRETERIA, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.FORUM, filterContext: 'all' },
  { id: 'ad-for-pets', clientName: 'Clínica Vet. San Francisco', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.FORUM, filterContext: 'Mascotas' },
  { id: 'ad-for-market', clientName: 'Segunda Mano Express', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.FORUM, filterContext: 'Mercadillo' },

  // --- OTROS VIEWS (Generales) ---
  { id: 'ad-bch-1', clientName: 'Modas Lucía', position: 'page-top', imageUrl: IMG_MODAS, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.BEACHES },
  { id: 'ad-bch-2', clientName: 'Chiringuito Pirata', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.BEACHES },
  
  { id: 'ad-hlt-1', clientName: 'Farmacia Torre', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e55c06?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.HEALTH },
  { id: 'ad-hlt-2', clientName: 'Fisioterapia Pilar', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.HEALTH },

  { id: 'ad-cit-1', clientName: 'Gestoría Martinez', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.CITIZEN_SERVICES },
  { id: 'ad-cit-2', clientName: 'Abogados Garcia', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.CITIZEN_SERVICES },

  { id: 'ad-see-1', clientName: 'Museo Etnológico', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1518998053574-53ee81be84ac?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SIGHTSEEING },
  { id: 'ad-see-2', clientName: 'Souvenirs Pilar', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SIGHTSEEING },

  { id: 'ad-act-1', clientName: 'Lo Romero Golf', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.ACTIVITIES },
  { id: 'ad-act-2', clientName: 'Club Náutico', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.ACTIVITIES },

  { id: 'ad-sch-1', clientName: 'Modas Lucía', position: 'page-top', imageUrl: IMG_MODAS, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SEARCH },
  { id: 'ad-sch-2', clientName: 'Ferretería El Pilar', position: 'page-bottom', imageUrl: IMG_FERRETERIA, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.SEARCH },

  { id: 'ad-ai-1', clientName: 'Ferretería El Pilar', position: 'page-top', imageUrl: IMG_FERRETERIA, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.AI_CHAT },
  { id: 'ad-ai-2', clientName: 'Modas Lucía', position: 'page-bottom', imageUrl: IMG_MODAS, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.AI_CHAT },

  { id: 'ad-lens-1', clientName: 'Modas Lucía', position: 'page-top', imageUrl: IMG_MODAS, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.LENS },
  { id: 'ad-lens-2', clientName: 'Ferretería El Pilar', position: 'page-bottom', imageUrl: IMG_FERRETERIA, linkUrl: '#', startDate: '2026-01-01', endDate: '2026-12-31', isActive: true, view: ViewState.LENS },
];

const MOCK_ADMINS: AdminUser[] = [
  { id: 'adm-1', name: 'Alcaldía Master', email: 'admin@pilarhoradada.com', role: 'SUPER_ADMIN', createdAt: '2023-01-01', active: true, lastSeen: 'Ahora' },
  { id: 'adm-2', name: 'Gestor Comercio', email: 'comercio@pilardelahoradada.org', role: 'ADMIN_COMMERCE', createdAt: '2024-02-15', active: true, lastSeen: 'Hace 2h' },
  { id: 'adm-3', name: 'Cultura PH', email: 'cultura@pilardelahoradada.org', role: 'ADMIN_CULTURE', createdAt: '2024-03-10', active: true, lastSeen: 'Ayer' }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<AdminRole | 'USER'>('USER');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState(''); // New State for Phone
  const [favorites, setFavorites] = useState<string[]>([]);
  const [myEvents, setMyEvents] = useState<string[]>([]);
  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [admins, setAdmins] = useState<AdminUser[]>(MOCK_ADMINS);
  
  const [businesses, setBusinesses] = useState<CensusItem[]>(() => {
    return [
      ...COMMERCIAL_CENSUS.flatMap(c => c.items),
      ...DINING_CENSUS.flatMap(c => c.items)
    ];
  });
  
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ title: '', text: '', url: '' });
  const [activeBeaconShop, setActiveBeaconShop] = useState<CensusItem | null>(null);
  const [beaconsEnabled, setBeaconsEnabled] = useState(true);
  
  // Legal Modal State
  const [legalState, setLegalState] = useState<{isOpen: boolean, type: 'privacy' | 'terms' | null}>({isOpen: false, type: null});

  const t = translations[currentLang.code] || translations.en;

  const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=crop&w=2000&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length), 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (beaconsEnabled && currentView === ViewState.HOME) {
      const timer = setTimeout(() => {
        const shopWithPromo = businesses.find(b => b.promotion && b.promotion.title);
        if (shopWithPromo) setActiveBeaconShop(shopWithPromo);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [currentView, beaconsEnabled, businesses]);

  useEffect(() => {
    const handleLegal = (e: any) => setLegalState({isOpen: true, type: e.detail});
    window.addEventListener('open-legal', handleLegal);
    return () => window.removeEventListener('open-legal', handleLegal);
  }, []);

  const handleNavigate = (view: ViewState, id?: string) => {
    setSidebarOpen(false);
    // Verificación de acceso al panel de administración
    if (view === ViewState.ADMIN && !['SUPER_ADMIN', 'ADMIN_GENERAL', 'ADMIN_CULTURE', 'ADMIN_SPORTS', 'ADMIN_COMMERCE'].includes(userRole as any)) {
      setLoginOpen(true);
      return;
    }
    if (view === ViewState.PROFILE && !isLoggedIn) { setLoginOpen(true); return; }
    setCurrentView(view);
    if (view === ViewState.EVENTS) setSelectedEventId(id || null);
    if (view === ViewState.SHOPPING) setSelectedBusinessId(id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData?: { name: string, email: string, role?: AdminRole, phone?: string }) => {
    if (userData) { 
      setUserRole(userData.role || 'USER'); 
      setUserName(userData.name);
      setUserPhone(userData.phone || ''); 
    } else { 
      // Caso Super Admin desde LoginModal (master credentials)
      setUserRole('SUPER_ADMIN'); 
      setUserName('Super Administrador'); 
      setUserPhone('');
    }
    setIsLoggedIn(true);
    setLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUserRole('USER'); setUserName(''); setUserPhone('');
    setCurrentView(ViewState.HOME); setSidebarOpen(false);
  };

  const handleUpdatePhone = (phone: string) => {
    setUserPhone(phone);
    // Update local storage simulation
    const stored = localStorage.getItem('pilar_user_db');
    if (stored) {
      const user = JSON.parse(stored);
      user.phone = phone;
      localStorage.setItem('pilar_user_db', JSON.stringify(user));
    }
  };

  const toggleFavorite = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  const toggleMyEvent = (id: string) => setMyEvents(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

  const handleShare = (data: any) => {
    setShareData({ title: data.title || 'Pilar de la Horadada', text: data.description || '...', url: window.location.href });
    setIsShareOpen(true);
  };

  // Construcción dinámica del menú: Admin solo aparece si tienes rol de administrador
  const isAdmin = ['SUPER_ADMIN', 'ADMIN_GENERAL', 'ADMIN_CULTURE', 'ADMIN_SPORTS', 'ADMIN_COMMERCE'].includes(userRole as any);
  
  const menuItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: Home },
    { id: ViewState.LENS, label: 'PH Lens', icon: Scan },
    { id: ViewState.AI_CHAT, label: t.menu.ai, icon: Sparkles },
    { id: ViewState.MAP, label: t.menu.map, icon: MapIcon },
    { id: ViewState.CITIZEN_SERVICES, label: t.menu.services, icon: Landmark },
    { id: ViewState.NEWS, label: t.menu.news, icon: Newspaper },
    { id: ViewState.BEACHES, label: t.menu.beaches, icon: Waves },
    { id: ViewState.SIGHTSEEING, label: t.menu.sightseeing, icon: Eye },
    { id: ViewState.ACTIVITIES, label: t.menu.activities, icon: Activity },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.HEALTH, label: t.menu.health, icon: Heart },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
    { id: ViewState.FORUM, label: t.menu.forum, icon: MessageSquare },
  ];

  if (isAdmin) {
    menuItems.push({ id: ViewState.ADMIN, label: t.menu.admin, icon: ShieldCheck });
  }

  const isImmersiveView = [
    ViewState.HOME,
    ViewState.LENS, 
    ViewState.CITIZEN_SERVICES, 
    ViewState.AI_CHAT,
    ViewState.NEWS,
    ViewState.BEACHES,
    ViewState.SIGHTSEEING,
    ViewState.ACTIVITIES,
    ViewState.DINING,
    ViewState.SHOPPING,
    ViewState.EVENTS,
    ViewState.FORUM,
    ViewState.HEALTH,
    ViewState.SEARCH
  ].includes(currentView);

  const headerProps = {
    onMenuClick: () => setSidebarOpen(true),
    onLogoClick: () => handleNavigate(ViewState.HOME),
    onSearchClick: () => handleNavigate(ViewState.SEARCH),
    currentLang,
    onLanguageChange: setCurrentLang,
    languages,
    currentView,
    onNavigate: handleNavigate,
    t
  };

  const handleOpenAdminLogin = () => {
    setLoginOpen(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME: return <HomeView t={t} events={events} onNavigate={handleNavigate} heroImages={heroImages} currentHeroIndex={currentHeroIndex} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.NEWS: return <NewsView t={t} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.BEACHES: return <BeachesView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.SIGHTSEEING: return <SightseeingView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.ACTIVITIES: return <ActivitiesView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.DINING: return <DiningView t={t} businesses={businesses} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.SHOPPING: return <ShoppingView t={t} businesses={businesses} highlightedBusinessId={selectedBusinessId} favorites={favorites} toggleFavorite={toggleFavorite} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.HEALTH: return <HealthView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.CITIZEN_SERVICES: return <CitizenServicesView t={t} ads={ads} onBack={() => handleNavigate(ViewState.HOME)} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} isLoggedIn={isLoggedIn} userPhone={userPhone} onOpenLogin={() => setLoginOpen(true)} onUpdatePhone={handleUpdatePhone} />;
      case ViewState.EVENTS: return <EventsView t={t} events={events} onShare={handleShare} onAddToCalendar={(e) => alert(t.common.addToCalendar)} initialEventId={selectedEventId} myEvents={myEvents} toggleMyEvent={toggleMyEvent} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.FORUM: return <ForumView t={t} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.MAP: return <MapView t={t} onNavigate={handleNavigate} businesses={businesses} ads={ads} currentLang={currentLang.code} />;
      case ViewState.AI_CHAT: return <AIChatView t={t} onBack={() => handleNavigate(ViewState.HOME)} langCode={currentLang.code} langLabel={currentLang.label} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.ADMIN: return (
        <AdminDashboard 
          ads={ads} setAds={setAds} 
          events={events} setEvents={setEvents} 
          businesses={businesses} setBusinesses={setBusinesses} 
          admins={admins} setAdmins={setAdmins}
          onLogout={handleLogout} 
          currentUserRole={userRole as AdminRole} 
        />
      );
      case ViewState.PROFILE: return <ProfileView userName={userName} onLogout={handleLogout} onNavigate={handleNavigate} favorites={favorites} myEvents={myEvents} t={t} />;
      case ViewState.SEARCH: return <SearchView t={t} events={events} businesses={businesses} onNavigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      case ViewState.POSTCARD: return <PostcardCreator t={t} onBack={() => handleNavigate(ViewState.HOME)} />;
      case ViewState.LENS: return <PHLensView t={t} onBack={() => handleNavigate(ViewState.HOME)} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
      default: return <HomeView t={t} events={events} onNavigate={handleNavigate} heroImages={heroImages} currentHeroIndex={currentHeroIndex} ads={ads} headerProps={headerProps} onOpenAdminLogin={handleOpenAdminLogin} />;
    }
  };

  const getLegalContent = () => {
    const lang = currentLang.code;
    const policyMap = legalState.type === 'privacy' ? PRIVACY_POLICY : TERMS_OF_SERVICE;
    return policyMap[lang] || policyMap['en'] || policyMap['es'];
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20 select-none">
      <SecurityGuard /> {/* Security Guard Mounted Globally */}
      
      {activeBeaconShop && <BeaconModal isOpen={!!activeBeaconShop} onClose={() => setActiveBeaconShop(null)} shop={activeBeaconShop} t={t} />}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => { setLoginOpen(false); }} 
        onLogin={handleLogin} 
        onLoginSuperAdmin={() => handleLogin()} 
        t={t}
      />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} data={shareData} t={t.share} />
      
      <LegalModal 
        isOpen={legalState.isOpen} 
        onClose={() => setLegalState({isOpen: false, type: null})}
        title={legalState.type === 'privacy' ? (t.footer?.privacy || 'Privacidad') : (t.footer?.terms || 'Términos')}
        content={getLegalContent()}
      />

      {!isImmersiveView && <Header {...headerProps} />}

      <Sidebar 
        isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} currentView={currentView} 
        onNavigate={handleNavigate} ads={ads} title={t.menu.title || 'PH App'} sponsoredText={t.common.sponsored} 
        isLoggedIn={isLoggedIn} onLogout={handleLogout} onLogin={() => { setLoginOpen(true); }} t={t} 
        currentLang={currentLang.code}
      />

      <main className={isImmersiveView ? "" : "pt-24 min-h-screen"}>
        {renderContent()}
      </main>

      {!isImmersiveView && <Footer t={t} onOpenAdminLogin={handleOpenAdminLogin} />}
      <MobileNav currentView={currentView} onNavigate={handleNavigate} t={t} />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import { ViewState, NavItem, Ad, Event, Language, AdminRole, CensusItem, Promotion } from './types';
import { 
  Home, Newspaper, Waves, Eye, Activity, UtensilsCrossed, 
  ShoppingBag, Calendar, MessageSquare, MapPin, Sun, Info, ArrowRight, ArrowLeft,
  Search, Phone, Tag, Share2, Heart, Briefcase, MapIcon, Landmark, CalendarPlus, Zap
} from './components/Icons';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { AdSpot } from './components/AdSpot';
import { AdminDashboard } from './components/AdminDashboard';
import { ShareModal } from './components/ShareModal';
import { ShoppingView } from './components/ShoppingView';
import { SearchModal } from './components/SearchModal';
import { EventDetailView } from './components/EventDetailView';
import { BeachesView } from './components/BeachesView';
import { SightseeingView } from './components/SightseeingView';
import { DiningView } from './components/DiningView'; 
import { ActivitiesView } from './components/ActivitiesView'; 
import { CitizenServicesView } from './components/CitizenServicesView';
import { MapView } from './components/MapView';
import { NewsView } from './components/NewsView';
import { BeaconModal } from './components/BeaconModal'; // NEW
import { translations } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS } from './data';

// Utility for Distance Calculation (Global)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distance in km
};

// Supported Languages - Extended list
const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
];

// Initial Ads Data
const INITIAL_ADS: Ad[] = [
  {
    id: '1',
    clientName: 'Restaurante El Puerto',
    position: 'page-top',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    linkUrl: '#',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    isActive: true
  },
  {
    id: '2',
    clientName: 'Inmobiliaria Sun',
    position: 'page-top',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    linkUrl: '#',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    isActive: true
  },
  {
    id: '3',
    clientName: 'Taller García',
    position: 'page-bottom',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
    linkUrl: '#',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    isActive: true
  },
  {
     id: '4',
     clientName: 'Farmacia Centro',
     position: 'menu-top',
     imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80',
     linkUrl: '#',
     startDate: '2024-01-01',
     endDate: '2025-12-31',
     isActive: true
  }
];

// Helper to extract initial promotions from static data
const getInitialPromotions = () => {
    const promos: Record<string, Promotion> = {};
    COMMERCIAL_CENSUS.forEach(cat => {
        cat.items.forEach(item => { if(item.promotion) promos[item.id] = item.promotion; });
    });
    DINING_CENSUS.forEach(cat => {
        cat.items.forEach(item => { if(item.promotion) promos[item.id] = item.promotion; });
    });
    return promos;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]); 
  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [shareData, setShareData] = useState<{title: string, text: string, url: string} | null>(null);
  
  // Dynamic Promotions State (Beacon Management)
  const [beaconPromotions, setBeaconPromotions] = useState<Record<string, Promotion>>(getInitialPromotions());

  // Admin State
  const [adminRole, setAdminRole] = useState<AdminRole>('ADMIN_GENERAL');

  // Navigation State
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Hero Slider State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Beacon / Geolocation State
  const [beaconShop, setBeaconShop] = useState<CensusItem | null>(null);
  const [visitedBeacons, setVisitedBeacons] = useState<Set<string>>(new Set());
  const BEACON_PROXIMITY_KM = 0.1; // 100 meters trigger radius (Virtual Beacon)

  const t = translations[currentLang.code as keyof typeof translations] || translations.es;

  // Hero Images - High Quality specific images (Unsplash)
  const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2073&q=80', // Beach
    'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=1200&q=80', // Festival/Confetti
    'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80', // Camping/Nature/Sun
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // --- GLOBAL BEACON / GEOLOCATION WATCHER ---
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            
            // Iterate over all known businesses
            const allShops = [
                ...COMMERCIAL_CENSUS.flatMap(c => c.items),
                ...DINING_CENSUS.flatMap(c => c.items)
            ];

            for (const shop of allShops) {
                // Check if shop has an active promotion in our state
                const promo = beaconPromotions[shop.id];
                
                if (promo && shop.lat && shop.lng) {
                     // If already visited/shown this session, skip
                    if (visitedBeacons.has(shop.id)) continue;

                    const dist = calculateDistance(latitude, longitude, shop.lat, shop.lng);
                    
                    if (dist < BEACON_PROXIMITY_KM) {
                        // Trigger Beacon!
                        // Merge the dynamic promotion into the shop object
                        setBeaconShop({ ...shop, promotion: promo });
                        setVisitedBeacons(prev => new Set(prev).add(shop.id));
                        break; 
                    }
                }
            }
        },
        (err) => {
            console.log("Geolocation background error:", err);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [visitedBeacons, beaconPromotions]); // Re-run if promotions change


  // Derived Menu Items
  const menuItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: Home },
    { id: ViewState.MAP, label: 'Mapa Interactivo', icon: MapIcon }, // NEW
    { id: ViewState.CITIZEN_SERVICES, label: 'Ayuntamiento 24h', icon: Landmark }, // NEW
    { id: ViewState.NEWS, label: t.menu.news, icon: Newspaper },
    { id: ViewState.BEACHES, label: t.menu.beaches, icon: Waves },
    { id: ViewState.SIGHTSEEING, label: t.menu.sightseeing, icon: Eye },
    { id: ViewState.ACTIVITIES, label: t.menu.activities, icon: Activity },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.HEALTH, label: t.menu.health, icon: Heart },
    { id: ViewState.SERVICES, label: t.menu.services, icon: Briefcase },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
    { id: ViewState.FORUM, label: t.menu.forum, icon: MessageSquare },
  ];

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setSidebarOpen(false);
    // Reset specific selections when navigating main menu
    setSelectedEventId(null);
    setSelectedBusinessId(null);
    window.scrollTo(0, 0);
  };

  const handleSearchNavigate = (view: ViewState, id?: string) => {
    setCurrentView(view);
    if (view === ViewState.SHOPPING || view === ViewState.HEALTH || view === ViewState.SERVICES) {
      setSelectedBusinessId(id);
    } else {
      setSelectedBusinessId(null);
    }
    
    // Handle Event Deep Link
    if (view === ViewState.EVENTS && id) {
      setSelectedEventId(id);
    } else {
      setSelectedEventId(null);
    }

    window.scrollTo(0, 0);
  };

  const handleShare = (event: Event) => {
    setShareData({
      title: event.title,
      text: event.description,
      url: window.location.href // In a real app, this would include query params like ?event=id
    });
  };

  const handleAddToCalendar = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation();
    const startTime = event.startDateTime ? event.startDateTime.replace(/[-:]/g, '') : '';
    const endTime = event.endDateTime ? event.endDateTime.replace(/[-:]/g, '') : '';
    const details = `${event.description}\n\nUbicación: ${event.location}`;
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(event.location)}`;
    window.open(url, '_blank');
  };

  const handleLogin = () => {
    setAdminRole('ADMIN_GENERAL'); // Default manual login
    setLoginOpen(false);
    setCurrentView(ViewState.ADMIN);
    window.scrollTo(0, 0);
  };

  const handleSuperAdminLogin = () => {
    setAdminRole('SUPER_ADMIN');
    setLoginOpen(false);
    setCurrentView(ViewState.ADMIN);
    window.scrollTo(0, 0);
  };

  // View Components
  const renderHome = () => (
    <div className="space-y-6 pb-20">
      {/* Dynamic Hero Slider */}
      <div className="relative h-[65vh] max-h-[500px] w-full overflow-hidden">
        {heroImages.map((img, index) => (
            <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}
            >
                <img 
                    src={img} 
                    alt="Pilar Hero" 
                    className="w-full h-full object-cover"
                />
            </div>
        ))}
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 flex flex-col justify-end p-6 text-white pb-24">
          
          {/* 300 Days of Sun Badge - Prominent */}
          <div className="absolute top-6 right-4 bg-yellow-400/90 backdrop-blur-sm text-yellow-900 px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg animate-pulse">
            <Sun className="fill-yellow-600 animate-[spin_10s_linear_infinite]" size={18} />
            {t.hero.sun}
          </div>

          <div className="flex items-center gap-2 text-sm font-medium mb-1 opacity-90">
            <MapPin size={16} />
            {t.hero.location}
          </div>
          <h2 className="text-4xl font-extrabold mb-2 leading-tight drop-shadow-md">Pilar de la<br/>Horadada</h2>
          <p className="text-gray-100 text-sm max-w-xs drop-shadow-sm font-light leading-relaxed">{t.hero.subtitle}</p>
        </div>
      </div>

      {/* Visual Navigation Grid (Overlapping Hero) */}
      <div className="px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-4 gap-2">
             {/* Map Card (NEW) */}
             <button 
                onClick={() => handleNavigate(ViewState.MAP)}
                className="bg-white rounded-xl shadow-lg shadow-green-900/10 p-2 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95"
            >
                <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <MapIcon size={18} />
                </div>
                <span className="text-[9px] font-bold text-gray-700 leading-tight uppercase tracking-wide">
                    Mapa
                </span>
            </button>

            {/* Beaches Card */}
            <button 
                onClick={() => handleNavigate(ViewState.BEACHES)}
                className="bg-white rounded-xl shadow-lg shadow-blue-900/10 p-2 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95"
            >
                <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Waves size={18} />
                </div>
                <span className="text-[9px] font-bold text-gray-700 leading-tight uppercase tracking-wide">
                    {t.hero.beaches}
                </span>
            </button>

            {/* Events Card */}
            <button 
                onClick={() => handleNavigate(ViewState.EVENTS)}
                className="bg-white rounded-xl shadow-lg shadow-purple-900/10 p-2 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95 border-b-4 border-purple-500"
            >
                <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                    <Calendar size={18} />
                </div>
                <span className="text-[9px] font-bold text-gray-700 leading-tight uppercase tracking-wide">
                    {t.hero.events}
                </span>
            </button>

            {/* Shopping Card */}
            <button 
                onClick={() => handleNavigate(ViewState.SHOPPING)}
                className="bg-white rounded-xl shadow-lg shadow-orange-900/10 p-2 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95"
            >
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <ShoppingBag size={18} />
                </div>
                <span className="text-[9px] font-bold text-gray-700 leading-tight uppercase tracking-wide">
                    {t.hero.commerce}
                </span>
            </button>
        </div>
      </div>

      {/* Citizen Services Button Banner (NEW) */}
      <div className="px-4 pt-2">
         <button 
           onClick={() => handleNavigate(ViewState.CITIZEN_SERVICES)}
           className="w-full bg-blue-600 rounded-xl p-4 flex items-center justify-between text-white shadow-lg shadow-blue-200"
         >
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                    <Landmark size={24} />
                </div>
                <div className="text-left">
                    <div className="font-bold text-sm">Ayuntamiento 24h</div>
                    <div className="text-xs text-blue-100">Cita previa, incidencias y más</div>
                </div>
            </div>
            <ArrowRight size={20} />
         </button>
      </div>

      <div className="px-4 pt-2">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} />
      </div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
             <Calendar className="text-blue-600" size={20} />
             {t.sections.events.title}
          </h3>
          <button 
            onClick={() => handleNavigate(ViewState.EVENTS)}
            className="text-blue-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full"
          >
            {t.common.discover} <ArrowRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {events.slice(0, 2).map(event => (
            <div 
              key={event.id} 
              onClick={() => {
                setCurrentView(ViewState.EVENTS);
                setSelectedEventId(event.id);
                window.scrollTo(0,0);
              }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-1/3 relative">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                   <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{event.category}</span>
                   <h4 className="font-bold text-gray-900 leading-tight mt-1 line-clamp-2">{event.title}</h4>
                   <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                     <Calendar size={12} /> {event.date}
                   </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4">
         <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} />
      </div>
    </div>
  );

  const renderEvents = () => {
    // If an event is selected, show the Detail View
    if (selectedEventId) {
      const event = events.find(e => e.id === selectedEventId);
      if (event) {
        return (
          <EventDetailView 
            event={event} 
            onBack={() => setSelectedEventId(null)}
            onShare={handleShare}
            onAddToCalendar={handleAddToCalendar}
            t={t.common}
          />
        );
      }
    }

    // Otherwise, show the list
    return (
      <div className="px-4 py-6 space-y-6 pb-20">
         <h2 className="text-2xl font-bold text-gray-800">{t.sections.events.title}</h2>
         <p className="text-gray-500 text-sm -mt-4">{t.sections.events.desc}</p>
  
         <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div 
                   className="h-48 relative cursor-pointer"
                   onClick={() => {
                     setSelectedEventId(event.id);
                     window.scrollTo(0,0);
                   }}
                 >
                   <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                      {event.category}
                   </div>
                   <div className="absolute top-4 right-4 flex gap-2">
                        <button 
                            onClick={(e) => {
                                handleAddToCalendar(e, event);
                            }}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-blue-700 hover:text-blue-900 hover:bg-white transition-colors shadow-sm"
                            title="Añadir al Calendario"
                        >
                            <CalendarPlus size={18} />
                        </button>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handleShare(event);
                            }}
                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:text-blue-600 hover:bg-white transition-colors shadow-sm"
                            title="Compartir"
                        >
                            <Share2 size={18} />
                        </button>
                   </div>
                 </div>
                 <div className="p-5">
                   <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                   </div>
                   <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-500" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-red-500" />
                        {event.location}
                      </div>
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                     {event.description}
                   </p>
                   <button 
                     onClick={() => {
                        setSelectedEventId(event.id);
                        window.scrollTo(0,0);
                     }}
                     className="w-full py-2.5 bg-gray-50 text-blue-600 font-semibold rounded-lg text-sm hover:bg-blue-50 transition-colors border border-blue-100"
                   >
                     {t.common.readMore}
                   </button>
                 </div>
              </div>
            ))}
         </div>
      </div>
    );
  };

  const renderPlaceholder = (title: string, desc: string) => (
    <div className="px-4 py-6 space-y-4 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2">
         <Info size={32} />
       </div>
       <h2 className="text-xl font-bold text-gray-800">{title}</h2>
       <p className="text-gray-500 text-sm max-w-xs">{desc}</p>
       <button 
         onClick={() => handleNavigate(ViewState.HOME)}
         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium"
       >
         {t.common.back}
       </button>
    </div>
  );

  // Main Render Logic
  if (currentView === ViewState.ADMIN) {
    return (
      <AdminDashboard 
        ads={ads} 
        setAds={setAds} 
        events={events}
        setEvents={setEvents}
        onLogout={() => setCurrentView(ViewState.HOME)}
        currentUserRole={adminRole}
        beaconPromotions={beaconPromotions} // Pass beacons to admin
        setBeaconPromotions={setBeaconPromotions}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header 
        onMenuClick={() => setSidebarOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        onSearchClick={() => setSearchOpen(true)}
        onLogoClick={() => handleNavigate(ViewState.HOME)}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        languages={languages}
      />
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        menuItems={menuItems}
        currentView={currentView}
        onNavigate={handleNavigate}
        ads={ads}
        title={t.menu.title}
        sponsoredText={t.common.sponsored}
      />

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setLoginOpen(false)} 
        onLogin={handleLogin}
        onLoginSuperAdmin={handleSuperAdminLogin}
        t={t.auth}
      />

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setSearchOpen(false)} 
        onNavigate={handleSearchNavigate}
        events={events}
        t={t}
      />

      {/* BEACON MODAL */}
      {beaconShop && (
        <BeaconModal 
          isOpen={true} 
          onClose={() => setBeaconShop(null)} 
          shop={beaconShop} 
        />
      )}

      <main className="flex-1 w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl bg-white shadow-xl shadow-gray-100 my-0 sm:my-6 min-h-screen sm:min-h-0 sm:rounded-2xl overflow-hidden relative">
         {currentView === ViewState.HOME && renderHome()}
         {currentView === ViewState.EVENTS && renderEvents()}
         {currentView === ViewState.BEACHES && <BeachesView t={t} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} />}
         
         {/* Map View (New) */}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleSearchNavigate} />}

         {/* Citizen Services (New) */}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         
         {/* News Aggregator (New) */}
         {currentView === ViewState.NEWS && <NewsView t={t} />}

         {/* Dining - Restaurants */}
         {currentView === ViewState.DINING && <DiningView t={t} />}

         {/* Shopping - Retail, Food, Home */}
         {currentView === ViewState.SHOPPING && (
            <ShoppingView 
              t={t} 
              highlightedBusinessId={selectedBusinessId} 
              categoryFilter={['moda', 'hogar', 'alimentacion']}
              customTitle={t.sections.shopping.title}
              customDesc={t.sections.shopping.desc}
            />
         )}

         {/* Health - Pharmacy, Dentist, Aesthetics */}
         {currentView === ViewState.HEALTH && (
            <ShoppingView 
              t={t} 
              highlightedBusinessId={selectedBusinessId} 
              categoryFilter={['salud']}
              customTitle={t.sections.health.title}
              customDesc={t.sections.health.desc}
            />
         )}

         {/* Services - Real Estate, Mechanics, etc */}
         {currentView === ViewState.SERVICES && (
            <ShoppingView 
              t={t} 
              highlightedBusinessId={selectedBusinessId} 
              categoryFilter={['servicios']}
              customTitle={t.sections.services.title}
              customDesc={t.sections.services.desc}
            />
         )}
         
         {currentView === ViewState.ACTIVITIES && <ActivitiesView t={t} />}
         
         {/* Placeholders for other views */}
         {currentView === ViewState.FORUM && renderPlaceholder(t.sections.forum.title, t.sections.forum.desc)}
      </main>

      <Footer t={t.footer} />

      <ShareModal 
        isOpen={!!shareData}
        onClose={() => setShareData(null)}
        data={shareData || {title: '', text: '', url: ''}}
        t={t.share}
      />
    </div>
  );
};
export default App;
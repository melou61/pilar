
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
import { BeaconModal } from './components/BeaconModal'; 
import { translations } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS } from './data';

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c;
};

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

const INITIAL_ADS: Ad[] = [
  {
    id: '1',
    clientName: 'Restaurante El Puerto',
    position: 'page-top',
    imageUrl: 'https://images.unsplash.com/photo-1544124499-58ec526df938?auto=format&fit=crop&w=800&q=80',
    linkUrl: '#',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    isActive: true
  },
  {
    id: '2',
    clientName: 'Inmobiliaria Sun',
    position: 'page-top',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    linkUrl: '#',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    isActive: true
  },
  {
    id: '3',
    clientName: 'Taller García',
    position: 'page-bottom',
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    linkUrl: '#',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    isActive: true
  },
  {
     id: '4',
     clientName: 'Farmacia Centro',
     position: 'menu-top',
     imageUrl: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80',
     linkUrl: '#',
     startDate: '2024-01-01',
     endDate: '2025-12-31',
     isActive: true
  }
];

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
  const [beaconPromotions, setBeaconPromotions] = useState<Record<string, Promotion>>(getInitialPromotions());
  const [adminRole, setAdminRole] = useState<AdminRole>('ADMIN_GENERAL');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [beaconShop, setBeaconShop] = useState<CensusItem | null>(null);
  const [visitedBeacons, setVisitedBeacons] = useState<Set<string>>(new Set());
  const BEACON_PROXIMITY_KM = 0.1;

  const t = translations[currentLang.code as keyof typeof translations] || translations.es;

  const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const allShops = [
                ...COMMERCIAL_CENSUS.flatMap(c => c.items),
                ...DINING_CENSUS.flatMap(c => c.items)
            ];

            for (const shop of allShops) {
                const promo = beaconPromotions[shop.id];
                if (promo && shop.lat && shop.lng) {
                    if (visitedBeacons.has(shop.id)) continue;
                    const dist = calculateDistance(latitude, longitude, shop.lat, shop.lng);
                    if (dist < BEACON_PROXIMITY_KM) {
                        setBeaconShop({ ...shop, promotion: promo });
                        setVisitedBeacons(prev => new Set(prev).add(shop.id));
                        break; 
                    }
                }
            }
        },
        (err) => console.log("Geolocation background error:", err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [visitedBeacons, beaconPromotions]);

  const menuItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: Home },
    { id: ViewState.MAP, label: 'Mapa Interactivo', icon: MapIcon },
    { id: ViewState.CITIZEN_SERVICES, label: 'Ayuntamiento 24h', icon: Landmark },
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
      url: window.location.href
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
    setAdminRole('ADMIN_GENERAL');
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

  const renderHome = () => (
    <div className="space-y-6 pb-20">
      <div className="relative h-[70vh] max-h-[600px] w-full overflow-hidden sm:rounded-b-3xl">
        {heroImages.map((img, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentHeroIndex ? 'opacity-100' : 'opacity-0'}`}>
                <img src={img} alt="Pilar Hero" className="w-full h-full object-cover" />
            </div>
        ))}
        {/* Figma Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 text-white pb-20">
          <div className="absolute top-8 right-6 bg-[#facc15] text-[#713f12] px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl">
            <Sun className="fill-[#713f12]" size={18} />
            {t.hero.sun}
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium mb-3 opacity-90">
            <MapPin size={18} className="text-white" />
            {t.hero.location}
          </div>
          
          <h2 className="text-5xl font-extrabold mb-3 leading-tight tracking-tight drop-shadow-lg">
            Pilar de la<br/>Horadada
          </h2>
          
          <p className="text-white text-lg max-w-sm drop-shadow-md font-medium leading-snug">
            {t.hero.subtitle}
          </p>

          {/* Slider Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'bg-white w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-4 gap-3">
             <button onClick={() => handleNavigate(ViewState.MAP)} className="bg-white rounded-2xl shadow-xl shadow-green-900/5 p-4 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95 border border-gray-50">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"><MapIcon size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Mapa</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.BEACHES)} className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-4 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95 border border-gray-50">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Waves size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t.hero.beaches}</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.EVENTS)} className="bg-white rounded-2xl shadow-xl shadow-purple-900/5 p-4 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95 border border-gray-50">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><Calendar size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t.hero.events}</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.SHOPPING)} className="bg-white rounded-2xl shadow-xl shadow-orange-900/5 p-4 flex flex-col items-center justify-center text-center gap-2 hover:transform hover:-translate-y-1 transition-all active:scale-95 border border-gray-50">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600"><ShoppingBag size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{t.hero.commerce}</span>
            </button>
        </div>
      </div>

      <div className="px-4 pt-2">
         <button onClick={() => handleNavigate(ViewState.CITIZEN_SERVICES)} className="w-full bg-blue-600 rounded-2xl p-5 flex items-center justify-between text-white shadow-xl shadow-blue-100 group transition-all hover:bg-blue-700">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl"><Landmark size={28} /></div>
                <div className="text-left">
                    <div className="font-bold text-base tracking-tight">Ayuntamiento 24h</div>
                    <div className="text-xs text-blue-100 opacity-80">Cita previa, incidencias y trámites</div>
                </div>
            </div>
            <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform">
              <ArrowRight size={20} />
            </div>
         </button>
      </div>

      <div className="px-4 pt-2"><AdSpot ads={ads} position="page-top" label={t.common.sponsored} /></div>

      <div className="px-4">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-900 text-xl tracking-tight">{t.sections.events.title}</h3>
          <button onClick={() => handleNavigate(ViewState.EVENTS)} className="text-blue-600 text-xs font-bold uppercase tracking-widest flex items-center gap-1 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">{t.common.discover} <ArrowRight size={14} /></button>
        </div>
        <div className="space-y-4">
          {events.slice(0, 2).map(event => (
            <div key={event.id} onClick={() => { setCurrentView(ViewState.EVENTS); setSelectedEventId(event.id); window.scrollTo(0,0); }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer hover:shadow-md transition-all hover:scale-[1.01]">
              <div className="w-1/3 relative aspect-square">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{event.category}</span>
                <h4 className="font-bold text-gray-900 leading-tight text-base mb-2 line-clamp-2">{event.title}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1.5"><Calendar size={14} className="text-blue-400" /> {event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4"><AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} /></div>
    </div>
  );

  const renderEvents = () => {
    if (selectedEventId) {
      const event = events.find(e => e.id === selectedEventId);
      if (event) {
        return <EventDetailView event={event} onBack={() => setSelectedEventId(null)} onShare={handleShare} onAddToCalendar={handleAddToCalendar} t={t.common} />;
      }
    }
    return (
      <div className="px-4 py-6 space-y-6 pb-20">
         <h2 className="text-2xl font-bold text-gray-800">{t.sections.events.title}</h2>
         <p className="text-gray-500 text-sm -mt-4">{t.sections.events.desc}</p>
         <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                 <div className="h-48 relative cursor-pointer" onClick={() => { setSelectedEventId(event.id); window.scrollTo(0,0); }}>
                   <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">{event.category}</div>
                   <div className="absolute top-4 right-4 flex gap-2">
                        <button onClick={(e) => handleAddToCalendar(e, event)} className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-blue-700 hover:text-blue-900 hover:bg-white transition-colors shadow-sm"><CalendarPlus size={18} /></button>
                        <button onClick={(e) => { e.stopPropagation(); handleShare(event); }} className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-gray-800 hover:text-blue-600 hover:bg-white transition-colors shadow-sm"><Share2 size={18} /></button>
                   </div>
                 </div>
                 <div className="p-5">
                   <div className="flex items-start justify-between mb-2"><h3 className="text-xl font-bold text-gray-900">{event.title}</h3></div>
                   <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-2"><Calendar size={16} className="text-blue-500" />{event.date}</div>
                      <div className="flex items-center gap-2"><MapPin size={16} className="text-red-500" />{event.location}</div>
                   </div>
                   <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{event.description}</p>
                   <button onClick={() => { setSelectedEventId(event.id); window.scrollTo(0,0); }} className="w-full py-2.5 bg-gray-50 text-blue-600 font-semibold rounded-lg text-sm hover:bg-blue-50 transition-colors border border-blue-100">{t.common.readMore}</button>
                 </div>
              </div>
            ))}
         </div>
      </div>
    );
  };

  const renderPlaceholder = (title: string, desc: string) => (
    <div className="px-4 py-6 space-y-4 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-2"><Info size={32} /></div>
       <h2 className="text-xl font-bold text-gray-800">{title}</h2>
       <p className="text-gray-500 text-sm max-w-xs">{desc}</p>
       <button onClick={() => handleNavigate(ViewState.HOME)} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">{t.common.back}</button>
    </div>
  );

  if (currentView === ViewState.ADMIN) {
    return <AdminDashboard ads={ads} setAds={setAds} events={events} setEvents={setEvents} onLogout={() => setCurrentView(ViewState.HOME)} currentUserRole={adminRole} beaconPromotions={beaconPromotions} setBeaconPromotions={setBeaconPromotions} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header onMenuClick={() => setSidebarOpen(true)} onLoginClick={() => setLoginOpen(true)} onSearchClick={() => setSearchOpen(true)} onLogoClick={() => handleNavigate(ViewState.HOME)} currentLang={currentLang} onLanguageChange={setCurrentLang} languages={languages} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} currentView={currentView} onNavigate={handleNavigate} ads={ads} title={t.menu.title} sponsoredText={t.common.sponsored} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} onLoginSuperAdmin={handleSuperAdminLogin} t={t.auth} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleSearchNavigate} events={events} t={t} />
      {beaconShop && <BeaconModal isOpen={true} onClose={() => setBeaconShop(null)} shop={beaconShop} />}
      <main className="flex-1 w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl bg-white shadow-xl shadow-gray-100 my-0 sm:my-6 min-h-screen sm:min-h-0 sm:rounded-2xl overflow-hidden relative">
         {currentView === ViewState.HOME && renderHome()}
         {currentView === ViewState.EVENTS && renderEvents()}
         {currentView === ViewState.BEACHES && <BeachesView t={t} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} />}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleSearchNavigate} />}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         {currentView === ViewState.NEWS && <NewsView t={t} />}
         {currentView === ViewState.DINING && <DiningView t={t} />}
         {currentView === ViewState.SHOPPING && <ShoppingView t={t} highlightedBusinessId={selectedBusinessId} categoryFilter={['moda', 'hogar', 'alimentacion']} customTitle={t.sections.shopping.title} customDesc={t.sections.shopping.desc} />}
         {currentView === ViewState.HEALTH && <ShoppingView t={t} highlightedBusinessId={selectedBusinessId} categoryFilter={['salud']} customTitle={t.sections.health.title} customDesc={t.sections.health.desc} />}
         {currentView === ViewState.SERVICES && <ShoppingView t={t} highlightedBusinessId={selectedBusinessId} categoryFilter={['servicios']} customTitle={t.sections.services.title} customDesc={t.sections.services.desc} />}
         {currentView === ViewState.ACTIVITIES && <ActivitiesView t={t} />}
         {currentView === ViewState.FORUM && renderPlaceholder(t.sections.forum.title, t.sections.forum.desc)}
      </main>
      <Footer t={t.footer} />
      <ShareModal isOpen={!!shareData} onClose={() => setShareData(null)} data={shareData || {title: '', text: '', url: ''}} t={t.share} />
    </div>
  );
};
export default App;

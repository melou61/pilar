
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
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&w=2000&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
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
    if (view === ViewState.SHOPPING) setSelectedBusinessId(id);
    if (view === ViewState.EVENTS && id) setSelectedEventId(id);
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-8 text-white pb-20">
          <div className="absolute top-8 right-6 bg-[#facc15] text-[#713f12] px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-white/20">
            <Sun className="fill-[#713f12]" size={18} />
            {t.hero.sun}
          </div>
          <div className="flex items-center gap-2 text-sm font-medium mb-3 opacity-90">
            <MapPin size={18} className="text-white" />
            {t.hero.location}
          </div>
          <h2 className="text-5xl font-extrabold mb-3 leading-tight tracking-tight drop-shadow-2xl">
            Pilar de la<br/>Horadada
          </h2>
          <p className="text-white text-lg max-w-sm drop-shadow-lg font-medium leading-snug">
            {t.hero.subtitle}
          </p>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, idx) => (
              <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentHeroIndex ? 'bg-white w-6' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-4 gap-3">
             <button onClick={() => handleNavigate(ViewState.MAP)} className="bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center text-center gap-2 border border-gray-100">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"><MapIcon size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase">Mapa</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.BEACHES)} className="bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center text-center gap-2 border border-gray-100">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Waves size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase">{t.hero.beaches}</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.EVENTS)} className="bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center text-center gap-2 border border-gray-100">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><Calendar size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase">{t.hero.events}</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.SHOPPING)} className="bg-white rounded-2xl shadow-xl p-4 flex flex-col items-center justify-center text-center gap-2 border border-gray-100">
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center text-orange-600"><ShoppingBag size={20} /></div>
                <span className="text-[10px] font-bold text-gray-700 uppercase">{t.hero.commerce}</span>
            </button>
        </div>
      </div>

      <div className="px-4">
        <button onClick={() => handleNavigate(ViewState.CITIZEN_SERVICES)} className="w-full bg-blue-600 rounded-2xl p-5 flex items-center justify-between text-white shadow-xl">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl"><Landmark size={28} /></div>
                <div className="text-left font-bold">Ayuntamiento 24h</div>
            </div>
            <ArrowRight size={20} />
         </button>
      </div>

      <div className="px-4"><AdSpot ads={ads} position="page-top" /></div>
      
      <div className="px-4">
        <h3 className="font-bold text-gray-900 text-xl mb-4">{t.sections.events.title}</h3>
        <div className="space-y-4">
          {events.slice(0, 2).map(event => (
            <div key={event.id} onClick={() => { setCurrentView(ViewState.EVENTS); setSelectedEventId(event.id); window.scrollTo(0,0); }} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer">
              <div className="w-1/3 aspect-square relative">
                <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="w-2/3 p-4">
                <span className="text-[10px] font-bold text-blue-600 uppercase mb-1 block">{event.category}</span>
                <h4 className="font-bold text-gray-900 leading-tight text-base line-clamp-2">{event.title}</h4>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Calendar size={14} /> {event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header onMenuClick={() => setSidebarOpen(true)} onLoginClick={() => setLoginOpen(true)} onSearchClick={() => setSearchOpen(true)} onLogoClick={() => handleNavigate(ViewState.HOME)} currentLang={currentLang} onLanguageChange={setCurrentLang} languages={languages} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} currentView={currentView} onNavigate={handleNavigate} ads={ads} title={t.menu.title} sponsoredText={t.common.sponsored} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={() => {}} onLoginSuperAdmin={() => handleNavigate(ViewState.ADMIN)} t={t.auth} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleSearchNavigate} events={events} t={t} />
      <main className="flex-1 w-full max-w-md mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-4xl bg-white shadow-xl my-0 sm:my-6 min-h-screen sm:rounded-2xl overflow-hidden relative">
         {currentView === ViewState.HOME && renderHome()}
         {currentView === ViewState.BEACHES && <BeachesView t={t} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} />}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleSearchNavigate} />}
         {currentView === ViewState.DINING && <DiningView t={t} />}
         {currentView === ViewState.SHOPPING && <ShoppingView t={t} highlightedBusinessId={selectedBusinessId} />}
         {currentView === ViewState.EVENTS && <div className="p-4">Eventos View</div>}
         {currentView === ViewState.ADMIN && <AdminDashboard ads={ads} setAds={setAds} events={events} setEvents={setEvents} onLogout={() => setCurrentView(ViewState.HOME)} currentUserRole={adminRole} />}
      </main>
      <Footer t={t.footer} />
    </div>
  );
};
export default App;

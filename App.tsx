
import React, { useState, useEffect, useRef } from 'react';
import { ViewState, NavItem, Ad, Event, Language, AdminRole } from './types';
import { 
  Home, Newspaper, Waves, Eye, Activity, UtensilsCrossed, 
  ShoppingBag, Calendar, MessageSquare, MapPin, Sun, Info, ArrowRight, ArrowLeft,
  Search, Phone, Tag, Share2, Heart, Briefcase, MapIcon, Landmark, CalendarPlus, Zap, Sparkles, User, Bot, Globe, FileText, Star
} from './components/Icons';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { AdSpot } from './components/AdSpot';
import { ShoppingView } from './components/ShoppingView';
import { SearchModal } from './components/SearchModal';
import { BeachesView } from './components/BeachesView';
import { SightseeingView } from './components/SightseeingView';
import { DiningView } from './components/DiningView'; 
import { ActivitiesView } from './components/ActivitiesView';
import { CitizenServicesView } from './components/CitizenServicesView';
import { MapView } from './components/MapView';
import { NewsView } from './components/NewsView';
import { EventsView } from './components/EventsView';
import { AIChatView } from './components/AIChatView';
import { ShareModal } from './components/ShareModal';
import { translations } from './translations';
import { MOCK_EVENTS } from './data';

const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

const INITIAL_ADS: Ad[] = [
  { id: '1', clientName: 'Restaurante El Puerto', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1550966841-3ee7adac1661?auto=format&fit=crop&w=800&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ title: '', text: '', url: '' });
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]); 
  const [ads] = useState<Ad[]>(INITIAL_ADS);
  const [events] = useState<Event[]>(MOCK_EVENTS);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const t = translations[currentLang.code as keyof typeof translations] || translations.es;

  const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&w=2000&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length), 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setSidebarOpen(false);
    setSelectedEventId(null);
    setSelectedBusinessId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchNavigate = (view: ViewState, id?: string) => {
    setCurrentView(view);
    if (view === ViewState.SHOPPING) setSelectedBusinessId(id || null);
    if (view === ViewState.EVENTS) setSelectedEventId(id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (event: Event) => {
    setShareData({
      title: event.title,
      text: event.description,
      url: window.location.href
    });
    setShareOpen(true);
  };

  const handleAddToCalendar = (e: React.MouseEvent, event: Event) => {
    e.stopPropagation();
    alert(`Añadiendo "${event.title}" a tu calendario...`);
  };

  const bottomNavItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: Home },
    { id: ViewState.MAP, label: 'Mapa', icon: MapIcon },
    { id: ViewState.AI_CHAT, label: 'Guía IA', icon: Sparkles, isMain: true },
    { id: ViewState.EVENTS, label: 'Eventos', icon: Calendar },
    { id: ViewState.PROFILE, label: 'Perfil', icon: User },
  ];

  const menuItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: Home },
    { id: ViewState.AI_CHAT, label: t.menu.ai, icon: Sparkles },
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

  const HomeMapWidget = () => {
    const miniMapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = () => {
            const google = (window as any).google;
            if (miniMapRef.current && google && google.maps) {
                new google.maps.Map(miniMapRef.current, {
                    center: { lat: 37.8653, lng: -0.7932 },
                    zoom: 14,
                    disableDefaultUI: true,
                    gestureHandling: 'none',
                    styles: [
                        { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
                        { featureType: "water", elementType: "geometry", stylers: [{ color: "#d1d5db" }] }
                    ]
                });
            } else {
                // If google maps is not yet loaded, retry in 500ms
                setTimeout(initMap, 500);
            }
        };
        initMap();
    }, []);

    return (
      <div 
        onClick={() => handleNavigate(ViewState.MAP)}
        className="relative h-72 w-full rounded-[48px] overflow-hidden border-8 border-white shadow-2xl group cursor-pointer"
      >
        <div ref={miniMapRef} style={{ height: '100%', width: '100%' }} className="bg-gray-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white">
           <div>
              <h4 className="font-black text-2xl mb-1">Mapa del Pilar</h4>
              <p className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">Cerca de ti hoy</p>
           </div>
           <div className="w-14 h-14 bg-white text-blue-600 rounded-[20px] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <MapIcon size={28} />
           </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="space-y-12 pb-40 animate-in fade-in duration-700">
      <div className="relative h-[85vh] w-full overflow-hidden">
        {heroImages.map((img, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out transform ${index === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                <img src={img} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#f8fafc]" />
            </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-white pb-32">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3 text-sm font-black mb-6 uppercase tracking-[0.4em] text-blue-400 drop-shadow-lg">
              <MapPin size={24} />
              {t.hero.location}
            </div>
            <h2 className="text-7xl sm:text-9xl font-black mb-8 leading-[0.8] tracking-tighter drop-shadow-2xl">
              Vive<br/>el Pilar
            </h2>
            <p className="text-white/95 text-xl max-w-sm drop-shadow-xl font-medium leading-tight opacity-95 mb-10">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4">
               <button onClick={() => handleNavigate(ViewState.AI_CHAT)} className="bg-white text-gray-900 px-10 py-5 rounded-[24px] font-black text-base flex items-center gap-3 shadow-2xl hover:scale-105 transition-all">
                  <Sparkles size={24} className="text-blue-600" />
                  Hablar con la IA
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        <div>
           <div className="flex justify-between items-center mb-8 px-2">
              <h3 className="font-black text-gray-900 text-3xl tracking-tight">Mapa en vivo</h3>
              <button onClick={() => handleNavigate(ViewState.MAP)} className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full">Pantalla completa</button>
           </div>
           <HomeMapWidget />
        </div>

        <div>
          <div className="flex justify-between items-center mb-10 px-2">
            <div>
              <h3 className="font-black text-gray-900 text-4xl tracking-tight mb-2">Fiestas y Tradición</h3>
              <p className="text-gray-500 font-medium">El alma del Pilar: desfiles, charangas y alegría.</p>
            </div>
          </div>
          
          <div className="space-y-12">
            {events.filter(e => e.isFestival).map((event) => (
              <div 
                key={event.id} 
                onClick={() => handleSearchNavigate(ViewState.EVENTS, event.id)} 
                className="bg-white rounded-[56px] shadow-2xl shadow-gray-200/60 border border-gray-50 overflow-hidden cursor-pointer hover:-translate-y-3 transition-all duration-500 group"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  <img src={event.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
                  <div className="absolute top-10 left-10 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] text-blue-600 shadow-2xl">
                    {event.category}
                  </div>
                </div>
                <div className="p-12">
                  <h4 className="font-black text-gray-900 text-5xl leading-[0.9] tracking-tighter mb-8">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-10">
                    <div className="flex items-center gap-3 text-gray-400 font-black text-xs uppercase tracking-[0.2em]">
                       <Calendar size={20} className="text-blue-500" />
                       {event.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {currentView !== ViewState.MAP && currentView !== ViewState.AI_CHAT && (
        <Header 
          onMenuClick={() => setSidebarOpen(true)} 
          onLoginClick={() => setLoginOpen(true)} 
          onSearchClick={() => setSearchOpen(true)} 
          onLogoClick={() => handleNavigate(ViewState.HOME)} 
          currentLang={currentLang} 
          onLanguageChange={setCurrentLang} 
          languages={languages} 
        />
      )}

      <nav className="fixed bottom-8 left-8 right-8 h-20 bg-white/80 backdrop-blur-3xl rounded-[35px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[100] flex items-center justify-around px-6 border border-white/40 ring-1 ring-black/5 animate-in slide-in-from-bottom-20 duration-1000">
        {bottomNavItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 transition-all ${item.isMain ? '-translate-y-6' : ''}`}
            >
              <div className={`
                ${item.isMain 
                  ? 'w-16 h-16 bg-[#0f172a] text-white rounded-[24px] shadow-2xl shadow-gray-900/40 ring-4 ring-white' 
                  : 'p-3'} 
                ${isActive && !item.isMain ? 'text-blue-600 scale-110' : 'text-gray-400'} 
                flex items-center justify-center transition-all duration-300
              `}>
                <item.icon size={item.isMain ? 32 : 24} className={isActive && !item.isMain ? 'fill-blue-50' : ''} />
              </div>
              {!item.isMain && (
                <span className={`text-[9px] font-black uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'text-blue-600 opacity-100' : 'text-gray-400 opacity-0'}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} currentView={currentView} onNavigate={handleNavigate} ads={ads} title={t.menu.title} sponsoredText={t.common.sponsored} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={() => {}} onLoginSuperAdmin={() => handleNavigate(ViewState.ADMIN)} t={t.auth} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleSearchNavigate} events={events} t={t} />
      <ShareModal isOpen={isShareOpen} onClose={() => setShareOpen(false)} data={shareData} t={t.share} />
      
      <main className={`flex-1 w-full flex flex-col relative ${currentView === ViewState.MAP ? 'h-screen' : ''}`}>
         {currentView === ViewState.HOME && renderHome()}
         {currentView === ViewState.BEACHES && <BeachesView t={t} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} />}
         {currentView === ViewState.ACTIVITIES && <ActivitiesView t={t} />}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleSearchNavigate} />}
         {currentView === ViewState.DINING && <DiningView t={t} />}
         {currentView === ViewState.SHOPPING && <ShoppingView t={t} highlightedBusinessId={selectedBusinessId} />}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         {currentView === ViewState.NEWS && <NewsView t={t} />}
         {currentView === ViewState.EVENTS && (
           <EventsView 
              t={t} 
              events={events} 
              onShare={handleShare} 
              onAddToCalendar={handleAddToCalendar} 
              initialEventId={selectedEventId} 
           />
         )}
         {currentView === ViewState.AI_CHAT && <AIChatView t={t} onBack={() => handleNavigate(ViewState.HOME)} />}
         
         {currentView === ViewState.PROFILE && (
            <div className="p-8 pt-32 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="w-32 h-32 bg-gray-100 rounded-[40px] mx-auto flex items-center justify-center text-gray-300 shadow-inner">
                   <User size={64} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight">Tu Perfil</h2>
                  <p className="text-gray-500 max-w-xs mx-auto text-lg leading-tight">Inicia sesión para guardar tus favoritos.</p>
                </div>
                <button 
                   onClick={() => setLoginOpen(true)}
                   className="w-full max-w-xs px-12 py-5 bg-[#0f172a] text-white rounded-3xl font-black text-lg shadow-2xl hover:bg-black transition-all"
                >
                   Iniciar Sesión
                </button>
            </div>
         )}
      </main>
      
      {currentView !== ViewState.MAP && currentView !== ViewState.AI_CHAT && <Footer t={t.footer} />}
    </div>
  );
};
export default App;

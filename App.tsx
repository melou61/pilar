
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
import { ShoppingView } from './components/ShoppingView';
import { SearchModal } from './components/SearchModal';
import { BeachesView } from './components/BeachesView';
import { SightseeingView } from './components/SightseeingView';
import { DiningView } from './components/DiningView'; 
import { CitizenServicesView } from './components/CitizenServicesView';
import { MapView } from './components/MapView';
import { NewsView } from './components/NewsView';
import { translations } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS } from './data';

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
    const interval = setInterval(() => setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length), 6000);
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
    if (view === ViewState.EVENTS && id) setSelectedEventId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: Home },
    { id: ViewState.MAP, label: 'Mapa Interactivo', icon: MapIcon },
    { id: ViewState.CITIZEN_SERVICES, label: 'Ayuntamiento 24h', icon: Landmark },
    { id: ViewState.NEWS, label: t.menu.news, icon: Newspaper },
    { id: ViewState.BEACHES, label: t.menu.beaches, icon: Waves },
    { id: ViewState.SIGHTSEEING, label: t.menu.sightseeing, icon: Eye },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
  ];

  const renderHome = () => (
    <div className="space-y-12 pb-24 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
        {heroImages.map((img, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                <img src={img} alt="Hero" className="w-full h-full object-cover" />
            </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent flex flex-col justify-end p-12 text-white pb-24">
          <div className="flex flex-col max-w-4xl mx-auto w-full">
            <div className="absolute top-12 right-12 bg-[#facc15] text-[#713f12] px-6 py-3 rounded-full font-black text-sm flex items-center gap-3 shadow-2xl border-4 border-white/40 ring-1 ring-black/5">
              <Sun className="fill-[#713f12]" size={20} />
              {t.hero.sun}
            </div>
            <div className="flex items-center gap-3 text-sm font-black mb-4 uppercase tracking-[0.2em] text-blue-400">
              <MapPin size={22} />
              {t.hero.location}
            </div>
            <h2 className="text-6xl sm:text-8xl font-black mb-6 leading-[0.9] tracking-tighter drop-shadow-2xl">
              Pilar de la<br/>Horadada
            </h2>
            <p className="text-white/90 text-xl max-w-lg drop-shadow-xl font-medium leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, idx) => (
            <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentHeroIndex ? 'bg-white w-10' : 'bg-white/30 w-3'}`} />
          ))}
        </div>
      </div>
      
      {/* Categories Grid */}
      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
             <button onClick={() => handleNavigate(ViewState.MAP)} className="bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center justify-center text-center gap-4 border border-gray-100 hover:-translate-y-2 transition-all group">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-inner"><MapIcon size={28} /></div>
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">Mapa</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.BEACHES)} className="bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center justify-center text-center gap-4 border border-gray-100 hover:-translate-y-2 transition-all group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-inner"><Waves size={28} /></div>
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{t.hero.beaches}</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.EVENTS)} className="bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center justify-center text-center gap-4 border border-gray-100 hover:-translate-y-2 transition-all group">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-inner"><Calendar size={28} /></div>
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{t.hero.events}</span>
            </button>
            <button onClick={() => handleNavigate(ViewState.SHOPPING)} className="bg-white rounded-[32px] shadow-2xl p-8 flex flex-col items-center justify-center text-center gap-4 border border-gray-100 hover:-translate-y-2 transition-all group">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors shadow-inner"><ShoppingBag size={28} /></div>
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest">{t.hero.commerce}</span>
            </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-12">
        <button onClick={() => handleNavigate(ViewState.CITIZEN_SERVICES)} className="w-full bg-blue-600 rounded-[32px] p-8 flex items-center justify-between text-white shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-[1.01] group">
            <div className="flex items-center gap-6">
                <div className="bg-white/10 p-5 rounded-2xl group-hover:bg-white/20 transition-colors"><Landmark size={36} /></div>
                <div className="text-left font-black text-2xl tracking-tight">Ayuntamiento 24h</div>
            </div>
            <ArrowRight size={28} />
         </button>

        <AdSpot ads={ads} position="page-top" />

        {/* PRÓXIMOS EVENTOS - FIGMA MATCH */}
        <div>
          <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="font-black text-gray-900 text-[32px] tracking-tight">Próximos Eventos</h3>
            <button 
              onClick={() => handleNavigate(ViewState.EVENTS)} 
              className="text-blue-600 text-xs font-black uppercase tracking-[0.1em] hover:underline"
            >
              EXPLORAR MÁS
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {events.slice(0, 2).map(event => (
              <div 
                key={event.id} 
                onClick={() => handleSearchNavigate(ViewState.EVENTS, event.id)} 
                className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all group flex flex-col"
              >
                <div className="aspect-[16/10] relative overflow-hidden border-b border-gray-100">
                  <img 
                    src={event.imageUrl} 
                    alt="" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="text-blue-600 text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 pt-8 space-y-4">
                  <h4 className="font-black text-gray-900 text-[26px] leading-tight tracking-tight">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2.5 text-gray-400 font-bold text-[12px] uppercase tracking-[0.15em]">
                    <Calendar size={18} className="text-blue-600" />
                    {event.date}
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
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans">
      {currentView !== ViewState.MAP && (
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
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} currentView={currentView} onNavigate={handleNavigate} ads={ads} title={t.menu.title} sponsoredText={t.common.sponsored} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={() => {}} onLoginSuperAdmin={() => handleNavigate(ViewState.ADMIN)} t={t.auth} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleSearchNavigate} events={events} t={t} />
      <main className={`flex-1 w-full flex flex-col relative ${currentView === ViewState.MAP ? 'h-screen' : ''}`}>
         {currentView === ViewState.HOME && renderHome()}
         {currentView === ViewState.BEACHES && <BeachesView t={t} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} />}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleSearchNavigate} />}
         {currentView === ViewState.DINING && <DiningView t={t} />}
         {currentView === ViewState.SHOPPING && <ShoppingView t={t} highlightedBusinessId={selectedBusinessId} />}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         {currentView === ViewState.NEWS && <NewsView t={t} />}
      </main>
      {currentView !== ViewState.MAP && <Footer t={t.footer} />}
    </div>
  );
};
export default App;

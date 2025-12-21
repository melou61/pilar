
import React, { useState, useEffect, useRef } from 'react';
import { ViewState, NavItem, Ad, Event, Language, AdminRole, Promotion } from './types';
import { 
  Home, Newspaper, Waves, Eye, Activity, UtensilsCrossed, 
  ShoppingBag, Calendar, MapPin, Search, MapIcon, Landmark, Sparkles, User, LogOut
} from './components/Icons';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
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
import { AdminDashboard } from './components/AdminDashboard';
import { translations } from './translations';
import { MOCK_EVENTS } from './data';

const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

const INITIAL_ADS: Ad[] = [
  { id: '1', clientName: 'Mesón El Puerto', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true }
];

declare const L: any; 

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ title: '', text: '', url: '' });
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]); 
  
  // Auth States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'USER' | 'ADMIN'>('USER');
  const [userName, setUserName] = useState('');

  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [beaconPromotions, setBeaconPromotions] = useState<Record<string, Promotion>>({});

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('USER');
    setUserName('');
    handleNavigate(ViewState.HOME);
    setSidebarOpen(false);
  };

  const handleLogin = (role: 'USER' | 'ADMIN' = 'USER') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(role === 'ADMIN' ? 'Administrador' : 'Usuario Pilar');
    setLoginOpen(false);
    if (role === 'ADMIN') {
        handleNavigate(ViewState.ADMIN);
    } else {
        handleNavigate(ViewState.PROFILE);
    }
  };

  const handleSearchNavigate = (view: ViewState, id?: string) => {
    setCurrentView(view);
    if (view === ViewState.SHOPPING) setSelectedBusinessId(id || null);
    if (view === ViewState.EVENTS) setSelectedEventId(id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    const widgetInstance = useRef<any>(null);

    useEffect(() => {
        if (miniMapRef.current && !widgetInstance.current && typeof L !== 'undefined') {
            try {
                const map = L.map(miniMapRef.current, {
                    zoomControl: false,
                    attributionControl: false,
                    dragging: false,
                    touchZoom: false,
                    scrollWheelZoom: false,
                    doubleClickZoom: false
                }).setView([37.8653, -0.7932], 14);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                L.circleMarker([37.8653, -0.7932], {
                    radius: 6,
                    fillColor: '#2563eb',
                    color: '#ffffff',
                    weight: 2,
                    fillOpacity: 1
                }).addTo(map);

                setTimeout(() => map.invalidateSize(), 300);
                widgetInstance.current = map;
            } catch (e) {}
        }
        return () => {
            if (widgetInstance.current) {
                widgetInstance.current.remove();
                widgetInstance.current = null;
            }
        };
    }, []);

    return (
      <div 
        onClick={() => handleNavigate(ViewState.MAP)}
        className="relative h-80 w-full rounded-[50px] overflow-hidden border-8 border-white shadow-2xl group cursor-pointer bg-gray-50"
      >
        <div ref={miniMapRef} className="w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white z-10">
           <div>
              <h4 className="font-black text-2xl mb-1 tracking-tighter">Explora el Pilar</h4>
              <p className="text-white/80 text-[9px] font-black uppercase tracking-widest">Cerca de ti hoy</p>
           </div>
           <div className="w-14 h-14 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <MapIcon size={28} />
           </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="space-y-16 pb-24 animate-in fade-in duration-700">
      <div className="relative h-[85vh] w-full overflow-hidden">
        {heroImages.map((img, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out transform ${index === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
                <img src={img} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#f8fafc]" />
            </div>
        ))}
        
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-white pb-36">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3 text-sm font-black mb-8 uppercase tracking-[0.4em] text-blue-400 drop-shadow-lg">
              <MapPin size={24} />
              PILAR DE LA HORADADA
            </div>
            <h2 className="text-8xl sm:text-[140px] font-black mb-10 leading-[0.8] tracking-tighter drop-shadow-2xl">
              Vive<br/>el Pilar
            </h2>
            <p className="text-white text-2xl max-w-md font-bold leading-tight mb-12 drop-shadow-lg">
              Donde el sol ilumina la historia y el mar abraza tus sentidos.
            </p>
            <div className="flex gap-4">
               <button onClick={() => handleNavigate(ViewState.AI_CHAT)} className="bg-white text-gray-900 px-12 py-6 rounded-[32px] font-black text-lg flex items-center gap-3 shadow-2xl hover:scale-105 transition-all">
                  <Sparkles size={24} className="text-blue-600" />
                  Hablar con la IA
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        <div className="animate-in slide-in-from-bottom duration-1000">
           <div className="flex justify-between items-center mb-10 px-4">
              <h3 className="font-black text-gray-900 text-4xl tracking-tighter">Tu entorno</h3>
              <button onClick={() => handleNavigate(ViewState.MAP)} className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-6 py-3 rounded-full">Pantalla completa</button>
           </div>
           <HomeMapWidget />
        </div>

        <div>
          <div className="flex justify-between items-center mb-12 px-4">
            <div>
              <h3 className="font-black text-gray-900 text-5xl tracking-tighter mb-4">Tradición Viva</h3>
              <p className="text-gray-500 text-xl font-medium">Fiestas, charangas y alegría pilarera.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {events.filter(e => e.isFestival).map((event) => (
              <div 
                key={event.id} 
                onClick={() => handleSearchNavigate(ViewState.EVENTS, event.id)} 
                className="bg-white rounded-[56px] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden cursor-pointer hover:-translate-y-4 transition-all duration-500 group"
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
                  <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-xl px-6 py-3 rounded-3xl text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 shadow-2xl">
                    {event.category}
                  </div>
                </div>
                <div className="p-10">
                  <h4 className="font-black text-gray-900 text-3xl leading-none tracking-tighter mb-6 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-4 text-gray-400 font-black text-xs uppercase tracking-widest">
                       <Calendar size={18} className="text-blue-500" />
                       {event.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center py-20">
           <h3 className="text-5xl font-black text-gray-900 mb-6 tracking-tighter">Corazón del Mediterráneo</h3>
           <p className="text-gray-500 max-w-2xl mx-auto font-medium text-xl leading-relaxed">
             {t.hero.subtitle}
           </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <Header 
        onMenuClick={() => setSidebarOpen(true)} 
        onLoginClick={() => setLoginOpen(true)} 
        onSearchClick={() => setSearchOpen(true)} 
        onLogoClick={() => handleNavigate(ViewState.HOME)} 
        currentLang={currentLang} 
        onLanguageChange={setCurrentLang} 
        languages={languages} 
        currentView={currentView}
        onNavigate={handleNavigate}
        t={t}
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
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      
      <div className="relative z-[7000]">
        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setLoginOpen(false)} 
          onLogin={() => handleLogin('USER')} 
          onLoginSuperAdmin={() => handleLogin('ADMIN')} 
          t={t.auth} 
        />
        <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleSearchNavigate} events={events} t={t} />
        <ShareModal isOpen={isShareOpen} onClose={() => setShareOpen(false)} data={shareData} t={t.share} />
      </div>
      
      <main className={`flex-1 w-full flex flex-col relative pt-20 ${currentView === ViewState.MAP ? 'h-[calc(100vh-80px)]' : ''} ${currentView === ViewState.AI_CHAT ? 'h-[calc(100vh-80px)] overflow-hidden' : ''}`}>
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
              onShare={(ev) => { setShareData({title: ev.title, text: ev.description, url: window.location.href}); setShareOpen(true); }} 
              onAddToCalendar={() => {}} 
              initialEventId={selectedEventId} 
           />
         )}
         {currentView === ViewState.AI_CHAT && <AIChatView t={t} langCode={currentLang.code} onBack={() => handleNavigate(ViewState.HOME)} />}
         
         {currentView === ViewState.ADMIN && (
           <AdminDashboard 
              ads={ads} 
              setAds={setAds} 
              events={events} 
              setEvents={setEvents} 
              onLogout={handleLogout}
              currentUserRole="SUPER_ADMIN"
              beaconPromotions={beaconPromotions}
              setBeaconPromotions={setBeaconPromotions}
           />
         )}

         {currentView === ViewState.PROFILE && (
            <div className="p-12 pt-40 text-center space-y-12 animate-in fade-in zoom-in duration-500">
                <div className={`w-40 h-40 ${isLoggedIn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-300'} rounded-[50px] mx-auto flex items-center justify-center shadow-inner`}>
                   <User size={80} />
                </div>
                <div className="space-y-6">
                  <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                      {isLoggedIn ? `Hola, ${userName}` : 'Tu Perfil'}
                  </h2>
                  <p className="text-gray-500 max-w-xs mx-auto text-xl font-medium leading-tight">
                      {isLoggedIn ? 'Bienvenido a tu rincón personal del Pilar.' : 'Inicia sesión para guardar tus rincones favoritos del Pilar.'}
                  </p>
                </div>
                {isLoggedIn ? (
                    <button 
                        onClick={handleLogout}
                        className="w-full max-w-sm px-12 py-6 bg-red-50 text-red-600 rounded-[32px] font-black text-xl shadow-xl hover:bg-red-100 transition-all flex items-center justify-center gap-3 mx-auto"
                    >
                        <LogOut size={24} />
                        Cerrar Sesión
                    </button>
                ) : (
                    <button 
                        onClick={() => setLoginOpen(true)}
                        className="w-full max-w-sm px-12 py-6 bg-blue-600 text-white rounded-[32px] font-black text-xl shadow-2xl hover:bg-blue-700 transition-all mx-auto"
                    >
                        Entrar ahora
                    </button>
                )}
            </div>
         )}
      </main>
      
      {currentView !== ViewState.ADMIN && <Footer t={t.footer} />}
    </div>
  );
};
export default App;

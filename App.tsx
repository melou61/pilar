
import React, { useState, useEffect, useRef } from 'react';
import { ViewState, NavItem, Ad, Event, Language, AdminRole, Promotion, CensusItem } from './types';
import { 
  Home, Newspaper, Waves, Eye, Activity, UtensilsCrossed, 
  ShoppingBag, Calendar, MapPin, Search, MapIcon, Landmark, Sparkles, User, LogOut, Edit3, Camera, Save, X, Image as ImageIcon, Heart, ChevronRight, ArrowLeft
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
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS } from './data';

const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'zh', label: '中文 (简体)', flag: '🇨🇳' },
];

const INITIAL_ADS: Ad[] = [
  { id: '1', clientName: 'Mesón El Puerto', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ title: '', text: '', url: '' });
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]); 
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'USER' | 'ADMIN'>('USER');
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [favorites, setFavorites] = useState<string[]>([]);
  const [myEvents, setMyEvents] = useState<string[]>([]);
  
  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  
  // Estado dinámico para el censo de negocios (Fusionamos shops y restaurantes para gestión centralizada)
  const [businesses, setBusinesses] = useState<CensusItem[]>(() => [
    ...COMMERCIAL_CENSUS.flatMap(c => c.items),
    ...DINING_CENSUS.flatMap(c => c.items)
  ]);

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

  const handleLogin = (role: 'USER' | 'ADMIN' = 'USER', userData?: {name: string, email: string}) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(userData?.name || (role === 'ADMIN' ? 'Administrador' : 'Usuario Pilar'));
    setLoginOpen(false);
    if (role === 'ADMIN') handleNavigate(ViewState.ADMIN);
    else handleNavigate(ViewState.PROFILE);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const toggleMyEvent = (id: string) => {
    setMyEvents(prev => prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]);
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
    { id: ViewState.MAP, label: t.menu.map, icon: MapIcon },
    { id: ViewState.CITIZEN_SERVICES, label: t.menu.services, icon: Landmark },
    { id: ViewState.NEWS, label: t.menu.news, icon: Newspaper },
    { id: ViewState.BEACHES, label: t.menu.beaches, icon: Waves },
    { id: ViewState.SIGHTSEEING, label: t.menu.sightseeing, icon: Eye },
    { id: ViewState.ACTIVITIES, label: t.menu.activities, icon: Activity },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
  ];

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
        t={t}
      />
      
      <div className="relative z-[7000]">
        <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={(userData) => handleLogin('USER', userData)} onLoginSuperAdmin={() => handleLogin('ADMIN')} t={t} />
        <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleSearchNavigate} events={events} businesses={businesses} t={t} />
        <ShareModal isOpen={isShareOpen} onClose={() => setShareOpen(false)} data={shareData} t={t.share} />
      </div>
      
      <main className={`flex-1 w-full flex flex-col relative pt-20 ${currentView === ViewState.MAP ? 'h-[calc(100vh-80px)]' : ''} ${currentView === ViewState.AI_CHAT ? 'h-[calc(100vh-80px)] overflow-hidden' : ''}`}>
         {currentView === ViewState.HOME && (
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
                   <p className="text-white text-2xl max-w-md font-bold leading-tight mb-12 drop-shadow-lg">{t.hero.subtitle}</p>
                   <button onClick={() => handleNavigate(ViewState.AI_CHAT)} className="bg-white text-gray-900 px-12 py-6 rounded-[32px] font-black text-lg flex items-center gap-3 shadow-2xl hover:scale-105 transition-all">
                     <Sparkles size={24} className="text-blue-600" />
                     {t.menu.ai}
                   </button>
                 </div>
               </div>
             </div>
             
             <div className="max-w-5xl mx-auto px-6 space-y-24">
                <div className="flex justify-between items-center px-4">
                   <h3 className="font-black text-gray-900 text-4xl tracking-tighter">{t.common.nearby}</h3>
                   <button onClick={() => handleNavigate(ViewState.MAP)} className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-6 py-3 rounded-full">{t.common.fullMap}</button>
                </div>
                <div>
                   <h3 className="font-black text-gray-900 text-5xl tracking-tighter mb-4 px-4">{t.sections.tradition?.title}</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
                     {events.filter(e => e.isFestival).map((event) => (
                       <div key={event.id} onClick={() => handleSearchNavigate(ViewState.EVENTS, event.id)} className="bg-white rounded-[56px] shadow-2xl border border-gray-100 overflow-hidden cursor-pointer hover:-translate-y-4 transition-all duration-500 group">
                         <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                           <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
                         </div>
                         <div className="p-10">
                           <h4 className="font-black text-gray-900 text-3xl leading-none tracking-tighter mb-6">{event.title}</h4>
                           <div className="flex items-center gap-4 text-gray-400 font-black text-[11px] uppercase tracking-widest">
                             <Calendar size={18} className="text-blue-500" />
                             {event.date}
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
           </div>
         )}
         
         {currentView === ViewState.BEACHES && <BeachesView t={t} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} />}
         {currentView === ViewState.ACTIVITIES && <ActivitiesView t={t} />}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleSearchNavigate} businesses={businesses} />}
         {currentView === ViewState.DINING && <DiningView t={t} businesses={businesses} />}
         {currentView === ViewState.SHOPPING && (
            <ShoppingView t={t} businesses={businesses} highlightedBusinessId={selectedBusinessId} favorites={favorites} toggleFavorite={toggleFavorite} />
         )}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         {currentView === ViewState.NEWS && <NewsView t={t} />}
         {currentView === ViewState.EVENTS && (
           <EventsView t={t} events={events} onShare={(ev) => { setShareData({title: ev.title, text: ev.description, url: window.location.href}); setShareOpen(true); }} onAddToCalendar={() => {}} initialEventId={selectedEventId} myEvents={myEvents} toggleMyEvent={toggleMyEvent} />
         )}
         {currentView === ViewState.AI_CHAT && <AIChatView t={t} langCode={currentLang.code} onBack={() => handleNavigate(ViewState.HOME)} />}
         
         {currentView === ViewState.ADMIN && (
           <AdminDashboard 
             ads={ads} setAds={setAds} 
             events={events} setEvents={setEvents} 
             businesses={businesses} setBusinesses={setBusinesses}
             onLogout={handleLogout} 
             currentUserRole="SUPER_ADMIN" 
           />
         )}

         {currentView === ViewState.PROFILE && (
            <div className="p-6 md:p-12 pt-32 text-center space-y-12 animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto w-full">
                {isLoggedIn ? (
                    <div className="space-y-8">
                        <div className="w-48 h-48 mx-auto rounded-[60px] flex items-center justify-center shadow-2xl overflow-hidden border-8 border-white bg-blue-600 text-white">
                            {userAvatar ? <img src={userAvatar} className="w-full h-full object-cover" /> : <User size={96} />}
                        </div>
                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter">Hola, {userName}</h2>
                        <button onClick={handleLogout} className="w-full max-w-sm py-5 bg-red-50 text-red-600 rounded-[28px] font-black flex items-center justify-center gap-3 mx-auto">
                            <LogOut size={20} /> {t.auth.logout}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter">{t.menu.profile}</h2>
                        <button onClick={() => setLoginOpen(true)} className="w-full max-w-sm px-12 py-6 bg-blue-600 text-white rounded-[32px] font-black text-xl shadow-2xl mx-auto">
                           {t.auth.title}
                        </button>
                    </div>
                )}
            </div>
         )}
      </main>
      
      {currentView !== ViewState.ADMIN && <Footer t={t} />}
    </div>
  );
};
export default App;

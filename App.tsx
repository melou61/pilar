
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
import { translations } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS } from './data';

const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

const INITIAL_ADS: Ad[] = [
  { id: '1', clientName: 'Mesón El Puerto', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(languages[0]); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'USER' | 'ADMIN'>('USER');
  const [userName, setUserName] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [myEvents, setMyEvents] = useState<string[]>([]);
  const [ads, setAds] = useState<Ad[]>(INITIAL_ADS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [businesses, setBusinesses] = useState<CensusItem[]>(() => [
    ...COMMERCIAL_CENSUS.flatMap(c => c.items),
    ...DINING_CENSUS.flatMap(c => c.items)
  ]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const t = translations[currentLang.code] || translations.en;

  const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=format&fit=crop&w=2000&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length), 8000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (view: ViewState, id?: string) => {
    setCurrentView(view);
    setSidebarOpen(false);
    if (view === ViewState.EVENTS) setSelectedEventId(id || null);
    if (view === ViewState.SHOPPING) setSelectedBusinessId(id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('USER');
    setUserName('');
    handleNavigate(ViewState.HOME);
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
        onSearchClick={() => handleNavigate(ViewState.SEARCH)} 
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

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setLoginOpen(false)} 
        onLogin={(data) => handleLogin('USER', data)}
        onLoginSuperAdmin={() => handleLogin('ADMIN')}
        t={t}
      />
      
      <main className={`flex-1 w-full flex flex-col relative pt-20 ${currentView === ViewState.MAP ? 'h-[calc(100vh-80px)]' : ''}`}>
         {currentView === ViewState.HOME && (
           <HomeView 
             t={t} 
             events={events} 
             onNavigate={handleNavigate} 
             heroImages={heroImages} 
             currentHeroIndex={currentHeroIndex} 
           />
         )}
         
         {currentView === ViewState.BEACHES && <BeachesView t={t} onNavigate={handleNavigate} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} onNavigate={handleNavigate} />}
         {currentView === ViewState.ACTIVITIES && <ActivitiesView t={t} onNavigate={handleNavigate} />}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleNavigate} businesses={businesses} />}
         {currentView === ViewState.DINING && <DiningView t={t} businesses={businesses} />}
         {currentView === ViewState.SHOPPING && <ShoppingView t={t} businesses={businesses} highlightedBusinessId={selectedBusinessId} favorites={favorites} toggleFavorite={toggleFavorite} />}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         {currentView === ViewState.NEWS && <NewsView t={t} />}
         {currentView === ViewState.EVENTS && <EventsView t={t} events={events} onShare={() => {}} onAddToCalendar={() => {}} initialEventId={selectedEventId} myEvents={myEvents} toggleMyEvent={toggleMyEvent} />}
         {currentView === ViewState.AI_CHAT && <AIChatView t={t} langCode={currentLang.code} langLabel={currentLang.label} onBack={() => handleNavigate(ViewState.HOME)} />}
         {currentView === ViewState.SEARCH && <SearchView t={t} events={events} businesses={businesses} onNavigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} />}
         
         {currentView === ViewState.ADMIN && (
            <AdminDashboard 
              ads={ads} 
              setAds={setAds} 
              events={events} 
              setEvents={setEvents} 
              businesses={businesses} 
              setBusinesses={setBusinesses} 
              onLogout={handleLogout} 
              currentUserRole={userRole as AdminRole} 
            />
         )}

         {currentView === ViewState.PROFILE && (
            <div className="p-10 text-center animate-in fade-in duration-500">
               <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl font-black">
                 {userName.charAt(0)}
               </div>
               <h2 className="text-4xl font-black mb-4 tracking-tighter">Bienvenido, {userName}</h2>
               <p className="text-gray-500 font-medium mb-8">Aquí aparecerán tus favoritos y agenda personalizada.</p>
               <div className="flex justify-center gap-4">
                 <button onClick={() => handleNavigate(ViewState.HOME)} className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Volver al Inicio</button>
                 <button onClick={handleLogout} className="px-8 py-3 bg-red-50 text-red-600 rounded-2xl font-black uppercase tracking-widest border border-red-100">Salir</button>
               </div>
            </div>
         )}
      </main>
      
      {currentView !== ViewState.ADMIN && <Footer t={t} />}
    </div>
  );
};
export default App;

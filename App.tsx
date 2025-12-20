
// Full App component with state management and view routing
import React, { useState, useMemo, useEffect } from 'react';
import { ViewState, NavItem, Language, Ad, Event, AdminRole, Promotion } from './types';
import { 
  Home as HomeIcon, Newspaper, Waves, Eye, Activity, UtensilsCrossed, 
  ShoppingBag, Calendar, MessageSquare, MapIcon, Landmark 
} from './components/Icons';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { SearchModal } from './components/SearchModal';
import { NewsView } from './components/NewsView';
import { BeachesView } from './components/BeachesView';
import { SightseeingView } from './components/SightseeingView';
import { ActivitiesView } from './components/ActivitiesView';
import { DiningView } from './components/DiningView';
import { ShoppingView } from './components/ShoppingView';
import { CitizenServicesView } from './components/CitizenServicesView';
import { MapView } from './components/MapView';
import { AdminDashboard } from './components/AdminDashboard';
import { EventDetailView } from './components/EventDetailView';
import { translations } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS } from './data';
import { ShareModal } from './components/ShareModal';
import { BeaconModal } from './components/BeaconModal';

const App: React.FC = () => {
  // Navigation & View State
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [highlightedBusinessId, setHighlightedBusinessId] = useState<string | null>(null);
  
  // UI State
  const [langCode, setLangCode] = useState('es');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<AdminRole>('ADMIN_GENERAL');

  // Content State
  const [ads, setAds] = useState<Ad[]>([
    {
      id: 'ad-pilar-1',
      clientName: 'Visita Pilar',
      imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=40',
      linkUrl: 'https://www.visitpilardelahoradada.com',
      position: 'page-top',
      startDate: '2024-01-01',
      endDate: '2025-12-31',
      isActive: true
    }
  ]);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [beaconPromotions, setBeaconPromotions] = useState<Record<string, Promotion>>({});
  
  // Modal Payload States
  const [shareData, setShareData] = useState<{title: string, text: string, url: string} | null>(null);
  const [detectedBeaconShopId, setDetectedBeaconShopId] = useState<string | null>(null);

  // Internationalization
  const languages: Language[] = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const currentLang = languages.find(l => l.code === langCode) || languages[0];
  const t = translations[langCode as keyof typeof translations] || translations.en;

  const menuItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: HomeIcon },
    { id: ViewState.NEWS, label: t.menu.news, icon: Newspaper },
    { id: ViewState.BEACHES, label: t.menu.beaches, icon: Waves },
    { id: ViewState.SIGHTSEEING, label: t.menu.sightseeing, icon: Eye },
    { id: ViewState.ACTIVITIES, label: t.menu.activities, icon: Activity },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
    { id: ViewState.CITIZEN_SERVICES, label: 'Ayuntamiento', icon: Landmark },
    { id: ViewState.MAP, label: 'Mapa', icon: MapIcon },
    { id: ViewState.FORUM, label: t.menu.forum, icon: MessageSquare },
  ];

  const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2073&q=80', // Beach
    'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&w=1200&q=80', // Coast
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80', // Nature
  ];

  const handleNavigate = (view: ViewState, id?: string) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
    if (view === ViewState.EVENTS && id) setSelectedEventId(id);
    else setSelectedEventId(null);
    
    if (view === ViewState.SHOPPING && id) setHighlightedBusinessId(id);
    else setHighlightedBusinessId(null);
    
    window.scrollTo(0, 0);
  };

  const handleLogin = (role: AdminRole = 'ADMIN_GENERAL') => {
    setUserRole(role);
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    setCurrentView(ViewState.ADMIN);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView(ViewState.HOME);
  };

  // Logic to simulate beacon detection
  useEffect(() => {
     if (currentView === ViewState.HOME || currentView === ViewState.SHOPPING) {
        const timer = setTimeout(() => {
           if (!detectedBeaconShopId) {
              setDetectedBeaconShopId('confiteria-golosa');
           }
        }, 5000);
        return () => clearTimeout(timer);
     }
  }, [currentView, detectedBeaconShopId]);

  const renderView = () => {
    if (selectedEventId) {
      const event = events.find(e => e.id === selectedEventId);
      if (event) return (
        <EventDetailView 
          event={event} 
          onBack={() => setSelectedEventId(null)}
          onShare={(ev) => setShareData({title: ev.title, text: ev.description, url: window.location.href})}
          onAddToCalendar={() => alert("Evento añadido a tu calendario")}
          t={t}
        />
      );
    }

    switch (currentView) {
      case ViewState.NEWS: return <NewsView t={t} />;
      case ViewState.BEACHES: return <BeachesView t={t} />;
      case ViewState.SIGHTSEEING: return <SightseeingView t={t} />;
      case ViewState.ACTIVITIES: return <ActivitiesView t={t} />;
      case ViewState.DINING: return <DiningView t={t} />;
      case ViewState.SHOPPING: return <ShoppingView t={t} highlightedBusinessId={highlightedBusinessId} />;
      case ViewState.CITIZEN_SERVICES: return <CitizenServicesView t={t} />;
      case ViewState.MAP: return <MapView t={t} onNavigate={handleNavigate} />;
      case ViewState.ADMIN: 
        return (
          <AdminDashboard 
            ads={ads} setAds={setAds} 
            events={events} setEvents={setEvents} 
            onLogout={handleLogout} 
            currentUserRole={userRole}
            beaconPromotions={beaconPromotions}
            setBeaconPromotions={setBeaconPromotions}
          />
        );
      case ViewState.HOME:
      default:
        return (
          <div className="animate-in fade-in duration-500">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <img src={heroImages[0]} className="w-full h-full object-cover" alt="Hero" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-6">
                    <h2 className="text-4xl font-black text-white leading-tight mb-2 drop-shadow-lg">
                      Pilar de la <br />Horadada
                    </h2>
                    <p className="text-white/90 text-lg font-medium drop-shadow-md">{t.hero.subtitle}</p>
                </div>
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-4 gap-2 p-4 -mt-10 relative z-10">
                {[
                  { id: ViewState.BEACHES, icon: Waves, color: 'bg-blue-600', label: 'Playas' },
                  { id: ViewState.DINING, icon: UtensilsCrossed, color: 'bg-orange-500', label: 'Comer' },
                  { id: ViewState.ACTIVITIES, icon: Activity, color: 'bg-green-600', label: 'Golf' },
                  { id: ViewState.EVENTS, icon: Calendar, color: 'bg-purple-600', label: 'Fiestas' }
                ].map(act => (
                  <button key={act.id} onClick={() => handleNavigate(act.id)} className="flex flex-col items-center gap-1.5">
                    <div className={`${act.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transform active:scale-95 transition-transform`}>
                      <act.icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">{act.label}</span>
                  </button>
                ))}
            </div>

            {/* Preview Section */}
            <div className="px-4 py-8 space-y-12">
               <section>
                  <div className="flex justify-between items-end mb-4">
                     <h3 className="text-xl font-bold text-gray-900">{t.sections.events.title}</h3>
                     <button onClick={() => handleNavigate(ViewState.EVENTS)} className="text-blue-600 text-sm font-semibold">Ver todos</button>
                  </div>
                  <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-4 px-4 pb-4">
                     {events.slice(0, 3).map(e => (
                       <div key={e.id} onClick={() => handleNavigate(ViewState.EVENTS, e.id)} className="min-w-[280px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                          <img src={e.imageUrl} className="h-40 w-full object-cover" alt="" />
                          <div className="p-4">
                             <h4 className="font-bold text-gray-900 truncate">{e.title}</h4>
                             <p className="text-xs text-gray-500 mt-1">{e.date}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </section>
            </div>
          </div>
        );
    }
  };

  const detectedShop = useMemo(() => {
      if (!detectedBeaconShopId) return null;
      for (const cat of COMMERCIAL_CENSUS) {
          const s = cat.items.find(i => i.id === detectedBeaconShopId);
          if (s && s.promotion) return s;
      }
      return null;
  }, [detectedBeaconShopId]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
      <Header 
        onMenuClick={() => setIsSidebarOpen(true)}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoClick={() => handleNavigate(ViewState.HOME)}
        onSearchClick={() => setIsSearchModalOpen(true)}
        currentLang={currentLang}
        onLanguageChange={(l) => setLangCode(l.code)}
        languages={languages}
      />

      <main className="flex-1">
        {renderView()}
      </main>

      {currentView !== ViewState.ADMIN && <Footer t={t.footer} />}

      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        menuItems={menuItems}
        currentView={currentView}
        onNavigate={handleNavigate}
        ads={ads}
        title={t.menu.title}
        sponsoredText={t.common.sponsored}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => handleLogin('ADMIN_GENERAL')}
        onLoginSuperAdmin={() => handleLogin('SUPER_ADMIN')}
        t={t.auth}
      />

      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={handleNavigate}
        events={events}
        t={t}
      />

      {shareData && (
        <ShareModal 
          isOpen={!!shareData} 
          onClose={() => setShareData(null)} 
          data={shareData} 
          t={t.share}
        />
      )}

      {detectedShop && (
        <BeaconModal 
           isOpen={!!detectedShop} 
           onClose={() => setDetectedBeaconShopId(null)} 
           shop={detectedShop} 
        />
      )}
    </div>
  );
};

export default App;

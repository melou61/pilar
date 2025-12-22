
import React, { useState, useEffect } from 'react';
import { ViewState, NavItem, Ad, Event, Language, AdminRole, CensusItem } from './types';
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
import { translations, languages } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS } from './data';

const INITIAL_ADS: Ad[] = [
  { id: 'ad-1', clientName: 'Mesón El Puerto', position: 'menu-top', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true },
  { id: 'ad-2', clientName: 'Turismo Pilar', position: 'menu-bottom', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true },
  { id: 'ad-3', clientName: 'Modas Lucía', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true },
  { id: 'ad-4', clientName: 'Ferretería El Pilar', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true }
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
  const [businesses, setBusinesses] = useState<CensusItem[]>(() => {
    const base = [
      ...COMMERCIAL_CENSUS.flatMap(c => c.items),
      ...DINING_CENSUS.flatMap(c => c.items)
    ];
    return base.map(b => b.id === 's1' ? {
      ...b,
      promotion: {
        title: '¡Descuento Vecino!',
        description: 'Muestra esta pantalla en caja para un 10% de descuento directo.',
        proximityRange: 'NEAR' as const,
        frequencyPerDay: 1,
        maxDistanceMeters: 5,
        activeTimeMinutes: 30,
        discountCode: 'PILAR2025'
      }
    } : b);
  });
  
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ title: '', text: '', url: '' });
  
  // Beacon Simulation State
  const [activeBeaconShop, setActiveBeaconShop] = useState<CensusItem | null>(null);
  const [beaconsEnabled, setBeaconsEnabled] = useState(true);

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

  // Beacon Simulator
  useEffect(() => {
    if (beaconsEnabled && currentView === ViewState.HOME) {
      const timer = setTimeout(() => {
        const shopWithPromo = businesses.find(b => b.promotion);
        if (shopWithPromo) setActiveBeaconShop(shopWithPromo);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [currentView, beaconsEnabled, businesses]);

  const handleNavigate = (view: ViewState, id?: string) => {
    if (view === ViewState.ADMIN && userRole !== 'ADMIN') { setLoginOpen(true); return; }
    if (view === ViewState.PROFILE && !isLoggedIn) { setLoginOpen(true); return; }
    setCurrentView(view);
    setSidebarOpen(false);
    if (view === ViewState.EVENTS) setSelectedEventId(id || null);
    if (view === ViewState.SHOPPING) setSelectedBusinessId(id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems: NavItem[] = [
    { id: ViewState.HOME, label: t.menu.home, icon: Home },
    { id: ViewState.LENS, label: 'PH Lens', icon: Scan },
    { id: ViewState.AI_CHAT, label: t.menu.ai, icon: Sparkles },
    { id: ViewState.MAP, label: t.menu.map, icon: MapIcon },
    { id: ViewState.CITIZEN_SERVICES, label: t.menu.services, icon: Landmark },
    { id: ViewState.NEWS, label: t.menu.news, icon: Newspaper },
    { id: ViewState.BEACHES, label: t.menu.beaches, icon: Waves },
    { id: ViewState.SIGHTSEEING, label: t.menu.sightseeing, icon: Eye },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
  ];

  return (
    <div key={currentLang.code} className="min-h-screen flex flex-col bg-[#f8fafc] font-sans overflow-x-hidden">
      {currentView === ViewState.LENS && <PHLensView t={t} onBack={() => handleNavigate(ViewState.HOME)} />}
      
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
        onLogout={() => { setIsLoggedIn(false); setCurrentView(ViewState.HOME); }}
        t={t}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={() => { setIsLoggedIn(true); setLoginOpen(false); }} onLoginSuperAdmin={() => { setIsLoggedIn(true); setUserRole('ADMIN'); setLoginOpen(false); setCurrentView(ViewState.ADMIN); }} t={t} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} data={shareData} t={t.share} />
      
      {activeBeaconShop && (
        <BeaconModal isOpen={!!activeBeaconShop} onClose={() => setActiveBeaconShop(null)} shop={activeBeaconShop} />
      )}

      <main className={`flex-1 w-full flex flex-col relative pt-24 ${currentView === ViewState.MAP ? 'h-[calc(100vh-96px)]' : ''}`}>
         {currentView === ViewState.HOME && <HomeView t={t} events={events} onNavigate={handleNavigate} heroImages={heroImages} currentHeroIndex={currentHeroIndex} ads={ads} />}
         {currentView === ViewState.BEACHES && <BeachesView t={t} onNavigate={handleNavigate} ads={ads} />}
         {currentView === ViewState.SIGHTSEEING && <SightseeingView t={t} onNavigate={handleNavigate} ads={ads} />}
         {currentView === ViewState.ACTIVITIES && <ActivitiesView t={t} onNavigate={handleNavigate} ads={ads} />}
         {currentView === ViewState.MAP && <MapView t={t} onNavigate={handleNavigate} businesses={businesses} />}
         {currentView === ViewState.DINING && <DiningView t={t} businesses={businesses} ads={ads} />}
         {currentView === ViewState.SHOPPING && <ShoppingView t={t} businesses={businesses} highlightedBusinessId={selectedBusinessId} favorites={favorites} toggleFavorite={(id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])} ads={ads} />}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         {currentView === ViewState.NEWS && <NewsView t={t} />}
         {currentView === ViewState.EVENTS && <EventsView t={t} events={events} onShare={() => {}} onAddToCalendar={() => {}} initialEventId={selectedEventId} />}
         {currentView === ViewState.AI_CHAT && <AIChatView t={t} langCode={currentLang.code} langLabel={currentLang.label} onBack={() => handleNavigate(ViewState.HOME)} />}
         {currentView === ViewState.SEARCH && <SearchView t={t} events={events} businesses={businesses} onNavigate={handleNavigate} favorites={favorites} toggleFavorite={() => {}} />}
         {currentView === ViewState.POSTCARD && <PostcardCreator t={t} onBack={() => handleNavigate(ViewState.HOME)} />}
         {currentView === ViewState.FORUM && <ForumView t={t} />}
         {currentView === ViewState.PROFILE && <ProfileView userName={userName} onLogout={() => setIsLoggedIn(false)} onNavigate={handleNavigate} favorites={favorites} myEvents={myEvents} t={t} />}
         {currentView === ViewState.HEALTH && <HealthView t={t} onNavigate={handleNavigate} ads={ads} />}
         {currentView === ViewState.ADMIN && <AdminDashboard ads={ads} setAds={setAds} events={events} setEvents={setEvents} businesses={businesses} setBusinesses={setBusinesses} onLogout={() => setIsLoggedIn(false)} currentUserRole={userRole as AdminRole} />}
      </main>
      {currentView !== ViewState.ADMIN && currentView !== ViewState.POSTCARD && currentView !== ViewState.LENS && <Footer t={t} />}
    </div>
  );
};
export default App;

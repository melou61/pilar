
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
  { id: 'ad-1', clientName: 'Mesón El Puerto', position: 'menu-top', imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true, view: ViewState.SIDEBAR },
  { id: 'ad-2', clientName: 'Turismo Pilar', position: 'menu-bottom', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true, view: ViewState.SIDEBAR },
  { id: 'ad-3', clientName: 'Modas Lucía', position: 'page-top', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true, view: ViewState.HOME },
  { id: 'ad-4', clientName: 'Ferretería El Pilar', position: 'page-bottom', imageUrl: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1200&q=80', linkUrl: '#', startDate: '2024-01-01', endDate: '2025-12-31', isActive: true, view: ViewState.HOME }
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
    return [
      ...COMMERCIAL_CENSUS.flatMap(c => c.items),
      ...DINING_CENSUS.flatMap(c => c.items)
    ];
  });
  
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [shareData, setShareData] = useState({ title: '', text: '', url: '' });
  const [activeBeaconShop, setActiveBeaconShop] = useState<CensusItem | null>(null);
  const [beaconsEnabled, setBeaconsEnabled] = useState(true);

  const t = translations[currentLang.code] || translations.en;

  const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1520942702018-0862200e6873?auto=crop&w=2000&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length), 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (beaconsEnabled && currentView === ViewState.HOME) {
      const timer = setTimeout(() => {
        const shopWithPromo = businesses.find(b => b.promotion && b.promotion.title);
        if (shopWithPromo) setActiveBeaconShop(shopWithPromo);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [currentView, beaconsEnabled, businesses]);

  const handleNavigate = (view: ViewState, id?: string) => {
    setSidebarOpen(false);
    if (view === ViewState.ADMIN && userRole !== 'ADMIN') { setLoginOpen(true); return; }
    if (view === ViewState.PROFILE && !isLoggedIn) { setLoginOpen(true); return; }
    setCurrentView(view);
    if (view === ViewState.EVENTS) setSelectedEventId(id || null);
    if (view === ViewState.SHOPPING) setSelectedBusinessId(id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData?: { name: string, email: string }) => {
    if (userData) { setUserRole('USER'); setUserName(userData.name); }
    else { setUserRole('ADMIN'); setUserName('Administrador'); }
    setIsLoggedIn(true);
    setLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false); setUserRole('USER'); setUserName('');
    setCurrentView(ViewState.HOME); setSidebarOpen(false);
  };

  const toggleFavorite = (id: string) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  const toggleMyEvent = (id: string) => setMyEvents(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);

  const handleShare = (data: any) => {
    setShareData({ title: data.title || 'Pilar de la Horadada', text: data.description || '...', url: window.location.href });
    setIsShareOpen(true);
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
    { id: ViewState.ACTIVITIES, label: t.menu.activities, icon: Activity },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.HEALTH, label: t.menu.health, icon: Heart },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
    { id: ViewState.FORUM, label: t.menu.forum, icon: MessageSquare },
    { id: ViewState.ADMIN, label: t.menu.admin, icon: ShieldCheck },
  ];

  const isImmersiveView = [
    ViewState.HOME,
    ViewState.LENS, 
    ViewState.CITIZEN_SERVICES, 
    ViewState.AI_CHAT,
    ViewState.NEWS,
    ViewState.BEACHES,
    ViewState.SIGHTSEEING,
    ViewState.ACTIVITIES,
    ViewState.DINING,
    ViewState.SHOPPING,
    ViewState.EVENTS,
    ViewState.FORUM,
    ViewState.HEALTH,
    ViewState.SEARCH // Añadida la búsqueda a vistas inmersivas
  ].includes(currentView);

  const headerProps = {
    onMenuClick: () => setSidebarOpen(true),
    onLogoClick: () => handleNavigate(ViewState.HOME),
    onSearchClick: () => handleNavigate(ViewState.SEARCH),
    currentLang,
    onLanguageChange: setCurrentLang,
    languages,
    currentView,
    onNavigate: handleNavigate,
    t
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME: return <HomeView t={t} events={events} onNavigate={handleNavigate} heroImages={heroImages} currentHeroIndex={currentHeroIndex} ads={ads} headerProps={headerProps} />;
      case ViewState.NEWS: return <NewsView t={t} ads={ads} headerProps={headerProps} />;
      case ViewState.BEACHES: return <BeachesView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} />;
      case ViewState.SIGHTSEEING: return <SightseeingView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} />;
      case ViewState.ACTIVITIES: return <ActivitiesView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} />;
      case ViewState.DINING: return <DiningView t={t} businesses={businesses} ads={ads} headerProps={headerProps} />;
      case ViewState.SHOPPING: return <ShoppingView t={t} businesses={businesses} highlightedBusinessId={selectedBusinessId} favorites={favorites} toggleFavorite={toggleFavorite} ads={ads} headerProps={headerProps} />;
      case ViewState.HEALTH: return <HealthView t={t} onNavigate={handleNavigate} ads={ads} headerProps={headerProps} />;
      case ViewState.CITIZEN_SERVICES: return <CitizenServicesView t={t} ads={ads} onBack={() => handleNavigate(ViewState.HOME)} headerProps={headerProps} />;
      case ViewState.EVENTS: return <EventsView t={t} events={events} onShare={handleShare} onAddToCalendar={(e) => alert(t.common.addToCalendar)} initialEventId={selectedEventId} myEvents={myEvents} toggleMyEvent={toggleMyEvent} ads={ads} headerProps={headerProps} />;
      case ViewState.FORUM: return <ForumView t={t} ads={ads} headerProps={headerProps} />;
      case ViewState.MAP: return <MapView t={t} onNavigate={handleNavigate} businesses={businesses} ads={ads} />;
      case ViewState.AI_CHAT: return <AIChatView t={t} onBack={() => handleNavigate(ViewState.HOME)} langCode={currentLang.code} langLabel={currentLang.label} ads={ads} headerProps={headerProps} />;
      case ViewState.ADMIN: return <AdminDashboard ads={ads} setAds={setAds} events={events} setEvents={setEvents} businesses={businesses} setBusinesses={setBusinesses} onLogout={handleLogout} currentUserRole={userRole as any} />;
      case ViewState.PROFILE: return <ProfileView userName={userName} onLogout={handleLogout} onNavigate={handleNavigate} favorites={favorites} myEvents={myEvents} t={t} />;
      case ViewState.SEARCH: return <SearchView t={t} events={events} businesses={businesses} onNavigate={handleNavigate} favorites={favorites} toggleFavorite={toggleFavorite} ads={ads} headerProps={headerProps} />;
      case ViewState.POSTCARD: return <PostcardCreator t={t} onBack={() => handleNavigate(ViewState.HOME)} />;
      case ViewState.LENS: return <PHLensView t={t} onBack={() => handleNavigate(ViewState.HOME)} ads={ads} headerProps={headerProps} />;
      default: return <HomeView t={t} events={events} onNavigate={handleNavigate} heroImages={heroImages} currentHeroIndex={currentHeroIndex} ads={ads} headerProps={headerProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {activeBeaconShop && <BeaconModal isOpen={!!activeBeaconShop} onClose={() => setActiveBeaconShop(null)} shop={activeBeaconShop} />}
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} onLoginSuperAdmin={() => handleLogin()} t={t} />
      <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} data={shareData} t={t.share} />

      {!isImmersiveView && <Header {...headerProps} />}

      <Sidebar 
        isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} menuItems={menuItems} currentView={currentView} 
        onNavigate={handleNavigate} ads={ads} title={t.menu.title || 'PH App'} sponsoredText={t.common.sponsored} 
        isLoggedIn={isLoggedIn} onLogout={handleLogout} t={t} 
      />

      <main className={isImmersiveView ? "" : "pt-24 min-h-screen"}>
        {renderContent()}
      </main>

      {!isImmersiveView && <Footer t={t} />}
    </div>
  );
};

export default App;


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
import { BusinessDetailView } from './components/BusinessDetailView';
import { translations } from './translations';
import { MOCK_EVENTS, COMMERCIAL_CENSUS, DINING_CENSUS } from './data';

const languages: Language[] = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ca', label: 'Valencià', flag: '🚩' },
  { code: 'eu', label: 'Euskara', flag: '🇪🇺' },
  { code: 'gl', label: 'Galego', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'sv', label: 'Svenska', flag: '🇸🇪' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
  { code: 'da', label: 'Dansk', flag: '🇩🇰' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' },
  { code: 'el', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' },
  { code: 'hu', label: 'Magyar', flag: '🇭🇺' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'he', label: 'עברית', flag: '🇮🇱' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭' },
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'id', label: 'Indonesian', flag: '🇮🇩' },
  { code: 'ms', label: 'Malay', flag: '🇲🇾' },
  { code: 'tl', label: 'Tagalog', flag: '🇵🇭' },
  { code: 'sr', label: 'Srpski', flag: '🇷🇸' },
  { code: 'hr', label: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sk', label: 'Slovenčina', flag: '🇸🇰' },
  { code: 'sl', label: 'Slovenščina', flag: '🇸🇮' },
  { code: 'et', label: 'Eesti', flag: '🇪🇪' },
  { code: 'lv', label: 'Latviešu', flag: '🇱🇻' },
  { code: 'lt', label: 'Lietuvių', flag: '🇱🇹' },
  { code: 'bg', label: 'Български', flag: '🇧🇬' },
  { code: 'is', label: 'Íslenska', flag: '🇮🇸' },
  { code: 'ga', label: 'Gaeilge', flag: '🇮🇪' },
  { code: 'mt', label: 'Malti', flag: '🇲🇹' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ka', label: 'ქართული', flag: '🇬🇪' },
  { code: 'hy', label: 'Հայերեն', flag: '🇦🇲' },
  { code: 'az', label: 'Azərbaycanca', flag: '🇦🇿' },
  { code: 'kk', label: 'Қазақша', flag: '🇰🇿' },
  { code: 'uz', label: 'Oʻzbekcha', flag: '🇺🇿' },
  { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'af', label: 'Afrikaans', flag: '🇿🇦' },
  { code: 'sq', label: 'Shqip', flag: '🇦🇱' },
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
  
  // Auth & Profile States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'USER' | 'ADMIN'>('USER');
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');

  // Personalization States
  const [favorites, setFavorites] = useState<string[]>([]);
  const [myEvents, setMyEvents] = useState<string[]>([]);
  const [profileSubView, setProfileSubView] = useState<'main' | 'favorites' | 'events'>('main');

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Recuperar favoritos y agenda si ya existen
  useEffect(() => {
    const savedFavs = localStorage.getItem('pilar_favorites');
    const savedEvents = localStorage.getItem('pilar_agenda');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    if (savedEvents) setMyEvents(JSON.parse(savedEvents));
  }, []);

  // Guardar favoritos y agenda cuando cambien
  useEffect(() => {
    localStorage.setItem('pilar_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('pilar_agenda', JSON.stringify(myEvents));
  }, [myEvents]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    setSidebarOpen(false);
    setSelectedEventId(null);
    setSelectedBusinessId(null);
    setIsEditingProfile(false);
    setProfileSubView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('USER');
    setUserName('');
    setUserAvatar('');
    setEditName('');
    setEditAvatar('');
    setIsEditingProfile(false);
    handleNavigate(ViewState.HOME);
    setSidebarOpen(false);
  };

  const handleLogin = (role: 'USER' | 'ADMIN' = 'USER', userData?: {name: string, email: string}) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(userData?.name || (role === 'ADMIN' ? 'Administrador' : 'Usuario Pilar'));
    const storedAvatar = localStorage.getItem(`pilar_avatar_${userData?.email || 'admin'}`);
    setUserAvatar(storedAvatar || (role === 'ADMIN' ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80' : ''));
    setLoginOpen(false);
    if (role === 'ADMIN') {
        handleNavigate(ViewState.ADMIN);
    } else {
        handleNavigate(ViewState.PROFILE);
    }
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }
    setUserName(editName);
    setUserAvatar(editAvatar);
    const dbUser = localStorage.getItem('pilar_user_db');
    const email = dbUser ? JSON.parse(dbUser).email : 'admin';
    localStorage.setItem(`pilar_avatar_${email}`, editAvatar);
    setIsEditingProfile(false);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const toggleMyEvent = (id: string) => {
    setMyEvents(prev => prev.includes(id) ? prev.filter(eid => eid !== id) : [...prev, id]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen es demasiado grande. Máximo 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
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
    { id: ViewState.MAP, label: 'Mapa', icon: MapIcon },
    { id: ViewState.CITIZEN_SERVICES, label: 'Ayuntamiento', icon: Landmark },
    { id: ViewState.NEWS, label: t.menu.news, icon: Newspaper },
    { id: ViewState.BEACHES, label: t.menu.beaches, icon: Waves },
    { id: ViewState.SIGHTSEEING, label: t.menu.sightseeing, icon: Eye },
    { id: ViewState.ACTIVITIES, label: t.menu.activities, icon: Activity },
    { id: ViewState.DINING, label: t.menu.dining, icon: UtensilsCrossed },
    { id: ViewState.SHOPPING, label: t.menu.shopping, icon: ShoppingBag },
    { id: ViewState.EVENTS, label: t.menu.events, icon: Calendar },
  ];

  const allBusinesses = [...COMMERCIAL_CENSUS.flatMap(c => c.items), ...DINING_CENSUS.flatMap(c => c.items)];

  const renderProfileList = () => {
    if (profileSubView === 'favorites') {
      const favList = allBusinesses.filter(b => favorites.includes(b.id));
      return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setProfileSubView('main')} className="p-2 bg-gray-100 rounded-full text-gray-600"><ArrowLeft size={20}/></button>
            <h3 className="text-3xl font-black tracking-tighter">Mis Favoritos</h3>
          </div>
          {favList.length > 0 ? favList.map(biz => (
            <div 
                key={biz.id} 
                onClick={() => { setSelectedBusinessId(biz.id); setCurrentView(ViewState.SHOPPING); }}
                className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xl flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform"
            >
                <img src={biz.images[0]} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                <div className="flex-1 text-left">
                    <h4 className="font-black text-gray-900 leading-none">{biz.name}</h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">{biz.category}</span>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
            </div>
          )) : (
            <div className="py-20 text-gray-400">
               <Heart size={48} className="mx-auto mb-4 opacity-10" />
               <p>Aún no tienes sitios favoritos.</p>
            </div>
          )}
        </div>
      );
    }
    if (profileSubView === 'events') {
      const eventList = events.filter(e => myEvents.includes(e.id));
      return (
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setProfileSubView('main')} className="p-2 bg-gray-100 rounded-full text-gray-600"><ArrowLeft size={20}/></button>
            <h3 className="text-3xl font-black tracking-tighter">Mi Agenda</h3>
          </div>
          {eventList.length > 0 ? eventList.map(ev => (
            <div 
                key={ev.id} 
                onClick={() => { setSelectedEventId(ev.id); setCurrentView(ViewState.EVENTS); }}
                className="bg-white p-4 rounded-3xl border border-gray-100 shadow-xl flex items-center gap-4 cursor-pointer hover:scale-[1.02] transition-transform"
            >
                <img src={ev.imageUrl} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                <div className="flex-1 text-left">
                    <h4 className="font-black text-gray-900 leading-none">{ev.title}</h4>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 block">{ev.date}</span>
                </div>
                <ChevronRight size={20} className="text-gray-300" />
            </div>
          )) : (
            <div className="py-20 text-gray-400">
               <Calendar size={48} className="mx-auto mb-4 opacity-10" />
               <p>No tienes eventos en tu agenda.</p>
            </div>
          )}
        </div>
      );
    }
    return null;
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
              {t.hero.subtitle}
            </p>
            <div className="flex gap-4">
               <button onClick={() => handleNavigate(ViewState.AI_CHAT)} className="bg-white text-gray-900 px-12 py-6 rounded-[32px] font-black text-lg flex items-center gap-3 shadow-2xl hover:scale-105 transition-all">
                  <Sparkles size={24} className="text-blue-600" />
                  {t.menu.ai}
               </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        <div className="animate-in slide-in-from-bottom duration-1000">
           <div className="flex justify-between items-center mb-10 px-4">
              <h3 className="font-black text-gray-900 text-4xl tracking-tighter">Tu entorno</h3>
              <button onClick={() => handleNavigate(ViewState.MAP)} className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-6 py-3 rounded-full">Mapa Completo</button>
           </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-12 px-4">
            <div>
              <h3 className="font-black text-gray-900 text-5xl tracking-tighter mb-4">Tradición Viva</h3>
              <p className="text-gray-500 text-xl font-medium">Fiestas y charangas pilareras.</p>
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
          onLogin={(userData) => handleLogin('USER', userData)} 
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
         {currentView === ViewState.SHOPPING && (
            <ShoppingView 
                t={t} 
                highlightedBusinessId={selectedBusinessId} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
            />
         )}
         {currentView === ViewState.CITIZEN_SERVICES && <CitizenServicesView t={t} />}
         {currentView === ViewState.NEWS && <NewsView t={t} />}
         {currentView === ViewState.EVENTS && (
           <EventsView 
              t={t} 
              events={events} 
              onShare={(ev) => { setShareData({title: ev.title, text: ev.description, url: window.location.href}); setShareOpen(true); }} 
              onAddToCalendar={() => {}} 
              initialEventId={selectedEventId} 
              myEvents={myEvents}
              toggleMyEvent={toggleMyEvent}
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
            <div className="p-6 md:p-12 pt-32 text-center space-y-12 animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto w-full">
                {profileSubView !== 'main' ? renderProfileList() : (
                    <>
                        <div className="relative w-48 h-48 mx-auto group">
                        <div className={`w-full h-full rounded-[60px] flex items-center justify-center shadow-2xl overflow-hidden border-8 border-white ${!userAvatar && 'bg-blue-600 text-white'}`}>
                            {userAvatar ? (
                                <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User size={96} />
                            )}
                        </div>
                        {isLoggedIn && !isEditingProfile && (
                            <button 
                                onClick={() => {
                                    setEditName(userName);
                                    setEditAvatar(userAvatar);
                                    setIsEditingProfile(true);
                                }}
                                className="absolute -bottom-2 -right-2 w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all border border-blue-50"
                            >
                                <Camera size={24} />
                            </button>
                        )}
                        </div>

                        {isEditingProfile ? (
                        <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 text-left space-y-6 animate-in slide-in-from-bottom-4 duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                    <Edit3 size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Editar Perfil</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Tu Nombre</label>
                                    <input 
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-900 focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all"
                                        placeholder="Escribe tu nombre..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Cambiar Foto</label>
                                    <input 
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <div className="flex items-center gap-4">
                                        <button 
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex-1 px-6 py-4 bg-blue-50 text-blue-600 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-100 transition-all border border-blue-100 text-xs uppercase tracking-widest"
                                        >
                                            <ImageIcon size={18} />
                                            Subir Foto
                                        </button>
                                        {editAvatar && (
                                            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-white">
                                                <img src={editAvatar} className="w-full h-full object-cover" alt="Preview" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button 
                                    onClick={() => setIsEditingProfile(false)}
                                    className="flex-1 py-4 bg-gray-50 text-gray-400 font-black rounded-2xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleSaveProfile}
                                    className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                                >
                                    <Save size={18} />
                                    Guardar
                                </button>
                            </div>
                        </div>
                        ) : (
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                                    {isLoggedIn ? `Hola, ${userName}` : t.menu.profile}
                                </h2>
                                <p className="text-gray-500 max-w-sm mx-auto text-xl font-medium leading-tight">
                                    {isLoggedIn ? 'Bienvenido a tu rincón personal. Gestiona tus listas desde aquí.' : 'Inicia sesión para personalizar tu experiencia.'}
                                </p>
                            </div>

                            {isLoggedIn ? (
                                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                                    <button 
                                        onClick={() => {
                                            setEditName(userName);
                                            setEditAvatar(userAvatar);
                                            setIsEditingProfile(true);
                                        }}
                                        className="w-full py-5 bg-white border-2 border-blue-600 text-blue-600 rounded-[28px] font-black text-base shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Edit3 size={20} />
                                        Modificar Perfil
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full py-5 bg-red-50 text-red-600 rounded-[28px] font-black text-base shadow-sm hover:bg-red-100 transition-all flex items-center justify-center gap-3"
                                    >
                                        <LogOut size={20} />
                                        Cerrar Sesión
                                    </button>
                                </div>
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

                        {isLoggedIn && !isEditingProfile && (
                        <div className="grid grid-cols-2 gap-4 mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            <button 
                                onClick={() => setProfileSubView('favorites')}
                                className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-xl flex flex-col items-center hover:bg-blue-50 transition-colors"
                            >
                                <div className="text-3xl font-black text-blue-600">{favorites.length}</div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Favoritos</div>
                            </button>
                            <button 
                                onClick={() => setProfileSubView('events')}
                                className="bg-white p-6 rounded-[35px] border border-gray-100 shadow-xl flex flex-col items-center hover:bg-blue-50 transition-colors"
                            >
                                <div className="text-3xl font-black text-emerald-500">{myEvents.length}</div>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Agenda</div>
                            </button>
                        </div>
                        )}
                    </>
                )}
            </div>
         )}
      </main>
      
      {currentView !== ViewState.ADMIN && <Footer t={t.footer} />}
    </div>
  );
};
export default App;

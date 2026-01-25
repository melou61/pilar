
import React, { useState } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem, NewsItem, ViewState, LocalizedContent, ForumPost } from '../types';
import { 
  Trash2, Plus, Calendar, Image as ImageIcon, Save, X, 
  Zap, Tag, Edit3, ShoppingBag, Globe, MapPin, 
  Radar, ShieldCheck, Newspaper,
  Facebook, Instagram, Twitter, Video, Eye,
  Users, UserPlus, Shield, Lock, Settings2, Phone, Clock,
  MessageCircle, Rss, Link as LinkIcon, RefreshCw, ToggleLeft, ToggleRight, CheckCircle,
  BarChart3, MousePointer2, Layout, Filter, ArrowRight, Signal, Cpu, Wifi, Battery, Minus, MessageSquare
} from './Icons';
import { MOCK_NEWS, MOCK_FORUM_POSTS } from '../data';

interface AdminDashboardProps {
  ads: Ad[];
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  businesses: CensusItem[];
  setBusinesses: React.Dispatch<React.SetStateAction<CensusItem[]>>;
  admins: AdminUser[];
  setAdmins: React.Dispatch<React.SetStateAction<AdminUser[]>>;
  onLogout: () => void;
  currentUserRole: AdminRole;
}

// Tipos locales para Sync Sources
type SyncPlatform = 'FACEBOOK' | 'INSTAGRAM' | 'TWITTER' | 'RSS' | 'WHATSAPP' | 'TELEGRAM';

interface SyncSource {
  id: string;
  name: string;
  platform: SyncPlatform;
  status: 'ACTIVE' | 'INACTIVE';
  url: string;
  apiKey?: string;
  frequency: number; // minutos
  lastSync: string;
}

const MOCK_SOURCES: SyncSource[] = [
  { id: 's1', name: 'Ayuntamiento Facebook', platform: 'FACEBOOK', status: 'ACTIVE', url: 'https://facebook.com/pilardelahoradada', frequency: 60, lastSync: 'Hace 5 min' },
  { id: 's2', name: 'Turismo Instagram', platform: 'INSTAGRAM', status: 'ACTIVE', url: 'https://instagram.com/visitpilar', frequency: 120, lastSync: 'Hace 1 hora' },
  { id: 's3', name: 'Policía Local Alertas', platform: 'TWITTER', status: 'ACTIVE', url: 'https://twitter.com/policiapilar', frequency: 15, lastSync: 'Hace 2 min' },
  { id: 's4', name: 'Bando WhatsApp Vecinos', platform: 'WHATSAPP', status: 'INACTIVE', url: 'chat.whatsapp.com/...', frequency: 240, lastSync: 'Ayer' }
];

// Mapa de traducción para las Vistas (Páginas)
const viewStateLabels: Record<string, string> = {
  HOME: 'Inicio',
  NEWS: 'Noticias',
  BEACHES: 'Playas',
  SIGHTSEEING: 'Patrimonio',
  ACTIVITIES: 'Experiencias',
  DINING: 'Gastronomía',
  SHOPPING: 'Tiendas',
  HEALTH: 'Salud',
  SERVICES: 'Servicios',
  EVENTS: 'Eventos',
  FORUM: 'Foro',
  CITIZEN_SERVICES: 'Sede Electrónica',
  MAP: 'Mapa',
  CONTACT: 'Contacto',
  ADMIN: 'Admin',
  AI_CHAT: 'Chat IA',
  PROFILE: 'Perfil',
  SEARCH: 'Buscador',
  POSTCARD: 'Postales',
  LENS: 'PH Lens',
  SIDEBAR: 'Menú Lateral'
};

const LANGUAGES_CONFIG = ['es', 'en', 'fr', 'de', 'it'];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    ads, setAds, events, setEvents, businesses, setBusinesses, admins, setAdmins, onLogout, currentUserRole
}) => {
  const [activeTab, setActiveTab] = useState<'businesses' | 'news' | 'ads' | 'beacons' | 'team' | 'forum'>('businesses');
  
  // Estado para Sync Sources
  const [syncSources, setSyncSources] = useState<SyncSource[]>(MOCK_SOURCES);
  const [currentSource, setCurrentSource] = useState<Partial<SyncSource>>({});

  // Estado para Forum
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);

  // Estados de Edición Generales
  const [editMode, setEditMode] = useState<'none' | 'biz' | 'news' | 'ad' | 'beacon' | 'admin' | 'source'>('none');
  
  // Formularios
  const [currentBiz, setCurrentBiz] = useState<Partial<CensusItem>>({});
  const [currentAdmin, setCurrentAdmin] = useState<Partial<AdminUser>>({});
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({});
  
  // Beacon State
  const [editingBeaconId, setEditingBeaconId] = useState<string | null>(null);
  const [beaconLangTab, setBeaconLangTab] = useState<string>('es');

  // Lógica de Permisos por Rol (RBAC)
  const isSuperAdmin = currentUserRole === 'SUPER_ADMIN';
  
  const canAccessTab = (tab: string) => {
    if (isSuperAdmin) return true;
    switch (currentUserRole) {
      case 'ADMIN_GENERAL': return ['businesses', 'news', 'ads', 'forum'].includes(tab);
      case 'ADMIN_COMMERCE': return ['businesses', 'beacons'].includes(tab);
      case 'ADMIN_CULTURE': return ['news', 'events'].includes(tab);
      case 'ADMIN_SPORTS': return ['news'].includes(tab);
      case 'EDITOR_CONTENT': return ['news', 'forum'].includes(tab);
      case 'EDITOR_NEWS': return ['news'].includes(tab);
      case 'EDITOR_FORUM': return ['forum'].includes(tab);
      default: return false;
    }
  };

  const getRoleBadgeColor = (role: AdminRole) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ADMIN_GENERAL': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ADMIN_COMMERCE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ADMIN_CULTURE': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'EDITOR_CONTENT': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'EDITOR_NEWS': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'EDITOR_FORUM': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const roleLabels: Record<AdminRole, string> = {
    SUPER_ADMIN: 'Super Administrador (Total)',
    ADMIN_GENERAL: 'Administrador General',
    ADMIN_COMMERCE: 'Admin Comercio & Beacons',
    ADMIN_CULTURE: 'Admin Cultura & Eventos',
    ADMIN_SPORTS: 'Admin Deportes',
    EDITOR_CONTENT: 'Editor General (Noticias + Foro)',
    EDITOR_NEWS: 'Editor de Noticias',
    EDITOR_FORUM: 'Administrador de Foros'
  };

  // --- HANDLERS COMERCIOS ---
  const saveBiz = () => {
    // Si estamos editando un beacon dentro de un comercio, la lógica es diferente
    if (activeTab === 'beacons' && editingBeaconId) {
        setBusinesses(prev => prev.map(b => b.id === editingBeaconId ? { ...b, promotion: currentBiz.promotion } : b));
        setEditMode('none');
        setEditingBeaconId(null);
        return;
    }

    const item = {
      ...currentBiz,
      id: currentBiz.id || `biz-${Date.now()}`,
      rating: currentBiz.rating || 5.0,
      reviewCount: currentBiz.reviewCount || 0,
      images: currentBiz.images && currentBiz.images.length > 0 ? currentBiz.images : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800'],
      hours: currentBiz.hours || { weekdays: '09:00 - 14:00', weekend: 'Cerrado' }
    } as CensusItem;

    if (currentBiz.id) {
      setBusinesses(prev => prev.map(b => b.id === item.id ? item : b));
    } else {
      setBusinesses(prev => [item, ...prev]);
    }
    setEditMode('none');
  };

  const deleteBiz = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este comercio del censo?')) {
      setBusinesses(prev => prev.filter(b => b.id !== id));
      setEditMode('none');
    }
  };

  // --- HANDLERS SYNC SOURCES ---
  const toggleSourceStatus = (id: string) => {
    setSyncSources(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : s));
  };

  const saveSource = () => {
    const item = {
      ...currentSource,
      id: currentSource.id || `sync-${Date.now()}`,
      lastSync: currentSource.lastSync || 'Pendiente',
      status: currentSource.status || 'ACTIVE'
    } as SyncSource;

    if (currentSource.id) {
      setSyncSources(prev => prev.map(s => s.id === item.id ? item : s));
    } else {
      setSyncSources(prev => [...prev, item]);
    }
    setEditMode('none');
  };

  const deleteSource = (id: string) => {
    if (window.confirm('¿Eliminar esta fuente de sincronización?')) {
      setSyncSources(prev => prev.filter(s => s.id !== id));
      setEditMode('none');
    }
  };

  const getPlatformIcon = (p: SyncPlatform) => {
    switch(p) {
      case 'FACEBOOK': return <Facebook className="text-blue-600" />;
      case 'INSTAGRAM': return <Instagram className="text-pink-600" />;
      case 'TWITTER': return <Twitter className="text-sky-500" />;
      case 'WHATSAPP': return <MessageCircle className="text-green-500" />;
      case 'RSS': return <Rss className="text-orange-500" />;
      default: return <Globe className="text-gray-500" />;
    }
  };

  // --- HANDLERS BEACONS ---
  const toggleBeaconStatus = (bizId: string) => {
    setBusinesses(prev => prev.map(b => {
        if (b.id === bizId && b.promotion) {
            return { ...b, promotion: { ...b.promotion, isActive: !b.promotion.isActive } };
        }
        return b;
    }));
  };

  const createBeacon = (bizId: string) => {
      // Iniciar un beacon por defecto para un negocio que no tiene
      const defaultBeacon: Promotion = {
          isActive: false,
          range: 'NEAR',
          maxDistanceMeters: 20,
          frequencyRules: { maxPerHour: 1, maxPerDay: 3, maxPerWeek: 7 },
          multilingualContent: {
              es: { title: '¡Bienvenido!', description: 'Oferta especial cercana.' },
              en: { title: 'Welcome!', description: 'Special offer nearby.' }
          },
          hardwareId: `BEACON-${Math.floor(Math.random()*10000)}`
      };
      
      setBusinesses(prev => prev.map(b => b.id === bizId ? { ...b, promotion: defaultBeacon } : b));
      // Luego abrir editor
      const biz = businesses.find(b => b.id === bizId);
      if (biz) {
          setCurrentBiz({ ...biz, promotion: defaultBeacon });
          setEditingBeaconId(bizId);
          setEditMode('beacon');
      }
  };

  const updateBeaconContent = (lang: string, field: 'title' | 'description', value: string) => {
      if (!currentBiz.promotion) return;
      
      const newContent = { 
          ...currentBiz.promotion.multilingualContent,
          [lang]: {
              ...(currentBiz.promotion.multilingualContent?.[lang] || { title: '', description: '' }),
              [field]: value
          }
      };

      setCurrentBiz({
          ...currentBiz,
          promotion: {
              ...currentBiz.promotion,
              multilingualContent: newContent
          }
      });
  };

  const updateFrequency = (type: 'maxPerHour' | 'maxPerDay' | 'maxPerWeek', increment: boolean) => {
      if (!currentBiz.promotion?.frequencyRules) return;
      
      const currentValue = currentBiz.promotion.frequencyRules[type];
      const newValue = increment ? currentValue + 1 : Math.max(1, currentValue - 1);

      setCurrentBiz({
          ...currentBiz,
          promotion: {
              ...currentBiz.promotion,
              frequencyRules: {
                  ...currentBiz.promotion.frequencyRules,
                  [type]: newValue
              }
          }
      });
  };

  // --- HANDLERS ADS ---
  const saveAd = () => {
    const item = {
      ...currentAd,
      id: currentAd.id || `ad-${Date.now()}`,
      isActive: currentAd.isActive !== undefined ? currentAd.isActive : true,
      impressions: currentAd.impressions || 0,
      clicks: currentAd.clicks || 0,
      position: currentAd.position || 'page-top',
      view: currentAd.view || ViewState.HOME,
      startDate: currentAd.startDate || new Date().toISOString().split('T')[0],
      endDate: currentAd.endDate || new Date(new Date().getFullYear() + 1, 0, 1).toISOString().split('T')[0]
    } as Ad;

    if (currentAd.id) {
        setAds(prev => prev.map(a => a.id === item.id ? item : a));
    } else {
        setAds(prev => [...prev, item]);
    }
    setEditMode('none');
  };

  const deleteAd = (id: string) => {
      if(window.confirm('¿Borrar este anuncio permanentemente?')) {
          setAds(prev => prev.filter(a => a.id !== id));
          setEditMode('none');
      }
  };

  const toggleAdStatus = (id: string) => {
      setAds(prev => prev.map(a => a.id === id ? {...a, isActive: !a.isActive} : a));
  };

  // --- HANDLERS ADMINS ---
  const saveAdmin = () => {
    const item = {
      ...currentAdmin,
      id: currentAdmin.id || `adm-${Date.now()}`,
      createdAt: currentAdmin.createdAt || new Date().toISOString().split('T')[0],
      active: true,
      lastSeen: 'Nunca'
    } as AdminUser;
    
    if (currentAdmin.id) setAdmins(prev => prev.map(a => a.id === item.id ? item : a));
    else setAdmins(prev => [...prev, item]);
    setEditMode('none');
  };

  // --- HANDLERS FORUM ---
  const deletePost = (id: string) => {
    if (window.confirm('¿Eliminar esta publicación del foro permanentemente?')) {
      setForumPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  // Listas para desplegables
  const categories = ['Alimentación', 'Moda', 'Hogar', 'Salud y belleza', 'Hostelería y restauración', 'Motor', 'Servicios municipales y otros servicios'];
  const zones = ['CENTRO', 'LA_TORRE', 'MIL_PALMERAS', 'CAMPOVERDE', 'EL_MOJON'];

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-900 pb-40">
      
      {/* HEADER TÉCNICO */}
      <header className="bg-[#0f172a] p-8 text-white shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg rotate-3">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">PH Master Control</h1>
            <p className="text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mt-2 italic">Dashboard: {roleLabels[currentUserRole]}</p>
          </div>
        </div>
        <button onClick={onLogout} className="px-6 py-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-red-600/20">
          Cerrar Sistema
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* TABS DE ACCIÓN DINÁMICAS POR ROL */}
        <nav className="flex gap-2 bg-white p-2 rounded-[28px] shadow-xl border border-slate-200 overflow-x-auto no-scrollbar">
          {[
            { id: 'businesses', label: 'Censo Comercial', icon: ShoppingBag },
            { id: 'news', label: 'Sync News', icon: Globe },
            { id: 'forum', label: 'Moderar Foro', icon: MessageSquare },
            { id: 'ads', label: 'Publicidad Pro', icon: Tag },
            { id: 'beacons', label: 'Red Beacons', icon: Radar },
            { id: 'team', label: 'Equipo PH', icon: Users, restricted: true }
          ].filter(tab => !tab.restricted || isSuperAdmin).filter(tab => canAccessTab(tab.id)).map(tab => (
            <button 
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setEditMode('none'); }}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="animate-in fade-in duration-500">
          
          {/* 1. SECCIÓN BEACONS (REDISEÑADA) */}
          {activeTab === 'beacons' && canAccessTab('beacons') && (
            <div className="space-y-8">
                {editMode === 'beacon' ? (
                    // --- FORMULARIO DE CONFIGURACIÓN BEACON ---
                    <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 ${currentBiz.promotion?.isActive ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'} rounded-2xl flex items-center justify-center`}>
                                    <Radar size={32} className={currentBiz.promotion?.isActive ? 'animate-pulse' : ''} />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900 tracking-tighter">Configuración Beacon</h3>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                        Dispositivo en: {currentBiz.name}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setEditMode('none')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"><X /></button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                            {/* Columna Izquierda: Configuración Técnica */}
                            <div className="space-y-8">
                                <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest border-b border-blue-100 pb-2 flex items-center gap-2">
                                    <Cpu size={16} /> Hardware & Cobertura
                                </h4>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">UUID / ID Hardware</label>
                                        <input 
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-mono text-xs font-bold outline-none" 
                                            value={currentBiz.promotion?.hardwareId || ''}
                                            onChange={e => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, hardwareId: e.target.value}})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Estado</label>
                                        <button 
                                            onClick={() => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, isActive: !currentBiz.promotion?.isActive}})}
                                            className={`w-full p-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${currentBiz.promotion?.isActive ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-200 text-gray-500'}`}
                                        >
                                            {currentBiz.promotion?.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                            {currentBiz.promotion?.isActive ? 'EMITIENDO' : 'APAGADO'}
                                        </button>
                                    </div>
                                </div>

                                {/* Slider de Distancia Visual */}
                                <div className="space-y-4 bg-slate-50 p-6 rounded-[30px] border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-2"><Wifi size={14} /> Alcance de Señal</label>
                                        <span className="text-xl font-black text-blue-600">{currentBiz.promotion?.maxDistanceMeters || 20}m</span>
                                    </div>
                                    
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="100" 
                                        value={currentBiz.promotion?.maxDistanceMeters || 20} 
                                        onChange={(e) => {
                                            const val = parseInt(e.target.value);
                                            let rangeType: 'IMMEDIATE' | 'NEAR' | 'FAR' = 'FAR';
                                            if (val <= 5) rangeType = 'IMMEDIATE';
                                            else if (val <= 30) rangeType = 'NEAR';
                                            
                                            setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, maxDistanceMeters: val, range: rangeType}});
                                        }}
                                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    
                                    {/* Visual Radar Feedback */}
                                    <div className="h-24 relative flex items-center justify-center mt-6 overflow-hidden rounded-2xl bg-white border border-gray-100">
                                        <div className="absolute inset-0 grid grid-cols-10 opacity-10">
                                            {[...Array(10)].map((_, i) => <div key={i} className="border-r border-gray-400 h-full"></div>)}
                                        </div>
                                        <div className="absolute w-4 h-4 bg-black rounded-full z-10 shadow-xl"></div>
                                        <div 
                                            className={`absolute rounded-full transition-all duration-300 opacity-30 ${
                                                (currentBiz.promotion?.maxDistanceMeters || 20) <= 5 ? 'bg-red-500' :
                                                (currentBiz.promotion?.maxDistanceMeters || 20) <= 30 ? 'bg-blue-500' : 'bg-green-500'
                                            }`}
                                            style={{
                                                width: `${(currentBiz.promotion?.maxDistanceMeters || 20) * 2}%`,
                                                height: `${(currentBiz.promotion?.maxDistanceMeters || 20) * 4}%`, // Visual approximation
                                                maxWidth: '100%',
                                                maxHeight: '100%'
                                            }}
                                        ></div>
                                        <span className="absolute bottom-1 right-2 text-[8px] font-black uppercase text-gray-300">{currentBiz.promotion?.range}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-gray-50">
                                    <h4 className="text-xs font-black text-orange-600 uppercase tracking-widest border-b border-orange-100 pb-2 flex items-center gap-2">
                                        <Clock size={16} /> Frecuencia (Límite Envío)
                                    </h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {['maxPerHour', 'maxPerDay', 'maxPerWeek'].map((type) => {
                                            const label = type === 'maxPerHour' ? 'Hora' : type === 'maxPerDay' ? 'Día' : 'Semana';
                                            return (
                                                <div key={type} className="bg-orange-50 p-3 rounded-2xl text-center border border-orange-100">
                                                    <span className="text-[8px] font-black text-orange-400 uppercase block mb-2">{label}</span>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => updateFrequency(type as any, false)} className="w-6 h-6 bg-white rounded-full text-orange-600 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><Minus size={12} /></button>
                                                        <span className="text-lg font-black text-gray-800 w-6">{currentBiz.promotion?.frequencyRules?.[type as keyof typeof currentBiz.promotion.frequencyRules]}</span>
                                                        <button onClick={() => updateFrequency(type as any, true)} className="w-6 h-6 bg-white rounded-full text-orange-600 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"><Plus size={12} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha: Contenido Visual & Preview */}
                            <div className="space-y-6">
                                <div className="flex items-center justify-between border-b border-purple-100 pb-2 mb-4">
                                    <h4 className="text-xs font-black text-purple-600 uppercase tracking-widest flex items-center gap-2">
                                        <Globe size={16} /> Contenido Visual
                                    </h4>
                                    <div className="flex gap-1">
                                        {LANGUAGES_CONFIG.map(lang => (
                                            <button 
                                                key={lang} 
                                                onClick={() => setBeaconLangTab(lang)}
                                                className={`w-8 h-8 rounded-lg font-black text-[10px] uppercase transition-all ${beaconLangTab === lang ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-6 items-start">
                                    {/* Editor Form */}
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Imagen Promoción (URL)</label>
                                            <div className="flex gap-2">
                                                <input 
                                                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-xs outline-none" 
                                                    placeholder="https://..."
                                                    value={currentBiz.promotion?.imageUrl || ''}
                                                    onChange={e => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, imageUrl: e.target.value}})}
                                                />
                                                <button 
                                                    onClick={() => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, imageUrl: currentBiz.images?.[0] || ''}})}
                                                    className="p-3 bg-gray-100 rounded-xl text-gray-500 hover:bg-gray-200"
                                                    title="Usar imagen del comercio"
                                                >
                                                    <ImageIcon size={16} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-purple-400 uppercase ml-2">Título ({beaconLangTab.toUpperCase()})</label>
                                            <input 
                                                className="w-full p-4 bg-white border border-purple-100 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-purple-200" 
                                                placeholder="Título..."
                                                value={currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.title || ''}
                                                onChange={e => updateBeaconContent(beaconLangTab, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-purple-400 uppercase ml-2">Mensaje ({beaconLangTab.toUpperCase()})</label>
                                            <textarea 
                                                className="w-full p-4 bg-white border border-purple-100 rounded-2xl font-medium outline-none focus:ring-2 focus:ring-purple-200 h-24 resize-none" 
                                                placeholder="Descripción..."
                                                value={currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.description || ''}
                                                onChange={e => updateBeaconContent(beaconLangTab, 'description', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Código Descuento</label>
                                            <input 
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-mono text-center font-black tracking-widest uppercase outline-none" 
                                                placeholder="SALE2026"
                                                value={currentBiz.promotion?.discountCode || ''}
                                                onChange={e => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, discountCode: e.target.value}})}
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile Preview */}
                                    <div className="w-48 shrink-0 hidden md:block">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block text-center">Live Preview</label>
                                        <div className="bg-black rounded-[24px] p-2 shadow-2xl border-4 border-gray-800 relative">
                                            {/* Notch */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-xl z-20"></div>
                                            
                                            {/* Screen Content */}
                                            <div className="bg-white rounded-[18px] overflow-hidden h-80 flex flex-col relative">
                                                {/* Header Mock */}
                                                <div className="bg-blue-600 h-16 w-full flex items-center justify-center pt-4">
                                                    <Zap size={16} className="text-white fill-current" />
                                                </div>
                                                
                                                {/* Card Mock */}
                                                <div className="p-3 -mt-6 relative z-10">
                                                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 pb-4">
                                                        <div className="h-20 bg-gray-200">
                                                            <img 
                                                                src={currentBiz.promotion?.imageUrl || currentBiz.images?.[0] || ''} 
                                                                className="w-full h-full object-cover" 
                                                                alt="Preview"
                                                            />
                                                        </div>
                                                        <div className="p-2 text-center">
                                                            <h5 className="font-black text-[10px] text-gray-900 leading-tight mb-1">
                                                                {currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.title || 'Título'}
                                                            </h5>
                                                            <p className="text-[8px] text-gray-500 leading-tight line-clamp-3">
                                                                {currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.description || 'Descripción...'}
                                                            </p>
                                                            {currentBiz.promotion?.discountCode && (
                                                                <div className="mt-2 bg-blue-50 text-blue-600 text-[8px] font-black py-1 rounded border border-blue-100 border-dashed">
                                                                    {currentBiz.promotion.discountCode}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                            <button onClick={saveBiz} className="bg-[#0f172a] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center gap-3 shadow-xl">
                                <Save size={18} /> Guardar Configuración
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- LISTADO DE BEACONS ---
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100 gap-4">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200 text-white"><Radar size={28}/></div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Red de Beacons</h2>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">
                                        {businesses.filter(b => b.promotion).length} Dispositivos Configurados
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {/* Listado de comercios con o sin beacons */}
                            {businesses.map(biz => {
                                const hasBeacon = !!biz.promotion;
                                const isActive = biz.promotion?.isActive;

                                return (
                                    <div key={biz.id} className={`bg-white p-6 rounded-[30px] border flex items-center gap-6 transition-all group ${hasBeacon ? (isActive ? 'border-emerald-200 shadow-lg' : 'border-gray-200 opacity-80') : 'border-dashed border-gray-200 opacity-60 hover:opacity-100'}`}>
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${hasBeacon ? (isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400') : 'bg-slate-50 text-slate-300'}`}>
                                            {hasBeacon ? <Signal size={28} className={isActive ? 'animate-pulse' : ''} /> : <Plus size={24} />}
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-black text-slate-900 text-lg tracking-tight truncate">{biz.name}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                                    <MapPin size={10} /> {biz.address}
                                                </span>
                                                {hasBeacon && (
                                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                        {isActive ? 'Activo' : 'Inactivo'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {hasBeacon && (
                                            <div className="hidden md:flex gap-4 text-xs font-mono text-slate-400">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[8px] uppercase font-bold text-slate-300">ID</span>
                                                    <span>{biz.promotion?.hardwareId?.substring(0, 6)}...</span>
                                                </div>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-[8px] uppercase font-bold text-slate-300">Dist.</span>
                                                    <span>{biz.promotion?.maxDistanceMeters || 20}m</span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3">
                                            {hasBeacon ? (
                                                <>
                                                    <button 
                                                        onClick={() => toggleBeaconStatus(biz.id)}
                                                        className={`p-3 rounded-xl transition-all ${isActive ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'}`}
                                                    >
                                                        {isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                                    </button>
                                                    <button 
                                                        onClick={() => { setCurrentBiz(biz); setEditingBeaconId(biz.id); setEditMode('beacon'); }}
                                                        className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all shadow-lg"
                                                    >
                                                        <Settings2 size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    onClick={() => createBeacon(biz.id)}
                                                    className="bg-blue-50 text-blue-600 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                                                >
                                                    <Plus size={14} /> Asignar Beacon
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
          )}

          {/* 1. SECCIÓN PUBLICIDAD (RENOVADA) */}
          {activeTab === 'ads' && canAccessTab('ads') && (
            <div className="space-y-8">
                
                {/* Métricas Generales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Tag size={24} /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ads Activos</p>
                            <p className="text-2xl font-black text-slate-900">{ads.filter(a => a.isActive).length} / {ads.length}</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center"><Eye size={24} /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Impresiones Totales</p>
                            <p className="text-2xl font-black text-slate-900">{(ads.reduce((acc, curr) => acc + (curr.impressions || 0), 0) / 1000).toFixed(1)}k</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center"><MousePointer2 size={24} /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Clicks Totales</p>
                            <p className="text-2xl font-black text-slate-900">{ads.reduce((acc, curr) => acc + (curr.clicks || 0), 0)}</p>
                        </div>
                    </div>
                </div>

                {editMode === 'ad' ? (
                    // --- FORMULARIO DE EDICIÓN DE ANUNCIO ---
                    <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
                                    {currentAd.id ? 'Modificar Anuncio' : 'Nueva Campaña Publicitaria'}
                                </h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                                    Configuración de visibilidad y contrato
                                </p>
                            </div>
                            <button onClick={() => setEditMode('none')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"><X /></button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest border-b border-blue-100 pb-2 mb-4">Creatividad</h4>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Cliente / Anunciante</label>
                                    <input className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" placeholder="Ej: Restaurante El Puerto" value={currentAd.clientName || ''} onChange={e => setCurrentAd({...currentAd, clientName: e.target.value})} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">URL Imagen (Banner)</label>
                                    <div className="flex gap-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border">
                                            {currentAd.imageUrl ? <img src={currentAd.imageUrl} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-gray-400" />}
                                        </div>
                                        <input className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none text-xs" placeholder="https://..." value={currentAd.imageUrl || ''} onChange={e => setCurrentAd({...currentAd, imageUrl: e.target.value})} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Enlace de Destino</label>
                                    <div className="flex gap-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"><LinkIcon size={20} /></div>
                                        <input className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none text-xs" placeholder="https://..." value={currentAd.linkUrl || ''} onChange={e => setCurrentAd({...currentAd, linkUrl: e.target.value})} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-xs font-black text-purple-600 uppercase tracking-widest border-b border-purple-100 pb-2 mb-4">Segmentación y Contrato</h4>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Página (Vista)</label>
                                        <select 
                                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none text-sm" 
                                            value={currentAd.view || 'HOME'} 
                                            onChange={e => setCurrentAd({...currentAd, view: e.target.value as ViewState})}
                                        >
                                            {Object.values(ViewState).map(v => (
                                                <option key={v} value={v}>
                                                    {viewStateLabels[v] || v}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Posición</label>
                                        <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none text-sm" value={currentAd.position || 'page-top'} onChange={e => setCurrentAd({...currentAd, position: e.target.value as any})}>
                                            <option value="page-top">Superior (Page Top)</option>
                                            <option value="page-bottom">Inferior (Page Bottom)</option>
                                            <option value="menu-top">Menú (Arriba)</option>
                                            <option value="menu-bottom">Menú (Abajo)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Filtro Contextual (Opcional)</label>
                                    <div className="flex gap-2">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"><Filter size={20} /></div>
                                        <input className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" placeholder="Ej: 'Hostelería' (déjalo vacío para todos)" value={currentAd.filterContext || ''} onChange={e => setCurrentAd({...currentAd, filterContext: e.target.value})} />
                                    </div>
                                    <p className="text-[9px] text-gray-400 ml-2">Útil para mostrar anuncios solo cuando se selecciona una categoría específica en Mapa o Tiendas.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Inicio Contrato</label>
                                        <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" value={currentAd.startDate || ''} onChange={e => setCurrentAd({...currentAd, startDate: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Fin Contrato</label>
                                        <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" value={currentAd.endDate || ''} onChange={e => setCurrentAd({...currentAd, endDate: e.target.value})} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4">
                            {currentAd.id && (
                                <button onClick={() => deleteAd(currentAd.id!)} className="bg-red-50 text-red-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2">
                                    <Trash2 size={18} /> Eliminar
                                </button>
                            )}
                            <button onClick={saveAd} className="flex-1 bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-xl">
                                <Save size={18} /> Guardar Campaña
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- LISTADO DE ANUNCIOS ---
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100 gap-4">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg text-white"><BarChart3 size={28}/></div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Ad Manager</h2>
                                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Gestión de espacios publicitarios</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => { setCurrentAd({ isActive: true, impressions: 0, clicks: 0 }); setEditMode('ad'); }} 
                                className="w-full md:w-auto bg-blue-50 text-blue-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:bg-blue-100 transition-all"
                            >
                                <Plus size={16} /> Crear Anuncio
                            </button>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {ads.map(ad => {
                                const startDate = new Date(ad.startDate);
                                const endDate = new Date(ad.endDate);
                                const today = new Date();
                                const progress = Math.min(100, Math.max(0, ((today.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100));
                                const isExpired = today > endDate;

                                return (
                                    <div key={ad.id} className={`bg-white p-6 rounded-[35px] shadow-sm border flex flex-col sm:flex-row gap-6 transition-all group ${ad.isActive ? 'border-slate-100 hover:shadow-xl' : 'border-gray-100 opacity-60'}`}>
                                        {/* Thumbnail */}
                                        <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-[25px] overflow-hidden shrink-0 relative border border-gray-100">
                                            <img src={ad.imageUrl} className="w-full h-full object-cover" alt={ad.clientName} />
                                            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase">
                                                {viewStateLabels[ad.view] || ad.view}
                                            </div>
                                        </div>

                                        {/* Info & Controls */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-black text-slate-900 text-lg leading-tight">{ad.clientName}</h3>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-slate-100 flex items-center gap-1">
                                                            <Layout size={10} /> {ad.position}
                                                        </span>
                                                        {ad.filterContext && (
                                                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1">
                                                                <Filter size={10} /> {ad.filterContext}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button onClick={() => toggleAdStatus(ad.id)} className={`transition-colors ${ad.isActive ? 'text-green-500' : 'text-gray-300'}`}>
                                                    {ad.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                                                </button>
                                            </div>

                                            {/* Metrics Row */}
                                            <div className="flex items-center gap-6 mt-4 py-3 border-t border-b border-gray-50">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Eye size={16} />
                                                    <span className="text-xs font-bold text-slate-700">{ad.impressions || 0}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <MousePointer2 size={16} />
                                                    <span className="text-xs font-bold text-slate-700">{ad.clicks || 0}</span>
                                                </div>
                                                <div className="flex-1 text-right">
                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${isExpired ? 'text-red-500' : 'text-emerald-500'}`}>
                                                        {isExpired ? 'Expirado' : 'En curso'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Footer Actions & Date */}
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex flex-col gap-1 w-full mr-4">
                                                    <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                                        <span>{ad.startDate}</span>
                                                        <span>{ad.endDate}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                        <div className={`h-full rounded-full ${isExpired ? 'bg-red-400' : 'bg-blue-500'}`} style={{width: `${progress}%`}}></div>
                                                    </div>
                                                </div>
                                                <button onClick={() => { setCurrentAd(ad); setEditMode('ad'); }} className="bg-slate-50 text-slate-600 p-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-all shrink-0">
                                                    <Edit3 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
          )}

          {/* 1. SECCIÓN EQUIPO */}
          {activeTab === 'team' && isSuperAdmin && (
            <div className="space-y-6">
              {editMode === 'admin' ? (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b">
                    <h3 className="text-2xl font-black tracking-tighter">Gestión de Acceso Administrativo</h3>
                    <button onClick={() => setEditMode('none')}><X /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identidad del Administrador</label>
                       <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Nombre completo" value={currentAdmin.name || ''} onChange={e => setCurrentAdmin({...currentAdmin, name: e.target.value})} />
                       <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Email institucional" value={currentAdmin.email || ''} onChange={e => setCurrentAdmin({...currentAdmin, email: e.target.value})} />
                       <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" type="password" placeholder="Contraseña de acceso" value={currentAdmin.password || ''} onChange={e => setCurrentAdmin({...currentAdmin, password: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nivel de Privilegio</label>
                       <select 
                          className="w-full p-5 bg-slate-50 rounded-2xl font-bold border outline-none focus:ring-2 focus:ring-blue-500/20" 
                          value={['EDITOR_CONTENT', 'EDITOR_NEWS', 'EDITOR_FORUM'].includes(currentAdmin.role!) ? 'EDITOR' : currentAdmin.role} 
                          onChange={(e) => {
                             if (e.target.value === 'EDITOR') {
                                // Default to CONTENT (All) when switching to EDITOR
                                setCurrentAdmin({...currentAdmin, role: 'EDITOR_CONTENT'});
                             } else {
                                setCurrentAdmin({...currentAdmin, role: e.target.value as AdminRole});
                             }
                          }}
                       >
                          <option value="ADMIN_GENERAL">Administrador General</option>
                          <option value="ADMIN_COMMERCE">Administrador de Comercio</option>
                          <option value="ADMIN_CULTURE">Administrador de Cultura</option>
                          <option value="EDITOR">Editor de Contenidos / Moderador</option>
                          <option value="SUPER_ADMIN">Super Administrador</option>
                       </select>

                       {/* Selector de Alcance para Editores */}
                       {['EDITOR_CONTENT', 'EDITOR_NEWS', 'EDITOR_FORUM'].includes(currentAdmin.role!) && (
                          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 animate-in slide-in-from-top-2">
                             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-3">Alcance de Permisos</label>
                             <div className="flex gap-2">
                                <button 
                                   onClick={() => setCurrentAdmin({...currentAdmin, role: 'EDITOR_NEWS'})}
                                   className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentAdmin.role === 'EDITOR_NEWS' ? 'bg-teal-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-100'}`}
                                >
                                   Solo Noticias
                                </button>
                                <button 
                                   onClick={() => setCurrentAdmin({...currentAdmin, role: 'EDITOR_FORUM'})}
                                   className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentAdmin.role === 'EDITOR_FORUM' ? 'bg-pink-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-100'}`}
                                >
                                   Solo Foro
                                </button>
                                <button 
                                   onClick={() => setCurrentAdmin({...currentAdmin, role: 'EDITOR_CONTENT'})}
                                   className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${currentAdmin.role === 'EDITOR_CONTENT' ? 'bg-indigo-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200 hover:bg-slate-100'}`}
                                >
                                   Todo (Full)
                                </button>
                             </div>
                          </div>
                       )}
                    </div>
                  </div>
                  <button onClick={saveAdmin} className="w-full mt-10 py-6 bg-[#0f172a] text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all">
                    <Save size={20} /> Guardar y Autorizar Acceso
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-center bg-[#0f172a] p-8 sm:p-10 rounded-[35px] shadow-xl text-white gap-8 sm:gap-4">
                    <div className="flex items-center gap-5 w-full sm:w-auto">
                       <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shrink-0"><Shield size={28}/></div>
                       <div>
                          <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none">Equipo de Administración ({admins.length})</h2>
                          <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-2">Acceso exclusivo SuperAdmin</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => { setCurrentAdmin({role: 'ADMIN_GENERAL'}); setEditMode('admin'); }} 
                      className="w-full sm:w-auto bg-blue-600 text-white px-8 py-5 rounded-[22px] font-black text-[11px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap"
                    >
                      <UserPlus size={18} /> 
                      <span>Alta Administrador</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {admins.map(admin => (
                      <div key={admin.id} className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-md flex items-center gap-6 group hover:border-blue-300 transition-all">
                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xl">
                           {admin.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 tracking-tight flex items-center gap-2">{admin.name}</h4>
                          <p className="text-[10px] font-bold text-slate-400 truncate max-w-xs">{admin.email}</p>
                        </div>
                        <div className="hidden md:block">
                           <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${getRoleBadgeColor(admin.role)}`}>
                              {roleLabels[admin.role] || admin.role.replace('_', ' ')}
                           </span>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setCurrentAdmin(admin); setEditMode('admin'); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={18} /></button>
                          {admin.id !== 'adm-1' && (
                             <button onClick={() => setAdmins(prev => prev.filter(a => a.id !== admin.id))} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* 4. SECCIÓN FORUM (NUEVA) */}
          {activeTab === 'forum' && canAccessTab('forum') && (
             <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100 gap-4">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-pink-200 text-white"><MessageSquare size={28}/></div>
                       <div>
                          <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Moderación de Foro</h2>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">{forumPosts.length} Publicaciones Activas</p>
                       </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                   {forumPosts.map(post => (
                      <div key={post.id} className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex items-start gap-6 group hover:shadow-md transition-all">
                         <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 font-black text-slate-400 text-xs uppercase">
                            {post.avatar}
                         </div>
                         <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                               <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{post.category}</span>
                               <span className="text-[10px] font-bold text-slate-300">{post.time}</span>
                            </div>
                            <h4 className="font-black text-slate-900 text-sm leading-tight mb-2">{post.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2">{post.content}</p>
                            <div className="mt-4 flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                               <span>Por: {post.user}</span>
                               <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                               <span>{post.replies} Respuestas</span>
                            </div>
                         </div>
                         <button 
                            onClick={() => deletePost(post.id)}
                            className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all self-center"
                            title="Eliminar Publicación"
                         >
                            <Trash2 size={18} />
                         </button>
                      </div>
                   ))}
                   {forumPosts.length === 0 && (
                      <div className="text-center py-20 bg-white rounded-[30px] border border-dashed border-gray-200 text-gray-400 text-sm font-bold uppercase tracking-widest">
                         No hay publicaciones para moderar
                      </div>
                   )}
                </div>
             </div>
          )}

          {/* 2. SECCIÓN COMERCIOS */}
          {activeTab === 'businesses' && canAccessTab('businesses') && (
            <div className="space-y-6">
              {/* ... (Business code unchanged but abbreviated for clarity in this response as requested focus was Beacons) ... */}
              {editMode === 'biz' && !editingBeaconId ? (
                // --- FORMULARIO DE EDICIÓN / CREACIÓN ---
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                   <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tighter">
                           {currentBiz.id ? 'Ajustes del Comercio' : 'Alta Nuevo Comercio'}
                        </h3>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                           Gestión del Censo Digital
                        </p>
                      </div>
                      <button onClick={() => setEditMode('none')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"><X /></button>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* Columna Izquierda: Info Básica */}
                      <div className="space-y-6">
                         <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest border-b border-blue-100 pb-2 mb-4">Información General</h4>
                         
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Nombre Comercial</label>
                            <input 
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
                                placeholder="Ej: Cafetería Central" 
                                value={currentBiz.name || ''} 
                                onChange={e => setCurrentBiz({...currentBiz, name: e.target.value})} 
                            />
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Categoría</label>
                                <select 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none"
                                    value={currentBiz.category || ''}
                                    onChange={e => setCurrentBiz({...currentBiz, category: e.target.value})}
                                >
                                    <option value="">Seleccionar...</option>
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Zona</label>
                                <select 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none"
                                    value={currentBiz.zone || ''}
                                    onChange={e => setCurrentBiz({...currentBiz, zone: e.target.value as any})}
                                >
                                    <option value="">Seleccionar...</option>
                                    {zones.map(z => <option key={z} value={z}>{z}</option>)}
                                </select>
                            </div>
                         </div>

                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Descripción</label>
                            <textarea 
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-medium outline-none h-32 resize-none" 
                                placeholder="Descripción corta del negocio..." 
                                value={currentBiz.description || ''} 
                                onChange={e => setCurrentBiz({...currentBiz, description: e.target.value})} 
                            />
                         </div>
                      </div>

                      {/* Columna Derecha: Ubicación y Multimedia */}
                      <div className="space-y-6">
                         <h4 className="text-xs font-black text-emerald-600 uppercase tracking-widest border-b border-emerald-100 pb-2 mb-4">Ubicación y Media</h4>
                         
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Dirección Física</label>
                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"><MapPin size={20} /></div>
                                <input 
                                    className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                    placeholder="C/ Mayor, 12" 
                                    value={currentBiz.address || ''} 
                                    onChange={e => setCurrentBiz({...currentBiz, address: e.target.value})} 
                                />
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Latitud</label>
                                <input 
                                    type="number" step="0.0001"
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none"
                                    placeholder="37.8..."
                                    value={currentBiz.lat || ''}
                                    onChange={e => setCurrentBiz({...currentBiz, lat: parseFloat(e.target.value)})}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Longitud</label>
                                <input 
                                    type="number" step="0.0001"
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none"
                                    placeholder="-0.7..."
                                    value={currentBiz.lng || ''}
                                    onChange={e => setCurrentBiz({...currentBiz, lng: parseFloat(e.target.value)})}
                                />
                            </div>
                         </div>

                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Imagen Principal (URL)</label>
                            <div className="flex gap-2">
                                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 overflow-hidden">
                                    {currentBiz.images?.[0] ? <img src={currentBiz.images[0]} className="w-full h-full object-cover" /> : <ImageIcon size={20} />}
                                </div>
                                <input 
                                    className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                    placeholder="https://..." 
                                    value={currentBiz.images?.[0] || ''} 
                                    onChange={e => setCurrentBiz({...currentBiz, images: [e.target.value]})} 
                                />
                            </div>
                         </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Teléfono</label>
                                <input 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                    placeholder="965..." 
                                    value={currentBiz.phone || ''} 
                                    onChange={e => setCurrentBiz({...currentBiz, phone: e.target.value})} 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Horario L-V</label>
                                <input 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                    placeholder="09:00 - 14:00" 
                                    value={currentBiz.hours?.weekdays || ''} 
                                    onChange={e => setCurrentBiz({...currentBiz, hours: { ...currentBiz.hours!, weekdays: e.target.value } })} 
                                />
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-10 flex gap-4">
                      {currentBiz.id && (
                          <button 
                            onClick={() => deleteBiz(currentBiz.id!)}
                            className="bg-red-50 text-red-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2"
                          >
                             <Trash2 size={18} /> Eliminar Comercio
                          </button>
                      )}
                      <button 
                        onClick={saveBiz}
                        className="flex-1 bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2 shadow-xl"
                      >
                         <Save size={18} /> Guardar Cambios
                      </button>
                   </div>
                </div>
              ) : (
                // --- VISTA DE LISTA COMPLETA ---
                <>
                  <div className="flex justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100">
                    <div>
                        <h2 className="text-xl font-black tracking-tighter uppercase">Censo Oficial ({businesses.length})</h2>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Directorio de empresas registradas</p>
                    </div>
                    <button onClick={() => { setCurrentBiz({}); setEditMode('biz'); }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-2 hover:bg-blue-700 transition-all">
                      <Plus size={16} /> Alta Nuevo
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {businesses.map(biz => (
                      <div key={biz.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col justify-between h-full">
                         <div>
                             <div className="relative h-40 rounded-[20px] overflow-hidden mb-5">
                                 <img src={biz.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={biz.name} />
                                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
                                     {biz.zone}
                                 </div>
                             </div>
                             <h3 className="font-black text-lg text-slate-900 leading-tight mb-2">{biz.name}</h3>
                             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-1.5">
                                 <Tag size={12} /> {biz.category}
                             </p>
                             <div className="space-y-2 mb-6">
                                 <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                                     <MapPin size={14} className="text-slate-300" /> <span className="truncate">{biz.address}</span>
                                 </div>
                                 <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                                     <Phone size={14} className="text-slate-300" /> {biz.phone}
                                 </div>
                             </div>
                         </div>
                         <div className="flex gap-2 pt-4 border-t border-slate-50">
                             <button 
                                onClick={() => { setCurrentBiz(biz); setEditMode('biz'); }}
                                className="flex-1 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                             >
                                <Settings2 size={14} /> Ajustes
                             </button>
                         </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* 3. SECCIÓN SYNC NEWS (NUEVA) */}
          {activeTab === 'news' && canAccessTab('news') && (
            <div className="space-y-6">
              {editMode === 'source' ? (
                // --- FORMULARIO EDICIÓN SYNC ---
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                   {/* ... (Sync News Form content unchanged) ... */}
                   {/* For brevity, reusing logic but ensuring it matches previous snippet */}
                   <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                           <RefreshCw size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 tracking-tighter">
                             {currentSource.id ? 'Configurar Fuente' : 'Nueva Conexión'}
                          </h3>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                             Parámetros de API y Sincronización
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setEditMode('none')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"><X /></button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Plataforma</label>
                            <select 
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none focus:border-indigo-500 transition-colors"
                                value={currentSource.platform || 'RSS'}
                                onChange={e => setCurrentSource({...currentSource, platform: e.target.value as SyncPlatform})}
                            >
                                <option value="FACEBOOK">Facebook</option>
                                <option value="INSTAGRAM">Instagram</option>
                                <option value="TWITTER">Twitter (X)</option>
                                <option value="WHATSAPP">WhatsApp Channel</option>
                                <option value="RSS">RSS Feed</option>
                            </select>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Nombre Identificativo</label>
                            <input 
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                placeholder="Ej: Noticias Ayuntamiento" 
                                value={currentSource.name || ''} 
                                onChange={e => setCurrentSource({...currentSource, name: e.target.value})} 
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Enlace Público (URL)</label>
                            <div className="flex gap-2">
                               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"><LinkIcon size={20} /></div>
                               <input 
                                   className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                   placeholder="https://..." 
                                   value={currentSource.url || ''} 
                                   onChange={e => setCurrentSource({...currentSource, url: e.target.value})} 
                               />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">API Key / Token (Opcional)</label>
                            <div className="flex gap-2">
                               <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400"><Lock size={20} /></div>
                               <input 
                                   type="password"
                                   className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                   placeholder="••••••••••••••••" 
                                   value={currentSource.apiKey || ''} 
                                   onChange={e => setCurrentSource({...currentSource, apiKey: e.target.value})} 
                               />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Frecuencia de Sync (Minutos)</label>
                            <input 
                                type="number"
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold outline-none" 
                                placeholder="60" 
                                value={currentSource.frequency || ''} 
                                onChange={e => setCurrentSource({...currentSource, frequency: parseInt(e.target.value)})} 
                            />
                         </div>
                      </div>
                   </div>

                   <div className="mt-10 pt-6 border-t border-gray-100 flex gap-4">
                      {currentSource.id && (
                          <button 
                            onClick={() => deleteSource(currentSource.id!)}
                            className="bg-red-50 text-red-500 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2"
                          >
                             <Trash2 size={18} /> Eliminar
                          </button>
                      )}
                      <button 
                        onClick={saveSource}
                        className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-200"
                      >
                         <Save size={18} /> Guardar Conexión
                      </button>
                   </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100 gap-4">
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 text-white"><Globe size={28}/></div>
                       <div>
                          <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Sync News Manager</h2>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2">Fuentes de Noticias ({syncSources.length})</p>
                       </div>
                    </div>
                    <button 
                      onClick={() => { setCurrentSource({ status: 'ACTIVE', frequency: 60 }); setEditMode('source'); }} 
                      className="w-full md:w-auto bg-indigo-50 text-indigo-600 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm flex items-center justify-center gap-2 hover:bg-indigo-100 transition-all"
                    >
                      <Plus size={16} /> Añadir Fuente
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {syncSources.map(source => (
                      <div key={source.id} className={`bg-white p-6 rounded-[35px] shadow-sm border transition-all relative overflow-hidden group ${source.status === 'ACTIVE' ? 'border-green-100' : 'border-gray-200 opacity-75'}`}>
                         
                         {/* Header Tarjeta */}
                         <div className="flex items-start justify-between mb-6 relative z-10">
                            <div className="flex items-center gap-4">
                               <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shadow-inner">
                                  {getPlatformIcon(source.platform)}
                               </div>
                               <div>
                                  <h3 className="font-black text-slate-900 tracking-tight leading-tight">{source.name}</h3>
                                  <div className="flex items-center gap-2 mt-1">
                                     <span className={`w-2 h-2 rounded-full ${source.status === 'ACTIVE' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></span>
                                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{source.platform}</span>
                                  </div>
                               </div>
                            </div>
                            
                            {/* Toggle ON/OFF */}
                            <button 
                               onClick={() => toggleSourceStatus(source.id)}
                               className={`transition-colors duration-300 ${source.status === 'ACTIVE' ? 'text-green-500 hover:text-green-600' : 'text-gray-300 hover:text-gray-400'}`}
                            >
                               {source.status === 'ACTIVE' ? <ToggleRight size={36} strokeWidth={2.5} /> : <ToggleLeft size={36} strokeWidth={2.5} />}
                            </button>
                         </div>

                         {/* Detalles */}
                         <div className="space-y-3 mb-6 relative z-10">
                            <div className="flex items-center gap-3 text-xs font-medium text-slate-500 bg-slate-50 p-3 rounded-xl">
                               <LinkIcon size={14} className="text-slate-400 shrink-0" />
                               <span className="truncate">{source.url}</span>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  <RefreshCw size={12} /> Cada {source.frequency} min
                               </div>
                               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                  <CheckCircle size={12} /> Sync: {source.lastSync}
                               </div>
                            </div>
                         </div>

                         {/* Botón Editar */}
                         <button 
                            onClick={() => { setCurrentSource(source); setEditMode('source'); }}
                            className="w-full py-3 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative z-10"
                         >
                            <Settings2 size={14} /> Configurar
                         </button>

                         {/* Decoración Fondo */}
                         <div className={`absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-5 pointer-events-none transition-colors ${source.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

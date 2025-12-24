
import React, { useState } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem, NewsItem, NewsCategory, ViewState } from '../types';
import { 
  Trash2, Plus, Calendar, Image as ImageIcon, Save, X, LogOut, 
  Zap, Tag, Edit3, ShoppingBag, Globe, MapPin, 
  Radio, Clock, Check, Phone, Filter,
  ShieldCheck, TrendingUp, Newspaper, Radar, AlertCircle, Share2,
  Facebook, Instagram, Twitter, Video, Eye, MousePointer2, Activity, BarChart3,
  Battery, Wifi, Settings2, Signal, Cpu, Layers
} from './Icons';
import { MOCK_NEWS } from '../data';

interface AdminDashboardProps {
  ads: Ad[];
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  businesses: CensusItem[];
  setBusinesses: React.Dispatch<React.SetStateAction<CensusItem[]>>;
  onLogout: () => void;
  currentUserRole: AdminRole;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    ads, setAds, events, setEvents, businesses, setBusinesses, onLogout, currentUserRole
}) => {
  const [activeTab, setActiveTab] = useState<'businesses' | 'news' | 'ads' | 'beaches' | 'beacons'>('businesses');
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS);
  
  // Estados de Sincronización
  const [syncSocials, setSyncSocials] = useState({ facebook: true, instagram: true, tiktok: true, twitter: false });

  // Estados de Edición Generales
  const [editMode, setEditMode] = useState<'none' | 'biz' | 'news' | 'ad' | 'beacon'>('none');
  
  // Formularios
  const [currentBiz, setCurrentBiz] = useState<Partial<CensusItem>>({});
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem>>({});
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({});
  const [currentBeacon, setCurrentBeacon] = useState<{bizId: string, promo: Partial<Promotion & { cooldownMinutes?: number } >}>({bizId: '', promo: {}});

  // Estado para Beacons Forzados a Offline (Local para la demo)
  const [offlineBeacons, setOfflineBeacons] = useState<Set<string>>(new Set());

  // Configuración de iconos y colores para redes sociales
  const socialConfig: Record<string, { icon: any, activeClass: string }> = {
    facebook: { icon: Facebook, activeClass: 'bg-[#1877F2] shadow-[#1877F2]/40' },
    instagram: { icon: Instagram, activeClass: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-pink-500/40' },
    tiktok: { icon: Video, activeClass: 'bg-black ring-1 ring-cyan-400 shadow-cyan-400/20' },
    twitter: { icon: Twitter, activeClass: 'bg-black shadow-slate-800' }
  };

  // Mapeo de filtros disponibles por página para el selector de anuncios
  const getFiltersForView = (view: ViewState | undefined): { id: string, label: string }[] => {
    switch (view) {
      case ViewState.MAP:
        return [
          { id: 'all', label: 'Todo el Mapa' },
          { id: 'beaches', label: 'Solo Playas' },
          { id: 'culture', label: 'Solo Patrimonio' },
          { id: 'active', label: 'Solo Experiencias' },
          { id: 'food', label: 'Solo Gastronomía' },
          { id: 'shop', label: 'Solo Tiendas' },
          { id: 'events', label: 'Solo Eventos' }
        ];
      case ViewState.SHOPPING:
      case ViewState.DINING:
        return [
          { id: 'all', label: 'Todo el Municipio' },
          { id: 'CENTRO', label: 'Pilar Centro' },
          { id: 'LA_TORRE', label: 'La Torre' },
          { id: 'MIL_PALMERAS', label: 'Mil Palmeras' },
          { id: 'CAMPOVERDE', label: 'Campoverde' },
          { id: 'EL_MOJON', label: 'El Mojón' }
        ];
      case ViewState.EVENTS:
        return [
          { id: 'all', label: 'Todos los Eventos' },
          { id: 'TRADICIÓN', label: 'Tradición' },
          { id: 'RELIGIOSO', label: 'Semana Santa' },
          { id: 'CINE', label: 'Cultura' },
          { id: 'HISTORIA', label: 'Recreación' }
        ];
      case ViewState.NEWS:
        return [
          { id: 'ALL', label: 'Todas las Noticias' },
          { id: 'GENERAL', label: 'Actualidad' },
          { id: 'DIFUNTOS', label: 'Difuntos' },
          { id: 'TRABAJO', label: 'Empleo' },
          { id: 'CASAS', label: 'Vivienda' }
        ];
      default:
        return [];
    }
  };

  // --- MOCK DE ANALÍTICAS PUBLICIDAD ---
  const getAdMetrics = (id: string) => {
    const seed = id.charCodeAt(id.length - 1);
    const views = seed * 145;
    const clicks = Math.floor(views * (0.02 + (seed % 10) / 100));
    const ctr = ((clicks / views) * 100).toFixed(2);
    return { views, clicks, ctr };
  };

  // --- MOCK TÉCNICO BEACONS ---
  const getBeaconHardwareStats = (id: string) => {
    const seed = id.charCodeAt(id.length - 1);
    return {
      battery: 70 + (seed % 30),
      signal: 40 + (seed % 50),
      uuid: `PH-BKN-${id.toUpperCase()}-${seed}92`,
      lastSync: 'Hace 4 min',
      uptime: '99.8%'
    };
  };

  // --- HANDLERS ---
  const saveBiz = () => {
    const item = {
      ...currentBiz,
      id: currentBiz.id || `biz-${Date.now()}`,
      images: currentBiz.images || ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'],
      hours: { weekdays: '09:00-14:00', weekend: 'Cerrado' },
      rating: 5.0,
      reviewCount: 0
    } as CensusItem;
    if (currentBiz.id) setBusinesses(prev => prev.map(b => b.id === item.id ? item : b));
    else setBusinesses(prev => [item, ...prev]);
    setEditMode('none');
  };

  const saveNews = () => {
    const item = {
      ...currentNews,
      id: currentNews.id || `news-${Date.now()}`,
      source: 'Ayuntamiento PH', sourceType: 'official', date: 'Ahora', icon: 'megaphone', url: '#'
    } as NewsItem;
    if (currentNews.id) setNewsList(prev => prev.map(n => n.id === item.id ? item : n));
    else setNewsList(prev => [item, ...prev]);
    setEditMode('none');
  };

  const saveAd = () => {
    const item = {
      ...currentAd, id: currentAd.id || `ad-${Date.now()}`, isActive: true,
      startDate: currentAd.startDate || new Date().toISOString().split('T')[0],
      endDate: currentAd.endDate || '2025-12-31',
      view: currentAd.view || ViewState.HOME
    } as Ad;
    if (currentAd.id) setAds(prev => prev.map(a => a.id === item.id ? item : a));
    else setAds(prev => [item, ...prev]);
    setEditMode('none');
  };

  const saveBeacon = () => {
    const promo: Promotion = {
      title: currentBeacon.promo.title || '¡Oferta!',
      description: currentBeacon.promo.description || '',
      proximityRange: currentBeacon.promo.proximityRange || 'NEAR',
      frequencyPerDay: Number(currentBeacon.promo.frequencyPerDay) || 3,
      maxDistanceMeters: Number(currentBeacon.promo.maxDistanceMeters) || 15,
      activeTimeMinutes: Number(currentBeacon.promo.activeTimeMinutes) || 60,
      beaconHardwareId: currentBeacon.promo.beaconHardwareId || `BKN-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      interactionsCount: 0
    };
    setBusinesses(prev => prev.map(b => b.id === currentBeacon.bizId ? { ...b, promotion: promo } : b));
    setOfflineBeacons(prev => {
      const next = new Set(prev);
      next.delete(currentBeacon.bizId);
      return next;
    });
    setEditMode('none');
  };

  const deleteBeacon = (bizId: string) => {
    setBusinesses(prev => prev.map(b => b.id === bizId ? { ...b, promotion: undefined } : b));
  };

  const handleStatusChange = (bizId: string, newStatus: string) => {
    const biz = businesses.find(b => b.id === bizId);
    if (!biz) return;
    const hardware = getBeaconHardwareStats(bizId);

    if (newStatus === 'offline') {
      setOfflineBeacons(prev => new Set(prev).add(bizId));
      deleteBeacon(bizId);
    } else if (newStatus === 'standby') {
      setOfflineBeacons(prev => {
        const next = new Set(prev);
        next.delete(bizId);
        return next;
      });
      deleteBeacon(bizId);
    } else if (newStatus === 'online') {
      if (biz.promotion) {
        setOfflineBeacons(prev => {
          const next = new Set(prev);
          next.delete(bizId);
          return next;
        });
      } else {
        setCurrentBeacon({bizId: biz.id, promo: {beaconHardwareId: hardware.uuid, frequencyPerDay: 3, activeTimeMinutes: 60}}); 
        setEditMode('beacon');
      }
    }
  };

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
            <p className="text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] mt-2 italic">Infraestructura Municipal 2025</p>
          </div>
        </div>
        <button onClick={onLogout} className="px-6 py-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-red-600/20">
          Cerrar Sistema
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* TABS DE ACCIÓN */}
        <nav className="flex gap-2 bg-white p-2 rounded-[28px] shadow-xl border border-slate-200 overflow-x-auto no-scrollbar">
          {[
            { id: 'businesses', label: 'Censo Comercial', icon: ShoppingBag },
            { id: 'news', label: 'Sync News', icon: Globe },
            { id: 'ads', label: 'Publicidad Pro', icon: Tag },
            { id: 'beacons', label: 'Red Beacons', icon: Radar },
          ].map(tab => (
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
          
          {/* 1. SECCIÓN CENSO COMERCIAL */}
          {activeTab === 'businesses' && (
            <div className="space-y-6">
              {editMode === 'biz' ? (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b">
                    <h3 className="text-2xl font-black tracking-tighter">Ficha de Comercio</h3>
                    <button onClick={() => setEditMode('none')}><X /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Nombre Comercial" value={currentBiz.name || ''} onChange={e => setCurrentBiz({...currentBiz, name: e.target.value})} />
                    <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Categoría" value={currentBiz.category || ''} onChange={e => setCurrentBiz({...currentBiz, category: e.target.value})} />
                    <select className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" value={currentBiz.zone} onChange={e => setCurrentBiz({...currentBiz, zone: e.target.value as any})}>
                      <option value="CENTRO">Pilar Centro</option>
                      <option value="LA_TORRE">La Torre</option>
                      <option value="MIL_PALMERAS">Mil Palmeras</option>
                      <option value="CAMPOVERDE">Campoverde</option>
                    </select>
                    <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="URL Imagen" value={currentBiz.images?.[0] || ''} onChange={e => setCurrentBiz({...currentBiz, images: [e.target.value]})} />
                    <textarea className="w-full p-5 bg-slate-50 rounded-2xl font-medium border md:col-span-2 h-32" placeholder="Descripción pública..." value={currentBiz.description || ''} onChange={e => setCurrentBiz({...currentBiz, description: e.target.value})} />
                  </div>
                  <button onClick={saveBiz} className="w-full mt-10 py-6 bg-blue-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                    <Save /> Guardar en Censo
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter uppercase">Comercios Registrados ({businesses.length})</h2>
                    <button onClick={() => { setCurrentBiz({}); setEditMode('biz'); }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-2">
                      <Plus size={16} /> Alta Nuevo
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {businesses.map(b => (
                      <div key={b.id} className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-md flex items-center gap-6 group hover:border-blue-300 transition-all">
                        <img src={b.images[0]} className="w-16 h-16 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 tracking-tight">{b.name}</h4>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{b.category} • {b.zone}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setCurrentBiz(b); setEditMode('biz'); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={18} /></button>
                          <button onClick={() => setBusinesses(prev => prev.filter(i => i.id !== b.id))} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* 2. SECCIÓN SMART SYNC NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-6">
              {editMode === 'news' ? (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black tracking-tighter">Publicación Multi-Canal</h3>
                    <button onClick={() => setEditMode('none')}><X /></button>
                  </div>
                  <div className="space-y-6">
                    <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Título" value={currentNews.title || ''} onChange={e => setCurrentNews({...currentNews, title: e.target.value})} />
                    <div className="flex gap-4">
                      <select className="flex-1 p-5 bg-slate-50 rounded-2xl font-bold border" value={currentNews.category} onChange={e => setCurrentNews({...currentNews, category: e.target.value as any})}>
                        <option value="GENERAL">Actualidad</option>
                        <option value="DIFUNTOS">Difuntos</option>
                        <option value="TRABAJO">Empleo</option>
                        <option value="CASAS">Vivienda</option>
                      </select>
                      <input className="flex-1 p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="URL Imagen" value={currentNews.image || ''} onChange={e => setCurrentNews({...currentNews, image: e.target.value})} />
                    </div>
                    <textarea className="w-full p-5 bg-slate-50 rounded-2xl font-medium border h-40" placeholder="Escribe el contenido..." value={currentNews.content || ''} onChange={e => setCurrentNews({...currentNews, content: e.target.value})} />
                    <div className="p-6 bg-slate-900 rounded-[30px] text-white flex justify-between items-center flex-wrap gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Sincronizar con redes:</span>
                      <div className="flex gap-3">
                        {Object.entries(syncSocials).map(([net, active]) => {
                          const config = socialConfig[net];
                          const Icon = config.icon;
                          return (
                            <button 
                              key={net} 
                              onClick={() => setSyncSocials(prev => ({...prev, [net]: !active}))} 
                              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${active ? `${config.activeClass} scale-110 shadow-lg` : 'bg-white/10 opacity-30 grayscale hover:opacity-50'}`}
                            >
                              <Icon size={20} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <button onClick={saveNews} className="w-full mt-8 py-6 bg-blue-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3">
                    <Zap size={20} /> Publicar y Sincronizar
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100">
                    <h2 className="text-xl font-black tracking-tighter uppercase">Feed de Noticias PH</h2>
                    <button onClick={() => { setCurrentNews({}); setEditMode('news'); }} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-2">
                      <Plus size={16} /> Nueva Noticia
                    </button>
                  </div>
                  <div className="space-y-4">
                    {newsList.map(n => (
                      <div key={n.id} className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-md flex items-center gap-6">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                          <Newspaper size={24} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 leading-tight">{n.title}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{n.category}</span>
                            <span className="text-[9px] text-slate-300 font-bold">{n.date}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setCurrentNews(n); setEditMode('news'); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={18} /></button>
                          <button onClick={() => setNewsList(prev => prev.filter(i => i.id !== n.id))} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* 3. SECCIÓN PUBLICIDAD FANCY */}
          {activeTab === 'ads' && (
            <div className="space-y-10">
              {editMode === 'ad' ? (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black tracking-tighter">Configurar Campaña Publicitaria</h3>
                    <button onClick={() => setEditMode('none')}><X /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Bloque Izquierda: Destino y Segmentación */}
                    <div className="space-y-6">
                      <div className="bg-slate-50 p-6 rounded-[30px] border space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                           <Layers size={18} className="text-blue-600" />
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ubicación en la App</label>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {/* Selector de Vista Principal */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Página de Destino</span>
                            <select 
                              className="w-full p-4 bg-white rounded-xl font-bold border shadow-sm" 
                              value={currentAd.view} 
                              onChange={e => setCurrentAd({...currentAd, view: e.target.value as ViewState, filterContext: 'all'})}
                            >
                              <option value={ViewState.HOME}>🏠 Inicio</option>
                              <option value={ViewState.SIDEBAR}>📱 Menú Lateral (Sidebar)</option>
                              <option value={ViewState.MAP}>🗺️ Mapa Interactivo</option>
                              <option value={ViewState.DINING}>🍴 Gastronomía</option>
                              <option value={ViewState.SHOPPING}>🛍️ Tiendas</option>
                              <option value={ViewState.EVENTS}>📅 Eventos</option>
                              <option value={ViewState.NEWS}>📰 Noticias</option>
                              <option value={ViewState.BEACHES}>🏖️ Playas</option>
                            </select>
                          </div>

                          {/* Selector de Filtro (Si aplica) */}
                          {getFiltersForView(currentAd.view).length > 0 && (
                            <div className="space-y-2 animate-in slide-in-from-top-2">
                              <span className="text-[9px] font-bold text-blue-500 uppercase ml-1">Contexto de Segmentación (Filtro)</span>
                              <select 
                                className="w-full p-4 bg-white border-blue-200 rounded-xl font-bold border shadow-sm text-blue-700" 
                                value={currentAd.filterContext || 'all'} 
                                onChange={e => setCurrentAd({...currentAd, filterContext: e.target.value})}
                              >
                                {getFiltersForView(currentAd.view).map(f => (
                                  <option key={f.id} value={f.id}>{f.label}</option>
                                ))}
                              </select>
                              <p className="text-[8px] text-slate-400 italic px-1">El anuncio solo aparecerá cuando este filtro esté activo.</p>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Posición</span>
                              <select className="w-full p-4 bg-white rounded-xl font-bold border" value={currentAd.position} onChange={e => setCurrentAd({...currentAd, position: e.target.value as any})}>
                                <option value="page-top">Superior</option>
                                <option value="page-bottom">Inferior</option>
                                <option value="menu-top">Menú (Arriba)</option>
                                <option value="menu-bottom">Menú (Abajo)</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Estado</span>
                              <select className="w-full p-4 bg-white rounded-xl font-bold border" value={currentAd.isActive ? 'active' : 'inactive'} onChange={e => setCurrentAd({...currentAd, isActive: e.target.value === 'active'})}>
                                <option value="active">Activo</option>
                                <option value="inactive">Pausado</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Datos Cliente</label>
                        <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Nombre de la empresa" value={currentAd.clientName || ''} onChange={e => setCurrentAd({...currentAd, clientName: e.target.value})} />
                      </div>
                    </div>

                    {/* Bloque Derecha: Contenido y Creatividad */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Creatividad y Enlace</label>
                        <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="URL Imagen (Recomendado 1200x480)" value={currentAd.imageUrl || ''} onChange={e => setCurrentAd({...currentAd, imageUrl: e.target.value})} />
                        <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="URL Destino (https://...)" value={currentAd.linkUrl || ''} onChange={e => setCurrentAd({...currentAd, linkUrl: e.target.value})} />
                      </div>
                      
                      {/* Vista previa mini */}
                      {currentAd.imageUrl && (
                        <div className="space-y-2">
                           <span className="text-[9px] font-bold text-slate-400 uppercase ml-1">Vista Previa</span>
                           <div className="aspect-[2.5/1] rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                             <img src={currentAd.imageUrl} className="w-full h-full object-cover" />
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={saveAd} className="w-full mt-10 py-6 bg-[#0f172a] text-white rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                    <Save size={20} /> Guardar Campaña Segmentada
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-[35px] border border-slate-200 shadow-xl flex flex-col gap-2">
                       <span className="text-3xl font-black tracking-tighter">142.5K</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Impresiones Totales</span>
                    </div>
                    <div className="bg-white p-6 rounded-[35px] border border-slate-200 shadow-xl flex flex-col gap-2">
                       <span className="text-3xl font-black tracking-tighter">4.8K</span>
                       <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Clics Únicos</span>
                    </div>
                    <div className="bg-[#0f172a] p-6 rounded-[35px] shadow-2xl flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-600 transition-all group" onClick={() => { setCurrentAd({view: ViewState.HOME, position: 'page-top', startDate: new Date().toISOString().split('T')[0]}); setEditMode('ad'); }}>
                       <Plus size={24} className="text-blue-500 mb-1 group-hover:text-white transition-colors" />
                       <span className="text-white font-black text-[10px] uppercase tracking-widest">Nueva Campaña</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {ads.map(ad => (
                      <div key={ad.id} className="bg-white rounded-[40px] border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row group hover:border-blue-200 transition-all">
                          <div className="w-full md:w-1/3 p-8 border-r border-slate-50 flex flex-col">
                             <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2 h-2 rounded-full ${ad.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
                                <h4 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{ad.clientName}</h4>
                             </div>
                             <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-blue-100">
                                   Pág: {ad.view}
                                </span>
                                {ad.filterContext && ad.filterContext !== 'all' && ad.filterContext !== 'ALL' && (
                                   <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border border-emerald-100">
                                      Filtro: {ad.filterContext}
                                   </span>
                                )}
                             </div>
                             <div className="h-24 bg-slate-100 rounded-xl overflow-hidden mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                <img src={ad.imageUrl} className="w-full h-full object-cover" />
                             </div>
                             <button onClick={() => { setCurrentAd(ad); setEditMode('ad'); }} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">Configurar</button>
                          </div>
                          <div className="flex-1 p-8 grid grid-cols-2 md:grid-cols-3 gap-8 bg-slate-50/30">
                             <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Alcance</p><p className="text-2xl font-black">{getAdMetrics(ad.id).views.toLocaleString()}</p></div>
                             <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Clics</p><p className="text-2xl font-black">{getAdMetrics(ad.id).clicks.toLocaleString()}</p></div>
                             <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">CTR</p><p className="text-2xl font-black text-blue-600">{getAdMetrics(ad.id).ctr}%</p></div>
                             <div className="col-span-2 md:col-span-3 pt-6 border-t border-slate-200/50 flex justify-between items-center">
                                <div className="text-[9px] font-black text-slate-400 uppercase">Período: {ad.startDate} al {ad.endDate}</div>
                                <button onClick={() => setAds(prev => prev.filter(i => i.id !== ad.id))} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16}/></button>
                             </div>
                          </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* 4. SECCIÓN RED DE BEACONS TÉCNICA */}
          {activeTab === 'beacons' && (
            <div className="space-y-6">
              {editMode === 'beacon' ? (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Settings2 size={28}/></div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tighter">Nodo Bluetooth Config</h3>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Infraestructura Smart PH</p>
                      </div>
                    </div>
                    <button onClick={() => setEditMode('none')}><X /></button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Hardware Identity */}
                    <div className="space-y-6">
                      <div className="p-6 bg-slate-900 rounded-[30px] text-white">
                        <label className="text-[9px] font-black uppercase tracking-widest text-blue-400 mb-4 block">Hardware ID / UUID</label>
                        <div className="flex items-center gap-3">
                           <Cpu size={24} className="text-blue-500" />
                           <input className="bg-transparent border-none text-xl font-mono font-bold w-full focus:ring-0 p-0" value={currentBeacon.promo.beaconHardwareId || ''} onChange={e => setCurrentBeacon({...currentBeacon, promo: {...currentBeacon.promo, beaconHardwareId: e.target.value.toUpperCase()}})} placeholder="BKN-XXXXXX" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Rango de Proximidad</label>
                        <div className="grid grid-cols-3 gap-2">
                           {['IMMEDIATE', 'NEAR', 'FAR'].map(r => (
                             <button key={r} onClick={() => setCurrentBeacon({...currentBeacon, promo: {...currentBeacon.promo, proximityRange: r as any}})} className={`py-3 rounded-xl text-[9px] font-black transition-all ${currentBeacon.promo.proximityRange === r ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                               {r === 'IMMEDIATE' ? '0.5m' : r === 'NEAR' ? '2m' : '10m'}
                             </button>
                           ))}
                        </div>
                      </div>
                    </div>

                    {/* Logic Config */}
                    <div className="space-y-6">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Pitals Máximos (Día/Usuario)</label>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border">
                           <input type="range" min="1" max="10" className="flex-1 accent-blue-600" value={currentBeacon.promo.frequencyPerDay || 3} onChange={e => setCurrentBeacon({...currentBeacon, promo: {...currentBeacon.promo, frequencyPerDay: Number(e.target.value)}})} />
                           <span className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-blue-600 border shadow-sm">{currentBeacon.promo.frequencyPerDay || 3}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Cooldown Re-Impacto (Minutos)</label>
                        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border">
                           <input type="range" min="0" max="1440" step="30" className="flex-1 accent-orange-500" value={currentBeacon.promo.activeTimeMinutes || 60} onChange={e => setCurrentBeacon({...currentBeacon, promo: {...currentBeacon.promo, activeTimeMinutes: Number(e.target.value)}})} />
                           <span className="w-20 h-12 bg-white rounded-xl flex items-center justify-center font-black text-orange-600 border shadow-sm">{currentBeacon.promo.activeTimeMinutes || 60}m</span>
                        </div>
                        <p className="text-[8px] text-slate-400 mt-2 italic px-1">Tiempo de espera antes de que el beacon vuelva a "pitar" al mismo dispositivo detectado.</p>
                      </div>
                    </div>

                    {/* Content Preview */}
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Mensaje Push Notificación</label>
                       <input className="w-full p-4 bg-slate-50 rounded-xl font-bold border focus:bg-white transition-all" placeholder="Título corto..." value={currentBeacon.promo.title || ''} onChange={e => setCurrentBeacon({...currentBeacon, promo: {...currentBeacon.promo, title: e.target.value}})} />
                       <textarea className="w-full p-4 bg-slate-50 rounded-xl font-medium border h-32 text-sm focus:bg-white transition-all" placeholder="Contenido de la oferta..." value={currentBeacon.promo.description || ''} onChange={e => setCurrentBeacon({...currentBeacon, promo: {...currentBeacon.promo, description: e.target.value}})} />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button onClick={saveBeacon} className="flex-1 py-6 bg-blue-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                        <Wifi size={20} /> Sincronizar y Activar Hardware
                    </button>
                    {currentBeacon.bizId && (
                        <button onClick={() => deleteBeacon(currentBeacon.bizId)} className="px-10 py-6 bg-red-600/10 text-red-600 border border-red-600/20 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                            <Trash2 size={20} />
                        </button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-[#0f172a] p-10 rounded-[45px] text-white flex justify-between items-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
                    <div className="flex items-center gap-8 relative z-10">
                      <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center border border-blue-500/30 animate-pulse">
                         <Radar size={48} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-black tracking-tighter leading-none mb-2">Infraestructura Beacon PH</h3>
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> Red Operativa</span>
                          <span className="flex items-center gap-1.5 text-[10px] font-black text-blue-300 uppercase tracking-widest"><Wifi size={12}/> 2.4GHz Bluetooth LE</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right border-l border-white/10 pl-10 hidden md:block">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Impactos Totales Red</p>
                      <span className="text-4xl font-black">24,802</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {businesses.map(b => {
                      const hardware = getBeaconHardwareStats(b.id);
                      const isOffline = offlineBeacons.has(b.id);
                      const status = isOffline ? 'offline' : (b.promotion ? 'online' : 'standby');

                      return (
                        <div key={b.id} className={`bg-white rounded-[40px] border transition-all duration-500 overflow-hidden shadow-xl flex flex-col ${status === 'online' ? 'border-blue-500 ring-4 ring-blue-500/5' : status === 'offline' ? 'border-red-500 grayscale opacity-70' : 'border-slate-100 opacity-80 hover:opacity-100'}`}>
                          
                          {/* Card Header Técnico */}
                          <div className="p-6 pb-2 flex justify-between items-start">
                             <div className="flex-1 min-w-0">
                                <h4 className={`font-black text-slate-900 text-lg leading-tight truncate ${status === 'offline' ? 'text-red-900' : ''}`}>{b.name}</h4>
                                <p className="text-[9px] font-mono text-slate-400 mt-1 uppercase tracking-tight">{hardware.uuid}</p>
                             </div>
                             <div className="shrink-0 flex items-center">
                                <select 
                                  value={status}
                                  onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                  className={`appearance-none px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                                    status === 'online' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                                    status === 'offline' ? 'bg-red-50 text-red-600 border-red-200' : 
                                    'bg-slate-50 text-slate-500 border-slate-200'
                                  }`}
                                >
                                  <option value="online">Online</option>
                                  <option value="standby">Standby</option>
                                  <option value="offline">Offline</option>
                                </select>
                             </div>
                          </div>

                          {/* Hardware Health Visualizer */}
                          <div className="px-6 py-4 grid grid-cols-2 gap-4">
                             <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center justify-center transition-all">
                                <Battery size={18} className={status === 'offline' ? 'text-red-800' : hardware.battery < 30 ? 'text-red-500 animate-bounce' : 'text-emerald-500'} />
                                <span className={`text-sm font-black mt-1 ${status === 'offline' ? 'text-red-900' : ''}`}>{status === 'offline' ? '--' : `${hardware.battery}%`}</span>
                                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Batería</span>
                             </div>
                             <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center justify-center transition-all">
                                <Signal size={18} className={status === 'offline' ? 'text-red-800' : 'text-blue-500'} />
                                <span className={`text-sm font-black mt-1 ${status === 'offline' ? 'text-red-900' : ''}`}>{status === 'offline' ? '--' : `-${hardware.signal}dBm`}</span>
                                <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Potencia</span>
                             </div>
                          </div>

                          {/* Stats Info */}
                          {status !== 'offline' && b.promotion && (
                            <div className="px-6 space-y-2 mb-4">
                               <div className="flex justify-between text-[9px] font-black uppercase">
                                 <span className="text-slate-400">Pital Rate:</span>
                                 <span className="text-blue-600">{b.promotion.frequencyPerDay}x/Día</span>
                               </div>
                               <div className="flex justify-between text-[9px] font-black uppercase">
                                 <span className="text-slate-400">Rango Activo:</span>
                                 <span className="text-blue-600">{b.promotion.proximityRange}</span>
                               </div>
                               <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden">
                                  <div className="h-full bg-blue-500" style={{width: `${hardware.battery}%`}}></div>
                               </div>
                            </div>
                          )}

                          {status === 'offline' && (
                             <div className="px-6 mb-4 flex items-center gap-2 text-[9px] font-black text-red-600 uppercase">
                                <AlertCircle size={12} /> hardware desconectado
                             </div>
                          )}

                          <div className="p-6 pt-2 mt-auto bg-slate-50/50 flex gap-2">
                             <button 
                                onClick={() => { setCurrentBeacon({bizId: b.id, promo: b.promotion || {beaconHardwareId: hardware.uuid, frequencyPerDay: 3, activeTimeMinutes: 60}}); setEditMode('beacon'); }} 
                                disabled={status === 'offline'}
                                className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-md transition-all flex items-center justify-center gap-2 ${status === 'offline' ? 'bg-slate-200 text-slate-400' : b.promotion ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'}`}
                             >
                                {b.promotion ? <Settings2 size={14}/> : <Plus size={14}/>}
                                {b.promotion ? 'Gestión' : 'Vincular'}
                             </button>
                             {b.promotion && (
                                <button onClick={() => deleteBeacon(b.id)} className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center border border-red-100 shadow-sm active:scale-90 transition-all">
                                    <Trash2 size={18} />
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
        </main>
      </div>
    </div>
  );
};

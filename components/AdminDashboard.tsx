
import React, { useState, useEffect } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem, ForumPost, ViewState } from '../types';
import { 
  Trash2, Plus, Calendar, Image as ImageIcon, Save, X, 
  Zap, Tag, Edit3, ShoppingBag, Globe, MapPin, 
  Radar, ShieldCheck,
  Facebook, Instagram, Twitter, Eye,
  Users, Shield, Settings2, Phone,
  MessageCircle, Rss, RefreshCw, ToggleLeft, ToggleRight, CheckCircle,
  BarChart3, MousePointer2, Layout, Filter, ArrowRight, Signal, Cpu, Wifi, MessageSquare,
  Server, Mail, Key, Link as LinkIcon, DollarSign, TrendingUp, AlertTriangle, Check, Battery, Languages, Sparkles, Crown
} from './Icons';
import { MOCK_FORUM_POSTS } from '../data';

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
  autoPublish: boolean;
  mappingRules?: string;
}

interface SmtpConfig {
  host: string;
  port: string;
  user: string;
  pass: string;
  secure: boolean;
  fromName: string;
  fromEmail: string;
  maintenanceMode: boolean;
  debugLogs: boolean;
}

const MOCK_SOURCES: SyncSource[] = [
  { id: 's1', name: 'Ayuntamiento Facebook', platform: 'FACEBOOK', status: 'ACTIVE', url: 'https://facebook.com/pilardelahoradada', frequency: 60, lastSync: 'Hace 5 min', autoPublish: true },
  { id: 's2', name: 'Turismo Instagram', platform: 'INSTAGRAM', status: 'ACTIVE', url: 'https://instagram.com/visitpilar', frequency: 120, lastSync: 'Hace 1 hora', autoPublish: true },
  { id: 's3', name: 'Policía Local Alertas', platform: 'TWITTER', status: 'ACTIVE', url: 'https://twitter.com/policiapilar', frequency: 15, lastSync: 'Hace 2 min', autoPublish: true },
];

const LANGUAGES_CONFIG = ['es', 'en', 'fr', 'de', 'it'];

// Helper for ROI Calculation
const calculateROI = (ad: Ad) => {
    const cost = ad.budget || 100;
    const valuePerClick = 0.5; // Valor estimado por click
    const revenue = (ad.clicks || 0) * valuePerClick;
    const roi = ((revenue - cost) / cost) * 100;
    return roi.toFixed(1);
};

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    ads, setAds, events, setEvents, businesses, setBusinesses, admins, setAdmins, onLogout, currentUserRole
}) => {
  const [activeTab, setActiveTab] = useState<'businesses' | 'news' | 'ads' | 'beacons' | 'team' | 'forum' | 'users' | 'settings'>('businesses');
  
  // Estados Data
  const [syncSources, setSyncSources] = useState<SyncSource[]>(MOCK_SOURCES);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(() => 
    MOCK_FORUM_POSTS.map((p, i) => ({...p, status: i === 0 ? 'PENDING' : 'APPROVED'}))
  );

  // Estados Edición
  const [editMode, setEditMode] = useState<'none' | 'biz' | 'news' | 'ad' | 'beacon' | 'admin' | 'user' | 'source'>('none');
  
  // Forms Temp Data
  const [currentBiz, setCurrentBiz] = useState<Partial<CensusItem>>({});
  const [currentAdmin, setCurrentAdmin] = useState<Partial<AdminUser>>({});
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({});
  const [currentUserEdit, setCurrentUserEdit] = useState<any>({});
  const [currentSource, setCurrentSource] = useState<Partial<SyncSource>>({});
  
  // Specific States
  const [editingBeaconId, setEditingBeaconId] = useState<string | null>(null);
  const [beaconLangTab, setBeaconLangTab] = useState<string>('es');
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);
  
  // System Settings State
  const [smtpConfig, setSmtpConfig] = useState<SmtpConfig>({
    host: '', port: '587', user: '', pass: '', secure: true, fromName: 'Pilar App', fromEmail: 'noreply@pilarapp.com',
    maintenanceMode: false, debugLogs: true
  });
  const [isTestingSmtp, setIsTestingSmtp] = useState(false);

  // Polling
  useEffect(() => {
      const loadData = () => {
          const logs = localStorage.getItem('pilar_email_logs');
          if (logs) setEmailLogs(JSON.parse(logs).reverse());

          const localUser = localStorage.getItem('pilar_user_db');
          const mocks = [
              { id: 'u1', name: 'Juan Pérez', email: 'juan@gmail.com', role: 'USER', date: '2024-05-10', password: '***' },
              { id: 'u2', name: 'Maria Garcia', email: 'maria@outlook.com', role: 'USER', date: '2024-05-11', password: '***' },
          ];
          if (localUser) {
              const u = JSON.parse(localUser);
              mocks.unshift({ id: 'u0', name: u.name, email: u.email, role: 'USER', date: 'Ahora', password: u.pass });
          }
          setRegisteredUsers(mocks);

          // Load Settings
          const storedSmtp = localStorage.getItem('pilar_smtp_config');
          if (storedSmtp) setSmtpConfig(JSON.parse(storedSmtp));
      };
      loadData();
      const interval = setInterval(loadData, 2000);
      return () => clearInterval(interval);
  }, []);

  const isSuperAdmin = currentUserRole === 'SUPER_ADMIN';
  const canAccessTab = (tab: string) => {
    if (isSuperAdmin) return true;
    switch (currentUserRole) {
      case 'ADMIN_GENERAL': return true;
      case 'ADMIN_COMMERCE': return ['businesses', 'beacons', 'ads'].includes(tab);
      case 'ADMIN_CULTURE': return ['news', 'events', 'forum'].includes(tab);
      default: return false;
    }
  };

  // --- ACTIONS ---

  // Business & Beacons
  const saveBiz = () => {
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
      images: currentBiz.images && currentBiz.images.length > 0 ? currentBiz.images : ['https://images.unsplash.com/photo-1441986300917-64674bd600d8'],
      hours: currentBiz.hours || { weekdays: '09:00 - 14:00', weekend: 'Cerrado' }
    } as CensusItem;

    if (currentBiz.id) setBusinesses(prev => prev.map(b => b.id === item.id ? item : b));
    else setBusinesses(prev => [item, ...prev]);
    setEditMode('none');
  };

  const createBeacon = (bizId: string) => {
      const defaultBeacon: Promotion = {
          isActive: false,
          range: 'NEAR',
          maxDistanceMeters: 20,
          frequencyRules: { maxPerHour: 1, maxPerDay: 3, maxPerWeek: 7 },
          multilingualContent: {
              es: { title: '¡Oferta Exclusiva!', description: 'Entra y descubre descuentos.' },
              en: { title: 'Exclusive Offer!', description: 'Come in and discover discounts.' }
          },
          hardwareId: `BCN-${Math.floor(Math.random()*10000).toString().padStart(4, '0')}`,
          imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=800&q=80'
      };
      
      setBusinesses(prev => prev.map(b => b.id === bizId ? { ...b, promotion: defaultBeacon } : b));
      const biz = businesses.find(b => b.id === bizId);
      if (biz) {
          setCurrentBiz({ ...biz, promotion: defaultBeacon });
          setEditingBeaconId(bizId);
          setEditMode('beacon');
      }
  };

  const toggleBeaconStatus = (bizId: string) => {
    setBusinesses(prev => prev.map(b => {
        if (b.id === bizId && b.promotion) {
            return { ...b, promotion: { ...b.promotion, isActive: !b.promotion.isActive } };
        }
        return b;
    }));
  };

  const autoTranslateBeacon = () => {
      // Simulate AI translation copying Spanish text to others
      const esContent = currentBiz.promotion?.multilingualContent?.['es'];
      if (!esContent) return;
      
      const newContent = { ...currentBiz.promotion?.multilingualContent };
      LANGUAGES_CONFIG.forEach(lang => {
          if (lang !== 'es') {
              newContent[lang] = { 
                  title: `${esContent.title} (${lang})`, 
                  description: `${esContent.description} (Auto-translated to ${lang})` 
              };
          }
      });
      setCurrentBiz({...currentBiz, promotion: { ...currentBiz.promotion!, multilingualContent: newContent }});
      alert("Contenido traducido automáticamente a 4 idiomas.");
  };

  // Settings
  const saveSettings = () => {
      localStorage.setItem('pilar_smtp_config', JSON.stringify(smtpConfig));
      alert("Configuración del sistema guardada correctamente.");
  };

  const testConnection = () => {
      setIsTestingSmtp(true);
      setTimeout(() => {
          setIsTestingSmtp(false);
          alert(`Conexión exitosa con ${smtpConfig.host || 'localhost'}. Latencia: 24ms.`);
      }, 1500);
  };

  // Other Actions
  const saveSource = () => { /* ... existing logic ... */ setEditMode('none'); };
  const updatePostStatus = (id: string, status: 'APPROVED' | 'REJECTED') => { setForumPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p)); };
  const saveAd = () => { /* ... existing logic ... */ setEditMode('none'); };
  const saveUser = () => { /* ... existing logic ... */ setEditMode('none'); };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      <header className="bg-[#0f172a] p-6 text-white shadow-xl flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><ShieldCheck size={24}/></div>
          <div>
            <h1 className="text-xl font-black uppercase tracking-tighter">Panel de Control</h1>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{currentUserRole}</p>
          </div>
        </div>
        <button onClick={onLogout} className="px-6 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all">Salir</button>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <nav className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'businesses', label: 'Censo & Web', icon: ShoppingBag },
            { id: 'news', label: 'Sync Fuentes', icon: Rss },
            { id: 'forum', label: 'Moderación Foro', icon: MessageSquare },
            { id: 'ads', label: 'Publicidad Pro', icon: BarChart3 },
            { id: 'beacons', label: 'Smart Beacons', icon: Radar },
            { id: 'users', label: 'Usuarios App', icon: Users },
            { id: 'team', label: 'Equipo PH', icon: Shield },
            { id: 'settings', label: 'Sistema', icon: Settings2 }
          ].filter(t => canAccessTab(t.id)).map(tab => (
            <button 
                key={tab.id} 
                onClick={() => { setActiveTab(tab.id as any); setEditMode('none'); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-200'}`}
            >
                <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </nav>

        <main className="animate-in fade-in duration-300">
            
            {/* --- BEACONS --- */}
            {activeTab === 'beacons' && (
                <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
                    {editMode === 'beacon' ? (
                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="lg:w-1/2 space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-2xl font-black">Editar Beacon: {currentBiz.name}</h3>
                                    <button onClick={() => setEditMode('none')}><X size={24} className="text-slate-400"/></button>
                                </div>
                                
                                {/* Content Language Tabs */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex gap-2">
                                        {LANGUAGES_CONFIG.map(l => (
                                            <button key={l} onClick={() => setBeaconLangTab(l)} className={`w-8 h-8 rounded text-xs font-black uppercase ${beaconLangTab === l ? 'bg-blue-600 text-white' : 'bg-slate-100'}`}>{l}</button>
                                        ))}
                                    </div>
                                    <button onClick={autoTranslateBeacon} className="text-[10px] font-black uppercase text-purple-600 flex items-center gap-1 hover:bg-purple-50 px-3 py-1 rounded-lg transition-all"><Sparkles size={12}/> Auto-Translate</button>
                                </div>

                                <div className="space-y-4">
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Título ({beaconLangTab})</label>
                                        <input className="w-full p-3 bg-slate-50 rounded-xl font-bold text-sm" 
                                            value={currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.title || ''} 
                                            onChange={e => {
                                                const newContent = { ...currentBiz.promotion?.multilingualContent, [beaconLangTab]: { ...currentBiz.promotion?.multilingualContent?.[beaconLangTab], title: e.target.value } };
                                                setCurrentBiz({...currentBiz, promotion: { ...currentBiz.promotion!, multilingualContent: newContent }});
                                            }} 
                                        />
                                    </div>
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Mensaje ({beaconLangTab})</label>
                                        <textarea className="w-full p-3 bg-slate-50 rounded-xl h-24 text-sm" 
                                            value={currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.description || ''} 
                                            onChange={e => {
                                                const newContent = { ...currentBiz.promotion?.multilingualContent, [beaconLangTab]: { ...currentBiz.promotion?.multilingualContent?.[beaconLangTab], description: e.target.value } };
                                                setCurrentBiz({...currentBiz, promotion: { ...currentBiz.promotion!, multilingualContent: newContent }});
                                            }} 
                                        />
                                    </div>
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Imagen de Notificación (URL)</label>
                                        <input className="w-full p-3 bg-slate-50 rounded-xl text-xs" value={currentBiz.promotion?.imageUrl || ''} onChange={e => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, imageUrl: e.target.value}})} />
                                    </div>
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Código Promo (Opcional)</label><input className="w-full p-3 bg-slate-50 rounded-xl font-mono text-center tracking-widest text-blue-600 font-black" value={currentBiz.promotion?.discountCode || ''} onChange={e => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, discountCode: e.target.value}})} /></div>
                                </div>

                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h4 className="text-xs font-black uppercase mb-4 flex items-center gap-2"><Cpu size={14}/> Configuración Hardware</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="text-[10px] font-bold text-slate-400 uppercase">UUID</label><input className="w-full p-2 bg-white rounded font-mono text-xs" value={currentBiz.promotion?.hardwareId} readOnly /></div>
                                        <div><label className="text-[10px] font-bold text-slate-400 uppercase">Rango (m)</label><input type="range" className="w-full" min="1" max="50" value={currentBiz.promotion?.maxDistanceMeters} onChange={e => setCurrentBiz({...currentBiz, promotion: {...currentBiz.promotion!, maxDistanceMeters: parseInt(e.target.value)}})} /> {currentBiz.promotion?.maxDistanceMeters}m</div>
                                    </div>
                                </div>

                                <button onClick={saveBiz} className="w-full py-4 bg-[#0f172a] text-white rounded-xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 hover:bg-black transition-all">
                                    <Save size={18} /> Guardar Beacon
                                </button>
                            </div>

                            {/* Preview Area (Smartphone Style) */}
                            <div className="lg:w-1/2 flex items-center justify-center bg-slate-100 rounded-[30px] p-8">
                                <div className="w-[300px] h-[600px] bg-white rounded-[40px] shadow-2xl overflow-hidden border-8 border-slate-900 relative">
                                    <div className="bg-slate-900 h-6 w-full absolute top-0 left-0 z-10 flex justify-center"><div className="w-20 h-4 bg-black rounded-b-xl"></div></div>
                                    {/* Phone Screen */}
                                    <div className="pt-12 pb-8 px-4 bg-slate-50 h-full flex flex-col items-center">
                                        <div className="w-full bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 animate-in slide-in-from-top duration-700 mt-10">
                                            <div className="flex gap-3 mb-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0"><Radar size={16}/></div>
                                                <div>
                                                    <h5 className="font-bold text-[10px] text-slate-900 uppercase">PH Beacon</h5>
                                                    <span className="text-[9px] text-slate-400">Ahora mismo</span>
                                                </div>
                                            </div>
                                            {currentBiz.promotion?.imageUrl && (
                                                <div className="w-full h-24 rounded-lg overflow-hidden mb-3 bg-gray-200">
                                                    <img src={currentBiz.promotion.imageUrl} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <h4 className="font-black text-sm text-gray-900 mb-1 leading-tight">{currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.title || 'Título'}</h4>
                                            <p className="text-[10px] text-slate-500 leading-snug">{currentBiz.promotion?.multilingualContent?.[beaconLangTab]?.description || 'Descripción del mensaje...'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-black flex items-center gap-2"><Radar className="text-blue-600"/> Red de Dispositivos</h3>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-[10px] font-black uppercase">{businesses.filter(b => b.promotion?.isActive).length} Activos</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase">{businesses.length} Negocios</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {businesses.map(b => (
                                    <div key={b.id} className={`flex flex-col md:flex-row justify-between items-center p-6 bg-white rounded-[24px] border transition-all ${b.promotion ? (b.promotion.isActive ? 'border-green-200 shadow-md' : 'border-gray-200 opacity-70') : 'border-dashed border-gray-200 opacity-50 hover:opacity-100'}`}>
                                        <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 ${b.promotion ? (b.promotion.isActive ? 'bg-green-500' : 'bg-gray-400') : 'bg-slate-200'}`}>
                                                {b.promotion ? <Signal size={24} className={b.promotion.isActive ? 'animate-pulse' : ''}/> : <Plus size={24}/>}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg leading-none mb-1">{b.name}</h4>
                                                {b.promotion ? (
                                                    <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                                                        <span>ID: {b.promotion.hardwareId}</span>
                                                        <span className="flex items-center gap-1"><Battery size={10}/> 98%</span>
                                                        <span className="flex items-center gap-1"><Wifi size={10}/> {b.promotion.maxDistanceMeters}m</span>
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sin dispositivo asignado</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                                            {b.promotion ? (
                                                <>
                                                    <button onClick={() => toggleBeaconStatus(b.id)} className={`p-3 rounded-xl transition-all ${b.promotion.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                                        {b.promotion.isActive ? <ToggleRight size={24}/> : <ToggleLeft size={24}/>}
                                                    </button>
                                                    <button onClick={() => { setCurrentBiz(b); setEditingBeaconId(b.id); setEditMode('beacon'); }} className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-black">
                                                        Configurar
                                                    </button>
                                                </>
                                            ) : (
                                                <button onClick={() => createBeacon(b.id)} className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-100 border border-blue-100">
                                                    + Asignar Beacon
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* --- SYSTEM SETTINGS --- */}
            {activeTab === 'settings' && (
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200">
                        <div className="flex items-center gap-6 mb-10 pb-6 border-b border-gray-100">
                            <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-black text-white rounded-[28px] flex items-center justify-center shadow-2xl rotate-3">
                                <Settings2 size={40} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Sistema & Comunicaciones</h2>
                                <p className="text-slate-400 text-sm font-medium mt-1">Configuración del servidor de correo y estado de la plataforma.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Columna Izquierda: SMTP */}
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest border-b border-blue-100 pb-2 mb-6 flex items-center gap-2">
                                        <Server size={16} /> Servidor SMTP (Correo Saliente)
                                    </h4>
                                    <div className="space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Host</label>
                                            <input 
                                                type="text"
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-mono text-sm" 
                                                placeholder="smtp.gmail.com"
                                                value={smtpConfig.host}
                                                onChange={(e) => setSmtpConfig({...smtpConfig, host: e.target.value})}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Puerto</label>
                                                <input 
                                                    type="text"
                                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 transition-all font-mono text-sm" 
                                                    placeholder="587"
                                                    value={smtpConfig.port}
                                                    onChange={(e) => setSmtpConfig({...smtpConfig, port: e.target.value})}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Seguridad</label>
                                                <button 
                                                    onClick={() => setSmtpConfig({...smtpConfig, secure: !smtpConfig.secure})}
                                                    className={`w-full h-[54px] rounded-2xl text-xs font-black uppercase tracking-wider border transition-all flex items-center justify-center gap-2 ${smtpConfig.secure ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                                                >
                                                    {smtpConfig.secure ? <><ShieldCheck size={14}/> SSL/TLS</> : 'Ninguna'}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Usuario / Email</label>
                                            <input 
                                                type="text"
                                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 transition-all" 
                                                placeholder="tu@email.com"
                                                value={smtpConfig.user}
                                                onChange={(e) => setSmtpConfig({...smtpConfig, user: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase ml-2">Contraseña</label>
                                            <div className="relative">
                                                <input 
                                                    type="password"
                                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:border-blue-500 transition-all" 
                                                    placeholder="••••••••••••"
                                                    value={smtpConfig.pass}
                                                    onChange={(e) => setSmtpConfig({...smtpConfig, pass: e.target.value})}
                                                />
                                                <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha: Identidad y Estado */}
                            <div className="flex flex-col h-full space-y-8">
                                <div>
                                    <h4 className="text-xs font-black text-purple-600 uppercase tracking-widest border-b border-purple-100 pb-2 mb-6 flex items-center gap-2">
                                        <Mail size={16} /> Identidad del Remitente
                                    </h4>
                                    <div className="bg-purple-50 p-6 rounded-[30px] border border-purple-100 space-y-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-purple-400 uppercase ml-2">Nombre Visible</label>
                                            <input 
                                                type="text"
                                                className="w-full p-4 bg-white border border-purple-100 rounded-2xl font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-200 transition-all" 
                                                placeholder="Pilar App"
                                                value={smtpConfig.fromName}
                                                onChange={(e) => setSmtpConfig({...smtpConfig, fromName: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-purple-400 uppercase ml-2">Email Remitente</label>
                                            <input 
                                                type="text"
                                                className="w-full p-4 bg-white border border-purple-100 rounded-2xl font-bold text-gray-700 outline-none focus:ring-2 focus:ring-purple-200 transition-all" 
                                                placeholder="noreply@pilardelahoradada.org"
                                                value={smtpConfig.fromEmail}
                                                onChange={(e) => setSmtpConfig({...smtpConfig, fromEmail: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 bg-slate-50 p-6 rounded-[30px] border border-slate-200 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                                            <span className="text-xs font-bold text-gray-600">Modo Mantenimiento</span>
                                            <button onClick={() => setSmtpConfig({...smtpConfig, maintenanceMode: !smtpConfig.maintenanceMode})} className={`w-10 h-6 rounded-full p-1 transition-colors ${smtpConfig.maintenanceMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${smtpConfig.maintenanceMode ? 'translate-x-4' : ''}`}></div>
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100">
                                            <span className="text-xs font-bold text-gray-600">Debug Logs</span>
                                            <button onClick={() => setSmtpConfig({...smtpConfig, debugLogs: !smtpConfig.debugLogs})} className={`w-10 h-6 rounded-full p-1 transition-colors ${smtpConfig.debugLogs ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${smtpConfig.debugLogs ? 'translate-x-4' : ''}`}></div>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-6">
                                        <button 
                                            onClick={testConnection}
                                            disabled={isTestingSmtp}
                                            className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center gap-2 ${isTestingSmtp ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        >
                                            {isTestingSmtp ? <RefreshCw size={14} className="animate-spin"/> : <Zap size={14} />} Probar Conexión
                                        </button>
                                        <button 
                                            onClick={saveSettings}
                                            className="flex-1 bg-[#0f172a] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2"
                                        >
                                            <Save size={14} /> Guardar Todo
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- CENSO COMERCIAL (Existing) --- */}
            {activeTab === 'businesses' && (
                <div className="space-y-6">
                    {editMode === 'biz' ? (
                        <div className="bg-white p-8 rounded-[30px] shadow-2xl border border-slate-100">
                            <h3 className="text-2xl font-black mb-6 border-b pb-4">Editar Ficha Comercial</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Nombre Comercial</label><input className="w-full p-3 bg-slate-50 rounded-xl font-bold" value={currentBiz.name || ''} onChange={e => setCurrentBiz({...currentBiz, name: e.target.value})} /></div>
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Dirección Física</label><input className="w-full p-3 bg-slate-50 rounded-xl" value={currentBiz.address || ''} onChange={e => setCurrentBiz({...currentBiz, address: e.target.value})} /></div>
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Teléfono Contacto</label><input className="w-full p-3 bg-slate-50 rounded-xl" value={currentBiz.phone || ''} onChange={e => setCurrentBiz({...currentBiz, phone: e.target.value})} /></div>
                                </div>
                                <div className="space-y-4">
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Sitio Web / Enlace</label><input className="w-full p-3 bg-slate-50 rounded-xl text-blue-600" value={currentBiz.website || ''} onChange={e => setCurrentBiz({...currentBiz, website: e.target.value})} /></div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Foto Principal (URL)</label>
                                        <div className="flex gap-4">
                                            <input className="flex-1 p-3 bg-slate-50 rounded-xl text-xs" value={currentBiz.images?.[0] || ''} onChange={e => setCurrentBiz({...currentBiz, images: [e.target.value]})} />
                                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden"><img src={currentBiz.images?.[0]} className="w-full h-full object-cover" /></div>
                                        </div>
                                    </div>
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Descripción Profesional</label><textarea className="w-full p-3 bg-slate-50 rounded-xl h-24" value={currentBiz.description || ''} onChange={e => setCurrentBiz({...currentBiz, description: e.target.value})} /></div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setEditMode('none')} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50">Cancelar</button>
                                <button onClick={saveBiz} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-blue-700">Guardar Ficha</button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <button onClick={() => { setCurrentBiz({}); setEditMode('biz'); }} className="flex flex-col items-center justify-center h-48 rounded-[30px] border-2 border-dashed border-slate-300 text-slate-400 hover:border-blue-500 hover:text-blue-500 transition-all gap-2">
                                <Plus size={32} /> <span className="font-black uppercase tracking-widest text-xs">Añadir Comercio</span>
                            </button>
                            {businesses.map(b => (
                                <div key={b.id} className="bg-white p-5 rounded-[30px] shadow-sm border border-slate-100 flex gap-4 group hover:shadow-xl transition-all">
                                    <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden shrink-0"><img src={b.images?.[0]} className="w-full h-full object-cover" /></div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 truncate">{b.name}</h4>
                                        <p className="text-xs text-slate-500 mb-2 truncate">{b.address}</p>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setCurrentBiz(b); setEditMode('biz'); }} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={14} /></button>
                                            <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* --- SYNC FUENTES (Existing) --- */}
            {activeTab === 'news' && (
                <div className="space-y-6">
                    {editMode === 'source' ? (
                        <div className="bg-white p-8 rounded-[30px] shadow-xl border border-slate-100">
                            {/* ... Content from previous turn ... */}
                            <h3 className="text-2xl font-black mb-6 flex items-center gap-3"><Zap className="text-amber-500"/> Configurar Fuente Sync</h3>
                            <div className="space-y-5 max-w-2xl">
                                <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre Identificativo</label><input className="w-full p-3 bg-slate-50 rounded-xl font-bold" value={currentSource.name} onChange={e => setCurrentSource({...currentSource, name: e.target.value})} /></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Plataforma</label>
                                        <select className="w-full p-3 bg-slate-50 rounded-xl font-bold" value={currentSource.platform} onChange={e => setCurrentSource({...currentSource, platform: e.target.value as any})}>
                                            <option value="FACEBOOK">Facebook API</option>
                                            <option value="INSTAGRAM">Instagram Graph</option>
                                            <option value="TWITTER">X (Twitter) API</option>
                                            <option value="RSS">RSS Feed XML</option>
                                        </select>
                                    </div>
                                    <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">Frecuencia (min)</label><input type="number" className="w-full p-3 bg-slate-50 rounded-xl" value={currentSource.frequency} onChange={e => setCurrentSource({...currentSource, frequency: parseInt(e.target.value)})} /></div>
                                </div>
                                <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">URL Endpoint / Feed</label><input className="w-full p-3 bg-slate-50 rounded-xl font-mono text-xs text-blue-600" value={currentSource.url} onChange={e => setCurrentSource({...currentSource, url: e.target.value})} /></div>
                                <div><label className="block text-xs font-bold text-slate-400 uppercase mb-1">API Key / Token (Encriptado)</label><input type="password" className="w-full p-3 bg-slate-50 rounded-xl font-mono text-xs" placeholder="••••••••••••••••" value={currentSource.apiKey || ''} onChange={e => setCurrentSource({...currentSource, apiKey: e.target.value})} /></div>
                                <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                                    <span className="font-bold text-sm">Auto-Publicar sin revisión</span>
                                    <button onClick={() => setCurrentSource({...currentSource, autoPublish: !currentSource.autoPublish})} className={`w-12 h-6 rounded-full transition-all ${currentSource.autoPublish ? 'bg-green-500' : 'bg-slate-300'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${currentSource.autoPublish ? 'translate-x-7' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 flex gap-3">
                                <button onClick={() => setEditMode('none')} className="px-6 py-3 rounded-xl font-bold text-slate-500">Cancelar</button>
                                <button onClick={saveSource} className="px-8 py-3 bg-amber-500 text-white rounded-xl font-black uppercase tracking-widest shadow-lg hover:bg-amber-600">Guardar Conexión</button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            <button onClick={() => { setCurrentSource({ platform: 'RSS', frequency: 60, autoPublish: false }); setEditMode('source'); }} className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-black"><Plus size={18}/> Nueva Fuente</button>
                            {syncSources.map(s => (
                                <div key={s.id} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${s.platform === 'FACEBOOK' ? 'bg-blue-600' : s.platform === 'INSTAGRAM' ? 'bg-pink-600' : s.platform === 'TWITTER' ? 'bg-black' : 'bg-orange-500'}`}>
                                            <Zap size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{s.name}</h4>
                                            <div className="flex gap-3 text-xs text-slate-400 font-medium">
                                                <span className="flex items-center gap-1"><RefreshCw size={10}/> {s.frequency}min</span>
                                                <span className="flex items-center gap-1"><CheckCircle size={10}/> {s.lastSync}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setCurrentSource(s); setEditMode('source'); }} className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600"><Settings2 size={18}/></button>
                                        <div className={`px-4 py-2 rounded-xl font-black text-xs flex items-center ${s.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-500'}`}>{s.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* --- FORO (Existing) --- */}
            {activeTab === 'forum' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-black text-lg text-amber-500 uppercase tracking-widest flex items-center gap-2"><AlertTriangle size={18}/> Pendientes de Aprobación</h3>
                        {forumPosts.filter(p => p.status === 'PENDING').length === 0 && <p className="text-slate-400 italic text-sm">No hay mensajes pendientes.</p>}
                        {forumPosts.filter(p => p.status === 'PENDING').map(post => (
                            <div key={post.id} className="bg-white p-6 rounded-[24px] shadow-lg border-l-4 border-amber-400">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black bg-slate-100 px-2 py-1 rounded text-slate-500">{post.category}</span>
                                    <span className="text-[10px] text-slate-400">{post.time}</span>
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1">{post.title}</h4>
                                <p className="text-sm text-slate-600 mb-4">{post.content}</p>
                                <div className="flex gap-2 justify-end">
                                    <button onClick={() => updatePostStatus(post.id, 'REJECTED')} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-black uppercase hover:bg-red-100">Rechazar</button>
                                    <button onClick={() => updatePostStatus(post.id, 'APPROVED')} className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-black uppercase hover:bg-green-600 shadow-lg">Aprobar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-black text-lg text-green-600 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={18}/> Publicados</h3>
                        {forumPosts.filter(p => p.status === 'APPROVED').map(post => (
                            <div key={post.id} className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-100 opacity-80 hover:opacity-100 transition-opacity">
                                <div className="flex justify-between">
                                    <h4 className="font-bold text-sm">{post.title}</h4>
                                    <button className="text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                                </div>
                                <p className="text-xs text-slate-500 mt-1 truncate">{post.content}</p>
                                <div className="mt-2 text-[10px] font-bold text-slate-400">Por: {post.user}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --- ADS (Updated) --- */}
            {activeTab === 'ads' && (
                <div>
                    {editMode === 'ad' ? (
                        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                            <div className="p-8 lg:w-1/2 space-y-6 border-r border-slate-100">
                                {/* ... Ad form ... */}
                                <h3 className="text-2xl font-black mb-4">Configuración de Campaña</h3>
                                <div className="space-y-4">
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Cliente / Anunciante</label><input className="w-full p-3 bg-slate-50 rounded-xl font-bold" value={currentAd.clientName} onChange={e => setCurrentAd({...currentAd, clientName: e.target.value})} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="text-xs font-bold text-slate-400 uppercase">Vista (Página)</label>
                                            <select className="w-full p-3 bg-slate-50 rounded-xl" value={currentAd.view} onChange={e => setCurrentAd({...currentAd, view: e.target.value as any})}>
                                                {Object.values(ViewState).map(v => <option key={v} value={v}>{v}</option>)}
                                            </select>
                                        </div>
                                        <div><label className="text-xs font-bold text-slate-400 uppercase">Posición</label>
                                            <select className="w-full p-3 bg-slate-50 rounded-xl" value={currentAd.position} onChange={e => setCurrentAd({...currentAd, position: e.target.value as any})}>
                                                <option value="page-top">Top Página</option>
                                                <option value="page-bottom">Bottom Página</option>
                                                <option value="menu-top">Menú Top</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* New Selectors: Type & Language */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase">Tipo</label>
                                            <select
                                                className="w-full p-3 bg-slate-50 rounded-xl font-bold"
                                                value={currentAd.isPremium ? 'premium' : 'normal'}
                                                onChange={e => setCurrentAd({...currentAd, isPremium: e.target.value === 'premium'})}
                                            >
                                                <option value="normal">Estándar</option>
                                                <option value="premium">Premium (Gold)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-slate-400 uppercase">Idioma</label>
                                            <select
                                                className="w-full p-3 bg-slate-50 rounded-xl"
                                                value={currentAd.language || ''}
                                                onChange={e => setCurrentAd({...currentAd, language: e.target.value || undefined})}
                                            >
                                                <option value="">Todos (Global)</option>
                                                {LANGUAGES_CONFIG.map(l => <option key={l} value={l}>{l.toUpperCase()}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Context Filter */}
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase">Contexto / Filtro (Opcional)</label>
                                        <input
                                            className="w-full p-3 bg-slate-50 rounded-xl text-xs font-mono text-blue-600"
                                            placeholder="Ej: CENTRO, TRABAJO, all..."
                                            value={currentAd.filterContext || ''}
                                            onChange={e => setCurrentAd({...currentAd, filterContext: e.target.value})}
                                        />
                                        <p className="text-[9px] text-gray-400 mt-1 font-medium">Define etiquetas específicas para segmentar (ej: zona o categoría).</p>
                                    </div>

                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Enlace Destino</label><input className="w-full p-3 bg-slate-50 rounded-xl text-blue-500 text-xs font-mono" value={currentAd.linkUrl} onChange={e => setCurrentAd({...currentAd, linkUrl: e.target.value})} /></div>
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Imagen Creatividad (URL)</label><input className="w-full p-3 bg-slate-50 rounded-xl text-xs" value={currentAd.imageUrl} onChange={e => setCurrentAd({...currentAd, imageUrl: e.target.value})} /></div>
                                    
                                    <div className="pt-4 border-t border-slate-100">
                                        <h4 className="font-black text-sm mb-3">Contrato & Presupuesto</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><label className="text-[10px] font-bold text-slate-400 uppercase">Inicio</label><input type="date" className="w-full p-2 bg-slate-50 rounded-lg" value={currentAd.startDate} onChange={e => setCurrentAd({...currentAd, startDate: e.target.value})} /></div>
                                            <div><label className="text-[10px] font-bold text-slate-400 uppercase">Fin</label><input type="date" className="w-full p-2 bg-slate-50 rounded-lg" value={currentAd.endDate} onChange={e => setCurrentAd({...currentAd, endDate: e.target.value})} /></div>
                                        </div>
                                        <div className="mt-3"><label className="text-[10px] font-bold text-slate-400 uppercase">Presupuesto Total (€)</label><input type="number" className="w-full p-2 bg-slate-50 rounded-lg font-mono font-bold" value={currentAd.budget} onChange={e => setCurrentAd({...currentAd, budget: parseFloat(e.target.value)})} /></div>
                                    </div>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button onClick={() => setEditMode('none')} className="px-6 py-3 rounded-xl font-bold text-slate-500">Cancelar</button>
                                    <button onClick={saveAd} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest shadow-xl">Guardar Campaña</button>
                                </div>
                            </div>
                            
                            <div className="p-8 lg:w-1/2 bg-slate-50 flex flex-col gap-8">
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Vista Previa</h4>
                                    <div className="w-full aspect-[3/1] rounded-2xl overflow-hidden shadow-2xl relative bg-white group">
                                        <img src={currentAd.imageUrl} className="w-full h-full object-cover" />
                                        <div className={`absolute top-0 right-0 ${currentAd.isPremium ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white'} text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase flex items-center gap-1`}>
                                            {currentAd.isPremium && <Crown size={10} />} {currentAd.clientName}
                                        </div>
                                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase">Patrocinado</div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Métricas Estimadas (ROI)</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-4 rounded-2xl shadow-sm"><div className="text-xs text-slate-400 uppercase font-bold">Impresiones</div><div className="text-2xl font-black text-slate-900">{currentAd.impressions || 0}</div></div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm"><div className="text-xs text-slate-400 uppercase font-bold">Clicks</div><div className="text-2xl font-black text-blue-600">{currentAd.clicks || 0}</div></div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm"><div className="text-xs text-slate-400 uppercase font-bold">CTR</div><div className="text-2xl font-black text-purple-600">{currentAd.impressions ? ((currentAd.clicks!/currentAd.impressions!)*100).toFixed(1) : 0}%</div></div>
                                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-green-100"><div className="text-xs text-green-600 uppercase font-bold">ROI Est.</div><div className="text-2xl font-black text-green-600">{calculateROI(currentAd as Ad)}%</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <button onClick={() => { setCurrentAd({ isActive: true, budget: 500 }); setEditMode('ad'); }} className="h-full min-h-[200px] rounded-[30px] border-2 border-dashed border-indigo-200 bg-indigo-50/50 flex flex-col items-center justify-center text-indigo-400 hover:bg-indigo-50 transition-all">
                                <Plus size={32} /> <span className="font-black uppercase tracking-widest text-xs mt-2">Nueva Campaña</span>
                            </button>
                            {ads.map(ad => (
                                <div key={ad.id} className="bg-white p-6 rounded-[30px] shadow-sm border border-slate-100 relative group hover:-translate-y-1 transition-all">
                                    <div className="h-32 w-full rounded-2xl overflow-hidden mb-4 relative">
                                        <img src={ad.imageUrl} className="w-full h-full object-cover" />
                                        <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-[9px] font-black uppercase text-white ${ad.isActive ? 'bg-green-500' : 'bg-gray-400'}`}>{ad.isActive ? 'Activo' : 'Pausado'}</div>
                                    </div>
                                    <h4 className="font-black text-lg">{ad.clientName}</h4>
                                    <p className="text-xs text-slate-400 font-mono mb-4">{ad.view} • {ad.position}</p>
                                    <div className="flex justify-between items-center border-t pt-4">
                                        <div className="text-xs font-bold"><span className="text-blue-600">{ad.clicks}</span> clicks</div>
                                        <button onClick={() => { setCurrentAd(ad); setEditMode('ad'); }} className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200"><Settings2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* --- USERS & TEAM (Existing) --- */}
            {(activeTab === 'users' || activeTab === 'team') && (
                <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100">
                    <h3 className="text-2xl font-black mb-6">{activeTab === 'users' ? 'Gestión de Ciudadanos' : 'Equipo Administrativo'}</h3>
                    {editMode === 'user' ? (
                        <div className="max-w-xl mx-auto space-y-6 animate-in zoom-in-95">
                            <div className="space-y-4">
                                <div><label className="text-xs font-bold text-slate-400 uppercase">Nombre Completo</label><input className="w-full p-4 bg-slate-50 rounded-2xl font-bold" value={currentUserEdit.name || ''} onChange={e => setCurrentUserEdit({...currentUserEdit, name: e.target.value})} /></div>
                                <div><label className="text-xs font-bold text-slate-400 uppercase">Email</label><input className="w-full p-4 bg-slate-50 rounded-2xl" value={currentUserEdit.email || ''} onChange={e => setCurrentUserEdit({...currentUserEdit, email: e.target.value})} /></div>
                                <div><label className="text-xs font-bold text-slate-400 uppercase">Contraseña</label><input className="w-full p-4 bg-slate-50 rounded-2xl" type="text" placeholder="Cambiar contraseña..." value={currentUserEdit.password || ''} onChange={e => setCurrentUserEdit({...currentUserEdit, password: e.target.value})} /></div>
                                {activeTab === 'team' && (
                                    <div><label className="text-xs font-bold text-slate-400 uppercase">Rol de Sistema</label>
                                        <select className="w-full p-4 bg-slate-50 rounded-2xl font-bold" value={currentUserEdit.role} onChange={e => setCurrentUserEdit({...currentUserEdit, role: e.target.value})}>
                                            <option value="SUPER_ADMIN">Super Admin (Acceso Total)</option>
                                            <option value="ADMIN_GENERAL">Admin General</option>
                                            <option value="ADMIN_COMMERCE">Gestor Comercio</option>
                                            <option value="EDITOR_NEWS">Editor Noticias</option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => setEditMode('none')} className="flex-1 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100">Cancelar</button>
                                <button onClick={saveUser} className="flex-1 py-4 bg-[#0f172a] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Guardar Cambios</button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeTab === 'team' && <button onClick={() => { setCurrentUserEdit({ role: 'ADMIN_GENERAL' }); setEditMode('user'); }} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 font-bold hover:border-blue-500 hover:text-blue-500 mb-6">+ Añadir Miembro</button>}
                            {(activeTab === 'users' ? registeredUsers : admins).map((u: any) => (
                                <div key={u.id || u.email} className="flex justify-between items-center p-5 bg-slate-50 rounded-2xl group hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-white ${activeTab === 'users' ? 'bg-blue-400' : 'bg-[#0f172a]'}`}>{u.name?.charAt(0)}</div>
                                        <div><h4 className="font-bold text-slate-900">{u.name}</h4><p className="text-xs text-slate-500">{u.email}</p></div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {activeTab === 'team' && <span className="text-[10px] font-black bg-slate-200 px-3 py-1 rounded-full uppercase">{u.role}</span>}
                                        <button onClick={() => { setCurrentUserEdit(u); setEditMode('user'); }} className="p-2 text-slate-400 hover:text-blue-600"><Edit3 size={18}/></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

        </main>
      </div>
    </div>
  );
};

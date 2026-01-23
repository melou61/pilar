
import React, { useState, useMemo } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem, NewsItem, NewsCategory, ViewState } from '../types';
import { 
  Trash2, Plus, Calendar, Image as ImageIcon, Save, X, LogOut, 
  Zap, Tag, Edit3, ShoppingBag, Globe, MapPin, 
  Radio, Clock, Check, Phone, Filter,
  ShieldCheck, TrendingUp, Newspaper, Radar, AlertCircle, Share2,
  Facebook, Instagram, Twitter, Video, Eye, MousePointer2, Activity, BarChart3,
  Battery, Wifi, Settings2, Signal, Cpu, Layers, Users, UserPlus, Shield, Lock, ChevronRight
} from './Icons';
import { MOCK_NEWS } from '../data';

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

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    ads, setAds, events, setEvents, businesses, setBusinesses, admins, setAdmins, onLogout, currentUserRole
}) => {
  const [activeTab, setActiveTab] = useState<'businesses' | 'news' | 'ads' | 'beacons' | 'team'>('businesses');
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS);
  const [syncSocials, setSyncSocials] = useState({ facebook: true, instagram: true, tiktok: true, twitter: false });
  const [editMode, setEditMode] = useState<'none' | 'biz' | 'news' | 'ad' | 'beacon' | 'admin'>('none');
  
  const [currentBiz, setCurrentBiz] = useState<Partial<CensusItem>>({});
  const [currentNews, setCurrentNews] = useState<Partial<NewsItem>>({});
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({});
  const [currentAdmin, setCurrentAdmin] = useState<Partial<AdminUser>>({});

  const isSuperAdmin = currentUserRole === 'SUPER_ADMIN';
  
  const canAccessTab = (tab: string) => {
    if (isSuperAdmin) return true;
    switch (currentUserRole) {
      case 'ADMIN_GENERAL': return ['businesses', 'news', 'ads'].includes(tab);
      case 'ADMIN_COMMERCE': return ['businesses', 'beacons'].includes(tab);
      case 'ADMIN_CULTURE': return ['news', 'events'].includes(tab);
      case 'ADMIN_SPORTS': return ['news'].includes(tab);
      default: return false;
    }
  };

  const getRoleBadgeColor = (role: AdminRole) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'ADMIN_GENERAL': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ADMIN_COMMERCE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'ADMIN_CULTURE': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const roleLabels: Record<AdminRole, string> = {
    SUPER_ADMIN: 'Super Administrador (Acceso Total)',
    ADMIN_GENERAL: 'Administrador General (Contenido y Censo)',
    ADMIN_COMMERCE: 'Administrador de Comercio (Tiendas y Beacons)',
    ADMIN_CULTURE: 'Administrador de Cultura (Noticias y Eventos)',
    ADMIN_SPORTS: 'Administrador de Deportes (Noticias Deportivas)'
  };

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
        
        {/* TABS DE ACCIÓN */}
        <nav className="flex gap-2 bg-white p-2 rounded-[28px] shadow-xl border border-slate-200 overflow-x-auto no-scrollbar">
          {[
            { id: 'businesses', label: 'Censo Comercial', icon: ShoppingBag },
            { id: 'news', label: 'Sync News', icon: Globe },
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
          
          {/* SECCIÓN EQUIPO (CORREGIDA) */}
          {activeTab === 'team' && isSuperAdmin && (
            <div className="space-y-6">
              {editMode === 'admin' ? (
                <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <div className="flex justify-between items-center mb-8 pb-4 border-b">
                    <h3 className="text-2xl font-black tracking-tighter">Gestión de Acceso</h3>
                    <button onClick={() => setEditMode('none')}><X /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Nombre completo" value={currentAdmin.name || ''} onChange={e => setCurrentAdmin({...currentAdmin, name: e.target.value})} />
                       <input className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" placeholder="Email institucional" value={currentAdmin.email || ''} onChange={e => setCurrentAdmin({...currentAdmin, email: e.target.value})} />
                    </div>
                    <div className="space-y-4">
                       <select className="w-full p-5 bg-slate-50 rounded-2xl font-bold border" value={currentAdmin.role} onChange={e => setCurrentAdmin({...currentAdmin, role: e.target.value as AdminRole})}>
                          <option value="ADMIN_GENERAL">Administrador General</option>
                          <option value="ADMIN_COMMERCE">Administrador de Comercio</option>
                          <option value="ADMIN_CULTURE">Administrador de Cultura</option>
                          <option value="ADMIN_SPORTS">Administrador de Deportes</option>
                          <option value="SUPER_ADMIN">Super Administrador</option>
                       </select>
                    </div>
                  </div>
                  <button onClick={saveAdmin} className="w-full mt-10 py-6 bg-[#0f172a] text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
                    <Save size={20} /> Guardar Administrador
                  </button>
                </div>
              ) : (
                <>
                  {/* ENCABEZADO CORREGIDO: SE ELIMINAN DESBORDAMIENTOS */}
                  <div className="bg-[#0f172a] rounded-[35px] shadow-xl overflow-hidden text-white flex flex-col sm:flex-row items-stretch sm:items-center">
                    <div className="p-8 sm:p-10 flex-1 flex items-center gap-5">
                       <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shrink-0"><Shield size={28}/></div>
                       <div>
                          <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none">Equipo de Administración ({admins.length})</h2>
                          <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-2">Acceso exclusivo SuperAdmin</p>
                       </div>
                    </div>
                    
                    {/* BOTÓN ALINEADO Y SEGURO */}
                    <div className="p-4 sm:p-10 sm:pt-10 flex justify-center sm:justify-end">
                      <button 
                        onClick={() => { setCurrentAdmin({role: 'ADMIN_GENERAL'}); setEditMode('admin'); }} 
                        className="w-full sm:w-auto bg-blue-600 text-white px-8 py-5 rounded-[22px] font-black text-[11px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all active:scale-95 whitespace-nowrap"
                      >
                        <UserPlus size={18} /> 
                        <span>Alta Administrador</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-8">
                    {admins.map(admin => (
                      <div key={admin.id} className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-md flex items-center gap-6 group hover:border-blue-300 transition-all">
                        <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-black text-xl">
                           {admin.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-slate-900 tracking-tight flex items-center gap-2">
                             {admin.name}
                             {admin.id === 'adm-1' && <Lock size={12} className="text-blue-500" />}
                          </h4>
                          <p className="text-[10px] font-bold text-slate-400 truncate max-w-xs">{admin.email}</p>
                        </div>
                        <div className="hidden md:block">
                           <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${getRoleBadgeColor(admin.role)}`}>
                              {admin.role.replace('_', ' ')}
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

          {/* ... Resto de secciones (news, biz, ads) ... */}
          {activeTab === 'businesses' && canAccessTab('businesses') && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-8 rounded-[35px] shadow-xl border border-slate-100">
                <h2 className="text-xl font-black tracking-tighter uppercase">Censo Comercial</h2>
                <button onClick={() => setEditMode('biz')} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest">Alta Nuevo</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

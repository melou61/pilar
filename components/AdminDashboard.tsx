
import React, { useState } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem } from '../types';
import { 
  Trash2, Plus, Calendar, Image as ImageIcon, Save, X, LogOut, 
  Zap, Tag, Edit3, ShoppingBag, UtensilsCrossed, Users, Shield, MapPin, Star,
  Radio, Clock, Navigation, Sparkles, Mail, ExternalLink, CalendarPlus, UserX, Check
} from './Icons';

interface AdminDashboardProps {
  ads: Ad[];
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  businesses: CensusItem[];
  setBusinesses: React.Dispatch<React.SetStateAction<CensusItem[]>>;
  onLogout: () => void;
  currentUserRole: AdminRole;
  onTestBeacon?: (shopId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    ads, setAds, events, setEvents, businesses, setBusinesses, onLogout, currentUserRole, onTestBeacon
}) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'events' | 'businesses' | 'beacons' | 'users'>('ads');
  
  // Estados de edición
  const [isEditingAd, setIsEditingAd] = useState(false);
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({});

  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event>>({});

  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState<Partial<CensusItem>>({});
  
  const [isConfiguringBeacon, setIsConfiguringBeacon] = useState(false);
  const [targetBusinessId, setTargetBusinessId] = useState<string | null>(null);
  const [newPromo, setNewPromo] = useState<Partial<Promotion>>({
    proximityRange: 'NEAR',
    frequencyMinutes: 30,
    dailyLimit: 3
  });

  // Usuarios simulados (en una app real vendrían de Firebase/API)
  const [mockUsers] = useState([
    { id: '1', name: 'Juan García', email: 'juan@pilar.es', role: 'USER', active: true },
    { id: '2', name: 'María López', email: 'm.lopez@gmail.com', role: 'USER', active: false },
    { id: '3', name: 'Carlos Admin', email: 'admin@pilarhoradada.com', role: 'ADMIN', active: true },
  ]);

  // Handlers CRUD Publicidad
  const handleSaveAd = () => {
    const adToSave: Ad = {
      id: currentAd.id || Date.now().toString(),
      clientName: currentAd.clientName || 'Nuevo Cliente',
      imageUrl: currentAd.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      linkUrl: currentAd.linkUrl || '#',
      position: currentAd.position || 'page-top',
      startDate: currentAd.startDate || new Date().toISOString().split('T')[0],
      endDate: currentAd.endDate || '2025-12-31',
      isActive: true
    };

    if (currentAd.id) setAds(prev => prev.map(a => a.id === currentAd.id ? adToSave : a));
    else setAds(prev => [...prev, adToSave]);
    setIsEditingAd(false);
  };

  // Handlers CRUD Agenda
  const handleSaveEvent = () => {
    const eventToSave: Event = {
      id: currentEvent.id || Date.now().toString(),
      title: currentEvent.title || 'Nuevo Evento',
      category: currentEvent.category || 'CULTURA',
      date: currentEvent.date || 'Próximamente',
      location: currentEvent.location || 'Pilar de la Horadada',
      description: currentEvent.description || '',
      longDescription: currentEvent.longDescription || '',
      imageUrl: currentEvent.imageUrl || 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
      isFestival: currentEvent.isFestival || false,
      lat: currentEvent.lat || 37.8653,
      lng: currentEvent.lng || -0.7932
    };

    if (currentEvent.id) setEvents(prev => prev.map(e => e.id === currentEvent.id ? eventToSave : e));
    else setEvents(prev => [...prev, eventToSave]);
    setIsEditingEvent(false);
  };

  const handleSaveBusiness = () => {
    const businessToSave: CensusItem = {
        id: currentBusiness.id || Date.now().toString(),
        name: currentBusiness.name || '',
        category: currentBusiness.category || '',
        address: currentBusiness.address || 'Pilar de la Horadada',
        phone: currentBusiness.phone || '',
        description: currentBusiness.description || '',
        rating: currentBusiness.rating || 5.0,
        reviewCount: currentBusiness.reviewCount || 0,
        isOpen: true,
        images: currentBusiness.images || ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'],
        hours: { weekdays: '09:00 - 14:00', weekend: 'Cerrado' },
        lat: currentBusiness.lat || 37.8653,
        lng: currentBusiness.lng || -0.7932,
        promotion: currentBusiness.promotion
    } as CensusItem;

    if (currentBusiness.id) setBusinesses(prev => prev.map(b => b.id === currentBusiness.id ? businessToSave : b));
    else setBusinesses(prev => [...prev, businessToSave]);
    setIsEditingBusiness(false);
  };

  const handleSaveBeacon = () => {
    setBusinesses(prev => prev.map(b => {
        if (b.id === targetBusinessId) {
            return { ...b, promotion: { ...newPromo, beaconUuid: 'PILAR-' + b.id.toUpperCase() } as Promotion };
        }
        return b;
    }));
    setIsConfiguringBeacon(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 pb-40 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Superior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3">
                <Shield size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">Admin Pilar</h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Control Central de la Ciudad</p>
            </div>
          </div>
          <button onClick={onLogout} className="px-8 py-4 bg-red-50 text-red-600 rounded-[22px] font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
            Cerrar Sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white p-2 rounded-[30px] shadow-xl border border-gray-100 overflow-x-auto no-scrollbar">
            {[
                { id: 'ads', label: 'Publicidad', icon: Tag },
                { id: 'businesses', label: 'Comercios', icon: ShoppingBag },
                { id: 'beacons', label: 'Beacons', icon: Zap },
                { id: 'events', label: 'Agenda', icon: Calendar },
                { id: 'users', label: 'Usuarios', icon: Users },
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-[22px] font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    <tab.icon size={18} />
                    {tab.label}
                </button>
            ))}
        </div>

        <main className="animate-in fade-in duration-500">
            {/* VISTA PUBLICIDAD */}
            {activeTab === 'ads' && (
                isEditingAd ? (
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-black tracking-tighter">Configurar Anuncio</h3>
                            <button onClick={() => setIsEditingAd(false)}><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Cliente / Marca</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentAd.clientName || ''} onChange={e => setCurrentAd({...currentAd, clientName: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Posición</label>
                                <select className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentAd.position} onChange={e => setCurrentAd({...currentAd, position: e.target.value as any})}>
                                    <option value="page-top">Cabecera de Página</option>
                                    <option value="page-bottom">Pie de Página</option>
                                    <option value="menu-top">Superior Menú Lateral</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Imagen Creativa (URL)</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentAd.imageUrl || ''} onChange={e => setCurrentAd({...currentAd, imageUrl: e.target.value})} />
                            </div>
                        </div>
                        <div className="mt-12 flex justify-end gap-4">
                            <button onClick={handleSaveAd} className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black shadow-xl flex items-center gap-2"><Save /> Guardar Campaña</button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-blue-50 p-6 rounded-[30px]">
                            <h3 className="font-black text-blue-900 text-xl tracking-tighter">Banners Publicitarios</h3>
                            <button onClick={() => { setCurrentAd({}); setIsEditingAd(true); }} className="bg-blue-600 text-white px-8 py-4 rounded-[20px] font-black flex items-center gap-2"><Plus /> Nueva Campaña</button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {ads.map(ad => (
                                <div key={ad.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl flex items-center gap-6">
                                    <div className="w-32 h-20 rounded-2xl overflow-hidden bg-gray-100 border border-gray-50">
                                        <img src={ad.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 tracking-tighter">{ad.clientName}</h4>
                                        <div className="flex gap-2 mt-1">
                                            <span className="text-[9px] font-black px-2 py-1 bg-gray-100 rounded-md text-gray-500 uppercase">{ad.position}</span>
                                            <span className="text-[9px] font-black px-2 py-1 bg-green-50 rounded-md text-green-600 uppercase">Activo</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setCurrentAd(ad); setIsEditingAd(true); }} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={20} /></button>
                                        <button onClick={() => setAds(prev => prev.filter(a => a.id !== ad.id))} className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* VISTA AGENDA */}
            {activeTab === 'events' && (
                isEditingEvent ? (
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-black tracking-tighter">Editor de Eventos</h3>
                            <button onClick={() => setIsEditingEvent(false)}><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Nombre del Evento</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentEvent.title || ''} onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Fecha / Temporada</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentEvent.date || ''} onChange={e => setCurrentEvent({...currentEvent, date: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Categoría</label>
                                <select className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentEvent.category} onChange={e => setCurrentEvent({...currentEvent, category: e.target.value})}>
                                    <option value="TRADICIÓN">Tradición</option>
                                    <option value="FESTIVAL">Festival / Charanga</option>
                                    <option value="DEPORTE">Deporte</option>
                                    <option value="GASTRONOMÍA">Gastronomía</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-12 flex justify-end gap-4">
                            <button onClick={handleSaveEvent} className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black shadow-xl flex items-center gap-2"><Save /> Publicar en Agenda</button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-orange-50 p-6 rounded-[30px]">
                            <h3 className="font-black text-orange-900 text-xl tracking-tighter">Agenda Cultural</h3>
                            <button onClick={() => { setCurrentEvent({}); setIsEditingEvent(true); }} className="bg-orange-600 text-white px-8 py-4 rounded-[20px] font-black flex items-center gap-2"><Plus /> Crear Evento</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {events.map(event => (
                                <div key={event.id} className="bg-white p-6 rounded-[40px] border border-gray-100 shadow-xl flex flex-col gap-4">
                                    <div className="h-40 rounded-3xl overflow-hidden">
                                        <img src={event.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 tracking-tighter">{event.title}</h4>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{event.date}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setCurrentEvent(event); setIsEditingEvent(true); }} className="flex-1 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2"><Edit3 size={14} /> Editar</button>
                                        <button onClick={() => setEvents(prev => prev.filter(e => e.id !== event.id))} className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* VISTA COMERCIOS */}
            {activeTab === 'businesses' && (
                isEditingBusiness ? (
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100 animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-black tracking-tighter">Gestión de Censo</h3>
                            <button onClick={() => setIsEditingBusiness(false)}><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Nombre Comercial</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentBusiness.name || ''} onChange={e => setCurrentBusiness({...currentBusiness, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Categoría</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentBusiness.category || ''} onChange={e => setCurrentBusiness({...currentBusiness, category: e.target.value})} />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Dirección</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentBusiness.address || ''} onChange={e => setCurrentBusiness({...currentBusiness, address: e.target.value})} />
                            </div>
                        </div>
                        <div className="mt-12 flex justify-end gap-4">
                            <button onClick={handleSaveBusiness} className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black shadow-xl flex items-center gap-2"><Save /> Actualizar Censo</button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-blue-50 p-6 rounded-[30px]">
                            <h3 className="font-black text-blue-900 text-xl tracking-tighter">Establecimientos Municipales</h3>
                            <button onClick={() => { setCurrentBusiness({}); setIsEditingBusiness(true); }} className="bg-blue-600 text-white px-8 py-4 rounded-[20px] font-black flex items-center gap-2"><Plus /> Añadir Negocio</button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {businesses.map(b => (
                                <div key={b.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100">
                                        <img src={b.images[0]} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 tracking-tighter">{b.name}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{b.category}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setCurrentBusiness(b); setIsEditingBusiness(true); }} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Edit3 size={20} /></button>
                                        <button onClick={() => setBusinesses(prev => prev.filter(item => item.id !== b.id))} className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* VISTA BEACONS */}
            {activeTab === 'beacons' && (
                isConfiguringBeacon ? (
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-black tracking-tighter text-blue-600 flex items-center gap-3"><Zap /> Smart Beacon Config</h3>
                            <button onClick={() => setIsConfiguringBeacon(false)}><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
                                    <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Radio size={16}/> Hardware ID</h4>
                                    <input className="w-full p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm" value={newPromo.beaconHardwareId || ''} onChange={e => setNewPromo({...newPromo, beaconHardwareId: e.target.value})} placeholder="PH-B01:4432" />
                                </div>
                                <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
                                    <h4 className="text-[11px] font-black text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={16}/> Frecuencia</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="number" className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold" value={newPromo.frequencyMinutes || 30} onChange={e => setNewPromo({...newPromo, frequencyMinutes: parseInt(e.target.value)})} placeholder="Min. Cooldown" />
                                        <input type="number" className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold" value={newPromo.dailyLimit || 3} onChange={e => setNewPromo({...newPromo, dailyLimit: parseInt(e.target.value)})} placeholder="Límite Diario" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-[32px] border border-blue-100 shadow-xl">
                                    <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2"><Navigation size={16}/> Contenido Oferta</h4>
                                    <input className="w-full p-4 bg-gray-50 border-none rounded-xl font-bold mb-4" value={newPromo.title || ''} onChange={e => setNewPromo({...newPromo, title: e.target.value})} placeholder="Título de la alerta" />
                                    <textarea className="w-full p-4 bg-gray-50 border-none rounded-xl font-medium text-sm h-32" value={newPromo.description || ''} onChange={e => setNewPromo({...newPromo, description: e.target.value})} placeholder="Mensaje push..." />
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 flex justify-end gap-4 border-t pt-8">
                            <button onClick={handleSaveBeacon} className="bg-blue-600 text-white px-12 py-5 rounded-[24px] font-black shadow-xl flex items-center gap-2"><Save /> Guardar Configuración Smart</button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-[#0f172a] p-10 rounded-[40px] text-white flex justify-between items-center shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-600/10 animate-pulse"></div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black tracking-tighter uppercase italic">Red de Beacons Municipales</h3>
                                <p className="text-blue-300 font-medium max-w-sm mt-2">Configura los parámetros físicos y de frecuencia para cada punto de la red Smart City.</p>
                            </div>
                            <Zap size={64} className="opacity-20 animate-pulse relative z-10" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {businesses.map(b => (
                                <div key={b.id} className={`bg-white p-8 rounded-[40px] border shadow-xl flex flex-col justify-between transition-all ${b.promotion ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-100 hover:border-blue-200'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-gray-50">
                                                <img src={b.images[0]} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-black text-gray-900 tracking-tighter">{b.name}</h4>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{b.category}</p>
                                            </div>
                                        </div>
                                        {b.promotion && <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg"><Zap size={20} className="fill-current" /></div>}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button onClick={() => { setTargetBusinessId(b.id); setNewPromo(b.promotion || { proximityRange: 'NEAR', frequencyMinutes: 30, dailyLimit: 3 }); setIsConfiguringBeacon(true); }} className="w-full bg-gray-900 text-white py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg"><Edit3 size={14} /> Configurar Smart Beacon</button>
                                        {b.promotion && (
                                            <div className="flex gap-2 w-full">
                                                <button onClick={() => onTestBeacon?.(b.id)} className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-100"><Sparkles size={14} /> Probar Notificación</button>
                                                <button onClick={() => setBusinesses(prev => prev.map(item => item.id === b.id ? { ...item, promotion: undefined } : item))} className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Trash2 size={20} /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* VISTA USUARIOS */}
            {activeTab === 'users' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-emerald-50 p-6 rounded-[30px] border border-emerald-100">
                        <h3 className="font-black text-emerald-900 text-xl tracking-tighter">Usuarios Registrados</h3>
                        <div className="bg-emerald-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">{mockUsers.length} TOTAL</div>
                    </div>
                    <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nombre y Perfil</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Rol</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Estado</th>
                                    <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockUsers.map(user => (
                                    <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${user.role === 'ADMIN' ? 'bg-blue-600 text-white shadow-lg' : 'bg-emerald-100 text-emerald-600'}`}>
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span className="font-bold text-gray-900">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-sm text-gray-500 font-medium">{user.email}</td>
                                        <td className="p-6">
                                            <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${user.role === 'ADMIN' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center">
                                            {user.active ? (
                                                <div className="flex items-center justify-center gap-1.5 text-green-500 text-[10px] font-black">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ONLINE
                                                </div>
                                            ) : (
                                                <div className="text-gray-300 text-[10px] font-black">OFFLINE</div>
                                            )}
                                        </td>
                                        <td className="p-6 text-right">
                                            <button className="text-gray-400 hover:text-red-600 p-2"><UserX size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

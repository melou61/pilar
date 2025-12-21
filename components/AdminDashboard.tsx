
import React, { useState } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem } from '../types';
import { COMMERCIAL_CENSUS, DINING_CENSUS } from '../data';
import { 
  Trash2, Plus, Calendar, Image as ImageIcon, Link as LinkIcon, Save, X, LogOut, 
  TrendingUp, AlertCircle, Layers, AlertTriangle, MapPin, 
  Users, UserPlus, Shield, UserX, Zap, Tag, Edit3
} from './Icons';

interface AdminDashboardProps {
  ads: Ad[];
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onLogout: () => void;
  currentUserRole: AdminRole;
  beaconPromotions?: Record<string, Promotion>;
  setBeaconPromotions?: React.Dispatch<React.SetStateAction<Record<string, Promotion>>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    ads, setAds, events, setEvents, onLogout, currentUserRole, 
    beaconPromotions = {}, setBeaconPromotions 
}) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'events' | 'users' | 'beacons'>('ads');
  
  // States for Editing
  const [isEditingAd, setIsEditingAd] = useState(false);
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({});
  
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event>>({});

  const [admins, setAdmins] = useState<AdminUser[]>([
    { id: '1', name: 'Super Admin', email: 'root@pilar.com', role: 'SUPER_ADMIN', createdAt: '2024-01-01' },
    { id: '2', name: 'Gestor Cultura', email: 'cultura@pilar.com', role: 'ADMIN_CULTURE', createdAt: '2025-02-15' },
  ]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({ role: 'ADMIN_GENERAL' });

  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [editingPromo, setEditingPromo] = useState<Partial<Promotion>>({});
  const [allShops] = useState<CensusItem[]>([...COMMERCIAL_CENSUS.flatMap(c => c.items), ...DINING_CENSUS.flatMap(c => c.items)]);

  const today = new Date().toISOString().split('T')[0];

  const canManageEvents = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN_CULTURE' || currentUserRole === 'ADMIN_GENERAL';
  const canManageAds = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN_COMMERCE' || currentUserRole === 'ADMIN_GENERAL';
  const canManageUsers = currentUserRole === 'SUPER_ADMIN';
  const canManageBeacons = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN_COMMERCE' || currentUserRole === 'ADMIN_GENERAL';

  // --- Handlers for Ads ---
  const handleSaveAd = () => {
    if (!currentAd.clientName || !currentAd.startDate || !currentAd.endDate) {
      alert('Por favor rellena los campos obligatorios');
      return;
    }

    if (currentAd.id) {
      setAds(prev => prev.map(ad => ad.id === currentAd.id ? { ...ad, ...currentAd } as Ad : ad));
    } else {
      const newAd: Ad = {
        ...currentAd,
        id: Date.now().toString(),
        isActive: true,
        imageUrl: currentAd.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
        linkUrl: currentAd.linkUrl || '#',
      } as Ad;
      setAds(prev => [...prev, newAd]);
    }
    setIsEditingAd(false);
    setCurrentAd({});
  };

  const handleDeleteAd = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este anuncio permanentemente?')) {
      setAds(prev => prev.filter(ad => ad.id !== id));
    }
  };

  // --- Handlers for Events ---
  const handleSaveEvent = () => {
    if (!currentEvent.title || !currentEvent.date || !currentEvent.location) {
        alert('Título, Fecha y Ubicación son obligatorios');
        return;
    }

    const eventToSave: Event = {
        id: currentEvent.id || Date.now().toString(),
        title: currentEvent.title!,
        date: currentEvent.date!,
        location: currentEvent.location!,
        category: currentEvent.category || 'General',
        description: currentEvent.description || '',
        longDescription: currentEvent.longDescription || currentEvent.description || '',
        imageUrl: currentEvent.imageUrl || 'https://picsum.photos/seed/event/800/500'
    };

    if (currentEvent.id) {
        setEvents(prev => prev.map(e => e.id === currentEvent.id ? eventToSave : e));
    } else {
        setEvents(prev => [...prev, eventToSave]);
    }
    setIsEditingEvent(false);
    setCurrentEvent({});
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('¿Eliminar este evento de la agenda municipal?')) {
        setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  // UI Components for Forms
  const AdForm = () => (
    <div className="bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Edit3 size={24} />
            </div>
            <h3 className="text-3xl font-black tracking-tighter text-gray-900">{currentAd.id ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h3>
        </div>
        <button onClick={() => setIsEditingAd(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nombre del Cliente / Empresa</label>
            <input 
              type="text" 
              value={currentAd.clientName || ''}
              onChange={e => setCurrentAd({...currentAd, clientName: e.target.value})}
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white text-gray-900 font-bold outline-none transition-all"
              placeholder="Ej: Mesón El Pilar"
            />
        </div>

        <div className="col-span-2 md:col-span-1">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">URL de la Imagen (Foto)</label>
            <div className="relative">
                <ImageIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={currentAd.imageUrl || ''}
                  onChange={e => setCurrentAd({...currentAd, imageUrl: e.target.value})}
                  className="w-full pl-12 p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white text-gray-900 font-bold outline-none"
                  placeholder="https://..."
                />
            </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col justify-end">
             {currentAd.imageUrl && (
                 <div className="h-16 w-full rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
                    <img src={currentAd.imageUrl} alt="Preview" className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                 </div>
             )}
        </div>

        <div className="md:col-span-1">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Fecha Inicio</label>
            <input 
              type="date" 
              value={currentAd.startDate || ''}
              onChange={e => setCurrentAd({...currentAd, startDate: e.target.value})}
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white text-gray-900 font-bold outline-none"
            />
        </div>
        
        <div className="md:col-span-1">
            <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 ml-1">Fecha Fin (Expiración)</label>
            <input 
              type="date" 
              value={currentAd.endDate || ''}
              onChange={e => setCurrentAd({...currentAd, endDate: e.target.value})}
              className="w-full p-5 bg-red-50 border border-red-100 rounded-2xl focus:ring-4 focus:ring-red-100 focus:bg-white text-red-900 font-bold outline-none"
            />
        </div>
      </div>

      <div className="mt-12 flex justify-end gap-4">
        <button onClick={() => setIsEditingAd(false)} className="px-8 py-4 text-gray-400 font-black uppercase tracking-widest text-xs hover:text-gray-600">Cancelar</button>
        <button 
            onClick={handleSaveAd}
            className="px-10 py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-3"
        >
            <Save size={20} />
            Guardar Cambios
        </button>
      </div>
    </div>
  );

  const EventForm = () => (
    <div className="bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                <Calendar size={24} />
            </div>
            <h3 className="text-3xl font-black tracking-tighter text-gray-900">{currentEvent.id ? 'Editar Evento' : 'Nuevo Evento'}</h3>
        </div>
        <button onClick={() => setIsEditingEvent(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">
            <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-2">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Título del Evento</label>
            <input 
              type="text" 
              value={currentEvent.title || ''}
              onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})}
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:bg-white text-gray-900 font-bold outline-none"
              placeholder="Ej: Fiestas Patronales 2025"
            />
        </div>

        <div className="col-span-2 md:col-span-1">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Foto del Evento (URL)</label>
            <div className="relative">
                <ImageIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={currentEvent.imageUrl || ''}
                  onChange={e => setCurrentEvent({...currentEvent, imageUrl: e.target.value})}
                  className="w-full pl-12 p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:bg-white text-gray-900 font-bold outline-none"
                  placeholder="https://..."
                />
            </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col justify-end">
             {currentEvent.imageUrl && (
                 <div className="h-16 w-full rounded-xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50">
                    <img src={currentEvent.imageUrl} alt="Preview" className="h-full w-full object-cover" />
                 </div>
             )}
        </div>

        <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Fecha / Rango</label>
            <input 
              type="text" 
              value={currentEvent.date || ''}
              onChange={e => setCurrentEvent({...currentEvent, date: e.target.value})}
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:bg-white text-gray-900 font-bold outline-none"
              placeholder="12 de Octubre"
            />
        </div>

        <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Ubicación</label>
            <input 
              type="text" 
              value={currentEvent.location || ''}
              onChange={e => setCurrentEvent({...currentEvent, location: e.target.value})}
              className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:bg-white text-gray-900 font-bold outline-none"
              placeholder="Plaza de la Iglesia"
            />
        </div>
      </div>

      <div className="mt-12 flex justify-end gap-4">
        <button onClick={() => setIsEditingEvent(false)} className="px-8 py-4 text-gray-400 font-black uppercase tracking-widest text-xs">Cancelar</button>
        <button 
            onClick={handleSaveEvent}
            className="px-10 py-5 bg-purple-600 text-white rounded-[24px] font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-200 hover:bg-purple-700 active:scale-95 transition-all flex items-center gap-3"
        >
            <Save size={20} />
            Actualizar Evento
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 pb-40 text-gray-900 selection:bg-blue-100">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Superior Admin */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-xl rotate-3">
                <Shield size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">Panel de Control</h2>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Pilar de la Horadada • Gestión Pública</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="text-right hidden md:block">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">Conectado como</span>
                <span className="text-lg font-black text-gray-900 tracking-tighter">{currentUserRole.split('_').join(' ')}</span>
             </div>
             <button 
                onClick={onLogout}
                className="group flex items-center gap-3 px-8 py-4 bg-red-50 text-red-600 rounded-[22px] font-black text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white shadow-xl shadow-red-100/50 transition-all active:scale-95"
            >
                <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                Salir
            </button>
          </div>
        </div>

        {/* Tabs de Navegación del Panel */}
        <div className="flex gap-2 bg-white p-2 rounded-[30px] shadow-xl border border-gray-100 overflow-x-auto no-scrollbar">
            {[
                { id: 'ads', label: 'Publicidad Local', icon: Tag },
                { id: 'beacons', label: 'Beacons 📡', icon: Zap },
                { id: 'events', label: 'Cultura y Fiestas', icon: Calendar },
                { id: 'users', label: 'Accesos Técnicos', icon: Users },
            ].map(tab => (
                <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-[22px] font-black text-[11px] uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                >
                    <tab.icon size={18} />
                    {tab.label}
                </button>
            ))}
        </div>

        <main className="animate-in fade-in duration-500">
            {activeTab === 'ads' && canManageAds && (
                isEditingAd ? <AdForm /> : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-blue-50/50 p-6 rounded-[30px] border border-blue-100">
                            <h3 className="font-black text-blue-900 text-xl tracking-tighter uppercase tracking-widest">Listado de Publicidad</h3>
                            <button 
                                onClick={() => { setCurrentAd({}); setIsEditingAd(true); }}
                                className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-[20px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                            >
                                <Plus size={20} /> Nuevo Cliente
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {ads.map(ad => (
                                <div key={ad.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl flex items-center gap-6 group">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                                        <img src={ad.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 tracking-tighter">{ad.clientName}</h4>
                                        <div className="flex gap-4 mt-2">
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Alta: {ad.startDate}</span>
                                            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">Baja: {ad.endDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => { setCurrentAd(ad); setIsEditingAd(true); }}
                                            className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                        >
                                            <Edit3 size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteAd(ad.id)}
                                            className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {activeTab === 'events' && canManageEvents && (
                isEditingEvent ? <EventForm /> : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-purple-50/50 p-6 rounded-[30px] border border-purple-100">
                            <h3 className="font-black text-purple-900 text-xl tracking-tighter uppercase tracking-widest">Agenda Cultural</h3>
                            <button 
                                onClick={() => { setCurrentEvent({}); setIsEditingEvent(true); }}
                                className="flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-black text-xs uppercase tracking-widest rounded-[20px] hover:bg-purple-700 transition-all shadow-xl shadow-purple-100"
                            >
                                <Plus size={20} /> Crear Evento
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            {events.map(event => (
                                <div key={event.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl flex items-center gap-6 group">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                                        <img src={event.imageUrl} className="w-full h-full object-cover" alt="" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 tracking-tighter">{event.title}</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{event.category} • {event.location}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => { setCurrentEvent(event); setIsEditingEvent(true); }}
                                            className="w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-600 rounded-2xl hover:bg-purple-600 hover:text-white transition-all shadow-sm"
                                        >
                                            <Edit3 size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteEvent(event.id)}
                                            className="w-12 h-12 flex items-center justify-center bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {activeTab === 'beacons' && (
                <div className="text-center py-20 bg-white rounded-[40px] shadow-xl border border-gray-100">
                    <Zap size={64} className="mx-auto text-blue-200 mb-6" />
                    <h3 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">Gestión de Beacons</h3>
                    <p className="text-gray-400 font-medium max-w-sm mx-auto">Selecciona un comercio desde el listado de 'Proximity' para configurar ofertas automáticas.</p>
                </div>
            )}

            {activeTab === 'users' && canManageUsers && (
                <div className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100">
                    <div className="flex items-center gap-4 mb-10">
                        <Users size={32} className="text-blue-600" />
                        <h3 className="text-3xl font-black tracking-tighter">Accesos Administrativos</h3>
                    </div>
                    <div className="space-y-4">
                        {admins.map(admin => (
                            <div key={admin.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[28px] border border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-blue-600 shadow-sm border border-gray-100">{admin.name.charAt(0)}</div>
                                    <div>
                                        <p className="font-black text-gray-900 leading-none">{admin.name}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{admin.role}</p>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-400 uppercase">Autorizado en {admin.createdAt}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

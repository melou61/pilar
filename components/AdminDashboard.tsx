
import React, { useState } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem } from '../types';
import { 
  Trash2, Plus, Calendar, Image as ImageIcon, Save, X, LogOut, 
  Zap, Tag, Edit3, ShoppingBag, UtensilsCrossed, Users, Shield, MapPin, Star,
  Radio, Clock, Navigation
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
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
    ads, setAds, events, setEvents, businesses, setBusinesses, onLogout, currentUserRole
}) => {
  const [activeTab, setActiveTab] = useState<'ads' | 'events' | 'businesses' | 'beacons' | 'users'>('ads');
  
  // Edición de Negocios
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState<Partial<CensusItem>>({});
  
  // Configuración de Beacon
  const [isConfiguringBeacon, setIsConfiguringBeacon] = useState(false);
  const [targetBusinessId, setTargetBusinessId] = useState<string | null>(null);
  const [newPromo, setNewPromo] = useState<Partial<Promotion>>({
    proximityRange: 'NEAR',
    frequencyMinutes: 30,
    dailyLimit: 3
  });

  const canManageAll = currentUserRole === 'SUPER_ADMIN';

  const handleSaveBusiness = () => {
    if (!currentBusiness.name || !currentBusiness.category) {
        alert('Nombre y categoría son obligatorios');
        return;
    }

    const businessToSave: CensusItem = {
        id: currentBusiness.id || Date.now().toString(),
        name: currentBusiness.name!,
        category: currentBusiness.category!,
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

    if (currentBusiness.id) {
        setBusinesses(prev => prev.map(b => b.id === currentBusiness.id ? businessToSave : b));
    } else {
        setBusinesses(prev => [...prev, businessToSave]);
    }
    setIsEditingBusiness(false);
    setCurrentBusiness({});
  };

  const handleDeleteBusiness = (id: string) => {
    if (confirm('¿Eliminar este negocio del censo municipal?')) {
        setBusinesses(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleSaveBeacon = () => {
    if (!newPromo.title || !newPromo.description || !newPromo.beaconHardwareId) {
        alert('Título, descripción e ID de Hardware son obligatorios');
        return;
    }

    setBusinesses(prev => prev.map(b => {
        if (b.id === targetBusinessId) {
            return { ...b, promotion: { ...newPromo, beaconUuid: 'PILAR-' + b.id.toUpperCase() } as Promotion };
        }
        return b;
    }));

    setIsConfiguringBeacon(false);
    setTargetBusinessId(null);
    setNewPromo({
        proximityRange: 'NEAR',
        frequencyMinutes: 30,
        dailyLimit: 3
    });
  };

  const removeBeacon = (id: string) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, promotion: undefined } : b));
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
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Gestión del Censo y Servicios</p>
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
            {/* VISTA DE COMERCIOS */}
            {activeTab === 'businesses' && (
                isEditingBusiness ? (
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-black tracking-tighter">{currentBusiness.id ? 'Editar Negocio' : 'Nuevo Negocio'}</h3>
                            <button onClick={() => setIsEditingBusiness(false)}><X /></button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="col-span-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Nombre Comercial</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentBusiness.name || ''} onChange={e => setCurrentBusiness({...currentBusiness, name: e.target.value})} placeholder="Ej: Restaurante Miramar" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Categoría</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentBusiness.category || ''} onChange={e => setCurrentBusiness({...currentBusiness, category: e.target.value})} placeholder="Ej: Gastronomía" />
                            </div>
                            <div>
                                <label className="text-[10px] font-black uppercase text-gray-400 block mb-2">Imagen (URL)</label>
                                <input className="w-full p-5 bg-gray-50 rounded-2xl font-bold" value={currentBusiness.images?.[0] || ''} onChange={e => setCurrentBusiness({...currentBusiness, images: [e.target.value]})} placeholder="https://..." />
                            </div>
                        </div>
                        <div className="mt-12 flex justify-end gap-4">
                            <button onClick={() => setIsEditingBusiness(false)} className="text-gray-400 font-black px-8">Cancelar</button>
                            <button onClick={handleSaveBusiness} className="bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black shadow-xl flex items-center gap-2"><Save size={20} /> Guardar Negocio</button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-blue-50 p-6 rounded-[30px] border border-blue-100">
                            <h3 className="font-black text-blue-900 text-xl tracking-tighter">Censo de Negocios</h3>
                            <button onClick={() => { setCurrentBusiness({}); setIsEditingBusiness(true); }} className="bg-blue-600 text-white px-8 py-4 rounded-[20px] font-black shadow-xl flex items-center gap-2">
                                <Plus /> Añadir Negocio
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {businesses.map(b => (
                                <div key={b.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl flex items-center gap-6">
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100"><img src={b.images[0]} className="w-full h-full object-cover" alt="" /></div>
                                    <div className="flex-1">
                                        <h4 className="text-xl font-black text-gray-900 tracking-tighter">{b.name}</h4>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{b.category}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => { setCurrentBusiness(b); setIsEditingBusiness(true); }} className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Edit3 size={20} /></button>
                                        <button onClick={() => handleDeleteBusiness(b.id)} className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center"><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}

            {/* VISTA DE BEACONS */}
            {activeTab === 'beacons' && (
                isConfiguringBeacon ? (
                    <div className="bg-white rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95 border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-3xl font-black tracking-tighter text-blue-600 flex items-center gap-3"><Zap /> Smart Beacon Config</h3>
                            <button onClick={() => setIsConfiguringBeacon(false)}><X /></button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Columna Izquierda: Hardware & Proximidad */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
                                    <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Radio size={16}/> Hardware & Señal</h4>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">ID Hardware (Major:Minor)</label>
                                            <input 
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl font-mono text-sm" 
                                                value={newPromo.beaconHardwareId || ''} 
                                                onChange={e => setNewPromo({...newPromo, beaconHardwareId: e.target.value})} 
                                                placeholder="PH-B01:4432" 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-gray-400 block mb-2">Rango de Proximidad (Lejanía)</label>
                                            <div className="flex gap-2">
                                                {[
                                                    { id: 'IMMEDIATE', label: 'Inmediato', desc: '0-2m' },
                                                    { id: 'NEAR', label: 'Cercano', desc: '2-10m' },
                                                    { id: 'FAR', label: 'Lejano', desc: '+10m' },
                                                ].map(r => (
                                                    <button 
                                                        key={r.id}
                                                        onClick={() => setNewPromo({...newPromo, proximityRange: r.id as any})}
                                                        className={`flex-1 p-3 rounded-xl border text-center transition-all ${
                                                            newPromo.proximityRange === r.id 
                                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
                                                            : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200'
                                                        }`}
                                                    >
                                                        <div className="text-[10px] font-black uppercase leading-tight">{r.label}</div>
                                                        <div className={`text-[8px] mt-0.5 ${newPromo.proximityRange === r.id ? 'text-white/60' : 'text-gray-400'}`}>{r.desc}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
                                    <h4 className="text-[11px] font-black text-orange-600 uppercase tracking-widest mb-4 flex items-center gap-2"><Clock size={16}/> Frecuencia & Límites</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Cooldown (Min.)</label>
                                            <input 
                                                type="number"
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold" 
                                                value={newPromo.frequencyMinutes || 30} 
                                                onChange={e => setNewPromo({...newPromo, frequencyMinutes: parseInt(e.target.value)})} 
                                            />
                                            <p className="text-[8px] text-gray-400 mt-1">Tiempo entre notificaciones al mismo móvil.</p>
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Límite Diario</label>
                                            <input 
                                                type="number"
                                                className="w-full p-4 bg-white border border-gray-200 rounded-xl font-bold" 
                                                value={newPromo.dailyLimit || 3} 
                                                onChange={e => setNewPromo({...newPromo, dailyLimit: parseInt(e.target.value)})} 
                                            />
                                            <p className="text-[8px] text-gray-400 mt-1">Máx. veces por usuario cada 24h.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Columna Derecha: Contenido de la Oferta */}
                            <div className="space-y-6">
                                <div className="bg-white p-6 rounded-[32px] border border-blue-100 shadow-xl shadow-blue-500/5">
                                    <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-4 flex items-center gap-2"><Navigation size={16}/> Contenido del Mensaje</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Título de la Alerta</label>
                                            <input 
                                                className="w-full p-4 bg-gray-50 border-none rounded-xl font-bold" 
                                                value={newPromo.title || ''} 
                                                onChange={e => setNewPromo({...newPromo, title: e.target.value})} 
                                                placeholder="Ej: ¡2x1 en Tapas hoy!" 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Mensaje Detallado</label>
                                            <textarea 
                                                className="w-full p-4 bg-gray-50 border-none rounded-xl font-medium text-sm h-32 resize-none" 
                                                value={newPromo.description || ''} 
                                                onChange={e => setNewPromo({...newPromo, description: e.target.value})} 
                                                placeholder="Describe la oferta que saldrá en la notificación push..." 
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[9px] font-black uppercase text-gray-400 block mb-1">Código Promocional</label>
                                            <input 
                                                className="w-full p-4 bg-gray-50 border-none rounded-xl font-mono text-blue-600 font-black uppercase" 
                                                value={newPromo.discountCode || ''} 
                                                onChange={e => setNewPromo({...newPromo, discountCode: e.target.value.toUpperCase()})} 
                                                placeholder="PILAR25" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 flex justify-end gap-4 border-t border-gray-100 pt-8">
                            <button onClick={() => setIsConfiguringBeacon(false)} className="text-gray-400 font-black px-8">Descartar</button>
                            <button onClick={handleSaveBeacon} className="bg-blue-600 text-white px-12 py-5 rounded-[24px] font-black shadow-xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                                <Save size={20} /> Guardar Configuración Smart
                            </button>
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
                                        {b.promotion && (
                                            <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-100">
                                                <Zap size={20} className="fill-current" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {b.promotion ? (
                                        <div className="space-y-3 mb-6">
                                            <div className="bg-blue-50 p-5 rounded-3xl">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Contenido Activo</span>
                                                    <span className="text-[9px] font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full uppercase">{b.promotion.proximityRange}</span>
                                                </div>
                                                <h5 className="font-black text-blue-900 text-sm mb-1">{b.promotion.title}</h5>
                                                <p className="text-[10px] text-blue-700/70 font-medium line-clamp-1">{b.promotion.description}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex-1 bg-gray-50 p-3 rounded-2xl text-center">
                                                    <div className="text-[8px] text-gray-400 font-bold uppercase">Hardware ID</div>
                                                    <div className="text-[10px] font-mono font-black text-gray-600">{b.promotion.beaconHardwareId}</div>
                                                </div>
                                                <div className="flex-1 bg-gray-50 p-3 rounded-2xl text-center">
                                                    <div className="text-[8px] text-gray-400 font-bold uppercase">Límite Diario</div>
                                                    <div className="text-[10px] font-black text-gray-600">{b.promotion.dailyLimit} Veces</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-8 border-2 border-dashed border-gray-100 rounded-3xl text-center mb-6 flex flex-col items-center justify-center gap-2">
                                            <Radio size={24} className="text-gray-200" />
                                            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Punto Inactivo</p>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => { setTargetBusinessId(b.id); setNewPromo(b.promotion || { proximityRange: 'NEAR', frequencyMinutes: 30, dailyLimit: 3 }); setIsConfiguringBeacon(true); }}
                                            className="flex-1 bg-gray-900 text-white py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            <Edit3 size={14} /> {b.promotion ? 'Editar Parámetros' : 'Configurar Smart Beacon'}
                                        </button>
                                        {b.promotion && (
                                            <button onClick={() => removeBeacon(b.id)} className="w-14 h-14 bg-red-50 text-red-600 rounded-[20px] flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            )}
        </main>
      </div>
    </div>
  );
};

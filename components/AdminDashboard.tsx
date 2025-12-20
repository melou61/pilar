import React, { useState } from 'react';
import { Ad, Event, AdminUser, AdminRole, Promotion, CensusItem } from '../types';
import { COMMERCIAL_CENSUS, DINING_CENSUS } from '../data';
import { 
  Trash2, Plus, Calendar, Image, Link as LinkIcon, Save, X, LogOut, 
  TrendingUp, AlertCircle, Layers, AlertTriangle, MapPin, 
  Users, UserPlus, Shield, UserX, Zap, Tag
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
  
  // Ad State
  const [isEditingAd, setIsEditingAd] = useState(false);
  const [currentAd, setCurrentAd] = useState<Partial<Ad>>({});
  
  // Event State
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event>>({});

  // User Management State (Mocked)
  const [admins, setAdmins] = useState<AdminUser[]>([
    { id: '1', name: 'Super Admin', email: 'root@pilar.com', role: 'SUPER_ADMIN', createdAt: '2024-01-01' },
    { id: '2', name: 'Gestor Cultura', email: 'cultura@pilar.com', role: 'ADMIN_CULTURE', createdAt: '2025-02-15' },
  ]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<AdminUser>>({ role: 'ADMIN_GENERAL' });

  // Beacon State
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [editingPromo, setEditingPromo] = useState<Partial<Promotion>>({});
  const [allShops] = useState<CensusItem[]>([...COMMERCIAL_CENSUS.flatMap(c => c.items), ...DINING_CENSUS.flatMap(c => c.items)]);


  const today = new Date().toISOString().split('T')[0];

  // --- Permission Helpers ---
  const canManageEvents = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN_CULTURE' || currentUserRole === 'ADMIN_SPORTS' || currentUserRole === 'ADMIN_GENERAL';
  const canManageAds = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN_COMMERCE' || currentUserRole === 'ADMIN_GENERAL';
  const canManageUsers = currentUserRole === 'SUPER_ADMIN';
  const canManageBeacons = currentUserRole === 'SUPER_ADMIN' || currentUserRole === 'ADMIN_COMMERCE' || currentUserRole === 'ADMIN_GENERAL';

  // --- Statistics ---
  const activeCount = ads.filter(ad => ad.isActive && ad.startDate <= today && ad.endDate >= today).length;
  const expiredCount = ads.filter(ad => ad.endDate < today).length;
  const eventCount = events.length;
  const adminCount = admins.length;
  const activeBeaconsCount = Object.keys(beaconPromotions).length;

  const positions = [
    { value: 'page-top', label: 'Página Arriba (Máx 2)' },
    { value: 'page-bottom', label: 'Página Abajo (Máx 2)' },
    { value: 'menu-top', label: 'Menú Arriba (Máx 1)' },
    { value: 'menu-bottom', label: 'Menú Abajo (Máx 1)' },
  ];

  const adminRolesList: {value: AdminRole, label: string}[] = [
    { value: 'ADMIN_GENERAL', label: 'Admin General' },
    { value: 'ADMIN_CULTURE', label: 'Concejalía Cultura/Eventos' },
    { value: 'ADMIN_SPORTS', label: 'Concejalía Deportes' },
    { value: 'ADMIN_COMMERCE', label: 'Concejalía Comercio' }
  ];

  // --- Handlers for Ads ---
  const handleSaveAd = () => {
    if (!currentAd.clientName || !currentAd.startDate || !currentAd.endDate) {
      alert('Por favor rellena los campos obligatorios');
      return;
    }

    if (currentAd.id) {
      setAds(ads.map(ad => ad.id === currentAd.id ? { ...ad, ...currentAd } as Ad : ad));
    } else {
      const newAd: Ad = {
        ...currentAd,
        id: Date.now().toString(),
        isActive: true,
        imageUrl: currentAd.imageUrl || 'https://picsum.photos/400/150',
        linkUrl: currentAd.linkUrl || '#',
      } as Ad;
      setAds([...ads, newAd]);
    }
    setIsEditingAd(false);
    setCurrentAd({});
  };

  const handleDeleteAd = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este anuncio?')) {
      setAds(ads.filter(ad => ad.id !== id));
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
        setEvents(events.map(e => e.id === currentEvent.id ? eventToSave : e));
    } else {
        setEvents([...events, eventToSave]);
    }
    setIsEditingEvent(false);
    setCurrentEvent({});
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
        setEvents(events.filter(e => e.id !== id));
    }
  };

  // --- Handlers for Users ---
  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Nombre y Email son obligatorios');
      return;
    }
    const admin: AdminUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role as AdminRole || 'ADMIN_GENERAL',
      createdAt: today
    };
    setAdmins([...admins, admin]);
    setIsAddingUser(false);
    setNewUser({ role: 'ADMIN_GENERAL' });
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('¿Eliminar acceso a este administrador?')) {
      setAdmins(admins.filter(u => u.id !== id));
    }
  };

  // --- Handlers for Beacons ---
  const handleEditBeacon = (shopId: string) => {
      setSelectedShopId(shopId);
      const existing = beaconPromotions[shopId];
      if (existing) {
          setEditingPromo(existing);
      } else {
          setEditingPromo({ title: '', description: '', discountCode: '', beaconUuid: '' });
      }
  };

  const handleSaveBeacon = () => {
      if (!selectedShopId || !setBeaconPromotions) return;
      if (!editingPromo.title || !editingPromo.description) {
          alert("Título y Descripción son obligatorios");
          return;
      }
      
      const newPromos = { ...beaconPromotions };
      newPromos[selectedShopId] = editingPromo as Promotion;
      setBeaconPromotions(newPromos);
      setSelectedShopId(null);
  };

  const handleDeleteBeacon = (shopId: string) => {
      if (!setBeaconPromotions) return;
      if (confirm("¿Desactivar Beacon para este comercio?")) {
          const newPromos = { ...beaconPromotions };
          delete newPromos[shopId];
          setBeaconPromotions(newPromos);
      }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Shield className="text-blue-600" /> 
              Panel de Administración
            </h2>
            <p className="text-gray-500 text-sm">Gestión centralizada del Ayuntamiento</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <div className="text-xs font-bold text-gray-900">{currentUserRole.replace('ADMIN_', 'Rol: ')}</div>
             </div>
            <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
                <LogOut size={18} />
                Salir
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {canManageAds && (
            <>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Anuncios Activos</p>
                <h3 className="text-2xl font-bold text-green-600">{activeCount}</h3>
                </div>
                <div className="p-3 bg-green-50 rounded-lg text-green-600">
                <TrendingUp size={24} />
                </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Caducados</p>
                <h3 className="text-2xl font-bold text-red-600">{expiredCount}</h3>
                </div>
                <div className="p-3 bg-red-50 rounded-lg text-red-600">
                <AlertCircle size={24} />
                </div>
            </div>
            </>
          )}
          
          {canManageBeacons && (
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Beacons Activos</p>
                <h3 className="text-2xl font-bold text-blue-600">{activeBeaconsCount}</h3>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Zap size={24} className="fill-blue-600" />
                </div>
            </div>
          )}

          {canManageEvents && (
           <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Eventos</p>
              <h3 className="text-2xl font-bold text-purple-600">{eventCount}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
              <Calendar size={24} />
            </div>
          </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 pb-1 overflow-x-auto">
            {canManageAds && (
                <button 
                    onClick={() => setActiveTab('ads')}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative whitespace-nowrap ${activeTab === 'ads' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Concejalía Comercio (Ads)
                    {activeTab === 'ads' && <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                </button>
            )}

            {canManageBeacons && (
                <button 
                    onClick={() => setActiveTab('beacons')}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative whitespace-nowrap ${activeTab === 'beacons' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Beacons 📡
                    {activeTab === 'beacons' && <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                </button>
            )}
            
            {canManageEvents && (
                <button 
                    onClick={() => setActiveTab('events')}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative whitespace-nowrap ${activeTab === 'events' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Concejalía Cultura (Eventos)
                    {activeTab === 'events' && <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                </button>
            )}
            
            {canManageUsers && (
                <button 
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative whitespace-nowrap ${activeTab === 'users' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Gestión Usuarios y Roles
                    {activeTab === 'users' && <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                </button>
            )}
        </div>

        {/* --- ADS SECTION --- */}
        {activeTab === 'ads' && canManageAds && (
            <>
                {isEditingAd ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg animate-in fade-in zoom-in-95">
                    <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">{currentAd.id ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h3>
                    <button onClick={() => setIsEditingAd(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Cliente</label>
                        <input 
                        type="text" 
                        value={currentAd.clientName || ''}
                        onChange={e => setCurrentAd({...currentAd, clientName: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Ej: Restaurante El Puerto"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
                        <select 
                        value={currentAd.position || 'page-top'}
                        onChange={e => setCurrentAd({...currentAd, position: e.target.value as any})}
                        className="w-full p-2 border rounded-lg"
                        >
                        {positions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                            <input 
                            type="date" 
                            value={currentAd.startDate || ''}
                            onChange={e => setCurrentAd({...currentAd, startDate: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1 text-red-600">Fecha Baja (Pago)</label>
                            <input 
                            type="date" 
                            value={currentAd.endDate || ''}
                            onChange={e => setCurrentAd({...currentAd, endDate: e.target.value})}
                            className="w-full p-2 border rounded-lg border-red-100 focus:ring-red-200"
                            title="El anuncio dejará de mostrarse automáticamente después de esta fecha"
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen</label>
                        <div className="flex gap-2">
                            <Image size={20} className="text-gray-400 mt-2" />
                            <input 
                            type="text" 
                            value={currentAd.imageUrl || ''}
                            onChange={e => setCurrentAd({...currentAd, imageUrl: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Enlace</label>
                        <div className="flex gap-2">
                            <LinkIcon size={20} className="text-gray-400 mt-2" />
                            <input 
                            type="text" 
                            value={currentAd.linkUrl || ''}
                            onChange={e => setCurrentAd({...currentAd, linkUrl: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            placeholder="https://..."
                            />
                        </div>
                    </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                    <button 
                        onClick={() => setIsEditingAd(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSaveAd}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <Save size={18} />
                        Guardar Anuncio
                    </button>
                    </div>
                </div>
                ) : (
                <>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <h3 className="font-medium text-gray-700">Listado de Publicidad</h3>
                        <button 
                        onClick={() => { setCurrentAd({}); setIsEditingAd(true); }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                        >
                        <Plus size={16} />
                        Añadir
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                            <tr>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Cliente</th>
                            <th className="px-6 py-3">Posición</th>
                            <th className="px-6 py-3">Vigencia</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ads.map((ad) => {
                            const isExpired = ad.endDate < today;
                            const isActive = ad.isActive && !isExpired;
                            
                            const endDateObj = new Date(ad.endDate);
                            const todayObj = new Date(today);
                            const diffTime = endDateObj.getTime() - todayObj.getTime();
                            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                            const isExpiringSoon = isActive && diffDays >= 0 && diffDays <= 7;
                            
                            return (
                                <tr key={ad.id} className={`border-b transition-colors ${isExpired ? 'bg-red-50 hover:bg-red-100' : 'bg-white hover:bg-gray-50'}`}>
                                    <td className="px-6 py-4">
                                    <div className="flex flex-col gap-2">
                                        <span className={`w-fit px-2 py-1 rounded-full text-xs font-medium ${
                                            isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {isActive ? 'Activo' : isExpired ? 'Caducado' : 'Inactivo'}
                                        </span>
                                        {isExpiringSoon && (
                                            <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2 py-1 rounded-full border border-amber-100 w-fit">
                                                <AlertTriangle size={12} className="fill-amber-500 text-amber-600" />
                                                <span className="text-[10px] font-bold">Expira en {diffDays} días</span>
                                            </div>
                                        )}
                                    </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {ad.clientName}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {positions.find(p => p.value === ad.position)?.label || ad.position}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <div className="flex flex-col text-xs">
                                            <span className="text-green-600">In: {ad.startDate}</span>
                                            <span className={`font-medium flex items-center gap-1 ${
                                                isExpired ? 'text-red-700 font-bold' : isExpiringSoon ? 'text-amber-600 font-bold' : 'text-red-600'
                                            }`}>
                                                Fin: {ad.endDate}
                                                {(isExpiringSoon || isExpired) && <AlertTriangle size={10} />}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => { setCurrentAd(ad); setIsEditingAd(true); }}
                                            className="font-medium text-blue-600 hover:underline mr-3"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteAd(ad.id)}
                                            className="font-medium text-red-600 hover:underline"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            );
                            })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </>
                )}
            </>
        )}

        {/* --- BEACONS SECTION (NEW) --- */}
        {activeTab === 'beacons' && canManageBeacons && (
            <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                    <Zap className="text-blue-600 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-bold text-blue-900 text-sm">Gestión de Beacons & Promociones</h4>
                        <p className="text-sm text-blue-800/80">
                            Activa promociones que saltarán automáticamente cuando el usuario pase cerca del comercio (GPS) o escanee el Beacon Físico.
                        </p>
                    </div>
                </div>

                {selectedShopId ? (
                     <div className="bg-white rounded-2xl p-6 shadow-lg animate-in fade-in zoom-in-95 max-w-lg mx-auto border-2 border-blue-100">
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <Zap size={20} className="fill-blue-600 text-blue-600" />
                                Configurar Beacon
                            </h3>
                            <button onClick={() => setSelectedShopId(null)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                                <span className="text-xs text-gray-500 uppercase font-bold">Comercio</span>
                                <div className="font-bold text-gray-900">{allShops.find(s => s.id === selectedShopId)?.name}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Título de la Oferta</label>
                                <input 
                                    type="text" 
                                    value={editingPromo.title || ''}
                                    onChange={e => setEditingPromo({...editingPromo, title: e.target.value})}
                                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                                    placeholder="Ej: 2x1 en Bebidas"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción / Mensaje</label>
                                <textarea 
                                    value={editingPromo.description || ''}
                                    onChange={e => setEditingPromo({...editingPromo, description: e.target.value})}
                                    className="w-full p-3 border rounded-xl h-24 resize-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
                                    placeholder="Mensaje que verá el usuario..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Código Descuento</label>
                                    <div className="relative">
                                        <Tag size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input 
                                            type="text" 
                                            value={editingPromo.discountCode || ''}
                                            onChange={e => setEditingPromo({...editingPromo, discountCode: e.target.value})}
                                            className="w-full pl-9 p-2.5 border rounded-xl font-mono text-sm"
                                            placeholder="PROMO2025"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hardware UUID</label>
                                    <input 
                                        type="text" 
                                        value={editingPromo.beaconUuid || ''}
                                        onChange={e => setEditingPromo({...editingPromo, beaconUuid: e.target.value})}
                                        className="w-full p-2.5 border rounded-xl font-mono text-xs"
                                        placeholder="UUID opcional"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end gap-3">
                            <button 
                                onClick={() => setSelectedShopId(null)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSaveBeacon}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-bold shadow-lg shadow-blue-200"
                            >
                                <Save size={18} />
                                Activar Beacon
                            </button>
                        </div>
                     </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3">Comercio</th>
                                        <th className="px-6 py-3">Categoría</th>
                                        <th className="px-6 py-3">Estado Beacon</th>
                                        <th className="px-6 py-3 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allShops.map(shop => {
                                        const isActive = !!beaconPromotions[shop.id];
                                        return (
                                            <tr key={shop.id} className="bg-white hover:bg-gray-50 border-b">
                                                <td className="px-6 py-4 font-medium text-gray-900">
                                                    {shop.name}
                                                </td>
                                                <td className="px-6 py-4 text-gray-500">
                                                    {shop.category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {isActive ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 animate-pulse">
                                                            <Zap size={10} fill="currentColor" />
                                                            ACTIVO
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                                                            Inactivo
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right flex justify-end gap-3">
                                                    {isActive ? (
                                                        <>
                                                            <button 
                                                                onClick={() => handleEditBeacon(shop.id)}
                                                                className="text-blue-600 hover:underline font-medium"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteBeacon(shop.id)}
                                                                className="text-red-600 hover:bg-red-50 p-1 rounded transition-colors"
                                                                title="Desactivar"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handleEditBeacon(shop.id)}
                                                            className="text-gray-400 hover:text-blue-600 flex items-center gap-1 ml-auto"
                                                        >
                                                            <Plus size={16} /> Configurar
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* --- EVENTS SECTION --- */}
        {activeTab === 'events' && canManageEvents && (
             <>
             {isEditingEvent ? (
             <div className="bg-white rounded-2xl p-6 shadow-lg animate-in fade-in zoom-in-95">
                 <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-semibold">{currentEvent.id ? 'Editar Evento' : 'Nuevo Evento'}</h3>
                 <button onClick={() => setIsEditingEvent(false)} className="text-gray-400 hover:text-gray-600">
                     <X size={24} />
                 </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="col-span-2 md:col-span-1">
                     <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                     <input 
                     type="text" 
                     value={currentEvent.title || ''}
                     onChange={e => setCurrentEvent({...currentEvent, title: e.target.value})}
                     className="w-full p-2 border rounded-lg"
                     placeholder="Ej: Fiestas Patronales"
                     />
                 </div>

                 <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <input 
                    type="text" 
                    value={currentEvent.category || ''}
                    onChange={e => setCurrentEvent({...currentEvent, category: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Ej: Festival, Gastronomía..."
                    />
                 </div>

                 <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-700 mb-1">Fecha (Texto)</label>
                     <div className="flex gap-2">
                        <Calendar size={20} className="text-gray-400 mt-2" />
                        <input 
                        type="text" 
                        value={currentEvent.date || ''}
                        onChange={e => setCurrentEvent({...currentEvent, date: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Ej: 15 Octubre 2025"
                        />
                     </div>
                 </div>

                 <div className="flex-1">
                     <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
                     <div className="flex gap-2">
                        <MapPin size={20} className="text-gray-400 mt-2" />
                        <input 
                        type="text" 
                        value={currentEvent.location || ''}
                        onChange={e => setCurrentEvent({...currentEvent, location: e.target.value})}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Ej: Plaza de la Iglesia"
                        />
                     </div>
                 </div>

                 <div className="col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Breve</label>
                     <textarea 
                     value={currentEvent.description || ''}
                     onChange={e => setCurrentEvent({...currentEvent, description: e.target.value})}
                     className="w-full p-2 border rounded-lg h-24"
                     placeholder="Breve resumen para el listado..."
                     />
                 </div>

                 <div className="col-span-2">
                     <label className="block text-sm font-medium text-gray-700 mb-1">URL Imagen</label>
                     <div className="flex gap-2">
                         <Image size={20} className="text-gray-400 mt-2" />
                         <input 
                         type="text" 
                         value={currentEvent.imageUrl || ''}
                         onChange={e => setCurrentEvent({...currentEvent, imageUrl: e.target.value})}
                         className="w-full p-2 border rounded-lg"
                         placeholder="https://..."
                         />
                     </div>
                 </div>
                 </div>

                 <div className="mt-6 flex justify-end gap-3">
                 <button 
                     onClick={() => setIsEditingEvent(false)}
                     className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                 >
                     Cancelar
                 </button>
                 <button 
                     onClick={handleSaveEvent}
                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                 >
                     <Save size={18} />
                     Guardar Evento
                 </button>
                 </div>
             </div>
             ) : (
             <>
                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                     <h3 className="font-medium text-gray-700">Listado de Eventos</h3>
                     <button 
                     onClick={() => { setCurrentEvent({}); setIsEditingEvent(true); }}
                     className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                     >
                     <Plus size={16} />
                     Añadir
                     </button>
                 </div>
                 
                 <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                         <tr>
                         <th className="px-6 py-3">Evento</th>
                         <th className="px-6 py-3">Fecha / Lugar</th>
                         <th className="px-6 py-3 text-right">Acciones</th>
                         </tr>
                     </thead>
                     <tbody>
                         {events.map((event) => (
                             <tr key={event.id} className="bg-white hover:bg-gray-50 border-b">
                                 <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden shrink-0">
                                            <img src={event.imageUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{event.title}</div>
                                            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mt-1">{event.category}</div>
                                        </div>
                                     </div>
                                 </td>
                                 <td className="px-6 py-4 text-gray-500">
                                     <div className="flex flex-col text-xs gap-1">
                                         <span className="flex items-center gap-1"><Calendar size={12}/> {event.date}</span>
                                         <span className="flex items-center gap-1"><MapPin size={12}/> {event.location}</span>
                                     </div>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                     <button 
                                         onClick={() => { setCurrentEvent(event); setIsEditingEvent(true); }}
                                         className="font-medium text-blue-600 hover:underline mr-3"
                                     >
                                         Editar
                                     </button>
                                     <button 
                                         onClick={() => handleDeleteEvent(event.id)}
                                         className="font-medium text-red-600 hover:underline"
                                     >
                                         <Trash2 size={16} />
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                     </table>
                 </div>
                 </div>
             </>
             )}
         </>
        )}

        {/* --- USER MANAGEMENT SECTION --- */}
        {activeTab === 'users' && canManageUsers && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
               <Shield className="text-blue-600 shrink-0 mt-0.5" size={20} />
               <div>
                  <h4 className="font-bold text-blue-900 text-sm">Zona de Super Admin</h4>
                  <p className="text-sm text-blue-800/80">
                    Aquí puedes nombrar administradores secundarios por Concejalía. Estos usuarios tendrán acceso limitado al panel.
                  </p>
               </div>
            </div>

            {isAddingUser ? (
              <div className="bg-white rounded-2xl p-6 shadow-lg animate-in fade-in zoom-in-95 max-w-lg mx-auto">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Nombrar Administrador</h3>
                    <button onClick={() => setIsAddingUser(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={24} />
                    </button>
                 </div>
                 
                 <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input 
                          type="text" 
                          value={newUser.name || ''}
                          onChange={e => setNewUser({...newUser, name: e.target.value})}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Ej: Juan Pérez"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                        <input 
                          type="email" 
                          value={newUser.email || ''}
                          onChange={e => setNewUser({...newUser, email: e.target.value})}
                          className="w-full p-2 border rounded-lg"
                          placeholder="admin@ejemplo.com"
                        />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Rol / Concejalía</label>
                       <select
                        value={newUser.role}
                        onChange={e => setNewUser({...newUser, role: e.target.value as AdminRole})}
                        className="w-full p-2 border rounded-lg"
                       >
                         {adminRolesList.map(role => (
                             <option key={role.value} value={role.value}>{role.label}</option>
                         ))}
                       </select>
                    </div>
                 </div>

                 <div className="mt-6 flex justify-end gap-3">
                    <button 
                        onClick={() => setIsAddingUser(false)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleAddUser}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <UserPlus size={18} />
                        Crear Usuario
                    </button>
                 </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                     <h3 className="font-medium text-gray-700">Equipo de Administración</h3>
                     <button 
                     onClick={() => setIsAddingUser(true)}
                     className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                     >
                     <UserPlus size={16} />
                     Nuevo Admin
                     </button>
                 </div>
                 
                 <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                         <tr>
                         <th className="px-6 py-3">Nombre</th>
                         <th className="px-6 py-3">Rol</th>
                         <th className="px-6 py-3">Alta</th>
                         <th className="px-6 py-3 text-right">Acciones</th>
                         </tr>
                     </thead>
                     <tbody>
                         {admins.map((user) => (
                             <tr key={user.id} className="bg-white hover:bg-gray-50 border-b">
                                 <td className="px-6 py-4">
                                     <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.email}</div>
                                        </div>
                                     </div>
                                 </td>
                                 <td className="px-6 py-4">
                                     {user.role === 'SUPER_ADMIN' ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                            <Shield size={12} fill="currentColor" />
                                            Super Admin
                                        </span>
                                     ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                            {adminRolesList.find(r => r.value === user.role)?.label}
                                        </span>
                                     )}
                                 </td>
                                 <td className="px-6 py-4 text-gray-500">
                                     {user.createdAt}
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                     {user.role !== 'SUPER_ADMIN' && (
                                        <button 
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                            title="Eliminar usuario"
                                        >
                                            <UserX size={18} />
                                        </button>
                                     )}
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                     </table>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
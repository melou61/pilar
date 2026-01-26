
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, X, Waves, Star, History, Activity, Plus, Minus, ShoppingBag, UtensilsCrossed, Heart, Landmark } from './Icons';
import { MOCK_EVENTS, MOCK_BEACHES, MOCK_SIGHTSEEING, ACTIVITIES_LIST } from '../data';
import { ViewState, CensusItem, Ad } from '../types';
import { AdSpot } from './AdSpot';

interface MapViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
  businesses: CensusItem[];
  ads: Ad[];
  currentLang?: string; // New prop
}

declare const L: any; // Leaflet Global

export const MapView: React.FC<MapViewProps> = ({ t, onNavigate, businesses, ads, currentLang }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [leafletMap, setLeafletMap] = useState<any | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const isDestroyedRef = useRef(false);

  // Categorías con etiquetas traducidas
  const categories = [
    { id: 'all', label: t.common.all },
    { id: 'Alimentación', label: t.map_categories.food },
    { id: 'Alojamiento', label: t.map_categories.accommodation },
    { id: 'Comunicación y publicidad', label: t.map_categories.communication },
    { id: 'Educación', label: t.map_categories.education },
    { id: 'Gestiones profesionales y bancarias', label: t.map_categories.professional },
    { id: 'Hogar', label: t.map_categories.home },
    { id: 'Hostelería y restauración', label: t.map_categories.hospitality },
    { id: 'Mascotas', label: t.map_categories.pets },
    { id: 'Medio Ambiente y agricultura', label: t.map_categories.environment },
    { id: 'Moda', label: t.map_categories.fashion },
    { id: 'Motor', label: t.map_categories.motor },
    { id: 'Ocio y entretenimiento', label: t.map_categories.leisure },
    { id: 'Salud y belleza', label: t.map_categories.health },
    { id: 'Servicios municipales y otros servicios', label: t.map_categories.municipal },
  ];

  useEffect(() => {
    isDestroyedRef.current = false;
    let checkInterval: any;
    
    const initMap = () => {
      if (isDestroyedRef.current) return;
      if (mapContainerRef.current && !mapInstanceRef.current && typeof L !== 'undefined') {
        try {
          const map = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false,
            scrollWheelZoom: false 
          }).setView([37.8653, -0.7932], 14);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          mapInstanceRef.current = map;
          setLeafletMap(map);
          clearInterval(checkInterval);
        } catch (err) {
          console.error("Leaflet Init Error:", err);
        }
      }
    };

    const initialTimer = setTimeout(initMap, 100);
    checkInterval = setInterval(initMap, 1000);

    return () => {
      isDestroyedRef.current = true;
      clearTimeout(initialTimer);
      clearInterval(checkInterval);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletMap || typeof L === 'undefined' || isDestroyedRef.current) return;

    markersRef.current.forEach(m => {
        try { m.remove(); } catch(e) {}
    });
    markersRef.current = [];

    const itemsToAdd: any[] = [];

    // Paleta de colores distintiva por categoría
    const getCategoryColor = (cat: string) => {
      switch (cat) {
        case 'Alimentación': return '#ef4444'; // Rojo claro
        case 'Alojamiento': return '#4f46e5'; // Índigo
        case 'Comunicación y publicidad': return '#0ea5e9'; // Azul cielo
        case 'Educación': return '#fbbf24'; // Ámbar
        case 'Gestiones profesionales y bancarias': return '#64748b'; // Gris pizarra
        case 'Hogar': return '#0d9488'; // Verde azulado (Teal)
        case 'Hostelería y restauración': return '#f97316'; // Naranja
        case 'Mascotas': return '#a16207'; // Marrón/Dorado
        case 'Medio Ambiente y agricultura': return '#16a34a'; // Verde
        case 'Moda': return '#db2777'; // Rosa fucsia
        case 'Motor': return '#dc2626'; // Rojo intenso
        case 'Ocio y entretenimiento': return '#7c3aed'; // Violeta
        case 'Salud y belleza': return '#e11d48'; // Rosa rojizo (Rose)
        case 'Servicios municipales y otros servicios': return '#2563eb'; // Azul estándar
        default: return '#3b82f6'; // Azul fallback
      }
    };

    // Filtrado de negocios
    const filteredBusinesses = filter === 'all' 
      ? businesses 
      : businesses.filter(b => b.category === filter);
    
    itemsToAdd.push(...filteredBusinesses.map(i => ({ ...i, type: 'BIZ', color: getCategoryColor(i.category) })));

    // Si es "Todos", incluimos también playas, monumentos y eventos con sus propios colores
    if (filter === 'all') {
      itemsToAdd.push(...MOCK_EVENTS.map(i => ({ ...i, type: 'EVENT', color: '#9333ea' }))); // Morado
      itemsToAdd.push(...MOCK_BEACHES.map(i => ({ ...i, type: 'BEACH', color: '#06b6d4' }))); // Cian
      itemsToAdd.push(...MOCK_SIGHTSEEING.map(i => ({ ...i, type: 'CULTURE', color: '#d97706' }))); // Ámbar oscuro
      itemsToAdd.push(...ACTIVITIES_LIST.map(i => ({ ...i, type: 'ACTIVE', color: '#10b981' }))); // Esmeralda
    }

    itemsToAdd.forEach(item => {
      if (item.lat && item.lng && !isDestroyedRef.current) {
        try {
            const icon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: ${item.color}; width: 22px; height: 22px; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); cursor: pointer;"></div>`,
              iconSize: [22, 22],
              iconAnchor: [11, 11]
            });

            const marker = L.marker([item.lat, item.lng], { icon }).addTo(leafletMap);
            marker.on('click', () => {
              if (isDestroyedRef.current) return;
              setSelectedItem(item);
              leafletMap.flyTo([item.lat, item.lng], 17, { duration: 0.8 });
            });
            markersRef.current.push(marker);
        } catch (e) {}
      }
    });
  }, [leafletMap, filter, businesses]);

  const handleMyLocation = () => {
    if (navigator.geolocation && leafletMap && typeof L !== 'undefined') {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setIsLocating(false);
          if (userMarkerRef.current) userMarkerRef.current.remove();
          const userIcon = L.divIcon({
            className: 'user-location-marker',
            html: `
              <div style="position: relative; width: 20px; height: 20px;">
                <div class="user-location-pulse" style="position: absolute; inset: -10px; background-color: rgba(59, 130, 246, 0.4); border-radius: 50%; z-index: 1;"></div>
                <div style="position: absolute; inset: 0; background-color: #3b82f6; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(59, 130, 246, 0.8); z-index: 2;"></div>
              </div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(leafletMap);
          leafletMap.flyTo([latitude, longitude], 16, { duration: 1 });
        },
        () => {
          setIsLocating(false);
          alert("Activa el GPS para verte en el mapa.");
        }
      );
    }
  };

  return (
    <div className="flex flex-col bg-white relative animate-in fade-in duration-500 overflow-x-hidden min-h-screen">
      
      {/* 1. PUBLICIDAD SUPERIOR (Full Width) */}
      <div className="w-full bg-white shrink-0 mb-4 shadow-sm z-20 relative">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.MAP} currentFilter={filter} currentLang={currentLang} />
      </div>

      {/* 2. CONTENEDOR DEL MAPA */}
      <div className="relative h-[65vh] bg-gray-100 rounded-[30px] md:rounded-[40px] overflow-hidden shadow-inner border-t border-gray-200/50 mx-0 md:mx-4 mb-4">
        
        {/* BARRA DE FILTROS ACTUALIZADA */}
        <div className="absolute top-6 left-0 right-0 z-[400] flex justify-center px-4">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-100 p-2 rounded-[28px] shadow-xl flex gap-1 overflow-x-auto no-scrollbar max-w-full">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setFilter(cat.id)} 
                className={`px-5 py-2 rounded-full text-[10px] font-black transition-all capitalize whitespace-nowrap ${
                  filter === cat.id ? 'bg-[#0f172a] text-white shadow-lg' : 'bg-transparent text-gray-500 hover:bg-gray-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Div de Leaflet */}
        <div ref={mapContainerRef} className="w-full h-full" />
        
        {/* CONTROLES DE MAPA */}
        <div className={`absolute ${selectedItem ? 'bottom-[340px]' : 'bottom-8'} right-4 md:right-8 z-[400] flex flex-col gap-3`}>
          <button onClick={() => mapInstanceRef.current?.zoomIn()} className="bg-white text-blue-600 p-4 rounded-2xl shadow-2xl border border-gray-50 flex items-center justify-center hover:bg-blue-50 transition-all">
            <Plus size={24} strokeWidth={3} />
          </button>
          <button onClick={() => mapInstanceRef.current?.zoomOut()} className="bg-white text-blue-600 p-4 rounded-2xl shadow-2xl border border-gray-50 flex items-center justify-center hover:bg-blue-50 transition-all">
            <Minus size={24} strokeWidth={3} />
          </button>
          <button onClick={handleMyLocation} className="bg-white text-blue-600 p-5 rounded-[22px] shadow-2xl transition-all border border-gray-50 flex items-center justify-center hover:bg-blue-50 active:scale-95 mt-2" disabled={isLocating}>
            <Navigation size={28} className={isLocating ? 'animate-spin opacity-50' : ''} />
          </button>
        </div>

        {/* Tarjeta de Detalle Seleccionado */}
        {selectedItem && (
          <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-8 z-[410] animate-in slide-in-from-bottom-20 duration-500">
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-w-sm mx-auto">
              <div className="relative h-40 w-full">
                <img src={selectedItem.image || (selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl)} className="w-full h-full object-cover" alt="" />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-xl text-white rounded-full"><X size={18} /></button>
              </div>
              <div className="p-6">
                <h3 className="font-black text-gray-900 text-xl truncate mb-1">{selectedItem.name || selectedItem.title}</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
                  {selectedItem.type === 'ACTIVE' ? 'PH Experiencia' : selectedItem.type === 'CULTURE' ? 'Patrimonio' : selectedItem.type === 'BEACH' ? 'Playa' : selectedItem.category}
                </p>
                <p className="text-gray-500 text-xs flex items-center gap-2 font-medium mb-6"><MapPin size={14} className="text-blue-500" /><span className="truncate">{selectedItem.address || selectedItem.location || 'Pilar de la Horadada'}</span></p>
                <button onClick={() => onNavigate(selectedItem.type === 'ACTIVE' ? ViewState.ACTIVITIES : selectedItem.type === 'CULTURE' ? ViewState.SIGHTSEEING : selectedItem.type === 'BEACH' ? ViewState.BEACHES : ViewState.SHOPPING, selectedItem.id)} className="w-full py-4 bg-blue-600 text-white rounded-[20px] font-black text-sm shadow-xl">{t.common.view_details}</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. PUBLICIDAD INFERIOR (Full Width) */}
      <div className="w-full bg-white shrink-0 pt-4 pb-10">
        <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.MAP} currentFilter={filter} currentLang={currentLang} />
      </div>

    </div>
  );
};

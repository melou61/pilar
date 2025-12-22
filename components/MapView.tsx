
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, X, Waves, Star, History, Activity } from './Icons';
import { MOCK_EVENTS, MOCK_BEACHES, MOCK_SIGHTSEEING, ACTIVITIES_LIST } from '../data';
import { ViewState, CensusItem, Ad } from '../types';
import { AdSpot } from './AdSpot';

interface MapViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
  businesses: CensusItem[];
  ads: Ad[];
}

declare const L: any; // Leaflet Global

export const MapView: React.FC<MapViewProps> = ({ t, onNavigate, businesses, ads }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [leafletMap, setLeafletMap] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'food' | 'shop' | 'events' | 'beaches' | 'culture' | 'active'>('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const isDestroyedRef = useRef(false);

  useEffect(() => {
    isDestroyedRef.current = false;
    let checkInterval: any;
    
    const initMap = () => {
      if (isDestroyedRef.current) return;
      if (mapContainerRef.current && !mapInstanceRef.current && typeof L !== 'undefined') {
        try {
          const map = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false
          }).setView([37.8653, -0.7932], 14);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          mapInstanceRef.current = map;
          setLeafletMap(map);
          
          // CRITICAL: Ensure map fills the flex container correctly immediately
          setTimeout(() => {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.invalidateSize();
            }
          }, 400);

          clearInterval(checkInterval);
        } catch (err) {
          console.error("Leaflet Init Error:", err);
        }
      }
    };

    const initialTimer = setTimeout(initMap, 50);
    checkInterval = setInterval(initMap, 800);

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

  // Update markers based on filters
  useEffect(() => {
    if (!leafletMap || typeof L === 'undefined' || isDestroyedRef.current) return;

    markersRef.current.forEach(m => {
        try { m.remove(); } catch(e) {}
    });
    markersRef.current = [];

    const itemsToAdd: any[] = [];
    const foodCats = ['restaurante', 'bar', 'italiano', 'pescados', 'playa', 'chiringuito', 'arroces', 'internacional', 'mediterráneo', 'tapas', 'postres', 'vinos', 'carnes'];

    if (filter === 'all' || filter === 'shop') {
      const shops = businesses.filter(b => !foodCats.includes(b.category.toLowerCase()));
      itemsToAdd.push(...shops.map(i => ({ ...i, type: 'SHOP', color: '#2563eb' })));
    }
    
    if (filter === 'all' || filter === 'food') {
      const eateries = businesses.filter(b => foodCats.includes(b.category.toLowerCase()));
      itemsToAdd.push(...eateries.map(i => ({ ...i, type: 'FOOD', color: '#f97316' })));
    }
    
    if (filter === 'all' || filter === 'events') {
      itemsToAdd.push(...MOCK_EVENTS.map(i => ({ ...i, type: 'EVENT', color: '#9333ea' })));
    }

    if (filter === 'all' || filter === 'beaches') {
      itemsToAdd.push(...MOCK_BEACHES.map(i => ({ ...i, type: 'BEACH', color: '#06b6d4' })));
    }

    if (filter === 'all' || filter === 'culture') {
      itemsToAdd.push(...MOCK_SIGHTSEEING.map(i => ({ ...i, type: 'CULTURE', color: '#d97706' })));
    }

    if (filter === 'all' || filter === 'active') {
      itemsToAdd.push(...ACTIVITIES_LIST.map(i => ({ ...i, type: 'ACTIVE', color: '#10b981' })));
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
    <div className="flex flex-col h-full bg-white animate-in fade-in duration-500 overflow-hidden">
      
      {/* 1. FRANJA SUPERIOR: ANUNCIO BLANCO */}
      <div className="bg-white px-8 py-5 shrink-0 border-b border-gray-100 flex items-center justify-center z-[200]">
        <div className="w-full max-w-4xl">
          {/* El AdSpot ya usa aspect-[3.5/1] según el archivo anterior */}
          <AdSpot ads={ads} position="page-top" className="my-0" />
        </div>
      </div>

      {/* 2. ÁREA CENTRAL: MAPA TOTALMENTE VISIBLE */}
      <div className="relative flex-1 bg-gray-50 overflow-hidden border-y border-gray-100">
        {/* Usamos absolute inset-0 para que el mapa rellene el flex-1 al 100% */}
        <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-10" />
        
        {/* Filtros Flotantes sobre el mapa */}
        <div className="absolute top-6 left-0 right-0 z-[500] flex justify-center px-4">
          <div className="bg-white/95 backdrop-blur-xl border border-gray-100 p-2 rounded-[28px] shadow-2xl flex gap-1 overflow-x-auto no-scrollbar max-w-full">
            {[
              { id: 'all', label: t.menu.home }, 
              { id: 'beaches', label: t.menu.beaches },
              { id: 'culture', label: t.menu.sightseeing },
              { id: 'active', label: t.menu.activities },
              { id: 'food', label: t.menu.dining }, 
              { id: 'shop', label: t.menu.shopping }, 
              { id: 'events', label: t.menu.events }
            ].map(f => (
              <button 
                key={f.id} 
                onClick={() => setFilter(f.id as any)} 
                className={`px-5 py-2 rounded-full text-[10px] font-black transition-all capitalize whitespace-nowrap ${
                    filter === f.id ? 'bg-[#0f172a] text-white shadow-lg' : 'bg-transparent text-gray-500 hover:bg-gray-50'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botón Ubicación Flotante */}
        <button 
          onClick={handleMyLocation} 
          className={`absolute ${selectedItem ? 'bottom-[330px]' : 'bottom-10'} right-8 z-[1000] bg-white text-blue-600 p-5 rounded-[22px] shadow-2xl transition-all border border-gray-50 flex items-center justify-center hover:bg-blue-50 active:scale-95`}
          disabled={isLocating}
        >
          <Navigation size={28} className={isLocating ? 'animate-spin opacity-50' : ''} />
        </button>

        {/* Card de Información Seleccionada sobre el mapa */}
        {selectedItem && (
          <div className="absolute bottom-10 left-8 right-8 z-[1001] animate-in slide-in-from-bottom-20 duration-500">
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-w-sm mx-auto">
              <div className="relative h-40 w-full">
                <img src={selectedItem.image || (selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl)} className="w-full h-full object-cover" alt="" />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-xl text-white rounded-full transition-all active:scale-90">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-black text-gray-900 text-xl truncate mb-1">{selectedItem.name || selectedItem.title}</h3>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">
                  {selectedItem.type === 'ACTIVE' ? 'PH Experiencia' : selectedItem.type === 'CULTURE' ? 'Patrimonio' : selectedItem.type === 'BEACH' ? 'Playa' : selectedItem.category}
                </p>
                <p className="text-gray-500 text-xs flex items-center gap-2 font-medium mb-6">
                  <MapPin size={14} className="text-blue-500" />
                  <span className="truncate">{selectedItem.address || selectedItem.location || 'Pilar de la Horadada'}</span>
                </p>
                <button 
                  onClick={() => onNavigate(
                    selectedItem.type === 'ACTIVE' ? ViewState.ACTIVITIES : 
                    selectedItem.type === 'CULTURE' ? ViewState.SIGHTSEEING : 
                    selectedItem.type === 'BEACH' ? ViewState.BEACHES : 
                    ViewState.SHOPPING, 
                    selectedItem.id
                  )} 
                  className="w-full py-4 bg-blue-600 text-white rounded-[20px] font-black text-sm shadow-xl active:scale-95 transition-transform"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. FRANJA INFERIOR: ANUNCIO BLANCO */}
      <div className="bg-white px-8 py-5 shrink-0 border-t border-gray-100 flex items-center justify-center z-[200]">
        <div className="w-full max-w-4xl">
          <AdSpot ads={ads} position="page-bottom" className="my-0" />
        </div>
      </div>

    </div>
  );
};

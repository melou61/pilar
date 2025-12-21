
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, X, ArrowLeft, Star, ArrowRight, AlertTriangle } from './Icons';
import { COMMERCIAL_CENSUS, DINING_CENSUS, MOCK_EVENTS } from '../data';
import { ViewState } from '../types';

interface MapViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
}

declare const L: any; // Leaflet Global

export const MapView: React.FC<MapViewProps> = ({ t, onNavigate }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [leafletMap, setLeafletMap] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'food' | 'shop' | 'events'>('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const markersRef = useRef<any[]>([]);
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
          }).setView([37.8653, -0.7932], 15);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          // Forzamos el renderizado inmediato y posterior con chequeo
          if (map && map.invalidateSize) {
            map.invalidateSize();
            setTimeout(() => {
              if (mapInstanceRef.current && !isDestroyedRef.current) {
                mapInstanceRef.current.invalidateSize();
              }
            }, 500);
          }

          mapInstanceRef.current = map;
          setLeafletMap(map);
          clearInterval(checkInterval);
        } catch (err) {
          console.error("Leaflet Init Error:", err);
        }
      }
    };

    // Intentar inicializar con retardo inicial
    const initialTimer = setTimeout(initMap, 100);

    // Intervalo de seguridad
    checkInterval = setInterval(initMap, 1000);

    // ResizeObserver con chequeo de destrucción
    const resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current && !isDestroyedRef.current) {
            try {
              mapInstanceRef.current.invalidateSize();
            } catch (e) {
              // Ignore resize errors during unmount
            }
        }
    });

    if (mapContainerRef.current) {
        resizeObserver.observe(mapContainerRef.current);
    }

    return () => {
      isDestroyedRef.current = true;
      clearTimeout(initialTimer);
      clearInterval(checkInterval);
      resizeObserver.disconnect();
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
          console.warn("Error removing map instance", e);
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletMap || typeof L === 'undefined' || isDestroyedRef.current) return;

    // Limpiar marcadores previos
    markersRef.current.forEach(m => {
        try { m.remove(); } catch(e) {}
    });
    markersRef.current = [];

    const itemsToAdd: any[] = [];
    if (filter === 'all' || filter === 'shop') {
      COMMERCIAL_CENSUS.forEach(cat => itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'SHOP', color: '#2563eb' }))));
    }
    if (filter === 'all' || filter === 'food') {
      DINING_CENSUS.forEach(cat => itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'FOOD', color: '#f97316' }))));
    }
    if (filter === 'all' || filter === 'events') {
      itemsToAdd.push(...MOCK_EVENTS.map(i => ({ ...i, type: 'EVENT', color: '#9333ea' })));
    }

    itemsToAdd.forEach(item => {
      if (item.lat && item.lng && !isDestroyedRef.current) {
        try {
            const icon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div style="background-color: ${item.color}; width: 22px; height: 22px; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
              iconSize: [22, 22],
              iconAnchor: [11, 11]
            });

            const marker = L.marker([item.lat, item.lng], { icon }).addTo(leafletMap);
            
            marker.on('click', () => {
              if (isDestroyedRef.current) return;
              setSelectedItem(item);
              leafletMap.flyTo([item.lat, item.lng], 16, {
                duration: 0.8
              });
            });

            markersRef.current.push(marker);
        } catch (e) {}
      }
    });
  }, [leafletMap, filter]);

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation && leafletMap && !isDestroyedRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (isDestroyedRef.current || !leafletMap) return;
          const { latitude, longitude } = position.coords;
          leafletMap.flyTo([latitude, longitude], 16);
          
          L.circleMarker([latitude, longitude], {
            radius: 8,
            fillColor: '#3b82f6',
            color: '#ffffff',
            weight: 3,
            fillOpacity: 0.8
          }).addTo(leafletMap);
          
          setIsLocating(false);
        },
        () => setIsLocating(false),
        { enableHighAccuracy: true }
      );
    } else setIsLocating(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative animate-in fade-in duration-500 overflow-hidden">
      <div className="bg-white border-b border-gray-100 px-6 py-8 flex flex-col gap-6 shadow-sm z-50">
        <div className="flex items-center relative h-12">
          <button onClick={() => onNavigate(ViewState.HOME)} className="p-3 -ml-3 text-gray-900 hover:bg-gray-100 rounded-full transition-all z-10">
            <ArrowLeft size={36} />
          </button>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
             <h2 className="font-black text-gray-900 text-[26px] tracking-tight leading-none">Cerca de ti</h2>
             <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.25em] mt-2">EXPLORA PILAR DE LA HORADADA</p>
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 justify-start sm:justify-center px-2">
          {['all', 'food', 'shop', 'events'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-7 py-3 rounded-2xl text-[13px] font-black transition-all border shadow-sm capitalize ${
                filter === f 
                ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              {f === 'all' ? 'Todo' : f === 'food' ? 'Comer' : f === 'shop' ? 'Tiendas' : 'Eventos'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 bg-gray-100">
        {/* Contenedor del Mapa */}
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px] z-10" />
        
        {/* Placeholder mientras carga */}
        {!leafletMap && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 flex-col gap-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Cargando mapa interactivo...</p>
            </div>
        )}

        <button 
          onClick={handleLocateMe} 
          className={`absolute ${selectedItem ? 'bottom-[420px]' : 'bottom-10'} right-8 z-[1000] bg-white text-blue-600 p-6 rounded-[24px] shadow-2xl hover:scale-110 active:scale-90 transition-all border border-gray-50`}
        >
          <Navigation size={32} className={isLocating ? 'animate-pulse' : ''} />
        </button>

        {selectedItem && (
          <div className="absolute bottom-8 left-8 right-8 z-[1001] animate-in slide-in-from-bottom-20 duration-500">
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-w-sm mx-auto ring-1 ring-black/5">
              <div className="relative h-44 w-full">
                <img 
                    src={selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl} 
                    className="w-full h-full object-cover" 
                    alt="" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548574505-12737441edb2?auto=format&fit=crop&w=1200&q=80' }}
                />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-xl text-white rounded-full hover:bg-white/40 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                   <h3 className="font-black text-gray-900 text-2xl leading-none truncate">{selectedItem.name || selectedItem.title}</h3>
                </div>
                <p className="text-gray-500 text-sm flex items-start gap-2 font-medium">
                  <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{selectedItem.address || selectedItem.location}</span>
                </p>
              </div>

              <div className="px-8 pb-8">
                <button 
                  onClick={() => {
                    if (selectedItem.type === 'EVENT') onNavigate(ViewState.EVENTS, selectedItem.id);
                    else if (selectedItem.type === 'FOOD') onNavigate(ViewState.DINING);
                    else onNavigate(ViewState.SHOPPING, selectedItem.id);
                  }}
                  className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-base shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Ver Detalles <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

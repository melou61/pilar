
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

  useEffect(() => {
    // Pequeño retardo para asegurar que el contenedor DOM tenga dimensiones finales
    const timer = setTimeout(() => {
      if (mapContainerRef.current && !mapInstanceRef.current && typeof L !== 'undefined') {
        try {
          const map = L.map(mapContainerRef.current, {
            zoomControl: false,
            attributionControl: false
          }).setView([37.8653, -0.7932], 15);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);

          // Forzamos el renderizado de los tiles
          setTimeout(() => {
            map.invalidateSize();
          }, 100);

          mapInstanceRef.current = map;
          setLeafletMap(map);
        } catch (err) {
          console.error("Leaflet Init Error:", err);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletMap || typeof L === 'undefined') return;

    // Limpiar marcadores previos
    markersRef.current.forEach(m => m.remove());
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
      if (item.lat && item.lng) {
        const icon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${item.color}; width: 22px; height: 22px; border: 3px solid white; border-radius: 50%; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        const marker = L.marker([item.lat, item.lng], { icon }).addTo(leafletMap);
        
        marker.on('click', () => {
          setSelectedItem(item);
          leafletMap.flyTo([item.lat, item.lng], 16, {
            duration: 0.8
          });
        });

        markersRef.current.push(marker);
      }
    });
  }, [leafletMap, filter]);

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation && leafletMap) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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

      <div className="relative flex-1">
        {/* Contenedor del Mapa con altura forzada mediante min-h */}
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px] bg-gray-50 z-0" />
        
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
                <img src={selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl} className="w-full h-full object-cover" alt="" />
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

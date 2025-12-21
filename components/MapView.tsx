
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

    const initialTimer = setTimeout(initMap, 100);
    checkInterval = setInterval(initMap, 1000);

    const resizeObserver = new ResizeObserver(() => {
        if (mapInstanceRef.current && !isDestroyedRef.current) {
            try {
              mapInstanceRef.current.invalidateSize();
            } catch (e) {}
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
      <div className="absolute top-4 left-0 right-0 z-[500] flex justify-center px-4">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100 p-2 rounded-[28px] shadow-xl flex gap-2">
          {[
            { id: 'all', label: t.menu.home },
            { id: 'food', label: t.menu.dining },
            { id: 'shop', label: t.menu.shopping },
            { id: 'events', label: t.menu.events }
          ].map(f => (
            <button 
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-6 py-2 rounded-full text-[11px] font-black transition-all capitalize ${
                filter === f.id 
                ? 'bg-[#0f172a] text-white shadow-lg' 
                : 'bg-transparent text-gray-500 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 bg-gray-100">
        <div ref={mapContainerRef} className="w-full h-full min-h-[400px] z-10" />
        
        {!leafletMap && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 flex-col gap-4">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">{t.ai_guide.thinking}</p>
            </div>
        )}

        <button 
          onClick={handleLocateMe} 
          className={`absolute ${selectedItem ? 'bottom-[340px]' : 'bottom-8'} right-8 z-[1000] bg-white text-blue-600 p-5 rounded-[22px] shadow-2xl hover:scale-110 active:scale-90 transition-all border border-gray-50`}
        >
          <Navigation size={28} className={isLocating ? 'animate-pulse' : ''} />
        </button>

        {selectedItem && (
          <div className="absolute bottom-8 left-8 right-8 z-[1001] animate-in slide-in-from-bottom-20 duration-500">
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-w-sm mx-auto ring-1 ring-black/5">
              <div className="relative h-40 w-full">
                <img 
                    src={selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl} 
                    className="w-full h-full object-cover" 
                    alt="" 
                />
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-xl text-white rounded-full">
                  <X size={18} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="font-black text-gray-900 text-xl leading-none truncate mb-2">{selectedItem.name || selectedItem.title}</h3>
                <p className="text-gray-500 text-xs flex items-center gap-2 font-medium mb-6">
                  <MapPin size={14} className="text-blue-500 shrink-0" />
                  <span className="truncate">{selectedItem.address || selectedItem.location}</span>
                </p>
                <button 
                  onClick={() => {
                    if (selectedItem.type === 'EVENT') onNavigate(ViewState.EVENTS, selectedItem.id);
                    else if (selectedItem.type === 'FOOD') onNavigate(ViewState.DINING);
                    else onNavigate(ViewState.SHOPPING, selectedItem.id);
                  }}
                  className="w-full py-4 bg-blue-600 text-white rounded-[20px] font-black text-sm shadow-xl hover:bg-blue-700 transition-all"
                >
                  {t.common.details}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

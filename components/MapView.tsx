import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Layers, X } from './Icons';
import { COMMERCIAL_CENSUS, DINING_CENSUS, ACTIVITIES_LIST, MOCK_EVENTS } from '../data';
import { ViewState } from '../types';

interface MapViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ t, onNavigate }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [filter, setFilter] = useState<'all' | 'food' | 'shop' | 'health' | 'events'>('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
        // @ts-ignore
        const L = window.L;
        if (!L) return;

        // Center on Pilar de la Horadada
        const map = L.map(mapContainerRef.current).setView([37.8653, -0.7932], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapInstanceRef.current = map;
    }
  }, []);

  // Handle Markers & Filtering
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    // @ts-ignore
    const L = window.L;

    // Clear existing markers
    markersRef.current.forEach(m => mapInstanceRef.current.removeLayer(m));
    markersRef.current = [];

    const itemsToAdd: any[] = [];

    if (filter === 'all' || filter === 'shop') {
        COMMERCIAL_CENSUS.forEach(cat => {
            if (filter === 'shop' && (cat.id === 'salud' || cat.id === 'servicios')) return; // Simple filter logic
            if (filter === 'health' && cat.id !== 'salud') return;
            itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'SHOP', color: 'blue' })));
        });
    }

    if (filter === 'all' || filter === 'food') {
        DINING_CENSUS.forEach(cat => itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'FOOD', color: 'orange' }))));
    }

    if (filter === 'all' || filter === 'events') {
        itemsToAdd.push(...MOCK_EVENTS.map(i => ({ ...i, type: 'EVENT', color: 'purple' })));
    }
    
    // Add markers
    itemsToAdd.forEach(item => {
        if (item.lat && item.lng) {
            const markerColor = item.color;
            // Custom simplified HTML marker
            const icon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: ${markerColor === 'orange' ? '#f97316' : markerColor === 'purple' ? '#9333ea' : '#2563eb'}; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });

            const marker = L.marker([item.lat, item.lng], { icon })
                .addTo(mapInstanceRef.current)
                .on('click', () => {
                    setSelectedItem(item);
                    mapInstanceRef.current.setView([item.lat, item.lng], 16);
                });
            
            markersRef.current.push(marker);
        }
    });

  }, [filter]);

  const handleLocateMe = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // @ts-ignore
                const L = window.L;
                
                if (userMarkerRef.current) {
                    userMarkerRef.current.setLatLng([latitude, longitude]);
                } else {
                    const userIcon = L.divIcon({
                        className: 'user-location-icon',
                        html: `<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 0 2px #3b82f6;"></div>`,
                        iconSize: [20, 20]
                    });
                    userMarkerRef.current = L.marker([latitude, longitude], { icon: userIcon }).addTo(mapInstanceRef.current);
                }

                mapInstanceRef.current.setView([latitude, longitude], 16);
                setIsLocating(false);
            },
            (error) => {
                console.error("Error locating", error);
                alert("No se pudo obtener tu ubicación. Verifica los permisos.");
                setIsLocating(false);
            }
        );
    } else {
        alert("Geolocalización no soportada");
        setIsLocating(false);
    }
  };

  return (
    <div className="relative h-[calc(100vh-140px)] w-full">
       <div ref={mapContainerRef} className="absolute inset-0 z-0 bg-gray-100" />
       
       {/* Filter Chips */}
       <div className="absolute top-4 left-4 right-4 z-[400] flex gap-2 overflow-x-auto no-scrollbar pb-2">
           <button 
             onClick={() => setFilter('all')}
             className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
           >
             Todo
           </button>
           <button 
             onClick={() => setFilter('food')}
             className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${filter === 'food' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
           >
             Comer
           </button>
           <button 
             onClick={() => setFilter('shop')}
             className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${filter === 'shop' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
           >
             Tiendas
           </button>
           <button 
             onClick={() => setFilter('events')}
             className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap ${filter === 'events' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700'}`}
           >
             Eventos
           </button>
       </div>

       {/* Locate Button */}
       <button 
         onClick={handleLocateMe}
         className="absolute top-20 right-4 z-[400] bg-white p-3 rounded-full shadow-lg text-blue-600 hover:bg-blue-50 transition-colors"
       >
          <Navigation size={24} className={isLocating ? 'animate-pulse' : ''} />
       </button>

       {/* Selected Item Card */}
       {selectedItem && (
         <div className="absolute bottom-6 left-4 right-4 z-[400] bg-white rounded-2xl p-4 shadow-xl border border-gray-100 animate-in slide-in-from-bottom duration-300">
            <button 
              onClick={() => setSelectedItem(null)} 
              className="absolute top-2 right-2 p-1 text-gray-400 hover:bg-gray-100 rounded-full"
            >
                <X size={18} />
            </button>
            <div className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                   <img src={selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                             selectedItem.type === 'FOOD' ? 'bg-orange-100 text-orange-700' :
                             selectedItem.type === 'EVENT' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                            {selectedItem.category}
                        </span>
                    </div>
                    <h3 className="font-bold text-gray-900 truncate">{selectedItem.name || selectedItem.title}</h3>
                    <p className="text-xs text-gray-500 truncate mb-2">{selectedItem.address || selectedItem.location}</p>
                    <button 
                        onClick={() => {
                            if (selectedItem.type === 'EVENT') onNavigate(ViewState.EVENTS, selectedItem.id);
                            else if (selectedItem.type === 'FOOD') onNavigate(ViewState.DINING); // Dining view needs update to support ID link, simplifying for now
                            else onNavigate(ViewState.SHOPPING, selectedItem.id);
                        }}
                        className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                        Ver Detalles
                    </button>
                </div>
            </div>
         </div>
       )}
    </div>
  );
};
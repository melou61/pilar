
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, X, ArrowLeft, Calendar, UtensilsCrossed, ShoppingBag, Star } from './Icons';
import { COMMERCIAL_CENSUS, DINING_CENSUS, MOCK_EVENTS } from '../data';
import { ViewState } from '../types';

interface MapViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ t, onNavigate }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [googleMap, setGoogleMap] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'food' | 'shop' | 'events'>('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any | null>(null);

  // Initialize Map
  useEffect(() => {
    const google = (window as any).google;
    if (mapRef.current && !googleMap && google) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.8653, lng: -0.7932 },
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            stylers: [{ visibility: "off" }]
          }
        ]
      });
      setGoogleMap(map);
    }
  }, [googleMap]);

  // Update Markers
  useEffect(() => {
    if (!googleMap) return;
    const google = (window as any).google;
    if (!google) return;

    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const itemsToAdd: any[] = [];
    if (filter === 'all' || filter === 'shop') {
      COMMERCIAL_CENSUS.forEach(cat => {
        itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'SHOP', color: '#2563eb', icon: '🛍️' })));
      });
    }
    if (filter === 'all' || filter === 'food') {
      DINING_CENSUS.forEach(cat => itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'FOOD', color: '#f97316', icon: '🍴' }))));
    }
    if (filter === 'all' || filter === 'events') {
      itemsToAdd.push(...MOCK_EVENTS.map(i => ({ ...i, type: 'EVENT', color: '#9333ea', icon: '📅' })));
    }

    itemsToAdd.forEach(item => {
      if (item.lat && item.lng) {
        const marker = new google.maps.Marker({
          position: { lat: item.lat, lng: item.lng },
          map: googleMap,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: item.color,
            fillOpacity: 1,
            strokeWeight: 3,
            strokeColor: '#FFFFFF',
            scale: 10
          }
        });

        marker.addListener('click', () => {
          setSelectedItem(item);
          googleMap.panTo({ lat: item.lat!, lng: item.lng! });
          // Adjust camera to leave space for the bottom card
          googleMap.panBy(0, -150);
        });

        markersRef.current.push(marker);
      }
    });
  }, [googleMap, filter]);

  const handleLocateMe = () => {
    setIsLocating(true);
    const google = (window as any).google;
    if (navigator.geolocation && google) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
          if (userMarkerRef.current) {
            userMarkerRef.current.setPosition(pos);
          } else {
            userMarkerRef.current = new google.maps.Marker({
              position: pos,
              map: googleMap,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#3b82f6',
                fillOpacity: 1,
                strokeWeight: 3,
                strokeColor: '#FFFFFF',
                scale: 7
              }
            });
          }
          googleMap?.setZoom(16);
          googleMap?.panTo(pos);
          setIsLocating(false);
        },
        (error) => {
          alert("Por favor, activa el GPS para mostrar tu ubicación.");
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setIsLocating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative animate-in fade-in duration-500 overflow-hidden">
      
      {/* Taller Header (Parte de arriba más larga) */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-8 flex flex-col gap-4 shadow-sm z-50">
        <div className="flex items-center">
          <button 
            onClick={() => onNavigate(ViewState.HOME)}
            className="p-3 -ml-3 text-gray-800 hover:bg-gray-100 rounded-full transition-all"
          >
            <ArrowLeft size={32} />
          </button>
          <div className="flex-1 text-center pr-8">
             <h2 className="font-black text-gray-900 text-2xl tracking-tight">Explorar Pilar</h2>
             <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mt-0.5">Mapa Interactivo</p>
          </div>
        </div>
        
        {/* Filters moved to header for better accessibility */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm border ${filter === 'all' ? 'bg-gray-900 text-white border-gray-900 shadow-gray-200' : 'bg-white text-gray-600 border-gray-100'}`}
          >
            Todo
          </button>
          <button 
            onClick={() => setFilter('food')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${filter === 'food' ? 'bg-orange-500 text-white border-orange-500 shadow-orange-100 shadow-lg' : 'bg-white text-gray-600 border-gray-100'}`}
          >
            <UtensilsCrossed size={14} /> Comer
          </button>
          <button 
            onClick={() => setFilter('shop')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${filter === 'shop' ? 'bg-blue-600 text-white border-blue-600 shadow-blue-100 shadow-lg' : 'bg-white text-gray-600 border-gray-100'}`}
          >
            <ShoppingBag size={14} /> Tiendas
          </button>
          <button 
            onClick={() => setFilter('events')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border ${filter === 'events' ? 'bg-purple-600 text-white border-purple-600 shadow-purple-100 shadow-lg' : 'bg-white text-gray-600 border-gray-100'}`}
          >
            <Calendar size={14} /> Eventos
          </button>
        </div>
      </div>

      {/* Map Main Viewport */}
      <div className="relative flex-1">
        <div ref={mapRef} className="absolute inset-0 z-0 bg-gray-50" />
        
        {/* GPS Button Positioned above the card */}
        <button 
          onClick={handleLocateMe}
          className={`absolute ${selectedItem ? 'bottom-[380px]' : 'bottom-8'} right-6 z-10 bg-white text-blue-600 p-5 rounded-full shadow-2xl hover:bg-blue-50 active:scale-90 transition-all border border-gray-100`}
        >
           <Navigation size={28} className={isLocating ? 'animate-pulse' : ''} />
        </button>

        {/* Selected Item Card (Narrower, 3 Rows Layout) */}
        {selectedItem && (
          <div className="absolute bottom-6 left-6 right-6 z-20 animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-w-sm mx-auto">
              
              {/* Row 1: Visual Header */}
              <div className="relative h-32 w-full">
                <img 
                  src={selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl} 
                  className="w-full h-full object-cover" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                   <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm">
                      {selectedItem.category}
                   </span>
                   <div className="flex items-center bg-yellow-400 px-2 py-1 rounded-lg shadow-sm">
                      <Star size={10} className="fill-gray-900 text-gray-900 mr-1" />
                      <span className="text-[10px] font-black text-gray-900">{selectedItem.rating || 'New'}</span>
                   </div>
                </div>
              </div>

              {/* Row 2: Content Body */}
              <div className="p-6 flex flex-col gap-2">
                <h3 className="font-black text-gray-900 text-xl leading-tight line-clamp-1">
                  {selectedItem.name || selectedItem.title}
                </h3>
                <p className="text-gray-500 text-sm flex items-start gap-2 leading-snug">
                  <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{selectedItem.address || selectedItem.location}</span>
                </p>
                {selectedItem.description && (
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2 italic">
                    "{selectedItem.description}"
                  </p>
                )}
              </div>

              {/* Row 3: Actions Footer */}
              <div className="px-6 pb-6 pt-2">
                <button 
                  onClick={() => {
                    if (selectedItem.type === 'EVENT') onNavigate(ViewState.EVENTS, selectedItem.id);
                    else if (selectedItem.type === 'FOOD') onNavigate(ViewState.DINING);
                    else onNavigate(ViewState.SHOPPING, selectedItem.id);
                  }}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Ver Perfil Completo
                  <ArrowLeft size={18} className="rotate-180" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MapView;

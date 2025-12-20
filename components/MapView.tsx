
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, X, ArrowLeft, Calendar, UtensilsCrossed, ShoppingBag, Star, ArrowRight } from './Icons';
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

  useEffect(() => {
    const google = (window as any).google;
    if (mapRef.current && !googleMap && google) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.8653, lng: -0.7932 },
        zoom: 15,
        disableDefaultUI: true,
        styles: [
          { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] }
        ]
      });
      setGoogleMap(map);
    }
  }, [googleMap]);

  useEffect(() => {
    if (!googleMap) return;
    const google = (window as any).google;
    if (!google) return;

    markersRef.current.forEach(m => m.setMap(null));
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
        const marker = new google.maps.Marker({
          position: { lat: item.lat, lng: item.lng },
          map: googleMap,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: item.color,
            fillOpacity: 1,
            strokeWeight: 4,
            strokeColor: '#FFFFFF',
            scale: 11
          }
        });

        marker.addListener('click', () => {
          setSelectedItem(item);
          googleMap.panTo({ lat: item.lat!, lng: item.lng! });
          googleMap.panBy(0, -120);
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
          if (userMarkerRef.current) userMarkerRef.current.setPosition(pos);
          else {
            userMarkerRef.current = new google.maps.Marker({
              position: pos,
              map: googleMap,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#3b82f6',
                fillOpacity: 1,
                strokeWeight: 4,
                strokeColor: '#FFFFFF',
                scale: 8
              }
            });
          }
          googleMap?.setZoom(16);
          googleMap?.panTo(pos);
          setIsLocating(false);
        },
        () => setIsLocating(false),
        { enableHighAccuracy: true }
      );
    } else setIsLocating(false);
  };

  return (
    <div className="flex flex-col h-full bg-white relative animate-in fade-in duration-500 overflow-hidden">
      
      {/* Tall Header Area */}
      <div className="bg-white border-b border-gray-100 px-8 py-10 flex flex-col gap-6 shadow-sm z-50">
        <div className="flex items-center">
          <button 
            onClick={() => onNavigate(ViewState.HOME)}
            className="p-3 -ml-4 text-gray-800 hover:bg-gray-100 rounded-2xl transition-all"
          >
            <ArrowLeft size={36} />
          </button>
          <div className="flex-1 text-center pr-8">
             <h2 className="font-black text-gray-900 text-3xl tracking-tight">Cerca de ti</h2>
             <p className="text-blue-600 text-xs font-black uppercase tracking-widest mt-1">Explora Pilar de la Horadada</p>
          </div>
        </div>
        
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
          {['all', 'food', 'shop', 'events'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-3 rounded-2xl text-sm font-black transition-all border shadow-sm flex items-center gap-2 whitespace-nowrap ${
                filter === f 
                ? 'bg-gray-900 text-white border-gray-900 shadow-xl shadow-gray-200 scale-105' 
                : 'bg-white text-gray-500 border-gray-100 hover:border-gray-200'
              }`}
            >
              {f === 'all' && "Todo"}
              {f === 'food' && <><UtensilsCrossed size={16} /> Comer</>}
              {f === 'shop' && <><ShoppingBag size={16} /> Compras</>}
              {f === 'events' && <><Calendar size={16} /> Eventos</>}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1">
        <div ref={mapRef} className="absolute inset-0 z-0 bg-gray-50" />
        
        <button 
          onClick={handleLocateMe}
          className={`absolute ${selectedItem ? 'bottom-[420px]' : 'bottom-10'} right-8 z-10 bg-white text-blue-600 p-6 rounded-[24px] shadow-2xl hover:scale-110 active:scale-90 transition-all border border-gray-50`}
        >
           <Navigation size={32} className={isLocating ? 'animate-pulse' : ''} />
        </button>

        {/* Selected Item Card (3 Rows / Narrow) */}
        {selectedItem && (
          <div className="absolute bottom-8 left-8 right-8 z-20 animate-in slide-in-from-bottom-20 duration-500">
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-w-xs mx-auto ring-1 ring-black/5">
              
              {/* Row 1: Header/Visual */}
              <div className="relative h-44 w-full">
                <img src={selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-xl text-white rounded-full hover:bg-white/40 transition-all"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-6">
                   <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg">
                      {selectedItem.category}
                   </span>
                </div>
              </div>

              {/* Row 2: Info Body */}
              <div className="p-8 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                   <h3 className="font-black text-gray-900 text-2xl leading-none truncate">
                    {selectedItem.name || selectedItem.title}
                   </h3>
                   <div className="flex items-center bg-yellow-400 px-2 py-1 rounded-lg shrink-0">
                      <Star size={10} className="fill-gray-900 mr-1" />
                      <span className="text-[10px] font-black text-gray-900">{selectedItem.rating || '4.5'}</span>
                   </div>
                </div>
                <p className="text-gray-500 text-sm flex items-start gap-2 font-medium">
                  <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{selectedItem.address || selectedItem.location}</span>
                </p>
                {selectedItem.description && (
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed italic">
                    {selectedItem.description}
                  </p>
                )}
              </div>

              {/* Row 3: Action Footer */}
              <div className="px-8 pb-8">
                <button 
                  onClick={() => {
                    if (selectedItem.type === 'EVENT') onNavigate(ViewState.EVENTS, selectedItem.id);
                    else if (selectedItem.type === 'FOOD') onNavigate(ViewState.DINING);
                    else onNavigate(ViewState.SHOPPING, selectedItem.id);
                  }}
                  className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black text-base shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Ver Detalles
                  <ArrowRight size={20} />
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

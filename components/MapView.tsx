
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
    const initMap = () => {
        const google = (window as any).google;
        if (mapRef.current && !googleMap && google && google.maps) {
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
        } else if (!googleMap) {
            setTimeout(initMap, 500);
        }
    };
    initMap();
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
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} className="bg-gray-50" />
        
        <button onClick={handleLocateMe} className={`absolute ${selectedItem ? 'bottom-[420px]' : 'bottom-10'} right-8 z-10 bg-white text-blue-600 p-6 rounded-[24px] shadow-2xl hover:scale-110 active:scale-90 transition-all border border-gray-50`}>
           <Navigation size={32} className={isLocating ? 'animate-pulse' : ''} />
        </button>

        {selectedItem && (
          <div className="absolute bottom-8 left-8 right-8 z-20 animate-in slide-in-from-bottom-20 duration-500">
            <div className="bg-white rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-w-xs mx-auto ring-1 ring-black/5">
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
export default MapView;

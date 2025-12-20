
import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, X, ArrowLeft, Calendar, UtensilsCrossed, ShoppingBag } from './Icons';
import { COMMERCIAL_CENSUS, DINING_CENSUS, MOCK_EVENTS } from '../data';
import { ViewState } from '../types';

interface MapViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ t, onNavigate }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  // Fix: Use any to avoid missing google namespace errors
  const [googleMap, setGoogleMap] = useState<any | null>(null);
  const [filter, setFilter] = useState<'all' | 'food' | 'shop' | 'events'>('all');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  // Fix: Use any to avoid missing google namespace errors
  const markersRef = useRef<any[]>([]);
  // Fix: Use any to avoid missing google namespace errors
  const userMarkerRef = useRef<any | null>(null);

  // Initialize Map
  useEffect(() => {
    // Fix: Access google from window to avoid 'Cannot find name google'
    const google = (window as any).google;
    if (mapRef.current && !googleMap && google) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.8653, lng: -0.7932 },
        zoom: 15,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });
      setGoogleMap(map);
    }
  }, [googleMap]);

  // Update Markers when filter changes
  useEffect(() => {
    if (!googleMap) return;

    // Fix: Access google from window object
    const google = (window as any).google;
    if (!google) return;

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    const itemsToAdd: any[] = [];
    if (filter === 'all' || filter === 'shop') {
      COMMERCIAL_CENSUS.forEach(cat => {
        itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'SHOP', color: '#2563eb' })));
      });
    }
    if (filter === 'all' || filter === 'food') {
      DINING_CENSUS.forEach(cat => itemsToAdd.push(...cat.items.map(i => ({ ...i, type: 'FOOD', color: '#f97316' }))));
    }
    if (filter === 'all' || filter === 'events') {
      itemsToAdd.push(...MOCK_EVENTS.map(i => ({ ...i, type: 'EVENT', color: '#9333ea' })));
    }

    itemsToAdd.forEach(item => {
      if (item.lat && item.lng) {
        // Fix: Use google.maps from window to avoid 'Cannot find name google'
        const marker = new google.maps.Marker({
          position: { lat: item.lat, lng: item.lng },
          map: googleMap,
          title: item.name || item.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: item.color,
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
            scale: 12
          }
        });

        marker.addListener('click', () => {
          setSelectedItem(item);
          googleMap.panTo({ lat: item.lat!, lng: item.lng! });
          googleMap.setZoom(17);
        });

        markersRef.current.push(marker);
      }
    });
  }, [googleMap, filter]);

  const handleLocateMe = () => {
    setIsLocating(true);
    // Fix: Access google from window object
    const google = (window as any).google;
    if (navigator.geolocation && google) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          if (userMarkerRef.current) {
            userMarkerRef.current.setPosition(pos);
          } else {
            // Fix: Use google.maps from window to avoid 'Cannot find name google'
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

          googleMap?.panTo(pos);
          googleMap?.setZoom(16);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error geolocating:", error);
          alert(`Error de ubicación: ${error.message}. Por favor, activa el GPS.`);
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      alert("Tu navegador no soporta geolocalización o Google Maps no está cargado.");
      setIsLocating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white relative animate-in fade-in duration-300">
      {/* Header with Back Arrow */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-4 flex items-center shadow-sm z-50">
        <button 
          onClick={() => onNavigate(ViewState.HOME)}
          className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center"
        >
          <ArrowLeft size={28} />
        </button>
        <h2 className="font-bold text-gray-900 text-xl flex-1 text-center pr-10">Mapa Interactivo</h2>
      </div>

      {/* Map Canvas */}
      <div className="relative flex-1">
        <div ref={mapRef} className="absolute inset-0 z-0 bg-gray-50" />
        
        {/* Filters Overlay */}
        <div className="absolute top-4 left-0 right-0 z-10 px-4 flex gap-2 overflow-x-auto no-scrollbar pointer-events-none">
          <div className="flex gap-2 pointer-events-auto">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shadow-lg border transition-all ${filter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-100'}`}
            >
              Todo
            </button>
            <button 
              onClick={() => setFilter('food')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shadow-lg border transition-all flex items-center gap-1.5 ${filter === 'food' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-700 border-gray-100'}`}
            >
              <UtensilsCrossed size={14} /> Comer
            </button>
            <button 
              onClick={() => setFilter('shop')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shadow-lg border transition-all flex items-center gap-1.5 ${filter === 'shop' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-100'}`}
            >
              <ShoppingBag size={14} /> Tiendas
            </button>
            <button 
              onClick={() => setFilter('events')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shadow-lg border transition-all flex items-center gap-1.5 ${filter === 'events' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-700 border-gray-100'}`}
            >
              <Calendar size={14} /> Eventos
            </button>
          </div>
        </div>

        {/* GPS Button */}
        <button 
          onClick={handleLocateMe}
          className="absolute bottom-28 right-4 z-10 bg-white text-blue-600 p-4 rounded-full shadow-2xl hover:bg-blue-50 active:scale-90 transition-all border border-gray-100"
          title="Mi ubicación"
        >
           <Navigation size={24} className={isLocating ? 'animate-pulse' : ''} />
        </button>

        {/* Info Card Overlay */}
        {selectedItem && (
          <div className="absolute bottom-6 left-4 right-4 z-20 p-1 animate-in slide-in-from-bottom duration-300">
            <div className="bg-white rounded-3xl p-4 shadow-2xl border border-blue-50 relative">
              <button 
                onClick={() => setSelectedItem(null)} 
                className="absolute top-2 right-2 p-2 text-gray-400 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={selectedItem.images ? selectedItem.images[0] : selectedItem.imageUrl} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{selectedItem.category}</span>
                  <h3 className="font-bold text-gray-900 text-base truncate pr-6">{selectedItem.name || selectedItem.title}</h3>
                  <p className="text-xs text-gray-500 truncate mb-2">{selectedItem.address || selectedItem.location}</p>
                  <button 
                    onClick={() => {
                      if (selectedItem.type === 'EVENT') onNavigate(ViewState.EVENTS, selectedItem.id);
                      else if (selectedItem.type === 'FOOD') onNavigate(ViewState.DINING);
                      else onNavigate(ViewState.SHOPPING, selectedItem.id);
                    }}
                    className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Ver detalles completos <ArrowLeft size={14} className="rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MapView;

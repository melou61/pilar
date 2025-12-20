import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Phone, Tag, ChevronRight, ArrowLeft, Star, Globe, Share2, Filter, Navigation, MapIcon, Facebook, Instagram, Twitter } from './Icons';
import { COMMERCIAL_CENSUS } from '../data';
import { CensusItem } from '../types';

interface ShoppingViewProps {
  t: any;
  highlightedBusinessId?: string | null;
  categoryFilter?: string[]; // Array of category IDs to include (e.g., ['salud', 'farmacia'])
  customTitle?: string;
  customDesc?: string;
}

// Haversine formula to calculate distance in km
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; // Distance in km
};

export const ShoppingView: React.FC<ShoppingViewProps> = ({ 
  t, 
  highlightedBusinessId, 
  categoryFilter,
  customTitle,
  customDesc
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<CensusItem & { distance?: number | null } | null>(null);
  
  // View Modes
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Filter States
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);
  
  // Location State
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Effect to handle external selection (from SearchModal)
  useEffect(() => {
    if (highlightedBusinessId) {
      // Find the business in the data
      let found: CensusItem | null = null;
      for (const cat of COMMERCIAL_CENSUS) {
        const item = cat.items.find(i => i.id === highlightedBusinessId);
        if (item) {
          found = item;
          break;
        }
      }
      if (found) {
        setSelectedBusiness(found);
      }
    }
  }, [highlightedBusinessId]);

  const handleToggleLocation = () => {
    if (sortByDistance) {
        // Turn off
        setSortByDistance(false);
        return;
    }

    // Turn on
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
        setLocationError("Geolocalización no soportada");
        setIsLocating(false);
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            setSortByDistance(true);
            setIsLocating(false);
        },
        (err) => {
            console.error(err);
            setLocationError("Permiso denegado");
            setIsLocating(false);
        }
    );
  };

  // 1. Get Active Categories
  const activeCategories = categoryFilter 
    ? COMMERCIAL_CENSUS.filter(cat => categoryFilter.includes(cat.id))
    : COMMERCIAL_CENSUS;

  // 2. Process Items (Add Distance, Filter, Sort)
  const processedCategories = activeCategories.map(cat => {
    // A. Map items to include calculated distance
    let processedItems = cat.items.map(item => {
        let distance = null;
        if (userLocation && item.lat && item.lng) {
            distance = calculateDistance(userLocation.lat, userLocation.lng, item.lat, item.lng);
        }
        return { ...item, distance };
    });

    // B. Filter items
    processedItems = processedItems.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              item.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesOpen = showOpenOnly ? item.isOpen : true;
        return matchesSearch && matchesOpen;
    });

    // C. Sort items if enabled
    if (sortByDistance && userLocation) {
        processedItems.sort((a, b) => {
            if (a.distance === null) return 1;
            if (b.distance === null) return -1;
            return a.distance - b.distance;
        });
    }

    return { ...cat, items: processedItems };
  }).filter(cat => cat.items.length > 0);

  // Flatten for "Near Me" view if sorting is active to show a unified list
  // Otherwise keep categorical view
  const unifiedList = sortByDistance 
    ? processedCategories.flatMap(cat => cat.items).sort((a, b) => (a.distance || 999) - (b.distance || 999))
    : [];

  // MAP LOGIC
  useEffect(() => {
    if (viewMode === 'map' && mapContainerRef.current && !mapInstanceRef.current) {
         // @ts-ignore
         const L = window.L;
         if (!L) return;

         // Initialize Map
         const map = L.map(mapContainerRef.current).setView([37.8653, -0.7932], 14);
         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         }).addTo(map);
         
         mapInstanceRef.current = map;
    }

    if (viewMode === 'map' && mapInstanceRef.current) {
        // @ts-ignore
        const L = window.L;
        
        // Clear existing markers
        markersRef.current.forEach(m => mapInstanceRef.current.removeLayer(m));
        markersRef.current = [];

        // Collect all items from processed categories
        const allItems = processedCategories.flatMap(cat => cat.items);

        // Add Markers
        allItems.forEach(item => {
            if (item.lat && item.lng) {
                const marker = L.marker([item.lat, item.lng])
                    .addTo(mapInstanceRef.current)
                    .bindPopup(`<b>${item.name}</b><br>${item.category}`);
                
                // Add click listener to open details
                marker.on('click', () => {
                    setSelectedBusiness(item);
                });

                markersRef.current.push(marker);
            }
        });

        // Fit bounds if there are markers
        if (markersRef.current.length > 0) {
            const group = L.featureGroup(markersRef.current);
            mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
        }
    }
  }, [viewMode, processedCategories]);


  const formatDistance = (dist: number | null | undefined) => {
      if (dist === null || dist === undefined) return '';
      if (dist < 1) return `${(dist * 1000).toFixed(0)} m`;
      return `${dist.toFixed(1)} km`;
  };

  // Business Detail Sub-component
  const BusinessDetail = ({ business, onClose }: { business: CensusItem & { distance?: number | null }, onClose: () => void }) => {
     const tBiz = t.business || {
        open: 'Open', closed: 'Closed', reviews: 'Reviews', call: 'Call', website: 'Website', 
        directions: 'Map', hours: 'Hours', about: 'About', photos: 'Photos'
     };

     return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100">
                <div className="flex items-center justify-between p-4">
                    <button 
                        onClick={onClose}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-700 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div className="flex-1 text-center font-semibold text-gray-900 truncate px-4">
                        {business.name}
                    </div>
                    <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full text-gray-700">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-20">
                {/* Images Carousel */}
                <div className="h-64 bg-gray-100 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
                    {business.images.map((img, idx) => (
                        <div key={idx} className="min-w-full h-full snap-center relative">
                             <img src={img} alt={`${business.name} ${idx}`} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>

                {/* Primary Info */}
                <div className="p-6 -mt-6 relative bg-white rounded-t-3xl shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                             <h1 className="text-2xl font-bold text-gray-900 leading-tight">{business.name}</h1>
                             <span className="text-sm text-blue-600 font-medium">{business.category}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                                <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="font-bold text-gray-900">{business.rating}</span>
                            </div>
                            <span className="text-xs text-gray-400 mt-1">{business.reviewCount} {tBiz.reviews}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 text-sm">
                        <div className={`w-2.5 h-2.5 rounded-full ${business.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`font-medium ${business.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                            {business.isOpen ? tBiz.open : tBiz.closed}
                        </span>
                        <span className="text-gray-400 mx-1">•</span>
                        <span className="text-gray-500">{business.hours.weekdays}</span>
                    </div>

                    {/* Distance Badge in Detail */}
                    {business.distance !== undefined && business.distance !== null && (
                        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
                            <Navigation size={16} className="fill-indigo-700" />
                            A {formatDistance(business.distance)} de ti
                        </div>
                    )}

                    {/* Socials (RRSS) - Moved here prominently */}
                    {business.socials && (
                        <div className="flex gap-3 mt-5">
                            {business.socials.facebook && (
                                <a href={business.socials.facebook} target="_blank" rel="noreferrer" className="bg-blue-600 text-white p-2 rounded-full shadow-sm hover:bg-blue-700 transition-colors">
                                    <Facebook size={18} />
                                </a>
                            )}
                            {business.socials.instagram && (
                                <a href={business.socials.instagram} target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white p-2 rounded-full shadow-sm hover:opacity-90 transition-opacity">
                                    <Instagram size={18} />
                                </a>
                            )}
                            {business.socials.twitter && (
                                <a href={business.socials.twitter} target="_blank" rel="noreferrer" className="bg-black text-white p-2 rounded-full shadow-sm hover:bg-gray-800 transition-colors">
                                    <Twitter size={18} />
                                </a>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                        <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 text-green-700 p-3 rounded-xl transition-colors border border-green-100">
                            <Phone size={20} className="mb-1" />
                            <span className="text-xs font-semibold">{tBiz.call}</span>
                        </a>
                        <button className="flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 p-3 rounded-xl transition-colors border border-blue-100">
                            <MapPin size={20} className="mb-1" />
                            <span className="text-xs font-semibold">{tBiz.directions}</span>
                        </button>
                         <a href={business.website || '#'} className={`flex flex-col items-center justify-center p-3 rounded-xl transition-colors border ${business.website ? 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-100' : 'bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100'}`}>
                            <Globe size={20} className="mb-1" />
                            <span className="text-xs font-semibold">{tBiz.website}</span>
                        </a>
                    </div>
                </div>

                <div className="h-2 bg-gray-50"></div>

                {/* Details Section */}
                <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-3">{tBiz.about}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {business.description}
                    </p>

                    <h3 className="font-bold text-gray-900 mb-3">{tBiz.hours}</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Lun - Vie</span>
                            <span className="font-medium text-gray-900">{business.hours.weekdays}</span>
                        </div>
                         <div className="flex justify-between py-2 border-b border-gray-50">
                            <span className="text-gray-500">Sab - Dom</span>
                            <span className="font-medium text-gray-900">{business.hours.weekend}</span>
                        </div>
                    </div>

                     <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                            <MapPin size={18} className="text-gray-400" />
                            <span>{business.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600 text-sm">
                            <Phone size={18} className="text-gray-400" />
                            <span>{business.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
  };

  const renderCardItem = (item: any) => (
    <div 
        key={item.id} 
        onClick={() => setSelectedBusiness(item)}
        className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer group items-center"
    >
        {/* Thumbnail Image */}
        <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
            <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
            <div className="absolute top-1 right-1 bg-white/90 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 text-[10px] font-bold shadow-sm">
                <Star size={8} className="text-yellow-500 fill-yellow-500" />
                {item.rating}
            </div>
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-gray-900 text-sm truncate pr-2 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                 {item.isOpen 
                  ? <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0">ABIERTO</span>
                  : <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">CERRADO</span>
                }
            </div>
            
            <p className="text-xs text-blue-600 font-medium mb-1.5">{item.category}</p>
            
            <div className="flex items-center justify-between mt-2">
                 <p className="flex items-center gap-1 text-xs text-gray-500 truncate max-w-[140px]">
                    <MapPin size={12} className="shrink-0" /> {item.address}
                 </p>
                 
                 <div className="flex items-center">
                    {item.socials && (
                        <div className="flex items-center -space-x-1 mr-2">
                             {item.socials.instagram && <div className="w-4 h-4 rounded-full bg-pink-500 text-white flex items-center justify-center"><Instagram size={8} /></div>}
                             {item.socials.facebook && <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center"><Facebook size={8} /></div>}
                        </div>
                    )}
                    {item.distance !== undefined && item.distance !== null && (
                        <div className="flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md ml-auto shrink-0">
                            <Navigation size={10} className="fill-indigo-600" /> 
                            {formatDistance(item.distance)}
                        </div>
                    )}
                 </div>
            </div>
        </div>
        
        <div className="text-gray-300 pr-1">
             <ChevronRight size={18} />
        </div>
    </div>
  );

  return (
    <div className="px-4 py-6 space-y-6 pb-20 relative">
       {selectedBusiness && (
         <BusinessDetail business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />
       )}

       <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{customTitle || t.sections.shopping.title}</h2>
            <p className="text-gray-500 text-sm mt-1">{customDesc || t.sections.shopping.desc}</p>
          </div>
          
          {/* VIEW TOGGLE */}
          <div className="flex bg-gray-100 p-1 rounded-xl shrink-0 ml-4">
             <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
             >
                <Filter size={20} className={viewMode === 'list' ? 'rotate-180' : ''} />
             </button>
             <button 
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'map' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
             >
                <MapIcon size={20} />
             </button>
          </div>
       </div>

       <div className="flex flex-col gap-3">
         {/* Search Bar */}
         <div className="relative w-full">
           <input 
             type="text" 
             placeholder={t.common.searchPlaceholder}
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
           />
           <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
         </div>

         {/* Filter Buttons Row */}
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button 
                onClick={handleToggleLocation}
                className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap shadow-sm ${
                    sortByDistance 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-200' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
                {isLocating ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    <Navigation size={16} className={sortByDistance ? 'fill-current' : ''} />
                )}
                <span className="text-xs font-bold">Cerca de mí</span>
            </button>

            <button 
                onClick={() => setShowOpenOnly(!showOpenOnly)}
                className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-all whitespace-nowrap shadow-sm ${
                    showOpenOnly 
                    ? 'bg-green-600 border-green-600 text-white shadow-green-200' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
            >
                <Filter size={16} />
                <span className="text-xs font-bold">Abiertos ahora</span>
            </button>
         </div>
         
         {locationError && (
             <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg text-center font-medium border border-red-100">
                 {locationError}. Verifica los permisos de ubicación de tu navegador.
             </div>
         )}
       </div>

       {/* CONTENT AREA */}
       <div className="min-h-[50vh]">
         {viewMode === 'map' ? (
             <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-[60vh] relative">
                 <div ref={mapContainerRef} className="absolute inset-0 z-0 bg-gray-100" />
                 {/* Map Legend/Overlay could go here */}
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm z-[400] text-xs font-medium text-gray-600">
                     {processedCategories.reduce((acc, cat) => acc + cat.items.length, 0)} comercios
                 </div>
             </div>
         ) : (
             <div className="space-y-8">
                {processedCategories.length > 0 ? (
                    sortByDistance ? (
                        /* UNIFIED LIST SORTED BY DISTANCE */
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2 px-1">
                                <Navigation size={14} className="text-indigo-600 fill-indigo-600" />
                                Ordenado por cercanía
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {unifiedList.map(item => renderCardItem(item))}
                            </div>
                        </div>
                    ) : (
                        /* CATEGORICAL LIST */
                        processedCategories.map(category => (
                            <div key={category.id}>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 px-1">
                                <Tag size={18} className="text-blue-600" />
                                {category.title}
                                </h3>
                                <div className="grid grid-cols-1 gap-3">
                                {category.items.map((item) => renderCardItem(item))}
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center">
                    <Search size={32} className="mb-2 opacity-20" />
                    <p className="text-sm font-medium">{t.common.noResults} "{searchTerm}"</p>
                    {showOpenOnly && <p className="text-xs mt-1 text-gray-400">Prueba a desactivar el filtro "Abiertos ahora"</p>}
                    </div>
                )}
            </div>
         )}
       </div>
    </div>
  );
};
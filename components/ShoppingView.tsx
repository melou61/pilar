
import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Phone, Tag, ChevronRight, ArrowLeft, Star, Globe, Share2, Filter, Navigation, MapIcon, Facebook, Instagram, Twitter } from './Icons';
import { COMMERCIAL_CENSUS, DINING_CENSUS } from '../data';
import { CensusItem } from '../types';

interface ShoppingViewProps {
  t: any;
  highlightedBusinessId?: string | null;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({ t, highlightedBusinessId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState<CensusItem | null>(null);
  
  const allBusinesses = [...COMMERCIAL_CENSUS.flatMap(c => c.items), ...DINING_CENSUS.flatMap(c => c.items)];

  useEffect(() => {
    if (highlightedBusinessId) {
      const found = allBusinesses.find(b => b.id === highlightedBusinessId);
      if (found) setSelectedBusiness(found);
    }
  }, [highlightedBusinessId]);

  const BusinessDetail = ({ business, onClose }: { business: CensusItem, onClose: () => void }) => (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
        {/* Gallery */}
        <div className="relative h-96 w-full">
            <img src={business.images[0]} className="w-full h-full object-cover" />
            <button onClick={onClose} className="absolute top-8 left-8 w-14 h-14 bg-white/20 backdrop-blur-xl text-white rounded-full flex items-center justify-center">
                <ArrowLeft size={28} />
            </button>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 text-white">
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{business.category}</span>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-black">{business.priceRange}</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight">{business.name}</h1>
            </div>
        </div>

        <div className="p-10 space-y-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-yellow-500">
                    <Star size={24} className="fill-current" />
                    <span className="text-2xl font-black text-gray-900">{business.rating}</span>
                    <span className="text-gray-400 font-medium ml-2">({business.reviewCount} reseñas)</span>
                </div>
                <div className="flex gap-4">
                    <a href={`tel:${business.phone}`} className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[20px] flex items-center justify-center"><Phone size={24} /></a>
                    <button className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[20px] flex items-center justify-center"><MapIcon size={24} /></button>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Sobre nosotros</h3>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">{business.description}</p>
            </div>

            {business.featuredItems && (
                <div>
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">Recomendados</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {business.featuredItems.map(item => (
                            <div key={item} className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
                                <span className="font-black text-gray-900">{item}</span>
                                <div className="text-blue-600"><Star size={16} /></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Ubicación y Contacto</h3>
                <div className="space-y-4">
                    <p className="flex items-center gap-3 text-gray-900 font-bold"><MapPin size={20} className="text-blue-500" /> {business.address}</p>
                    <p className="flex items-center gap-3 text-gray-900 font-bold"><Phone size={20} className="text-blue-500" /> {business.phone}</p>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen px-6 py-12 pb-40">
        {selectedBusiness && <BusinessDetail business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />}
        <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-8">Directorio Comercial</h2>
        <div className="grid grid-cols-1 gap-6">
            {allBusinesses.map(biz => (
                <div 
                    key={biz.id} 
                    onClick={() => setSelectedBusiness(biz)}
                    className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/40 flex h-48 group cursor-pointer"
                >
                    <div className="w-48 h-full overflow-hidden">
                        <img src={biz.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h4 className="font-black text-2xl text-gray-900">{biz.name}</h4>
                                <span className="text-blue-600 font-black text-sm">{biz.priceRange}</span>
                            </div>
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mt-1">{biz.category}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-yellow-500">
                                <Star size={14} className="fill-current" />
                                <span className="text-sm font-black text-gray-900">{biz.rating}</span>
                            </div>
                            <div className="text-blue-600 font-black text-xs uppercase tracking-widest">Ver más</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

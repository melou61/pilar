
import React, { useState, useEffect } from 'react';
import { Star, ChevronRight } from './Icons';
import { COMMERCIAL_CENSUS, DINING_CENSUS } from '../data';
import { CensusItem } from '../types';
import { BusinessDetailView } from './BusinessDetailView';

interface ShoppingViewProps {
  t: any;
  highlightedBusinessId?: string | null;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({ t, highlightedBusinessId }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<CensusItem | null>(null);
  
  const allBusinesses = [...COMMERCIAL_CENSUS.flatMap(c => c.items), ...DINING_CENSUS.flatMap(c => c.items)];

  useEffect(() => {
    if (highlightedBusinessId) {
      const found = allBusinesses.find(b => b.id === highlightedBusinessId);
      if (found) setSelectedBusiness(found);
    }
  }, [highlightedBusinessId, allBusinesses]);

  return (
    <div className="bg-[#f8fafc] min-h-screen px-6 py-16 pb-44 animate-in fade-in duration-300">
        {selectedBusiness && (
          <BusinessDetailView 
            business={selectedBusiness} 
            onClose={() => setSelectedBusiness(null)} 
            t={t.business} 
          />
        )}
        
        <div className="mb-12 px-4">
          <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">Guía de Comercio</h2>
          <p className="text-gray-500 font-medium text-lg">Descubre los mejores negocios locales del Pilar.</p>
        </div>

        <div className="grid grid-cols-1 gap-10">
            {allBusinesses.map(biz => (
                <div 
                    key={biz.id} 
                    onClick={() => setSelectedBusiness(biz)}
                    className="bg-white rounded-[50px] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/40 flex h-60 group cursor-pointer hover:-translate-y-2 transition-all duration-500"
                >
                    <div className="w-60 h-full overflow-hidden shrink-0">
                        <img 
                          src={biz.images && biz.images.length > 0 ? biz.images[0] : 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                          alt={biz.name} 
                        />
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start">
                                <h4 className="font-black text-3xl text-gray-900 tracking-tighter leading-none">{biz.name}</h4>
                                {biz.priceRange && (
                                  <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-2xl font-black text-sm">
                                    {biz.priceRange}
                                  </span>
                                )}
                            </div>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">{biz.category}</p>
                            <p className="text-sm text-gray-500 mt-4 line-clamp-2 font-medium">{biz.description}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                            <div className="flex items-center gap-2 text-yellow-500">
                                <Star size={20} className="fill-current" />
                                <span className="text-lg font-black text-gray-900">{biz.rating}</span>
                                <span className="text-xs text-gray-400 font-bold ml-1 uppercase">({biz.reviewCount})</span>
                            </div>
                            <div className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-5 py-2.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-2">
                                Ver ficha <ChevronRight size={14} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

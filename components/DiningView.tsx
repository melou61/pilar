
import React, { useState } from 'react';
import { UtensilsCrossed, Star, MapPin, Clock, Phone, ChevronRight } from './Icons';
import { DINING_CENSUS } from '../data';
import { CensusItem } from '../types';
import { BusinessDetailView } from './BusinessDetailView';

interface DiningViewProps {
  t: any;
}

export const DiningView: React.FC<DiningViewProps> = ({ t }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<CensusItem | null>(null);

  return (
    <div className="bg-white min-h-screen pb-44 animate-in fade-in duration-300">
      {selectedBusiness && (
        <BusinessDetailView 
          business={selectedBusiness} 
          onClose={() => setSelectedBusiness(null)} 
          t={t.business} 
        />
      )}

      <div className="relative h-56 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544124499-58ec526df938?auto=format&fit=crop&w=1200&q=80" 
          alt="Gastronomía Pilar" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
           <div>
              <div className="bg-orange-500/90 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2 uppercase tracking-widest">Gastronomía</div>
              <h1 className="text-4xl font-black text-white mb-1 tracking-tighter">{t.sections.dining.title}</h1>
              <p className="text-white/80 text-sm font-medium">{t.sections.dining.desc}</p>
           </div>
        </div>
      </div>

      <div className="px-6 py-10 space-y-12">
         {DINING_CENSUS.map((category) => (
             <div key={category.id}>
                 <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2 tracking-tighter">
                   <UtensilsCrossed size={24} className="text-orange-500" />
                   {category.title}
                 </h2>
                 <div className="grid gap-6">
                    {category.items.map((place) => (
                        <div 
                          key={place.id} 
                          onClick={() => setSelectedBusiness(place)}
                          className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl transition-all group cursor-pointer"
                        >
                           <div className="w-full sm:w-1/3 h-48 sm:h-auto relative overflow-hidden">
                              <img 
                                src={place.images && place.images.length > 0 ? place.images[0] : 'https://images.unsplash.com/photo-1517248135467-4c7ed9d8607c?auto=format&fit=crop&w=800&q=80'} 
                                alt={place.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                              />
                              <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-black text-gray-900 shadow-xl">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                {place.rating}
                              </div>
                           </div>
                           <div className="p-6 flex-1 flex flex-col justify-between">
                               <div>
                                   <div className="flex justify-between items-start">
                                     <h3 className="font-black text-gray-900 text-xl leading-none tracking-tighter mb-1">{place.name}</h3>
                                     <span className="text-orange-600 font-black text-xs">{place.priceRange}</span>
                                   </div>
                                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{place.category}</p>
                                   <p className="text-sm text-gray-500 mt-4 line-clamp-2 font-medium leading-relaxed">{place.description}</p>
                               </div>
                               <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 font-black uppercase tracking-widest">
                                   <div className="flex items-center gap-4">
                                       <span className="flex items-center gap-1.5">
                                         <Clock size={14} /> 
                                         {place.isOpen ? <span className="text-green-600">Abierto</span> : <span className="text-red-400">Cerrado</span>}
                                       </span>
                                       <span className="flex items-center gap-1.5">
                                         <MapPin size={14} className="text-blue-500" /> 
                                         {place.address.split(',')[0]}
                                       </span>
                                   </div>
                                   <button className="bg-orange-50 text-orange-600 p-2.5 rounded-2xl group-hover:bg-orange-100 transition-colors">
                                     <ChevronRight size={18} />
                                   </button>
                               </div>
                           </div>
                        </div>
                    ))}
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};

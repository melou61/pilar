
import React from 'react';
import { UtensilsCrossed, Star, MapPin, Clock, Phone, ChevronRight } from './Icons';
import { DINING_CENSUS } from '../data';

interface DiningViewProps {
  t: any;
}

export const DiningView: React.FC<DiningViewProps> = ({ t }) => {
  return (
    <div className="bg-white min-h-screen pb-20 animate-in fade-in duration-300">
      <div className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1544124499-58ec526df938?auto=format&fit=crop&w=1000&q=80" alt="Gastronomía Pilar" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6">
           <div>
              <div className="bg-orange-500/90 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">Gastronomía</div>
              <h1 className="text-3xl font-bold text-white mb-1">{t.sections.dining.title}</h1>
              <p className="text-white/80 text-sm">{t.sections.dining.desc}</p>
           </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8">
         {DINING_CENSUS.map((category) => (
             <div key={category.id}>
                 <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><UtensilsCrossed size={20} className="text-orange-500" />{category.title}</h2>
                 <div className="grid gap-4">
                    {category.items.map((place) => (
                        <div key={place.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow">
                           <div className="w-full sm:w-1/3 h-40 sm:h-auto relative">
                              <img src={place.images[0]} alt={place.name} className="w-full h-full object-cover" />
                              <div className="absolute top-2 right-2 bg-white/95 px-2 py-0.5 rounded-lg flex items-center gap-1 text-xs font-bold text-gray-800 shadow-sm"><Star size={10} className="text-yellow-500 fill-yellow-500" />{place.rating}</div>
                           </div>
                           <div className="p-4 flex-1 flex flex-col justify-between">
                               <div>
                                   <div className="flex justify-between items-start"><h3 className="font-bold text-gray-900 text-lg leading-tight">{place.name}</h3></div>
                                   <p className="text-sm text-gray-500 mt-1">{place.category}</p>
                                   <p className="text-sm text-gray-600 mt-2 line-clamp-2">{place.description}</p>
                               </div>
                               <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                                   <div className="flex items-center gap-3">
                                       <span className="flex items-center gap-1"><Clock size={12} /> {place.isOpen ? <span className="text-green-600 font-bold">Abierto</span> : 'Cerrado'}</span>
                                       <span className="flex items-center gap-1"><MapPin size={12} /> Ver mapa</span>
                                   </div>
                                   <button className="bg-orange-50 text-orange-600 p-2 rounded-full"><ChevronRight size={16} /></button>
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


import React, { useState } from 'react';
import { UtensilsCrossed, Star, MapPin, Clock, Phone, ChevronRight, Heart } from './Icons';
import { CensusItem, Ad, ViewState } from '../types';
import { BusinessDetailView } from './BusinessDetailView';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface DiningViewProps {
  t: any;
  businesses: CensusItem[];
  ads: Ad[]; 
  headerProps: any;
  onOpenAdminLogin: () => void;
}

export const DiningView: React.FC<DiningViewProps> = ({ t, businesses, ads, headerProps, onOpenAdminLogin }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<CensusItem | null>(null);
  const [activeZone, setActiveZone] = useState<string>('all');

  const diningList = businesses.filter(b => 
    ['restaurante', 'bar', 'italiano', 'pescados', 'playa', 'chiringuito', 'arroces', 'internacional', 'mediterráneo', 'tapas', 'postres', 'vinos', 'carnes'].includes(b.category.toLowerCase())
  );

  const filteredDining = activeZone === 'all' 
    ? diningList 
    : diningList.filter(d => d.zone === activeZone);

  const zones = [
    { id: 'all', label: 'Todo el Pilar' },
    { id: 'CENTRO', label: 'Centro Urbano' },
    { id: 'LA_TORRE', label: 'La Torre' },
    { id: 'MIL_PALMERAS', label: 'Mil Palmeras' },
    { id: 'CAMPOVERDE', label: 'Campoverde' },
    { id: 'EL_MOJON', label: 'El Mojón' }
  ];

  return (
    <div className="fixed inset-0 z-[400] bg-[#f8fafc] flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      {selectedBusiness && (
        <BusinessDetailView 
          business={selectedBusiness} 
          onClose={() => setSelectedBusiness(null)} 
          t={t.business} 
        />
      )}

      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (w-full) */}
      <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.DINING} currentFilter={activeZone} />
      </div>

      {/* 3. EDITORIAL HEADER */}
      <div className="bg-white px-8 pt-16 pb-12 rounded-b-[60px] shadow-sm mb-10 shrink-0 mt-4">
        <div className="flex items-center gap-3 text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <UtensilsCrossed size={20} />
            Sabor de Pilar
        </div>
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">{t.sections.dining.title}</h1>
        <p className="text-gray-500 text-lg font-medium leading-tight max-w-sm mb-8">{t.sections.dining.desc}</p>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {zones.map(z => (
              <button 
                key={z.id}
                onClick={() => setActiveZone(z.id)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeZone === z.id ? 'bg-orange-500 text-white shadow-xl shadow-orange-100' : 'bg-white text-gray-400 border border-gray-100'
                }`}
              >
                {z.label}
              </button>
            ))}
        </div>
      </div>

      {/* 4. LISTADO */}
      <div className="px-6 space-y-10 flex-1">
          {filteredDining.length > 0 ? filteredDining.map((place) => (
              <div 
                key={place.id} 
                onClick={() => setSelectedBusiness(place)}
                className="bg-white rounded-[50px] border border-gray-100 shadow-2xl shadow-gray-200/40 overflow-hidden flex flex-col md:flex-row hover:shadow-3xl transition-all duration-500 group cursor-pointer relative"
              >
                  <div className="w-full md:w-80 h-64 md:h-auto relative overflow-hidden shrink-0">
                    <img src={place.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7ed9d8607c?auto=format&fit=crop&w=800&q=80'} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-1.5 text-sm font-black text-gray-900 shadow-2xl">
                      <Star size={16} className="text-yellow-500 fill-current" />
                      {place.rating}
                    </div>
                  </div>
                  <div className="p-10 flex-1 flex flex-col justify-between">
                      <div>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-black text-gray-900 text-3xl leading-none tracking-tighter">{place.name}</h3>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">{place.zone.replace('_', ' ')}</span>
                          </div>
                          <p className="text-base text-gray-500 mt-5 line-clamp-2 font-medium leading-relaxed">{place.description}</p>
                      </div>
                      <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-black uppercase tracking-widest">
                          <div className="flex flex-wrap gap-6">
                              <span className="flex items-center gap-2"><Clock size={16} className="text-blue-500" /> <span className="text-green-600">Abierto</span></span>
                              <span className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /> {place.address}</span>
                          </div>
                      </div>
                  </div>
              </div>
          )) : (
            <div className="text-center py-20 text-gray-400 font-black uppercase tracking-widest">No hay restaurantes en esta zona.</div>
          )}
      </div>

      {/* 5. ANUNCIO INFERIOR (w-full) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.DINING} currentFilter={activeZone} />
      </div>

      {/* 6. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} onOpenAdminLogin={onOpenAdminLogin} />
      </div>
    </div>
  );
};

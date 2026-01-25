
import React, { useState, useEffect } from 'react';
import { Star, ChevronRight, Heart, Clock, Phone, MapPin, Filter } from './Icons';
import { CensusItem, Ad, ViewState } from '../types';
import { BusinessDetailView } from './BusinessDetailView';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface ShoppingViewProps {
  t: any;
  businesses: CensusItem[];
  highlightedBusinessId?: string | null;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  ads: Ad[]; 
  headerProps: any;
  onOpenAdminLogin: () => void;
}

export const ShoppingView: React.FC<ShoppingViewProps> = ({ t, businesses, highlightedBusinessId, favorites, toggleFavorite, ads, headerProps, onOpenAdminLogin }) => {
  const [selectedBusiness, setSelectedBusiness] = useState<CensusItem | null>(null);
  const [activeZone, setActiveZone] = useState<string>('all');
  
  const shoppingList = businesses.filter(b => 
    !['restaurante', 'bar', 'italiano', 'pescados', 'playa', 'chiringuito', 'arroces', 'internacional', 'mediterráneo', 'tapas', 'postres', 'vinos', 'carnes'].includes(b.category.toLowerCase())
  );

  const filteredShops = activeZone === 'all' 
    ? shoppingList 
    : shoppingList.filter(s => s.zone === activeZone);

  const zones = [
    { id: 'all', label: 'Todo el municipio' },
    { id: 'CENTRO', label: 'Pilar Centro' },
    { id: 'LA_TORRE', label: 'La Torre' },
    { id: 'MIL_PALMERAS', label: 'Mil Palmeras' },
    { id: 'CAMPOVERDE', label: 'Campoverde' },
    { id: 'EL_MOJON', label: 'El Mojón' }
  ];

  useEffect(() => {
    if (highlightedBusinessId) {
      const found = businesses.find(b => b.id === highlightedBusinessId);
      if (found) setSelectedBusiness(found);
    }
  }, [highlightedBusinessId, businesses]);

  return (
    <div className="fixed inset-0 z-[400] bg-[#f8fafc] flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
        {selectedBusiness && (
          <BusinessDetailView 
            business={selectedBusiness} 
            onClose={() => setSelectedBusiness(null)} 
            t={t.business} 
            isFavorite={favorites.includes(selectedBusiness.id)}
            onToggleFavorite={() => toggleFavorite(selectedBusiness.id)}
          />
        )}

        {/* 1. HEADER GLOBAL */}
        <div className="relative z-[220] shrink-0">
           <Header {...headerProps} />
        </div>

        {/* 2. ANUNCIO SUPERIOR (w-full) */}
        <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white">
          <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.SHOPPING} currentFilter={activeZone} />
        </div>
        
        {/* 3. CONTENT */}
        <div className="px-6 py-12 flex-1">
          <div className="mb-12">
            <h2 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">{t.sections.shopping.title}</h2>
            <p className="text-gray-500 font-medium text-lg mb-8">{t.sections.shopping.desc}</p>
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4 select-none">
              {zones.map(z => (
                <button 
                  key={z.id}
                  onClick={() => setActiveZone(z.id)}
                  className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${
                    activeZone === z.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-white text-gray-400 border border-gray-100'
                  }`}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10">
              {filteredShops.length > 0 ? filteredShops.map(biz => {
                  const isFav = favorites.includes(biz.id);
                  return (
                      <div 
                          key={biz.id} 
                          onClick={() => setSelectedBusiness(biz)}
                          className="bg-white rounded-[50px] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/40 flex flex-col md:flex-row md:h-64 group cursor-pointer hover:-translate-y-2 transition-all duration-500 relative"
                      >
                          <div className="w-full md:w-64 h-56 md:h-full overflow-hidden shrink-0 relative">
                              <img src={biz.images?.[0] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={biz.name} />
                          </div>
                          <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                              <div>
                                  <div className="flex justify-between items-start mb-2">
                                      <h4 className="font-black text-3xl text-gray-900 tracking-tighter leading-none">{biz.name}</h4>
                                      <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shrink-0">{biz.category}</span>
                                  </div>
                                  <p className="text-sm text-gray-500 mt-5 line-clamp-2 font-medium leading-relaxed">{biz.description}</p>
                              </div>
                              <div className="flex items-center justify-end pt-4">
                                  <div className="text-blue-600 font-black text-xs uppercase tracking-widest bg-blue-50 px-6 py-3 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-all flex items-center gap-2 shadow-sm">
                                      {t.common.details} <ChevronRight size={14} />
                                  </div>
                              </div>
                          </div>
                      </div>
                  );
              }) : (
                <div className="text-center py-20 text-gray-400 font-black uppercase tracking-widest">No hay comercios en esta zona.</div>
              )}
          </div>
        </div>

        {/* 4. ANUNCIO INFERIOR (w-full) */}
        <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white">
          <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.SHOPPING} currentFilter={activeZone} />
        </div>

        {/* 5. FOOTER GLOBAL */}
        <div className="relative z-10">
          <Footer t={t} onOpenAdminLogin={onOpenAdminLogin} />
        </div>
    </div>
  );
};

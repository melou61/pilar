
import React from 'react';
import { 
  History, Building2, MapPin, Sparkles, Landmark, Search, Clock
} from './Icons';
import { MOCK_SIGHTSEEING } from '../data';
import { ViewState, Ad } from '../types';
import { AdSpot } from './AdSpot';

interface SightseeingViewProps {
  t: any;
  onNavigate?: (view: ViewState, id?: string) => void;
  ads: Ad[];
}

export const SightseeingView: React.FC<SightseeingViewProps> = ({ t, onNavigate, ads }) => {
  const content = t.sightseeing_page;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-44 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Editorial Header */}
      <div className="bg-[#b45309] px-8 pt-20 pb-24 rounded-b-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-amber-200 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Landmark size={20} />
            PH Heritage
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter mb-4 leading-none">
            {content.title}
          </h1>
          <p className="text-white/80 text-xl font-medium leading-tight max-w-sm">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="px-6 -mt-10 space-y-10">
        {/* HUECO 3: page-top */}
        <div className="px-4">
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} />
        </div>

        {MOCK_SIGHTSEEING.map((site) => {
          const siteLangData = content.list[site.id as keyof typeof content.list] || { name: site.name, desc: '' };
          return (
            <div 
              key={site.id} 
              className="bg-white rounded-[56px] shadow-2xl shadow-amber-900/5 overflow-hidden border border-gray-100 group hover:shadow-3xl transition-all duration-500"
            >
               <div className="relative h-80 overflow-hidden">
                  <img 
                    src={site.image} 
                    alt={siteLangData.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  
                  {/* Category Overlay */}
                  <div className="absolute top-8 left-8">
                      <div className="bg-amber-600 text-white px-5 py-2.5 rounded-[20px] flex items-center gap-2.5 shadow-2xl border border-white/20">
                         <Sparkles size={16} className="fill-white" />
                         <span className="text-[11px] font-black uppercase tracking-widest">{site.category}</span>
                      </div>
                  </div>

                  <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md text-amber-700 px-5 py-3 rounded-[24px] flex flex-col items-center shadow-2xl min-w-[80px]">
                     <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Época</span>
                     <span className="text-xl font-black">{site.century}</span>
                  </div>
               </div>
               
               <div className="p-10">
                 <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-6 leading-none">{siteLangData.name}</h2>
                 
                 <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium italic">
                    "{siteLangData.desc}"
                 </p>
                 
                 <div className="flex items-center gap-6 mb-10">
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-xl">
                       <MapPin size={16} className="text-amber-500" />
                       Pilar de la Horadada
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-black text-amber-700 uppercase tracking-widest bg-amber-50 px-4 py-2 rounded-xl">
                       <History size={16} />
                       BIC Protegido
                    </div>
                 </div>

                 <button 
                    onClick={() => onNavigate?.(ViewState.MAP, site.id)}
                    className="w-full py-5 bg-[#0f172a] text-white rounded-[32px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-amber-800 transition-all active:scale-95"
                 >
                    <Search size={22} className="text-amber-400" />
                    Localizar Monumento
                 </button>
               </div>
            </div>
          );
        })}

        {/* Historical Context Section */}
        <div className="px-4 mt-10">
           <div className="bg-white border border-amber-100 rounded-[50px] p-12 shadow-2xl shadow-amber-900/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50" />
              <div className="relative z-10">
                 <h3 className="text-3xl font-black mb-8 tracking-tighter text-gray-900">Un legado vivo</h3>
                 <div className="space-y-8">
                    <div className="flex gap-6">
                       <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center shrink-0 shadow-sm">
                          <Clock size={28} />
                       </div>
                       <div>
                          <h4 className="font-black text-gray-900 text-lg tracking-tight">Thiar Romana</h4>
                          <p className="text-gray-500 text-base font-medium leading-tight">Estación de la Vía Augusta, calzada que unía Roma con Cádiz pasando por nuestro municipio.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* HUECO 4: page-bottom */}
        <div className="px-4">
           <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} />
        </div>
      </div>
    </div>
  );
};

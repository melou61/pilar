
import React from 'react';
import { 
  Waves, Flag, MapPin, Star, ShieldCheck
} from './Icons';
import { MOCK_BEACHES } from '../data';
import { ViewState, Ad } from '../types';
import { AdSpot } from './AdSpot';

interface BeachesViewProps {
  t: any;
  onNavigate?: (view: ViewState, id?: string) => void;
  ads: Ad[];
}

export const BeachesView: React.FC<BeachesViewProps> = ({ t, onNavigate, ads }) => {
  const content = t.beaches_page;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-44 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Header Dinámico */}
      <div className="bg-[#0f172a] px-8 pt-20 pb-24 rounded-b-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Waves size={20} />
            {content.coastal}
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter mb-4 leading-none">
            {content.title}
          </h1>
          <p className="text-white/60 text-xl font-medium leading-tight max-w-sm">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="px-6 -mt-10 space-y-10">
        {/* HUECO 3: page-top */}
        <div className="px-4">
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {MOCK_BEACHES.map((beach) => {
            const beachLangData = content.list[beach.id as keyof typeof content.list] || { name: beach.name, desc: '' };
            return (
              <div 
                key={beach.id} 
                className="bg-white rounded-[56px] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-100 group hover:shadow-3xl transition-all duration-500"
              >
                 <div className="relative h-80 overflow-hidden">
                    <img 
                      src={beach.image} 
                      alt={beachLangData.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    
                    <div className="absolute top-8 left-8 flex flex-col gap-2">
                       {beach.blueFlag && (
                          <div className="bg-blue-600 text-white px-5 py-2.5 rounded-[20px] flex items-center gap-2.5 shadow-2xl border border-white/20">
                             <Flag size={16} className="fill-white" />
                             <span className="text-[11px] font-black uppercase tracking-widest">{content.blue_flag}</span>
                          </div>
                       )}
                       <div className="bg-white/95 backdrop-blur-md text-green-600 px-5 py-2.5 rounded-[20px] flex items-center gap-2.5 shadow-2xl border border-gray-100">
                          <ShieldCheck size={16} className="fill-green-50" />
                          <span className="text-[11px] font-black uppercase tracking-widest">{content.open}</span>
                       </div>
                    </div>

                    <div className="absolute bottom-8 right-8 bg-[#0f172a] text-white px-5 py-3 rounded-[24px] flex items-center gap-2 shadow-2xl">
                       <Star size={20} className="text-yellow-400 fill-current" />
                       <span className="text-xl font-black">{beach.rating}</span>
                    </div>
                 </div>
                 
                 <div className="p-10">
                   <div className="flex justify-between items-start mb-4">
                      <h2 className="text-4xl font-black text-gray-900 tracking-tighter">{beachLangData.name}</h2>
                   </div>
                   
                   <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
                      {beachLangData.desc}
                   </p>
                   
                   <button 
                      onClick={() => onNavigate?.(ViewState.MAP, beach.id)}
                      className="w-full py-5 bg-[#0f172a] text-white rounded-[32px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] transition-all active:scale-95"
                   >
                      <MapPin size={22} className="text-blue-500" />
                      {t.menu.map}
                   </button>
                 </div>
              </div>
            );
          })}
        </div>
        
        {/* Coastal Notice Localizado */}
        <div className="px-4">
           <div className="bg-blue-600 rounded-[50px] p-12 text-center text-white shadow-2xl shadow-blue-500/20">
              <h3 className="text-3xl font-black mb-4 tracking-tighter">{content.fact_title}</h3>
              <p className="text-blue-100 text-lg font-medium leading-tight max-w-2xl mx-auto">
                 {content.fact_desc}
              </p>
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

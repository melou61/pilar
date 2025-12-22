
import React from 'react';
import { 
  History, Building2, MapPin, Sparkles, Landmark, Search, Clock, ShieldCheck, Users, Ruler, ChevronRight, Info, Star
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

  const getCrowdColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'baja': return 'text-emerald-500 bg-emerald-50';
      case 'media': return 'text-orange-500 bg-orange-50';
      case 'alta': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-44 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Editorial Heritage Header */}
      <div className="bg-[#451a03] px-8 pt-20 pb-28 rounded-b-[70px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 text-amber-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Landmark size={20} />
            Patrimonio Cultural PH
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
            {content.title}
          </h1>
          <p className="text-white/60 text-xl font-medium leading-relaxed max-w-md mx-auto md:mx-0">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="px-6 -mt-12 space-y-12">
        {/* Ad Spot Top */}
        <div className="max-w-4xl mx-auto w-full">
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {MOCK_SIGHTSEEING.map((site) => {
            const siteLangData = content.list[site.id as keyof typeof content.list] || { name: site.name, desc: '' };
            return (
              <div 
                key={site.id} 
                className="bg-white rounded-[60px] shadow-2xl shadow-amber-900/5 overflow-hidden border border-gray-100 group hover:shadow-3xl hover:-translate-y-1 transition-all duration-700"
              >
                 {/* Visual Header with Heritage Indicators */}
                 <div className="relative h-96 overflow-hidden">
                    <img 
                      src={site.image} 
                      alt={siteLangData.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                    />
                    
                    {/* Century Badge */}
                    <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
                       <div className="bg-amber-600 text-white px-5 py-2.5 rounded-[22px] flex items-center gap-2.5 shadow-2xl border border-white/20">
                          <History size={16} className="fill-white" />
                          <span className="text-[11px] font-black uppercase tracking-widest">{site.century}</span>
                       </div>
                       <div className="bg-white/95 backdrop-blur-md text-amber-700 px-5 py-2.5 rounded-[22px] flex items-center gap-2.5 shadow-2xl border border-gray-100">
                          <ShieldCheck size={16} />
                          <span className="text-[11px] font-black uppercase tracking-widest">Protección BIC</span>
                       </div>
                    </div>

                    {/* Stats Floating Panel */}
                    <div className="absolute bottom-8 left-8 right-8 z-10">
                       <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-4 flex items-center justify-between shadow-2xl border border-white/40">
                          <div className="flex items-center gap-2 px-4 border-r border-gray-100">
                             <Clock size={18} className="text-amber-600" />
                             <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Visita</span>
                                <span className="text-sm font-black text-gray-900">{site.visitTime}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 px-4 border-r border-gray-100">
                             <Users size={18} className="text-blue-500" />
                             <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Afluencia</span>
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg ${getCrowdColor(site.crowdLevel)}`}>{site.crowdLevel}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 px-4">
                             <ShieldCheck size={18} className="text-emerald-500" />
                             <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Estado</span>
                                <span className="text-[10px] font-black text-emerald-600 uppercase">{site.status}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="absolute top-8 right-8 bg-[#451a03] text-white px-5 py-3 rounded-[24px] flex items-center gap-2 shadow-2xl">
                       <Sparkles size={18} className="text-amber-400 fill-current" />
                       <span className="text-sm font-black uppercase tracking-widest">Imperdible</span>
                    </div>
                 </div>
                 
                 <div className="p-10">
                   <div className="flex justify-between items-start mb-4">
                      <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{siteLangData.name}</h2>
                   </div>
                   
                   <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium italic">
                      "{siteLangData.desc}"
                   </p>

                   {/* Heritage Specs Bento Row */}
                   <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="bg-orange-50/50 p-5 rounded-[30px] flex items-center gap-4 border border-orange-100/30">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm"><Building2 size={18}/></div>
                         <div>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Estilo</span>
                            <span className="text-sm font-black text-gray-900 truncate w-32 block">{site.style}</span>
                         </div>
                      </div>
                      <div className="bg-orange-50/50 p-5 rounded-[30px] flex items-center gap-4 border border-orange-100/30">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-600 shadow-sm"><Ruler size={18}/></div>
                         <div>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Material</span>
                            <span className="text-sm font-black text-gray-900">{site.material}</span>
                         </div>
                      </div>
                   </div>

                   {/* Amenities Chips */}
                   <div className="mb-10">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Info size={14} /> Servicios y Accesibilidad
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {site.amenities.map((amenity, idx) => (
                          <span key={idx} className="bg-white border border-gray-100 text-gray-600 px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm flex items-center gap-1.5 group-hover:border-amber-200 transition-colors">
                            <div className="w-1 h-1 bg-amber-500 rounded-full" /> {amenity}
                          </span>
                        ))}
                      </div>
                   </div>
                   
                   <button 
                      onClick={() => onNavigate?.(ViewState.MAP, site.id)}
                      className="w-full py-6 bg-[#451a03] text-white rounded-[32px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl hover:bg-amber-800 transition-all active:scale-95 group/btn"
                   >
                      <MapPin size={22} className="text-amber-400 group-hover/btn:text-white transition-colors" />
                      Descubrir Ubicación
                      <ChevronRight size={20} className="ml-auto opacity-30" />
                   </button>
                 </div>
              </div>
            );
          })}
        </div>
        
        {/* Heritage Fact Banner */}
        <div className="max-w-4xl mx-auto w-full">
           <div className="bg-gradient-to-br from-amber-700 to-amber-900 rounded-[60px] p-16 text-center text-white shadow-2xl shadow-amber-900/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative z-10">
                 <h3 className="text-4xl font-black mb-6 tracking-tighter">Legado de Thiar</h3>
                 <p className="text-amber-100 text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                    Pilar de la Horadada es un museo al aire libre. Desde la Vía Augusta hasta nuestras iglesias, cada piedra cuenta una historia de civilizaciones y mar.
                 </p>
                 <div className="flex flex-wrap justify-center gap-8">
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black">2k+</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Años de Historia</span>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden sm:block" />
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black">4</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">BIC Declarados</span>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden sm:block" />
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black">100%</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Experiencia PH</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Ad Spot Bottom */}
        <div className="max-w-4xl mx-auto w-full">
           <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} />
        </div>
      </div>
    </div>
  );
};

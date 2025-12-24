
import React from 'react';
import { 
  Waves, Flag, MapPin, Star, ShieldCheck, Thermometer, Sun, Users, Ruler, Droplets, Info, ChevronRight
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

  const getOccupancyColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'baja': return 'text-emerald-500 bg-emerald-50';
      case 'media': return 'text-orange-500 bg-orange-50';
      case 'alta': return 'text-red-500 bg-red-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-44 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Editorial Tourism Header */}
      <div className="bg-[#0f172a] px-8 pt-20 pb-28 rounded-b-[70px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-blue-400 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Waves size={20} />
            {content.coastal}
          </div>
          <h1 className="text-6xl sm:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]">
            {content.title}
          </h1>
          <p className="text-white/60 text-xl font-medium leading-relaxed max-w-md">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="px-6 -mt-12 space-y-12">
        {/* Ad Spot Top */}
        <div className="max-w-4xl mx-auto w-full">
           {/* Added missing view prop */}
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.BEACHES} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {MOCK_BEACHES.map((beach) => {
            const beachLangData = content.list[beach.id as keyof typeof content.list] || { name: beach.name, desc: '' };
            return (
              <div 
                key={beach.id} 
                className="bg-white rounded-[60px] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-100 group hover:shadow-3xl hover:-translate-y-1 transition-all duration-700"
              >
                 {/* Visual Header with Real-time indicators */}
                 <div className="relative h-96 overflow-hidden">
                    <img 
                      src={beach.image} 
                      alt={beachLangData.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" 
                    />
                    
                    {/* Status Badges */}
                    <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
                       {beach.blueFlag && (
                          <div className="bg-blue-600 text-white px-5 py-2.5 rounded-[22px] flex items-center gap-2.5 shadow-2xl border border-white/20">
                             <Flag size={16} className="fill-white" />
                             <span className="text-[11px] font-black uppercase tracking-widest">{content.blue_flag}</span>
                          </div>
                       )}
                       <div className="bg-white/95 backdrop-blur-md text-emerald-600 px-5 py-2.5 rounded-[22px] flex items-center gap-2.5 shadow-2xl border border-gray-100">
                          <ShieldCheck size={16} />
                          <span className="text-[11px] font-black uppercase tracking-widest">{content.open}</span>
                       </div>
                    </div>

                    {/* Stats Floating Panel */}
                    <div className="absolute bottom-8 left-8 right-8 z-10">
                       <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-4 flex items-center justify-between shadow-2xl border border-white/40">
                          <div className="flex items-center gap-2 px-4 border-r border-gray-100">
                             <Thermometer size={18} className="text-blue-500" />
                             <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Agua</span>
                                <span className="text-sm font-black text-gray-900">{beach.waterTemp}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 px-4 border-r border-gray-100">
                             <Sun size={18} className="text-orange-500" />
                             <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">UV</span>
                                <span className="text-sm font-black text-gray-900">{beach.uvIndex}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 px-4">
                             <Users size={18} className="text-purple-500" />
                             <div className="flex flex-col">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Gente</span>
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg ${getOccupancyColor(beach.occupancy)}`}>{beach.occupancy}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="absolute top-8 right-8 bg-[#0f172a] text-white px-5 py-3 rounded-[24px] flex items-center gap-2 shadow-2xl">
                       <Star size={20} className="text-yellow-400 fill-current" />
                       <span className="text-xl font-black">{beach.rating}</span>
                    </div>
                 </div>
                 
                 <div className="p-10">
                   <div className="flex justify-between items-start mb-4">
                      <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{beachLangData.name}</h2>
                   </div>
                   
                   <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium italic">
                      "{beachLangData.desc}"
                   </p>

                   {/* Tech Specs Bento Row */}
                   <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="bg-slate-50 p-5 rounded-[30px] flex items-center gap-4 border border-slate-100/50">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm"><Ruler size={18}/></div>
                         <div>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Longitud</span>
                            <span className="text-sm font-black text-gray-900">{beach.length}</span>
                         </div>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-[30px] flex items-center gap-4 border border-slate-100/50">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm"><Droplets size={18}/></div>
                         <div>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Arena</span>
                            <span className="text-sm font-black text-gray-900">{beach.sandType}</span>
                         </div>
                      </div>
                   </div>

                   {/* Services Chips */}
                   <div className="mb-10">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Info size={14} /> Servicios Destacados
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {beach.services.map((service, idx) => (
                          <span key={idx} className="bg-white border border-gray-100 text-gray-600 px-4 py-2 rounded-xl text-[10px] font-bold shadow-sm flex items-center gap-1.5 group-hover:border-blue-200 transition-colors">
                            <div className="w-1 h-1 bg-blue-500 rounded-full" /> {service}
                          </span>
                        ))}
                      </div>
                   </div>
                   
                   <button 
                      onClick={() => onNavigate?.(ViewState.MAP, beach.id)}
                      className="w-full py-6 bg-[#0f172a] text-white rounded-[32px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 shadow-2xl hover:bg-blue-600 transition-all active:scale-95 group/btn"
                   >
                      <MapPin size={22} className="text-blue-500 group-hover/btn:text-white transition-colors" />
                      Explorar en el Mapa
                      <ChevronRight size={20} className="ml-auto opacity-30" />
                   </button>
                 </div>
              </div>
            );
          })}
        </div>
        
        {/* Coastal Notice Localizado - Expanded for tourism */}
        <div className="max-w-4xl mx-auto w-full">
           <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[60px] p-16 text-center text-white shadow-2xl shadow-blue-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative z-10">
                 <h3 className="text-4xl font-black mb-6 tracking-tighter">{content.fact_title}</h3>
                 <p className="text-blue-100 text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-10">
                    {content.fact_desc} Todas nuestras playas cuentan con accesibilidad total y servicios de primer nivel para asegurar tus mejores vacaciones mediterráneas.
                 </p>
                 <div className="flex flex-wrap justify-center gap-8">
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black">10</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Playas & Calas</span>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden sm:block" />
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black">+4km</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">De Litoral</span>
                    </div>
                    <div className="w-px h-12 bg-white/10 hidden sm:block" />
                    <div className="flex flex-col items-center">
                       <span className="text-4xl font-black">7</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Banderas Azules</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Ad Spot Bottom */}
        <div className="max-w-4xl mx-auto w-full">
           {/* Added missing view prop */}
           <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.BEACHES} />
        </div>
      </div>
    </div>
  );
};
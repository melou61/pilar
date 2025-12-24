
import React from 'react';
import { 
  Activity, Star, MapPin, ChevronRight, Clock, Trophy, Waves, Bike, Sparkles, Search
} from './Icons';
import { ACTIVITIES_LIST } from '../data';
import { ViewState, Ad } from '../types';
import { AdSpot } from './AdSpot';

interface ActivitiesViewProps {
  t: any;
  onNavigate?: (view: ViewState, id?: string) => void;
  ads: Ad[];
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({ t, onNavigate, ads }) => {
  const content = t.activities_page;

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-44 animate-in fade-in duration-500 overflow-x-hidden">
      {/* Dynamic Activity Header */}
      <div className="bg-[#10b981] px-8 pt-20 pb-24 rounded-b-[60px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-emerald-100 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
            <Activity size={20} />
            PH Active 365
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter mb-4 leading-none">
            {content.title}
          </h1>
          <p className="text-white/80 text-xl font-medium leading-tight max-sm">
            {content.subtitle}
          </p>
        </div>
      </div>

      <div className="px-6 -mt-10 space-y-10">
        {/* HUECO 3: page-top */}
        <div className="px-4">
           {/* Added missing view prop */}
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.ACTIVITIES} />
        </div>

        {ACTIVITIES_LIST.map((activity) => {
          const activityLangData = content.list[activity.id as keyof typeof content.list] || { name: activity.title, desc: '' };
          return (
            <div 
              key={activity.id} 
              className="bg-white rounded-[56px] shadow-2xl shadow-emerald-900/5 overflow-hidden border border-gray-100 group hover:shadow-3xl transition-all duration-500"
            >
               <div className="relative h-80 overflow-hidden">
                  <img 
                    src={activity.image} 
                    alt={activityLangData.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  
                  {/* Category Overlay */}
                  <div className="absolute top-8 left-8 flex flex-col gap-2">
                      <div className="bg-emerald-600 text-white px-5 py-2.5 rounded-[20px] flex items-center gap-2.5 shadow-2xl border border-white/20">
                         <Trophy size={16} className="fill-white" />
                         <span className="text-[11px] font-black uppercase tracking-widest">{activity.category}</span>
                      </div>
                      <div className="bg-white/95 backdrop-blur-md text-emerald-600 px-5 py-2.5 rounded-[20px] flex items-center gap-2.5 shadow-2xl border border-gray-100">
                         <Clock size={16} />
                         <span className="text-[11px] font-black uppercase tracking-widest">{activity.duration}</span>
                      </div>
                  </div>

                  <div className="absolute bottom-8 right-8 bg-[#0f172a] text-white px-5 py-3 rounded-[24px] flex items-center gap-2 shadow-2xl">
                     <Star size={20} className="text-yellow-400 fill-current" />
                     <span className="text-xl font-black">{activity.rating}</span>
                  </div>
               </div>
               
               <div className="p-10">
                 <div className="flex justify-between items-start mb-6">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{activityLangData.name}</h2>
                    <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                       {activity.difficulty}
                    </div>
                 </div>
                 
                 <p className="text-gray-500 text-lg leading-relaxed mb-10 font-medium">
                    {activityLangData.desc}
                 </p>
                 
                 <div className="flex flex-wrap gap-4 mb-10">
                    <div className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-xl">
                       <MapPin size={16} className="text-emerald-500" />
                       {activity.location}
                    </div>
                 </div>

                 <button 
                    onClick={() => onNavigate?.(ViewState.MAP, activity.id)}
                    className="w-full py-5 bg-[#0f172a] text-white rounded-[32px] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-emerald-700 transition-all active:scale-95"
                 >
                    <Search size={22} className="text-emerald-500" />
                    Cómo participar
                 </button>
               </div>
            </div>
          );
        })}
        
        {/* Active Community Section */}
        <div className="px-4 mt-10">
           <div className="bg-white border border-emerald-100 rounded-[50px] p-12 shadow-2xl shadow-emerald-900/5 overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50 group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10">
                 <h3 className="text-3xl font-black mb-6 tracking-tighter text-gray-900">Pilar es Deporte</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex gap-4">
                       <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                          <Waves size={24} />
                       </div>
                       <div>
                          <h4 className="font-black text-gray-900 text-lg tracking-tight">Náutica</h4>
                          <p className="text-gray-500 text-sm font-medium">Cursos municipales de vela y deportes de viento durante todo el año.</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* HUECO 4: page-bottom */}
        <div className="px-4">
           {/* Added missing view prop */}
           <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.ACTIVITIES} />
        </div>
      </div>
    </div>
  );
};
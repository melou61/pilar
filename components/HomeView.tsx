
import React from 'react';
import { ViewState, Event, Ad } from '../types';
import { 
  Sparkles, MapIcon, ChevronRight, 
  ArrowRight, Bot, MapPin, Play, Camera, Image as ImageIcon, Newspaper, MessageSquare
} from './Icons';
import { AdSpot } from './AdSpot';

interface HomeViewProps {
  t: any;
  events: Event[];
  onNavigate: (view: ViewState, id?: string) => void;
  heroImages: string[];
  currentHeroIndex: number;
  ads: Ad[]; 
}

const SHORTS_BASE = [
  { id: 's1', videoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', views: '2.4k' },
  { id: 's2', videoUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', views: '1.8k' },
  { id: 's3', videoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', views: '3.1k' },
  { id: 's4', videoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80', views: '12k' },
];

export const HomeView: React.FC<HomeViewProps> = ({ t, events, onNavigate, heroImages, currentHeroIndex, ads }) => {
  const featuredEvents = events.filter(e => e.isFestival).slice(0, 3);
  const hp = t.home_page;

  return (
    <div className="flex flex-col animate-in fade-in duration-700 pb-32 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] w-full overflow-hidden flex-shrink-0">
        {heroImages.map((img, index) => (
          <div key={index} className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out transform ${index === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
            <img src={img} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#f8fafc]" />
          </div>
        ))}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-white pb-36">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex items-center gap-3 text-sm font-black mb-8 uppercase tracking-[0.4em] text-blue-400">
              <MapPin size={24} /> PILAR DE LA HORADADA
            </div>
            <h2 className="text-7xl sm:text-[120px] font-black mb-10 leading-[0.85] tracking-tighter">
              {hp.pilar_vivo?.split(' ')[0]}<br/><span className="text-blue-400">{hp.pilar_vivo?.split(' ')[1] || 'VIVO'}</span>
            </h2>
            <div className="flex flex-wrap gap-4">
               <button onClick={() => onNavigate(ViewState.MAP)} className="bg-white text-gray-900 px-10 py-5 rounded-[30px] font-black text-sm flex items-center gap-3 shadow-2xl hover:scale-105 transition-all">
                 <MapIcon size={20} className="text-blue-600" /> {t.menu.map?.toUpperCase()}
               </button>
               <button onClick={() => onNavigate(ViewState.AI_CHAT)} className="bg-blue-600/20 backdrop-blur-xl text-white border border-white/30 px-10 py-5 rounded-[30px] font-black text-sm flex items-center gap-3 shadow-2xl hover:bg-blue-600 transition-all">
                 <Sparkles size={20} /> {t.menu.ai?.toUpperCase()}
               </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-6 -mt-24 relative z-20 space-y-24">
        {/* HUECO 3: page-top */}
        <div className="px-4 pt-4">
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} />
        </div>

        {/* 2. IA CONCIERGE CARD */}
        <section className="bg-gradient-to-br from-indigo-900 via-blue-900 to-[#1e1b4b] rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-2xl rounded-[40px] flex items-center justify-center border border-white/20 shrink-0">
               <Bot size={64} className="text-blue-400 animate-pulse" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-4xl font-black tracking-tighter mb-4">PH Concierge</h3>
              <p className="text-blue-100/60 text-lg font-medium leading-tight mb-8">
                {hp.ai_desc}
              </p>
              <button onClick={() => onNavigate(ViewState.AI_CHAT)} className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all mx-auto md:mx-0">
                {t.common.details} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* 3. SHORTS SLIDER */}
        <section className="space-y-8">
          <div className="px-4">
            <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-2">{hp.shorts_label}</h3>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{hp.shorts_big}</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-2">
            {SHORTS_BASE.map((short, idx) => (
              <div key={short.id} className="w-56 h-96 shrink-0 rounded-[35px] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/10 transition-all hover:scale-[1.02]">
                <img src={short.videoUrl} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40">
                    <Play size={24} className="fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-sm leading-tight mb-1 line-clamp-2">{hp.shorts_titles[idx] || 'Pilar'}</p>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{short.views} {hp.views}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. MOMENTOS PH */}
        <section className="space-y-8">
          <div className="flex justify-between items-end px-4">
            <div>
              <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-2">{hp.gallery_label}</h3>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{hp.gallery_big}</h2>
            </div>
            <button className="bg-emerald-50 text-emerald-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
              <Camera size={16} /> {t.common.upload}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`aspect-square rounded-[30px] overflow-hidden shadow-xl border border-gray-100 relative group cursor-zoom-in ${i % 2 === 0 ? 'mt-8' : ''}`}>
                <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?auto=format&fit=crop&w=600&q=80`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ImageIcon size={32} className="text-white" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FEATURED FESTIVALS */}
        <section className="space-y-8">
          <div className="flex justify-between items-end px-4">
            <div>
              <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">{t.sections.events.title}</h3>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{t.sections.events.title}</h2>
            </div>
            <button onClick={() => onNavigate(ViewState.EVENTS)} className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
              {t.common.details} <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8 px-2">
            {featuredEvents.map(event => {
              const evData = t.events_data?.[event.id] || event;
              return (
                <div 
                  key={event.id}
                  onClick={() => onNavigate(ViewState.EVENTS, event.id)}
                  className="w-[320px] shrink-0 bg-white rounded-[45px] overflow-hidden shadow-xl border border-gray-100 group cursor-pointer hover:shadow-2xl transition-all"
                >
                  <div className="h-56 relative">
                    <img src={event.imageUrl} alt={evData.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-blue-600 shadow-lg">
                      {evData.category}
                    </div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-2xl font-black text-gray-900 tracking-tighter mb-2 leading-none">{evData.title}</h4>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">{evData.date}</p>
                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                      {t.common.details} <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6. NEWS & COMMUNITY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <section className="bg-white rounded-[50px] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-8">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <Newspaper size={24} />
               </div>
               <h3 className="text-2xl font-black tracking-tighter">{hp.news_main}</h3>
             </div>
             <div className="space-y-6">
                <div className="flex gap-5 group cursor-pointer" onClick={() => onNavigate(ViewState.NEWS)}>
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" />
                  </div>
                  <h5 className="font-black text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                    {hp.news_featured}
                  </h5>
                </div>
             </div>
             <button onClick={() => onNavigate(ViewState.NEWS)} className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
               {t.menu.news}
             </button>
           </section>

           <section className="bg-white rounded-[50px] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50 space-y-8">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                 <MessageSquare size={24} />
               </div>
               <h3 className="text-2xl font-black tracking-tighter">{hp.community_title}</h3>
             </div>
             <p className="text-gray-500 font-medium text-lg leading-tight">
               {hp.community_desc}
             </p>
             <button onClick={() => onNavigate(ViewState.CITIZEN_SERVICES)} className="w-full py-5 bg-[#0f172a] text-white rounded-[30px] font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3">
               {t.menu.services} <MessageSquare size={18} />
             </button>
           </section>
        </div>

        {/* HUECO 4: page-bottom */}
        <section className="px-4">
           <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} />
        </section>
      </div>
    </div>
  );
};

import React from 'react';
import { ViewState, Event, Ad } from '../types';
import { 
  Sparkles, MapIcon, ChevronRight, 
  ArrowRight, Bot, MapPin, Play, Camera, Image as ImageIcon, Newspaper, MessageSquare, Wand2, Radar
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
  { id: 's1', videoUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', views: '2.4k' },
  { id: 's2', videoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', views: '1.8k' },
  { id: 's3', videoUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', views: '3.1k' },
  { id: 's4', videoUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', views: '12k' },
];

const MOMENTS_GALLERY = [
  'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80', // Dunas Higuericas
  'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', // Río Seco
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', // Gastronomía
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', // Torre
];

export const HomeView: React.FC<HomeViewProps> = ({ t, events, onNavigate, heroImages, currentHeroIndex, ads }) => {
  const featuredEvents = events.filter(e => e.isFestival).slice(0, 3);
  const hp = t.home_page;

  return (
    <div className="flex flex-col animate-in fade-in duration-700 pb-32 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative h-[72vh] w-full overflow-hidden flex-shrink-0">
        {heroImages.map((img, index) => (
          <div key={index} className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out transform ${index === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
            <img src={img} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#f8fafc]" />
          </div>
        ))}
        
        {/* Radar Status Indicator */}
        <div className="absolute top-20 left-8 z-30 flex flex-col items-start gap-1">
           <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-xl">
             <div className="relative">
               <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
               <Radar size={18} className="text-blue-400 relative z-10" />
             </div>
             <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Smart PH Activo</span>
           </div>
           <div className="mt-5 ml-2 text-[22px] font-black text-blue-600 uppercase tracking-[0.02em] flex items-center gap-3 drop-shadow-[0_0_12px_rgba(37,99,235,0.7)]">
              <div className="w-2 h-2 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,1)]"></div>
              <span style={{ textShadow: '2px 2px 5px rgba(0,0,0,0.4)' }}>PILAR DE LA HORADADA</span>
           </div>
        </div>

        {/* Título Principal */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 text-white pb-[140px]">
          <div className="max-w-[95rem] mx-auto w-full">
            <h2 
              className="text-[100px] sm:text-[180px] font-black mb-0 leading-[0.82] tracking-[0.05em] flex flex-col items-start"
              style={{ textShadow: '10px 10px 25px rgba(0,0,0,0.8)' }}
            >
              <span className="drop-shadow-[0_0_50px_rgba(37,99,235,0.3)]">PILAR</span>
              <span className="text-blue-500 drop-shadow-[0_0_50px_rgba(37,99,235,0.7)]">VIVO</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Margen negativo para subir el contenido */}
      <div className="max-w-6xl mx-auto w-full px-6 -mt-40 relative z-20 space-y-20">
        
        {/* Ad Spot Top - Sin padding lateral adicional para que se vea más ancho */}
        <div className="-mx-2">
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} />
        </div>

        {/* IA CONCIERGE CARD */}
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

        {/* SHORTS SLIDER */}
        <section className="space-y-8">
          <div className="px-2">
            <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-2">{hp.shorts_label}</h3>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{hp.shorts_big}</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-2">
            {SHORTS_BASE.map((short, idx) => (
              <div key={short.id} className="w-56 h-96 shrink-0 rounded-[35px] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/10 transition-all hover:scale-[1.02]">
                <img src={short.videoUrl} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-sm leading-tight mb-1 line-clamp-2">{hp.shorts_titles[idx] || 'Pilar'}</p>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{short.views} {hp.views}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MOMENTOS PH */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end px-2 gap-6">
            <div>
              <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-2">{hp.gallery_label}</h3>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">{hp.gallery_big}</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={() => onNavigate(ViewState.POSTCARD)} className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-200 animate-bounce">
                <Wand2 size={16} /> Crear Postal IA
              </button>
              <button className="bg-emerald-50 text-emerald-600 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-emerald-100">
                <Camera size={16} /> {t.common.upload}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
            {MOMENTS_GALLERY.map((img, i) => (
              <div key={i} className={`aspect-[3/4] md:aspect-square rounded-[30px] overflow-hidden shadow-xl border border-gray-100 relative group cursor-zoom-in ${i % 2 === 0 ? 'mt-8' : ''}`}>
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <ImageIcon className="text-white" size={32} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED FESTIVALS */}
        <section className="space-y-8">
          <div className="flex justify-between items-end px-2">
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

        {/* Footer Ad - Sin padding lateral adicional */}
        <div className="-mx-2 pb-10">
           <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} />
        </div>
      </div>
    </div>
  );
};

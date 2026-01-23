
import React from 'react';
import { ViewState, Event, Ad } from '../types';
import { 
  Sparkles, MapIcon, ChevronRight, 
  ArrowRight, Bot, MapPin, Play, Camera, Image as ImageIcon, Newspaper, MessageSquare, Wand2, Radar
} from './Icons';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface HomeViewProps {
  t: any;
  events: Event[];
  onNavigate: (view: ViewState, id?: string) => void;
  heroImages: string[];
  currentHeroIndex: number;
  ads: Ad[]; 
  headerProps: any;
}

const SHORTS_BASE = [
  { id: 's1', videoUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', views: '2.4k' },
  { id: 's2', videoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', views: '1.8k' },
  { id: 's3', videoUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', views: '3.1k' },
  { id: 's4', videoUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', views: '12k' },
];

const MOMENTS_GALLERY = [
  'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80', 
  'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80', 
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', 
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', 
];

export const HomeView: React.FC<HomeViewProps> = ({ t, events, onNavigate, heroImages, currentHeroIndex, ads, headerProps }) => {
  const hp = t.home_page;

  return (
    <div className="fixed inset-0 z-[400] bg-[#f8fafc] flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      <div className="relative z-[5000] shrink-0">
         <Header {...headerProps} />
      </div>

      <section className="relative h-[85vh] w-full overflow-hidden shrink-0">
        {heroImages.map((img, index) => (
          <div key={index} className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out transform ${index === currentHeroIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
            <img src={img} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#f8fafc]" />
          </div>
        ))}
        
        {/* BADGE SUPERIOR (FLOTANTE) */}
        <div className="absolute top-32 left-8 z-30 animate-in slide-in-from-left duration-700">
           <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-xl">
             <div className="relative">
               <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75"></div>
               <Radar size={18} className="text-blue-400 relative z-10" />
             </div>
             <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{hp.smart_active}</span>
           </div>
        </div>

        {/* CONTENEDOR DE TÍTULO UNIFICADO Y ESTABILIZADO */}
        {/* Se usa pb-[140px] para asegurar que el texto se vea bien sobre la transición a blanco inferior */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16 lg:p-24 pb-20 sm:pb-24 md:pb-32 text-white pointer-events-none">
          <div className="max-w-[120rem] mx-auto w-full flex flex-col items-start pointer-events-auto">
            
            {/* SUBTÍTULO: PILAR DE LA HORADADA */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 animate-in slide-in-from-left duration-700 delay-100">
               <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,1)]"></div>
               <span className="text-[12px] sm:text-[16px] md:text-[20px] lg:text-[24px] font-black text-blue-600 uppercase tracking-[0.2em]" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  PILAR DE LA HORADADA
               </span>
            </div>

            {/* TÍTULO PRINCIPAL: PILAR VIVO */}
            {/* El leading-[0.82] mantiene las líneas pegadas pero sin solaparse en todos los tamaños */}
            <h2 className="text-[64px] sm:text-[100px] md:text-[140px] lg:text-[180px] xl:text-[220px] font-black leading-[0.82] tracking-tighter flex flex-col items-start animate-in slide-in-from-bottom duration-1000" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}>
              <span>PILAR</span>
              <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(37,99,235,0.5)]">VIVO</span>
            </h2>
          </div>
        </div>
      </section>

      <div className="px-6 -mt-16 relative z-30 mb-12">
        <div className="max-w-6xl mx-auto">
           <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.HOME} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 relative z-20 space-y-20 pb-20">
        <section className="space-y-8">
          <div className="px-2">
            <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-2">{hp.shorts_label}</h3>
            <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Shorts</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 px-2">
            {SHORTS_BASE.map((short, idx) => (
              <div key={short.id} className="w-56 h-96 shrink-0 rounded-[35px] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/10 transition-all hover:scale-[1.02]">
                <img src={short.videoUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-black text-sm leading-tight mb-1">{hp.shorts_titles[idx] || 'Pilar'}</p>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{short.views} {hp.views}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end px-2 gap-6">
            <div>
              <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em] mb-2">{hp.gallery_label}</h3>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Momentos</h2>
            </div>
            <div className="flex gap-3">
              <button onClick={() => onNavigate(ViewState.POSTCARD)} className="bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-200">
                <Wand2 size={16} /> {hp.create_postcard}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
            {MOMENTS_GALLERY.map((img, i) => (
              <div key={i} className={`aspect-[3/4] md:aspect-square rounded-[30px] overflow-hidden shadow-xl border border-gray-100 relative group cursor-zoom-in ${i % 2 === 0 ? 'mt-8' : ''}`}>
                <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={`Momento ${i}`} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="relative z-10">
        <Footer t={t} />
      </div>
    </div>
  );
};

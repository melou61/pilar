
import React from 'react';
import { 
  Heart, Phone, MapPin, Clock, ShieldCheck, AlertCircle, 
  ChevronRight, Navigation, Thermometer, Droplets, Plus 
} from './Icons';
import { ViewState, Ad } from '../types';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface HealthViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
  ads: Ad[];
  headerProps: any;
}

const PHARMACIES = [
  { id: 'f1', name: 'Farmacia Lda. Maria', address: 'C/ Mayor 4', phone: '965351000', lat: 37.866, lng: -0.792, onDutyDays: [1, 3, 5] },
  { id: 'f2', name: 'Farmacia Torre', address: 'Av. Mediterráneo 1', phone: '965352000', lat: 37.860, lng: -0.782, onDutyDays: [0, 2, 4, 6] },
  { id: 'f3', name: 'Farmacia Pinar', address: 'Av. Mediterráneo', phone: '965352222', lat: 37.894, lng: -0.841, onDutyDays: [2, 5] }
];

export const HealthView: React.FC<HealthViewProps> = ({ t, onNavigate, ads, headerProps }) => {
  const today = new Date().getDay();
  const onDutyPharmacy = PHARMACIES.find(f => f.onDutyDays.includes(today)) || PHARMACIES[0];
  const h = t.health;

  return (
    <div className="fixed inset-0 z-[400] bg-slate-50 flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (Full Width) */}
      <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.HEALTH} />
      </div>

      {/* 3. EDITORIAL HEADER */}
      <div className="bg-white px-8 pt-12 pb-16 border-b border-gray-100 shadow-sm relative overflow-hidden shrink-0 mt-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 text-red-500 font-black text-[10px] uppercase tracking-[0.4em] mb-3">
             <Heart size={18} className="animate-pulse" />
             {h.subtitle}
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">{h.title}</h1>
          <div className="flex gap-4">
             <a href="tel:112" className="flex-1 bg-red-600 text-white p-5 rounded-[26px] shadow-xl flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{h.emergency}</span>
                <span className="text-3xl font-black">112</span>
             </a>
             <a href="tel:+34965352355" className="flex-1 bg-[#0f172a] text-white p-5 rounded-[26px] shadow-xl flex flex-col items-center justify-center gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{h.center}</span>
                <span className="text-xl font-black mt-1">965 35 23 55</span>
             </a>
          </div>
        </div>
      </div>

      {/* 4. CONTENT */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10 flex-1">
        <section>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">{h.pharmacy}</span>
             </div>
             <h2 className="text-4xl font-black tracking-tighter mb-4">{onDutyPharmacy.name}</h2>
             <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-emerald-100 font-medium"><MapPin size={18} /> {onDutyPharmacy.address}</div>
                <div className="flex items-center gap-3 text-emerald-100 font-medium"><Phone size={18} /> {onDutyPharmacy.phone}</div>
             </div>
             <button onClick={() => onNavigate(ViewState.MAP, onDutyPharmacy.id)} className="bg-white text-emerald-800 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2">
                <Navigation size={16} /> {t.common.fullMap}
             </button>
          </div>
        </section>
      </div>

      {/* 5. ANUNCIO INFERIOR (Full Width) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.HEALTH} />
      </div>

      {/* 6. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} />
      </div>
    </div>
  );
};

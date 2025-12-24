
import React from 'react';
import { 
  Heart, Phone, MapPin, Clock, ShieldCheck, AlertCircle, 
  ChevronRight, Navigation, Thermometer, Droplets, Plus 
} from './Icons';
import { ViewState, Ad } from '../types';
import { AdSpot } from './AdSpot';

interface HealthViewProps {
  t: any;
  onNavigate: (view: ViewState, id?: string) => void;
  ads: Ad[];
}

const PHARMACIES = [
  { id: 'f1', name: 'Farmacia Lda. Maria', address: 'C/ Mayor 4', phone: '965351000', lat: 37.866, lng: -0.792, onDutyDays: [1, 3, 5] },
  { id: 'f2', name: 'Farmacia Torre', address: 'Av. Mediterráneo 1', phone: '965352000', lat: 37.860, lng: -0.782, onDutyDays: [0, 2, 4, 6] },
  { id: 'f3', name: 'Farmacia Pinar', address: 'Av. Mediterráneo', phone: '965352222', lat: 37.894, lng: -0.841, onDutyDays: [2, 5] }
];

export const HealthView: React.FC<HealthViewProps> = ({ t, onNavigate, ads }) => {
  const today = new Date().getDay();
  const onDutyPharmacy = PHARMACIES.find(f => f.onDutyDays.includes(today)) || PHARMACIES[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-44 animate-in fade-in duration-500">
      {/* Editorial Header */}
      <div className="bg-white px-8 pt-12 pb-16 border-b border-gray-100 shadow-sm relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 text-red-500 font-black text-[10px] uppercase tracking-[0.4em] mb-3">
             <Heart size={18} className="animate-pulse" />
             Salud y Bienestar
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-4">Pilar Saludable</h1>
          <p className="text-gray-500 font-medium text-lg max-w-md mb-8">Información esencial sobre farmacias, centros médicos y servicios de emergencia.</p>
          
          <div className="flex gap-4">
             <a href="tel:112" className="flex-1 bg-red-600 text-white p-5 rounded-[26px] shadow-xl shadow-red-200 flex flex-col items-center justify-center gap-1 group active:scale-95 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Emergencias</span>
                <span className="text-3xl font-black">112</span>
             </a>
             <a href="tel:+34965352355" className="flex-1 bg-[#0f172a] text-white p-5 rounded-[26px] shadow-xl shadow-gray-200 flex flex-col items-center justify-center gap-1 group active:scale-95 transition-all">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Centro Salud</span>
                <span className="text-xl font-black leading-none mt-1">965 35 23 55</span>
             </a>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-50 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
        {/* Farmacia de Guardia Card */}
        <section>
          <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-6 ml-1">Farmacia de Guardia Hoy</h3>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex-1">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                         <Plus size={24} strokeWidth={3} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500/30 px-3 py-1 rounded-lg">ABIERTA 24H</span>
                   </div>
                   <h2 className="text-4xl font-black tracking-tighter mb-4">{onDutyPharmacy.name}</h2>
                   <div className="space-y-3 mb-10">
                      <div className="flex items-center gap-3 text-emerald-100 font-medium">
                         <MapPin size={18} /> {onDutyPharmacy.address}
                      </div>
                      <div className="flex items-center gap-3 text-emerald-100 font-medium">
                         <Phone size={18} /> {onDutyPharmacy.phone}
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <button 
                        onClick={() => onNavigate(ViewState.MAP, onDutyPharmacy.id)}
                        className="bg-white text-emerald-800 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-2"
                      >
                         <Navigation size={16} /> Mapa
                      </button>
                      <a href={`tel:${onDutyPharmacy.phone}`} className="bg-emerald-500/30 border border-emerald-400/30 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                         <Phone size={16} /> Llamar
                      </a>
                   </div>
                </div>
                <div className="hidden md:block opacity-20 transform translate-x-10">
                   <ShieldCheck size={200} />
                </div>
             </div>
          </div>
        </section>

        {/* Anuncio Superior */}
        {/* Added missing view prop */}
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.HEALTH} />

        {/* Otros Centros */}
        <section className="space-y-6">
           <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-1">Centros de Salud y Especialidades</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Consultorio La Torre', cat: 'Atención Primaria', address: 'C/ Poniente', icon: <Droplets /> },
                { name: 'Clínica Campoverde', cat: 'Servicios Médicos', address: 'Ctra. Pinar', icon: <Thermometer /> },
              ].map((c, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] shadow-xl shadow-slate-200/50 border border-white group hover:border-blue-100 transition-all">
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                      {c.icon}
                   </div>
                   <h4 className="text-xl font-black text-gray-900 tracking-tight mb-2">{c.name}</h4>
                   <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-6">{c.cat}</p>
                   <button className="flex items-center justify-between w-full text-[10px] font-black uppercase tracking-widest text-gray-400 bg-slate-50 p-4 rounded-2xl">
                      {c.address} <ChevronRight size={14} />
                   </button>
                </div>
              ))}
           </div>
        </section>

        {/* Prevención Section */}
        <div className="bg-blue-600 rounded-[50px] p-10 text-white shadow-2xl relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <AlertCircle size={24} />
                 </div>
                 <h3 className="text-2xl font-black tracking-tighter">Campaña de Salud PH</h3>
              </div>
              <p className="text-blue-100 font-medium mb-10 leading-relaxed">Infórmate sobre las campañas de vacunación y prevención locales en el Centro de Salud.</p>
              <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Ver Campañas</button>
           </div>
        </div>

        {/* Anuncio Inferior */}
        <div className="pt-4 -mx-2">
          {/* Added missing view prop */}
          <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.HEALTH} />
        </div>
      </div>
    </div>
  );
};
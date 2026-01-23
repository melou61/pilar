
import React from 'react';
import { User, Heart, Calendar, Bell, ChevronRight, LogOut, Settings2, Award, Zap } from './Icons';
import { ViewState } from '../types';

interface ProfileViewProps {
  userName: string;
  onLogout: () => void;
  onNavigate: (view: ViewState) => void;
  favorites: string[];
  myEvents: string[];
  t: any;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ userName, onLogout, onNavigate, favorites, myEvents, t }) => {
  // Safe access to profile translations
  const profileT = t?.profile || {
    my_events: 'Mis Eventos',
    favorites: 'Favoritos',
    alerts: 'Alertas',
    logout: 'Cerrar Sesión'
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-44 animate-in fade-in duration-500 px-6 pt-10">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Profile Card */}
        <div className="bg-[#0f172a] rounded-[50px] p-10 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-32 h-32 bg-blue-600 rounded-[40px] flex items-center justify-center text-white text-5xl font-black shadow-2xl rotate-3">
                 {userName.charAt(0)}
              </div>
              <div className="text-center md:text-left flex-1">
                 <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                    <h2 className="text-4xl font-black tracking-tighter">Hola, {userName}</h2>
                    <span className="bg-blue-500/20 text-blue-400 border border-blue-400/20 px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2">
                       <Award size={14} /> Vecino VIP
                    </span>
                 </div>
                 <p className="text-slate-400 font-medium mb-8">Gracias por ser parte activa de Pilar de la Horadada.</p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <button onClick={() => onNavigate(ViewState.HOME)} className="bg-white text-[#0f172a] px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Explorar</button>
                    <button onClick={onLogout} className="bg-red-600/20 text-red-500 border border-red-500/20 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Cerrar Sesión</button>
                 </div>
              </div>
           </div>
        </div>

        {/* User Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
           {/* Agenda Box */}
           <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200 border border-white flex flex-col justify-between">
              <div>
                 <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Calendar size={24} />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">{profileT.my_events}</h3>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Tienes {myEvents.length} eventos guardados</p>
              </div>
              <button onClick={() => onNavigate(ViewState.EVENTS)} className="mt-8 flex items-center justify-between text-purple-600 font-black text-[10px] uppercase tracking-widest bg-purple-50 p-4 rounded-2xl">
                 Ver mi agenda <ChevronRight size={16} />
              </button>
           </div>

           {/* Favorites Box */}
           <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200 border border-white flex flex-col justify-between">
              <div>
                 <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                    <Heart size={24} />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">{profileT.favorites}</h3>
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{favorites.length} sitios favoritos</p>
              </div>
              <button onClick={() => onNavigate(ViewState.SHOPPING)} className="mt-8 flex items-center justify-between text-red-500 font-black text-[10px] uppercase tracking-widest bg-red-50 p-4 rounded-2xl">
                 Ir a favoritos <ChevronRight size={16} />
              </button>
           </div>

           {/* Alerts Box */}
           <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200 border border-white flex flex-col justify-between lg:col-span-1 md:col-span-2">
              <div>
                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <Bell size={24} />
                 </div>
                 <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">{profileT.alerts || 'Alertas'}</h3>
                 <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <span className="text-[10px] font-black uppercase text-slate-500">Noticias Locales</span>
                       <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center justify-end px-1 cursor-pointer"><div className="w-3.5 h-3.5 bg-white rounded-full"></div></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                       <span className="text-[10px] font-black uppercase text-slate-500">Eventos Culturales</span>
                       <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center justify-end px-1 cursor-pointer"><div className="w-3.5 h-3.5 bg-white rounded-full"></div></div>
                    </div>
                 </div>
              </div>
              <button className="mt-8 flex items-center justify-between text-blue-600 font-black text-[10px] uppercase tracking-widest bg-blue-50 p-4 rounded-2xl">
                 Ajustes pro <Settings2 size={16} />
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};

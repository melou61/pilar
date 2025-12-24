
import React from 'react';
import { Home, MapIcon, Sparkles, Calendar, User } from './Icons';
import { ViewState } from '../types';

interface MobileNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  t: any;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentView, onNavigate, t }) => {
  const items = [
    { id: ViewState.HOME, icon: Home, label: t.menu.home },
    { id: ViewState.MAP, icon: MapIcon, label: t.menu.map },
    { id: ViewState.AI_CHAT, icon: Sparkles, label: 'IA', isSpecial: true },
    { id: ViewState.EVENTS, icon: Calendar, label: t.menu.events },
    { id: ViewState.PROFILE, icon: User, label: t.menu.profile },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[4000] bg-white/90 backdrop-blur-xl border-t border-gray-200 pb-safe md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.05)] animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-around items-end px-2 pt-2 pb-3">
        {items.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          if (item.isSpecial) {
             return (
               <button
                 key={item.id}
                 onClick={() => onNavigate(item.id)}
                 className="relative -top-6 group"
               >
                 <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/40 flex items-center justify-center text-white border-4 border-white transition-transform active:scale-95 group-hover:scale-105 rotate-3 hover:rotate-6">
                    <Icon size={24} className={isActive ? 'animate-pulse' : ''} />
                 </div>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded-full">
                   {item.label}
                 </span>
               </button>
             );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 p-2 transition-all active:scale-90 w-16 rounded-xl ${
                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'drop-shadow-sm' : ''} />
              <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

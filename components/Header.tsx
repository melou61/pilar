import React, { useState } from 'react';
import { Menu, Search, Home, MapIcon, Sparkles, Calendar, User, ShieldCheck, X } from './Icons';
import { Language, ViewState } from '../types';

// Removed unused onLoginClick from HeaderProps to fix type mismatch in App.tsx usage
interface HeaderProps {
  onMenuClick: () => void;
  onLogoClick: () => void;
  onSearchClick: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  languages: Language[];
  currentView: ViewState;
  onNavigate: (view: ViewState, id?: string) => void;
  t: any;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onLogoClick,
  onSearchClick,
  currentLang,
  onLanguageChange,
  languages,
  currentView,
  onNavigate,
  t
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { id: ViewState.HOME, icon: Home, label: t.menu.home },
    { id: ViewState.MAP, icon: MapIcon, label: t.menu.map },
    { id: ViewState.AI_CHAT, icon: Sparkles, label: t.menu.ai },
    { id: ViewState.EVENTS, icon: Calendar, label: t.menu.events },
    { id: ViewState.PROFILE, icon: User, label: t.menu.profile },
    { id: ViewState.ADMIN, icon: ShieldCheck, label: t.menu.admin },
  ];

  return (
    <header className="fixed top-0 z-[200] bg-white h-24 w-full flex items-center border-b border-gray-50 shadow-sm px-6">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0 group" 
          onClick={onLogoClick}
        >
          <div className="w-12 h-12 bg-[#2563eb] rounded-[16px] flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-200 group-hover:scale-105 transition-all duration-300">
            PH
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-black text-gray-900 tracking-tighter leading-none">PILAR</span>
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">DE LA HORADADA</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex items-center bg-[#f1f5f9]/60 border border-[#f1f5f9] rounded-[32px] p-1 gap-1 shadow-inner overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative px-3 sm:px-6 h-14 flex flex-col items-center justify-center rounded-[26px] transition-all duration-300 min-w-[60px] sm:min-w-[100px]
                  ${isActive ? 'bg-white shadow-md text-[#2563eb]' : 'text-[#94a3b8] hover:text-[#475569]'}
                `}
              >
                <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[8px] font-black uppercase tracking-widest mt-1 whitespace-nowrap">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-in zoom-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onSearchClick}
            className="w-12 h-12 flex items-center justify-center text-[#64748b] hover:text-[#2563eb] bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all"
          >
            <Search size={22} strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={onMenuClick} 
            className="w-12 h-12 bg-[#2563eb] text-white rounded-[16px] flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95 hover:bg-blue-700 transition-colors"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};
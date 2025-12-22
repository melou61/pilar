
import React, { useState } from 'react';
import { Menu, Search, Home, MapIcon, Sparkles, Calendar, User, ShieldCheck, X } from './Icons';
import { Language, ViewState } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  onLoginClick: () => void;
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
  ];

  return (
    <header className="fixed top-0 z-[200] bg-white h-24 w-full max-w-[450px] flex items-center border-b border-gray-50 shadow-sm px-4">
      <div className="w-full flex items-center justify-between gap-2">
        
        {/* LOGO */}
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0 group" 
          onClick={onLogoClick}
        >
          <div className="w-10 h-10 bg-[#2563eb] rounded-[14px] flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue-200 group-hover:scale-105 transition-all duration-300">
            PH
          </div>
        </div>

        {/* NAVIGATION - Más compacto para móvil */}
        <nav className="flex items-center bg-[#f1f5f9]/60 border border-[#f1f5f9] rounded-[32px] p-1 gap-0.5 shadow-inner overflow-x-auto no-scrollbar flex-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative px-2 h-14 flex flex-col items-center justify-center rounded-[26px] transition-all duration-300 flex-1 min-w-[50px]
                  ${isActive ? 'bg-white shadow-md text-[#2563eb]' : 'text-[#94a3b8] hover:text-[#475569]'}
                `}
              >
                <IconComponent size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[7px] font-black uppercase tracking-widest mt-1 whitespace-nowrap">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#2563eb] animate-in zoom-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          <button 
            onClick={onSearchClick}
            className="w-10 h-10 flex items-center justify-center text-[#64748b] hover:text-[#2563eb]"
          >
            <Search size={20} strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={onMenuClick} 
            className="w-10 h-10 bg-[#2563eb] text-white rounded-[14px] flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95"
          >
            <Menu size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};

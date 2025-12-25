
import React, { useState } from 'react';
import { Menu, Search, Home, MapIcon, Sparkles, Calendar, User, ShieldCheck, X, Globe, ChevronRight } from './Icons';
import { Language, ViewState } from '../types';

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
    <header className="fixed top-0 z-[5000] bg-white/95 backdrop-blur-md h-24 w-full flex items-center border-b border-gray-100 shadow-sm px-4 sm:px-6">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LOGO */}
        <div 
          className="flex items-center gap-2 cursor-pointer shrink-0 group" 
          onClick={onLogoClick}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2563eb] rounded-[14px] sm:rounded-[16px] flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-all duration-300">
            PH
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs sm:text-sm font-black text-gray-900 tracking-tighter leading-none">PILAR</span>
            <span className="text-[8px] sm:text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none">DE LA HORADADA</span>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 relative flex items-center overflow-hidden h-16">
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <nav className="flex-1 flex items-center bg-[#f1f5f9]/60 border border-[#f1f5f9] rounded-[28px] p-1 gap-1 shadow-inner overflow-x-auto no-scrollbar scroll-smooth overscroll-behavior-x-contain">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    relative px-3 sm:px-6 h-12 sm:h-14 flex flex-col items-center justify-center rounded-[22px] sm:rounded-[26px] transition-all duration-300 min-w-[75px] sm:min-w-[100px] shrink-0
                    ${isActive ? 'bg-white shadow-md text-[#2563eb]' : 'text-[#94a3b8] hover:text-[#475569]'}
                  `}
                >
                  <IconComponent size={isActive ? 18 : 16} className="sm:size-5" strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-widest mt-1 whitespace-nowrap ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#2563eb] animate-in zoom-in" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-blue-100"
            >
              <span className="text-base sm:text-lg leading-none">{currentLang.flag}</span>
              <span className="text-[7px] sm:text-[8px] font-black uppercase text-blue-600 mt-0.5">{currentLang.code}</span>
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-[210]" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-[24px] shadow-2xl border border-gray-100 p-2 z-[220] animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t.header.selectLanguage}</span>
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                        currentLang.code === lang.code 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'hover:bg-gray-50 text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-xs font-bold">{lang.label}</span>
                      </div>
                      {currentLang.code === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button 
            onClick={onSearchClick}
            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[#64748b] hover:text-[#2563eb] bg-gray-50 rounded-xl sm:rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-blue-100"
          >
            <Search size={20} className="sm:size-[22px]" strokeWidth={2.5} />
          </button>
          
          <button 
            onClick={onMenuClick} 
            className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2563eb] text-white rounded-xl sm:rounded-[16px] flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95 hover:bg-blue-700 transition-colors"
          >
            <Menu size={20} className="sm:size-[22px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};

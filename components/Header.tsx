
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
    { id: ViewState.ADMIN, icon: ShieldCheck, label: t.menu.admin },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-white h-24 w-full flex items-center border-b border-gray-50 shadow-sm px-4 sm:px-6">
      <div className="max-w-screen-2xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4">
        
        {/* LOGO - Pilar de la Horadada */}
        <div 
          className="flex items-center gap-3 sm:gap-4 cursor-pointer shrink-0 group" 
          onClick={onLogoClick}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#2563eb] rounded-[14px] sm:rounded-[18px] flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-xl shadow-blue-200 group-hover:scale-105 transition-all duration-300">
            PH
          </div>
          <div className="flex flex-col justify-center hidden md:flex">
            <h1 className="text-[#1e293b] font-black text-[10px] sm:text-[11px] leading-tight tracking-tight uppercase">
              Pilar de la<br />
              <span className="text-[#2563eb]">Horadada</span>
            </h1>
          </div>
        </div>

        {/* NAVEGACIÓN CENTRAL */}
        <nav className="flex items-center bg-[#f1f5f9]/60 border border-[#f1f5f9] rounded-[32px] p-1 gap-0.5 shadow-inner overflow-x-auto no-scrollbar flex-1 max-w-[600px]">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative px-3 sm:px-5 h-14 flex flex-col items-center justify-center rounded-[26px] transition-all duration-300 flex-1 min-w-[70px]
                  ${isActive ? 'bg-white shadow-md text-[#2563eb]' : 'text-[#94a3b8] hover:text-[#475569]'}
                `}
              >
                <IconComponent size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest mt-1 whitespace-nowrap">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-in zoom-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          <div className="flex flex-col items-center gap-1">
            <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] leading-none mb-1">IDIOMA</span>
            <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm h-12">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-full transition-all"
              >
                <span className="text-xl grayscale-0">{currentLang.flag}</span>
                <span className="text-[10px] font-black text-[#1e293b] uppercase">
                  {currentLang.code}
                </span>
              </button>
              
              <div className="w-[1px] h-6 bg-gray-200 mx-1 hidden sm:block" />
              
              <button 
                onClick={onSearchClick}
                className="p-2.5 text-[#64748b] hover:text-[#2563eb] transition-colors"
              >
                <Search size={18} strokeWidth={2.5} />
              </button>

              {/* Selector de Idioma Dropdown */}
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-[210] bg-black/5" onClick={() => setIsLangOpen(false)} />
                  <div className="absolute top-16 right-0 w-72 bg-white rounded-[32px] shadow-2xl border border-gray-100 py-6 z-[220] animate-in zoom-in-95 duration-200 overflow-hidden">
                    <div className="px-6 pb-4 flex flex-col border-b border-gray-50 mb-4 text-left">
                       <div className="flex items-center justify-between">
                         <span className="text-[12px] font-black text-blue-600 uppercase tracking-[0.3em] block">IDIOMA</span>
                         <button onClick={() => setIsLangOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                           <X size={16} className="text-gray-400" />
                         </button>
                       </div>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Language Selection</span>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto no-scrollbar px-3">
                      <div className="grid grid-cols-1 gap-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => {
                              onLanguageChange(lang);
                              setIsLangOpen(false);
                            }}
                            className={`flex items-center gap-4 px-4 py-3.5 w-full rounded-2xl transition-all ${
                              currentLang.code === lang.code 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'hover:bg-gray-50 text-gray-700'
                            }`}
                          >
                            <span className="text-xl">{lang.flag}</span>
                            <span className="text-[10px] font-black uppercase tracking-tight flex-1 text-left">
                              {lang.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            onClick={onMenuClick} 
            className="w-12 h-12 sm:w-14 sm:h-14 bg-[#2563eb] text-white rounded-[16px] sm:rounded-[20px] flex items-center justify-center shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Menu size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </header>
  );
};

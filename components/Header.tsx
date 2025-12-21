
import React, { useState } from 'react';
import { Menu, LogIn, Search, Home, MapIcon, Sparkles, Calendar, User } from './Icons';
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
  onNavigate: (view: ViewState) => void;
  t: any;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onLoginClick, 
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
    { id: ViewState.HOME, icon: Home, color: 'text-blue-600', bg: 'bg-blue-50', label: t.menu.home },
    { id: ViewState.MAP, icon: MapIcon, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Mapa' },
    { id: ViewState.AI_CHAT, icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', isSpecial: true, label: 'IA' },
    { id: ViewState.EVENTS, icon: Calendar, color: 'text-red-500', bg: 'bg-red-50', label: 'Eventos' },
    { id: ViewState.PROFILE, icon: User, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Mío' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-2xl sticky top-0 z-[150] border-b border-gray-100 shadow-sm h-20 flex items-center w-full">
      {/* Contenedor Max-Width Centrado: Esto soluciona la dispersión en pantallas grandes */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* IZQUIERDA: Marca con Logo Azul */}
        <div className="flex items-center gap-3 cursor-pointer group shrink-0" onClick={onLogoClick}>
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            PH
          </div>
          <div className="hidden lg:flex flex-col">
            <h1 className="text-gray-900 font-black text-xs leading-none tracking-tighter uppercase">Pilar de la<br />Horadada</h1>
          </div>
        </div>

        {/* CENTRO: El Dock de Navegación (Más junto y equilibrado) */}
        <nav className="flex items-center bg-gray-100/60 rounded-[22px] p-1 gap-0.5 sm:gap-1.5 shadow-inner">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative px-3 sm:px-4 h-11 flex items-center justify-center gap-2 rounded-2xl transition-all duration-300
                  ${isActive ? `${item.bg} ${item.color} shadow-sm scale-105` : 'text-gray-400 hover:text-gray-600 hover:bg-white/50'}
                `}
                title={item.label}
              >
                <Icon 
                  size={isActive ? 20 : 18} 
                  strokeWidth={isActive ? 3 : 2} 
                  className={isActive ? 'fill-current/10' : ''} 
                />
                <span className={`text-[10px] font-black uppercase tracking-widest hidden md:block ${isActive ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className={`absolute -bottom-1 w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* DERECHA: Utilidades Agrupadas */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Selector de Idioma Minimalista */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-100 transition-all text-sm font-bold"
            >
              {currentLang.flag}
            </button>
            
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute top-14 right-0 w-44 bg-white rounded-3xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center gap-4 px-5 py-3 w-full hover:bg-gray-50 text-left text-sm transition-colors ${currentLang.code === lang.code ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700'}`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button onClick={onSearchClick} className="w-10 h-10 hidden sm:flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200">
            <Search size={20} />
          </button>

          <button onClick={onLoginClick} className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-xl transition-all border border-transparent hover:border-gray-200">
            <LogIn size={20} />
          </button>

          <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block" />

          <button onClick={onMenuClick} className="w-10 h-10 flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all shadow-sm">
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};

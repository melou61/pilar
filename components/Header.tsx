
import React, { useState } from 'react';
import { Menu, LogIn, Search, Home, MapIcon, Sparkles, Calendar, User, Globe } from './Icons';
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
    { id: ViewState.HOME, icon: Home, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Inicio' },
    { id: ViewState.MAP, icon: MapIcon, color: 'text-orange-500', bg: 'bg-orange-50', label: 'Mapa' },
    { id: ViewState.AI_CHAT, icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Guía IA' },
    { id: ViewState.EVENTS, icon: Calendar, color: 'text-red-500', bg: 'bg-red-50', label: 'Eventos' },
    { id: ViewState.PROFILE, icon: User, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Mi Pilar' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[200] bg-white border-b border-gray-100 shadow-md h-20 w-full flex items-center">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between gap-4">
        
        {/* LOGO RESTAURADO: Dos líneas (Gusta más al usuario) */}
        <div 
          className="flex items-center gap-3 cursor-pointer shrink-0 group" 
          onClick={onLogoClick}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200 group-hover:rotate-3 transition-transform">
            PH
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-gray-900 font-black text-[10px] sm:text-[11px] leading-tight tracking-tighter uppercase whitespace-nowrap">
              Pilar de la<br />
              <span className="text-blue-600">Horadada</span>
            </h1>
          </div>
        </div>

        {/* NAVEGACIÓN CENTRAL: Pareja y con etiquetas */}
        <nav className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-1 gap-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative px-2 sm:px-4 h-12 flex flex-col items-center justify-center rounded-xl transition-all duration-300 min-w-[55px] sm:min-w-[85px]
                  ${isActive ? `${item.bg} ${item.color} shadow-sm` : 'text-gray-400 hover:text-gray-600 hover:bg-white'}
                `}
              >
                <Icon size={isActive ? 20 : 18} strokeWidth={isActive ? 3 : 2} />
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight mt-0.5">
                  {item.label}
                </span>
                {isActive && (
                  <div className={`absolute -bottom-0.5 w-1 h-1 rounded-full ${item.color.replace('text-', 'bg-')}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* UTILIDADES DERECHA: Bola de idioma, lupa, login, menú */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Bola de Idioma */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-100 transition-all text-sm font-bold shadow-sm"
              title="Cambiar Idioma"
            >
              <Globe size={18} className="text-blue-600" />
              <span className="ml-1 text-[10px] hidden sm:block">{currentLang.code.toUpperCase()}</span>
            </button>
            
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-[210]" onClick={() => setIsLangOpen(false)} />
                <div className="absolute top-12 right-0 w-40 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[220] animate-in fade-in slide-in-from-top-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 w-full hover:bg-gray-50 text-left text-xs transition-colors ${currentLang.code === lang.code ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700'}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Lupa (Búsqueda) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onSearchClick(); }} 
            className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 shadow-sm"
            title="Buscar hoy"
          >
            <Search size={20} />
          </button>

          {/* Login (Acceso) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onLoginClick(); }} 
            className="w-10 h-10 flex items-center justify-center text-gray-500 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all border border-gray-100 shadow-sm"
            title="Mi Cuenta"
          >
            <LogIn size={20} />
          </button>

          {/* Menú (Tres rayas) */}
          <button 
            onClick={(e) => { e.stopPropagation(); onMenuClick(); }} 
            className="w-11 h-11 flex items-center justify-center text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-md shadow-blue-100 ml-1"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

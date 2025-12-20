
import React, { useState } from 'react';
import { Menu, Globe, LogIn, Search } from './Icons';
import { Language } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  onLoginClick: () => void;
  onLogoClick: () => void;
  onSearchClick: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  languages: Language[];
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onLoginClick, 
  onLogoClick,
  onSearchClick,
  currentLang,
  onLanguageChange,
  languages
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center gap-4 cursor-pointer" onClick={onLogoClick}>
        <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-blue-500/20 shadow-xl">
          PH
        </div>
        <div className="flex flex-col">
          <h1 className="text-gray-900 font-bold text-lg leading-none">Pilar de la<br />Horadada</h1>
          <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest mt-0.5">Costa Blanca</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <Globe size={18} className="text-gray-600" />
            <span className="text-sm font-bold">{currentLang.flag}</span>
          </button>
          
          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
              <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang);
                      setIsLangOpen(false);
                    }}
                    className={`flex items-center gap-4 px-5 py-3 hover:bg-gray-50 text-left text-sm transition-colors ${currentLang.code === lang.code ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-700'}`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Search Button */}
        <button 
          onClick={onSearchClick}
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 shadow-sm"
        >
          <Search size={20} />
        </button>

        {/* Login Button */}
        <button 
          onClick={onLoginClick}
          className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-gray-700 shadow-sm"
        >
          <LogIn size={20} />
        </button>

        {/* Menu Button */}
        <button 
          onClick={onMenuClick}
          className="flex items-center justify-center w-10 h-10 text-gray-700 hover:bg-gray-50 rounded-xl transition-all"
        >
          <Menu size={28} />
        </button>
      </div>
    </header>
  );
};

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
    <header className="bg-white shadow-sm sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onLogoClick}>
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-blue-200 shadow-lg">
          PH
        </div>
        <div className="flex flex-col">
          <h1 className="text-gray-900 font-semibold text-base leading-tight">Pilar de la<br />Horadada</h1>
          <span className="text-gray-400 text-xs">Costa Blanca</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-2 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Globe size={16} className="text-gray-600" />
            <span className="text-sm">{currentLang.flag}</span>
          </button>
          
          {isLangOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 flex flex-col">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang);
                      setIsLangOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left text-sm ${currentLang.code === lang.code ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                  >
                    <span className="text-lg">{lang.flag}</span>
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
          className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          <Search size={18} />
        </button>

        {/* Login Button */}
        <button 
          onClick={onLoginClick}
          className="flex items-center justify-center w-9 h-9 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
        >
          <LogIn size={18} />
        </button>

        {/* Menu Button */}
        <button 
          onClick={onMenuClick}
          className="flex items-center justify-center w-9 h-9 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};
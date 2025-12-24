
import React, { useEffect, useState } from 'react';
import { NavItem, ViewState, Ad } from '../types';
import { X, ChevronRight, Sun, Cloud, CloudRain, Wind, LogOut } from './Icons';
import { AdSpot } from './AdSpot';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: NavItem[];
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  ads: Ad[];
  title: string;
  sponsoredText: string;
  isLoggedIn: boolean;
  onLogout: () => void;
  t: any;
}

const WeatherWidget = ({ t }: { t: any }) => {
  const [weather, setWeather] = useState<{temp: number, wind: number, code: number} | null>(null);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=37.8653&longitude=-0.7932&current_weather=true')
      .then(res => res.json())
      .then(data => {
        if (data.current_weather) {
          setWeather({
            temp: data.current_weather.temperature,
            wind: data.current_weather.windspeed,
            code: data.current_weather.weathercode
          });
        }
      })
      .catch(err => console.error("Weather fetch error:", err));
  }, []);

  if (!weather) return null;

  const getWeatherIcon = (code: number) => {
    if (code <= 1) return <Sun size={24} className="text-yellow-500" />;
    if (code <= 3) return <Cloud size={24} className="text-gray-400" />;
    if (code <= 67) return <CloudRain size={24} className="text-blue-400" />; 
    return <Sun size={24} className="text-yellow-500" />;
  };

  return (
    <div className="mx-4 mt-2 mb-2 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-white p-3 rounded-full shadow-sm">
           {getWeatherIcon(weather.code)}
        </div>
        <div>
           <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Pilar de la Horadada</div>
           <div className="text-2xl font-black text-gray-800 leading-none mt-1">
             {weather.temp}°C
           </div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[11px] text-gray-500 bg-white px-3 py-1.5 rounded-lg font-black shadow-sm">
        <Wind size={14} />
        {weather.wind} km/h
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, onClose, menuItems, currentView, onNavigate, ads, title, sponsoredText, isLoggedIn, onLogout, t
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[8000] flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Sidebar Panel - Ancho responsivo */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-8 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex flex-col">
              <h2 className="text-2xl font-black text-gray-900 tracking-tighter">{title}</h2>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-1">Pilar de la Horadada</span>
          </div>
          <button onClick={onClose} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-6 no-scrollbar">
          <WeatherWidget t={t} />

          <div className="px-6">
             {/* Cambiado a ViewState.SIDEBAR para segmentación global del menú */}
             <AdSpot ads={ads} position="menu-top" label={sponsoredText} view={ViewState.SIDEBAR} />
          </div>

          <ul className="space-y-2 px-6">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-5 px-6 py-5 rounded-[22px] transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white font-black shadow-xl shadow-blue-200' 
                        : 'text-gray-600 hover:bg-gray-50 font-bold'
                    }`}
                  >
                    <Icon size={24} className={isActive ? 'text-white' : 'text-gray-400'} />
                    <span className="flex-1 text-left text-base">{item.label}</span>
                    <ChevronRight size={18} className={isActive ? 'text-white/50' : 'text-gray-300'} />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="px-6 py-4 border-t border-gray-50 mt-4">
             {/* Cambiado a ViewState.SIDEBAR para segmentación global del menú */}
             <AdSpot ads={ads} position="menu-bottom" label={sponsoredText} view={ViewState.SIDEBAR} />
          </div>

          {isLoggedIn && (
             <div className="px-6 mt-4 mb-8">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-5 px-6 py-5 rounded-[22px] bg-red-50 text-red-600 font-black hover:bg-red-100 transition-all border border-red-100 shadow-sm"
                >
                  <LogOut size={24} />
                  <span className="flex-1 text-left text-sm uppercase tracking-[0.2em]">{t.profile?.logout || 'Logout'}</span>
                </button>
             </div>
          )}
        </nav>

        <div className="p-10 bg-gray-50 border-t border-gray-100 text-center">
            <div className="text-[11px] text-gray-400 font-black uppercase tracking-[0.5em]">
                PH-APP • v1.0.25
            </div>
        </div>
      </div>
    </div>
  );
};
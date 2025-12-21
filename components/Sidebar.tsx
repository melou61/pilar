
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
}

const WeatherWidget = () => {
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

  const getWeatherLabel = (code: number) => {
    if (code <= 1) return 'Soleado';
    if (code <= 3) return 'Nublado';
    if (code <= 67) return 'Lluvia';
    return 'Soleado';
  };

  return (
    <div className="mx-4 mt-2 mb-2 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full shadow-sm">
           {getWeatherIcon(weather.code)}
        </div>
        <div>
           <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Pilar Horadada</div>
           <div className="text-lg font-black text-gray-800 leading-none mt-0.5">
             {weather.temp}°C
             <span className="text-[10px] font-bold text-gray-400 ml-2 uppercase tracking-widest">{getWeatherLabel(weather.code)}</span>
           </div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-[10px] text-gray-500 bg-white px-2 py-1 rounded-md font-bold">
        <Wind size={12} />
        {weather.wind} km/h
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, onClose, menuItems, currentView, onNavigate, ads, title, sponsoredText, isLoggedIn, onLogout
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[8000] flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-3/4 max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-10">
          <div className="flex flex-col">
              <h2 className="text-xl font-black text-gray-900 tracking-tighter">{title}</h2>
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em]">Pilar de la Horadada</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 space-y-4 no-scrollbar">
          <WeatherWidget />

          <div className="px-4">
             <AdSpot ads={ads} position="menu-top" label={sponsoredText} />
          </div>

          <ul className="space-y-1 px-4">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white font-black shadow-lg shadow-blue-100' 
                        : 'text-gray-600 hover:bg-gray-50 font-bold'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400'} />
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    <ChevronRight size={16} className={isActive ? 'text-white/50' : 'text-gray-300'} />
                  </button>
                </li>
              );
            })}
          </ul>

          {isLoggedIn && (
             <div className="px-4 mt-6">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-red-50 text-red-600 font-black hover:bg-red-100 transition-all border border-red-100"
                >
                  <LogOut size={20} />
                  <span className="flex-1 text-left text-sm uppercase tracking-widest">Cerrar Sesión</span>
                </button>
             </div>
          )}
          
          <div className="px-4">
             <AdSpot ads={ads} position="menu-bottom" label={sponsoredText} />
          </div>
        </nav>

        <div className="p-8 bg-gray-50 border-t border-gray-100">
            <div className="text-[10px] text-center text-gray-400 font-black uppercase tracking-[0.4em]">
                PH-APP • v1.0.25
            </div>
        </div>
      </div>
    </div>
  );
};

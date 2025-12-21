
import React, { useEffect, useState } from 'react';
import { NavItem, ViewState, Ad } from '../types';
import { X, ChevronRight, Sun, Cloud, CloudRain, Wind, Thermometer } from './Icons';
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
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<{temp: number, wind: number, code: number} | null>(null);

  useEffect(() => {
    // Coordinates for Pilar de la Horadada: 37.8653, -0.7932
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

  // WMO Weather interpretation codes (simplified)
  const getWeatherIcon = (code: number) => {
    if (code <= 1) return <Sun size={24} className="text-yellow-500" />;
    if (code <= 3) return <Cloud size={24} className="text-gray-400" />;
    if (code <= 67) return <CloudRain size={24} className="text-blue-400" />; // Rain/Drizzle
    if (code <= 77) return <CloudRain size={24} className="text-blue-200" />; // Snow (Rare)
    if (code <= 99) return <CloudRain size={24} className="text-purple-500" />; // Thunderstorm
    return <Sun size={24} className="text-yellow-500" />;
  };

  const getWeatherLabel = (code: number) => {
    if (code <= 1) return 'Soleado';
    if (code <= 3) return 'Nublado';
    if (code <= 67) return 'Lluvia';
    if (code > 80) return 'Tormenta';
    return 'Soleado';
  };

  return (
    <div className="mx-4 mt-2 mb-2 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-white p-2 rounded-full shadow-sm">
           {getWeatherIcon(weather.code)}
        </div>
        <div>
           <div className="text-xs text-gray-500 font-medium">Pilar de la Horadada</div>
           <div className="text-lg font-bold text-gray-800 leading-none mt-0.5">
             {weather.temp}°C
             <span className="text-xs font-normal text-gray-500 ml-2">{getWeatherLabel(weather.code)}</span>
           </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
         <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded-md">
            <Wind size={12} />
            {weather.wind} km/h
         </div>
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  menuItems, 
  currentView, 
  onNavigate, 
  ads,
  title,
  sponsoredText
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Menu Content */}
      <div className="relative w-3/4 max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {/* Weather Widget */}
          <WeatherWidget />

          {/* Ad Space Top */}
          <div className="px-4 pt-2">
             <AdSpot ads={ads} position="menu-top" label={sponsoredText} />
          </div>

          <ul className="space-y-1 px-4 mt-2">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white font-medium' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                    <span className="flex-1 text-left">{item.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                </li>
              );
            })}
          </ul>
          
           {/* Ad Space Bottom */}
          <div className="px-4 pb-4 mt-2">
             <AdSpot ads={ads} position="menu-bottom" label={sponsoredText} />
          </div>
        </nav>

        <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="text-xs text-center text-gray-400">
                v1.0.24 • Pilar App
            </div>
        </div>
      </div>
    </div>
  );
};

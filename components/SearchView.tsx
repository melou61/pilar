
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Tag, MapPin, Calendar } from './Icons';
import { ViewState, Event, CensusItem } from '../types';

interface SearchViewProps {
  t: any;
  events: Event[];
  businesses: CensusItem[];
  onNavigate: (view: ViewState, id?: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ t, events, businesses, onNavigate, favorites, toggleFavorite }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{events: Event[], business: CensusItem[]}>({ events: [], business: [] });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ events: [], business: [] });
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filteredEvents = events.filter(e => 
      e.title.toLowerCase().includes(lowerQuery) || 
      e.category.toLowerCase().includes(lowerQuery)
    );
    const filteredBusiness = businesses.filter(b => 
      b.name.toLowerCase().includes(lowerQuery) || 
      b.category.toLowerCase().includes(lowerQuery)
    );
    setResults({ events: filteredEvents, business: filteredBusiness });
  }, [query, events, businesses]);

  return (
    <div className="flex-1 flex flex-col bg-white animate-in fade-in duration-300">
      <div className="px-6 py-6 border-b border-gray-100 flex items-center gap-4">
         <div className="flex-1 relative">
           <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
             ref={inputRef}
             type="text" 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder={t.common.searchPlaceholder}
             className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-100 text-gray-900 font-bold"
           />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {!query && (
          <div className="text-center mt-20 text-gray-400 flex flex-col items-center">
             <Search size={64} className="opacity-10 mb-4" />
             <p className="font-black uppercase tracking-widest text-[10px]">Busca eventos, comercios y más...</p>
          </div>
        )}

        {results.business.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.sections.shopping.title}</h3>
            <div className="grid grid-cols-1 gap-3">
              {results.business.map(item => (
                <button 
                  key={item.id}
                  onClick={() => onNavigate(ViewState.SHOPPING, item.id)}
                  className="w-full text-left bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:bg-gray-50 transition-all"
                >
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Tag size={20} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-black text-gray-900 truncate">{item.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.category} • {item.address}</p>
                   </div>
                   <ChevronRight size={20} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {results.events.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t.sections.events.title}</h3>
            <div className="grid grid-cols-1 gap-3">
              {results.events.map(event => (
                <button 
                  key={event.id}
                  onClick={() => onNavigate(ViewState.EVENTS, event.id)}
                  className="w-full text-left bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:bg-gray-50 transition-all"
                >
                   <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                      <img src={event.imageUrl} className="w-full h-full object-cover" alt="" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-black text-gray-900 truncate">{event.title}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{event.date} • {event.location}</p>
                   </div>
                   <ChevronRight size={20} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

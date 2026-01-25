
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Tag, MapPin, Calendar } from './Icons';
import { ViewState, Event, CensusItem, Ad } from '../types';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface SearchViewProps {
  t: any;
  events: Event[];
  businesses: CensusItem[];
  onNavigate: (view: ViewState, id?: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  ads: Ad[];
  headerProps: any;
}

export const SearchView: React.FC<SearchViewProps> = ({ t, events, businesses, onNavigate, favorites, toggleFavorite, ads, headerProps }) => {
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
      b.category.toLowerCase().includes(lowerQuery) ||
      b.address.toLowerCase().includes(lowerQuery)
    );
    setResults({ events: filteredEvents, business: filteredBusiness });
  }, [query, events, businesses]);

  return (
    <div className="fixed inset-0 z-[450] bg-white flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[5000] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (Full Width) */}
      <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white border-b border-gray-50">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.SEARCH} />
      </div>

      {/* 3. ÁREA DE BÚSQUEDA */}
      <div className="max-w-4xl mx-auto w-full px-6 flex-1 py-12">
          {/* Input Principal */}
          <div className="relative mb-12">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-600">
               <Search size={28} strokeWidth={3} />
            </div>
            <input 
               ref={inputRef}
               type="text" 
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder={t.common.searchPlaceholder}
               className="w-full pl-20 pr-8 py-8 bg-gray-50 border-2 border-transparent focus:border-blue-600 rounded-[35px] text-xl font-black text-gray-900 shadow-inner transition-all outline-none placeholder-gray-300"
            />
          </div>

          <div className="space-y-12">
            {!query && (
              <div className="text-center mt-20 text-gray-400 flex flex-col items-center animate-in zoom-in duration-500">
                 <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mb-6">
                    <Search size={48} className="opacity-10" />
                 </div>
                 <p className="font-black uppercase tracking-[0.3em] text-[11px] max-w-[200px] leading-relaxed">
                    {t.search.subtitle1} {t.search.subtitle2}
                 </p>
              </div>
            )}

            {query && results.business.length === 0 && results.events.length === 0 && (
                <div className="text-center py-20 text-gray-400 font-black uppercase tracking-widest">
                    {t.search.noResults} "{query}"
                </div>
            )}

            {results.business.length > 0 && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] ml-2 flex items-center gap-2">
                   <Tag size={14} /> {t.sections.shopping.title}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {results.business.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => onNavigate(ViewState.SHOPPING, item.id)}
                      className="w-full text-left bg-white p-6 rounded-[35px] border border-gray-100 shadow-2xl shadow-gray-200/40 flex items-center gap-6 hover:-translate-y-1 transition-all group"
                    >
                       <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Tag size={28} />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-black text-gray-900 text-lg truncate leading-none">{item.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1.5 flex items-center gap-2">
                             <MapPin size={12} className="text-red-500" /> {item.category} • {item.address}
                          </p>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-blue-600 transition-colors">
                          <ChevronRight size={24} />
                       </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {results.events.length > 0 && (
              <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <h3 className="text-[10px] font-black text-purple-600 uppercase tracking-[0.4em] ml-2 flex items-center gap-2">
                   <Calendar size={14} /> {t.sections.events.title}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {results.events.map(event => (
                    <button 
                      key={event.id}
                      onClick={() => onNavigate(ViewState.EVENTS, event.id)}
                      className="w-full text-left bg-white p-6 rounded-[35px] border border-gray-100 shadow-2xl shadow-gray-200/40 flex items-center gap-6 hover:-translate-y-1 transition-all group"
                    >
                       <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-100">
                          <img src={event.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-black text-gray-900 text-lg truncate leading-none">{event.title}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1.5 flex items-center gap-2">
                             <Calendar size={12} className="text-purple-500" /> {event.date} • {event.location}
                          </p>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-purple-600 transition-colors">
                          <ChevronRight size={24} />
                       </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
      </div>

      {/* 4. ANUNCIO INFERIOR (Full Width) */}
      <div className="w-full py-8 shrink-0 opacity-90 relative z-10 bg-white border-t border-gray-50">
        <div className="max-w-4xl mx-auto">
            <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.SEARCH} />
        </div>
      </div>

      {/* 5. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} />
      </div>
    </div>
  );
};

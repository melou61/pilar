
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Calendar, Tag, MapPin } from './Icons';
import { COMMERCIAL_CENSUS } from '../data';
import { ViewState, Event } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState, id?: string) => void;
  t: any;
  events: Event[]; // New prop
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate, t, events }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{events: any[], business: any[]}>({ events: [], business: [] });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ events: [], business: [] });
      return;
    }

    const lowerQuery = query.toLowerCase();

    // Use passed props 'events' instead of static mock
    const filteredEvents = events.filter(e => 
      e.title.toLowerCase().includes(lowerQuery) || 
      e.description.toLowerCase().includes(lowerQuery) ||
      e.category.toLowerCase().includes(lowerQuery)
    );

    const filteredBusiness = [];
    COMMERCIAL_CENSUS.forEach(cat => {
      cat.items.forEach(item => {
        if (
          item.name.toLowerCase().includes(lowerQuery) || 
          item.category.toLowerCase().includes(lowerQuery) ||
          item.address.toLowerCase().includes(lowerQuery)
        ) {
          filteredBusiness.push(item);
        }
      });
    });

    setResults({ 
      events: filteredEvents, 
      business: filteredBusiness 
    });

  }, [query, events]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[7000] flex flex-col bg-white animate-in fade-in duration-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
           <X size={24} />
        </button>
        <div className="flex-1 relative">
           <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
             ref={inputRef}
             type="text" 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder={t.common.searchPlaceholder}
             className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-100"
           />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {!query && (
          <div className="text-center mt-20 text-gray-400">
             <Search size={48} className="mx-auto mb-4 opacity-20" />
             <p>Escribe para buscar eventos, tiendas y servicios...</p>
          </div>
        )}

        {query && results.events.length === 0 && results.business.length === 0 && (
          <div className="text-center mt-20 text-gray-500">
             {t.common.noResults} "{query}"
          </div>
        )}

        {results.business.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
              {t.sections.shopping.title}
            </h3>
            <div className="space-y-2">
              {results.business.map((item: any) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    onNavigate(ViewState.SHOPPING, item.id);
                    onClose();
                  }}
                  className="w-full text-left bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all"
                >
                   <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Tag size={18} />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                        <MapPin size={10} /> {item.address}
                      </p>
                   </div>
                   <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {results.events.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
              {t.sections.events.title}
            </h3>
            <div className="space-y-2">
              {results.events.map((event: any) => (
                <button 
                  key={event.id}
                  onClick={() => {
                    onNavigate(ViewState.EVENTS, event.id); // Pass event ID
                    onClose();
                  }}
                  className="w-full text-left bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3 hover:bg-gray-50 active:scale-[0.99] transition-all"
                >
                   <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img src={event.imageUrl} className="w-full h-full object-cover" alt="" />
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{event.title}</h4>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                        <Calendar size={10} /> {event.date}
                      </p>
                   </div>
                   <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

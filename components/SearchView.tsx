
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Sparkles, Heart, Mic, MicOff } from './Icons';
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
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    inputRef.current?.focus();

    // Setup Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'es-ES'; // Default to Spanish as it's a Pilar app, but could be dynamic

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
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

    setResults({ 
      events: filteredEvents, 
      business: filteredBusiness 
    });
  }, [query, events, businesses]);

  const toggleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert('Tu navegador no soporta búsqueda por voz.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const s = t.search;

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-[#0081c9] via-[#005ba4] to-[#1e1b4b] animate-in fade-in duration-700 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-400/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/15 blur-[150px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative z-10 overflow-y-auto no-scrollbar">
        <div className="max-w-4xl w-full text-center space-y-12">
          
          <div className="flex justify-center animate-in slide-in-from-top-10 duration-1000">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-10 py-3 rounded-full border border-white/20 shadow-2xl">
              <Sparkles size={18} className="text-blue-200" />
              <span className="text-white text-[11px] font-black uppercase tracking-[0.5em] ml-1">{s.badge}</span>
            </div>
          </div>

          <div className="space-y-4 animate-in slide-in-from-bottom-10 duration-1000 delay-100 flex flex-col items-center">
            <div className="bg-white px-8 py-3 inline-block shadow-2xl transform -rotate-1">
               <h1 className="text-[54px] sm:text-[100px] font-black text-[#1e3a8a] tracking-tighter leading-none">
                 {s.title1}
               </h1>
            </div>
            <div className="bg-white px-12 py-3 inline-block shadow-2xl transform rotate-1 -mt-4">
               <h1 className="text-[54px] sm:text-[100px] font-black text-[#1e3a8a] tracking-tighter leading-none italic">
                 {s.title2}
               </h1>
            </div>
          </div>

          <div className="space-y-2 flex flex-col items-center animate-in fade-in duration-1000 delay-300">
            <div className="bg-white/90 backdrop-blur-md px-6 py-2 inline-block">
               <p className="text-[#1e3a8a] text-sm sm:text-2xl font-black tracking-tight leading-none">
                 {s.subtitle1}
               </p>
            </div>
            <div className="bg-white/90 backdrop-blur-md px-6 py-2 inline-block -mt-1">
               <p className="text-[#1e3a8a] text-sm sm:text-2xl font-black tracking-tight leading-none">
                 {s.subtitle2}
               </p>
            </div>
          </div>

          <div className="relative group max-w-3xl mx-auto w-full animate-in zoom-in-95 duration-700 delay-500 pt-8">
            <div className="absolute -inset-1 bg-white/15 rounded-[45px] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center bg-white/10 backdrop-blur-3xl border border-white/30 rounded-[40px] px-8 py-4 sm:px-10 sm:py-5 shadow-2xl">
              <div className="text-white/60 group-hover:text-blue-200 transition-colors shrink-0">
                <Search size={32} strokeWidth={2.5} className="sm:w-10 sm:h-10" />
              </div>
              <input 
                ref={inputRef}
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={s.placeholder}
                className="flex-1 bg-transparent border-none text-white text-xl sm:text-3xl font-black placeholder-white/30 focus:ring-0 px-4 sm:px-8 py-2 sm:py-4"
              />
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={toggleVoiceSearch}
                  className={`p-3 rounded-full transition-all flex items-center justify-center ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-white/40 hover:text-white'}`}
                  title="Buscar por voz"
                >
                  {isListening ? <Mic size={28} /> : <Mic size={28} />}
                </button>
                {query && (
                  <button 
                    onClick={() => setQuery('')}
                    className="p-3 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={32} />
                  </button>
                )}
              </div>
            </div>
            {isListening && (
              <div className="mt-4 text-blue-200 font-bold animate-pulse text-sm uppercase tracking-widest">
                Escuchando...
              </div>
            )}
          </div>

          <div className={`transition-all duration-700 overflow-hidden ${query ? 'max-h-[1200px] opacity-100 mt-16 pb-20' : 'max-h-0 opacity-0'}`}>
            <div className="max-w-2xl mx-auto text-left space-y-12">
              
              {results.events.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-blue-100/40 text-[10px] font-black uppercase tracking-[0.4em] ml-6">{t.sections.events.title || 'Eventos'}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {results.events.slice(0, 3).map(item => (
                        <button 
                          key={item.id}
                          onClick={() => onNavigate(ViewState.EVENTS, item.id)}
                          className="flex items-center gap-6 bg-white/10 backdrop-blur-2xl p-5 rounded-[30px] border border-white/10 hover:bg-white/20 transition-all text-left group/item"
                        >
                          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shadow-xl border border-white/5">
                            <img src={item.imageUrl} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700" alt="" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-black text-xl tracking-tighter">{item.title}</h4>
                            <p className="text-blue-200/50 text-[10px] font-black uppercase tracking-widest">{item.date}</p>
                          </div>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white/30 group-hover/item:text-white transition-colors">
                            <ChevronRight size={24} />
                          </div>
                        </button>
                    ))}
                  </div>
                </div>
              )}

              {results.business.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-blue-100/40 text-[10px] font-black uppercase tracking-[0.4em] ml-6">Establecimientos</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {results.business.map(item => {
                      const isFav = favorites.includes(item.id);
                      return (
                        <div 
                          key={item.id}
                          className="flex items-center gap-6 bg-white/10 backdrop-blur-2xl p-5 rounded-[30px] border border-white/10 hover:bg-white/20 transition-all text-left group/item relative"
                        >
                          <div 
                            onClick={() => onNavigate(ViewState.SHOPPING, item.id)}
                            className="flex-1 flex items-center gap-6 cursor-pointer"
                          >
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/10 shadow-xl border border-white/5">
                              <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-black text-xl tracking-tighter">{item.name}</h4>
                              <p className="text-blue-200/50 text-[10px] font-black uppercase tracking-widest">{item.category}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(item.id); }}
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isFav ? 'bg-red-500 text-white shadow-lg' : 'bg-white/10 text-white/40 hover:bg-white/20 hover:text-white'}`}
                            >
                              <Heart size={20} className={isFav ? 'fill-current' : ''} />
                            </button>
                            <button 
                              onClick={() => onNavigate(ViewState.SHOPPING, item.id)}
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white/30 group-hover:item:text-white transition-colors"
                            >
                              <ChevronRight size={24} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
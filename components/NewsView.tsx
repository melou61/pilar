import React, { useState } from 'react';
import { MOCK_NEWS } from '../data';
import { Rss, Facebook, Instagram, Newspaper, ExternalLink, Calendar, Filter, Megaphone, Share2 } from './Icons';

interface NewsViewProps {
  t: any;
}

export const NewsView: React.FC<NewsViewProps> = ({ t }) => {
  const [filter, setFilter] = useState<'all' | 'social' | 'press' | 'official'>('all');

  // Helper to map icon string to Component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook': return <Facebook size={16} />;
      case 'instagram': return <Instagram size={16} />;
      case 'newspaper': return <Newspaper size={16} />;
      case 'calendar': return <Calendar size={16} />;
      default: return <Rss size={16} />;
    }
  };

  const getColor = (sourceType: string) => {
      switch (sourceType) {
          case 'social': return 'bg-blue-100 text-blue-700';
          case 'press': return 'bg-orange-100 text-orange-700';
          case 'official': return 'bg-purple-100 text-purple-700';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  const filteredNews = filter === 'all' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(n => n.sourceType === filter);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 animate-in fade-in duration-300">
      
      {/* Header Hub */}
      <div className="bg-white px-6 pt-6 pb-4 border-b border-gray-200">
         <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-1">
            <Megaphone className="text-blue-600" />
            {t.menu.news}
         </h1>
         <p className="text-xs text-gray-500">
            Toda la actualidad de Pilar de la Horadada en un solo lugar.
         </p>

         {/* Sources Preview (Saving Time) */}
         <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
            <div className="flex -space-x-2">
               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white border-2 border-white shadow-sm z-30"><Facebook size={14} /></div>
               <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white border-2 border-white shadow-sm z-20"><Instagram size={14} /></div>
               <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white border-2 border-white shadow-sm z-10"><Newspaper size={14} /></div>
            </div>
            <span className="text-[10px] text-gray-400 font-medium ml-2">Fuentes conectadas</span>
         </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-100">
          <button 
             onClick={() => setFilter('all')}
             className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${filter === 'all' ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-600 border-gray-200'}`}
          >
             Todo
          </button>
          <button 
             onClick={() => setFilter('social')}
             className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${filter === 'social' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200'}`}
          >
             Redes Sociales
          </button>
          <button 
             onClick={() => setFilter('press')}
             className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${filter === 'press' ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200'}`}
          >
             Prensa Local
          </button>
          <button 
             onClick={() => setFilter('official')}
             className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-colors ${filter === 'official' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200'}`}
          >
             Agenda Oficial
          </button>
      </div>

      {/* Feed List */}
      <div className="px-4 py-4 space-y-4">
          {filteredNews.map((news) => (
             <article key={news.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                 <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getColor(news.sourceType)}`}>
                           {getIcon(news.icon)}
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-gray-900">{news.source}</h4>
                           <span className="text-[10px] text-gray-400">{news.date}</span>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-blue-600">
                        <Share2 size={16} />
                    </button>
                 </div>

                 {news.image && (
                    <div className="rounded-xl overflow-hidden mb-3 h-48 w-full">
                       <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                 )}

                 <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                    {news.title}
                 </h2>
                 <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {news.content}
                 </p>

                 <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">
                       {news.sourceType === 'social' ? 'Facebook Post' : news.sourceType === 'official' ? 'Evento Oficial' : 'Noticia Web'}
                    </span>
                    <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline">
                       Leer completo <ExternalLink size={12} />
                    </button>
                 </div>
             </article>
          ))}

          <div className="text-center py-6">
             <p className="text-xs text-gray-400">Has llegado al final de la actualidad de hoy.</p>
          </div>
      </div>

    </div>
  );
};
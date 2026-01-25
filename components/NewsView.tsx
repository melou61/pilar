
import React, { useState } from 'react';
import { MOCK_NEWS } from '../data';
import { 
  Rss, Facebook, Instagram, Newspaper, ExternalLink, Calendar, 
  Filter, Megaphone, Share2, Flower, Briefcase, Home, Info 
} from './Icons';
import { NewsCategory, Ad, ViewState } from '../types';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface NewsViewProps {
  t: any;
  ads: Ad[];
  headerProps: any;
  onOpenAdminLogin: () => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ t, ads, headerProps, onOpenAdminLogin }) => {
  const [activeCategory, setActiveCategory] = useState<NewsCategory | 'ALL'>('ALL');

  const getCategoryIcon = (cat: NewsCategory) => {
    switch (cat) {
      case 'DIFUNTOS': return <Flower size={18} className="text-gray-500" />;
      case 'TRABAJO': return <Briefcase size={18} className="text-emerald-600" />;
      case 'CASAS': return <Home size={18} className="text-blue-600" />;
      case 'OTROS': return <Info size={18} className="text-orange-500" />;
      default: return <Megaphone size={18} className="text-blue-600" />;
    }
  };

  const getCategoryColor = (cat: NewsCategory) => {
    switch (cat) {
      case 'DIFUNTOS': return 'bg-gray-50 border-gray-200';
      case 'TRABAJO': return 'bg-emerald-50 border-emerald-100';
      case 'CASAS': return 'bg-blue-50 border-blue-100';
      case 'OTROS': return 'bg-orange-50 border-orange-100';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  const filteredNews = activeCategory === 'ALL' 
    ? MOCK_NEWS 
    : MOCK_NEWS.filter(n => n.category === activeCategory);

  const categories: {id: NewsCategory | 'ALL', label: string}[] = [
    { id: 'ALL', label: 'Todo' },
    { id: 'GENERAL', label: 'Actualidad' },
    { id: 'DIFUNTOS', label: 'Difuntos' },
    { id: 'TRABAJO', label: 'Empleo' },
    { id: 'CASAS', label: 'Vivienda' },
    { id: 'OTROS', label: 'Otros' },
  ];

  return (
    <div className="fixed inset-0 z-[450] bg-gray-50 flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (w-full) */}
      <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white">
         <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.NEWS} currentFilter={activeCategory} />
      </div>

      {/* 3. EDITORIAL HEADER */}
      <div className="bg-white px-8 pt-12 pb-10 border-b border-gray-100 shadow-sm shrink-0">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2 flex items-center gap-4">
                <Newspaper className="text-blue-600" size={48} />
                {t.menu.news}
            </h1>
            <p className="text-gray-500 font-medium text-lg max-w-md">
                Toda la información relevante de Pilar de la Horadada, actualizada minuto a minuto.
            </p>

            {/* Categorías Slider */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar mt-10 pb-2">
                {categories.map(cat => (
                    <button 
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                            activeCategory === cat.id 
                            ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xl' 
                            : 'bg-gray-50 text-gray-400 border-gray-100 hover:border-blue-200'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
         </div>
      </div>

      {/* 4. FEED LIST */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 flex-1">
          {filteredNews.length > 0 ? filteredNews.map((news) => (
             <article key={news.id} className={`bg-white rounded-[45px] p-8 shadow-2xl shadow-gray-200/40 border border-gray-50 transition-all hover:-translate-y-1`}>
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${getCategoryColor(news.category)}`}>
                           {getCategoryIcon(news.category)}
                        </div>
                        <div>
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{news.source}</h4>
                           <span className="text-xs font-bold text-blue-600">{news.date}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition-all">
                            <Share2 size={18} />
                        </button>
                    </div>
                 </div>

                 <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter leading-tight">
                    {news.title}
                 </h2>

                 {news.image && (
                    <div className="rounded-[35px] overflow-hidden mb-6 h-64 w-full shadow-inner border border-gray-100">
                       <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                    </div>
                 )}

                 <p className="text-lg text-gray-500 mb-8 leading-relaxed font-medium">
                    {news.content}
                 </p>

                 <div className="flex items-center justify-between border-t border-gray-50 pt-8">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${getCategoryColor(news.category)}`}>
                       #{news.category}
                    </span>
                    <button className="flex items-center gap-2 text-sm font-black text-[#0f172a] hover:gap-3 transition-all uppercase tracking-widest">
                       Leer más <ExternalLink size={16} />
                    </button>
                 </div>
             </article>
          )) : (
            <div className="text-center py-20 text-gray-400 font-black uppercase tracking-widest">
                No hay publicaciones en esta categoría hoy.
            </div>
          )}
      </div>

      {/* 5. ANUNCIO INFERIOR (w-full) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white">
         <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.NEWS} currentFilter={activeCategory} />
      </div>

      {/* 6. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} onOpenAdminLogin={onOpenAdminLogin} />
      </div>
    </div>
  );
};

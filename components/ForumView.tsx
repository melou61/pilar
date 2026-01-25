
import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Plus, Filter, User, Clock, ArrowRight, MessageCircle } from './Icons';
import { Ad, ViewState } from '../types';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface ForumPost {
  id: string;
  user: string;
  avatar: string;
  category: string;
  title: string;
  content: string;
  likes: number;
  replies: number;
  time: string;
  badge?: string;
}

const MOCK_POSTS: ForumPost[] = [
  { id: 'p1', user: 'Antonio G.', avatar: 'AG', category: 'Recomendaciones', title: '¿Mejor sitio para arroz en La Torre?', content: 'Estamos de visita y buscamos algo auténtico frente al mar. ¡Gracias!', likes: 12, replies: 5, time: 'Hace 2h', badge: 'Vecino Activo' },
  { id: 'p2', user: 'Marta PH', avatar: 'M', category: 'General', title: 'Aviso: Corte de agua en Calle Mayor', content: 'He visto operarios trabajando cerca de la plaza, por si a alguien le sirve.', likes: 8, replies: 2, time: 'Hace 4h' },
  { id: 'p3', user: 'Carlos L.', avatar: 'CL', category: 'Mascotas', title: 'Perro encontrado en Higuericas', content: 'Es un podenco joven con collar rojo pero sin chapa. Lo tengo yo ahora mismo.', likes: 45, replies: 12, time: 'Hace 10h', badge: 'Protector' },
  { id: 'p4', user: 'User92', avatar: 'U', category: 'Mercadillo', title: 'Vendo tabla de surf casi nueva', content: 'Ideal para principiantes. Entrega en mano en Mil Palmeras.', likes: 3, replies: 0, time: 'Ayer' },
];

interface ForumViewProps {
  t: any;
  ads: Ad[];
  headerProps: any;
}

export const ForumView: React.FC<ForumViewProps> = ({ t, ads, headerProps }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState(MOCK_POSTS);

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="fixed inset-0 z-[400] bg-slate-50 flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* 2. ANUNCIO SUPERIOR (Full Width) */}
      <div className="w-full pt-4 pb-2 mt-24 shrink-0 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-top" label={t.common.sponsored} view={ViewState.FORUM} currentFilter={activeCategory} />
      </div>

      {/* 3. EDITORIAL HEADER */}
      <div className="bg-white px-8 pt-12 pb-10 border-b border-gray-100 shadow-sm relative overflow-hidden shrink-0 mt-4">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-3">
             <MessageSquare size={18} />
             Comunidad Pilar
          </div>
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">{t.forum.title}</h1>
          <p className="text-gray-500 font-medium text-lg mb-10">{t.forum.subtitle}</p>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
             <button 
               onClick={() => setActiveCategory('all')}
               className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                 activeCategory === 'all' ? 'bg-blue-600 text-white shadow-xl' : 'bg-gray-50 text-gray-400'
               }`}
             >
               Todos
             </button>
             {t.forum.categories.map((cat: string) => (
               <button 
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                   activeCategory === cat ? 'bg-blue-600 text-white shadow-xl' : 'bg-gray-50 text-gray-400'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </div>

      {/* 4. FEED */}
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6 flex-1">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-[40px] p-8 shadow-xl border border-white hover:border-blue-100 transition-all group">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm">AG</div>
                   <div>
                      <h4 className="font-black text-gray-900 text-sm">{post.user}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                         <Clock size={12} /> {post.time}
                      </div>
                   </div>
                </div>
             </div>
             <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4 leading-tight">{post.title}</h3>
             <p className="text-gray-500 font-medium leading-relaxed mb-8">{post.content}</p>
          </div>
        ))}
      </div>

      {/* 5. ANUNCIO INFERIOR (Full Width) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.FORUM} currentFilter={activeCategory} />
      </div>

      {/* 6. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} />
      </div>

      <button className="fixed bottom-32 right-8 w-16 h-16 bg-blue-600 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100]">
         <Plus size={32} strokeWidth={3} />
      </button>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Share2, Plus, Filter, User, Clock, ArrowRight, MessageCircle, Medal, X, Send } from './Icons';
import { Ad, ViewState, ForumPost, Medal as MedalType } from '../types';
import { MOCK_FORUM_POSTS } from '../data';
import { AdSpot } from './AdSpot';
import { Header } from './Header';
import { Footer } from './Footer';

interface ForumViewProps {
  t: any;
  ads: Ad[];
  headerProps: any;
  onOpenAdminLogin: () => void;
}

// Helper to check and award medals
const checkAndAwardMedals = (action: 'post' | 'reply'): MedalType | null => {
  const statsKey = 'pilar_user_stats';
  let stats = JSON.parse(localStorage.getItem(statsKey) || '{"posts": 0, "replies": 0, "medals": []}');
  let newMedal: MedalType | null = null;

  if (action === 'post') stats.posts += 1;
  if (action === 'reply') stats.replies += 1;

  const existingMedalIds = stats.medals.map((m: MedalType) => m.id);

  // LOGIC FOR MEDALS
  if (stats.posts >= 1 && !existingMedalIds.includes('first-voice')) {
    newMedal = { id: 'first-voice', name: 'Voz Vecinal', description: 'Publicaste tu primer tema', icon: '📢', dateEarned: new Date().toLocaleDateString(), color: 'bg-blue-100 text-blue-600' };
  } else if (stats.replies >= 1 && !existingMedalIds.includes('helper')) {
    newMedal = { id: 'helper', name: 'Buen Vecino', description: 'Ayudaste con tu primera respuesta', icon: '🤝', dateEarned: new Date().toLocaleDateString(), color: 'bg-green-100 text-green-600' };
  } else if ((stats.posts + stats.replies) >= 5 && !existingMedalIds.includes('community-star')) {
    newMedal = { id: 'community-star', name: 'Estrella Local', description: '5 Interacciones en el foro', icon: '⭐', dateEarned: new Date().toLocaleDateString(), color: 'bg-yellow-100 text-yellow-600' };
  }

  if (newMedal) {
    stats.medals.push(newMedal);
  }

  localStorage.setItem(statsKey, JSON.stringify(stats));
  return newMedal;
};

export const ForumView: React.FC<ForumViewProps> = ({ t, ads, headerProps, onOpenAdminLogin }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState<ForumPost[]>(MOCK_FORUM_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState({ title: '', content: '', category: 'General' });
  const [unlockedMedal, setUnlockedMedal] = useState<MedalType | null>(null);

  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Auto-hide medal notification
  useEffect(() => {
    if (unlockedMedal) {
      const timer = setTimeout(() => setUnlockedMedal(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [unlockedMedal]);

  const handlePostSubmit = () => {
    if (!newPostContent.title || !newPostContent.content) return;

    // Create New Post
    const newPost: ForumPost = {
      id: `new-${Date.now()}`,
      user: 'Yo', // In real app, get from auth
      avatar: 'Y',
      category: newPostContent.category,
      title: newPostContent.title,
      content: newPostContent.content,
      likes: 0,
      replies: 0,
      time: 'Ahora',
      status: 'APPROVED' // Auto-approve for user demo or PENDING if strictly moderated
    };

    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
    setNewPostContent({ title: '', content: '', category: 'General' });

    // Gamification Trigger
    const medal = checkAndAwardMedals('post');
    if (medal) setUnlockedMedal(medal);
  };

  const handleReply = (postId: string) => {
    // Simulate a reply action
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, replies: p.replies + 1 } : p));
    
    // Gamification Trigger
    const medal = checkAndAwardMedals('reply');
    if (medal) setUnlockedMedal(medal);
    else alert("¡Respuesta enviada! Gracias por participar.");
  };

  return (
    <div className="fixed inset-0 z-[400] bg-slate-50 flex flex-col animate-in fade-in duration-500 overflow-y-auto no-scrollbar">
      
      {/* 1. HEADER GLOBAL */}
      <div className="relative z-[220] shrink-0">
         <Header {...headerProps} />
      </div>

      {/* MEDAL NOTIFICATION TOAST */}
      {unlockedMedal && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-[6000] animate-in slide-in-from-top-10 zoom-in duration-500 w-[90%] max-w-sm">
          <div className="bg-[#0f172a] text-white p-6 rounded-[30px] shadow-2xl flex items-center gap-5 border border-yellow-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent animate-pulse" />
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shrink-0 relative z-10">
              {unlockedMedal.icon}
            </div>
            <div className="relative z-10">
              <h4 className="font-black text-yellow-400 text-xs uppercase tracking-[0.2em] mb-1">¡Medalla Desbloqueada!</h4>
              <h3 className="font-bold text-xl leading-none mb-1">{unlockedMedal.name}</h3>
              <p className="text-xs text-slate-400">{unlockedMedal.description}</p>
            </div>
          </div>
        </div>
      )}

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
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6 flex-1 w-full">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white rounded-[40px] p-8 shadow-xl border border-white hover:border-blue-100 transition-all group">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm">
                     {post.avatar}
                   </div>
                   <div>
                      <h4 className="font-black text-gray-900 text-sm flex items-center gap-2">
                        {post.user}
                        {post.badge && <span className="bg-yellow-100 text-yellow-700 text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wide">{post.badge}</span>}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                         <Clock size={12} /> {post.time} • {post.category}
                      </div>
                   </div>
                </div>
             </div>
             <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-4 leading-tight">{post.title}</h3>
             <p className="text-gray-500 font-medium leading-relaxed mb-8">{post.content}</p>
             
             <div className="flex items-center justify-between border-t border-gray-50 pt-6">
                <div className="flex items-center gap-6">
                   <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Heart size={18} /> <span className="text-xs font-bold">{post.likes}</span>
                   </button>
                   <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                      <MessageCircle size={18} /> <span className="text-xs font-bold">{post.replies}</span>
                   </button>
                </div>
                <button 
                  onClick={() => handleReply(post.id)}
                  className="bg-slate-50 text-slate-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                >
                  Responder
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* 5. ANUNCIO INFERIOR (Full Width) */}
      <div className="w-full py-6 shrink-0 opacity-90 relative z-10 bg-white">
        <AdSpot ads={ads} position="page-bottom" label={t.common.sponsored} view={ViewState.FORUM} currentFilter={activeCategory} />
      </div>

      {/* 6. FOOTER GLOBAL */}
      <div className="relative z-10">
        <Footer t={t} onOpenAdminLogin={onOpenAdminLogin} />
      </div>

      {/* FAB - NEW POST */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-32 right-8 w-16 h-16 bg-blue-600 text-white rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[100] hover:rotate-90"
      >
         <Plus size={32} strokeWidth={3} />
      </button>

      {/* NEW POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[5000] flex items-end sm:items-center justify-center p-4 sm:p-0">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-lg rounded-[40px] p-8 animate-in slide-in-from-bottom duration-300 shadow-2xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Nuevo Tema</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100"><X size={20} /></button>
             </div>
             
             <div className="space-y-4">
                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Título</label>
                   <input 
                     value={newPostContent.title}
                     onChange={e => setNewPostContent({...newPostContent, title: e.target.value})}
                     className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-gray-900 focus:ring-2 focus:ring-blue-100" 
                     placeholder="¿Qué está pasando?" 
                   />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Categoría</label>
                      <select 
                        value={newPostContent.category}
                        onChange={e => setNewPostContent({...newPostContent, category: e.target.value})}
                        className="w-full bg-gray-50 border-none rounded-2xl p-4 font-bold text-gray-900 focus:ring-2 focus:ring-blue-100 appearance-none"
                      >
                        {t.forum.categories.map((c: string) => <option key={c} value={c}>{c}</option>)}
                      </select>
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Mensaje</label>
                   <textarea 
                     value={newPostContent.content}
                     onChange={e => setNewPostContent({...newPostContent, content: e.target.value})}
                     className="w-full bg-gray-50 border-none rounded-2xl p-4 font-medium text-gray-900 focus:ring-2 focus:ring-blue-100 h-32 resize-none" 
                     placeholder="Escribe tu mensaje aquí..." 
                   />
                </div>

                <button 
                  onClick={handlePostSubmit}
                  className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-4"
                >
                   <Send size={18} /> Publicar
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

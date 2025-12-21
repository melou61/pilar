
import React from 'react';
import { X, LogIn, ShieldCheck } from './Icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onLoginSuperAdmin: () => void;
  t: any;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onLoginSuperAdmin, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[7000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
             <LogIn size={24} />
           </div>
           <div>
             <h2 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">{t.loginTitle}</h2>
             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Acceso Usuarios</p>
           </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-8 font-medium">
          {t.loginSubtitle}
        </p>

        {/* --- SUPER ADMIN BUTTON --- */}
        <button
            onClick={onLoginSuperAdmin}
            className="w-full py-4 mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
            <ShieldCheck size={20} />
            {t.demoAccess}
        </button>

        <div className="relative flex py-4 items-center mb-6">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink-0 mx-4 text-gray-300 text-[10px] font-black uppercase tracking-widest">O ingresa manualmente</span>
            <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
              {t.email}
            </label>
            <input 
              type="email" 
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-100 transition-all text-sm font-medium"
              placeholder="admin@pilarhoradada.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 ml-1">
              {t.password}
            </label>
            <input 
              type="password" 
              className="w-full px-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white focus:border-blue-100 transition-all text-sm font-medium"
              placeholder="••••••••"
            />
          </div>

          <button 
            className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 mt-4 active:scale-95"
          >
            {t.signIn}
          </button>
        </form>

        <div className="mt-8 text-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.noAccount} </span>
            <button className="text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest ml-1">
                {t.register}
            </button>
        </div>
      </div>
    </div>
  );
};

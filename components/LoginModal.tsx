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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-2">
           <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
             <LogIn size={24} />
           </div>
           <h2 className="text-xl font-bold text-gray-800">{t.loginTitle}</h2>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 ml-12">
          {t.loginSubtitle}
        </p>

        {/* --- SUPER ADMIN BUTTON --- */}
        <button
            onClick={onLoginSuperAdmin}
            className="w-full py-4 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
            <ShieldCheck size={20} />
            {t.demoAccess}
        </button>

        <div className="relative flex py-2 items-center mb-6">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink-0 mx-4 text-gray-300 text-xs">O ingresa manualmente</span>
            <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">
              {t.email}
            </label>
            <input 
              type="email" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="admin@pilarhoradada.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5 ml-1">
              {t.password}
            </label>
            <input 
              type="password" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <button 
            className="w-full py-3.5 bg-gray-800 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors shadow-lg shadow-gray-200 mt-2"
          >
            {t.signIn}
          </button>
        </form>

        <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">{t.noAccount} </span>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                {t.register}
            </button>
        </div>
      </div>
    </div>
  );
};
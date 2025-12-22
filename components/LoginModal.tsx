
import React, { useState, useEffect } from 'react';
import { X, LogIn, ShieldCheck, UserPlus, Check, AlertTriangle } from './Icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData?: { name: string, email: string }) => void;
  onLoginSuperAdmin: () => void;
  t: any;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onLoginSuperAdmin, t }) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStoredUser = () => {
    const stored = localStorage.getItem('pilar_user_db');
    return stored ? JSON.parse(stored) : null;
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Credenciales Maestras de Administración
    if (email.toLowerCase() === 'admin@pilarhoradada.com' && password === 'admin') {
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuperAdmin(); // Activa handleLogin('ADMIN') en App.tsx
        setIsSuccess(false);
        resetForm();
      }, 800);
      return;
    }

    // 2. Credenciales de Usuario Normal (LocalStorage)
    const dbUser = getStoredUser();
    if (dbUser && email.toLowerCase() === dbUser.email.toLowerCase() && password === dbUser.pass) {
      setIsSuccess(true);
      setTimeout(() => {
        onLogin({ name: dbUser.name, email: dbUser.email }); // Activa handleLogin('USER')
        setIsSuccess(false);
        resetForm();
      }, 800);
      return;
    }

    setError("Datos incorrectos. Recuerda que para entrar como Administrador debes usar el correo oficial.");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
        setError("Completa todos los campos para registrarte.");
        return;
    }

    // Guardamos en un mini "DB" local para la demo
    const userData = { name, email, pass: password };
    localStorage.setItem('pilar_user_db', JSON.stringify(userData));
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setView('login');
      setError(null);
      setPassword(''); 
      alert("¡Cuenta creada! Ahora puedes entrar con tu email y contraseña. Recuerda que para el panel administrativo se requiere una cuenta especial.");
    }, 1000);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-[7500] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-[45px] shadow-2xl p-10 animate-in zoom-in-95 duration-200 border border-white/20">
        <div className="flex items-center gap-4 mb-8">
           <div className={`w-14 h-14 ${view === 'login' ? 'bg-blue-600' : 'bg-emerald-600'} text-white rounded-[24px] flex items-center justify-center shadow-xl transition-all`}>
             {view === 'login' ? <LogIn size={28} /> : <UserPlus size={28} />}
           </div>
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                {view === 'login' ? 'Entrar' : 'Registro'}
             </h2>
             <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.3em] mt-2">
                Pilar de la Horadada
             </p>
           </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake duration-300">
            <AlertTriangle size={20} className="shrink-0" />
            <p className="text-[11px] font-bold leading-tight">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={view === 'login' ? handleSubmit : handleRegister}>
          {view === 'register' && (
             <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nombre Completo</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all text-base font-bold text-gray-900 placeholder-gray-300" 
                  placeholder="Escribe tu nombre..." 
                />
             </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email</label>
            <input 
              required
              type="email" 
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all text-base font-bold text-gray-900 placeholder-gray-300"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
            <input 
              required
              type="password" 
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-600 transition-all text-base font-bold text-gray-900 placeholder-gray-300"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            disabled={isSuccess}
            className={`w-full py-5 rounded-[26px] font-black text-xs uppercase tracking-widest transition-all shadow-xl mt-4 active:scale-95 flex items-center justify-center gap-3 ${
                isSuccess 
                ? 'bg-green-500 text-white shadow-green-200' 
                : view === 'login' ? 'bg-[#0f172a] text-white hover:bg-black' : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isSuccess ? <Check size={20} /> : view === 'login' ? 'Acceder' : 'Registrarme'}
          </button>
        </form>

        <div className="mt-8 text-center">
            <button 
                type="button"
                onClick={() => { setView(view === 'login' ? 'register' : 'login'); setError(null); }}
                className={`text-[10px] font-black uppercase tracking-widest ${view === 'login' ? 'text-blue-600' : 'text-emerald-600'}`}
            >
                {view === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Entra aquí'}
            </button>
        </div>

        {view === 'login' && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center mb-4 leading-tight">Acceso Rápido Administrador</p>
            <button 
                onClick={() => { setEmail('admin@pilarhoradada.com'); setPassword('admin'); }}
                className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
            >
                <ShieldCheck size={14} /> Auto-completar Admin
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

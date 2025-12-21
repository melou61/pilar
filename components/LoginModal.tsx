
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

  // Intentar recuperar el usuario registrado de la sesión actual
  const getStoredUser = () => {
    const stored = localStorage.getItem('pilar_user_db');
    return stored ? JSON.parse(stored) : null;
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Verificar Admin de la Demo
    if (email.toLowerCase() === 'admin@pilarhoradada.com' && password === 'admin') {
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuperAdmin();
        setIsSuccess(false);
        resetForm();
      }, 800);
      return;
    }

    // 2. Verificar Usuario registrado en LocalStorage
    const dbUser = getStoredUser();
    if (dbUser && email.toLowerCase() === dbUser.email.toLowerCase() && password === dbUser.pass) {
      setIsSuccess(true);
      setTimeout(() => {
        onLogin({ name: dbUser.name, email: dbUser.email });
        setIsSuccess(false);
        resetForm();
      }, 800);
      return;
    }

    // 3. Error detallado
    setError("Credenciales incorrectas. Si te acabas de registrar, usa ese mismo email y contraseña.");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
        setError("Todos los campos son obligatorios.");
        return;
    }

    // Guardar permanentemente en el navegador para esta sesión
    const userData = { name, email, pass: password };
    localStorage.setItem('pilar_user_db', JSON.stringify(userData));
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setView('login');
      setError(null);
      // Mantenemos el email para que solo tenga que poner la contraseña
      setPassword(''); 
      alert("¡Registro completado! Ya puedes entrar con tus datos.");
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
        className="absolute inset-0 bg-black/75 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl p-10 animate-in zoom-in-95 duration-200 border border-white/20">
        <div className="flex items-center gap-4 mb-6">
           <div className={`w-14 h-14 ${view === 'login' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'} rounded-[22px] flex items-center justify-center shadow-lg transition-colors`}>
             {view === 'login' ? <LogIn size={28} /> : <UserPlus size={28} />}
           </div>
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                {view === 'login' ? 'Acceso' : 'Únete'}
             </h2>
             <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">
                {view === 'login' ? 'Tu Rincón del Pilar' : 'Ventajas Exclusivas'}
             </p>
           </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 font-medium leading-tight">
          {view === 'login' ? 'Entra para gestionar tus favoritos y agenda.' : 'Regístrate para guardar tus sitios favoritos del Pilar.'}
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in shake duration-300">
            <AlertTriangle size={20} className="shrink-0" />
            <p className="text-[11px] font-bold leading-tight">{error}</p>
          </div>
        )}

        {view === 'login' && (
            <button
                type="button"
                onClick={onLoginSuperAdmin}
                className="w-full py-5 mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
                <ShieldCheck size={20} />
                Acceso Admin Rápido
            </button>
        )}

        <div className="relative flex py-4 items-center mb-6">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink-0 mx-4 text-gray-300 text-[9px] font-black uppercase tracking-widest">
                O {view === 'login' ? 'Usa tus datos' : 'Crea tu perfil'}
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <form className="space-y-6" onSubmit={view === 'login' ? handleSubmit : handleRegister}>
          {view === 'register' && (
             <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nombre Completo</label>
                <input 
                  required 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:bg-white focus:border-emerald-500 transition-all text-base font-bold text-gray-900 placeholder-gray-400" 
                  placeholder="Tu nombre" 
                />
             </div>
          )}

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Email
            </label>
            <input 
              required
              type="email" 
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 transition-all text-base font-bold text-gray-900 placeholder-gray-400"
              placeholder="Ej: tu@email.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
              Contraseña
            </label>
            <input 
              required
              type="password" 
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 transition-all text-base font-bold text-gray-900 placeholder-gray-400"
              placeholder="Mín. 4 caracteres"
            />
          </div>

          <button 
            type="submit"
            disabled={isSuccess}
            className={`w-full py-5 rounded-[22px] font-black text-xs uppercase tracking-widest transition-all shadow-xl mt-4 active:scale-95 flex items-center justify-center gap-3 ${
                isSuccess 
                ? 'bg-green-500 text-white shadow-green-100' 
                : view === 'login' ? 'bg-[#0f172a] text-white hover:bg-black shadow-gray-200' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
            }`}
          >
            {isSuccess ? <Check size={20} /> : view === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <div className="mt-10 text-center">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {view === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            </span>
            <button 
                type="button"
                onClick={() => {
                  setView(view === 'login' ? 'register' : 'login');
                  setError(null);
                }}
                className={`text-xs font-black uppercase tracking-widest ml-2 ${view === 'login' ? 'text-blue-600' : 'text-emerald-600'}`}
            >
                {view === 'login' ? 'Regístrate' : 'Accede'}
            </button>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { X, LogIn, ShieldCheck, UserPlus, Check, AlertTriangle, RefreshCw, Mail, Lock, Phone } from './Icons';
import { AdminRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData?: { name: string, email: string, role?: AdminRole, phone?: string }) => void;
  onLoginSuperAdmin: () => void;
  t: any;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin, onLoginSuperAdmin, t }) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // New state for phone
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secretClicks, setSecretClicks] = useState(0);
  const [isSending, setIsSending] = useState(false);

  // Security features state
  const [captchaChallenge, setCaptchaChallenge] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [userCode, setUserCode] = useState('');
  
  // Notification State for Simulated Email
  const [simulatedEmail, setSimulatedEmail] = useState<{show: boolean, code: string, message?: string} | null>(null);

  // Fallback seguro si t.auth no está cargado aún
  const authT = t?.auth || { 
    title_login: 'Entrar', 
    title_register: 'Registro', 
    name: 'Nombre Completo', 
    email: 'Email', 
    pass: 'Contraseña', 
    phone: 'Teléfono (Opcional)',
    btn_login: 'Acceder', 
    btn_register: 'Siguiente',
    btn_verify: 'Verificar y Crear',
    no_account: '¿No tienes cuenta? Regístrate',
    has_account: '¿Ya tienes cuenta? Entra aquí',
    captcha_label: 'Código de Seguridad',
    verify_title: 'Verificar Email',
    verify_desc: 'Hemos enviado un código a tu correo.',
    code_label: 'Código de Verificación',
    resend: 'Reenviar código'
  };

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, 1, O, 0 to avoid confusion
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaChallenge(result);
    setCaptchaInput('');
  };

  const getStoredUser = () => {
    const stored = localStorage.getItem('pilar_user_db');
    return stored ? JSON.parse(stored) : null;
  };

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setPassword('');
      setSecretClicks(0);
      setShowVerification(false);
      setSimulatedEmail(null);
      setIsSending(false);
      if (view === 'register') {
        generateCaptcha();
      }
    }
  }, [isOpen, view]);

  if (!isOpen) return null;

  const handleSecretZoneClick = () => {
    setSecretClicks(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Credenciales Maestras de Administración (SUPER_ADMIN)
    if (email.toLowerCase() === 'admin@pilarhoradada.com' && password === 'admin') {
      setIsSuccess(true);
      setTimeout(() => {
        onLogin({ name: 'Super Administrador', email: email, role: 'SUPER_ADMIN' });
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
        onLogin({ name: dbUser.name, email: dbUser.email, role: 'USER' as any, phone: dbUser.phone }); 
        setIsSuccess(false);
        resetForm();
      }, 800);
      return;
    }

    setError("Datos incorrectos. Recuerda que para entrar como Administrador debes usar el correo oficial.");
  };

  const sendSimulatedEmail = (code: string) => {
      // Check for SMTP config
      const smtpConfig = localStorage.getItem('pilar_smtp_config');
      const hasSmtp = !!smtpConfig;
      const smtpHost = hasSmtp ? JSON.parse(smtpConfig).host : null;

      setIsSending(true);

      // Log for Admin Dashboard
      const existingLogs = localStorage.getItem('pilar_email_logs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push({
          email: email,
          code: code,
          timestamp: new Date().toLocaleTimeString(),
          status: 'SENT',
          via: hasSmtp ? 'SMTP' : 'SIMULATION'
      });
      localStorage.setItem('pilar_email_logs', JSON.stringify(logs));

      // Simulate Network Delay (longer if "SMTP" is active to be realistic)
      setTimeout(() => {
          setIsSending(false);
          // Show notification
          setSimulatedEmail({ 
              show: true, 
              code, 
              message: hasSmtp ? `Enviado vía ${smtpHost}` : 'Simulación Local'
          });
          
          setShowVerification(true);
          setUserCode('');

          // Auto hide after 8 seconds
          setTimeout(() => {
              setSimulatedEmail(prev => prev ? { ...prev, show: false } : null);
          }, 8000);
      }, hasSmtp ? 1500 : 600);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
        setError("Completa todos los campos obligatorios.");
        return;
    }

    if (captchaInput.toUpperCase() !== captchaChallenge) {
        setError("Código de seguridad incorrecto. Inténtalo de nuevo.");
        generateCaptcha();
        return;
    }

    // Simulate sending email
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(code);
    
    // Trigger Simulation
    sendSimulatedEmail(code);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (userCode !== verificationCode) {
        setError("Código incorrecto. Revisa tu email.");
        return;
    }

    const userData = { name, email, pass: password, phone };
    localStorage.setItem('pilar_user_db', JSON.stringify(userData));
    
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onLogin({ name, email, role: 'USER', phone }); // Auto login
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setError(null);
    setShowVerification(false);
    setUserCode('');
    setSimulatedEmail(null);
  };

  return (
    <div className="fixed inset-0 z-[7500] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* SIMULATED EMAIL NOTIFICATION TOAST */}
      {simulatedEmail && simulatedEmail.show && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-sm z-[8000] animate-in slide-in-from-top-10 duration-500">
              <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-4">
                  <div className="bg-blue-600 p-2 rounded-xl shrink-0">
                      <Mail size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-xs uppercase tracking-wider text-blue-300">Nuevo Correo</span>
                          <span className="text-[10px] text-slate-400">Ahora</span>
                      </div>
                      <p className="font-medium text-sm leading-tight">Tu código de verificación es:</p>
                      <p className="text-2xl font-black text-white mt-1 tracking-[0.2em] bg-white/10 p-2 rounded-lg text-center select-all cursor-pointer" onClick={() => {navigator.clipboard.writeText(simulatedEmail.code); setUserCode(simulatedEmail.code);}}>
                          {simulatedEmail.code}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                          <p className="text-[9px] text-slate-400 italic">Haz click en el código para copiar.</p>
                          {simulatedEmail.message && <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider flex items-center gap-1"><Check size={10} /> {simulatedEmail.message}</span>}
                      </div>
                  </div>
                  <button onClick={() => setSimulatedEmail({...simulatedEmail, show: false})} className="text-slate-500 hover:text-white">
                      <X size={16} />
                  </button>
              </div>
          </div>
      )}
      
      <div className="relative w-full max-w-sm bg-white rounded-[45px] shadow-2xl p-10 animate-in zoom-in-95 duration-200 border border-white/20">
        
        <div className="flex items-center gap-4 mb-8 select-none">
           <div 
             onClick={handleSecretZoneClick}
             className={`w-14 h-14 ${showVerification ? 'bg-purple-600' : view === 'login' ? 'bg-blue-600' : 'bg-emerald-600'} text-white rounded-[24px] flex items-center justify-center shadow-xl transition-all cursor-pointer active:scale-90 active:bg-slate-900`}
           >
             {showVerification ? <Mail size={28} /> : view === 'login' ? <LogIn size={28} /> : <UserPlus size={28} />}
           </div>
           <div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">
                {showVerification ? authT.verify_title : view === 'login' ? authT.title_login : authT.title_register}
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

        {!showVerification ? (
            <form className="space-y-5" onSubmit={view === 'login' ? handleSubmit : handleRegister}>
            {view === 'register' && (
                <>
                    <div className="animate-in slide-in-from-right duration-300">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">{authT.name}</label>
                        <input 
                        required 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all text-base font-bold text-gray-900 placeholder-gray-300" 
                        placeholder="..." 
                        />
                    </div>
                    <div className="animate-in slide-in-from-right duration-300 delay-100">
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Teléfono (Importante)</label>
                        <div className="relative">
                            <input 
                            required
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:bg-white focus:border-emerald-500 transition-all text-base font-bold text-gray-900 placeholder-gray-300" 
                            placeholder="600 000 000" 
                            />
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                </>
            )}

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">{authT.email}</label>
                <input 
                required
                type="email" 
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 transition-all text-base font-bold text-gray-900 placeholder-gray-300 ${view === 'register' ? 'focus:ring-emerald-500/10 focus:border-emerald-500' : 'focus:ring-blue-500/10 focus:border-blue-600'}`}
                placeholder="tu@correo.com"
                />
            </div>

            <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">{authT.pass}</label>
                <input 
                required
                type="password" 
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 transition-all text-base font-bold text-gray-900 placeholder-gray-300 ${view === 'register' ? 'focus:ring-emerald-500/10 focus:border-emerald-500' : 'focus:ring-blue-500/10 focus:border-blue-600'}`}
                placeholder="••••••••"
                />
            </div>

            {view === 'register' && (
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{authT.captcha_label}</label>
                        <button type="button" onClick={generateCaptcha} className="text-gray-400 hover:text-emerald-500 transition-colors p-1" title="Refrescar código">
                            <RefreshCw size={14} />
                        </button>
                    </div>
                    <div className="flex gap-3">
                        <div 
                            className="flex-1 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center select-none overflow-hidden relative"
                            style={{ 
                                backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNjY2MiLz4KPC9zdmc+")',
                                letterSpacing: '0.2em'
                            }}
                        >
                            <span className="text-2xl font-black text-slate-700 tracking-[0.5em] font-mono transform -rotate-2" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.1)' }}>
                                {captchaChallenge}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/30 pointer-events-none" />
                        </div>
                        <input 
                            required
                            type="text" 
                            maxLength={5}
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                            className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-xl text-center text-lg font-black text-emerald-600 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 uppercase placeholder-gray-300"
                            placeholder="CODE"
                        />
                    </div>
                </div>
            )}

            <button 
                type="submit"
                disabled={isSuccess || isSending}
                className={`w-full py-5 rounded-[26px] font-black text-xs uppercase tracking-widest transition-all shadow-xl mt-4 active:scale-95 flex items-center justify-center gap-3 ${
                    isSuccess 
                    ? 'bg-green-500 text-white shadow-green-200' 
                    : view === 'login' ? 'bg-[#0f172a] text-white hover:bg-black' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                } ${isSending ? 'opacity-80 cursor-wait' : ''}`}
            >
                {isSending ? (
                    <>
                        <RefreshCw size={20} className="animate-spin" /> Conectando...
                    </>
                ) : isSuccess ? (
                    <Check size={20} /> 
                ) : (
                    view === 'login' ? authT.btn_login : authT.btn_register
                )}
            </button>
            </form>
        ) : (
            <form className="space-y-6 animate-in slide-in-from-right duration-300" onSubmit={handleVerifyCode}>
                <div className="text-center space-y-2">
                    <p className="text-sm font-bold text-gray-600">{authT.verify_desc}</p>
                    <p className="text-xs font-medium text-gray-400">{email}</p>
                </div>

                <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 text-center">{authT.code_label}</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                        <input 
                            required
                            type="text" 
                            maxLength={6}
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-full pl-12 pr-6 py-5 bg-purple-50 border border-purple-100 rounded-2xl text-center text-2xl font-black text-purple-600 tracking-[0.5em] focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:bg-white focus:border-purple-500 transition-all placeholder-purple-200"
                            placeholder="000000"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={isSuccess}
                    className={`w-full py-5 rounded-[26px] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${
                        isSuccess ? 'bg-green-500 text-white' : 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-200'
                    }`}
                >
                    {isSuccess ? <Check size={20} /> : authT.btn_verify}
                </button>

                <div className="text-center">
                    <button 
                        type="button" 
                        onClick={() => {
                            const code = Math.floor(100000 + Math.random() * 900000).toString();
                            setVerificationCode(code);
                            sendSimulatedEmail(code);
                        }}
                        disabled={isSending}
                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-purple-600 transition-colors disabled:opacity-50"
                    >
                        {isSending ? 'Reenviando...' : authT.resend}
                    </button>
                </div>
            </form>
        )}

        {!showVerification && (
            <div className="mt-8 text-center">
                <button 
                    type="button"
                    onClick={() => { setView(view === 'login' ? 'register' : 'login'); setError(null); }}
                    className={`text-[10px] font-black uppercase tracking-widest ${view === 'login' ? 'text-blue-600' : 'text-emerald-600'}`}
                >
                    {view === 'login' ? authT.no_account : authT.has_account}
                </button>
            </div>
        )}

        {view === 'login' && secretClicks >= 7 && (
          <div className="mt-8 pt-6 border-t border-gray-100 animate-in slide-in-from-bottom-2 fade-in">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] text-center mb-4 leading-tight">System Override</p>
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

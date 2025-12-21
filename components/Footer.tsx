
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone, Globe } from './Icons';

interface FooterProps {
  t: any;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  // Aseguramos acceso seguro a las claves de traducción del footer
  const f = t.footer;

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        
        {/* Columna 1: Contacto Localizado */}
        <div className="space-y-8">
          <h3 className="text-xl font-black border-l-4 border-blue-500 pl-4 tracking-tighter uppercase">{f.contact}</h3>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                <MapPin size={20} />
              </div>
              <div className="space-y-1 font-medium">
                <p className="font-black text-white text-base tracking-tight mb-2">{f.officeName}</p>
                <p className="leading-none">{f.addressLine1}</p>
                <p className="leading-none">{f.addressLine2}</p>
                <p className="leading-none">{f.addressLine3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Columna 2: Enlaces de Utilidad */}
        <div className="space-y-8">
          <h3 className="text-xl font-black border-l-4 border-blue-500 pl-4 tracking-tighter uppercase">{f.links}</h3>
          <div className="space-y-5 text-sm">
              <a href="tel:+34965352225" className="flex items-center gap-4 text-gray-400 hover:text-blue-400 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                  <Phone size={18} />
                </div>
                <span className="font-bold">+34 965 35 22 25</span>
              </a>
              <a href="mailto:turismo@pilardelahoradada.org" className="flex items-center gap-4 text-gray-400 hover:text-blue-400 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                  <Mail size={18} />
                </div>
                <span className="font-bold">turismo@pilardelahoradada.org</span>
              </a>
              <a href="https://www.visitpilardelahoradada.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-blue-400 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all">
                  <Globe size={18} />
                </div>
                <span className="font-bold uppercase tracking-widest text-[10px]">visitpilardelahoradada.com</span>
              </a>
          </div>
        </div>

        {/* Columna 3: Redes Sociales */}
        <div className="space-y-8">
          <h3 className="text-xl font-black border-l-4 border-blue-500 pl-4 tracking-tighter uppercase">{f.follow}</h3>
          <div className="flex gap-4">
              <a href="#" className="bg-white/5 p-3.5 rounded-2xl hover:bg-[#1877F2] hover:text-white transition-all duration-300 text-gray-400 shadow-xl border border-white/5"><Facebook size={22} /></a>
              <a href="#" className="bg-white/5 p-3.5 rounded-2xl hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300 text-gray-400 shadow-xl border border-white/5"><Instagram size={22} /></a>
              <a href="#" className="bg-white/5 p-3.5 rounded-2xl hover:bg-black hover:text-white transition-all duration-300 text-gray-400 shadow-xl border border-white/5"><Twitter size={22} /></a>
              <a href="#" className="bg-white/5 p-3.5 rounded-2xl hover:bg-[#FF0000] hover:text-white transition-all duration-300 text-gray-400 shadow-xl border border-white/5"><Youtube size={22} /></a>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed italic font-medium">
            "{f.desc}"
          </p>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-white/5 text-[10px] text-center text-gray-600 tracking-[0.3em] font-black uppercase">
          {f.rights}
      </div>
    </footer>
  );
};

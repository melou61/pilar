
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Mail, Phone, Globe } from './Icons';

interface FooterProps {
  t: any;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-4">{t.contact}</h3>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex gap-3">
              <MapPin size={18} className="text-blue-500 shrink-0" />
              <div>
                <p className="font-bold text-white mb-1">Tourist Information Office</p>
                <p>Plaza Campoamor, 2</p>
                <p>03190 Pilar de la Horadada</p>
                <p>Alicante, Spain</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-4">{t.links}</h3>
          <div className="space-y-4 text-sm text-gray-400">
              <a href="tel:+34965352225" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <Phone size={16} />
                </div>
                +34 965 35 22 25
              </a>
              <a href="mailto:turismo@pilardelahoradada.org" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <Mail size={16} />
                </div>
                turismo@pilardelahoradada.org
              </a>
              <a href="https://www.visitpilardelahoradada.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                  <Globe size={16} />
                </div>
                visitpilardelahoradada.com
              </a>
          </div>
        </div>

        {/* Column 3: Social */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold border-l-4 border-blue-500 pl-4">{t.follow}</h3>
          <div className="flex gap-4">
              <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-[#1877F2] hover:text-white transition-all duration-300 text-gray-300 shadow-xl shadow-black/20"><Facebook size={22} /></a>
              <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300 text-gray-300 shadow-xl shadow-black/20"><Instagram size={22} /></a>
              <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-gray-300 shadow-xl shadow-black/20"><Twitter size={22} /></a>
              <a href="#" className="bg-white/5 p-3 rounded-full hover:bg-[#FF0000] hover:text-white transition-all duration-300 text-gray-300 shadow-xl shadow-black/20"><Youtube size={22} /></a>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed italic">
            "{t.desc}"
          </p>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5 text-[11px] text-center text-gray-600 tracking-wider font-medium uppercase">
          {t.rights}
      </div>
    </footer>
  );
};

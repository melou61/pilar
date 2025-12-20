import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from './Icons';

interface FooterProps {
  t: any;
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-[#0f172a] text-white pt-10 pb-8 px-6 mt-auto">
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-6">{t.contact}</h3>
        
        <div className="space-y-1 text-sm text-gray-400 mb-8">
          <p>Tourist Information Office</p>
          <p>Plaza Campoamor, 2</p>
          <p>03190 Pilar de la Horadada</p>
          <p>Alicante, Spain</p>
        </div>

        <h3 className="text-lg font-semibold mb-4">{t.links}</h3>
        <div className="space-y-2 text-sm text-gray-400 mb-8">
            <a href="tel:+34965352225" className="block hover:text-blue-400 cursor-pointer transition-colors">Tel: +34 965 35 22 25</a>
            <a href="mailto:turismo@pilardelahoradada.org" className="block hover:text-blue-400 cursor-pointer transition-colors">Email: turismo@pilardelahoradada.org</a>
            <a href="https://www.visitpilardelahoradada.com" target="_blank" rel="noopener noreferrer" className="block hover:text-blue-400 cursor-pointer transition-colors">Web: visitpilardelahoradada.com</a>
        </div>

        <h3 className="text-lg font-semibold mb-4">{t.follow}</h3>
        
        {/* Social Media Buttons */}
        <div className="flex gap-4 mb-6">
            <a 
              href="https://www.facebook.com/turismopilardelahoradada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-[#1877F2] hover:text-white transition-all duration-300 text-gray-300 shadow-lg shadow-black/20"
              aria-label="Facebook"
            >
                <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/visitpilardelahoradada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white transition-all duration-300 text-gray-300 shadow-lg shadow-black/20"
              aria-label="Instagram"
            >
                <Instagram size={20} />
            </a>
            <a 
              href="https://twitter.com/turismopilar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-black hover:text-white transition-all duration-300 text-gray-300 shadow-lg shadow-black/20"
              aria-label="Twitter (X)"
            >
                <Twitter size={20} />
            </a>
            <a 
              href="https://www.youtube.com/@AytoPilarDeLaHoradada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-800 p-2.5 rounded-full hover:bg-[#FF0000] hover:text-white transition-all duration-300 text-gray-300 shadow-lg shadow-black/20"
              aria-label="YouTube"
            >
                <Youtube size={20} />
            </a>
        </div>

        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            {t.desc}
        </p>

        <div className="pt-8 border-t border-gray-800 text-xs text-center text-gray-500 leading-relaxed">
            {t.rights}
        </div>
      </div>
    </footer>
  );
};
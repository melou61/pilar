
import React from 'react';
import { CensusItem } from '../types';
import { Zap, X, MapPin, Tag, Sparkles } from './Icons';

interface BeaconModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: CensusItem;
  t: any; // Se añade el objeto de traducción
}

export const BeaconModal: React.FC<BeaconModalProps> = ({ isOpen, onClose, shop, t }) => {
  if (!isOpen || !shop.promotion) return null;

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-6">
      {/* Premium Backdrop */}
      <div 
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-xl animate-in fade-in duration-700"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-[45px] shadow-[0_40px_100px_rgba(37,99,235,0.4)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-20 duration-500 border border-white/20">
        
        {/* Futuristic Pulse Header */}
        <div className="bg-[#1e40af] p-8 pb-16 relative overflow-hidden text-center">
            {/* Pulsing Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-80 h-80 bg-blue-400/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-[3000ms]"></div>
                <div className="w-64 h-64 bg-blue-300/20 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 bg-white rounded-3xl text-blue-600 shadow-2xl mb-6 flex items-center justify-center rotate-3 group">
                    <Zap size={40} className="fill-current animate-bounce" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                   <Sparkles size={16} className="text-blue-300" />
                   <h2 className="text-xs font-black text-blue-200 uppercase tracking-[0.5em]">{t.beacon.title}</h2>
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{t.beacon.subtitle}</h3>
            </div>

            <button 
                onClick={onClose}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full transition-all backdrop-blur-md z-20 active:scale-90"
            >
                <X size={20} />
            </button>
        </div>

        {/* Floating Content Card */}
        <div className="px-6 pb-8 -mt-10 relative z-10">
            <div className="bg-white rounded-[35px] shadow-2xl p-2 border border-gray-50">
                {/* Shop Brand */}
                <div className="p-6 text-center border-b border-gray-100">
                     <div className="w-20 h-20 mx-auto rounded-[24px] overflow-hidden shadow-xl mb-4 border-4 border-white -mt-12 bg-white">
                         <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="font-black text-gray-900 text-2xl tracking-tight">{shop.name}</h3>
                     <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 mt-2">
                        <MapPin size={12} className="text-red-500" /> {shop.address}
                     </p>
                </div>

                {/* Offer Details */}
                <div className="p-8 text-center bg-blue-50/30 rounded-b-[32px]">
                    <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg shadow-blue-200">
                        <Tag size={12} /> {t.beacon.exclusive}
                    </div>
                    <h4 className="text-2xl font-black text-gray-800 mb-3 tracking-tight leading-tight">{shop.promotion.title}</h4>
                    <p className="text-sm text-gray-500 mb-6 font-medium leading-relaxed italic px-2">
                       "{shop.promotion.description}"
                    </p>

                    {shop.promotion.discountCode && (
                        <div className="border-2 border-dashed border-blue-200 bg-white rounded-2xl p-4 mb-8">
                            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2">{t.beacon.codeLabel}</p>
                            <code className="text-2xl font-black text-blue-600 tracking-[0.3em]">
                                {shop.promotion.discountCode}
                            </code>
                        </div>
                    )}

                    <button 
                        onClick={onClose}
                        className="w-full py-5 bg-[#0f172a] text-white rounded-[24px] font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                        {t.beacon.activate}
                    </button>
                    <p className="text-[8px] text-gray-400 mt-4 font-bold uppercase tracking-widest opacity-50">{t.beacon.footer}</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

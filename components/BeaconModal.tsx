import React from 'react';
import { CensusItem } from '../types';
import { Zap, X, MapPin, Tag } from './Icons';

interface BeaconModalProps {
  isOpen: boolean;
  onClose: () => void;
  shop: CensusItem;
}

export const BeaconModal: React.FC<BeaconModalProps> = ({ isOpen, onClose, shop }) => {
  if (!isOpen || !shop.promotion) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Dynamic Background Effect */}
      <div 
        className="absolute inset-0 bg-blue-900/40 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border-2 border-blue-500/30">
        
        {/* Animated Pulse Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 pb-12 relative overflow-hidden text-center">
            {/* Pulsing Circles Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-64 h-64 bg-white/10 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-1000"></div>
                <div className="w-48 h-48 bg-white/10 rounded-full animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 delay-75"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white p-3 rounded-full text-blue-600 shadow-lg mb-2">
                    <Zap size={32} className="fill-current animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-wider italic">¡Beacon Detectado!</h2>
                <p className="text-blue-100 text-sm font-medium">Tienes una oferta exclusiva cerca de ti</p>
            </div>

            <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-sm z-20"
            >
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 -mt-8 relative z-10">
            <div className="bg-white rounded-2xl shadow-lg p-1">
                {/* Shop Info */}
                <div className="p-4 text-center border-b border-gray-100">
                     <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden shadow-sm mb-3">
                         <img src={shop.images[0]} alt={shop.name} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="font-bold text-gray-900 text-lg">{shop.name}</h3>
                     <p className="text-gray-500 text-xs flex items-center justify-center gap-1 mt-1">
                        <MapPin size={12} /> {shop.address}
                     </p>
                </div>

                {/* Promotion Details */}
                <div className="p-5 text-center bg-blue-50/50 rounded-b-2xl">
                    <span className="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider mb-2">
                        Promo Flash
                    </span>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{shop.promotion.title}</h4>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {shop.promotion.description}
                    </p>

                    {shop.promotion.discountCode && (
                        <div className="border-2 border-dashed border-blue-200 bg-white rounded-xl p-3 mb-4">
                            <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Muestra este código</p>
                            <code className="text-xl font-mono font-bold text-blue-600 tracking-widest">
                                {shop.promotion.discountCode}
                            </code>
                        </div>
                    )}

                    <button 
                        onClick={onClose}
                        className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-transform active:scale-95 flex items-center justify-center gap-2"
                    >
                        <Tag size={18} />
                        Canjear Ahora
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
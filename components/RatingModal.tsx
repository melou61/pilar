
import React, { useState } from 'react';
import { Star, X, Check } from './Icons';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  title: string;
}

export const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, title }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    // Simulate network delay
    setTimeout(() => {
      onSubmit(rating, comment);
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm bg-white rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-50 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-xl font-black text-gray-900 tracking-tighter mb-2">Valorar Experiencia</h3>
          <p className="text-sm text-gray-500 font-medium line-clamp-1">{title}</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="p-1 transition-transform hover:scale-110 active:scale-95 focus:outline-none"
            >
              <Star 
                size={36} 
                className={`${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-100'} transition-colors duration-200`} 
              />
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comparte tu opinión (opcional)..."
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 h-24 resize-none"
          />
          
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl ${
              rating > 0 
                ? 'bg-[#0f172a] text-white hover:bg-black hover:scale-[1.02] active:scale-95' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Enviando...' : (
              <>
                <Check size={16} /> Enviar Reseña
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

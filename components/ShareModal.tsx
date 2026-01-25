
import React, { useState } from 'react';
import { 
  X, Copy, Check, Facebook, Twitter, Linkedin, MessageCircle, Mail, Instagram, Video, Youtube 
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    text: string;
    url: string;
  };
  t: any;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, data, t }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${data.title} - ${data.url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  // 't' is t.share from App.tsx
  const shareLinks = [
    {
      name: t.apps?.whatsapp || 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      url: `https://wa.me/?text=${encodeURIComponent(data.title + ' ' + data.url)}`
    },
    {
      name: t.apps?.facebook || 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(data.url)}`
    },
    {
      name: t.apps?.twitter || 'Twitter',
      icon: Twitter,
      color: 'bg-black',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(data.url)}`
    },
    {
      name: t.apps?.linkedin || 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.url)}`
    },
    {
      name: t.apps?.email || 'Email',
      icon: Mail,
      color: 'bg-gray-600',
      url: `mailto:?subject=${encodeURIComponent(data.title)}&body=${encodeURIComponent(data.text + '\n\n' + data.url)}`
    }
  ];

  const copyPlatforms = [
    {
      name: t.apps?.instagram || 'Instagram',
      icon: Instagram,
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      action: () => { handleCopy(); window.open('https://instagram.com', '_blank'); }
    },
    {
      name: t.apps?.tiktok || 'TikTok',
      icon: Video,
      color: 'bg-black',
      action: () => { handleCopy(); window.open('https://tiktok.com', '_blank'); }
    },
    {
      name: t.apps?.youtube || 'YouTube',
      icon: Youtube, 
      color: 'bg-[#FF0000]',
      action: () => { handleCopy(); window.open('https://youtube.com', '_blank'); }
    }
  ];

  return (
    <div className="fixed inset-0 z-[2100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
        </div>

        <p className="text-sm text-gray-500 mb-6">{t.subtitle}</p>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {shareLinks.map((app) => (
            <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
              <div className={`w-12 h-12 rounded-full ${app.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}><app.icon size={24} /></div>
              <span className="text-xs text-gray-600 font-medium">{app.name}</span>
            </a>
          ))}
        </div>

        <div className="h-px bg-gray-100 mb-6" />

        <div className="space-y-3 mb-6">
           <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t.copyLink} & {t.via} App</p>
           <div className="flex gap-3">
              {copyPlatforms.map((app) => (
                <button key={app.name} onClick={app.action} className="flex-1 flex flex-col items-center gap-2 group">
                   <div className={`w-10 h-10 rounded-xl ${app.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}><app.icon size={20} /></div>
                   <span className="text-[10px] text-gray-600">{app.name}</span>
                </button>
              ))}
           </div>
        </div>

        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-200">
          <input type="text" readOnly value={data.url} className="flex-1 bg-transparent border-none text-sm text-gray-500 focus:ring-0 px-2" />
          <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? t.copied : t.copyLink}
          </button>
        </div>
      </div>
    </div>
  );
};

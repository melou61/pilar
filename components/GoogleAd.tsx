import React, { useEffect, useRef } from 'react';

interface GoogleAdProps {
  slotId?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export const GoogleAd: React.FC<GoogleAdProps> = ({ 
  slotId = "1234567890", // Replace with real default slot ID
  format = 'auto',
  className = ''
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      const adsbygoogle = window.adsbygoogle || [];
      // @ts-ignore
      adsbygoogle.push({});
    } catch (e) {
      console.error("Google Ads error:", e);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden bg-gray-50 border border-gray-100 rounded-lg flex flex-col items-center justify-center min-h-[100px] text-center ${className}`}>
      {/* Visual Placeholder for Development/Demo - AdSense will replace this if configured correctly */}
      <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Google Ads</span>
      
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" /* Replace with your ID */
           data-ad-slot={slotId}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
    </div>
  );
};

import React, { useEffect, useState } from 'react';

/**
 * Renders text that appears normal to the user but is reversed in the DOM/HTML.
 * Scrapers reading the HTML will get the reversed string.
 */
export const SecureText: React.FC<{ text: string; className?: string; as?: any }> = ({ text, className = '', as: Component = 'span' }) => {
  if (!text) return null;
  // Reverse the string logic
  const encoded = text.split('').reverse().join('');
  
  return (
    <Component 
      className={`${className} select-none`} 
      style={{ 
        unicodeBidi: 'bidi-override', 
        direction: 'rtl',
        textAlign: 'left' // Ensures alignment looks normal despite RTL
      }}
      aria-label="Protected Content"
    >
      {encoded}
    </Component>
  );
};

/**
 * Wraps content with random invisible DOM nodes to break structural scrapers (XPath/CSS selector based).
 */
export const SecureBlock: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const noiseCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 noise elements
  
  return (
    <div className={className}>
      {/* Random Noise Before */}
      {Array.from({ length: noiseCount }).map((_, i) => (
        <div key={`n-pre-${i}`} style={{ display: 'none' }} aria-hidden="true" className="random-noise-data">
           {Math.random().toString(36).substring(7)}
        </div>
      ))}
      
      {children}
      
      {/* Random Noise After */}
      {Array.from({ length: noiseCount }).map((_, i) => (
        <div key={`n-post-${i}`} style={{ height: 0, overflow: 'hidden', opacity: 0 }} aria-hidden="true">
           Do not scrape
        </div>
      ))}
    </div>
  );
};

/**
 * Global Security Guard
 * - Disables Right Click
 * - Disables DevTools Shortcuts
 * - Disables Copy/Cut/Paste
 * - Injects Honeypot Data
 */
export const SecurityGuard: React.FC = () => {
  useEffect(() => {
    // 1. Disable Context Menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // 2. Disable DevTools Shortcuts & Copying
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }
      // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Chrome DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return;
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return;
      }
    };

    // 3. Disable Selection/Copy interactions globally
    const preventSelection = (e: Event) => {
       // Allow interaction with inputs/textareas
       const target = e.target as HTMLElement;
       if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
       e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    // Note: Disabling copy globally is aggressive, using CSS user-select: none on body is often better, 
    // but we use listeners for stricter control.
    document.addEventListener('copy', preventSelection);
    document.addEventListener('cut', preventSelection);
    document.addEventListener('dragstart', preventSelection);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('copy', preventSelection);
      document.removeEventListener('cut', preventSelection);
      document.removeEventListener('dragstart', preventSelection);
    };
  }, []);

  // 4. Honeypot Injection (Fake Data for Scrapers)
  // Scrapers blindly iterating typically grab these hidden elements
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', height: 0, overflow: 'hidden' }}>
      <div className="business-card">
        <span className="name">Trap Business Do Not Use</span>
        <span className="phone">+00 000 000 000</span>
        <span className="email">trap@honeypot.com</span>
        <span className="address">Fake Street 123</span>
      </div>
      <div className="user-profile">
        <span className="username">Admin_Root</span>
        <span className="password">123456</span>
      </div>
      <ul className="product-list">
         <li>Fake Product 1 - $0.00</li>
         <li>Fake Product 2 - $9999.00</li>
      </ul>
    </div>
  );
};

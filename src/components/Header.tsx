
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'HOME', href: '/' },
    { label: 'WORK', href: '/#work' },
    { label: 'STACK', href: '/#stack' },
    { label: 'EXPERIENCE', href: '/#experience' },
    { label: 'CERTIFICATES', href: '/#certifications' },
    { label: 'ABOUT', href: '/#about' },
  ];

  return (
    <header className="bg-white border-b-[3px] border-black sticky top-0 z-[100] shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center w-full px-4 md:px-6 py-3 md:py-4">
      <Link to="/" className="flex items-center gap-2 cursor-crosshair active:scale-95 transition-all duration-75 no-underline">
        <span className="material-symbols-outlined text-xl md:text-2xl" data-icon="terminal">terminal</span>
        <span className="text-lg md:text-2xl font-black text-black font-['Space_Grotesk'] uppercase tracking-tighter">MY_PORTOFOLIO</span>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-6">
        {menuItems.map((item) => (
          <a
            key={item.label}
            className="font-['IBM_Plex_Mono'] text-sm font-bold uppercase text-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-crosshair"
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <button className="hidden sm:block bg-primary-container text-black border-[3px] border-black px-4 py-2 font-['IBM_Plex_Mono'] font-bold uppercase tracking-tight hard-shadow neubrutalist-btn text-xs md:text-sm">
          CONTACT
        </button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex items-center justify-center w-10 h-10 border-[3px] border-black bg-white hard-shadow active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
        >
          <span className="material-symbols-outlined">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white border-b-[3px] border-black p-6 flex flex-col gap-4 lg:hidden animate-fade-in-up">
          {menuItems.map((item) => (
            <a
              key={item.label}
              onClick={() => setIsMenuOpen(false)}
              className="font-['IBM_Plex_Mono'] text-lg font-bold uppercase text-black border-2 border-black p-3 hard-shadow bg-surface active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <button className="sm:hidden bg-primary-container text-black border-[3px] border-black px-4 py-4 font-['IBM_Plex_Mono'] font-bold uppercase tracking-tight hard-shadow active:shadow-none active:translate-x-1 active:translate-y-1 mt-4">
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
};

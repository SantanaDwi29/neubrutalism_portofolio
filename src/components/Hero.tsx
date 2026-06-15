

import React, { useState, useEffect } from 'react';
import { DecorativeElements } from './DecorativeElements';

export const Hero: React.FC = () => {
  const roles = [
    "FULL-STACK DEVELOPER",
    "FRONT-END DEVELOPER",
    "BACK-END DEVELOPER",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150;

    const handleTyping = () => {
      const fullText = roles[currentRoleIndex];

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText((prev) =>
          isDeleting
            ? fullText.substring(0, prev.length - 1)
            : fullText.substring(0, prev.length + 1)
        );
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  return (
    <div className="relative">
      <DecorativeElements />
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in-up">
        <div className="md:col-span-8 space-y-8 md:-rotate-1">
          <div className="inline-block bg-tertiary-container border-2 border-black px-4 py-1 hard-shadow text-on-tertiary-container font-label-bold uppercase">
            Available for Work 2026
          </div>
          <h1 className="font-headline-xl text-[48px] leading-tight sm:text-[64px] md:text-headline-xl uppercase min-h-[144px] sm:min-h-[192px]">
            Hi, <br className="hidden sm:block" />I'm  Santa <br className="hidden sm:block" />
            <span className="relative inline-flex items-center min-h-[1.2em]">
              <span className="bg-primary-container px-2">{currentText}</span>
              <span className="inline-block w-4 sm:w-6 h-[36px] sm:h-[48px] md:h-[60px] bg-black animate-pulse ml-2"></span>
              <svg className="absolute -bottom-2 left-0 w-full h-2 opacity-70" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10" fill="none" stroke="black" strokeWidth="4" className="animate-pulse" />
              </svg>
            </span>
          </h1>
          <p className="font-body-lg text-body-lg max-w-xl">
            I am a Full-Stack Developer student from Bali State Polytechnic who is passionate about building intuitive and secure web experiences. Specialized in developing robust SaaS modules with Laravel and React, I focus on creating scalable solutions through efficient system integrations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#work" className="bg-primary text-on-primary border-[3px] border-black px-8 py-4 font-label-bold uppercase hard-shadow neubrutalist-btn flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all no-underline">
              View Projects <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </a>
            <a href="https://drive.google.com/file/d/1XwoxxsxWcmVBZScjTSJ7giGYm07xLilK/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white text-black border-[3px] border-black px-8 py-4 font-label-bold uppercase hard-shadow neubrutalist-btn inline-block text-center active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
              Resume
            </a>
          </div>
        </div>
        <div className="md:col-span-4 relative group mt-8 md:mt-0">
          {/* Decorative Background Elements */}
          <div className="absolute -inset-4 bg-dots opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="absolute -top-6 -right-6 w-20 h-20 md:w-24 md:h-24 bg-secondary-container border-[3px] border-black rounded-full animate-blob-spin"></div>
          <div className="absolute -bottom-4 -left-4 w-12 h-12 md:w-16 md:h-16 bg-tertiary-container border-[3px] border-black hard-shadow"></div>

          {/* Image Container */}
          <div className="relative animate-float mx-auto max-w-[280px] md:max-w-none">
            <div className="aspect-square bg-white border-[3px] border-black hard-shadow-lg overflow-hidden grayscale contrast-125 hover:grayscale-0 active:grayscale-0 transition-all duration-500 cursor-pointer group-hover:hard-shadow-none group-hover:translate-x-2 group-hover:translate-y-2 active:translate-x-2 active:translate-y-2 active:hard-shadow-none">
              <img
                alt="I Made Santana Dwiananda"
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                src="/hero.webp"
              />
            </div>

            {/* Overlay tag */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-on-primary border-[3px] border-black px-3 py-1.5 md:px-4 md:py-2 font-label-bold text-xs md:text-sm uppercase hard-shadow rotate-3 group-hover:-rotate-3 active:-rotate-3 transition-transform">
              Santana.dev
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden bg-primary-container border-y-[3px] border-black py-4 flex whitespace-nowrap mt-12 md:mt-24">
        <div className="flex animate-marquee font-headline-md text-xl md:text-headline-md uppercase font-black space-x-8 md:space-x-12">
          <span>FULL-STACK DEVELOPMENT • SAAS MODULES • LARAVEL • REACT • SYSTEM INTEGRATIONS  • CREATIVE CODING • PHOTOGRAPHER • WEB DESIGN • UI/UX • MOBILE APP DEVELOPMENT • </span>
          <span>FULL-STACK DEVELOPMENT • SAAS MODULES • LARAVEL • REACT • SYSTEM INTEGRATIONS  • CREATIVE CODING • PHOTOGRAPHER • WEB DESIGN • UI/UX • MOBILE APP DEVELOPMENT • </span>
          <span>FULL-STACK DEVELOPMENT • SAAS MODULES • LARAVEL • REACT • SYSTEM INTEGRATIONS  • CREATIVE CODING • PHOTOGRAPHER • WEB DESIGN • UI/UX • MOBILE APP DEVELOPMENT • </span>
        </div>
      </div>
    </div>
  );
};

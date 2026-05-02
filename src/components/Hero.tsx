

import React, { useState, useEffect } from 'react';

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
    <>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in-up">
        <div className="md:col-span-8 space-y-8 md:-rotate-1">
          <div className="inline-block bg-tertiary-container border-2 border-black px-4 py-1 hard-shadow text-on-tertiary-container font-label-bold uppercase">
            Available for Work 2025
          </div>
          <h1 className="font-headline-xl text-[48px] leading-tight sm:text-[64px] md:text-headline-xl uppercase min-h-[3em] sm:min-h-0">
            Hi, <br className="hidden sm:block" />I'm  Santa <br className="hidden sm:block" />
            <span className="bg-primary-container px-2">{currentText}</span>
            <span className="animate-pulse">_</span>
          </h1>
          <p className="font-body-lg text-body-lg max-w-xl">
            I am a Front-End Developer student from Bali State Polytechnic who is passionate about building intuitive web experiences. Armed with a foundation in system development and a commitment to security, I am ready to bring digital innovation. </p>
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
          <span>UI/UX DESIGN • FULL-STACK DEVELOPMENT • BRANDING • MOTION GRAPHICS • CREATIVE CODING • </span>
          <span>UI/UX DESIGN • FULL-STACK DEVELOPMENT • BRANDING • MOTION GRAPHICS • CREATIVE CODING • </span>
          <span>UI/UX DESIGN • FULL-STACK DEVELOPMENT • BRANDING • MOTION GRAPHICS • CREATIVE CODING • </span>
        </div>
      </div>
    </>
  );
};

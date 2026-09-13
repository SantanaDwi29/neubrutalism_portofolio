import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useRef, useState, type MouseEvent } from 'react';
import { TypewriterText } from './TypewriterText';

export const Hero = () => {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const artRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !artRef.current) return;
    const rect = artRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const dynamicTitles = [
    'Full-stack Developer',
    'SaaS Architect',
    'Logic & UI Craftsperson',
    'Web Automation Engineer',
  ];

  return (
    <section id="home" className="hero-layout section-wrap">
      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-3 mb-2 flex-wrap min-h-[32px]">
          <span className="manga-eyebrow text-[var(--color-rose)] font-bold flex items-center gap-1.5 min-w-[200px]">
            <TypewriterText
              words={dynamicTitles}
              typingSpeed={70}
              deletingSpeed={35}
              pauseDuration={2500}
              cursorChar="│"
              cursorClassName="text-[var(--color-rose)] font-extrabold"
            />
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-sand)] text-[var(--color-burgundy)] font-bold shadow-sm">
            フルスタック
          </span>
        </div>

        <h1 className="hero-headline">
          Hi, I'm Santa.{' '}
          <span className="text-xs font-mono text-[var(--color-rose)] uppercase tracking-widest font-normal inline-block">
            「サンタナ」
          </span>
          <br />
          <span className="hero-line">I build for people.</span>
        </h1>

        <p className="hero-description">
          From SaaS platforms to everyday web tools. Thoughtful interfaces, reliable systems, and a little personality.
        </p>

        <div className="flex items-center gap-2 mt-4 text-xs font-mono opacity-85">
          <span>創造と論理 — Creativity, Logic & Software Precision</span>
        </div>

        <div className="hero-actions">
          <a href="#work" className="anime-btn-primary group">
            Explore projects <ArrowDownRight size={18} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a href="#contact" className="text-link">
            Contact me <ArrowUpRight size={18} />
          </a>
        </div>
      </motion.div>

      <div
        ref={artRef}
        className="hero-art cursor-pointer perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="w-full h-full relative"
          animate={reduceMotion ? {} : { rotateY: tilt.x, rotateX: tilt.y }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <div className="hero-art-field" aria-hidden="true" />
          <picture>
            <source srcSet="/hero/hero-optimized.webp" type="image/webp" />
            <img
              src="/hero/hero.png"
              alt="Illustrated portrait of I Made Santana Dwiananda"
              width="738"
              height="1107"
              fetchPriority="high"
              className="hero-portrait-img"
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
};



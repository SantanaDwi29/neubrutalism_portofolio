import { ArrowDownRight, ArrowUpRight, Code2, MapPin, Sparkles, FolderGit2, FileText } from 'lucide-react';
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
    setTilt({ x: x * 14, y: -y * 14 });
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
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Quick redirect links for GitHub & CV */}
        <div className="flex items-center gap-2.5 mb-4 flex-wrap">
          <a
            href="https://github.com/SantanaDwi29"
            target="_blank"
            rel="noreferrer"
            className="anime-tag hover:translate-y-[-2px] transition-transform cursor-pointer font-bold gap-1.5 shadow-sm"
          >
            <FolderGit2 size={14} className="text-[var(--color-rose)]" />
            <span>GitHub Profile</span>
            <ArrowUpRight size={13} />
          </a>

          <a
            href="https://drive.google.com/file/d/1XwoxxsxWcmVBZScjTSJ7giGYm07xLilK/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="anime-tag hover:translate-y-[-2px] transition-transform cursor-pointer font-bold gap-1.5 shadow-sm"
          >
            <FileText size={14} className="text-[var(--color-rose)]" />
            <span>Curriculum Vitae / Credentials</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="flex items-center gap-3 mb-3 flex-wrap min-h-[36px]">
          <span className="manga-eyebrow font-bold flex items-center gap-2">
            <Sparkles size={15} className="animate-pulse-slow hero-sparkle-icon" />
            <TypewriterText
              words={dynamicTitles}
              typingSpeed={70}
              deletingSpeed={35}
              pauseDuration={2500}
              cursorChar="│"
              cursorClassName="hero-typewriter-cursor font-extrabold"
            />
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--color-sand)] text-[var(--color-burgundy)] font-bold shadow-sm border border-[rgba(128,0,32,0.15)] flex items-center gap-1">
            <Code2 size={13} /> フルスタック
          </span>
        </div>

        <h1 className="hero-headline">
          Hi, I'm Santa.{' '}
          <span className="text-xs font-mono hero-jp-tag uppercase tracking-widest font-semibold inline-block ml-1">
            「サンタナ」
          </span>
          <br />
          <span className="hero-line">I build for people.</span>
        </h1>

        <p className="hero-description">
          From SaaS platforms to everyday web tools. Thoughtful interfaces, reliable systems, and a little personality.
        </p>

        <div className="flex items-center gap-3 mt-4 text-xs font-mono opacity-85">
          <MapPin size={14} className="hero-location-pin" />
          <span>Bali, Indonesia — 創造と論理 (Creativity & Software Logic)</span>
        </div>

        <div className="hero-actions">
          <a href="#work" className="anime-btn-primary group">
            Explore projects <ArrowDownRight size={18} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a href="#contact" className="anime-btn-secondary group">
            Contact me <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </motion.div>

      <div
        ref={artRef}
        className="hero-art cursor-pointer perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Soft background glow aura */}
        <div className="hero-art-glow" aria-hidden="true" />

        <motion.div
          className="w-full h-full relative"
          animate={reduceMotion ? {} : { rotateY: tilt.x, rotateX: tilt.y }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          {/* Multi-layered Arch Backdrop */}
          <div className="hero-art-field" aria-hidden="true">
            <span className="hero-corner corner-tl">┌ 01</span>
            <span className="hero-corner corner-tr">開発 ┐</span>
            <span className="hero-corner corner-bl">└ LOGIC</span>
            <span className="hero-corner corner-br">CRAFT ┘</span>
            <span className="hero-watermark">SANTA.DEV</span>
          </div>

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

export default Hero;




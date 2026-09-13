import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export const Hero = () => (
  <section id="home" className="hero-layout section-wrap">
    <div className="hero-copy">
      <div className="flex items-center gap-3 mb-2">
        <span className="manga-eyebrow">Full-stack developer</span>
        <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-sand)] text-[var(--color-burgundy)] font-bold">
          フルスタック
        </span>
      </div>

      <h1>
        Hi, I'm Santa. <span className="text-xs font-mono text-[var(--color-rose)] uppercase tracking-widest font-normal">「サンタナ」</span><br />
        <span className="hero-line">I build for people.</span>
      </h1>

      <p>
        From SaaS platforms to everyday web tools. Thoughtful interfaces, reliable systems, and a little personality.
      </p>

      <div className="flex items-center gap-2 mt-4 text-xs font-mono opacity-80">
        <span>創造と論理 — Creativity, Logic & Software Precision</span>
      </div>

      <div className="hero-actions">
        <a href="#work" className="anime-btn-primary">
          Explore projects <ArrowDownRight size={18} />
        </a>
        <a href="#contact" className="text-link">
          Contact me <ArrowUpRight size={18} />
        </a>
      </div>
    </div>

    <div className="hero-art">
      <div className="hero-art-field" aria-hidden="true" />
      <picture>
        <source srcSet="/hero/hero-optimized.webp" type="image/webp" />
        <img
          src="/hero/hero.png"
          alt="Illustrated portrait of I Made Santana Dwiananda"
          width="738"
          height="1107"
          fetchPriority="high"
        />
      </picture>
    </div>
  </section>
);

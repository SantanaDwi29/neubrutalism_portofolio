import React, { useRef, useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface CursorWiperStageProps {
  baseImage: string;
  revealImage: string;
}

export const CursorWiperStage: React.FC<CursorWiperStageProps> = ({
  baseImage,
  revealImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wipePos, setWipePos] = useState(50);
  const [targetPos, setTargetPos] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  // Buttery-smooth spring/lerp mouse tracking loop
  useEffect(() => {
    let animId: number;

    const updateWipe = () => {
      setWipePos((prev) => {
        const diff = targetPos - prev;
        if (Math.abs(diff) < 0.1) return targetPos;
        return prev + diff * 0.15; // Smooth Lerp factor
      });
      animId = requestAnimationFrame(updateWipe);
    };

    animId = requestAnimationFrame(updateWipe);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setTargetPos(Math.max(2, Math.min(98, x)));
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTargetPos(50); // Return smoothly to center when mouse leaves
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none touch-none h-[580px] md:h-[680px] w-full overflow-hidden cursor-ew-resize group"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Base Layer (Bottom Image: hero.png) */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <img
          src={baseImage}
          alt="Base hero portrait"
          className="w-full h-full object-cover object-[72%_22%]"
        />
      </div>

      {/* Reveal Layer (Top Image: hero_transisi.png) with Dynamic Cursor Clip-Path */}
      <div
        className="absolute inset-0 z-10 w-full h-full transition-[clip-path] duration-75 ease-out"
        style={{
          clipPath: `polygon(0 0, ${wipePos}% 0, calc(${wipePos}% + 35px) 100%, 0 100%)`,
        }}
      >
        <img
          src={revealImage}
          alt="Reveal hero portrait"
          className="w-full h-full object-cover object-[72%_22%]"
        />
      </div>

      {/* Dynamic Glowing Brush Slash Line following Cursor */}
      <div
        className="absolute top-0 bottom-0 z-20 w-1 pointer-events-none transition-transform duration-75 ease-out"
        style={{
          left: `${wipePos}%`,
          transform: 'translateX(-50%) rotate(-4deg)',
        }}
      >
        {/* Glow Line */}
        <div className="h-full w-full bg-gradient-to-b from-transparent via-[var(--manga-red)] to-transparent shadow-[0_0_20px_var(--manga-red),0_0_35px_var(--manga-red)]" />

        {/* Dynamic Handle Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border-2 border-[var(--manga-red)] text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-[0_0_20px_var(--manga-red-glow)] flex items-center gap-1.5 opacity-90 group-hover:scale-110 transition-transform">
          <span className="text-[var(--manga-red)]">↔</span> MOVE CURSOR
        </div>
      </div>

      <div className="brush-glow" />

      {/* Japanese Watermark */}
      <div className="absolute top-6 right-6 font-jp font-black text-3xl md:text-5xl text-white/15 tracking-widest select-none pointer-events-none [writing-mode:vertical-rl] z-20">
        ウブは決して死ぬ
      </div>

      <div className="absolute inset-0 bg-speedlines opacity-30 pointer-events-none z-20" />

      {/* Floating Hover Indicator */}
      <div className="absolute top-4 left-4 z-30 font-mono text-[10px] tracking-widest text-white bg-black/80 px-3.5 py-2 rounded-full border border-white/20 backdrop-blur flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[var(--manga-red)] animate-spin-slow" />
        <span>{isHovered ? 'HOVERING: CURSOR WIPER ACTIVE' : 'MOVE CURSOR LEFT / RIGHT TO WIPE'}</span>
      </div>
    </div>
  );
};

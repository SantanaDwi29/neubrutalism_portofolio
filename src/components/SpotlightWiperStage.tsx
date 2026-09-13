import React, { useEffect, useRef, useState } from 'react';

interface SpotlightWiperStageProps {
  image?: string;
  baseImage?: string;
  revealImage?: string;
}

export const SpotlightWiperStage: React.FC<SpotlightWiperStageProps> = ({
  image = '/hero/hero.png',
  baseImage,
  revealImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [targetPos, setTargetPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const heroSrc = baseImage || image || revealImage;

  // Smooth lerp 2D mouse tracking loop
  useEffect(() => {
    let animId: number;

    const updatePosition = () => {
      setCursorPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return targetPos;
        return {
          x: prev.x + dx * 0.2,
          y: prev.y + dy * 0.2,
        };
      });
      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setTargetPos({ x, y });
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTargetPos({ x: 50, y: 50 });
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none touch-none w-full max-w-full min-h-[500px] lg:min-h-[640px] flex items-center justify-center cursor-crosshair rounded-3xl overflow-hidden group bg-[#101426]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Soft Solid Glow Ring around Cursor */}
      <div
        className="absolute w-80 h-80 rounded-full bg-[#f472b6]/10 blur-3xl pointer-events-none transition-all duration-700 ease-out"
        style={{
          left: `${cursorPos.x}%`,
          top: `${cursorPos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Character Image Stage Container with Edge Fade Mask */}
      <div
        className="relative z-10 w-full max-w-full h-full flex items-center justify-center p-2 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
        }}
      >
        <img
          src={heroSrc}
          alt="Santana full hero portrait"
          className="max-h-[620px] lg:max-h-[740px] xl:max-h-[800px] w-auto max-w-full h-auto object-contain filter contrast-[1.05] brightness-100 drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-[1.015]"
        />
      </div>

      {/* Spotlight Layer - Enhanced Lighting under Cursor */}
      <div
        className="absolute inset-0 z-20 w-full max-w-full h-full pointer-events-none flex items-center justify-center p-2 overflow-hidden transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0.5,
          WebkitMaskImage: `radial-gradient(circle 180px at ${cursorPos.x}% ${cursorPos.y}%, black 0%, black 50%, transparent 100%)`,
          maskImage: `radial-gradient(circle 180px at ${cursorPos.x}% ${cursorPos.y}%, black 0%, black 50%, transparent 100%)`,
        }}
      >
        <img
          src={heroSrc}
          alt=""
          aria-hidden="true"
          className="max-h-[620px] lg:max-h-[740px] xl:max-h-[800px] w-auto max-w-full h-auto object-contain filter brightness-125 contrast-110 drop-shadow-[0_0_35px_rgba(244,114,182,0.4)]"
        />
      </div>

      {/* Precision Cursor Spotlight Ring */}
      {isHovered && (
        <div
          className="absolute z-30 pointer-events-none rounded-full border border-[#f472b6] transition-transform duration-75 ease-out shadow-[0_0_20px_rgba(244,114,182,0.6)]"
          style={{
            width: '130px',
            height: '130px',
            left: `${cursorPos.x}%`,
            top: `${cursorPos.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}

      {/* Subtle Japanese Watermark */}
      <div className="absolute top-6 right-6 font-jp font-black text-3xl md:text-5xl text-white/5 tracking-widest select-none pointer-events-none [writing-mode:vertical-rl] z-20">
        システム設計者
      </div>
    </div>
  );
};

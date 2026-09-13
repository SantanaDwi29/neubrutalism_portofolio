import React, { useState, useEffect } from 'react';

interface DecorativeElementsProps {
  mode?: 'hero' | 'dots' | 'shapes' | 'mixed';
  opacity?: string;
}

export const DecorativeElements: React.FC<DecorativeElementsProps> = ({ opacity = 'opacity-30' }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const checkMobile = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    checkMobile(mediaQuery);
    
    mediaQuery.addEventListener('change', checkMobile);
    return () => mediaQuery.removeEventListener('change', checkMobile);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none ${opacity}`}>
      
      {/* Background Japanese Kanji Particles */}
      {!isMobile && (
        <>
          <div className="kanji-bg-watermark text-[14rem] top-[5%] left-[2%] opacity-[0.03] text-[#FFF9F2]">
            開発
          </div>
          <div className="kanji-bg-watermark text-[18rem] top-[35%] right-[1%] opacity-[0.025] text-[#FFF9F2]">
            技術
          </div>
          <div className="kanji-bg-watermark text-[16rem] bottom-[10%] left-[8%] opacity-[0.03] text-[#FFF9F2]">
            創作
          </div>
        </>
      )}

      {/* Speed lines SVG Accents */}
      {!isMobile && (
        <svg
          className="absolute top-12 left-10 w-[500px] h-[500px] opacity-[0.05] text-[#FFF9F2]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={100 + 100 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={100 + 100 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          ))}
        </svg>
      )}

      {/* Halftone Screentone Grid Matrices */}
      <div className="absolute top-[20%] right-[8%] w-48 h-48 bg-halftone opacity-20" />
      <div className="absolute bottom-[25%] left-[5%] w-64 h-40 bg-halftone opacity-15" />

      {/* Tactical Crosshair Targets (+) */}
      {!isMobile && (
        <>
          <div className="absolute top-[18%] left-[12%] font-mono text-xs text-[#D45060] opacity-50">
            [ + 35.1290 ° N ]
          </div>
          <div className="absolute top-[45%] right-[10%] font-mono text-xs text-[#F3E6D5]/40">
            + TARGET_LOCK
          </div>
          <div className="absolute bottom-[30%] left-[45%] font-mono text-[10px] tracking-widest text-[#D45060] opacity-60">
            // MANGA_PANEL_GRID_SEC_04
          </div>
        </>
      )}

      {/* Solid Ambient Lighting Circles */}
      <div className="absolute top-[10%] left-[45%] w-96 h-96 bg-[#D45060]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[15%] right-[20%] w-80 h-80 bg-[#800020]/15 rounded-full blur-[100px]" />
    </div>
  );
};

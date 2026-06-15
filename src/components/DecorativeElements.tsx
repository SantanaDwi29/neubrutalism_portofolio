import React from 'react';

interface DecorativeElementsProps {
  mode?: 'hero' | 'dots' | 'shapes' | 'mixed';
  opacity?: string;
}

export const DecorativeElements: React.FC<DecorativeElementsProps> = ({ mode = 'mixed', opacity = 'opacity-30' }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none ${opacity}`}>
      {/* Liquid Blobs - vary by mode */}
      {(mode === 'hero' || mode === 'mixed') && (
        <>
          <div className="absolute top-[5%] left-[60%] w-80 h-80 bg-primary-container border-[4px] border-black animate-blob-liquid opacity-60 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-40">
              <path d="M10,50 Q25,25 40,50 T70,50 T100,50" fill="none" stroke="black" strokeWidth="6" />
            </svg>
          </div>
          <div className="absolute bottom-[10%] left-[-5%] w-64 h-64 bg-secondary border-[4px] border-black animate-blob-liquid opacity-40"></div>
        </>
      )}

      {/* Wavy Line SVG */}
      {(mode === 'hero' || mode === 'mixed' || mode === 'shapes') && (
        <div className="absolute top-64 left-0 w-[200%] h-32 opacity-30 overflow-hidden">
          <div className="animate-wave-scroll flex">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-[1000px] h-32 fill-black">
              <path d="M0,50 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,100 L0,100 Z"></path>
            </svg>
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-[1000px] h-32 fill-black">
              <path d="M0,50 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,100 L0,100 Z"></path>
            </svg>
          </div>
        </div>
      )}

      {/* Rectangles and Triangles */}
      {(mode === 'shapes' || mode === 'mixed' || mode === 'hero') && (
        <>
          <div className="absolute top-[15%] left-[10%] w-20 h-20 bg-primary border-[4px] border-black hard-shadow animate-float-slow opacity-90"></div>
          <div className="absolute top-[65%] right-[15%] w-28 h-14 bg-primary-container border-[4px] border-black hard-shadow animate-float-fast rotate-12 opacity-90"></div>
          <div className="absolute bottom-[20%] left-[20%] w-24 h-24 bg-tertiary-container border-[4px] border-black hard-shadow animate-drift -rotate-6 opacity-90"></div>
          
          <div className="absolute top-[40%] right-[20%] w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-secondary-container animate-float-slow rotate-[15deg] opacity-80 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"></div>
          <div className="absolute bottom-[40%] left-[35%] w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-primary animate-float-fast -rotate-[25deg] opacity-70 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"></div>
          
          <div className="absolute top-[10%] right-[40%] w-24 h-24 border-[4px] border-black animate-float-slow opacity-30 rotate-45"></div>
        </>
      )}
      
      {/* Circles/Dots */}
      {(mode === 'dots' || mode === 'mixed' || mode === 'hero') && (
        <>
          <div className="absolute top-[40%] left-[5%] w-10 h-10 bg-black rounded-full animate-pulse opacity-20"></div>
          <div className="absolute bottom-[45%] right-[10%] w-12 h-12 bg-primary border-[4px] border-black rounded-full animate-bounce opacity-90"></div>
          <div className="absolute top-[75%] left-[45%] w-16 h-16 bg-white border-[4px] border-black rounded-full hard-shadow animate-float-slow opacity-100"></div>
          
          <div className="absolute top-[5%] right-[5%] w-40 h-40 bg-dots opacity-40"></div>
          <div className="absolute bottom-[5%] left-[5%] w-56 h-28 bg-dots opacity-30"></div>
          <div className="absolute top-[50%] left-[40%] w-24 h-24 bg-dots opacity-20"></div>

          <div className="absolute top-[15%] left-[45%] w-2 h-2 bg-black rounded-full opacity-40"></div>
          <div className="absolute top-[16%] left-[46%] w-2 h-2 bg-black rounded-full opacity-30"></div>
          <div className="absolute top-[14%] left-[47%] w-2 h-2 bg-black rounded-full opacity-20"></div>
        </>
      )}
      
      {/* Accent Lines */}
      <div className="absolute top-0 left-[20%] w-[3px] h-40 bg-black opacity-10"></div>
      <div className="absolute bottom-0 right-[40%] w-[3px] h-60 bg-black opacity-10"></div>
      <div className="absolute top-[30%] left-0 w-32 h-[3px] bg-black opacity-10"></div>
    </div>
  );
};

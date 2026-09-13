import { RotateCcw } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

interface CanvasBrushStageProps {
  baseImage: string;
  revealImage: string;
}

// 100% Identical Canvas Rendering for both Base and Reveal Layers
function renderCanvasImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const imgRatio = img.width / img.height;
  const canvasRatio = width / height;

  let sWidth = img.width;
  let sHeight = img.height;
  let sx = 0;
  let sy = 0;

  if (canvasRatio > imgRatio) {
    sHeight = img.width / canvasRatio;
    sy = 0; // Focus from top to show full head & face
  } else {
    sWidth = img.height * canvasRatio;
    sx = (img.width - sWidth) / 2;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
}

export const CanvasBrushStage: React.FC<CanvasBrushStageProps> = ({
  baseImage,
  revealImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseCanvasRef = useRef<HTMLCanvasElement>(null);
  const revealCanvasRef = useRef<HTMLCanvasElement>(null);
  const baseImgRef = useRef<HTMLImageElement | null>(null);
  const revealImgRef = useRef<HTMLImageElement | null>(null);

  // Initialize both Base and Reveal Canvas Layers with identical math
  useEffect(() => {
    const container = containerRef.current;
    const baseCanvas = baseCanvasRef.current;
    const revealCanvas = revealCanvasRef.current;
    if (!container || !baseCanvas || !revealCanvas) return;

    const baseCtx = baseCanvas.getContext('2d');
    const revealCtx = revealCanvas.getContext('2d');
    if (!baseCtx || !revealCtx) return;

    let loadedCount = 0;
    const imgBase = new Image();
    const imgReveal = new Image();

    baseImgRef.current = imgBase;
    revealImgRef.current = imgReveal;

    const redraw = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      baseCanvas.width = width;
      baseCanvas.height = height;
      revealCanvas.width = width;
      revealCanvas.height = height;

      // Draw Base Layer
      baseCtx.globalCompositeOperation = 'source-over';
      renderCanvasImage(baseCtx, imgBase, width, height);

      // Draw Reveal Layer
      revealCtx.globalCompositeOperation = 'source-over';
      renderCanvasImage(revealCtx, imgReveal, width, height);
    };

    const checkLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        redraw();
      }
    };

    imgBase.src = baseImage;
    imgBase.onload = checkLoad;

    imgReveal.src = revealImage;
    imgReveal.onload = checkLoad;

    const handleResize = () => {
      if (loadedCount >= 2) redraw();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [baseImage, revealImage]);

  // Reset Reveal Layer
  const handleResetCanvas = () => {
    const container = containerRef.current;
    const revealCanvas = revealCanvasRef.current;
    const revealImg = revealImgRef.current;
    if (!container || !revealCanvas || !revealImg) return;

    const ctx = revealCanvas.getContext('2d');
    if (!ctx) return;

    revealCanvas.width = container.clientWidth;
    revealCanvas.height = container.clientHeight;
    ctx.globalCompositeOperation = 'source-over';
    renderCanvasImage(ctx, revealImg, revealCanvas.width, revealCanvas.height);
  };

  // Erase Reveal Layer on Mouse Move
  const drawBrush = (clientX: number, clientY: number) => {
    const revealCanvas = revealCanvasRef.current;
    if (!revealCanvas) return;

    const ctx = revealCanvas.getContext('2d');
    if (!ctx) return;

    const rect = revealCanvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 60, 0, Math.PI * 2);
    ctx.fill();

    // Calligraphy brush splatter dots
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 80;
      const radius = Math.random() * 14 + 4;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    drawBrush(e.clientX, e.clientY);
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none touch-none h-[580px] md:h-[680px] w-full overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      {/* Base Canvas (Bottom Layer: hero.png) */}
      <canvas
        ref={baseCanvasRef}
        className="absolute inset-0 z-0 w-full h-full"
      />

      {/* Reveal Canvas (Top Layer: hero_transisi.png) */}
      <canvas
        ref={revealCanvasRef}
        className="absolute inset-0 z-10 cursor-crosshair w-full h-full"
      />

      {/* Ambient Glow */}
      <div className="brush-glow" />

      {/* Japanese Watermark */}
      <div className="absolute top-6 right-6 font-jp font-black text-3xl md:text-5xl text-white/15 tracking-widest select-none pointer-events-none [writing-mode:vertical-rl] z-20">
        ウブは決して死ぬ
      </div>

      <div className="absolute inset-0 bg-speedlines opacity-30 pointer-events-none z-20" />

      {/* Reset Button */}
      <div className="absolute bottom-4 right-4 z-30">
        <button
          onClick={handleResetCanvas}
          className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-white bg-black/80 hover:bg-[var(--manga-red)] px-3.5 py-2 rounded-xl border border-white/20 backdrop-blur transition-colors shadow-lg"
        >
          <RotateCcw className="w-3.5 h-3.5" /> RESET INK // 墨リセット
        </button>
      </div>

     
    </div>
  );
};

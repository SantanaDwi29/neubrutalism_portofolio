import React, { useEffect, useRef } from 'react';

interface CursorGridProps {
  gridSize?: number;
  glowRadius?: number;
  className?: string;
}

export const CursorGrid: React.FC<CursorGridProps> = ({
  gridSize = 36,
  glowRadius = 180,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement || window;
    parent.addEventListener('mousemove', handleMouseMove as EventListener);
    parent.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);
      const mouse = mouseRef.current;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gridSize + gridSize / 2;
          const y = r * gridSize + gridSize / 2;

          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let alpha = 0.04;
          let color = 'rgba(255, 249, 242, ';

          if (mouse.active && dist < glowRadius) {
            const intensity = 1 - dist / glowRadius;
            alpha = 0.04 + intensity * 0.7;
            color = 'rgba(212, 80, 96, '; // #D45060
          }

          // Draw small grid crosshair / dot
          ctx.fillStyle = `${color}${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, mouse.active && dist < glowRadius ? 2.5 : 1, 0, Math.PI * 2);
          ctx.fill();

          // Connect adjacent active grid lines if close to mouse
          if (mouse.active && dist < glowRadius * 0.6) {
            const lineAlpha = (1 - dist / (glowRadius * 0.6)) * 0.2;
            ctx.strokeStyle = `rgba(212, 80, 96, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x - gridSize / 2, y - gridSize / 2, gridSize, gridSize);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parent.removeEventListener('mousemove', handleMouseMove as EventListener);
      parent.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, glowRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    />
  );
};

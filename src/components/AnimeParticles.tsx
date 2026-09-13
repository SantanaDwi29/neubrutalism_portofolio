import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  type: 'petal' | 'star';
}

export const AnimeParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(212, 80, 96, ',  // #D45060 (Soft Rose Crimson)
      'rgba(128, 0, 32, ',   // #800020 (Burgundy Wine)
      'rgba(243, 230, 213, ', // #F3E6D5 (Sand Cream)
      'rgba(255, 249, 242, ', // #FFF9F2 (Soft Off-White)
    ];

    const particleCount = Math.min(Math.floor(width / 25), 45);
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      type: Math.random() > 0.4 ? 'petal' : 'star',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          // Draw soft sakura petal
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(p.size, -p.size, p.size * 2, 0, 0, p.size * 2);
          ctx.bezierCurveTo(-p.size * 2, 0, -p.size, -p.size, 0, 0);
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        } else {
          // Draw glowing stardust 4-point star
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(Math.cos((i * Math.PI) / 2) * p.size, Math.sin((i * Math.PI) / 2) * p.size);
            ctx.lineTo(
              Math.cos((i * Math.PI) / 2 + Math.PI / 4) * (p.size * 0.35),
              Math.sin((i * Math.PI) / 2 + Math.PI / 4) * (p.size * 0.35)
            );
          }
          ctx.closePath();
          ctx.fillStyle = `${p.color}${p.opacity})`;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20 opacity-70"
    />
  );
};

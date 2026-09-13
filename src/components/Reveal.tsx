'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** Establish reading order without hiding content or fading the solid palette. */
export const Reveal = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.animate([{ transform: 'translateY(24px)' }, { transform: 'translateY(0)' }], {
        duration: 600, easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      });
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => { observer.disconnect(); element.getAnimations().forEach(animation => animation.cancel()); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
};

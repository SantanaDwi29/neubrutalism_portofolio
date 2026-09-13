import { ArrowUp } from 'lucide-react';

export const Footer = () => (
  <footer className="section-wrap site-footer">
    <div className="flex items-center gap-2">
      <span className="footer-wordmark">SANTANA.DEV</span>
      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-sand)] text-[var(--color-burgundy)] font-bold">
        サンタナ
      </span>
    </div>
    <span>© {new Date().getFullYear()} I Made Santana Dwiananda — Web & SaaS Engineer</span>
    <button
      type="button"
      className="text-link"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}
    >
      Back to top <ArrowUp size={17} />
    </button>
  </footer>
);

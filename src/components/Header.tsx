import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'HOME', href: '#home', num: '01' },
  { label: 'ABOUT', href: '#about', num: '02' },
  { label: 'STACK', href: '#stack', num: '03' },
  { label: 'JOURNEY', href: '#experience', num: '04' },
  { label: 'CERTS', href: '#certs', num: '05' },
  { label: 'WORK', href: '#work', num: '06' },
  { label: 'CONTACT', href: '#contact', num: '07' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const saved = localStorage.getItem('portfolio-theme');
      return saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch { return 'system'; }
  });
  const [systemDark, setSystemDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const dark = theme === 'dark' || (theme === 'system' && systemDark);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setSystemDark(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (theme === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    try {
      if (theme === 'system') localStorage.removeItem('portfolio-theme');
      else localStorage.setItem('portfolio-theme', theme);
    } catch { /* Storage fallback */ }
  }, [theme]);

  useEffect(() => {
    if (!isHomePage) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-15% 0px -55% 0px' });
    const observeSections = () => menuItems.forEach(({ href }) => {
      const section = document.getElementById(href.slice(1));
      if (section) observer.observe(section);
    });
    observeSections();
    const mutationObserver = new MutationObserver(observeSections);
    const mainEl = document.querySelector('main');
    if (mainEl) mutationObserver.observe(mainEl, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutationObserver.disconnect(); };
  }, [isHomePage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="section-wrap h-full flex items-center justify-between gap-4">
        {/* Left: Theme Toggle */}
        <button
          type="button"
          className="icon-button theme-toggle"
          aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={() => setTheme(dark ? 'light' : 'dark')}
          title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Center: Desktop Navigation */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 mx-auto">
          {menuItems.map(({ label, href }) => {
            const isActive = isHomePage && activeSection === href.slice(1);
            return (
              <a
                key={label}
                href={isHomePage ? href : `/${href}`}
                aria-current={isActive ? 'location' : undefined}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        {/* Right: Mobile Menu Toggle / Desktop Balance Spacer */}
        <div className="header-controls">
          <button
            id="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
            className="lg:hidden mobile-menu-btn"
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="font-mono text-xs font-bold">{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
          </button>
          <div className="w-11 h-11 hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* Mobile & Tablet Animated Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mobile-nav-backdrop lg:hidden"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Drawer */}
            <motion.nav
              id="mobile-navigation"
              key="mobile-drawer"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mobile-nav lg:hidden"
            >
              <div className="mobile-nav-inner">
                <div className="mobile-nav-links grid gap-2">
                  {menuItems.map(({ label, href, num }) => {
                    const isActive = isHomePage && activeSection === href.slice(1);
                    return (
                      <a
                        key={label}
                        href={isHomePage ? href : `/${href}`}
                        aria-current={isActive ? 'location' : undefined}
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mobile-nav-num">{num}</span>
                        <span className="mobile-nav-label">{label}</span>
                        {isActive && <span className="mobile-nav-indicator">ACTIVE</span>}
                      </a>
                    );
                  })}
                </div>
                <div className="mobile-nav-footer border-t border-strong pt-4 mt-4 flex flex-col gap-3">
                  <div className="text-xs font-mono font-semibold tracking-wider opacity-75 text-center">
                    FULL STACK DEVELOPER // PORTFOLIO
                  </div>
                  <a
                    href={isHomePage ? '#contact' : '/#contact'}
                    className="anime-btn-primary w-full text-center text-xs justify-center py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    GET IN TOUCH →
                  </a>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};


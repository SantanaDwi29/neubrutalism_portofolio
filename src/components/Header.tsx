import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, Moon, Sun, X } from 'lucide-react';

const menuItems = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'STACK', href: '#stack' },
  { label: 'JOURNEY', href: '#experience' },
  { label: 'CERTS', href: '#certs' },
  { label: 'WORK', href: '#work' },
  { label: 'CONTACT', href: '#contact' },
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
    } catch { /* The switch still works when local storage is unavailable. */ }
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
    mutationObserver.observe(document.querySelector('main')!, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutationObserver.disconnect(); };
  }, [isHomePage]);

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
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 font-extrabold tracking-tight text-ink">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-action text-action-ink">
            <Code2 className="h-5 w-5" />
          </span>
          <span>SANTANA.DEV</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {menuItems.map(({ label, href }) => (
            <a key={label} href={isHomePage ? href : `/${href}`}
              aria-current={isHomePage && activeSection === href.slice(1) ? 'location' : undefined}
              className="nav-link">{label}</a>
          ))}
        </nav>
        <div className="header-controls">
        <button type="button" className="icon-button theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          onClick={() => setTheme(dark ? 'light' : 'dark')}>
          {dark ? <Sun size={19} /> : <Moon size={19} />}
        </button>
        <button id="menu-toggle" type="button" aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-navigation" aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((value) => !value)}
          className="lg:hidden bg-surface text-ink border border-strong rounded-xl min-h-11 px-3 flex items-center gap-2 font-mono text-xs font-bold">
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          {isMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav grid gap-2 lg:hidden">
          {menuItems.map(({ label, href }) => (
            <a key={label} href={isHomePage ? href : `/${href}`} className="nav-link"
              aria-current={isHomePage && activeSection === href.slice(1) ? 'location' : undefined}
              onClick={() => setIsMenuOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </header>
  );
};

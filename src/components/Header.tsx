

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-zinc-900 border-b-[3px] border-black dark:border-white sticky top-0 z-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex justify-between items-center w-full px-6 py-4">
      <div className="flex items-center gap-2 cursor-crosshair active:scale-95 transition-all duration-75">
        <span className="material-symbols-outlined text-2xl" data-icon="terminal">terminal</span>
        <span className="text-2xl font-black text-black dark:text-white font-['Space_Grotesk'] uppercase tracking-tighter">PORTFOLIO_OS</span>
      </div>
      <nav className="hidden md:flex items-center gap-8">
        <a className="font-['IBM_Plex_Mono'] text-sm font-bold uppercase underline decoration-[4px] decoration-[#ff7f50] underline-offset-4 cursor-crosshair" href="/">HOME</a>
        <a className="font-['IBM_Plex_Mono'] text-sm font-bold uppercase text-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-crosshair" href="/#work">WORK</a>
        <a className="font-['IBM_Plex_Mono'] text-sm font-bold uppercase text-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-crosshair" href="/#stack">STACK</a>
        <a className="font-['IBM_Plex_Mono'] text-sm font-bold uppercase text-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-crosshair" href="/#experience">EXPERIENCE</a>
        <a className="font-['IBM_Plex_Mono'] text-sm font-bold uppercase text-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-crosshair" href="/#certifications">CERTIFICATES</a>
        <a className="font-['IBM_Plex_Mono'] text-sm font-bold uppercase text-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-crosshair" href="/#about">ABOUT</a>
      </nav>
      <button className="bg-primary-container text-black border-[3px] border-black px-4 py-2 font-['IBM_Plex_Mono'] font-bold uppercase tracking-tight hard-shadow neubrutalist-btn">
        CONTACT
      </button>
    </header>
  );
};

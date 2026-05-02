

export const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-primary-container dark:bg-primary-container border-t-[3px] border-black w-full flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-['Space_Grotesk'] font-black text-2xl uppercase tracking-tighter">PORTFOLIO_OS</span>
          <span className="font-['IBM_Plex_Mono'] font-bold uppercase text-sm">©2024 I MADE SANTANA DWIANANDA</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="text-black hover:bg-black hover:text-white p-2 transition-colors hover:skew-x-2 border-2 border-transparent hover:border-black rounded-sm flex items-center justify-center" href="https://github.com/SantanaDwi29" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.05 5.05 0 0 0-1.5-3.8c.16-.38.5-1.9-.15-3.8-1.2-.38-3.9 1.5-3.9 1.5A13.4 13.4 0 0 0 12 3a13.4 13.4 0 0 0-3.9.15s-2.7-1.9-3.9-1.5c-.65 1.9-.3 3.42-.15 3.8A5.05 5.05 0 0 0 3 8.83c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 9 19v3"/><path d="M9 20c-4.2 1.4-5.6-2-5.6-2"/></svg>
          </a>
          <a className="text-black hover:bg-black hover:text-white p-2 transition-colors hover:skew-x-2 border-2 border-transparent hover:border-black rounded-sm flex items-center justify-center" href="https://www.linkedin.com/in/i-made-santana-dwiananda/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a className="text-black hover:bg-black hover:text-white p-2 transition-colors hover:skew-x-2 border-2 border-transparent hover:border-black rounded-sm flex items-center justify-center" href="https://www.instagram.com/santanamade?igsh=YmdjNDB6dW4xcHg5" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a className="text-black hover:bg-black hover:text-white p-2 transition-colors hover:skew-x-2 border-2 border-transparent hover:border-black rounded-sm flex items-center justify-center" href="https://drive.google.com/file/d/1XwoxxsxWcmVBZScjTSJ7giGYm07xLilK/view?usp=sharing" target="_blank" rel="noopener noreferrer" aria-label="CV">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          </a>
        </div>
      </footer>

      {/* BottomNavBar (Tablet/Mobile Only) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md border-[3px] border-black bg-white flex justify-around items-center p-4 z-50 hard-shadow">
        <a className="bg-primary-container text-black border-2 border-black scale-110 p-2 flex items-center justify-center cursor-crosshair active:translate-y-1 active:shadow-none transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="home" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
        </a>
        <a className="text-black p-2 flex items-center justify-center hover:bg-cyan-400 transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="code">code</span>
        </a>
        <a className="text-black p-2 flex items-center justify-center hover:bg-cyan-400 transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="folder_open">folder_open</span>
        </a>
        <a className="text-black p-2 flex items-center justify-center hover:bg-cyan-400 transition-all" href="#">
          <span className="material-symbols-outlined" data-icon="person">person</span>
        </a>
      </nav>
    </>
  );
};



export const Footer: React.FC = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-[#FFE566] dark:bg-yellow-400 border-t-[3px] border-black w-full flex flex-col md:flex-row justify-between items-center px-8 py-12 gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-['Space_Grotesk'] font-black text-2xl uppercase tracking-tighter">PORTFOLIO_OS</span>
          <span className="font-['IBM_Plex_Mono'] font-bold uppercase text-sm">©2024 I MADE SANTANA DWIANANDA</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          <a className="font-['IBM_Plex_Mono'] font-bold uppercase text-black hover:bg-black hover:text-white px-2 py-1 transition-colors hover:skew-x-2" href="#">GITHUB</a>
          <a className="font-['IBM_Plex_Mono'] font-bold uppercase text-black hover:bg-black hover:text-white px-2 py-1 transition-colors hover:skew-x-2" href="#">LINKEDIN</a>
          <a className="font-['IBM_Plex_Mono'] font-bold uppercase text-black hover:bg-black hover:text-white px-2 py-1 transition-colors hover:skew-x-2" href="#">TWITTER</a>
          <a className="font-['IBM_Plex_Mono'] font-bold uppercase text-black hover:bg-black hover:text-white px-2 py-1 transition-colors hover:skew-x-2" href="#">EMAIL</a>
        </div>
      </footer>

      {/* BottomNavBar (Tablet/Mobile Only) */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md border-[3px] border-black bg-white flex justify-around items-center p-4 z-50 hard-shadow">
        <a className="bg-[#FFE566] text-black border-2 border-black scale-110 p-2 flex items-center justify-center cursor-crosshair active:translate-y-1 active:shadow-none transition-all" href="#">
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

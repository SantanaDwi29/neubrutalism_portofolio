

export const Contact: React.FC = () => {
  return (
    <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-7 bg-white border-[3px] border-black p-8 md:p-12 hard-shadow space-y-6 rotate-1">
        <h2 className="font-headline-md text-headline-md uppercase">The Philosophy</h2>
        <p className="font-body-lg text-body-lg">
          I believe the internet is becoming too soft. My work is a response to the homogenization of digital design. I build tools that feel like physical objects—heavy, tactile, and permanent.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="font-label-bold uppercase text-secondary">01. Utility</span>
            <p className="text-sm">Function first, but never boring.</p>
          </div>
          <div className="space-y-2">
            <span className="font-label-bold uppercase text-secondary">02. Chaos</span>
            <p className="text-sm">Controlled asymmetry for focus.</p>
          </div>
        </div>
      </div>
      <div className="md:col-span-5 bg-black text-white p-8 md:p-12 hard-shadow flex flex-col justify-between -rotate-1">
        <div className="space-y-4">
          <h2 className="font-headline-md text-headline-md uppercase text-primary-container">Let's talk.</h2>
          <p className="font-body-md opacity-80">Currently accepting new projects for Q4 2024.</p>
        </div>
        <div className="mt-8 space-y-4">
          <a className="block text-xl font-headline-md uppercase border-b-2 border-primary-container pb-2 hover:text-primary-container transition-colors" href="mailto:hello@santana.os">hello@santana.os</a>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-primary-container" data-icon="link">link</span>
            <div className="flex gap-4 items-center font-label-bold uppercase text-xs">
              <a className="hover:text-primary-container transition-colors" href="https://github.com/SantanaDwi29" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17a5.05 5.05 0 0 0-1.5-3.8c.16-.38.5-1.9-.15-3.8-1.2-.38-3.9 1.5-3.9 1.5A13.4 13.4 0 0 0 12 3a13.4 13.4 0 0 0-3.9.15s-2.7-1.9-3.9-1.5c-.65 1.9-.3 3.42-.15 3.8A5.05 5.05 0 0 0 3 8.83c0 5.77 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 9 19v3" /><path d="M9 20c-4.2 1.4-5.6-2-5.6-2" /></svg>
              </a>
              <a className="hover:text-primary-container transition-colors" href="https://www.instagram.com/santanamade?igsh=YmdjNDB6dW4xcHg5" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </a>
              <a className="hover:text-primary-container transition-colors" href="https://www.linkedin.com/in/i-made-santana-dwiananda/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

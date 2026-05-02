

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
            <div className="flex gap-4 font-label-bold uppercase text-xs">
              <a className="hover:underline" href="#">Github</a>
              <a className="hover:underline" href="#">Dribbble</a>
              <a className="hover:underline" href="#">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

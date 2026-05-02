

export const TechStack: React.FC = () => {
  return (
    <section id="stack" className="space-y-12">
      <h2 className="font-headline-lg text-headline-lg uppercase flex items-center gap-4">
        <span className="material-symbols-outlined text-4xl" data-icon="code">code</span> Tech Stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Stack Cards */}
        <div className="bg-white border-[3px] border-black p-6 hard-shadow rotate-1 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="javascript">javascript</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">Frontend</h3>
          <p className="font-body-md text-sm">React, Next.js, Tailwind, GSAP, Three.js</p>
        </div>
        <div className="bg-tertiary-container border-[3px] border-black p-6 hard-shadow -rotate-1 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="database">database</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">Backend</h3>
          <p className="font-body-md text-sm">Node.js, PostgreSQL, MongoDB, Redis</p>
        </div>
        <div className="bg-secondary-container border-[3px] border-black p-6 hard-shadow rotate-2 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="brush">brush</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">Design</h3>
          <p className="font-body-md text-sm">Figma, Adobe CC, Blender, Typography</p>
        </div>
        <div className="bg-surface-container-highest border-[3px] border-black p-6 hard-shadow -rotate-2 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="terminal">terminal</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">DevOps</h3>
          <p className="font-body-md text-sm">Docker, AWS, Vercel, CI/CD Pipelines</p>
        </div>
      </div>
    </section>
  );
};

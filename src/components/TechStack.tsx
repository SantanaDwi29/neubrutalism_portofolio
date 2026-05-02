

export const TechStack: React.FC = () => {
  return (
    <section id="stack" className="space-y-12">
      <h2 className="font-headline-lg text-headline-lg uppercase flex items-center gap-4">
        <span className="material-symbols-outlined text-4xl" data-icon="code">code</span> Tech Stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {/* Stack Cards */}
        <div className="bg-white border-[3px] border-black p-6 hard-shadow rotate-1 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="javascript">javascript</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">Frontend</h3>
          <p className="font-body-md text-sm">React, Next.js, Tailwind, Bootstrap</p>
        </div>
        <div className="bg-tertiary-container text-white border-[3px] border-black p-6 hard-shadow -rotate-1 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="database">database</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">Backend</h3>
          <p className="font-body-md text-sm">Node.js, PostgreSQL, MongoDB, Redis, Mysql, PHP, Laravel, CI</p>
        </div>
        <div className="bg-secondary-container text-white border-[3px] border-black p-6 hard-shadow rotate-2 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="brush">brush</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">Design</h3>
          <p className="font-body-md text-sm">Figma, Adobe PS, Adobe Illustrator, Adobe Premiere, Typography</p>
        </div>
        <div className="bg-surface-container-highest text-white border-[3px] border-black p-6 hard-shadow -rotate-2 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="terminal">terminal</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">DevOps</h3>
          <p className="font-body-md text-sm">Docker, AWS, Vercel, CI/CD Pipelines</p>
        </div>
        <div className="bg-primary-container border-[3px] border-black p-6 hard-shadow rotate-1 hover:rotate-0 transition-transform cursor-crosshair">
          <span className="material-symbols-outlined text-4xl mb-4 block" data-icon="smartphone">smartphone</span>
          <h3 className="font-headline-md text-xl uppercase mb-2">Mobile</h3>
          <p className="font-body-md text-sm">Flutter, Dart, Java</p>
        </div>
      </div>
    </section>
  );
};

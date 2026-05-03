import React from 'react';
import { Link } from 'react-router-dom';
import { DecorativeElements } from './DecorativeElements';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative space-y-12">
      <DecorativeElements mode="shapes" opacity="opacity-30" />
      <h2 className="font-headline-lg text-3xl md:text-headline-lg uppercase flex items-center gap-4 flex-wrap">
        <span className="material-symbols-outlined text-3xl md:text-4xl" data-icon="work_history">work_history</span> Experience
      </h2>

      <div className="space-y-6">
        {/* Full Time */}
        <div className="bg-primary-container border-[3px] border-black p-6 md:p-8 hard-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:-translate-y-1 transition-transform">
          <div>
            <div className="inline-block bg-white border-2 border-black px-3 py-1 mb-4 font-label-bold uppercase text-xs">
              Freelancer
            </div>
            <h3 className="font-headline-md text-2xl uppercase mb-1">Web Developer</h3>
            <p className="font-body-lg text-lg font-bold">CV Sinar Teknologi Indonesia</p>
          </div>
          <div className="bg-white border-2 border-black px-4 py-2 font-label-bold uppercase text-sm whitespace-nowrap hard-shadow">
            Feb 2026 - Present
          </div>
        </div>

        {/* Internship */}
        <div className="bg-tertiary-container text-white border-[3px] border-black p-6 md:p-8 hard-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:-translate-y-1 transition-transform">
          <div className="space-y-4">
            <div>
              <div className="inline-block bg-white text-black border-2 border-black px-3 py-1 mb-2 font-label-bold uppercase text-xs">
                Internship
              </div>
              <h3 className="font-headline-md text-2xl uppercase mb-1">Web Developer Intern</h3>
              <p className="font-body-lg text-lg font-bold">CV Sinar Teknologi Indonesia</p>
            </div>
            <Link to="/project/kitagiat" className="inline-flex items-center gap-2 bg-white text-black border-2 border-black px-4 py-1 font-label-bold uppercase text-xs hard-shadow-sm hover:bg-primary-container transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
              View Project <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
            </Link>
          </div>
          <div className="bg-white text-black border-2 border-black px-4 py-2 font-label-bold uppercase text-sm whitespace-nowrap hard-shadow">
            Aug 2025 - Jan 2026
          </div>
        </div>
      </div>
    </section>
  );
};

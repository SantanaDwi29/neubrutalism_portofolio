

import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { DecorativeElements } from './DecorativeElements';

export const Projects = () => {
  const [showAllTeam, setShowAllTeam] = React.useState(false);
  const internshipProjects = projects.filter(p => p.type === 'Internship' || p.type === 'Team');
  const individualProjects = projects.filter(p => p.type === 'Individual');

  const displayedTeamProjects = showAllTeam ? internshipProjects : internshipProjects.slice(0, 3);

  return (
    <section id="work" className="relative space-y-16">
      <DecorativeElements mode="mixed" opacity="opacity-30" />
      <div className="flex justify-between items-center md:items-end flex-wrap gap-4">
        <div className="space-y-2">
          <h2 className="font-headline-lg text-3xl md:text-headline-lg uppercase">Selected Works</h2>
          <p className="font-body-md text-on-surface/70 max-w-xl">
            A collection of my recent projects, categorized by my role and project nature.
          </p>
        </div>

        {!showAllTeam && internshipProjects.length > 3 && (
          <button 
            onClick={() => setShowAllTeam(true)}
            className="font-label-bold uppercase underline decoration-2 underline-offset-4 mb-2 hover:text-primary transition-colors"
          >
            View All ({projects.length})
          </button>
        )}
      </div>

      {/* Internship / Team Projects Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="bg-tertiary text-white px-4 py-1 font-label-bold uppercase border-2 border-black rotate-1">Team & Internship</span>
          <div className="h-[2px] bg-black flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {displayedTeamProjects.map((project) => (
            <div key={project.id} className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 bg-surface-container-high border-[3px] border-black hard-shadow-lg overflow-hidden group">
              <Link to={`/project/${project.id}`} className="h-64 md:h-[380px] border-b-[3px] md:border-b-0 md:border-r-[3px] border-black overflow-hidden relative block bg-surface-dim">
                <img 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" 
                  src={project.images[0]}
                />
                <div className="absolute top-4 left-4 bg-[#FACC15] text-black border-2 border-black px-3 py-1 text-[10px] font-label-bold uppercase -rotate-2 hard-shadow-sm">
                  Featured Project
                </div>
              </Link>
              <div className="p-6 md:p-10 space-y-4 flex flex-col justify-center">
                <div className="flex gap-2">
                  <span className="bg-primary-container border-2 border-black px-2 py-0.5 text-[10px] font-label-bold uppercase rotate-1">{project.category}</span>
                  <span className="bg-tertiary-container text-white border-2 border-black px-2 py-0.5 text-[10px] font-label-bold uppercase -rotate-1">{project.year}</span>
                </div>
                <h3 className="font-headline-md text-2xl md:text-3xl uppercase leading-tight">{project.title}</h3>
                <p className="font-body-md text-base opacity-80 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 5).map((t, i) => (
                    <span key={i} className="font-label-bold text-[9px] uppercase border border-black/30 px-2 py-0.5 bg-white/50">#{t}</span>
                  ))}
                </div>
                <Link to={`/project/${project.id}`} className="bg-black text-white px-6 py-2 font-label-bold uppercase hover:bg-primary transition-colors flex items-center gap-2 w-max mt-2 hard-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                  View Case Study <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button for Team Projects */}
        {!showAllTeam && internshipProjects.length > 3 && (
          <div className="flex justify-center pt-4">
            <button 
              onClick={() => setShowAllTeam(true)}
              className="bg-white border-[3px] border-black px-8 py-3 font-label-bold uppercase hover:bg-black hover:text-white transition-all hard-shadow active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center gap-2"
            >
              View More Team Projects <span className="material-symbols-outlined" data-icon="expand_more">expand_more</span>
            </button>
          </div>
        )}
      </div>

      {/* Individual Projects Section */}
      <div className="space-y-8 pt-8">
        <div className="flex items-center gap-4">
          <span className="bg-primary text-white px-4 py-1 font-label-bold uppercase border-2 border-black -rotate-1">Individual Works</span>
          <div className="h-[2px] bg-black flex-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {individualProjects.map((project, index) => (
            <div key={project.id} 
                 className={`bg-white border-[3px] border-black hard-shadow flex flex-col group transition-transform hover:-translate-y-1 ${index % 2 === 0 ? 'md:rotate-1' : 'md:-rotate-1'}`}>
              <Link to={`/project/${project.id}`} className="h-48 border-b-[3px] border-black overflow-hidden block">
                <img 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                  src={project.images[0]}
                />
              </Link>
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <span className="bg-secondary-container text-white border-2 border-black px-2 py-0.5 text-[10px] font-label-bold uppercase">{project.category}</span>
                  <span className="font-label-bold text-xs">{project.year}</span>
                </div>
                <h3 className="font-headline-md text-xl uppercase group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="font-body-md text-sm line-clamp-2 opacity-70">{project.description}</p>
                <div className="pt-4 mt-auto">
                  <Link to={`/project/${project.id}`} className="block w-full text-center border-[3px] border-black py-2 font-label-bold uppercase hover:bg-black hover:text-white transition-colors hard-shadow-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useEffect, useState } from 'react';

export const ProjectDetail = () => {
  const { id } = useParams();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const project = projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!project && id) {
      console.error(`Project with id ${id} not found`);
    }

    // Auto-play slideshow
    if (project && project.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval);
    }
  }, [id, project]);

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="font-headline-xl text-4xl uppercase">Project Not Found</h1>
        <Link to="/" className="bg-black text-white px-6 py-3 font-label-bold uppercase neubrutalist-btn">
          Back to Home
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <main className="max-w-[1024px] mx-auto px-6 py-12 md:py-24 space-y-16">
      
      {/* Back Navigation */}
      <div>
        <Link to="/" className="inline-flex items-center gap-2 font-label-bold uppercase bg-white border-[3px] border-black px-4 py-2 hard-shadow neubrutalist-btn">
          <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
          Back to Projects
        </Link>
      </div>

      {/* Header Section */}
      <section className="space-y-6">
        <div className="flex gap-2">
          <span className={`${project.color || 'bg-primary-container'} border-2 border-black px-4 py-2 font-label-bold uppercase rotate-1 hard-shadow`}>
            {project.category}
          </span>
          <span className="bg-tertiary-container text-white border-2 border-black px-4 py-2 font-label-bold uppercase -rotate-1 hard-shadow">
            {project.year}
          </span>
          <span className="bg-white border-2 border-black px-4 py-2 font-label-bold uppercase rotate-2 hard-shadow">
            {project.type}
          </span>
        </div>
        <h1 className="font-headline-xl text-4xl md:text-7xl uppercase border-b-[6px] border-black pb-4">
          {project.title}
        </h1>
      </section>

      {/* Hero Image / Slideshow */}
      <div className="relative group">
        <div className="w-full h-64 md:h-[600px] border-[3px] border-black hard-shadow-lg overflow-hidden rotate-1 bg-[#1A1A1A] flex items-center justify-center">
          <img 
            src={project.images[currentImageIndex]} 
            alt={`${project.title} - Image ${currentImageIndex + 1}`} 
            className="max-w-full max-h-full object-contain opacity-95 group-hover:opacity-100 transition-all duration-700" 
          />
        </div>

        {/* Slider Controls */}
        {project.images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <button 
              onClick={prevImage}
              className="pointer-events-auto bg-white border-[3px] border-black p-2 hard-shadow hover:bg-primary-container transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span className="material-symbols-outlined block" data-icon="chevron_left">chevron_left</span>
            </button>
            <button 
              onClick={nextImage}
              className="pointer-events-auto bg-white border-[3px] border-black p-2 hard-shadow hover:bg-primary-container transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span className="material-symbols-outlined block" data-icon="chevron_right">chevron_right</span>
            </button>
          </div>
        )}

        {/* Slider Indicators */}
        {project.images.length > 1 && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {project.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 border-2 border-black ${index === currentImageIndex ? 'bg-black' : 'bg-white'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
        
        {/* Left Column - Info */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-white border-[3px] border-black p-6 hard-shadow -rotate-1">
            <h3 className="font-headline-md text-2xl uppercase border-b-2 border-black pb-2 mb-4">Role</h3>
            <p className="font-body-md font-bold">{project.role}</p>
          </div>
          
          <div className="bg-surface-container-highest border-[3px] border-black p-6 hard-shadow rotate-1">
            <h3 className="font-headline-md text-2xl uppercase border-b-2 border-black pb-2 mb-4 text-white">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="bg-white border-2 border-black px-2 py-1 font-label-bold text-xs uppercase">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="md:col-span-8 bg-surface-container text-black border-[3px] border-black p-8 md:p-12 hard-shadow space-y-8">
          <div>
            <h2 className="font-headline-lg text-3xl uppercase mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-4xl" data-icon="info">info</span>
              Overview
            </h2>
            <p className="font-body-lg text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="bg-white text-black border-[3px] border-black p-6 shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline-md text-2xl uppercase mb-4 text-primary">The Challenge</h2>
            <p className="font-body-md">
              {project.challenges}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 text-center bg-primary text-white border-[3px] border-black py-4 font-label-bold uppercase text-xl hard-shadow neubrutalist-btn flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                Live Demo <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
              </a>
            )}
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 text-center bg-white text-black border-[3px] border-black py-4 font-label-bold uppercase text-xl hard-shadow neubrutalist-btn flex items-center justify-center gap-2 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                Source Code <span className="material-symbols-outlined text-sm" data-icon="code">code</span>
              </a>
            )}
          </div>
        </div>

      </section>
    </main>
  );
};



'use client';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects, type Project } from '../data/projects';
import { ExternalLink, ArrowUpRight, Search, Plus, X, FolderGit2 } from 'lucide-react';
import { TechIcon } from './TechIcon';

const categories = ['All', ...new Set(projects.map(project => project.category))];
const displayCategory = (category: string) => category === 'SaaS MODULE' ? 'SaaS' : category === 'All' ? 'All work' : category.charAt(0) + category.slice(1).toLowerCase();

const ProjectCard = ({ project, featured = false }: { project: Project; featured?: boolean }) => (
  <article className={`anime-card project-card ${featured ? 'project-featured' : ''}`}>
    <Link to={`/project/${project.id}`} className="project-image-link" aria-label={`Explore ${project.title}`}>
      <img src={project.images[0]} alt={`${project.title} interface`} loading="lazy" width="1600" height="1000" />
    </Link>
    <div className="project-body">
      <div className="project-meta"><span>{displayCategory(project.category)}</span><span>{project.year}</span></div>
      <h3><Link to={`/project/${project.id}`}>{project.title}</Link></h3>
      <p className={featured ? '' : 'project-description'}>{project.description}</p>
      <div className="skill-tags">
        {project.tech.slice(0, featured ? 4 : 3).map(tech => (
          <span key={tech} className="tech-badge-item">
            <TechIcon name={tech} size={15} />
          </span>
        ))}
      </div>
      <div className="project-actions">
        <Link to={`/project/${project.id}`} className={featured ? 'anime-btn-primary' : 'text-link'}>
          View project <ArrowUpRight size={18} />
        </Link>
        {featured && project.liveLink && (
          <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-link">
            Live demo <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  </article>
);

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);

  const query = searchQuery.trim().toLowerCase();
  const filtered = projects.filter(project =>
    (selectedCategory === 'All' || project.category === selectedCategory) &&
    (!query || [project.title, project.description, ...project.tech].some(text => text.toLowerCase().includes(query)))
  );

  const resetFilters = () => { setSelectedCategory('All'); setSearchQuery(''); setVisibleCount(5); };

  return (
    <section id="work" className="section-wrap">
      <div className="work-heading">
        <div className="section-heading">
          <span className="manga-eyebrow text-rose-600 flex items-center gap-2">
            <FolderGit2 size={16} /> 実績・作品 — Featured Projects & Case Studies
          </span>
          <h2>Real problems.<br /><span className="highlight">Working solutions.</span></h2>
          <p>A selection of what I've been building. Open a project to see the details.</p>
        </div>
        <div className="project-search">
          <label htmlFor="project-search">Find a project</label>
          <div>
            <Search size={18} aria-hidden="true" />
            <input id="project-search" type="search" placeholder="Try React or Laravel" value={searchQuery}
              onChange={event => { setSearchQuery(event.target.value); setVisibleCount(5); }} />
          </div>
        </div>
      </div>
      <div className="project-filters" role="group" aria-label="Filter projects by category">
        {categories.map(category => (
          <button key={category} type="button" aria-pressed={selectedCategory === category}
            onClick={() => { setSelectedCategory(category); setVisibleCount(5); }}>
            {displayCategory(category)}
            <span>{category === 'All' ? projects.length : projects.filter(project => project.category === category).length}</span>
          </button>
        ))}
      </div>
      <div className="project-results">
        <p role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          {query ? ` matching “${searchQuery.trim()}”` : ' to explore'}
        </p>
        {(selectedCategory !== 'All' || query) && (
          <button type="button" onClick={resetFilters}>Reset filters <X size={14} /></button>
        )}
      </div>
      {filtered.length ? (
        <div key={`${selectedCategory}-${query}`} className="project-collection">
          <ProjectCard project={filtered[0]} featured />
          <div className="project-grid">
            {filtered.slice(1, visibleCount).map(project => <ProjectCard key={project.id} project={project} />)}
          </div>
        </div>
      ) : (
        <div className="anime-card empty-projects">
          <Search size={32} aria-hidden="true" />
          <h3>No projects found.</h3>
          <p>Try another technology or choose a different category.</p>
          <button type="button" className="anime-btn-primary" onClick={resetFilters}>Show all work <ArrowUpRight size={18} /></button>
        </div>
      )}
      {visibleCount < filtered.length && (
        <div className="load-more">
          <button type="button" className="anime-btn-secondary" onClick={() => setVisibleCount(count => count + 4)}>
            More projects <Plus size={18} />
          </button>
          <span>{Math.min(visibleCount, filtered.length)} of {filtered.length} shown</span>
        </div>
      )}
    </section>
  );
};

export default Projects;

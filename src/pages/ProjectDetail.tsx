import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, FolderGit2, Loader2 } from 'lucide-react';
import { type Project } from '../data/projects';
import { getProjects } from '../services/projectService';
import { TechIcon } from '../components/TechIcon';

export const ProjectDetail = () => {
  const { id } = useParams();
  return <ProjectDetailContent key={id} id={id} />;
};

const ProjectDetailContent = ({ id }: { id: string | undefined }) => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImage, setFailedImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    getProjects().then(data => {
      if (isMounted) {
        setProjectList(data);
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  if (isLoading) {
    return (
      <main id="main-content" className="section-wrap flex items-center justify-center p-20 gap-3 text-slate-400 font-mono">
        <Loader2 size={24} className="animate-spin text-rose-500" /> Loading project details...
      </main>
    );
  }

  const projectIndex = projectList.findIndex(p => p.id === id);
  const project = projectList[projectIndex];

  if (!project) {
    return (
      <main id="main-content" className="section-wrap project-not-found">
        <h1>Project not found.</h1>
        <p>This project isn't available. Explore the portfolio to find another one.</p>
        <Link to="/#work" className="anime-btn-primary"><ArrowLeft size={18} />Explore projects</Link>
      </main>
    );
  }

  const previous = projectList[(projectIndex + projectList.length - 1) % projectList.length];
  const next = projectList[(projectIndex + 1) % projectList.length];
  const currentImage = project.images[currentImageIndex] || '';

  const changeImage = (direction: number) => {
    if (!project.images.length) return;
    setCurrentImageIndex(index => (index + direction + project.images.length) % project.images.length);
  };

  return (
    <main id="main-content" className="section-wrap project-detail">
      <Link to="/#work" className="text-link"><ArrowLeft size={17} />Explore projects</Link>
      <header className="detail-heading">
        <p>{project.category} / {project.year}</p>
        <h1>{project.title}</h1>
        <div className="detail-facts"><span>{project.role}</span><span>{project.type} project</span></div>
      </header>
      <section className="anime-card detail-gallery" aria-label="Project screenshots">
        <div className="detail-image">
          {failedImage === currentImage ? (
            <div className="gallery-error" role="status">
              <p>This screenshot could not be loaded.</p>
              <button type="button" className="anime-btn-secondary" onClick={() => setFailedImage(null)}>Try again</button>
            </div>
          ) : (
            <img src={currentImage} alt={`${project.title} screenshot ${currentImageIndex + 1}`} width="1600" height="900" onError={() => setFailedImage(currentImage)} />
          )}
        </div>
        <div className="gallery-toolbar">
          <p aria-live="polite">Screenshot {currentImageIndex + 1} of {project.images.length || 1}</p>
          {project.images.length > 1 && (
            <div>
              <button type="button" className="icon-button" aria-label="Previous image" onClick={() => changeImage(-1)}><ChevronLeft size={20} /></button>
              <button type="button" className="icon-button" aria-label="Next image" onClick={() => changeImage(1)}><ChevronRight size={20} /></button>
            </div>
          )}
        </div>
        {project.images.length > 1 && (
          <div className="gallery-thumbnails" role="group" aria-label="Choose a screenshot">
            {project.images.map((image, index) => (
              <button type="button" key={image} aria-label={`View screenshot ${index + 1}`} aria-pressed={index === currentImageIndex} onClick={() => setCurrentImageIndex(index)}>
                <img src={image} alt="" width="160" height="100" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </section>
      <div className="detail-content">
        <aside>
          <h2>Built with</h2>
          <div className="skill-tags">
            {project.tech.map(tech => (
              <span key={tech} className="tech-badge-item">
                <TechIcon name={tech} size={15} />
              </span>
            ))}
          </div>
          <div className="detail-actions">
            {project.liveLink && <a href={project.liveLink} target="_blank" rel="noreferrer" className="anime-btn-primary">Live demo <ExternalLink size={17} /></a>}
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" className="anime-btn-secondary">Source code <FolderGit2 size={17} /></a>}
          </div>
        </aside>
        <div className="detail-story">
          <section><h2>What it does.</h2><p>{project.description}</p></section>
          {project.challenges?.trim() && (
            <section className="anime-card detail-challenge">
              <h2>The engineering challenge.</h2>
              <p>{project.challenges}</p>
            </section>
          )}
        </div>
      </div>
      {previous && next && (
        <nav className="detail-pagination" aria-label="More projects">
          <Link to={`/project/${previous.id}`}><span><ChevronLeft size={16} />Previous project</span><strong>{previous.title}</strong></Link>
          <Link to={`/project/${next.id}`}><span>Next project<ArrowUpRight size={16} /></span><strong>{next.title}</strong></Link>
        </nav>
      )}
    </main>
  );
};

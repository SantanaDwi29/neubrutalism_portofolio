import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Briefcase, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechIcon } from './TechIcon';
import { getExperiences, fallbackExperiences, type ExperienceEntry } from '../services/experienceService';

export const Experience: React.FC = () => {
  const [entries, setEntries] = useState<ExperienceEntry[]>(fallbackExperiences);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getExperiences().then(data => {
      if (isMounted && data.length > 0) {
        setEntries(data);
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="experience" className="section-wrap">
      <div className="section-heading">
        <span className="manga-eyebrow text-rose-600 flex items-center gap-2">
          <Briefcase size={16} /> 職歴と経験 — Professional Journey & Experience
        </span>
        <h2>Learning by building.</h2>
        <p>From my first internship to the systems I work on today.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 gap-3 text-slate-400 font-mono">
          <Loader2 size={24} className="animate-spin text-rose-500" /> Loading journey timeline...
        </div>
      ) : (
        <div className="journey-timeline-wrapper">
          <div className="journey-spine-line" aria-hidden="true" />

          <div className="journey-list">
            {entries.map((entry, index) => (
              <article key={entry.id || entry.chapter} className="journey-entry">
                <div className="journey-date">
                  <span className="journey-year font-mono">{entry.year}</span>
                  <span className="journey-location">{entry.location}</span>
                </div>

                <div className="journey-node-slot" aria-hidden="true">
                  <div className="journey-node-dot" />
                </div>

                <div className="anime-card journey-card">
                  <div className="journey-card-header">
                    <span className="journey-chapter-tag font-mono">{entry.chapter}</span>
                    <h3>{entry.role}</h3>
                    <p className="journey-company">{entry.company}</p>
                  </div>

                  <details open={index === 0}>
                    <summary>
                      <span>What I worked on</span>
                      <Plus size={18} />
                    </summary>
                    <div className="journey-details">
                      <p>{entry.description}</p>
                      <div className="skill-tags">
                        {entry.tech.map(tech => (
                          <span key={tech} className="tech-badge-item">
                            <TechIcon name={tech} size={15} />
                          </span>
                        ))}
                      </div>
                      {entry.projectLink && (
                        <Link to={entry.projectLink} className="text-link">
                          View project <ArrowUpRight size={17} />
                        </Link>
                      )}
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;

import React from 'react';
import { ArrowUpRight, Briefcase, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechIcon } from './TechIcon';

const experienceEntries = [
  {
    chapter: 'CHAPTER 02',
    year: '2026 - PRESENT',
    role: 'Web Developer',
    company: 'CV Sinar Teknologi Indonesia',
    location: 'Full-time / Bali',
    description:
      'Continuing full-stack development and maintenance of enterprise web applications and SaaS modules. Focused on system architecture, RBAC access control, performance optimization, and API integrations.',
    tech: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Tailwind CSS'],
  },
  {
    chapter: 'CHAPTER 01',
    year: '2025 - 2026',
    role: 'Web Developer Intern',
    company: 'CV Sinar Teknologi Indonesia',
    location: 'Internship / Bali',
    description:
      'Engineered core modules for the Kitagiat SaaS ecosystem, including the Kitagiat Attendance SaaS and Kitagiat Admin Portal. Built QR scanner integrations, WhatsApp notification bots, and automated PDF/Excel reporting engines.',
    tech: ['Laravel', 'React', 'TypeScript', 'PHP Excel', 'WhatsApp API'],
  },
];

export const Experience: React.FC = () => (
  <section id="experience" className="section-wrap">
    <div className="section-heading">
      <span className="manga-eyebrow text-rose-600 flex items-center gap-2">
        <Briefcase size={16} /> 職歴と経験 — Professional Journey & Experience
      </span>
      <h2>Learning by building.</h2>
      <p>From my first internship to the systems I work on today.</p>
    </div>
    <div className="journey-list">
      {experienceEntries.map((entry, index) => (
        <article key={entry.chapter} className="journey-entry">
          <div className="journey-date">
            <span>{entry.year}</span>
            <span>{entry.location}</span>
          </div>
          <div className="anime-card journey-card">
            <h3>{entry.role}</h3>
            <p className="journey-company">{entry.company}</p>
            <details open={index === 0}>
              <summary>What I worked on <Plus size={18} /></summary>
              <div className="journey-details">
                <p>{entry.description}</p>
                <div className="skill-tags">
                  {entry.tech.map(tech => (
                    <span key={tech} className="tech-badge-item">
                      <TechIcon name={tech} size={15} />
                    </span>
                  ))}
                </div>
                <Link to={index === 0 ? '/project/apotek-saddasa' : '/project/kitagiat'} className="text-link">
                  View project <ArrowUpRight size={17} />
                </Link>
              </div>
            </details>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default Experience;

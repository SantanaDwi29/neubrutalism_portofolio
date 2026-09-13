'use client';

import { useState, useRef, type KeyboardEvent } from 'react';
import { ArrowUpRight, Code2, Database, Server, Wrench, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechIcon } from './TechIcon';

const groups = [
  {
    title: 'Frontend',
    jpTitle: 'フロントエンド',
    icon: Code2,
    heading: 'The part people touch.',
    description: 'Responsive interfaces, reusable components, and interactions that make complex workflows feel straightforward.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3'],
    project: 'saru-studio',
    example: 'Saru Studio'
  },
  {
    title: 'Backend',
    jpTitle: 'バックエンド',
    icon: Server,
    heading: 'The logic behind it.',
    description: 'Application architecture, secure access, and APIs that connect the interface to the work happening underneath.',
    skills: ['Laravel', 'Go', 'PHP', 'Node.js', 'REST API', 'Spatie RBAC'],
    project: 'kitagiat-admin',
    example: 'Kitagiat Admin Portal'
  },
  {
    title: 'Data & storage',
    jpTitle: 'データベース',
    icon: Database,
    heading: 'A place for every detail.',
    description: 'Data models and storage for inventory, attendance, and the records a business relies on every day.',
    skills: ['MySQL', 'MariaDB', 'MongoDB', 'Redis', 'PostgreSQL'],
    project: 'apotek-saddasa',
    example: 'Apotek Saddasa'
  },
  {
    title: 'Tools & DevOps',
    jpTitle: 'ツール・DevOps',
    icon: Wrench,
    heading: 'Automation & Infrastructure.',
    description: 'CI/CD automation, workflow orchestration, version control, deployment, and service integrations for enterprise reliability.',
    skills: ['Docker', 'Jenkins', 'n8n', 'Git', 'Vercel', 'PHP Excel', 'WhatsApp API'],
    project: 'kitagiat',
    example: 'Kitagiat Absensi SaaS'
  },
];

export const TechStack = () => {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % groups.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + groups.length - 1) % groups.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = groups.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="stack" className="section-wrap">
      <div className="section-heading">
        <span className="manga-eyebrow text-rose-600 flex items-center gap-2">
          <Terminal size={15} /> 開発スタック — Tech Stack & Toolkit
        </span>
        <h2>
          From interface<br />to infrastructure.
        </h2>
        <p>Choose a layer to explore the technologies, languages, and automation tools I work with.</p>
      </div>

      <div className="stack-layout">
        <div className="stack-tabs" role="tablist" aria-label="Technology categories">
          {groups.map((item, index) => {
            const TabIcon = item.icon;
            const isSelected = active === index;

            return (
              <button
                key={item.title}
                ref={(el) => { tabs.current[index] = el; }}
                type="button"
                role="tab"
                id={`stack-tab-${index}`}
                aria-controls={`stack-panel-${index}`}
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onKeyDown={(event) => onKeyDown(event, index)}
                onClick={() => setActive(index)}
              >
                <TabIcon size={21} />
                <span className="flex flex-col text-left">
                  <span>{item.title}</span>
                  <span className="text-[10px] opacity-75 font-mono">{item.jpTitle}</span>
                </span>
                <ArrowUpRight size={18} />
              </button>
            );
          })}
        </div>

        {groups.map((group, index) => {
          const Icon = group.icon;

          return (
            <div
              key={group.title}
              hidden={active !== index}
              className="anime-card stack-panel"
              role="tabpanel"
              id={`stack-panel-${index}`}
              aria-labelledby={`stack-tab-${index}`}
              tabIndex={0}
            >
              <div className="panel-content">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="stack-symbol text-[var(--color-burgundy)]" size={48} strokeWidth={1.5} aria-hidden="true" />
                  <span className="px-3 py-1 rounded-full bg-[var(--color-sand)] font-mono text-xs font-bold text-[var(--color-burgundy)]">
                    {group.jpTitle}
                  </span>
                </div>

                <h3>{group.heading}</h3>
                <p>{group.description}</p>

                {/* Tech Badges with actual logos */}
                <div className="skill-tags mt-6">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tech-badge-item">
                      <TechIcon name={skill} size={16} />
                    </span>
                  ))}
                </div>

                <Link to={`/project/${group.project}`} className="text-link mt-6">
                  See it in {group.example} <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStack;

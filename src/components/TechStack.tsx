'use client';

import { useState, useRef, type KeyboardEvent } from 'react';
import { ArrowUpRight, Code2, Database, Server, Wrench, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { TechIcon } from './TechIcon';

const groups = [
  {
    title: 'Frontend',
    jpTitle: 'フロントエンド',
    icon: Code2,
    heading: 'The part people touch.',
    description: 'Responsive interfaces, reusable components, and interactions that make complex workflows feel straightforward.',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Vite', 'HTML5/CSS3'],
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
  const reduceMotion = useReducedMotion();

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

  const currentGroup = groups[active];
  const Icon = currentGroup.icon;

  return (
    <section id="stack" className="section-wrap">
      <div className="section-heading">
        <span className="manga-eyebrow text-[var(--color-rose)] flex items-center gap-2 font-bold">
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
                className="relative overflow-hidden group"
              >
                <TabIcon size={21} />
                <span className="flex flex-col text-left">
                  <span>{item.title}</span>
                  <span className="text-[10px] opacity-75 font-mono">{item.jpTitle}</span>
                </span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[366px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="anime-card stack-panel h-full"
              role="tabpanel"
              id={`stack-panel-${active}`}
              aria-labelledby={`stack-tab-${active}`}
              tabIndex={0}
            >
              <div className="panel-content">
                <div className="flex items-center justify-between mb-4">
                  <Icon className="stack-symbol text-[var(--color-burgundy)]" size={48} strokeWidth={1.5} aria-hidden="true" />
                  <span className="px-3 py-1 rounded-full bg-[var(--color-sand)] font-mono text-xs font-bold text-[var(--color-burgundy)]">
                    {currentGroup.jpTitle}
                  </span>
                </div>

                <h3>{currentGroup.heading}</h3>
                <p>{currentGroup.description}</p>

                {/* Tech Badges with actual logos and micro-hover scale */}
                <div className="skill-tags mt-6">
                  {currentGroup.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="tech-badge-item cursor-default"
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                      whileHover={reduceMotion ? undefined : { scale: 1.06, translateY: -2 }}
                    >
                      <TechIcon name={skill} size={16} />
                    </motion.span>
                  ))}
                </div>

                <Link to={`/project/${currentGroup.project}`} className="text-link mt-6 group inline-flex items-center">
                  See it in {currentGroup.example}{' '}
                  <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TechStack;


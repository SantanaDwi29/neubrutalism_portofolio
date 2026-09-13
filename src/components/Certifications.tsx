'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  Award, 
  Download, 
  Expand, 
  X, 
  Search, 
  Filter, 
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TechIcon } from './TechIcon';

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  topic: string;
  category: 'Cloud & Infra' | 'Database' | 'AI & Innovation' | 'Web Dev' | 'Professional';
  image: string;
  pdf: string;
  date: string;
  skills: string[];
  credentialId?: string;
}

export const certificatesData: Certificate[] = [
  {
    id: 'dicoding-gen-ai',
    name: 'Belajar Penggunaan Generative AI',
    issuer: 'Dicoding Indonesia',
    topic: 'Applied Generative AI & Prompt Design',
    category: 'AI & Innovation',
    image: '/certification/dicoding_Belajar_Penggunaan_Generative_AI.webp',
    pdf: '/certification/dicoding_Belajar_Penggunaan_Generative_AI.pdf',
    date: '2026',
    skills: ['JavaScript', 'TypeScript', 'React'],
    credentialId: 'DICODING-GENAI-2026'
  },
  {
    id: 'dicoding-ai-prod',
    name: 'AI Praktis untuk Produktivitas',
    issuer: 'Dicoding Indonesia',
    topic: 'AI Automation & Task Optimization',
    category: 'AI & Innovation',
    image: '/certification/dicoding_AI_Praktis_untuk_Produktivitas.webp',
    pdf: '/certification/dicoding_AI_Praktis_untuk_Produktivitas.pdf',
    date: '2026',
    skills: ['JavaScript', 'Node.js', 'Vercel'],
    credentialId: 'DICODING-AIPROD-2026'
  },
  {
    id: 'internship-se',
    name: 'Software Engineering Internship',
    issuer: 'CV Sinar Teknologi Indonesia (Kitagiat)',
    topic: 'Enterprise SaaS Development & Systems Integration',
    category: 'Professional',
    image: '/certification/Sertifikat_Magang.webp',
    pdf: '/certification/Sertifikat_Magang.webp',
    date: '2025',
    skills: ['Laravel', 'React', 'TypeScript', 'MySQL'],
    credentialId: 'KITAGIAT-INT-2025'
  },
  {
    id: 'bnsp-jwd',
    name: 'Junior Web Developer (JWD)',
    issuer: 'BNSP & Digitalent Kominfo',
    topic: 'Full-Stack Web Development Competency',
    category: 'Web Dev',
    image: '/certification/Sertifikat_JWD.webp',
    pdf: '/certification/Sertifikat_JWD.pdf',
    date: '2025',
    skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    credentialId: 'BNSP-JWD-7712'
  },
  {
    id: 'aws-cloud',
    name: 'AWS Cloud Foundations',
    issuer: 'Amazon Web Services',
    topic: 'Cloud Architecture & Fundamentals',
    category: 'Cloud & Infra',
    image: '/certification/aws.webp',
    pdf: '/certification/aws.pdf',
    date: '2024',
    skills: ['AWS', 'AWS EC2', 'S3', 'IAM'],
    credentialId: 'AWS-FOUND-2024'
  },
  {
    id: 'mongodb-dev',
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    topic: 'NoSQL Data Modeling & Aggregations',
    category: 'Database',
    image: '/certification/mongodb.webp',
    pdf: '/certification/mongodb.pdf',
    date: '2024',
    skills: ['MongoDB', 'REST API', 'Node.js'],
    credentialId: 'MDB-DEV-8921'
  }
];

const categories = ['All', 'Cloud & Infra', 'Database', 'AI & Innovation', 'Web Dev', 'Professional'] as const;

export const Certifications = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCert, setActiveCert] = useState<Certificate>(certificatesData[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewButtonRef = useRef<HTMLButtonElement>(null);

  // Filter & sort logic (newest year first)
  const filteredCertificates = useMemo(() => {
    return certificatesData
      .filter((cert) => {
        const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          cert.name.toLowerCase().includes(query) ||
          cert.issuer.toLowerCase().includes(query) ||
          cert.topic.toLowerCase().includes(query) ||
          cert.skills.some((skill) => skill.toLowerCase().includes(query));

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => Number(b.date) - Number(a.date));
  }, [selectedCategory, searchQuery]);

  // Modal dialog handler
  useEffect(() => {
    if (!isModalOpen) return;
    const element = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const openPreview = (cert: Certificate) => {
    setActiveCert(cert);
    setIsModalOpen(true);
  };

  return (
    <section id="certs" className="section-wrap">
      {/* Section Header */}
      <div className="section-heading flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="manga-eyebrow text-rose-600 flex items-center gap-2">
            <ShieldCheck size={16} /> 認定資格 — Verified Industry Credentials
          </span>
          <h2>Always a student.</h2>
          <p>
            Continuous learning and industry-recognized certifications in cloud infrastructure, databases, AI systems, and enterprise web engineering.
          </p>
        </div>
        
        {/* Count Badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--manga-surface-card)] border border-[var(--color-sand)] text-xs font-mono">
          <Award size={16} className="text-[var(--color-burgundy)]" />
          <span><strong>{filteredCertificates.length}</strong> / {certificatesData.length} Credentials</span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="cert-toolbar mb-8">
        <div className="cert-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search certificates by name, issuer, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search certificates"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="clear-search-btn"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="cert-category-pills" role="tablist" aria-label="Certificate categories">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? certificatesData.length 
              : certificatesData.filter(c => c.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`cert-pill ${isSelected ? 'active' : ''}`}
              >
                <span>{cat}</span>
                <span className="pill-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase / Bento Gallery Layout */}
      {filteredCertificates.length === 0 ? (
        <div className="empty-cert-state anime-card p-10 text-center">
          <Filter size={36} className="mx-auto mb-3 opacity-60" />
          <h3 className="text-xl font-bold">No certificates found</h3>
          <p className="text-sm mt-1">Try clearing your search query or selecting a different category filter.</p>
          <button
            type="button"
            className="anime-btn-secondary mt-4"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="cert-bento-grid">
          {/* Featured Spotlight Card */}
          <motion.div 
            layout
            className="anime-card cert-featured-card"
          >
            <div className="cert-featured-image-wrapper">
              <button
                ref={previewButtonRef}
                type="button"
                onClick={() => openPreview(activeCert)}
                aria-label={`Enlarge ${activeCert.name}`}
                className="cert-featured-btn"
              >
                <img
                  key={activeCert.image}
                  src={activeCert.image}
                  alt={activeCert.name}
                  loading="lazy"
                  width="1000"
                  height="700"
                  className="cert-featured-img"
                />
                <div className="cert-hover-overlay">
                  <span className="anime-btn-primary gap-2">
                    <Expand size={16} /> Expand Certificate
                  </span>
                </div>
              </button>
              <div className="cert-category-badge">
                <Sparkles size={13} /> {activeCert.category}
              </div>
            </div>

            <div className="cert-featured-content">
              <div className="cert-meta-header">
                <span className="cert-issuer-tag">{activeCert.issuer}</span>
                <span className="cert-date font-mono">{activeCert.date}</span>
              </div>
              <h3 className="cert-title">{activeCert.name}</h3>
              <p className="cert-topic">{activeCert.topic}</p>

              {/* Tech Skill Badges with Logos */}
              <div className="skill-tags mt-4">
                {activeCert.skills.map((skill) => (
                  <span key={skill} className="tech-badge-item">
                    <TechIcon name={skill} size={15} />
                  </span>
                ))}
              </div>

              <div className="cert-featured-footer">
                <button
                  type="button"
                  className="anime-btn-primary"
                  onClick={() => openPreview(activeCert)}
                >
                  View Details & Lightbox <Expand size={16} />
                </button>
                
                <a
                  className="anime-btn-secondary"
                  href={activeCert.pdf}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open PDF <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Side List / Grid Cards */}
          <div className="cert-cards-column">
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert) => {
                const isActive = cert.id === activeCert.id;

                return (
                  <motion.div
                    key={cert.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className={`cert-item-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveCert(cert)}
                  >
                    <div className="cert-item-thumbnail">
                      <img src={cert.image} alt={cert.name} loading="lazy" />
                    </div>
                    <div className="cert-item-info">
                      <div className="cert-item-top">
                        <span className="cert-item-issuer">{cert.issuer}</span>
                        <span className="cert-item-date font-mono">{cert.date}</span>
                      </div>
                      <h4 className="cert-item-title">{cert.name}</h4>
                      <p className="cert-item-topic">{cert.topic}</p>
                      <div className="cert-item-actions">
                        <button
                          type="button"
                          className="text-link text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            openPreview(cert);
                          }}
                        >
                          Enlarge <Expand size={14} />
                        </button>
                        <a
                          href={cert.pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="text-link text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          PDF <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Enlarged Dialog Lightbox Modal */}
      <dialog
        ref={dialogRef}
        className="certificate-dialog"
        aria-labelledby="certificate-dialog-title"
        onClose={() => setIsModalOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsModalOpen(false);
        }}
      >
        <div className="dialog-inner">
          <div className="dialog-heading">
            <div>
              <span className="manga-eyebrow text-rose-600 mb-1 inline-block">
                {activeCert.category} Certification
              </span>
              <h3 id="certificate-dialog-title">{activeCert.name}</h3>
              <p className="font-semibold text-gray-700">Issued by {activeCert.issuer} ({activeCert.date})</p>
              {activeCert.credentialId && (
                <span className="text-xs font-mono opacity-80 mt-1 block">
                  Credential ID: {activeCert.credentialId}
                </span>
              )}
            </div>
            <button
              type="button"
              autoFocus
              className="icon-button"
              aria-label="Close certificate preview"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={22} />
            </button>
          </div>

          <div className="dialog-image-box">
            <img src={activeCert.image} alt={activeCert.name} width="1000" height="700" />
          </div>

          <div className="dialog-details-footer">
            <div className="skill-tags mb-4">
              {activeCert.skills.map((skill) => (
                <span key={skill} className="tech-badge-item">
                  <TechIcon name={skill} size={15} />
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
              <span className="text-xs text-gray-600 max-w-md">
                Topic focus: {activeCert.topic}
              </span>
              <div className="flex gap-3">
                <a href={activeCert.pdf} target="_blank" rel="noreferrer" className="anime-btn-secondary">
                  Open Original <ExternalLink size={16} />
                </a>
                <a href={activeCert.pdf} download className="anime-btn-primary">
                  Download PDF <Download size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Certifications;

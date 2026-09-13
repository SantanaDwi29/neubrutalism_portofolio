import { ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import React, { Suspense } from 'react';
import { Hero } from '../components/Hero';
import { Reveal } from '../components/Reveal';

const TechStack = React.lazy(() => import('../components/TechStack'));
const Experience = React.lazy(() => import('../components/Experience'));
const Projects = React.lazy(() => import('../components/Projects'));
const Contact = React.lazy(() => import('../components/Contact'));
const Certifications = React.lazy(() => import('../components/Certifications'));


export const Home = () => (
  <main id="main-content" className="site-shell home-sections">
    <Hero />
    <Suspense fallback={<div className="section-wrap loading-layout" role="status" aria-label="Loading portfolio"><div className="loading-title" /><div className="loading-panel" /><span className="sr-only">Loading portfolio...</span></div>}>
      <Reveal>
        <section id="about" className="section-wrap about-layout">
          <div className="section-heading"><h2>A little logic.<br />A lot of curiosity.</h2><a href="#stack" className="text-link">Explore my toolkit <ArrowUpRight size={18} /></a></div>
          <div className="about-copy">
            <p className="about-intro">I'm I Made Santana Dwiananda, a full-stack developer who enjoys turning complicated problems into things people can actually use.</p>
            <p>My work spans SaaS modules, pharmacy management, and business applications. I care about what happens behind the interface just as much as how it feels to use.</p>
            <dl className="about-facts">
              <div><dt><MapPin size={16} />Based in</dt><dd>Bali, Indonesia</dd></div>
              <div><dt><GraduationCap size={16} />Education</dt><dd>Bali State Polytechnic</dd></div>
            </dl>
          </div>
        </section>
      </Reveal>
      <Reveal><TechStack /></Reveal>
      <Reveal><Experience /></Reveal>
      <Reveal><Certifications /></Reveal>
      <Reveal><Projects /></Reveal>
      <Reveal><Contact /></Reveal>
    </Suspense>
  </main>
);

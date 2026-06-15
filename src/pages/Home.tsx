import React, { Suspense } from 'react';
import { Hero } from '../components/Hero';

const TechStack = React.lazy(() => import('../components/TechStack').then(m => ({ default: m.TechStack })));
const Experience = React.lazy(() => import('../components/Experience').then(m => ({ default: m.Experience })));
const Projects = React.lazy(() => import('../components/Projects').then(m => ({ default: m.Projects })));
const Contact = React.lazy(() => import('../components/Contact').then(m => ({ default: m.Contact })));
const Certifications = React.lazy(() => import('../components/Certifications').then(m => ({ default: m.Certifications })));

export const Home = () => {
  return (
    <main className="max-w-[1024px] mx-auto px-6 py-12 md:py-24 space-y-24">
      <Hero />
      <Suspense fallback={<div className="min-h-[200px] w-full flex items-center justify-center font-label-bold text-sm">Loading content...</div>}>
        <TechStack />
        <Experience />
        <Certifications />
        <Projects />
        <Contact />
      </Suspense>
    </main>
  );
};

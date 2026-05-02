import { Hero } from '../components/Hero';
import { TechStack } from '../components/TechStack';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { Certifications } from '../components/Certifications';

export const Home = () => {
  return (
    <main className="max-w-[1024px] mx-auto px-6 py-12 md:py-24 space-y-24">
      <Hero />
      <TechStack />
      <Certifications />
      <Projects />
      <Contact />
    </main>
  );
};

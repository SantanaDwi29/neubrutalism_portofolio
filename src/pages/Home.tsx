import { Hero } from '../components/Hero';
import { TechStack } from '../components/TechStack';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';

export const Home = () => {
  return (
    <main className="max-w-[1024px] mx-auto px-6 py-12 md:py-24 space-y-24">
      <Hero />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
};

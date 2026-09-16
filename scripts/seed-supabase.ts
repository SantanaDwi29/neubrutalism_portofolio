import { createClient } from '@supabase/supabase-js';
import { projects } from '../src/data/projects';
import { fallbackCertificates } from '../src/services/certificateService';
import { fallbackExperiences } from '../src/services/experienceService';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-supabase-project-id')) {
  console.error('❌ Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in your .env file!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedAll() {
  console.log('🚀 Starting Full Supabase Seeding...');

  // 1. Seed Projects
  console.log(`📦 Seeding ${projects.length} initial projects...`);
  for (const project of projects) {
    const payload = {
      id: project.id,
      title: project.title,
      category: project.category,
      type: project.type,
      year: project.year,
      description: project.description,
      images: project.images,
      role: project.role,
      tech: project.tech,
      challenges: project.challenges,
      live_link: project.liveLink || null,
      github_link: project.githubLink || null,
      color: project.color || 'bg-primary-container',
    };

    const { error } = await supabase.from('projects').upsert(payload, { onConflict: 'id' });
    if (error) console.error(`❌ Project "${project.title}":`, error.message);
    else console.log(`  ✅ Project: "${project.title}"`);
  }

  // 2. Seed Certificates
  console.log(`📜 Seeding ${fallbackCertificates.length} initial certificates...`);
  for (const cert of fallbackCertificates) {
    const payload = {
      id: cert.id,
      name: cert.name,
      issuer: cert.issuer,
      topic: cert.topic,
      category: cert.category,
      image: cert.image,
      pdf: cert.pdf,
      date: cert.date,
      skills: cert.skills,
      credential_id: cert.credentialId || null,
    };

    const { error } = await supabase.from('certificates').upsert(payload, { onConflict: 'id' });
    if (error) console.error(`❌ Certificate "${cert.name}":`, error.message);
    else console.log(`  ✅ Certificate: "${cert.name}"`);
  }

  // 3. Seed Experiences / Learning Journey
  console.log(`💼 Seeding ${fallbackExperiences.length} initial learning journey entries...`);
  for (const exp of fallbackExperiences) {
    const payload = {
      id: exp.id,
      chapter: exp.chapter,
      year: exp.year,
      role: exp.role,
      company: exp.company,
      location: exp.location,
      description: exp.description,
      tech: exp.tech,
      project_link: exp.projectLink || null,
    };

    const { error } = await supabase.from('experiences').upsert(payload, { onConflict: 'id' });
    if (error) console.error(`❌ Experience "${exp.chapter}":`, error.message);
    else console.log(`  ✅ Experience: "${exp.chapter} - ${exp.role}"`);
  }

  console.log('🎉 Seeding complete for Projects, Certificates, and Experiences!');
}

seedAll().catch(console.error);

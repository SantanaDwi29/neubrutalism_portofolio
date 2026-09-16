import { createClient } from '@supabase/supabase-js';
import { projects } from '../src/data/projects';
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

async function seedProjects() {
  console.log('🚀 Starting Supabase Seeding...');
  console.log(`📦 Found ${projects.length} initial projects in src/data/projects.ts`);

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

    const { data, error } = await supabase
      .from('projects')
      .upsert(payload, { onConflict: 'id' })
      .select();

    if (error) {
      console.error(`❌ Failed to seed project "${project.title}":`, error.message);
    } else {
      console.log(`✅ Seeded project: "${project.title}" (${project.id})`);
    }
  }

  console.log('🎉 Seeding complete!');
}

seedProjects().catch(console.error);

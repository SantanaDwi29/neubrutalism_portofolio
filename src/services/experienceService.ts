import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ExperienceEntry {
  id: string;
  chapter: string;
  year: string;
  role: string;
  company: string;
  location: string;
  description: string;
  tech: string[];
  projectLink?: string;
}

export const fallbackExperiences: ExperienceEntry[] = [
  {
    id: 'chapter-02',
    chapter: 'CHAPTER 02',
    year: '2026 - PRESENT',
    role: 'Web Developer',
    company: 'CV Sinar Teknologi Indonesia',
    location: 'Full-time / Bali',
    description:
      'Continuing full-stack development and maintenance of enterprise web applications and SaaS modules. Focused on system architecture, RBAC access control, performance optimization, and API integrations.',
    tech: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Tailwind CSS'],
    projectLink: '/project/apotek-saddasa',
  },
  {
    id: 'chapter-01',
    chapter: 'CHAPTER 01',
    year: '2025 - 2026',
    role: 'Web Developer Intern',
    company: 'CV Sinar Teknologi Indonesia',
    location: 'Internship / Bali',
    description:
      'Engineered core modules for the Kitagiat SaaS ecosystem, including the Kitagiat Attendance SaaS and Kitagiat Admin Portal. Built QR scanner integrations, WhatsApp notification bots, and automated PDF/Excel reporting engines.',
    tech: ['Laravel', 'React', 'TypeScript', 'PHP Excel', 'WhatsApp API'],
    projectLink: '/project/kitagiat',
  },
];

const mapRowToExperience = (row: any): ExperienceEntry => ({
  id: row.id,
  chapter: row.chapter,
  year: row.year,
  role: row.role,
  company: row.company,
  location: row.location,
  description: row.description,
  tech: Array.isArray(row.tech) ? row.tech : [],
  projectLink: row.project_link || undefined,
});

const mapExperienceToRow = (exp: ExperienceEntry) => ({
  id: exp.id,
  chapter: exp.chapter,
  year: exp.year,
  role: exp.role,
  company: exp.company,
  location: exp.location,
  description: exp.description,
  tech: exp.tech,
  project_link: exp.projectLink || null,
});

export const getExperiences = async (): Promise<ExperienceEntry[]> => {
  if (!isSupabaseConfigured() || !supabase) {
    return fallbackExperiences;
  }

  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('chapter', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackExperiences;
    }

    return data.map(mapRowToExperience);
  } catch {
    return fallbackExperiences;
  }
};

export const saveExperienceToSupabase = async (exp: ExperienceEntry): Promise<ExperienceEntry> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const payload = mapExperienceToRow(exp);
  const { data, error } = await supabase
    .from('experiences')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save experience: ${error.message}`);
  }

  return mapRowToExperience(data);
};

export const deleteExperienceFromSupabase = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await supabase
    .from('experiences')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete experience: ${error.message}`);
  }
};

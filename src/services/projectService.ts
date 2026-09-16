import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { projects as fallbackProjects, type Project } from '../data/projects';

// Helper to map DB row to Project interface
const mapRowToProject = (row: any): Project => ({
  id: row.id,
  title: row.title,
  category: row.category,
  type: row.type || 'Individual',
  year: String(row.year),
  description: row.description,
  images: Array.isArray(row.images) ? row.images : [],
  role: row.role || 'Full-stack Developer',
  tech: Array.isArray(row.tech) ? row.tech : [],
  challenges: row.challenges || '',
  liveLink: row.live_link || undefined,
  githubLink: row.github_link || undefined,
  color: row.color || 'bg-primary-container',
});

// Helper to map Project interface to DB row payload
const mapProjectToRow = (project: Project) => ({
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
});

export const getProjects = async (): Promise<Project[]> => {
  if (!isSupabaseConfigured() || !supabase) {
    console.info('ℹ️ Supabase not configured. Using local fallback projects.');
    return fallbackProjects;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('⚠️ Supabase fetch error, falling back to local data:', error.message);
      return fallbackProjects;
    }

    return data.map(mapRowToProject);
  } catch (err) {
    console.warn('⚠️ Error connecting to Supabase:', err);
    return fallbackProjects;
  }
};

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  if (!isSupabaseConfigured() || !supabase) {
    return fallbackProjects.find(p => p.id === id);
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error || !data) {
      return fallbackProjects.find(p => p.id === id);
    }

    return mapRowToProject(data);
  } catch {
    return fallbackProjects.find(p => p.id === id);
  }
};

/**
 * Upload an image file directly to Supabase Storage Bucket ('project-images')
 */
export const uploadProjectImage = async (file: File, folder = 'uploads'): Promise<string> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured yet. Please set VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('project-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Failed to upload image to Supabase Storage: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('project-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};

/**
 * Save (create or update) a project in Supabase Database
 */
export const saveProjectToSupabase = async (project: Project): Promise<Project> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured yet. Please set VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY in .env');
  }

  const payload = mapProjectToRow(project);
  const { data, error } = await supabase
    .from('projects')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save project: ${error.message}`);
  }

  return mapRowToProject(data);
};

/**
 * Delete a project from Supabase Database
 */
export const deleteProjectFromSupabase = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured yet.');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete project: ${error.message}`);
  }
};

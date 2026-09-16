import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  topic: string;
  category: 'Cloud & Infra' | 'Database' | 'AI & Innovation' | 'Web Dev' | 'Professional' | string;
  image: string;
  pdf: string;
  date: string;
  skills: string[];
  credentialId?: string;
}

export const fallbackCertificates: Certificate[] = [
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
    credentialId: 'DICODING-GENAI-2026',
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
    credentialId: 'DICODING-AIPROD-2026',
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
    credentialId: 'KITAGIAT-INT-2025',
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
    credentialId: 'BNSP-JWD-7712',
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
    credentialId: 'AWS-FOUND-2024',
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
    credentialId: 'MDB-DEV-8921',
  },
];

const mapRowToCertificate = (row: any): Certificate => ({
  id: row.id,
  name: row.name,
  issuer: row.issuer,
  topic: row.topic,
  category: row.category || 'Web Dev',
  image: row.image,
  pdf: row.pdf || row.image,
  date: String(row.date),
  skills: Array.isArray(row.skills) ? row.skills : [],
  credentialId: row.credential_id || undefined,
});

const mapCertificateToRow = (cert: Certificate) => ({
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
});

export const getCertificates = async (): Promise<Certificate[]> => {
  if (!isSupabaseConfigured() || !supabase) {
    return fallbackCertificates;
  }

  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('date', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackCertificates;
    }

    return data.map(mapRowToCertificate);
  } catch {
    return fallbackCertificates;
  }
};

export const saveCertificateToSupabase = async (cert: Certificate): Promise<Certificate> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const payload = mapCertificateToRow(cert);
  const { data, error } = await supabase
    .from('certificates')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to save certificate: ${error.message}`);
  }

  return mapRowToCertificate(data);
};

export const deleteCertificateFromSupabase = async (id: string): Promise<void> => {
  if (!isSupabaseConfigured() || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const { error } = await supabase
    .from('certificates')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to delete certificate: ${error.message}`);
  }
};

-- ==========================================================
-- SUPABASE SCHEMA FOR PORTFOLIO PROJECTS & STORAGE
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ==========================================================

-- 1. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Individual',
  year TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  role TEXT NOT NULL DEFAULT 'Full-stack Developer',
  tech TEXT[] NOT NULL DEFAULT '{}',
  challenges TEXT NOT NULL DEFAULT '',
  live_link TEXT,
  github_link TEXT,
  color TEXT DEFAULT 'bg-primary-container',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow Public Read Access to Projects
CREATE POLICY "Public Read Access for Projects"
  ON public.projects
  FOR SELECT
  USING (true);

-- Policy: Allow Insert/Update/Delete for Anon & Authenticated users
CREATE POLICY "Full Access for Projects"
  ON public.projects
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ==========================================================
-- 2. Create Storage Bucket for Project Screenshots / Images
-- ==========================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images',
  true,
  10485760, -- 10MB limit per image
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies for Public Read
CREATE POLICY "Public Read Storage"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'project-images');

-- Storage Policies for Upload/Manage
CREATE POLICY "Public Insert Storage"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Public Update Storage"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'project-images');

CREATE POLICY "Public Delete Storage"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'project-images');

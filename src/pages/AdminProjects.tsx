import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabase';
import { getProjects, saveProjectToSupabase, deleteProjectFromSupabase, uploadProjectImage } from '../services/projectService';
import { type Project } from '../data/projects';
import { ArrowLeft, Plus, Trash2, Edit3, UploadCloud, CheckCircle2, AlertTriangle, ShieldCheck, Lock, RefreshCw, ExternalLink } from 'lucide-react';

export const AdminProjects = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageInput, setImageInput] = useState('');

  const configured = isSupabaseConfigured();
  const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  useEffect(() => {
    if (isAuthenticated) {
      loadProjectsData();
    }
  }, [isAuthenticated]);

  const loadProjectsData = async () => {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === expectedPass) {
      setIsAuthenticated(true);
      setPassError('');
    } else {
      setPassError('Incorrect password. Default password is admin123 (or set VITE_ADMIN_PASSWORD in .env)');
    }
  };

  const handleOpenForm = (proj?: Project) => {
    if (proj) {
      setEditingProject({ ...proj });
    } else {
      setEditingProject({
        id: `project-${Date.now()}`,
        title: '',
        category: 'WEB APP',
        type: 'Individual',
        year: new Date().getFullYear().toString(),
        description: '',
        images: [],
        role: 'Full-stack Developer',
        tech: ['React', 'TypeScript', 'Tailwind CSS'],
        challenges: '',
        liveLink: '',
        githubLink: '',
        color: 'bg-primary-container',
      });
    }
    setImageInput('');
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !editingProject) return;

    setIsUploading(true);
    setStatusMsg(null);

    try {
      const file = files[0];
      const publicUrl = await uploadProjectImage(file, 'portfolio-shots');
      
      const currentImages = editingProject.images || [];
      setEditingProject({
        ...editingProject,
        images: [...currentImages, publicUrl],
      });

      setStatusMsg({ type: 'success', text: `Image uploaded successfully to Supabase Storage!` });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to upload image to Supabase' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    if (!imageInput.trim() || !editingProject) return;
    const currentImages = editingProject.images || [];
    setEditingProject({
      ...editingProject,
      images: [...currentImages, imageInput.trim()],
    });
    setImageInput('');
  };

  const handleRemoveImage = (index: number) => {
    if (!editingProject) return;
    const currentImages = editingProject.images || [];
    setEditingProject({
      ...editingProject,
      images: currentImages.filter((_, i) => i !== index),
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.id) return;

    try {
      setLoading(true);
      const fullProject: Project = {
        id: editingProject.id,
        title: editingProject.title,
        category: editingProject.category || 'WEB APP',
        type: editingProject.type as any || 'Individual',
        year: editingProject.year || '2026',
        description: editingProject.description || '',
        images: editingProject.images && editingProject.images.length > 0 ? editingProject.images : ['/projectt/jagadhita.webp'],
        role: editingProject.role || 'Full-stack Developer',
        tech: Array.isArray(editingProject.tech) ? editingProject.tech : (editingProject.tech as any || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        challenges: editingProject.challenges || '',
        liveLink: editingProject.liveLink || undefined,
        githubLink: editingProject.githubLink || undefined,
        color: editingProject.color || 'bg-primary-container',
      };

      await saveProjectToSupabase(fullProject);
      setStatusMsg({ type: 'success', text: `Project "${fullProject.title}" saved successfully to Supabase!` });
      setEditingProject(null);
      await loadProjectsData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error saving project to Supabase' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      setLoading(true);
      await deleteProjectFromSupabase(id);
      setStatusMsg({ type: 'success', text: `Project "${title}" deleted from Supabase.` });
      await loadProjectsData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error deleting project' });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main id="main-content" className="section-wrap max-w-md mx-auto py-16">
        <div className="anime-card p-8 border-4 border-black bg-amber-100 shadow-[6px_6px_0_0_#000]">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-rose-600" />
            <h1 className="text-2xl font-black uppercase tracking-wider">Portfolio Admin</h1>
          </div>
          <p className="text-sm font-semibold mb-6 text-slate-700">
            Enter your secret passcode to access Supabase Project Management.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase mb-1">Passcode</label>
              <input
                type="password"
                placeholder="Enter admin password (default: admin123)"
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full p-3 border-2 border-black font-mono focus:bg-white focus:outline-none"
              />
            </div>
            {passError && <p className="text-xs font-bold text-rose-600 bg-rose-100 p-2 border border-rose-400">{passError}</p>}
            <button type="submit" className="anime-btn-primary w-full justify-center">
              Unlock Dashboard <ShieldCheck size={18} />
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-bold text-slate-600 hover:underline inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="section-wrap py-10 max-w-5xl mx-auto space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-4 border-black pb-6">
        <div>
          <span className="manga-eyebrow text-rose-600 flex items-center gap-2">
            <ShieldCheck size={16} /> Admin Panel — Supabase Project & Image Manager
          </span>
          <h1 className="text-3xl font-black">Portfolio Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={loadProjectsData} className="anime-btn-secondary" title="Refresh data">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button type="button" onClick={() => handleOpenForm()} className="anime-btn-primary">
            <Plus size={18} /> Add Project
          </button>
          <Link to="/" className="text-link text-xs font-bold flex items-center gap-1">
            <ArrowLeft size={14} /> Back to Site
          </Link>
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div className={`p-4 border-2 border-black font-mono text-sm flex items-center justify-between shadow-[4px_4px_0_0_#000] ${configured ? 'bg-emerald-100' : 'bg-amber-100'}`}>
        <div className="flex items-center gap-3">
          {configured ? (
            <CheckCircle2 className="text-emerald-700 w-6 h-6 flex-shrink-0" />
          ) : (
            <AlertTriangle className="text-amber-700 w-6 h-6 flex-shrink-0" />
          )}
          <div>
            <span className="font-black uppercase">{configured ? 'Supabase Connected' : 'Supabase Not Configured'}</span>
            <p className="text-xs text-slate-700">
              {configured
                ? 'Your project is connected to Supabase Database & Storage. Changes will persist directly.'
                : 'Using local data fallback. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env for persistence.'}
            </p>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className={`p-4 border-2 border-black font-mono text-sm shadow-[4px_4px_0_0_#000] ${statusMsg.type === 'success' ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
          {statusMsg.text}
        </div>
      )}

      {/* Project Form Modal / Drawer */}
      {editingProject && (
        <div className="anime-card p-6 border-4 border-black bg-white shadow-[8px_8px_0_0_#000] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-black pb-4">
            <h2 className="text-xl font-black uppercase">
              {editingProject.title ? `Edit: ${editingProject.title}` : 'Create New Project'}
            </h2>
            <button type="button" onClick={() => setEditingProject(null)} className="font-mono text-xs font-bold bg-slate-200 px-3 py-1 border border-black hover:bg-slate-300">
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold mb-1">Project ID (Unique Slug)</label>
                <input
                  type="text"
                  required
                  value={editingProject.id || ''}
                  onChange={e => setEditingProject({ ...editingProject, id: e.target.value })}
                  className="w-full p-2 border-2 border-black bg-slate-50"
                  placeholder="e.g. my-awesome-app"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-2 border-2 border-black"
                  placeholder="e.g. Saddasa Pharmacy"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingProject.category || ''}
                  onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full p-2 border-2 border-black"
                  placeholder="e.g. HEALTHCARE, SaaS MODULE, E-COMMERCE"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold mb-1">Type</label>
                <select
                  value={editingProject.type || 'Individual'}
                  onChange={e => setEditingProject({ ...editingProject, type: e.target.value as any })}
                  className="w-full p-2 border-2 border-black bg-white"
                >
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Year</label>
                <input
                  type="text"
                  value={editingProject.year || '2026'}
                  onChange={e => setEditingProject({ ...editingProject, year: e.target.value })}
                  className="w-full p-2 border-2 border-black"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Role</label>
                <input
                  type="text"
                  value={editingProject.role || 'Full-stack Developer'}
                  onChange={e => setEditingProject({ ...editingProject, role: e.target.value })}
                  className="w-full p-2 border-2 border-black"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-1">Tech Stack (comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(editingProject.tech) ? editingProject.tech.join(', ') : editingProject.tech || ''}
                onChange={e => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(s => s.trim()) as any })}
                className="w-full p-2 border-2 border-black"
                placeholder="React, TypeScript, Tailwind CSS, Laravel"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={editingProject.description || ''}
                onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full p-2 border-2 border-black"
                placeholder="What does this project do..."
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Engineering Challenges</label>
              <textarea
                rows={2}
                value={editingProject.challenges || ''}
                onChange={e => setEditingProject({ ...editingProject, challenges: e.target.value })}
                className="w-full p-2 border-2 border-black"
                placeholder="What were the technical hurdles solved..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">Live Demo URL (Optional)</label>
                <input
                  type="url"
                  value={editingProject.liveLink || ''}
                  onChange={e => setEditingProject({ ...editingProject, liveLink: e.target.value })}
                  className="w-full p-2 border-2 border-black"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">GitHub Repo URL (Optional)</label>
                <input
                  type="url"
                  value={editingProject.githubLink || ''}
                  onChange={e => setEditingProject({ ...editingProject, githubLink: e.target.value })}
                  className="w-full p-2 border-2 border-black"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>

            {/* Supabase Storage Image Upload Section */}
            <div className="p-4 border-2 border-dashed border-black bg-rose-50 space-y-3">
              <span className="font-black text-sm uppercase flex items-center gap-2 text-rose-800">
                <UploadCloud size={18} /> Supabase Storage — Upload Project Images
              </span>
              <p className="text-slate-600">
                Upload image files directly to your Supabase Storage bucket (`project-images`). They will be hosted free of charge!
              </p>

              <div className="flex flex-col md:flex-row gap-3 items-center">
                <label className="anime-btn-secondary cursor-pointer inline-flex items-center gap-2">
                  <UploadCloud size={16} /> Choose File & Upload
                  <input type="file" accept="image/*" onChange={handleUploadFile} disabled={isUploading} className="hidden" />
                </label>
                <span className="text-slate-500 font-bold">OR</span>
                <div className="flex gap-2 flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Or paste image URL (e.g. /projectt/saddasa/1.webp)"
                    value={imageInput}
                    onChange={e => setImageInput(e.target.value)}
                    className="flex-1 p-2 border-2 border-black bg-white"
                  />
                  <button type="button" onClick={handleAddImageUrl} className="anime-btn-secondary">
                    Add URL
                  </button>
                </div>
              </div>

              {isUploading && <p className="text-rose-600 font-bold animate-pulse">Uploading image to Supabase Storage...</p>}

              {/* Uploaded Images Preview List */}
              <div className="space-y-2 mt-2">
                <span className="font-bold">Images List ({editingProject.images?.length || 0}):</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {editingProject.images?.map((imgUrl, idx) => (
                    <div key={idx} className="relative group border-2 border-black bg-white p-1">
                      <img src={imgUrl} alt={`Screenshot ${idx}`} className="w-full h-24 object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-rose-600 text-white p-1 border border-black text-xs font-bold hover:bg-rose-700"
                        title="Remove image"
                      >
                        <Trash2 size={12} />
                      </button>
                      <p className="text-[10px] truncate font-mono mt-1 text-slate-600">{imgUrl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t-2 border-black">
              <button type="button" onClick={() => setEditingProject(null)} className="anime-btn-secondary">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="anime-btn-primary">
                Save to Supabase Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table */}
      <div className="anime-card p-6 border-4 border-black bg-white shadow-[6px_6px_0_0_#000]">
        <h2 className="text-xl font-black uppercase mb-4">Existing Projects ({projects.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-black bg-amber-200">
                <th className="p-3 font-black">Image</th>
                <th className="p-3 font-black">Title</th>
                <th className="p-3 font-black">Category</th>
                <th className="p-3 font-black">Type / Year</th>
                <th className="p-3 font-black">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(proj => (
                <tr key={proj.id} className="border-b border-black hover:bg-slate-50">
                  <td className="p-3">
                    <img src={proj.images[0] || '/projectt/jagadhita.webp'} alt="" className="w-12 h-10 object-cover border border-black" />
                  </td>
                  <td className="p-3 font-bold">
                    {proj.title}
                    <div className="text-[10px] text-slate-500 font-normal">{proj.id}</div>
                  </td>
                  <td className="p-3">{proj.category}</td>
                  <td className="p-3">{proj.type} ({proj.year})</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/project/${proj.id}`} target="_blank" className="p-1 border border-black bg-sky-100 hover:bg-sky-200" title="View Page">
                        <ExternalLink size={14} />
                      </Link>
                      <button type="button" onClick={() => handleOpenForm(proj)} className="p-1 border border-black bg-amber-100 hover:bg-amber-200" title="Edit">
                        <Edit3 size={14} />
                      </button>
                      <button type="button" onClick={() => handleDelete(proj.id, proj.title)} className="p-1 border border-black bg-rose-100 hover:bg-rose-200 text-rose-700" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default AdminProjects;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabase';
import { getProjects, saveProjectToSupabase, deleteProjectFromSupabase, uploadProjectImage } from '../services/projectService';
import { type Project } from '../data/projects';
import { ArrowLeft, Plus, Trash2, Edit3, UploadCloud, CheckCircle2, AlertTriangle, ShieldCheck, Lock, RefreshCw, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';

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
      setPassError('Password salah. Silakan periksa kembali passcode admin Anda.');
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

      setStatusMsg({ type: 'success', text: `Gambar berhasil diunggah ke Supabase Storage!` });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal mengunggah gambar ke Supabase' });
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
      setStatusMsg({ type: 'success', text: `Proyek "${fullProject.title}" berhasil disimpan di Supabase!` });
      setEditingProject(null);
      await loadProjectsData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error menyimpan proyek di Supabase' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) return;

    try {
      setLoading(true);
      await deleteProjectFromSupabase(id);
      setStatusMsg({ type: 'success', text: `Proyek "${title}" telah dihapus dari Supabase.` });
      await loadProjectsData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal menghapus proyek' });
    } finally {
      setLoading(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main id="main-content" className="section-wrap pt-36 pb-24 max-w-md mx-auto px-4">
        <div className="anime-card p-8 text-slate-900 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-6 border-b border-rose-200 pb-4">
            <Lock className="w-7 h-7 text-rose-600" />
            <h1 className="text-2xl font-bold tracking-tight">Portfolio Admin</h1>
          </div>
          <p className="text-sm font-medium mb-6 text-slate-600 leading-relaxed">
            Masukkan passcode rahasia untuk mengelola proyek & mengunggah foto ke Supabase.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-700">Passcode Admin</label>
              <input
                type="password"
                placeholder="Masukkan passcode admin..."
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className="w-full p-3 border border-rose-300 rounded-xl font-mono focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-slate-900"
              />
            </div>
            {passError && <p className="text-xs font-semibold text-rose-700 bg-rose-100 p-2.5 rounded-lg border border-rose-300">{passError}</p>}
            <button type="submit" className="anime-btn-primary w-full justify-center">
              Unlock Dashboard <ShieldCheck size={18} />
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/" className="text-xs font-semibold text-rose-600 hover:underline inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Kembali ke Portfolio
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="section-wrap pt-32 pb-24 max-w-6xl mx-auto space-y-8 px-4">
      {/* Header Bar */}
      <div className="anime-card p-6 md:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="manga-eyebrow flex items-center gap-2 mb-1.5 text-xs font-bold tracking-wider">
            <Sparkles size={16} /> ADMIN PANEL — SUPABASE DYNAMIC MANAGEMENT
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Portfolio Admin</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={loadProjectsData} className="anime-btn-secondary text-xs" title="Refresh data">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button type="button" onClick={() => handleOpenForm()} className="anime-btn-primary text-xs">
            <Plus size={16} /> Tambah Proyek Baru
          </button>
          <Link to="/" className="anime-btn-secondary text-xs flex items-center gap-1">
            <ArrowLeft size={14} /> Ke Portfolio
          </Link>
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div className={`p-4 rounded-2xl border text-sm flex items-center justify-between shadow-sm ${configured ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-amber-50 border-amber-300 text-amber-950'}`}>
        <div className="flex items-center gap-3">
          {configured ? (
            <CheckCircle2 className="text-emerald-600 w-6 h-6 flex-shrink-0" />
          ) : (
            <AlertTriangle className="text-amber-600 w-6 h-6 flex-shrink-0" />
          )}
          <div>
            <span className="font-bold uppercase tracking-wider text-xs">{configured ? 'Supabase Connected' : 'Supabase Not Configured'}</span>
            <p className="text-xs font-medium opacity-90">
              {configured
                ? 'Project Anda terhubung langsung ke Supabase Database & Storage. Perubahan akan tersimpan otomatis.'
                : 'Menggunakan fallback data lokal. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY di Vercel.'}
            </p>
          </div>
        </div>
      </div>

      {statusMsg && (
        <div className={`p-4 rounded-2xl border text-xs font-semibold shadow-sm ${statusMsg.type === 'success' ? 'bg-emerald-100 border-emerald-300 text-emerald-950' : 'bg-rose-100 border-rose-300 text-rose-950'}`}>
          {statusMsg.text}
        </div>
      )}

      {/* Project Form Modal / Drawer */}
      {editingProject && (
        <div className="anime-card p-6 md:p-8 rounded-3xl space-y-6">
          <div className="flex items-center justify-between border-b border-rose-200/80 pb-4">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-rose-600">
              {editingProject.title ? `Edit Proyek: ${editingProject.title}` : 'Tambah Proyek Baru'}
            </h2>
            <button type="button" onClick={() => setEditingProject(null)} className="anime-btn-secondary text-xs">
              Batal
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs font-medium">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1 opacity-80">ID Proyek (Slug Unik)</label>
                <input
                  type="text"
                  required
                  value={editingProject.id || ''}
                  onChange={e => setEditingProject({ ...editingProject, id: e.target.value })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-mono text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="e.g. apotek-saddasa"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 opacity-80">Judul Proyek</label>
                <input
                  type="text"
                  required
                  value={editingProject.title || ''}
                  onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="e.g. Apotek Saddasa"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 opacity-80">Kategori</label>
                <input
                  type="text"
                  required
                  value={editingProject.category || ''}
                  onChange={e => setEditingProject({ ...editingProject, category: e.target.value })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="HEALTHCARE, SaaS MODULE, E-COMMERCE"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold mb-1 opacity-80">Tipe Proyek</label>
                <select
                  value={editingProject.type || 'Individual'}
                  onChange={e => setEditingProject({ ...editingProject, type: e.target.value as any })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  <option value="Individual">Individual</option>
                  <option value="Team">Team</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1 opacity-80">Tahun</label>
                <input
                  type="text"
                  value={editingProject.year || '2026'}
                  onChange={e => setEditingProject({ ...editingProject, year: e.target.value })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 opacity-80">Peran / Role</label>
                <input
                  type="text"
                  value={editingProject.role || 'Full-stack Developer'}
                  onChange={e => setEditingProject({ ...editingProject, role: e.target.value })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 opacity-80">Tech Stack (pisahkan koma)</label>
              <input
                type="text"
                value={Array.isArray(editingProject.tech) ? editingProject.tech.join(', ') : editingProject.tech || ''}
                onChange={e => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(s => s.trim()) as any })}
                className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                placeholder="Laravel, React, TypeScript, Tailwind CSS, MySQL"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 opacity-80">Deskripsi Singkat</label>
              <textarea
                rows={3}
                required
                value={editingProject.description || ''}
                onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                placeholder="Jelaskan apa fungsi dari aplikasi ini..."
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 opacity-80">Tantangan Teknikal (Challenges)</label>
              <textarea
                rows={2}
                value={editingProject.challenges || ''}
                onChange={e => setEditingProject({ ...editingProject, challenges: e.target.value })}
                className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                placeholder="Tantangan teknikal yang berhasil diselesaikan..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1 opacity-80">Link Live Demo (Opsional)</label>
                <input
                  type="url"
                  value={editingProject.liveLink || ''}
                  onChange={e => setEditingProject({ ...editingProject, liveLink: e.target.value })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="https://aplikasi-anda.com"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 opacity-80">Link GitHub Repo (Opsional)</label>
                <input
                  type="url"
                  value={editingProject.githubLink || ''}
                  onChange={e => setEditingProject({ ...editingProject, githubLink: e.target.value })}
                  className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>

            {/* Supabase Storage Image Upload Section */}
            <div className="p-5 border border-rose-200 bg-rose-500/5 rounded-2xl space-y-4">
              <span className="font-bold text-sm tracking-wide flex items-center gap-2 text-rose-600">
                <UploadCloud size={20} /> SUPABASE STORAGE — UNGGAH FOTO SCREENSHOT PROYEK
              </span>
              <p className="text-slate-600 text-xs leading-relaxed">
                Unggah gambar langsung dari komputer ke bucket Supabase Storage (`project-images`). Gambar akan di-host secara publik dan gratis!
              </p>

              <div className="flex flex-col md:flex-row gap-3 items-center">
                <label className="anime-btn-primary cursor-pointer inline-flex items-center gap-2 text-xs">
                  <UploadCloud size={16} /> Pilih File & Unggah Langsung
                  <input type="file" accept="image/*" onChange={handleUploadFile} disabled={isUploading} className="hidden" />
                </label>
                <span className="text-slate-400 font-bold">ATAU</span>
                <div className="flex gap-2 flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Atau tempel URL gambar (contoh: /projectt/saddasa/1.webp)"
                    value={imageInput}
                    onChange={e => setImageInput(e.target.value)}
                    className="flex-1 p-2.5 border border-rose-300 rounded-xl bg-white text-slate-900"
                  />
                  <button type="button" onClick={handleAddImageUrl} className="anime-btn-secondary text-xs">
                    + Tambah URL
                  </button>
                </div>
              </div>

              {isUploading && <p className="text-rose-600 font-bold animate-pulse">Mengunggah gambar ke Supabase Storage...</p>}

              {/* Uploaded Images Preview List */}
              <div className="space-y-2 mt-3">
                <span className="font-semibold text-slate-700">Daftar Foto Screenshot ({editingProject.images?.length || 0}):</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {editingProject.images?.map((imgUrl, idx) => (
                    <div key={idx} className="relative group border border-rose-200 bg-white p-2 rounded-xl shadow-sm">
                      <img src={imgUrl} alt={`Screenshot ${idx}`} className="w-full h-24 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-3 right-3 bg-rose-600 text-white p-1.5 rounded-lg border border-white text-xs font-bold hover:bg-rose-700 shadow"
                        title="Hapus gambar ini"
                      >
                        <Trash2 size={13} />
                      </button>
                      <p className="text-[10px] truncate font-mono mt-1 text-slate-500 font-medium">{imgUrl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-rose-200/80">
              <button type="button" onClick={() => setEditingProject(null)} className="anime-btn-secondary">
                Batal
              </button>
              <button type="submit" disabled={loading} className="anime-btn-primary">
                Simpan ke Supabase Database
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Table Container */}
      <div className="anime-card p-6 md:p-8 rounded-3xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rose-200/80 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-rose-600" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              DAFTAR PROYEK PORTFOLIO ({projects.length})
            </h2>
          </div>
          <button type="button" onClick={() => handleOpenForm()} className="anime-btn-primary text-xs">
            <Plus size={16} /> Tambah Proyek
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-rose-200/60 bg-white/50 backdrop-blur-sm">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-rose-200/80 bg-rose-500/10 text-slate-800">
                <th className="p-3.5 font-bold uppercase tracking-wider">Gambar</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Judul & Slug</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Kategori</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Tipe / Tahun</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-200/50">
              {projects.map(proj => (
                <tr key={proj.id} className="transition-colors hover:bg-rose-500/5">
                  <td className="p-3">
                    <img
                      src={proj.images[0] || '/projectt/jagadhita.webp'}
                      alt={proj.title}
                      className="w-16 h-12 object-cover rounded-xl border border-rose-200 shadow-sm bg-slate-100"
                    />
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-sm text-slate-900 block">{proj.title}</span>
                    <span className="text-[11px] font-mono text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-md inline-block mt-0.5">
                      {proj.id}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-rose-100 text-rose-900 px-2.5 py-1 rounded-full font-bold uppercase text-[10px] tracking-wide inline-block">
                      {proj.category}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">
                    <div>{proj.type}</div>
                    <div className="text-slate-500 font-normal text-[11px]">Tahun {proj.year}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/project/${proj.id}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-rose-100/70 hover:bg-rose-200 text-slate-800 font-bold transition-all shadow-sm"
                        title="Lihat Halaman Detail"
                      >
                        <ExternalLink size={15} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenForm(proj)}
                        className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold transition-all shadow-sm"
                        title="Edit Proyek Ini"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="p-2 rounded-xl bg-rose-200 hover:bg-rose-300 text-rose-950 font-bold transition-all shadow-sm"
                        title="Hapus Proyek"
                      >
                        <Trash2 size={15} />
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

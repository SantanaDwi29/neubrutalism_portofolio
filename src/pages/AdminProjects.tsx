import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isSupabaseConfigured } from '../lib/supabase';
import { getProjects, saveProjectToSupabase, deleteProjectFromSupabase, uploadProjectImage } from '../services/projectService';
import { getCertificates, saveCertificateToSupabase, deleteCertificateFromSupabase, fallbackCertificates, type Certificate } from '../services/certificateService';
import { getExperiences, saveExperienceToSupabase, deleteExperienceFromSupabase, fallbackExperiences, type ExperienceEntry } from '../services/experienceService';
import { type Project } from '../data/projects';
import { ArrowLeft, Plus, Trash2, Edit3, UploadCloud, CheckCircle2, AlertTriangle, ShieldCheck, Lock, RefreshCw, ExternalLink, Image as ImageIcon, Sparkles, Award, Briefcase } from 'lucide-react';

type AdminTab = 'projects' | 'certificates' | 'experiences';

export const AdminProjects = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState('');

  const [activeTab, setActiveTab] = useState<AdminTab>('projects');

  // Data States
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);

  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form States
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<ExperienceEntry> | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const configured = isSupabaseConfigured();
  const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setLoading(true);
    const [projData, certData, expData] = await Promise.all([
      getProjects(),
      getCertificates(),
      getExperiences(),
    ]);
    setProjects(projData);
    setCertificates(certData.length ? certData : fallbackCertificates);
    setExperiences(expData.length ? expData : fallbackExperiences);
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

  // --- PROJECT ACTIONS ---
  const handleOpenProjectForm = (proj?: Project) => {
    if (proj) setEditingProject({ ...proj });
    else setEditingProject({
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
    });
  };

  const handleUploadProjectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !editingProject) return;
    setIsUploading(true);
    try {
      const publicUrl = await uploadProjectImage(files[0], 'portfolio-shots');
      setEditingProject({
        ...editingProject,
        images: [...(editingProject.images || []), publicUrl],
      });
      setStatusMsg({ type: 'success', text: 'Gambar proyek berhasil diunggah ke Supabase Storage!' });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal mengunggah gambar' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.id || !editingProject?.title) return;
    try {
      setLoading(true);
      const fullProj: Project = {
        id: editingProject.id,
        title: editingProject.title,
        category: editingProject.category || 'WEB APP',
        type: (editingProject.type as any) || 'Individual',
        year: editingProject.year || '2026',
        description: editingProject.description || '',
        images: editingProject.images?.length ? editingProject.images : ['/projectt/jagadhita.webp'],
        role: editingProject.role || 'Full-stack Developer',
        tech: Array.isArray(editingProject.tech) ? editingProject.tech : (editingProject.tech as any || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        challenges: editingProject.challenges || '',
        liveLink: editingProject.liveLink || undefined,
        githubLink: editingProject.githubLink || undefined,
        color: editingProject.color || 'bg-primary-container',
      };
      await saveProjectToSupabase(fullProj);
      setStatusMsg({ type: 'success', text: `Proyek "${fullProj.title}" berhasil disimpan di Supabase!` });
      setEditingProject(null);
      await loadAllData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Error menyimpan proyek' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Hapus proyek "${title}"?`)) return;
    try {
      setLoading(true);
      await deleteProjectFromSupabase(id);
      setStatusMsg({ type: 'success', text: `Proyek "${title}" dihapus.` });
      await loadAllData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal menghapus proyek' });
    } finally {
      setLoading(false);
    }
  };

  // --- CERTIFICATE ACTIONS ---
  const handleOpenCertForm = (cert?: Certificate) => {
    if (cert) setEditingCert({ ...cert });
    else setEditingCert({
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      topic: '',
      category: 'Web Dev',
      image: '/certification/aws.webp',
      pdf: '/certification/aws.pdf',
      date: new Date().getFullYear().toString(),
      skills: ['React', 'TypeScript'],
      credentialId: '',
    });
  };

  const handleUploadCertImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length || !editingCert) return;
    setIsUploading(true);
    try {
      const publicUrl = await uploadProjectImage(files[0], 'certificates');
      setEditingCert({ ...editingCert, image: publicUrl, pdf: editingCert.pdf || publicUrl });
      setStatusMsg({ type: 'success', text: 'Gambar sertifikat berhasil diunggah ke Supabase Storage!' });
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal mengunggah file' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert?.id || !editingCert?.name) return;
    try {
      setLoading(true);
      const fullCert: Certificate = {
        id: editingCert.id,
        name: editingCert.name,
        issuer: editingCert.issuer || '',
        topic: editingCert.topic || '',
        category: editingCert.category || 'Web Dev',
        image: editingCert.image || '/certification/aws.webp',
        pdf: editingCert.pdf || editingCert.image || '/certification/aws.pdf',
        date: editingCert.date || '2026',
        skills: Array.isArray(editingCert.skills) ? editingCert.skills : (editingCert.skills as any || '').split(',').map((s: string) => s.trim()).filter(Boolean),
        credentialId: editingCert.credentialId || undefined,
      };
      await saveCertificateToSupabase(fullCert);
      setStatusMsg({ type: 'success', text: `Sertifikat "${fullCert.name}" berhasil disimpan di Supabase!` });
      setEditingCert(null);
      await loadAllData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal menyimpan sertifikat' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCert = async (id: string, name: string) => {
    if (!confirm(`Hapus sertifikat "${name}"?`)) return;
    try {
      setLoading(true);
      await deleteCertificateFromSupabase(id);
      setStatusMsg({ type: 'success', text: `Sertifikat "${name}" dihapus.` });
      await loadAllData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal menghapus sertifikat' });
    } finally {
      setLoading(false);
    }
  };

  // --- EXPERIENCE ACTIONS ---
  const handleOpenExpForm = (exp?: ExperienceEntry) => {
    if (exp) setEditingExp({ ...exp });
    else setEditingExp({
      id: `chapter-0${experiences.length + 1}`,
      chapter: `CHAPTER 0${experiences.length + 1}`,
      year: `${new Date().getFullYear()} - PRESENT`,
      role: 'Web Developer',
      company: 'CV Sinar Teknologi Indonesia',
      location: 'Full-time / Bali',
      description: '',
      tech: ['React', 'TypeScript', 'Laravel'],
      projectLink: '/project/apotek-saddasa',
    });
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.id || !editingExp?.role) return;
    try {
      setLoading(true);
      const fullExp: ExperienceEntry = {
        id: editingExp.id,
        chapter: editingExp.chapter || 'CHAPTER 01',
        year: editingExp.year || '2026',
        role: editingExp.role,
        company: editingExp.company || '',
        location: editingExp.location || 'Bali',
        description: editingExp.description || '',
        tech: Array.isArray(editingExp.tech) ? editingExp.tech : (editingExp.tech as any || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        projectLink: editingExp.projectLink || undefined,
      };
      await saveExperienceToSupabase(fullExp);
      setStatusMsg({ type: 'success', text: `Pengalaman "${fullExp.chapter} - ${fullExp.role}" berhasil disimpan!` });
      setEditingExp(null);
      await loadAllData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal menyimpan pengalaman' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExp = async (id: string, role: string) => {
    if (!confirm(`Hapus entri pengalaman "${role}"?`)) return;
    try {
      setLoading(true);
      await deleteExperienceFromSupabase(id);
      setStatusMsg({ type: 'success', text: `Pengalaman "${role}" dihapus.` });
      await loadAllData();
    } catch (err: any) {
      setStatusMsg({ type: 'error', text: err.message || 'Gagal menghapus pengalaman' });
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
            Masukkan passcode rahasia untuk mengelola proyek, sertifikat, & timeline pengalaman.
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
          <button type="button" onClick={loadAllData} className="anime-btn-secondary text-xs" title="Refresh data">
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
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
                ? 'Project Anda terhubung ke Supabase. Seluruh proyek, sertifikat, dan timeline akan tersimpan otomatis.'
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

      {/* Admin Management Navigation Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-rose-200/80 pb-3">
        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${activeTab === 'projects' ? 'bg-rose-600 text-white shadow-md' : 'bg-white/80 text-slate-700 hover:bg-rose-50'}`}
        >
          <ImageIcon size={16} /> Proyek ({projects.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certificates')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${activeTab === 'certificates' ? 'bg-rose-600 text-white shadow-md' : 'bg-white/80 text-slate-700 hover:bg-rose-50'}`}
        >
          <Award size={16} /> Sertifikat ({certificates.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('experiences')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${activeTab === 'experiences' ? 'bg-rose-600 text-white shadow-md' : 'bg-white/80 text-slate-700 hover:bg-rose-50'}`}
        >
          <Briefcase size={16} /> Pengalaman & Timeline ({experiences.length})
        </button>
      </div>

      {/* ================= TAB 1: PROJECTS MANAGEMENT ================= */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
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

              <form onSubmit={handleSaveProject} className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">ID Proyek (Slug Unik)</label>
                    <input
                      type="text"
                      required
                      value={editingProject.id || ''}
                      onChange={e => setEditingProject({ ...editingProject, id: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-mono text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
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
                  />
                </div>

                {/* Storage Uploader */}
                <div className="p-4 border border-rose-200 bg-rose-500/5 rounded-2xl space-y-3">
                  <span className="font-bold text-xs uppercase text-rose-600 flex items-center gap-2">
                    <UploadCloud size={16} /> Supabase Storage — Upload Foto Screenshot
                  </span>
                  <input type="file" accept="image/*" onChange={handleUploadProjectFile} disabled={isUploading} className="block text-xs" />
                  {isUploading && <p className="text-rose-600 font-bold animate-pulse">Uploading...</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-rose-200/80">
                  <button type="button" onClick={() => setEditingProject(null)} className="anime-btn-secondary">Batal</button>
                  <button type="submit" disabled={loading} className="anime-btn-primary">Simpan Proyek</button>
                </div>
              </form>
            </div>
          )}

          <div className="anime-card p-6 md:p-8 rounded-3xl">
            <div className="flex items-center justify-between border-b border-rose-200/80 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight">Daftar Proyek ({projects.length})</h2>
              <button type="button" onClick={() => handleOpenProjectForm()} className="anime-btn-primary text-xs">
                <Plus size={16} /> Tambah Proyek
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-rose-200/60 bg-white/50">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="border-b border-rose-200/80 bg-rose-500/10 text-slate-800">
                    <th className="p-3.5 font-bold uppercase">Gambar</th>
                    <th className="p-3.5 font-bold uppercase">Judul & Slug</th>
                    <th className="p-3.5 font-bold uppercase">Kategori</th>
                    <th className="p-3.5 font-bold uppercase text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-200/50">
                  {projects.map(proj => (
                    <tr key={proj.id} className="transition-colors hover:bg-rose-500/5">
                      <td className="p-3">
                        <img src={proj.images[0] || '/projectt/jagadhita.webp'} alt="" className="w-16 h-12 object-cover rounded-xl border border-rose-200 shadow-sm" />
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-sm text-slate-900 block">{proj.title}</span>
                        <span className="text-[11px] font-mono text-rose-600 bg-rose-100/60 px-2 py-0.5 rounded-md inline-block">{proj.id}</span>
                      </td>
                      <td className="p-3 font-semibold">{proj.category}</td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/project/${proj.id}`} target="_blank" className="p-2 rounded-xl bg-rose-100/70 hover:bg-rose-200 text-slate-800 font-bold"><ExternalLink size={15} /></Link>
                          <button type="button" onClick={() => handleOpenProjectForm(proj)} className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold"><Edit3 size={15} /></button>
                          <button type="button" onClick={() => handleDeleteProject(proj.id, proj.title)} className="p-2 rounded-xl bg-rose-200 hover:bg-rose-300 text-rose-950 font-bold"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: CERTIFICATES MANAGEMENT ================= */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          {editingCert && (
            <div className="anime-card p-6 md:p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-rose-200/80 pb-4">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-rose-600">
                  {editingCert.name ? `Edit Sertifikat: ${editingCert.name}` : 'Tambah Sertifikat Baru'}
                </h2>
                <button type="button" onClick={() => setEditingCert(null)} className="anime-btn-secondary text-xs">
                  Batal
                </button>
              </div>

              <form onSubmit={handleSaveCert} className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">ID Sertifikat (Slug)</label>
                    <input
                      type="text"
                      required
                      value={editingCert.id || ''}
                      onChange={e => setEditingCert({ ...editingCert, id: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-mono text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Nama Sertifikat</label>
                    <input
                      type="text"
                      required
                      value={editingCert.name || ''}
                      onChange={e => setEditingCert({ ...editingCert, name: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Penerbit (Issuer)</label>
                    <input
                      type="text"
                      required
                      value={editingCert.issuer || ''}
                      onChange={e => setEditingCert({ ...editingCert, issuer: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Kategori</label>
                    <select
                      value={editingCert.category || 'Web Dev'}
                      onChange={e => setEditingCert({ ...editingCert, category: e.target.value as any })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    >
                      <option value="Cloud & Infra">Cloud & Infra</option>
                      <option value="Database">Database</option>
                      <option value="AI & Innovation">AI & Innovation</option>
                      <option value="Web Dev">Web Dev</option>
                      <option value="Professional">Professional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Tahun / Tanggal</label>
                    <input
                      type="text"
                      value={editingCert.date || '2026'}
                      onChange={e => setEditingCert({ ...editingCert, date: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Credential ID (Opsional)</label>
                    <input
                      type="text"
                      value={editingCert.credentialId || ''}
                      onChange={e => setEditingCert({ ...editingCert, credentialId: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 opacity-80">Topik / Fokus Materi</label>
                  <input
                    type="text"
                    required
                    value={editingCert.topic || ''}
                    onChange={e => setEditingCert({ ...editingCert, topic: e.target.value })}
                    className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 opacity-80">Skills (pisahkan koma)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingCert.skills) ? editingCert.skills.join(', ') : editingCert.skills || ''}
                    onChange={e => setEditingCert({ ...editingCert, skills: e.target.value.split(',').map(s => s.trim()) as any })}
                    className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold"
                  />
                </div>

                {/* Storage Uploader */}
                <div className="p-4 border border-rose-200 bg-rose-500/5 rounded-2xl space-y-3">
                  <span className="font-bold text-xs uppercase text-rose-600 flex items-center gap-2">
                    <UploadCloud size={16} /> Supabase Storage — Unggah File Gambar / PDF Sertifikat
                  </span>
                  <input type="file" accept="image/*,.pdf" onChange={handleUploadCertImage} disabled={isUploading} className="block text-xs" />
                  {isUploading && <p className="text-rose-600 font-bold animate-pulse">Uploading...</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-rose-200/80">
                  <button type="button" onClick={() => setEditingCert(null)} className="anime-btn-secondary">Batal</button>
                  <button type="submit" disabled={loading} className="anime-btn-primary">Simpan Sertifikat</button>
                </div>
              </form>
            </div>
          )}

          <div className="anime-card p-6 md:p-8 rounded-3xl">
            <div className="flex items-center justify-between border-b border-rose-200/80 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight">Daftar Sertifikat ({certificates.length})</h2>
              <button type="button" onClick={() => handleOpenCertForm()} className="anime-btn-primary text-xs">
                <Plus size={16} /> Tambah Sertifikat
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-rose-200/60 bg-white/50">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="border-b border-rose-200/80 bg-rose-500/10 text-slate-800">
                    <th className="p-3.5 font-bold uppercase">Preview</th>
                    <th className="p-3.5 font-bold uppercase">Nama Sertifikat</th>
                    <th className="p-3.5 font-bold uppercase">Penerbit</th>
                    <th className="p-3.5 font-bold uppercase">Kategori / Tahun</th>
                    <th className="p-3.5 font-bold uppercase text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-200/50">
                  {certificates.map(cert => (
                    <tr key={cert.id} className="transition-colors hover:bg-rose-500/5">
                      <td className="p-3">
                        <img src={cert.image} alt="" className="w-16 h-12 object-cover rounded-xl border border-rose-200 shadow-sm" />
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-sm text-slate-900 block">{cert.name}</span>
                        <span className="text-[11px] text-slate-500">{cert.topic}</span>
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{cert.issuer}</td>
                      <td className="p-3 font-semibold">
                        <span className="bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full text-[10px]">{cert.category}</span>
                        <div className="text-slate-500 font-normal mt-0.5">{cert.date}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button type="button" onClick={() => handleOpenCertForm(cert)} className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold"><Edit3 size={15} /></button>
                          <button type="button" onClick={() => handleDeleteCert(cert.id, cert.name)} className="p-2 rounded-xl bg-rose-200 hover:bg-rose-300 text-rose-950 font-bold"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: EXPERIENCES MANAGEMENT ================= */}
      {activeTab === 'experiences' && (
        <div className="space-y-6">
          {editingExp && (
            <div className="anime-card p-6 md:p-8 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-rose-200/80 pb-4">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-rose-600">
                  {editingExp.role ? `Edit Chapter: ${editingExp.chapter}` : 'Tambah Chapter Pengalaman Baru'}
                </h2>
                <button type="button" onClick={() => setEditingExp(null)} className="anime-btn-secondary text-xs">
                  Batal
                </button>
              </div>

              <form onSubmit={handleSaveExp} className="space-y-4 text-xs font-medium">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Chapter Tag (e.g. CHAPTER 03)</label>
                    <input
                      type="text"
                      required
                      value={editingExp.chapter || ''}
                      onChange={e => setEditingExp({ ...editingExp, chapter: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Peran / Role</label>
                    <input
                      type="text"
                      required
                      value={editingExp.role || ''}
                      onChange={e => setEditingExp({ ...editingExp, role: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Perusahaan / Institusi</label>
                    <input
                      type="text"
                      required
                      value={editingExp.company || ''}
                      onChange={e => setEditingExp({ ...editingExp, company: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">ID Unik</label>
                    <input
                      type="text"
                      required
                      value={editingExp.id || ''}
                      onChange={e => setEditingExp({ ...editingExp, id: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Rentang Tahun</label>
                    <input
                      type="text"
                      value={editingExp.year || '2026'}
                      onChange={e => setEditingExp({ ...editingExp, year: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 opacity-80">Lokasi / Tipe Kerja</label>
                    <input
                      type="text"
                      value={editingExp.location || 'Full-time / Bali'}
                      onChange={e => setEditingExp({ ...editingExp, location: e.target.value })}
                      className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 opacity-80">Deskripsi Pencapaian & Tugas</label>
                  <textarea
                    rows={3}
                    required
                    value={editingExp.description || ''}
                    onChange={e => setEditingExp({ ...editingExp, description: e.target.value })}
                    className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 opacity-80">Tech Stack (pisahkan koma)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingExp.tech) ? editingExp.tech.join(', ') : editingExp.tech || ''}
                    onChange={e => setEditingExp({ ...editingExp, tech: e.target.value.split(',').map(s => s.trim()) as any })}
                    className="w-full p-3 border border-rose-300 rounded-xl bg-white text-slate-900 font-semibold"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-rose-200/80">
                  <button type="button" onClick={() => setEditingExp(null)} className="anime-btn-secondary">Batal</button>
                  <button type="submit" disabled={loading} className="anime-btn-primary">Simpan Pengalaman</button>
                </div>
              </form>
            </div>
          )}

          <div className="anime-card p-6 md:p-8 rounded-3xl">
            <div className="flex items-center justify-between border-b border-rose-200/80 pb-4 mb-6">
              <h2 className="text-xl font-bold tracking-tight">Timeline Pengalaman ({experiences.length})</h2>
              <button type="button" onClick={() => handleOpenExpForm()} className="anime-btn-primary text-xs">
                <Plus size={16} /> Tambah Chapter
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-rose-200/60 bg-white/50">
              <table className="w-full text-left font-sans text-xs border-collapse">
                <thead>
                  <tr className="border-b border-rose-200/80 bg-rose-500/10 text-slate-800">
                    <th className="p-3.5 font-bold uppercase">Chapter</th>
                    <th className="p-3.5 font-bold uppercase">Role & Perusahaan</th>
                    <th className="p-3.5 font-bold uppercase">Tahun / Lokasi</th>
                    <th className="p-3.5 font-bold uppercase text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-200/50">
                  {experiences.map(exp => (
                    <tr key={exp.id} className="transition-colors hover:bg-rose-500/5">
                      <td className="p-3 font-mono font-bold text-rose-600">{exp.chapter}</td>
                      <td className="p-3">
                        <span className="font-bold text-sm text-slate-900 block">{exp.role}</span>
                        <span className="text-xs text-slate-600 font-medium">{exp.company}</span>
                      </td>
                      <td className="p-3 font-semibold text-slate-800">
                        <div>{exp.year}</div>
                        <div className="text-slate-500 font-normal text-[11px]">{exp.location}</div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center justify-center gap-2">
                          <button type="button" onClick={() => handleOpenExpForm(exp)} className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold"><Edit3 size={15} /></button>
                          <button type="button" onClick={() => handleDeleteExp(exp.id, exp.role)} className="p-2 rounded-xl bg-rose-200 hover:bg-rose-300 text-rose-950 font-bold"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminProjects;

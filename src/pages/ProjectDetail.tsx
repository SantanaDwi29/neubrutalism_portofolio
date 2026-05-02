import { useParams, Link } from 'react-router-dom';

export const ProjectDetail = () => {
  const { id } = useParams();

  // Mock data for the project
  const project = {
    title: id === 'ghost-zine' ? 'Ghost Zine Archive' : 'Neptune Finance Platform',
    category: id === 'ghost-zine' ? 'ARCHIVE' : 'FINTECH',
    year: '2023',
    description: 'A revolutionary interface designed for the next generation of digital assets. Featuring real-time analytics and heavy grid-based UI. We challenged the conventional soft-UI norms of fintech by introducing a highly rigid, brutalist approach to data visualization.',
    image: id === 'ghost-zine' 
      ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-mCK-67ymH1Pm4PhvCdDxK748VHLQyuHm2s17CTEh7JolZp7bkebWXVucmid6DVWVcin0P0cXsgDJGjE8Qb1hMwDlhlZjy15B_qv1L1L80TzZfKyOXyxwbo3Jh_pJ3byMypvOH0iD_RB-UQbR92bmI156Py2QrqEsfV-3awqrKr0xxxNYOnAIXTn3SElTddlY-Sm6LmULBEmPFfyuFBWkVAaoTnd-a2MMEncnVsLcO_b_sVUXkQHdWgbl8afCvBCcpvtshBQk0bF' 
      : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmvrceUzHpvBS9jegXWJegK4C1yqla640KUOpgESKHWT6Sg9YFOhsbDGo3PzBCVyxdxwq_UErZf3Db-U1xgGfh43y-Y5sBvgPu062MOkhse7Ba1Vg6z7bqH7t-yP0qGzGgv-qfytis0wK3lT7kipWTp4RI_2Yi6MKp48-C2U1rdUq7r8Hugf86wjzcyjO31KC_Lj6XKfzjinJ83FTzyFdkCteIv8GDNN7sD38cg68WHUXWStcVBELriYfUXSDGX4VLCnHM-PLxm6Ne',
    role: 'Lead Designer & Developer',
    tech: ['React', 'TypeScript', 'Tailwind', 'Zustand', 'Framer Motion'],
    challenges: 'The biggest challenge was maintaining high performance with heavy SVG filters and custom borders while rendering 1000+ data points per second. We solved this by offloading the rendering to a WebGL canvas and using requestAnimationFrame for smooth animations.',
  };

  return (
    <main className="max-w-[1024px] mx-auto px-6 py-12 md:py-24 space-y-16">
      
      {/* Back Navigation */}
      <div>
        <Link to="/" className="inline-flex items-center gap-2 font-label-bold uppercase bg-white border-[3px] border-black px-4 py-2 hard-shadow neubrutalist-btn">
          <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
          Back to Projects
        </Link>
      </div>

      {/* Header Section */}
      <section className="space-y-6">
        <div className="flex gap-2">
          <span className="bg-primary-container border-2 border-black px-4 py-2 font-label-bold uppercase rotate-1 hard-shadow">{project.category}</span>
          <span className="bg-tertiary-container border-2 border-black px-4 py-2 font-label-bold uppercase -rotate-1 hard-shadow">{project.year}</span>
        </div>
        <h1 className="font-headline-xl text-5xl md:text-7xl uppercase border-b-[6px] border-black pb-4">
          {project.title}
        </h1>
      </section>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-[500px] border-[3px] border-black hard-shadow-lg overflow-hidden rotate-1 bg-black">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-500" />
      </div>

      {/* Details Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Column - Info */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-white border-[3px] border-black p-6 hard-shadow -rotate-1">
            <h3 className="font-headline-md text-2xl uppercase border-b-2 border-black pb-2 mb-4">Role</h3>
            <p className="font-body-md font-bold">{project.role}</p>
          </div>
          
          <div className="bg-secondary-container border-[3px] border-black p-6 hard-shadow rotate-1">
            <h3 className="font-headline-md text-2xl uppercase border-b-2 border-black pb-2 mb-4 text-white">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="bg-white border-2 border-black px-2 py-1 font-label-bold text-xs uppercase">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Content */}
        <div className="md:col-span-8 bg-surface-container-highest border-[3px] border-black p-8 md:p-12 hard-shadow space-y-8">
          <div>
            <h2 className="font-headline-lg text-3xl uppercase mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-4xl" data-icon="info">info</span>
              Overview
            </h2>
            <p className="font-body-lg text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
          
          <div className="bg-white border-[3px] border-black p-6 shadow-[inset_4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline-md text-2xl uppercase mb-4 text-secondary">The Challenge</h2>
            <p className="font-body-md">
              {project.challenges}
            </p>
          </div>

          <button className="w-full bg-primary text-on-primary border-[3px] border-black py-4 font-label-bold uppercase text-xl hard-shadow neubrutalist-btn">
            View Live Site
          </button>
        </div>

      </section>
    </main>
  );
};

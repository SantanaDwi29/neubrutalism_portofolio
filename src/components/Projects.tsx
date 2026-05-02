
import { Link } from 'react-router-dom';

export const Projects = () => {
  return (
    <section id="work" className="space-y-12">
      <div className="flex justify-between items-center md:items-end flex-wrap gap-4">
        <h2 className="font-headline-lg text-3xl md:text-headline-lg uppercase">Selected Works</h2>
        <a className="font-label-bold uppercase underline decoration-2 underline-offset-4 mb-2" href="#">View All (12)</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Large Project Card */}
        <div className="md:col-span-8 bg-white border-[3px] border-black hard-shadow overflow-hidden flex flex-col group">
          <div className="h-64 md:h-96 border-b-[3px] border-black overflow-hidden">
            <img 
              alt="Fintech Dashboard" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmvrceUzHpvBS9jegXWJegK4C1yqla640KUOpgESKHWT6Sg9YFOhsbDGo3PzBCVyxdxwq_UErZf3Db-U1xgGfh43y-Y5sBvgPu062MOkhse7Ba1Vg6z7bqH7t-yP0qGzGgv-qfytis0wK3lT7kipWTp4RI_2Yi6MKp48-C2U1rdUq7r8Hugf86wjzcyjO31KC_Lj6XKfzjinJ83FTzyFdkCteIv8GDNN7sD38cg68WHUXWStcVBELriYfUXSDGX4VLCnHM-PLxm6Ne"
            />
          </div>
          <div className="p-8 space-y-4">
            <div className="flex gap-2">
              <span className="bg-primary-container border-2 border-black px-3 py-1 text-xs font-label-bold uppercase rotate-1">FINTECH</span>
              <span className="bg-tertiary-container text-white border-2 border-black px-3 py-1 text-xs font-label-bold uppercase -rotate-1">2023</span>
            </div>
            <h3 className="font-headline-md text-headline-md uppercase">Neptune Finance Platform</h3>
            <p className="font-body-md text-body-md">A revolutionary banking interface designed for the next generation of digital assets. Featuring real-time analytics and heavy grid-based UI.</p>
            <Link to="/project/neptune-finance" className="bg-black text-white px-6 py-2 font-label-bold uppercase neubrutalist-btn flex items-center gap-2 w-max">
              Case Study <span className="material-symbols-outlined" data-icon="open_in_new">open_in_new</span>
            </Link>
          </div>
        </div>
        {/* Side Project Card */}
        <div className="md:col-span-4 bg-primary-container border-[3px] border-black hard-shadow flex flex-col md:rotate-1">
          <div className="p-8 flex-1 space-y-6">
            <div className="w-16 h-16 bg-white border-[3px] border-black flex items-center justify-center -rotate-6">
              <span className="material-symbols-outlined text-4xl" data-icon="shapes">shapes</span>
            </div>
            <h3 className="font-headline-md text-2xl uppercase">Design System OS</h3>
            <p className="font-body-md text-sm">A centralized library of neubrutalist components for rapid prototyping and development consistency across global teams.</p>
            <ul className="space-y-2 font-label-bold text-xs uppercase opacity-80">
              <li>• Documentation</li>
              <li>• Storybook</li>
              <li>• Figma Plugin</li>
            </ul>
          </div>
          <div className="p-8 border-t-[3px] border-black bg-white">
            <Link to="/project/design-system" className="block w-full text-center border-[3px] border-black py-3 font-label-bold uppercase hard-shadow neubrutalist-btn">Preview</Link>
          </div>
        </div>
        {/* Horizontal Project */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 bg-secondary-container border-[3px] border-black hard-shadow md:-rotate-1 overflow-hidden">
          <div className="order-2 md:order-1 p-8 md:p-12 space-y-6 flex flex-col items-start">
            <h3 className="font-headline-md text-headline-lg uppercase text-white">Ghost Zine Archive</h3>
            <p className="font-body-md text-white/90 text-lg">Digital preservation of underground punk zines from the 90s, utilizing OCR and interactive masonry layouts.</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-white border-2 border-black px-4 py-2 font-label-bold text-sm uppercase">Next.js</div>
              <div className="bg-white border-2 border-black px-4 py-2 font-label-bold text-sm uppercase">Cloudinary</div>
              <div className="bg-white border-2 border-black px-4 py-2 font-label-bold text-sm uppercase">Canvas API</div>
            </div>
            <Link to="/project/ghost-zine" className="mt-auto bg-black text-white px-6 py-2 font-label-bold uppercase neubrutalist-btn flex items-center gap-2">
              Case Study <span className="material-symbols-outlined" data-icon="open_in_new">open_in_new</span>
            </Link>
          </div>
          <div className="order-1 md:order-2 h-64 md:h-auto border-b-[3px] md:border-b-0 md:border-l-[3px] border-black overflow-hidden relative group">
            <img 
              alt="Ghost Zine" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 absolute inset-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-mCK-67ymH1Pm4PhvCdDxK748VHLQyuHm2s17CTEh7JolZp7bkebWXVucmid6DVWVcin0P0cXsgDJGjE8Qb1hMwDlhlZjy15B_qv1L1L80TzZfKyOXyxwbo3Jh_pJ3byMypvOH0iD_RB-UQbR92bmI156Py2QrqEsfV-3awqrKr0xxxNYOnAIXTn3SElTddlY-Sm6LmULBEmPFfyuFBWkVAaoTnd-a2MMEncnVsLcO_b_sVUXkQHdWgbl8afCvBCcpvtshBQk0bF"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

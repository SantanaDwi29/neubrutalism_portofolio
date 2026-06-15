import React from 'react';
import { DecorativeElements } from './DecorativeElements';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative space-y-12">
      <DecorativeElements mode="shapes" opacity="opacity-30" />
      <h2 className="font-headline-lg text-3xl md:text-headline-lg uppercase flex items-center gap-4 flex-wrap">
        <span className="material-symbols-outlined text-3xl md:text-4xl" data-icon="verified">verified</span> Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Internship */}
        <div className="bg-secondary-container text-white border-[3px] border-black hard-shadow flex flex-col group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="h-48 border-b-[3px] border-black overflow-hidden relative bg-white">
            <img 
              src="/certification/Sertifikat_Magang.png" 
              alt="Internship Certificate" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white text-black border-2 border-black px-2 py-1 text-xs font-label-bold uppercase">Internship</span>
              <span className="material-symbols-outlined text-2xl" data-icon="work">work</span>
            </div>
            <h3 className="font-headline-md text-xl uppercase mb-2">Internship Program</h3>
            <p className="font-body-md text-sm mb-6 flex-1">Successfully completed professional internship with hands-on industry experience and collaborative projects.</p>
            <a href="/certification/Sertifikat_Magang.png" target="_blank" rel="noreferrer" className="w-full bg-black text-white text-center py-2 font-label-bold uppercase neubrutalist-btn flex items-center justify-center gap-2">
              View Certificate <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
            </a>
          </div>
        </div>
        
        {/* Junior Web Dev */}
        <div className="bg-primary-container border-[3px] border-black hard-shadow flex flex-col group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="h-48 border-b-[3px] border-black overflow-hidden relative bg-white">
            <img 
              src="/certification/Sertifikat_JWD.png" 
              alt="Junior Web Dev Certificate" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white text-black border-2 border-black px-2 py-1 text-xs font-label-bold uppercase">Development</span>
              <span className="material-symbols-outlined text-2xl" data-icon="laptop_mac">laptop_mac</span>
            </div>
            <h3 className="font-headline-md text-xl uppercase mb-2">Junior Web Dev</h3>
            <p className="font-body-md text-sm mb-6 flex-1">Certified in modern web development fundamentals, responsive design, and frontend implementation.</p>
            <a href="/certification/Sertifikat_JWD.pdf" target="_blank" rel="noreferrer" className="w-full bg-black text-white text-center py-2 font-label-bold uppercase neubrutalist-btn flex items-center justify-center gap-2">
              View Certificate <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
            </a>
          </div>
        </div>
        
        {/* AWS */}
        <div className="bg-gradient-to-br from-[#ff9900] to-[#232f3e] text-white border-[3px] border-black hard-shadow flex flex-col group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="h-48 border-b-[3px] border-black overflow-hidden relative bg-white">
            <img 
              src="/certification/aws.png" 
              alt="AWS Certificate" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white text-black border-2 border-black px-2 py-1 text-xs font-label-bold uppercase">Cloud</span>
              <span className="material-symbols-outlined text-2xl" data-icon="dns">dns</span>
            </div>
            <h3 className="font-headline-md text-xl uppercase mb-2">AWS Certification</h3>
            <p className="font-body-md text-sm mb-6 flex-1">Studying AWS cloud configuration, including S3 storage, networking fundamentals, and related cloud services.</p>
            <a href="/certification/aws.pdf" target="_blank" rel="noreferrer" className="w-full bg-black text-white text-center py-2 font-label-bold uppercase neubrutalist-btn flex items-center justify-center gap-2">
              View Certificate <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
            </a>
          </div>
        </div>

        {/* MongoDB */}
        <div className="bg-tertiary-container text-white border-[3px] border-black hard-shadow flex flex-col group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="h-48 border-b-[3px] border-black overflow-hidden relative bg-white">
            <img 
              src="/certification/mongodb.png" 
              alt="MongoDB Certificate" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white text-black border-2 border-black px-2 py-1 text-xs font-label-bold uppercase">Database</span>
              <span className="material-symbols-outlined text-2xl" data-icon="database">database</span>
            </div>
            <h3 className="font-headline-md text-xl uppercase mb-2">MongoDB Certified</h3>
            <p className="font-body-md text-sm mb-6 flex-1">Demonstrated proficiency in NoSQL database design, aggregation frameworks, and MongoDB deployment.</p>
            <a href="/certification/mongodb.pdf" target="_blank" rel="noreferrer" className="w-full bg-black text-white text-center py-2 font-label-bold uppercase neubrutalist-btn flex items-center justify-center gap-2">
              View Certificate <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
            </a>
          </div>
        </div>
        {/* Dicoding AI Praktis */}
        <div className="bg-[#4F46E5] text-white border-[3px] border-black hard-shadow flex flex-col group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="h-48 border-b-[3px] border-black overflow-hidden relative bg-white">
            <img 
              src="/certification/dicoding_AI_Praktis_untuk_Produktivitas.png" 
              alt="Dicoding AI Praktis Certificate" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white text-black border-2 border-black px-2 py-1 text-xs font-label-bold uppercase">AI Camp</span>
              <span className="material-symbols-outlined text-2xl" data-icon="smart_toy">smart_toy</span>
            </div>
            <h3 className="font-headline-md text-xl uppercase mb-2">AI Praktis untuk Produktivitas</h3>
            <p className="font-body-md text-sm mb-6 flex-1">Completed the Dicoding AI Camp module focusing on practical artificial intelligence tools for productivity.</p>
            <a href="/certification/dicoding_AI_Praktis_untuk_Produktivitas.pdf" target="_blank" rel="noreferrer" className="w-full bg-black text-white text-center py-2 font-label-bold uppercase neubrutalist-btn flex items-center justify-center gap-2">
              View Certificate <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Dicoding Generative AI */}
        <div className="bg-[#EC4899] text-white border-[3px] border-black hard-shadow flex flex-col group overflow-hidden hover:-translate-y-2 transition-transform duration-300">
          <div className="h-48 border-b-[3px] border-black overflow-hidden relative bg-white">
            <img 
              src="/certification/dicoding_Belajar_Penggunaan_Generative_AI.png" 
              alt="Dicoding Generative AI Certificate" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-white text-black border-2 border-black px-2 py-1 text-xs font-label-bold uppercase">AI Camp</span>
              <span className="material-symbols-outlined text-2xl" data-icon="memory">memory</span>
            </div>
            <h3 className="font-headline-md text-xl uppercase mb-2">Penggunaan Generative AI</h3>
            <p className="font-body-md text-sm mb-6 flex-1">Completed the Dicoding AI Camp module on understanding and utilizing Generative AI technologies.</p>
            <a href="/certification/dicoding_Belajar_Penggunaan_Generative_AI.pdf" target="_blank" rel="noreferrer" className="w-full bg-black text-white text-center py-2 font-label-bold uppercase neubrutalist-btn flex items-center justify-center gap-2">
              View Certificate <span className="material-symbols-outlined text-sm" data-icon="open_in_new">open_in_new</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

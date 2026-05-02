

export const Hero: React.FC = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-8 -rotate-1">
          <div className="inline-block bg-tertiary-container border-2 border-black px-4 py-1 hard-shadow text-on-tertiary-container font-label-bold uppercase">
            Available for Work 2024
          </div>
          <h1 className="font-headline-xl text-headline-xl uppercase">
            I BUILD <span className="bg-primary-container px-2">BRUTAL</span> DIGITAL <span className="text-secondary">EXPERIENCES</span>.
          </h1>
          <p className="font-body-lg text-body-lg max-w-xl">
            I am a Front-End Developer student from Bali State Polytechnic who is passionate about building intuitive web experiences. Armed with a foundation in system development and a commitment to security, I am ready to bring digital innovation. </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary border-[3px] border-black px-8 py-4 font-label-bold uppercase hard-shadow neubrutalist-btn flex items-center gap-2">
              View Projects <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </button>
            <a href="https://drive.google.com/file/d/1XwoxxsxWcmVBZScjTSJ7giGYm07xLilK/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="bg-white text-black border-[3px] border-black px-8 py-4 font-label-bold uppercase hard-shadow neubrutalist-btn inline-block text-center">
              Resume
            </a>
          </div>
        </div>
        <div className="md:col-span-4 rotate-2">
          <div className="aspect-square bg-white border-[3px] border-black hard-shadow-lg overflow-hidden grayscale contrast-125">
            <img
              alt="I Made Santana Dwiananda"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0o39kGQA1aqKcW1RKkIB9biokJEaR3EmKWqXQRZlBG31du-3bDpjV1aMBYuoAcABZhtpv3lsyQQ-98b--NfIGyRLWu6wK70K_ruVvk3GFBPIJZ0au5TzNFvunbYQC1stiY2J1AwuXXIwjNmuZgzoztj_OFUxLOwvGXkQpUbGaqi51d8gd7xNFoJP10TnsfhUqTdshCtvp-mltl27gQX9IGYdRXhEYxGE8soDnvuJ3h10zhnF8sPGVbcopGv-KZS1TklggLgdMdkzX"
            />
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-screen -ml-6 md:-ml-[calc((100vw-1024px)/2+24px)] overflow-hidden bg-primary-container border-y-[3px] border-black py-4 flex whitespace-nowrap">
        <div className="flex animate-marquee font-headline-md uppercase font-black space-x-12">
          <span>UI/UX DESIGN • FULL-STACK DEVELOPMENT • BRANDING • MOTION GRAPHICS • CREATIVE CODING • </span>
          <span>UI/UX DESIGN • FULL-STACK DEVELOPMENT • BRANDING • MOTION GRAPHICS • CREATIVE CODING • </span>
          <span>UI/UX DESIGN • FULL-STACK DEVELOPMENT • BRANDING • MOTION GRAPHICS • CREATIVE CODING • </span>
        </div>
      </div>
    </>
  );
};

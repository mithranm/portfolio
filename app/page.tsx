// portfolio/app/page.tsx
// This is a Server Component. No 'use client' here.

import { getSortedProjectsData, ProjectData } from '@/lib/projects';
import ProjectGrid from '@/components/ProjectGrid';
import HeaderControls from '@/components/HeaderControls';

export default function HomePage() {
  const allProjectsData: ProjectData[] = getSortedProjectsData();

  return (
    <>
      <HeaderControls />

      {/* The main container gets a higher z-index to render on top of the crosshair */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <header className="mb-20 text-center">
          <h1
            className="glitch-text text-4xl sm:text-6xl lg:text-7xl font-bold"
            data-text="Mithran Mohanraj"
          >
            Mithran Mohanraj
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto uppercase tracking-widest">
            Software Engineer | AI/ML Systems | Enterprise Security
          </p>
          
          <div className="mt-8 text-base text-foreground/60 max-w-3xl mx-auto">
            <p className="mb-4">
              Software Engineer with expertise in AI/ML systems, cloud architecture, and full-stack development. 
              Currently at Lumbra Inc. building multi-LLM orchestration pipelines and zero trust security infrastructure.
            </p>
            <p className="mb-4">
              Experience with Fortune 500 companies in data privacy, scalable web applications, and automated research workflows.
              Previously at Peraton Inc. and Karsun Solutions developing enterprise-grade systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm uppercase tracking-wider">
              <span className="px-3 py-1 border border-foreground/20">Python</span>
              <span className="px-3 py-1 border border-foreground/20">PyTorch</span>
              <span className="px-3 py-1 border border-foreground/20">AWS</span>
              <span className="px-3 py-1 border border-foreground/20">React</span>
              <span className="px-3 py-1 border border-foreground/20">Next.js</span>
              <span className="px-3 py-1 border border-foreground/20">Zero Trust</span>
            </div>
            <div className="flex justify-center gap-6 mt-8 text-sm uppercase tracking-wider">
              <a href="mailto:mithran.mohanraj@gmail.com" className="hover:text-accent transition-colors border-b border-transparent hover:border-foreground">
                Email
              </a>
              <a href="https://linkedin.com/in/mithran-mohanraj" target="_blank" className="hover:text-accent transition-colors border-b border-transparent hover:border-foreground">
                LinkedIn
              </a>
              <a href="https://github.com/mithranm" target="_blank" className="hover:text-accent transition-colors border-b border-transparent hover:border-foreground">
                GitHub
              </a>
            </div>
          </div>
        </header>

        <ProjectGrid projects={allProjectsData} />

        <footer className="text-center mt-24 pt-8 pb-4">
          <p className="text-xs text-foreground/50 uppercase tracking-widest">
            © {new Date().getFullYear()} Mithran Mohanraj
          </p>
        </footer>
      </div>
    </>
  );
}
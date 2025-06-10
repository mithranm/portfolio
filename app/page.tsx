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
            I build things for the web and explore the frontiers of AI.
          </p>
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
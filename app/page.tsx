// portfolio/app/page.tsx
import { getSortedProjectsData, ProjectData } from '@/lib/projects'; // Adjust path based on tsconfig
import ProjectCard from '@/components/ProjectCard'; // Adjust path based on tsconfig

// FIX: Removed unnecessary async
export default function HomePage() {
  const allProjectsData: ProjectData[] = getSortedProjectsData();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-50">
          Mithran Mohanraj
        </h1>
        <p className="mt-3 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
          Welcome to my portfolio. Here are some of the projects I've worked on.
        </p>
      </header>

      <main>
        {allProjectsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {allProjectsData.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-500 dark:text-neutral-400">
            No projects to display yet.
          </p>
        )}
      </main>

      <footer className="text-center mt-16 pt-8 pb-4 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} Mithran Mohanraj. All rights reserved.
        </p>
        <p className="text-xs text-neutral-500 dark:text-gray-500 mt-1">
          Built with Next.js & Tailwind CSS. Hosted on Cloudflare Pages.
        </p>
      </footer>
    </div>
  );
}
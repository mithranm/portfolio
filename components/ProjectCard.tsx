// portfolio/components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import type { ProjectData } from '@/lib/projects';
import ScreenshotImage from './ScreenshotImage';

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isDynamicScreenshot = project.image.startsWith('dynamic-screenshot:');
  const dynamicScreenshotUrl = isDynamicScreenshot
    ? project.image.substring('dynamic-screenshot:'.length)
    : '';

  const projectPageUrl = `/projects/${project.slug}`;

  return (
    <article className="bg-white dark:bg-neutral-800 shadow-lg rounded-lg overflow-hidden transition-all hover:shadow-xl flex flex-col group">
      <Link href={projectPageUrl} className="block">
        {/* Image container - 16:9 Aspect Ratio */}
        <div className="relative w-full bg-neutral-200 dark:bg-neutral-700" style={{ paddingBottom: '56.25%' }}>
          <div className="absolute inset-0">
            {isDynamicScreenshot ? (
              <ScreenshotImage targetUrl={dynamicScreenshotUrl} altText={project.imageAlt} />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                style={{ objectFit: 'cover' }}
                className="dark:brightness-90 group-hover:scale-105 transition-transform duration-300 ease-in-out"
                sizes="(max-width: 767px) 100vw, 50vw"
                priority={project.order <= 2}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-500 dark:text-neutral-400">No Image</p>
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Text Content Area */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <Link href={projectPageUrl} className="block mb-2 group">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h2>
        </Link>

        {project.summary && (
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 mb-4 flex-grow"> {/* flex-grow to take up space before tags/link */}
            {project.summary}
          </p>
        )}
        
        {/* Links and Tags - Pushed to bottom */}
        <div className="mt-auto pt-2">
          {project.projectUrl && project.projectUrl !== "#" && (
             <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-3 text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              View Source / Demo →
            </a>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className={`pt-3 ${project.projectUrl && project.projectUrl !== "#" ? 'border-t' : ''} border-neutral-200 dark:border-neutral-700`}>
              {/* <h4 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-2">TAGS</h4> Remove if tags are self-explanatory */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-md text-xs sm:text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
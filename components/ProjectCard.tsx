// components/ProjectCard.tsx
'use client'; // This must be a Client Component to use the router hook.

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import the Next.js router
import type { ProjectData } from '@/lib/projects';
import ScreenshotImage from './ScreenshotImage';
import type { MouseEvent, TouchEvent } from 'react';

interface ProjectCardProps {
  project: ProjectData;
  onMouseEnter: (e: MouseEvent<HTMLElement>) => void;
  onClick: () => void;
  onTouchStart: (e: TouchEvent<HTMLElement>) => void;
}

export default function ProjectCard({ project, onMouseEnter, onClick, onTouchStart }: ProjectCardProps) {
  const router = useRouter(); // Get the router instance
  const isDynamicScreenshot = project.image.startsWith('dynamic-screenshot:');
  const dynamicScreenshotUrl = isDynamicScreenshot
    ? project.image.substring('dynamic-screenshot:'.length)
    : '';
  const projectPageUrl = `/projects/${project.slug}`;

  // This combined handler triggers the hitmarker effect AND navigates.
  const handleCardClick = () => {
    onClick(); // Fire the hitmarker effect from the parent.
    router.push(projectPageUrl); // Navigate to the project page.
  };
  
  // This combined handler is for mobile tap.
  const handleCardTap = (e: TouchEvent<HTMLElement>) => {
    onTouchStart(e); // Fire the hitmarker effect.
    router.push(projectPageUrl); // Navigate to the project page.
  };

  return (
    <article
      className="project-card group cursor-pointer" // Add cursor-pointer for better UX
      onMouseEnter={onMouseEnter}
      onClick={handleCardClick} // Use the combined desktop click handler
      onTouchStart={handleCardTap} // Use the combined mobile tap handler
    >
      {/* The content is no longer wrapped in individual <Link> tags. */}
      <div className="relative z-[2]">
        <div className="project-card-image-wrapper">
          <div className="absolute inset-0">
            {isDynamicScreenshot ? (
              <ScreenshotImage targetUrl={dynamicScreenshotUrl} altText={project.imageAlt} />
            ) : project.image ? (
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                style={{ objectFit: 'cover' }}
                className="project-card-image"
                sizes="(max-width: 767px) 100vw, 50vw"
                priority={project.order <= 2}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-foreground/50">No Image</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow relative z-[2] bg-card-bg">
        {/* The title is now a simple <h2>, not a link. */}
        <h2 className="text-xl sm:text-2xl font-bold transition-colors duration-300 mb-2">
          {project.title}
        </h2>

        {project.summary && (
          <p className="text-base text-foreground/70 mb-4 flex-grow">
            {project.summary}
          </p>
        )}
        
        <div className="mt-auto pt-4">
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-border/10 text-foreground/80 rounded-sm text-xs font-mono uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
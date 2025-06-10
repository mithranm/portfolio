// components/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectData } from '@/lib/projects';
import ScreenshotImage from './ScreenshotImage';
import type { MouseEvent, TouchEvent } from 'react';

// onMouseLeave is no longer needed here
interface ProjectCardProps {
  project: ProjectData;
  onMouseEnter: (e: MouseEvent<HTMLElement>) => void;
  onClick: () => void;
  onTouchStart: (e: TouchEvent<HTMLElement>) => void;
}

export default function ProjectCard({ project, onMouseEnter, onClick, onTouchStart }: ProjectCardProps) {
  const isDynamicScreenshot = project.image.startsWith('dynamic-screenshot:');
  const dynamicScreenshotUrl = isDynamicScreenshot
    ? project.image.substring('dynamic-screenshot:'.length)
    : '';

  const projectPageUrl = `/projects/${project.slug}`;

  return (
    <article
      className="project-card group"
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      onTouchStart={onTouchStart}
    >
      <Link href={projectPageUrl} className="block relative z-[2]">
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
      </Link>

      <div className="p-5 md:p-6 flex flex-col flex-grow relative z-[2] bg-card-bg">
        <Link href={projectPageUrl} className="block mb-2">
          <h2 className="text-xl sm:text-2xl font-bold transition-colors duration-300">
            {project.title}
          </h2>
        </Link>

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
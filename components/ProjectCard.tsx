// components/ProjectCard.tsx
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { ProjectData } from '@/lib/projects';
import ScreenshotImage from './ScreenshotImage';
import { useRef } from 'react';
import type { MouseEvent, TouchEvent } from 'react';

interface ProjectCardProps {
  project: ProjectData;
  onMouseEnter: (e: MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: MouseEvent<HTMLElement>) => void;
  onClick: (e: MouseEvent<HTMLElement>) => void;
  onTap: (e: TouchEvent<HTMLElement>) => void;
}

export default function ProjectCard({ project, onMouseEnter, onMouseLeave, onClick, onTap }: ProjectCardProps) {
  const router = useRouter();
  const isDynamicScreenshot = project.image.startsWith('dynamic-screenshot:');
  const dynamicScreenshotUrl = isDynamicScreenshot
    ? project.image.substring('dynamic-screenshot:'.length)
    : '';
  const projectPageUrl = `/projects/${project.slug}`;

  // Refs to manage touch vs. scroll detection
  const touchStartPos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  // This handler is for desktop clicks.
  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    onClick(e); // Fire the hitmarker effect from the parent, passing the event.
    router.push(projectPageUrl); // Navigate to the project page.
  };
  
  // Touch event handlers to distinguish a tap from a scroll on mobile
  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    isDragging.current = false;
  };

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    if (isDragging.current) return;
    
    const dx = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
    const dy = Math.abs(e.touches[0].clientY - touchStartPos.current.y);

    if (dx > 10 || dy > 10) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: TouchEvent<HTMLElement>) => {
    if (!isDragging.current) {
      onTap(e); // Use the onTap prop to fire the hitmarker effect.
      router.push(projectPageUrl);
    }
    isDragging.current = false;
  };

  return (
    <article
      className="project-card group cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave} // Added for consistent hover effect
      onClick={handleCardClick}   // Now passes the event
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
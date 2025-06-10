// components/ProjectGrid.tsx
'use client';

import { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { ProjectData } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

// Define the component's props interface
interface ProjectGridProps {
  projects: ProjectData[];
}

// Define types for the effect states
type ApproachLinesState = {
  visible: boolean;
  top: number;
  left: number;
  rotate1: number;
  rotate2: number;
};

type Hitmarker = {
  key: number;
  top: number;
  left: number;
  rotate1: number;
  rotate2: number;
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const { animationsEnabled } = useSettings();
  const [approachLines, setApproachLines] = useState<ApproachLinesState>({ visible: false, top: 0, left: 0, rotate1: 0, rotate2: 0 });
  const [hitmarkers, setHitmarkers] = useState<Hitmarker[]>([]);
  // FIX: Use a ref to store the timeout ID to prevent re-renders
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setApproachLines({ visible: false, top: 0, left: 0, rotate1: 0, rotate2: 0 });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Ensure timeout is cleared if the component unmounts
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (!animationsEnabled) return;

    // FIX: Clear any pending "hide" timeouts when entering a new card
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const top = rect.top + rect.height / 2;
    const left = rect.left + rect.width / 2;
    const rotate1 = Math.random() * 180;
    const rotate2 = rotate1 + 70 + Math.random() * 40;
    setApproachLines({ visible: true, top, left, rotate1, rotate2 });
  };

  const handleGridMouseLeave = () => {
    // FIX: Use a timeout to hide the lines. This prevents them from freezing on a fast exit.
    leaveTimeoutRef.current = setTimeout(() => {
      setApproachLines((prev) => ({ ...prev, visible: false }));
    }, 50); // A 50ms delay is imperceptible but robust
  };

  const handleClick = () => {
    if (!animationsEnabled || !approachLines.visible) return;
    setHitmarkers((prev) => [...prev, { ...approachLines, key: Date.now() }]);
  };

  const handleTap = (e: TouchEvent<HTMLElement>) => {
    if (!animationsEnabled) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const top = rect.top + rect.height / 2;
    const left = rect.left + rect.width / 2;
    const rotate1 = Math.random() * 180;
    const rotate2 = rotate1 + 70 + Math.random() * 40;
    setHitmarkers((prev) => [...prev, { key: Date.now(), top, left, rotate1, rotate2 }]);
  };

  const handleAnimationEnd = (key: number) => {
    setHitmarkers((prev) => prev.filter((h) => h.key !== key));
  };

  return (
    <>
      <div
        className="approach-lines"
        style={{
          opacity: animationsEnabled && approachLines.visible ? 1 : 0,
          top: `${approachLines.top}px`,
          left: `${approachLines.left}px`,
        }}
      >
        <div className="line" style={{ transform: `rotate(${approachLines.rotate1}deg)` }} />
        <div className="line" style={{ transform: `rotate(${approachLines.rotate2}deg)` }} />
      </div>

      {hitmarkers.map((h) => (
        <div
          key={h.key}
          className="hitmarker-effect"
          style={{ top: `${h.top}px`, left: `${h.left}px` }}
          onAnimationEnd={() => handleAnimationEnd(h.key)}
        >
          <div className="line" style={{ transform: `rotate(${h.rotate1}deg)` }} />
          <div className="line" style={{ transform: `rotate(${h.rotate2}deg)` }} />
        </div>
      ))}

      <main className="relative z-10">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
          onMouseLeave={handleGridMouseLeave}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              onMouseEnter={handleMouseEnter}
              onClick={handleClick}
              onTouchStart={handleTap}
            />
          ))}
        </div>
      </main>
    </>
  );
}
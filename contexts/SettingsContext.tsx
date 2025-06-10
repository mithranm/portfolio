// contexts/SettingsContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  animationsEnabled: boolean;
  toggleAnimations: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // FIX: Correctly check for the user's system preference for reduced motion.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setAnimationsEnabled(!prefersReducedMotion);
  }, []);

  useEffect(() => {
    if (animationsEnabled) {
      document.body.classList.remove('animations-disabled');
    } else {
      document.body.classList.add('animations-disabled');
    }
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  return (
    <SettingsContext.Provider value={{ animationsEnabled, toggleAnimations }}>
      {children}
    </SettingsContext.Provider>
  );
};
'use client';

import React from 'react';
import { useTheme } from '@/lib/providers/theme-provider';
import { ThemeLoadingOverlay } from './theme-loading-overlay';

interface ThemeLoadingWrapperProps {
  children: React.ReactNode;
}

export const ThemeLoadingWrapper: React.FC<ThemeLoadingWrapperProps> = ({ children }) => {
  const { isThemeLoading, setIsThemeLoading } = useTheme();

  const handleThemeLoadingComplete = () => {
    setIsThemeLoading(false);
  };

  return (
    <>
      {children}
      <ThemeLoadingOverlay isVisible={isThemeLoading} onComplete={handleThemeLoadingComplete} />
    </>
  );
};

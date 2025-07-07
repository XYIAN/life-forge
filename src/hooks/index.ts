// Custom hooks for Life Forge
// Export all data management hooks for convenient importing

export * from './use-focus-analytics';
export * from './use-mood-analytics';
export * from './use-water-history';
export * from './use-float-animation';
export * from './use-scroll-stagger';
export * from './use-celebration-animation';
export * from './useTheme';
export * from './useAnimation';
export * from './use-anime';

// Re-export provider hooks for convenience
export { useData } from '@/lib/providers/data-provider';
export { useDashboard } from '@/lib/providers/dashboard-provider';

// Local hooks
export { useSmoothCursor } from './useSmoothCursor';
export { useParticles } from './useParticles';

// Custom hooks for Life Forge
// Export all data management hooks for convenient importing

export { useDashboardConfig } from './use-dashboard-config';
export { useWaterHistory } from './use-water-history';
export { useMoodAnalytics } from './use-mood-analytics';
export { useFocusAnalytics } from './use-focus-analytics';

// Re-export provider hooks for convenience
export { useData } from '@/lib/providers/data-provider';
export { useDashboard } from '@/lib/providers/dashboard-provider';
export { useTheme } from '@/lib/providers/theme-provider';

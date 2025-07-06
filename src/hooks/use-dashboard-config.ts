'use client';

import { useDashboard } from '@/lib/providers/dashboard-provider';

/**
 * Custom hook for managing dashboard configuration
 * Provides easy access to panel configuration and management
 */
export const useDashboardConfig = () => {
  const { panels, enabledPanels, togglePanel, reorderPanels, resetToDefaults, isPanelEnabled } =
    useDashboard();

  // Get enabled panels count
  const enabledCount = enabledPanels.length;

  // Get disabled panels
  const disabledPanels = panels.filter(panel => !panel.enabled);

  // Get panel configuration by ID
  const getPanelConfig = (panelId: string) => {
    return panels.find(panel => panel.id === panelId);
  };

  // Enable multiple panels at once
  const enablePanels = (panelIds: string[]) => {
    panelIds.forEach(panelId => {
      if (!isPanelEnabled(panelId)) {
        togglePanel(panelId);
      }
    });
  };

  // Disable multiple panels at once
  const disablePanels = (panelIds: string[]) => {
    panelIds.forEach(panelId => {
      if (isPanelEnabled(panelId)) {
        togglePanel(panelId);
      }
    });
  };

  // Get all enabled panel IDs
  const getEnabledPanelIds = () => {
    return enabledPanels.map(panel => panel.id);
  };

  // Get all disabled panel IDs
  const getDisabledPanelIds = () => {
    return disabledPanels.map(panel => panel.id);
  };

  // Check if all panels are enabled
  const allPanelsEnabled = panels.length === enabledPanels.length;

  // Check if no panels are enabled
  const noPanelsEnabled = enabledPanels.length === 0;

  return {
    // Core dashboard state
    panels,
    enabledPanels,
    disabledPanels,
    enabledCount,

    // Panel management
    togglePanel,
    isPanelEnabled,
    getPanelConfig,
    enablePanels,
    disablePanels,
    reorderPanels,
    resetToDefaults,

    // Utility functions
    getEnabledPanelIds,
    getDisabledPanelIds,
    allPanelsEnabled,
    noPanelsEnabled,
  };
};

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface DashboardPanel {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  order: number;
}

export const DEFAULT_PANELS: DashboardPanel[] = [
  {
    id: "water-tracker",
    name: "Water Tracker",
    description: "Track your daily water intake",
    icon: "pi pi-tint",
    enabled: true,
    order: 1,
  },
  {
    id: "mood-tracker",
    name: "Mood Tracker",
    description: "Monitor your emotional state",
    icon: "pi pi-heart",
    enabled: true,
    order: 2,
  },
  {
    id: "quote-orb",
    name: "Quote Orb",
    description: "Inspirational quotes and wisdom",
    icon: "pi pi-star",
    enabled: true,
    order: 3,
  },
  {
    id: "goal-tracker",
    name: "Goal Tracker",
    description: "Track daily goals and objectives",
    icon: "pi pi-check-circle",
    enabled: true,
    order: 4,
  },
  {
    id: "focus-timer",
    name: "Focus Timer",
    description: "Pomodoro technique timer",
    icon: "pi pi-clock",
    enabled: true,
    order: 5,
  },
  {
    id: "habit-tracker",
    name: "Habit Tracker",
    description: "Build and maintain healthy habits",
    icon: "pi pi-calendar",
    enabled: false,
    order: 6,
  },
  {
    id: "energy-meter",
    name: "Energy Meter",
    description: "Track your energy levels",
    icon: "pi pi-bolt",
    enabled: false,
    order: 7,
  },
  {
    id: "gratitude-journal",
    name: "Gratitude Journal",
    description: "Daily gratitude practice",
    icon: "pi pi-sun",
    enabled: false,
    order: 8,
  },
];

interface DashboardContextType {
  panels: DashboardPanel[];
  enabledPanels: DashboardPanel[];
  togglePanel: (panelId: string) => void;
  reorderPanels: (panelId: string, newOrder: number) => void;
  resetToDefaults: () => void;
  isPanelEnabled: (panelId: string) => boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

interface DashboardProviderProps {
  children: React.ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [panels, setPanels] = useState<DashboardPanel[]>(DEFAULT_PANELS);

  // Load dashboard configuration from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem("life-forge-dashboard-config");
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setPanels(parsedConfig);
      } catch (error) {
        console.error("Error loading dashboard configuration:", error);
        setPanels(DEFAULT_PANELS);
      }
    }
  }, []);

  // Save dashboard configuration to localStorage
  useEffect(() => {
    localStorage.setItem("life-forge-dashboard-config", JSON.stringify(panels));
  }, [panels]);

  const togglePanel = (panelId: string) => {
    setPanels((prevPanels) =>
      prevPanels.map((panel) =>
        panel.id === panelId ? { ...panel, enabled: !panel.enabled } : panel
      )
    );
  };

  const reorderPanels = (panelId: string, newOrder: number) => {
    setPanels((prevPanels) => {
      const updatedPanels = [...prevPanels];
      const panelIndex = updatedPanels.findIndex((p) => p.id === panelId);

      if (panelIndex !== -1) {
        const [movedPanel] = updatedPanels.splice(panelIndex, 1);
        movedPanel.order = newOrder;
        updatedPanels.splice(newOrder - 1, 0, movedPanel);

        // Update order numbers for all panels
        updatedPanels.forEach((panel, index) => {
          panel.order = index + 1;
        });
      }

      return updatedPanels;
    });
  };

  const resetToDefaults = () => {
    setPanels(DEFAULT_PANELS);
    localStorage.removeItem("life-forge-dashboard-config");
  };

  const isPanelEnabled = (panelId: string) => {
    return panels.find((panel) => panel.id === panelId)?.enabled || false;
  };

  const enabledPanels = panels
    .filter((panel) => panel.enabled)
    .sort((a, b) => a.order - b.order);

  const value: DashboardContextType = {
    panels,
    enabledPanels,
    togglePanel,
    reorderPanels,
    resetToDefaults,
    isPanelEnabled,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

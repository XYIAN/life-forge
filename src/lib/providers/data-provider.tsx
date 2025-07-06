"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Data interfaces
export interface WaterEntry {
  id: string;
  timestamp: number;
  amount: number; // in ml
  sessionStart: number;
}

export interface MoodEntry {
  id: string;
  timestamp: number;
  mood: number; // 1-10 scale
  emoji: string;
  notes?: string;
}

export interface GoalEntry {
  id: string;
  timestamp: number;
  title: string;
  completed: boolean;
  completedAt?: number;
}

export interface FocusSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number; // in minutes
  type: "work" | "break";
  completed: boolean;
}

export interface AppData {
  waterEntries: WaterEntry[];
  moodEntries: MoodEntry[];
  goalEntries: GoalEntry[];
  focusSessions: FocusSession[];
  lastBackup?: number;
}

interface DataContextType {
  data: AppData;
  // Water tracking
  addWaterEntry: (amount: number) => void;
  getWaterEntriesForDate: (date: Date) => WaterEntry[];
  getTotalWaterForDate: (date: Date) => number;
  getCurrentWaterSession: () => WaterEntry[];
  // Mood tracking
  addMoodEntry: (mood: number, emoji: string, notes?: string) => void;
  getMoodEntriesForDate: (date: Date) => MoodEntry[];
  getLatestMoodEntry: () => MoodEntry | null;
  // Goal tracking
  addGoal: (title: string) => void;
  toggleGoal: (goalId: string) => void;
  getGoalsForDate: (date: Date) => GoalEntry[];
  getCompletedGoalsForDate: (date: Date) => GoalEntry[];
  // Focus sessions
  startFocusSession: (type: "work" | "break", duration: number) => string;
  endFocusSession: (sessionId: string) => void;
  getFocusSessionsForDate: (date: Date) => FocusSession[];
  // Data management
  exportData: () => string;
  importData: (jsonData: string) => void;
  clearAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  children: React.ReactNode;
}

const initialData: AppData = {
  waterEntries: [],
  moodEntries: [],
  goalEntries: [],
  focusSessions: [],
};

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<AppData>(initialData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("life-forge-data");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
      } catch (error) {
        console.error("Error loading data:", error);
        setData(initialData);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("life-forge-data", JSON.stringify(data));
  }, [data]);

  // Helper function to generate unique IDs
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  // Helper function to check if two dates are the same day
  const isSameDate = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  // Water tracking functions
  const addWaterEntry = (amount: number) => {
    const now = Date.now();
    const lastEntry = data.waterEntries[data.waterEntries.length - 1];
    const sessionStart =
      lastEntry && now - lastEntry.timestamp < 2 * 60 * 60 * 1000
        ? lastEntry.sessionStart
        : now;

    const newEntry: WaterEntry = {
      id: generateId(),
      timestamp: now,
      amount,
      sessionStart,
    };

    setData((prev) => ({
      ...prev,
      waterEntries: [...prev.waterEntries, newEntry],
    }));
  };

  const getWaterEntriesForDate = (date: Date) => {
    return data.waterEntries.filter((entry) =>
      isSameDate(new Date(entry.timestamp), date)
    );
  };

  const getTotalWaterForDate = (date: Date) => {
    return getWaterEntriesForDate(date).reduce(
      (total, entry) => total + entry.amount,
      0
    );
  };

  const getCurrentWaterSession = () => {
    const now = Date.now();
    const twoHoursAgo = now - 2 * 60 * 60 * 1000;

    return data.waterEntries.filter((entry) => entry.timestamp >= twoHoursAgo);
  };

  // Mood tracking functions
  const addMoodEntry = (mood: number, emoji: string, notes?: string) => {
    const newEntry: MoodEntry = {
      id: generateId(),
      timestamp: Date.now(),
      mood,
      emoji,
      notes,
    };

    setData((prev) => ({
      ...prev,
      moodEntries: [...prev.moodEntries, newEntry],
    }));
  };

  const getMoodEntriesForDate = (date: Date) => {
    return data.moodEntries.filter((entry) =>
      isSameDate(new Date(entry.timestamp), date)
    );
  };

  const getLatestMoodEntry = () => {
    return data.moodEntries[data.moodEntries.length - 1] || null;
  };

  // Goal tracking functions
  const addGoal = (title: string) => {
    const newGoal: GoalEntry = {
      id: generateId(),
      timestamp: Date.now(),
      title,
      completed: false,
    };

    setData((prev) => ({
      ...prev,
      goalEntries: [...prev.goalEntries, newGoal],
    }));
  };

  const toggleGoal = (goalId: string) => {
    setData((prev) => ({
      ...prev,
      goalEntries: prev.goalEntries.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              completed: !goal.completed,
              completedAt: !goal.completed ? Date.now() : undefined,
            }
          : goal
      ),
    }));
  };

  const getGoalsForDate = (date: Date) => {
    return data.goalEntries.filter((goal) =>
      isSameDate(new Date(goal.timestamp), date)
    );
  };

  const getCompletedGoalsForDate = (date: Date) => {
    return getGoalsForDate(date).filter((goal) => goal.completed);
  };

  // Focus session functions
  const startFocusSession = (type: "work" | "break", duration: number) => {
    const newSession: FocusSession = {
      id: generateId(),
      startTime: Date.now(),
      duration,
      type,
      completed: false,
    };

    setData((prev) => ({
      ...prev,
      focusSessions: [...prev.focusSessions, newSession],
    }));

    return newSession.id;
  };

  const endFocusSession = (sessionId: string) => {
    setData((prev) => ({
      ...prev,
      focusSessions: prev.focusSessions.map((session) =>
        session.id === sessionId
          ? { ...session, endTime: Date.now(), completed: true }
          : session
      ),
    }));
  };

  const getFocusSessionsForDate = (date: Date) => {
    return data.focusSessions.filter((session) =>
      isSameDate(new Date(session.startTime), date)
    );
  };

  // Data management functions
  const exportData = () => {
    const exportData = {
      ...data,
      exportedAt: Date.now(),
      version: "1.0.0",
    };
    return JSON.stringify(exportData, null, 2);
  };

  const importData = (jsonData: string) => {
    try {
      const importedData = JSON.parse(jsonData);
      // Validate imported data structure
      if (
        importedData.waterEntries &&
        importedData.moodEntries &&
        importedData.goalEntries &&
        importedData.focusSessions
      ) {
        setData({
          waterEntries: importedData.waterEntries || [],
          moodEntries: importedData.moodEntries || [],
          goalEntries: importedData.goalEntries || [],
          focusSessions: importedData.focusSessions || [],
          lastBackup: Date.now(),
        });
      }
    } catch (error) {
      console.error("Error importing data:", error);
      throw new Error("Invalid data format");
    }
  };

  const clearAllData = () => {
    setData(initialData);
    localStorage.removeItem("life-forge-data");
  };

  const value: DataContextType = {
    data,
    addWaterEntry,
    getWaterEntriesForDate,
    getTotalWaterForDate,
    getCurrentWaterSession,
    addMoodEntry,
    getMoodEntriesForDate,
    getLatestMoodEntry,
    addGoal,
    toggleGoal,
    getGoalsForDate,
    getCompletedGoalsForDate,
    startFocusSession,
    endFocusSession,
    getFocusSessionsForDate,
    exportData,
    importData,
    clearAllData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

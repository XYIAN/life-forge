'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';

// Theme definitions
export interface Theme {
  name: string;
  displayName: string;
  cssFile: string;
  isDark: boolean;
  category: 'light' | 'dark';
  description: string;
}

export const THEMES: Theme[] = [
  {
    name: 'saga-blue',
    displayName: 'Saga Blue',
    cssFile: 'saga-blue',
    isDark: false,
    category: 'light',
    description: 'Classic blue theme with clean design',
  },
  {
    name: 'saga-green',
    displayName: 'Saga Green',
    cssFile: 'saga-green',
    isDark: false,
    category: 'light',
    description: 'Fresh green theme for nature lovers',
  },
  {
    name: 'saga-orange',
    displayName: 'Saga Orange',
    cssFile: 'saga-orange',
    isDark: false,
    category: 'light',
    description: 'Warm orange theme with energy',
  },
  {
    name: 'saga-purple',
    displayName: 'Saga Purple',
    cssFile: 'saga-purple',
    isDark: false,
    category: 'light',
    description: 'Royal purple theme with elegance',
  },
  {
    name: 'arya-blue',
    displayName: 'Arya Blue',
    cssFile: 'arya-blue',
    isDark: true,
    category: 'dark',
    description: 'Dark blue theme with mystical vibes',
  },
  {
    name: 'arya-green',
    displayName: 'Arya Green',
    cssFile: 'arya-green',
    isDark: true,
    category: 'dark',
    description: 'Dark green theme with forest energy',
  },
  {
    name: 'arya-orange',
    displayName: 'Arya Orange',
    cssFile: 'arya-orange',
    isDark: true,
    category: 'dark',
    description: 'Dark orange theme with warmth',
  },
  {
    name: 'arya-purple',
    displayName: 'Arya Purple',
    cssFile: 'arya-purple',
    isDark: true,
    category: 'dark',
    description: 'Dark purple theme for the arcane',
  },
  {
    name: 'viva-light',
    displayName: 'Viva Light',
    cssFile: 'viva-light',
    isDark: false,
    category: 'light',
    description: 'Modern light theme with vibrancy',
  },
  {
    name: 'viva-dark',
    displayName: 'Viva Dark',
    cssFile: 'viva-dark',
    isDark: true,
    category: 'dark',
    description: 'Modern dark theme with depth',
  },
  {
    name: 'mira',
    displayName: 'Mira',
    cssFile: 'mira',
    isDark: false,
    category: 'light',
    description: 'Minimalist theme with clean aesthetics',
  },
  {
    name: 'nano',
    displayName: 'Nano',
    cssFile: 'nano',
    isDark: false,
    category: 'light',
    description: 'Compact theme with efficiency',
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  isDarkMode: boolean;
  setTheme: (theme: Theme) => void;
  toggleDarkMode: () => void;
  getRandomTheme: () => void;
  lightThemes: Theme[];
  darkThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(THEMES[0]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('life-forge-theme');
    const savedDarkMode = localStorage.getItem('life-forge-dark-mode');

    if (savedTheme) {
      const theme = THEMES.find(t => t.name === savedTheme) || THEMES[0];
      setCurrentTheme(theme);
    }

    if (savedDarkMode) {
      setIsDarkMode(savedDarkMode === 'true');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    // Remove existing theme link
    const existingLink = document.querySelector('link[data-theme]');
    if (existingLink) {
      existingLink.remove();
    }

    // Add new theme link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://unpkg.com/primereact@10.6.6/resources/themes/${currentTheme.cssFile}/theme.css`;
    link.setAttribute('data-theme', currentTheme.name);
    document.head.appendChild(link);

    // Apply dark mode class to body
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark');
    }

    // Save to localStorage
    localStorage.setItem('life-forge-theme', currentTheme.name);
    localStorage.setItem('life-forge-dark-mode', isDarkMode.toString());
  }, [currentTheme, isDarkMode]);

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    setIsDarkMode(theme.isDark);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    // Switch to corresponding theme
    const targetThemes = newDarkMode ? darkThemes : lightThemes;
    const correspondingTheme =
      targetThemes.find(
        t =>
          t.name.includes(currentTheme.name.split('-')[1]) ||
          t.name.includes(currentTheme.name.split('-')[0])
      ) || targetThemes[0];

    setCurrentTheme(correspondingTheme);
  };

  const getRandomTheme = () => {
    const availableThemes = isDarkMode ? darkThemes : lightThemes;
    const randomTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
    setCurrentTheme(randomTheme);
  };

  const lightThemes = THEMES.filter(theme => theme.category === 'light');
  const darkThemes = THEMES.filter(theme => theme.category === 'dark');

  const value: ThemeContextType = {
    currentTheme,
    isDarkMode,
    setTheme,
    toggleDarkMode,
    getRandomTheme,
    lightThemes,
    darkThemes,
  };

  return (
    <ThemeContext.Provider value={value}>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </ThemeContext.Provider>
  );
};

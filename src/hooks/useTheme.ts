import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    setIsDark(initialTheme === 'dark');

    // Apply theme to document
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setIsDark(newTheme === 'dark');

    // Save to localStorage
    localStorage.setItem('theme', newTheme);

    // Apply to document
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const setLightTheme = () => {
    setTheme('light');
    setIsDark(false);
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
  };

  const setDarkTheme = () => {
    setTheme('dark');
    setIsDark(true);
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
  };

  return {
    theme,
    isDark,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };
}

'use client';

import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Badge } from 'primereact/badge';
import { ToggleButton } from 'primereact/togglebutton';
import { useTheme, Theme } from '@/lib/providers/theme-provider';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const {
    currentTheme,
    isDarkMode,
    setTheme,
    toggleDarkMode,
    getRandomTheme,
    lightThemes,
    darkThemes,
  } = useTheme();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const activeThemes = isDarkMode ? darkThemes : lightThemes;

  const handleThemeSelect = (theme: Theme) => {
    setTheme(theme);
    setSidebarVisible(false);
  };

  const handleSurpriseMe = () => {
    getRandomTheme();
    setSidebarVisible(false);
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <Button
        icon="pi pi-palette"
        onClick={() => setSidebarVisible(true)}
        className={`theme-switcher-button ${className || ''}`}
        rounded
        severity="info"
        style={{
          fontSize: '1.25rem',
          width: '2.5rem',
          height: '2.5rem',
          color: 'var(--foreground)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(25px) saturate(180%)',
        }}
        aria-label="Open theme switcher"
      />

      {/* Theme Switcher Sidebar */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        position="left"
        style={{
          width: '90vw',
          maxWidth: '400px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          borderRight: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
        header="🎨 Theme Switcher"
        className="theme-switcher-sidebar"
      >
        <div className="flex flex-column gap-4">
          {/* Current Theme Display */}
          <Card className="text-center glass-card">
            <div className="flex flex-column gap-2">
              <i className="pi pi-palette text-3xl" style={{ color: 'var(--warm-gold)' }}></i>
              <h4 className="m-0" style={{ color: 'var(--foreground)' }}>
                {currentTheme.displayName}
              </h4>
              <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                {currentTheme.description}
              </p>
              <Badge
                value={currentTheme.category}
                severity={currentTheme.category === 'dark' ? 'info' : 'success'}
                className="mt-2"
              />
            </div>
          </Card>

          {/* Dark Mode Toggle */}
          <div className="flex align-items-center justify-content-between p-3 border-round-lg glass-card">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-moon text-lg" style={{ color: 'var(--deep-purple)' }}></i>
              <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                Dark Mode
              </span>
            </div>
            <ToggleButton
              checked={isDarkMode}
              onChange={toggleDarkMode}
              onIcon="pi pi-moon"
              offIcon="pi pi-sun"
              className="w-3rem h-2rem"
            />
          </div>

          {/* Surprise Me Button */}
          <Button
            label="Surprise Me! 🎲"
            icon="pi pi-refresh"
            onClick={handleSurpriseMe}
            className="w-full"
            severity="warning"
            size="large"
          />

          {/* Theme Grid */}
          <div className="flex flex-column gap-3">
            <h5 className="m-0 font-semibold" style={{ color: 'var(--warm-gold)' }}>
              {isDarkMode ? 'Dark' : 'Light'} Themes
            </h5>
            <div className="grid">
              {activeThemes.map(theme => (
                <div key={theme.name} className="col-12 sm:col-6">
                  <Card
                    className={`cursor-pointer theme-card transition-all duration-300 glass-card ${
                      currentTheme.name === theme.name
                        ? 'border-2 shadow-lg'
                        : 'border-1 hover:border-opacity-50'
                    }`}
                    style={{
                      borderColor:
                        currentTheme.name === theme.name
                          ? 'var(--warm-gold)'
                          : 'var(--glass-border)',
                    }}
                    onClick={() => handleThemeSelect(theme)}
                  >
                    <div className="flex flex-column gap-2 text-center">
                      {/* Theme Preview */}
                      <div className="theme-preview h-3rem border-round-lg relative overflow-hidden">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: theme.name.includes('blue')
                              ? 'linear-gradient(45deg, #3b82f6, #1e40af)'
                              : theme.name.includes('green')
                              ? 'linear-gradient(45deg, #10b981, #059669)'
                              : theme.name.includes('orange')
                              ? 'linear-gradient(45deg, #f59e0b, #d97706)'
                              : theme.name.includes('purple')
                              ? 'linear-gradient(45deg, #8b5cf6, #7c3aed)'
                              : theme.name.includes('viva')
                              ? 'linear-gradient(45deg, #ec4899, #be185d)'
                              : 'linear-gradient(45deg, #6b7280, #4b5563)',
                          }}
                        />
                        <div className="absolute inset-0 flex align-items-center justify-content-center">
                          <i className="pi pi-palette text-white text-xl"></i>
                        </div>
                      </div>

                      {/* Theme Info */}
                      <div>
                        <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                          {theme.displayName}
                        </h6>
                        <p
                          className="text-xs m-0 mt-1"
                          style={{ color: 'var(--foreground)', opacity: 0.7 }}
                        >
                          {theme.description}
                        </p>
                      </div>

                      {/* Active Indicator */}
                      {currentTheme.name === theme.name && (
                        <Badge
                          value="Active"
                          severity="success"
                          className="absolute top-0 right-0 m-2"
                        />
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Categories Info */}
          <div className="flex flex-column gap-2 p-3 border-round-lg glass-card">
            <h6
              className="m-0 font-semibold flex align-items-center gap-2"
              style={{ color: 'var(--warm-gold)' }}
            >
              <i className="pi pi-info-circle"></i>
              Theme Categories
            </h6>
            <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
              <p className="m-0 mb-1">
                • <strong>Saga:</strong> Clean, modern designs
              </p>
              <p className="m-0 mb-1">
                • <strong>Arya:</strong> Dark themes with mystical vibes
              </p>
              <p className="m-0 mb-1">
                • <strong>Viva:</strong> Vibrant, contemporary styles
              </p>
              <p className="m-0">
                • <strong>Mira/Nano:</strong> Minimal, efficient layouts
              </p>
            </div>
          </div>

          {/* Close Button */}
          <Button
            label="Close"
            icon="pi pi-times"
            onClick={() => setSidebarVisible(false)}
            className="w-full"
            severity="secondary"
          />
        </div>
      </Sidebar>
    </>
  );
};

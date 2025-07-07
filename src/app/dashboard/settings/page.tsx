'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useAnime, animePresets } from '@/hooks/use-anime';
import { useTheme } from '@/lib/providers/theme-provider';

interface UserSettings {
  name: string;
  age: number;
  gender: string;
  timezone: string;
  goals: string;
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
    weeklyReport: boolean;
  };
  preferences: {
    autoSave: boolean;
    darkMode: boolean;
    animations: boolean;
    soundEffects: boolean;
  };
  privacy: {
    shareData: boolean;
    publicProfile: boolean;
    allowAnalytics: boolean;
  };
}

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Non-binary', value: 'non-binary' },
  { label: 'Prefer not to say', value: 'prefer-not-to-say' },
];

const timezoneOptions = [
  { label: 'America/Los_Angeles (PST)', value: 'America/Los_Angeles' },
  { label: 'America/New_York (EST)', value: 'America/New_York' },
  { label: 'America/Chicago (CST)', value: 'America/Chicago' },
  { label: 'America/Denver (MST)', value: 'America/Denver' },
  { label: 'Europe/London (GMT)', value: 'Europe/London' },
  { label: 'Europe/Paris (CET)', value: 'Europe/Paris' },
  { label: 'Asia/Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Australia/Sydney (AEST)', value: 'Australia/Sydney' },
];

const goalOptions = [
  { label: 'Build healthy habits', value: 'habits' },
  { label: 'Improve fitness', value: 'fitness' },
  { label: 'Better nutrition', value: 'nutrition' },
  { label: 'Mental wellness', value: 'wellness' },
  { label: 'Productivity', value: 'productivity' },
  { label: 'All of the above', value: 'all' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: '',
    age: 25,
    gender: 'prefer-not-to-say',
    timezone: 'America/Los_Angeles',
    goals: 'habits',
    notifications: {
      email: true,
      push: true,
      reminders: true,
      weeklyReport: false,
    },
    preferences: {
      autoSave: true,
      darkMode: false,
      animations: true,
      soundEffects: false,
    },
    privacy: {
      shareData: false,
      publicProfile: false,
      allowAnalytics: true,
    },
  });
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportData, setExportData] = useState('');
  const toast = useRef<Toast>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { add } = useAnime({ targets: '', autoplay: false });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Animate page entrance
    const animatePage = async () => {
      if (containerRef.current) {
        await add({
          targets: containerRef.current,
          ...animePresets.fadeInUp,
          duration: 1000,
        });
      }
    };

    animatePage();
  }, [add]);

  const saveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem('userSettings', JSON.stringify(newSettings));
    toast.current?.show({
      severity: 'success',
      summary: 'Settings Saved',
      detail: 'Your settings have been updated successfully.',
      life: 3000,
    });
  };

  const updateSettings = (section: keyof UserSettings, key: string, value: unknown) => {
    const newSettings = {
      ...settings,
      [section]: {
        ...(settings[section] as Record<string, unknown>),
        [key]: value,
      },
    };
    saveSettings(newSettings);
  };

  const resetSettings = () => {
    const defaultSettings: UserSettings = {
      name: '',
      age: 25,
      gender: 'prefer-not-to-say',
      timezone: 'America/Los_Angeles',
      goals: 'habits',
      notifications: {
        email: true,
        push: true,
        reminders: true,
        weeklyReport: false,
      },
      preferences: {
        autoSave: true,
        darkMode: false,
        animations: true,
        soundEffects: false,
      },
      privacy: {
        shareData: false,
        publicProfile: false,
        allowAnalytics: true,
      },
    };
    saveSettings(defaultSettings);
    setShowResetDialog(false);
  };

  const exportSettings = () => {
    const data = {
      settings,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };
    setExportData(JSON.stringify(data, null, 2));
    setShowExportDialog(true);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          if (importedData.settings) {
            saveSettings(importedData.settings);
            toast.current?.show({
              severity: 'success',
              summary: 'Settings Imported',
              detail: 'Your settings have been imported successfully.',
              life: 3000,
            });
          }
        } catch {
          toast.current?.show({
            severity: 'error',
            summary: 'Import Failed',
            detail: 'Invalid settings file format.',
            life: 3000,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Settings
        </h1>
        <p className="text-lg" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
          Customize your Life Forge experience
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card
          className="glass-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
              <i className="pi pi-user mr-2"></i>
              Profile Settings
            </h2>
          </div>

          <div className="grid gap-4">
            <div className="field">
              <label className="block mb-2 font-medium">Name</label>
              <InputText
                value={settings.name}
                onChange={e => saveSettings({ ...settings, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label className="block mb-2 font-medium">Age</label>
                <InputNumber
                  value={settings.age}
                  onValueChange={e => saveSettings({ ...settings, age: e.value || 25 })}
                  min={13}
                  max={120}
                  className="w-full"
                />
              </div>

              <div className="field">
                <label className="block mb-2 font-medium">Gender</label>
                <Dropdown
                  value={settings.gender}
                  options={genderOptions}
                  onChange={e => saveSettings({ ...settings, gender: e.value })}
                  placeholder="Select gender"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="field">
                <label className="block mb-2 font-medium">Timezone</label>
                <Dropdown
                  value={settings.timezone}
                  options={timezoneOptions}
                  onChange={e => saveSettings({ ...settings, timezone: e.value })}
                  placeholder="Select timezone"
                  className="w-full"
                />
              </div>

              <div className="field">
                <label className="block mb-2 font-medium">Primary Goal</label>
                <Dropdown
                  value={settings.goals}
                  options={goalOptions}
                  onChange={e => saveSettings({ ...settings, goals: e.value })}
                  placeholder="Select your goal"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card
          className="glass-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
              <i className="pi pi-bell mr-2"></i>
              Notifications
            </h2>
          </div>

          <div className="grid gap-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div
                key={key}
                className="flex align-items-center justify-content-between p-3 border-round-lg glass-card"
              >
                <div>
                  <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </h6>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Receive {key} notifications
                  </p>
                </div>
                <ToggleButton
                  checked={value}
                  onChange={e => updateSettings('notifications', key, e.value)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                  className="w-3rem h-2rem"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <Card
          className="glass-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
              <i className="pi pi-cog mr-2"></i>
              Preferences
            </h2>
          </div>

          <div className="grid gap-4">
            <div className="flex align-items-center justify-content-between p-3 border-round-lg glass-card">
              <div>
                <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                  Dark Mode
                </h6>
                <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                  Use dark theme
                </p>
              </div>
              <ToggleButton
                checked={isDarkMode}
                onChange={toggleDarkMode}
                onIcon="pi pi-moon"
                offIcon="pi pi-sun"
                className="w-3rem h-2rem"
              />
            </div>

            {Object.entries(settings.preferences).map(([key, value]) => {
              if (key === 'darkMode') return null; // Skip dark mode as it's handled above
              return (
                <div
                  key={key}
                  className="flex align-items-center justify-content-between p-3 border-round-lg glass-card"
                >
                  <div>
                    <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </h6>
                    <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                      Enable {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </p>
                  </div>
                  <ToggleButton
                    checked={value}
                    onChange={e => updateSettings('preferences', key, e.value)}
                    onIcon="pi pi-check"
                    offIcon="pi pi-times"
                    className="w-3rem h-2rem"
                  />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card
          className="glass-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
              <i className="pi pi-shield mr-2"></i>
              Privacy & Data
            </h2>
          </div>

          <div className="grid gap-4">
            {Object.entries(settings.privacy).map(([key, value]) => (
              <div
                key={key}
                className="flex align-items-center justify-content-between p-3 border-round-lg glass-card"
              >
                <div>
                  <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </h6>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    {key === 'shareData' && 'Share data with third parties'}
                    {key === 'publicProfile' && 'Make profile publicly visible'}
                    {key === 'allowAnalytics' && 'Allow analytics and tracking'}
                  </p>
                </div>
                <ToggleButton
                  checked={value}
                  onChange={e => updateSettings('privacy', key, e.value)}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                  className="w-3rem h-2rem"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <Card
          className="glass-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
              <i className="pi pi-download mr-2"></i>
              Data Management
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              label="Export Settings"
              icon="pi pi-download"
              onClick={exportSettings}
              className="w-full"
              severity="info"
            />

            <Button
              label="Import Settings"
              icon="pi pi-upload"
              onClick={() => document.getElementById('import-file')?.click()}
              className="w-full"
              severity="success"
            />

            <Button
              label="Reset All"
              icon="pi pi-refresh"
              onClick={() => setShowResetDialog(true)}
              className="w-full"
              severity="danger"
            />
          </div>

          <input
            id="import-file"
            type="file"
            accept=".json"
            onChange={importSettings}
            style={{ display: 'none' }}
          />
        </Card>
      </div>

      {/* Reset Confirmation Dialog */}
      <Dialog
        header="Reset Settings"
        visible={showResetDialog}
        onHide={() => setShowResetDialog(false)}
        style={{ width: '400px' }}
        className="glass-card"
      >
        <div className="text-center">
          <i className="pi pi-exclamation-triangle text-4xl text-yellow-500 mb-4"></i>
          <h3 className="mb-3">Are you sure?</h3>
          <p className="mb-4">
            This will reset all your settings to their default values. This action cannot be undone.
          </p>
          <div className="flex gap-2 justify-content-center">
            <Button
              label="Cancel"
              onClick={() => setShowResetDialog(false)}
              className="flex-1"
              severity="secondary"
            />
            <Button label="Reset" onClick={resetSettings} className="flex-1" severity="danger" />
          </div>
        </div>
      </Dialog>

      {/* Export Dialog */}
      <Dialog
        header="Export Settings"
        visible={showExportDialog}
        onHide={() => setShowExportDialog(false)}
        style={{ width: '600px' }}
        className="glass-card"
      >
        <div>
          <p className="mb-4">Copy the JSON data below to save your settings:</p>
          <textarea
            value={exportData}
            readOnly
            className="w-full h-64 p-3 border-round"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
              fontFamily: 'monospace',
            }}
          />
          <div className="flex gap-2 justify-content-end mt-4">
            <Button
              label="Copy"
              icon="pi pi-copy"
              onClick={() => {
                navigator.clipboard.writeText(exportData);
                toast.current?.show({
                  severity: 'success',
                  summary: 'Copied',
                  detail: 'Settings copied to clipboard.',
                  life: 2000,
                });
              }}
              severity="info"
            />
            <Button label="Close" onClick={() => setShowExportDialog(false)} severity="secondary" />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

'use client';

import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { useDashboard } from '@/lib/providers/dashboard-provider';
import { WaterPanel } from '@/components/water-panel';
import { MoodPanel } from '@/components/mood-panel';
import { QuoteOrb } from '@/components/quote-orb';
import { GoalList } from '@/components/goal-list';
import { TimerCard } from '@/components/timer-card';

export default function Dashboard() {
  const { enabledPanels } = useDashboard();

  const renderPanel = (panelId: string) => {
    switch (panelId) {
      case 'water-tracker':
        return <WaterPanel className="h-full" />;
      case 'mood-tracker':
        return <MoodPanel className="h-full" />;
      case 'quote-orb':
        return <QuoteOrb className="h-full" />;
      case 'goal-tracker':
        return <GoalList className="h-full" />;
      case 'focus-timer':
        return <TimerCard className="h-full" />;
      default:
        return (
          <Card className="h-full flex align-items-center justify-content-center">
            <div className="text-center" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              <i className="pi pi-cog text-3xl mb-2"></i>
              <p>Panel coming soon...</p>
            </div>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-white mb-2">Your Life Dashboard</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Track your progress, manage your goals, and stay motivated with your personalized
              dashboard.
            </p>
          </div>
        </div>

        {/* Dashboard Panels */}
        {enabledPanels.length > 0 ? (
          <div className="flex flex-column gap-8">
            {enabledPanels.map(panel => (
              <div key={panel.id} className="dashboard-panel">
                {renderPanel(panel.id)}
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto">
              <div className="flex flex-column align-items-center gap-4">
                <div className="w-5rem h-5rem bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 border-round-xl flex align-items-center justify-content-center">
                  <i className="pi pi-plus text-3xl text-blue-500"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                    Customize Your Dashboard
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    Your dashboard is empty. Add some panels to get started!
                  </p>
                  <Button
                    label="Add Panels"
                    icon="pi pi-cog"
                    severity="info"
                    onClick={() => {
                      // This would open a panel configuration dialog
                      console.log('Open panel configuration');
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8">
          <Card className="glass-card">
            <div className="flex justify-content-between align-items-center">
              <div>
                <h4
                  className="text-lg font-semibold m-0 mb-1"
                  style={{ color: 'var(--foreground)' }}
                >
                  Daily Overview
                </h4>
                <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex align-items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--warm-gold)' }}>
                    {enabledPanels.length}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Active Panels
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--warm-gold)' }}>
                    🎯
                  </div>
                  <div className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Goals
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: 'var(--deep-purple)' }}>
                    ✨
                  </div>
                  <div className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                    Magic
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 z-4 flex flex-column gap-3">
          <Button
            icon="pi pi-plus"
            rounded
            size="large"
            className="glass-card shadow-lg border-1 border-amber-500/30 hover:border-amber-500/50 transition-all duration-300"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              color: 'var(--warm-gold)',
              width: '3.5rem',
              height: '3.5rem',
            }}
            onClick={() => {
              // Open quick add dialog
              console.log('Quick add');
            }}
            aria-label="Quick add"
          />
          <Button
            icon="pi pi-cog"
            rounded
            className="glass-card shadow-lg border-1 border-amber-500/30 hover:border-amber-500/50 transition-all duration-300"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              color: 'var(--warm-gold)',
              width: '3rem',
              height: '3rem',
            }}
            onClick={() => {
              // Open dashboard settings
              console.log('Dashboard settings');
            }}
            aria-label="Dashboard settings"
          />
        </div>
      </main>
    </div>
  );
}

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
            <div className="text-center text-gray-500">
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Your Life Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Track your progress, manage your goals, and stay motivated with your personalized
              dashboard.
            </p>
          </div>
        </div>

        {/* Dashboard Panels */}
        {enabledPanels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <h3 className="text-xl font-semibold mb-2">Customize Your Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
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
                <h4 className="text-lg font-semibold m-0 mb-1">Daily Overview</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
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
                  <div className="text-2xl font-bold text-blue-600">{enabledPanels.length}</div>
                  <div className="text-xs text-gray-500">Active Panels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">🎯</div>
                  <div className="text-xs text-gray-500">Goals</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">✨</div>
                  <div className="text-xs text-gray-500">Magic</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-4 right-4 z-4 flex flex-column gap-2">
          <Button
            icon="pi pi-plus"
            rounded
            severity="info"
            size="large"
            className="shadow-lg"
            onClick={() => {
              // Open quick add dialog
              console.log('Quick add');
            }}
            aria-label="Quick add"
          />
          <Button
            icon="pi pi-cog"
            rounded
            severity="secondary"
            className="shadow-lg"
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

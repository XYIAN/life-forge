"use client";

import React from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useDashboard } from "@/lib/providers/dashboard-provider";
import { WaterPanel } from "@/components/water-panel";
import { MoodPanel } from "@/components/mood-panel";
import { QuoteOrb } from "@/components/quote-orb";
import { GoalList } from "@/components/goal-list";
import { TimerCard } from "@/components/timer-card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  const { enabledPanels } = useDashboard();

  const renderPanel = (panelId: string) => {
    switch (panelId) {
      case "water-tracker":
        return <WaterPanel className="h-full" />;
      case "mood-tracker":
        return <MoodPanel className="h-full" />;
      case "quote-orb":
        return <QuoteOrb className="h-full" />;
      case "goal-tracker":
        return <GoalList className="h-full" />;
      case "focus-timer":
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <header className="sticky top-0 z-5 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex align-items-center justify-content-between">
            {/* Logo */}
            <div className="flex align-items-center gap-3">
              <div className="w-3rem h-3rem bg-gradient-to-br from-blue-500 to-purple-600 border-round-xl flex align-items-center justify-content-center">
                <i className="pi pi-star text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold m-0 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Life Forge
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  Your Personal Daily Dashboard
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex align-items-center gap-2">
              <Link href="/about">
                <Button
                  label="About"
                  icon="pi pi-info-circle"
                  severity="secondary"
                  text
                />
              </Link>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              Welcome to Your Life Forge
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform your daily routine into an adventure. Track your
              progress, set goals, and find inspiration in this beautifully
              crafted dashboard.
            </p>
          </div>
        </div>

        {/* Dashboard Panels */}
        {enabledPanels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enabledPanels.map((panel) => (
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
                  <h3 className="text-xl font-semibold mb-2">
                    Customize Your Dashboard
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Your dashboard is empty. Add some panels to get started!
                  </p>
                  <Button
                    label="Add Panels"
                    icon="pi pi-cog"
                    severity="info"
                    onClick={() => {
                      // This would open a panel configuration dialog
                      console.log("Open panel configuration");
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
                <h4 className="text-lg font-semibold m-0 mb-1">
                  Daily Overview
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex align-items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {enabledPanels.length}
                  </div>
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
              console.log("Quick add");
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
              console.log("Dashboard settings");
            }}
            aria-label="Dashboard settings"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-content-center align-items-center gap-4 mb-4">
            <Link
              href="https://github.com/xyian"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <Button
                icon="pi pi-github"
                severity="secondary"
                text
                className="p-2"
                aria-label="GitHub"
              />
            </Link>
            <Link
              href="https://linkedin.com/in/kxdilbeck"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <Button
                icon="pi pi-linkedin"
                severity="secondary"
                text
                className="p-2"
                aria-label="LinkedIn"
              />
            </Link>
            <Link
              href="https://kyledilbeck.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <Button
                icon="pi pi-globe"
                severity="secondary"
                text
                className="p-2"
                aria-label="Website"
              />
            </Link>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 m-0">
            Made with ❤️ and a touch of magic by Kyle Dilbeck
          </p>
        </div>
      </footer>
    </div>
  );
}

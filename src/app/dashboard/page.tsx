'use client';

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
// import { useAnimation } from '@/hooks/useAnimation';
// import { useTheme } from '@/hooks/useTheme';
// import { useSmoothCursor } from '@/hooks/useSmoothCursor';
// import { useParticles } from '@/hooks/useParticles';
import { WaterPanel } from '@/components/dashboard/water-panel';
import { MoodPanel } from '@/components/dashboard/mood-panel';
import { GoalList } from '@/components/dashboard/goal-list';
import { TimerCard } from '@/components/dashboard/timer-card';
// import ThemeSwitcher from '@/components/dashboard/theme-switcher';
import NextBigThingPanel from '@/components/dashboard/next-big-thing-panel';
import MorningEveningPrompts from '@/components/dashboard/morning-evening-prompts';
import MiniWorkoutsCarousel from '@/components/dashboard/mini-workouts-carousel';
import DailyTarotPull from '@/components/dashboard/daily-tarot-pull';
import MysteryBox from '@/components/dashboard/mystery-box';
import SocialFunPanel from '@/components/dashboard/social-fun-panel';
import TrendsPage from '@/components/dashboard/trends-page';

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [activeSection, setActiveSection] = useState('main');
  // const router = useRouter();
  // const { isDark } = useTheme();
  // const { animateIn } = useAnimation();
  // const { SmoothCursor } = useSmoothCursor();
  // const { Particles } = useParticles();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, [currentTime]);

  const navigateToSection = (section: string) => {
    setActiveSection(section);
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderMainDashboard = () => {
    const cardHeader = (
      <div className="flex align-items-center justify-between">
        <div className="flex align-items-center gap-3">
          <i className="pi pi-home text-blue-500 text-xl"></i>
          <span className="text-xl font-bold">{greeting}, User!</span>
        </div>
        {/* <ThemeSwitcher /> */}
      </div>
    );
    const cardSubtitle = (
      <span className="text-gray-600 dark:text-gray-300">
        {currentTime.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        • {currentTime.toLocaleTimeString()}
      </span>
    );
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card
          className="dashboard-card shadow-lg border-0"
          header={cardHeader}
          subTitle={cardSubtitle}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Quick Stats */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center gap-3">
                <i className="pi pi-check-circle text-blue-500 text-2xl"></i>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Goals Completed</div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="flex items-center gap-3">
                <i className="pi pi-heart text-green-500 text-2xl"></i>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">4.2</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Average Mood</div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
              <div className="flex items-center gap-3">
                <i className="pi pi-bolt text-orange-500 text-2xl"></i>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">7.5</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Energy Level</div>
                </div>
              </div>
            </div>

            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-3">
                <i className="pi pi-star text-purple-500 text-2xl"></i>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">85%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Daily Progress</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Core Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WaterPanel />
          <MoodPanel />
        </div>

        {/* Goals and Timer */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GoalList />
          <TimerCard />
        </div>

        {/* New Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NextBigThingPanel />
          <MorningEveningPrompts />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MiniWorkoutsCarousel />
          <DailyTarotPull />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MysteryBox />
          <SocialFunPanel />
        </div>
      </div>
    );
  };

  const renderTrendsPage = () => <TrendsPage />;

  const renderNavigation = () => (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          label="Dashboard"
          icon="pi pi-home"
          className={`p-button-outlined ${activeSection === 'main' ? 'p-button-primary' : ''}`}
          onClick={() => navigateToSection('main')}
        />
        <Button
          label="Trends"
          icon="pi pi-chart-line"
          className={`p-button-outlined ${activeSection === 'trends' ? 'p-button-primary' : ''}`}
          onClick={() => navigateToSection('trends')}
        />
      </div>
    </div>
  );

  return (
    <div className="dashboard-page min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* <SmoothCursor />
      <Particles /> */}

      <div className="container mx-auto px-4 py-8">
        {renderNavigation()}

        {activeSection === 'main' && renderMainDashboard()}
        {activeSection === 'trends' && renderTrendsPage()}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { ShineBorder } from '@/components/magicui';
import { useData } from '@/hooks';
import {
  DailyGoalsPanel,
  MoodTrackerPanel,
  WaterTrackerPanel,
  FocusTimerPanel,
  NextBigThingPanel,
  MorningEveningPrompts,
  MiniWorkoutsCarousel,
  DailyTarotPull,
  MysteryBox,
  SocialFunPanel,
  TrendsPage,
} from '@/dashboard';

export default function Dashboard() {
  const router = useRouter();
  const { userData } = useData();
  const [activePanel, setActivePanel] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!userData) {
      router.push('/');
    }
  }, [userData, router]);

  const panels = [
    {
      id: 'daily-goals',
      title: 'Daily Goals',
      icon: 'pi pi-target',
      color: 'blue',
      component: DailyGoalsPanel,
    },
    {
      id: 'mood-tracker',
      title: 'Mood Tracker',
      icon: 'pi pi-heart',
      color: 'pink',
      component: MoodTrackerPanel,
    },
    {
      id: 'water-tracker',
      title: 'Water Tracker',
      icon: 'pi pi-drop',
      color: 'cyan',
      component: WaterTrackerPanel,
    },
    {
      id: 'focus-timer',
      title: 'Focus Timer',
      icon: 'pi pi-clock',
      color: 'orange',
      component: FocusTimerPanel,
    },
    {
      id: 'next-big-thing',
      title: 'Next Big Thing',
      icon: 'pi pi-star-fill',
      color: 'yellow',
      component: NextBigThingPanel,
    },
    {
      id: 'morning-evening-prompts',
      title: 'Daily Reflections',
      icon: 'pi pi-comments',
      color: 'blue',
      component: MorningEveningPrompts,
    },
    {
      id: 'mini-workouts',
      title: 'Mini Workouts',
      icon: 'pi pi-bolt',
      color: 'green',
      component: MiniWorkoutsCarousel,
    },
    {
      id: 'daily-tarot',
      title: 'Daily Tarot',
      icon: 'pi pi-star',
      color: 'purple',
      component: DailyTarotPull,
    },
    {
      id: 'mystery-box',
      title: 'Mystery Box',
      icon: 'pi pi-gift',
      color: 'pink',
      component: MysteryBox,
    },
    {
      id: 'social-fun',
      title: 'Social Fun',
      icon: 'pi pi-users',
      color: 'indigo',
      component: SocialFunPanel,
    },
    {
      id: 'trends',
      title: 'Trends & Analytics',
      icon: 'pi pi-chart-line',
      color: 'blue',
      component: TrendsPage,
    },
  ];

  const handlePanelClick = (panelId: string) => {
    setActivePanel(activePanel === panelId ? null : panelId);
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <i className="pi pi-spin pi-spinner text-4xl text-blue-500 mb-4"></i>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <ShineBorder
            className="rounded-lg p-6 mb-6"
            shineColor={['#3b82f6', '#8b5cf6', '#ec4899']}
            duration={8}
            borderWidth={2}
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Welcome back, {userData.name}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Ready to make today amazing? Let&apos;s check in on your wellness journey.
              </p>
            </div>
          </ShineBorder>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {panels.map(panel => (
            <ShineBorder
              key={panel.id}
              className="rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
              shineColor={
                panel.color === 'blue'
                  ? '#3b82f6'
                  : panel.color === 'pink'
                  ? '#ec4899'
                  : panel.color === 'cyan'
                  ? '#06b6d4'
                  : panel.color === 'orange'
                  ? '#f97316'
                  : panel.color === 'yellow'
                  ? '#eab308'
                  : panel.color === 'green'
                  ? '#10b981'
                  : panel.color === 'purple'
                  ? '#8b5cf6'
                  : panel.color === 'indigo'
                  ? '#6366f1'
                  : '#6b7280'
              }
              duration={12}
              borderWidth={1}
              onShineComplete={() => console.log(`${panel.title} shine effect completed`)}
            >
              <Card
                className={`panel-card shadow-lg border-0 hover:shadow-xl transition-all duration-300 ${
                  activePanel === panel.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handlePanelClick(panel.id)}
              >
                <div className="text-center p-4">
                  <div className={`text-4xl mb-3 text-${panel.color}-500`}>
                    <i className={panel.icon}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {panel.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Click to explore</p>
                </div>
              </Card>
            </ShineBorder>
          ))}
        </div>

        {/* Active Panel Content */}
        {activePanel && (
          <div className="mt-8">
            <ShineBorder
              className="rounded-lg"
              shineColor={['#3b82f6', '#8b5cf6']}
              duration={10}
              borderWidth={2}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <div className="p-6">
                  <Button
                    icon="pi pi-times"
                    className="p-button-text p-button-rounded absolute top-4 right-4"
                    onClick={() => setActivePanel(null)}
                  />
                  {(() => {
                    const panel = panels.find(p => p.id === activePanel);
                    if (panel) {
                      const PanelComponent = panel.component;
                      return <PanelComponent />;
                    }
                    return null;
                  })()}
                </div>
              </div>
            </ShineBorder>
          </div>
        )}
      </div>
    </div>
  );
}

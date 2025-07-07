'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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
  UserInfoDialog,
} from '@dashboard';

interface UserInfo {
  name: string;
  age?: number;
  gender?: string;
  timezone?: string;
  goals?: string[];
}

export default function Dashboard() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);

  // Check for user info on component mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      try {
        const parsed = JSON.parse(savedUserInfo);
        setUserInfo(parsed);
      } catch (error) {
        console.error('Error parsing user info:', error);
        setShowUserDialog(true);
      }
    } else {
      setShowUserDialog(true);
    }
  }, []);

  const handleUserInfoSave = (info: UserInfo) => {
    setUserInfo(info);
    setShowUserDialog(false);
  };

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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (!userInfo && !showUserDialog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <i
            className="pi pi-spin pi-spinner text-4xl mb-4"
            style={{ color: 'var(--warm-gold)' }}
          ></i>
          <p style={{ color: 'var(--foreground)' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Card
            className="rounded-lg p-6 mb-6 glass-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <div
              className="text-center glass-card p-6"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(25px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                color: 'var(--foreground)',
              }}
            >
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                {getGreeting()}, {userInfo?.name}!
              </h1>
              <p style={{ color: 'var(--foreground)', opacity: 0.9 }}>
                Ready to make today amazing? Let&apos;s check in on your wellness journey.
              </p>
            </div>
          </Card>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center items-center justify-center">
          {panels.map(panel => (
            <Card
              key={panel.id}
              className={`panel-card shadow-lg border-0 hover:shadow-xl transition-all duration-300 glass-card ${
                activePanel === panel.id ? 'ring-2 ring-blue-500' : ''
              }`}
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(25px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                color: 'var(--foreground)',
              }}
              onClick={() => handlePanelClick(panel.id)}
            >
              <div className="text-center p-4">
                <div className="text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}>
                  <i className={panel.icon}></i>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  {panel.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
                  Click to explore
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Active Panel Content */}
        {activePanel && (
          <div className="mt-8 flex justify-center items-center">
            <Card
              className="rounded-lg shadow-xl glass-card"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(25px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                color: 'var(--foreground)',
              }}
            >
              <div className="p-6">
                <Button
                  icon="pi pi-times"
                  className="p-button-text p-button-rounded absolute top-4 right-4"
                  onClick={() => setActivePanel(null)}
                  style={{ color: 'var(--foreground)' }}
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
            </Card>
          </div>
        )}
      </div>

      {/* User Info Dialog */}
      <UserInfoDialog
        visible={showUserDialog}
        onHide={() => setShowUserDialog(false)}
        onSave={handleUserInfoSave}
      />
    </div>
  );
}

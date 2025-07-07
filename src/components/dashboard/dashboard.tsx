'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { UserInfoDialog } from '@dashboard';

interface UserInfo {
  name: string;
  age?: number;
  gender?: string;
  timezone?: string;
  goals?: string[];
}

export default function Dashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const toast = useRef<Toast>(null);

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
      <Toast ref={toast} position="top-right" />
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

        {/* Simple Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center items-center justify-center">
          <Card
            className="panel-card shadow-lg border-0 hover:shadow-xl transition-all duration-300 glass-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <div className="text-center p-4">
              <div className="text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}>
                <i className="pi pi-target"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Daily Goals
              </h3>
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.9 }}>
                Coming soon...
              </p>
            </div>
          </Card>
        </div>
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

'use client';

import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

interface UserInfo {
  name: string;
  age?: number;
  gender?: string;
  timezone?: string;
  goals?: string[];
}

interface UserInfoDialogProps {
  visible: boolean;
  onHide: () => void;
  onSave: (userInfo: UserInfo) => void;
}

const genderOptions = [
  { label: 'Prefer not to say', value: 'prefer-not-to-say' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Non-binary', value: 'non-binary' },
  { label: 'Other', value: 'other' },
];

const goalOptions = [
  { label: 'Improve hydration', value: 'hydration' },
  { label: 'Track mood patterns', value: 'mood' },
  { label: 'Build better habits', value: 'habits' },
  { label: 'Increase productivity', value: 'productivity' },
  { label: 'Better sleep', value: 'sleep' },
  { label: 'Exercise more', value: 'exercise' },
  { label: 'Reduce stress', value: 'stress' },
  { label: 'Learn new skills', value: 'learning' },
];

export const UserInfoDialog: React.FC<UserInfoDialogProps> = ({ visible, onHide, onSave }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    age: undefined,
    gender: undefined,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    goals: [],
  });
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);

  const handleSave = () => {
    if (!userInfo.name.trim()) {
      toast.current?.show({
        severity: 'error',
        summary: 'Name Required',
        detail: 'Please enter your name to continue.',
        life: 3000,
      });
      return;
    }

    setLoading(true);

    // Simulate saving
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      toast.current?.show({
        severity: 'success',
        summary: 'Welcome!',
        detail: `Great to meet you, ${userInfo.name}! Your dashboard is now personalized.`,
        life: 3000,
      });

      onSave(userInfo);
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    // If no name is provided, we can't proceed
    if (!userInfo.name.trim()) {
      toast.current?.show({
        severity: 'warn',
        summary: 'Name Required',
        detail: 'Please provide at least your name to personalize your dashboard.',
        life: 3000,
      });
      return;
    }

    // Save minimal info and proceed
    const minimalInfo = { ...userInfo, name: userInfo.name.trim() };
    localStorage.setItem('userInfo', JSON.stringify(minimalInfo));
    onSave(minimalInfo);
  };

  const footer = (
    <div className="flex justify-content-end gap-2">
      <Button
        label="Skip for Now"
        icon="pi pi-times"
        onClick={handleCancel}
        className="p-button-text"
        disabled={loading}
      />
      <Button
        label="Save & Continue"
        icon="pi pi-check"
        onClick={handleSave}
        loading={loading}
        className="glass-card"
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          color: 'var(--warm-gold)',
        }}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={onHide}
        header={
          <div className="flex align-items-center gap-3">
            <i className="pi pi-user text-2xl" style={{ color: 'var(--warm-gold)' }}></i>
            <div>
              <h2 className="text-xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                Welcome to Life Forge!
              </h2>
              <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Let&apos;s personalize your dashboard
              </p>
            </div>
          </div>
        }
        footer={footer}
        style={{
          width: '90vw',
          maxWidth: '500px',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
        className="user-info-dialog"
        closable={false}
        draggable={false}
        resizable={false}
      >
        <div className="flex flex-column gap-4">
          {/* Welcome Message */}
          <Card className="text-center glass-card">
            <div className="flex flex-column gap-2">
              <i className="pi pi-star text-3xl" style={{ color: 'var(--warm-gold)' }}></i>
              <h3 className="m-0" style={{ color: 'var(--foreground)' }}>
                Personalize Your Experience
              </h3>
              <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Help us customize your dashboard with some basic information. You can always update
                this later.
              </p>
            </div>
          </Card>

          {/* Name Input */}
          <div className="flex flex-column gap-2">
            <label className="font-semibold" style={{ color: 'var(--foreground)' }}>
              Name <span className="text-red-500">*</span>
            </label>
            <InputText
              value={userInfo.name}
              onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
              placeholder="Enter your name"
              className="w-full"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          {/* Age Input */}
          <div className="flex flex-column gap-2">
            <label className="font-semibold" style={{ color: 'var(--foreground)' }}>
              Age (Optional)
            </label>
            <InputText
              type="number"
              value={userInfo.age?.toString() || ''}
              onChange={e =>
                setUserInfo({
                  ...userInfo,
                  age: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              placeholder="Enter your age"
              className="w-full"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          {/* Gender Selection */}
          <div className="flex flex-column gap-2">
            <label className="font-semibold" style={{ color: 'var(--foreground)' }}>
              Gender (Optional)
            </label>
            <Dropdown
              value={userInfo.gender}
              options={genderOptions}
              onChange={e => setUserInfo({ ...userInfo, gender: e.value })}
              placeholder="Select gender"
              className="w-full"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          {/* Goals Selection */}
          <div className="flex flex-column gap-2">
            <label className="font-semibold" style={{ color: 'var(--foreground)' }}>
              What are your main goals? (Optional)
            </label>
            <Dropdown
              value={userInfo.goals}
              options={goalOptions}
              onChange={e => setUserInfo({ ...userInfo, goals: e.value })}
              placeholder="Select your goals"
              multiple
              className="w-full"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--foreground)',
              }}
            />
          </div>

          {/* Privacy Note */}
          <Card className="glass-card">
            <div className="flex align-items-start gap-2">
              <i className="pi pi-shield text-lg mt-1" style={{ color: 'var(--warm-gold)' }}></i>
              <div>
                <h6 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                  Privacy First
                </h6>
                <p className="text-xs m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  All your information is stored locally on your device. We never send your personal
                  data to external servers.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Dialog>
    </>
  );
};

'use client';

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Badge } from 'primereact/badge';
import { useData } from '@/lib/providers/data-provider';

interface WaterPanelProps {
  className?: string;
}

export const WaterPanel: React.FC<WaterPanelProps> = ({ className }) => {
  const { addWaterEntry, getTotalWaterForDate, getCurrentWaterSession } = useData();
  const [isAnimating, setIsAnimating] = useState(false);

  const today = new Date();
  const totalWater = getTotalWaterForDate(today);
  const currentSession = getCurrentWaterSession();
  const dailyGoal = 2500; // 2.5L daily goal
  const progress = Math.min((totalWater / dailyGoal) * 100, 100);

  const handleAddWater = (amount: number) => {
    setIsAnimating(true);
    addWaterEntry(amount);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return '#10b981'; // green
    if (progress >= 70) return '#3b82f6'; // blue
    if (progress >= 40) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const formatWaterAmount = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}L`;
    }
    return `${amount}ml`;
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-4">
        <i className="pi pi-tint text-2xl" style={{ color: 'var(--warm-gold)' }}></i>
        <h3 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
          Water Tracker
        </h3>
      </div>
      <div className="flex align-items-center gap-2">
        <Badge value={`${Math.round(progress)}%`} severity={progress >= 100 ? 'success' : 'info'} />
        <Button
          icon="pi pi-info-circle"
          rounded
          text
          size="small"
          className="p-1"
          style={{ color: 'var(--warm-gold)' }}
          onClick={() => {
            // Navigate to detailed water tracking page
            console.log('Navigate to water details');
          }}
          aria-label="Water tracker info"
        />
      </div>
    </div>
  );

  return (
    <Card
      header={header}
      className={`water-panel glass-card ${className || ''} ${isAnimating ? 'animate-pulse' : ''}`}
    >
      <div className="flex flex-column gap-4">
        {/* Progress Section */}
        <div className="flex flex-column gap-2">
          <div className="flex justify-content-between align-items-center">
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Today&apos;s Progress
            </span>
            <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
              {formatWaterAmount(totalWater)} / {formatWaterAmount(dailyGoal)}
            </span>
          </div>
          <ProgressBar
            value={progress}
            style={{ height: '8px' }}
            color={getProgressColor(progress)}
            className="w-full"
          />
        </div>

        {/* Quick Add Buttons */}
        <div className="flex flex-column gap-2">
          <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
            Quick Add
          </span>
          <div className="flex gap-2 flex-wrap">
            <Button
              label="250ml"
              icon="pi pi-plus"
              size="small"
              onClick={() => handleAddWater(250)}
              className="flex-1 min-w-0"
              severity="info"
            />
            <Button
              label="500ml"
              icon="pi pi-plus"
              size="small"
              onClick={() => handleAddWater(500)}
              className="flex-1 min-w-0"
              severity="info"
            />
            <Button
              label="1L"
              icon="pi pi-plus"
              size="small"
              onClick={() => handleAddWater(1000)}
              className="flex-1 min-w-0"
              severity="info"
            />
          </div>
        </div>

        {/* Current Session */}
        {currentSession.length > 0 && (
          <div className="flex flex-column gap-2">
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Current Session
            </span>
            <div className="flex align-items-center gap-2">
              <i className="pi pi-clock text-blue-500"></i>
              <span className="text-sm" style={{ color: 'var(--foreground)' }}>
                {formatWaterAmount(currentSession.reduce((sum, entry) => sum + entry.amount, 0))}
                in last 2 hours
              </span>
            </div>
          </div>
        )}

        {/* Achievement Message */}
        {progress >= 100 && (
          <div className="flex align-items-center gap-2 p-2 bg-green-50 border-round">
            <i className="pi pi-check-circle text-green-600"></i>
            <span className="text-sm text-green-700 font-medium">Daily goal achieved! 🎉</span>
          </div>
        )}
      </div>
    </Card>
  );
};

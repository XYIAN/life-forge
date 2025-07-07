'use client';

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Chart } from 'primereact/chart';
import { Calendar } from 'primereact/calendar';
import { useData } from '@/lib/providers/data-provider';
import { useRef } from 'react';
import Link from 'next/link';

export default function DailyGoalsPage() {
  const { addGoal, toggleGoal, getGoalsForDate, getCompletedGoalsForDate } = useData();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const toast = useRef<Toast>(null);

  const todaysGoals = getGoalsForDate(selectedDate);
  const completedGoals = getCompletedGoalsForDate(selectedDate);
  const completionRate =
    todaysGoals.length > 0 ? (completedGoals.length / todaysGoals.length) * 100 : 0;

  // Get last 7 days data for chart
  const getWeeklyData = () => {
    const data = [];
    const labels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const goals = getGoalsForDate(date);
      const completed = getCompletedGoalsForDate(date);
      const rate = goals.length > 0 ? (completed.length / goals.length) * 100 : 0;

      data.push(rate);
      labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
    }

    return { data, labels };
  };

  const weeklyData = getWeeklyData();

  const chartData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Goal Completion Rate (%)',
        data: weeklyData.data,
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderColor: 'rgba(212, 175, 55, 1)',
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'var(--foreground)',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'var(--foreground)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'var(--foreground)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  const handleAddGoal = () => {
    if (newGoalTitle.trim()) {
      addGoal(newGoalTitle.trim());
      setNewGoalTitle('');
      setShowAddDialog(false);
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: '🎯 Goal Added!',
          detail: "Your new goal has been added to today's list.",
          life: 3000,
        });
      }
    }
  };

  const handleToggleGoal = (goalId: string) => {
    const goal = todaysGoals.find(g => g.id === goalId);
    if (goal && !goal.completed) {
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: '🎉 Goal Completed!',
          detail: "Great job! You're making progress.",
          life: 3000,
        });
      }
    }
    toggleGoal(goalId);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return '#10b981';
    if (progress >= 70) return '#3b82f6';
    if (progress >= 40) return '#f59e0b';
    return '#ef4444';
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-4">
        <Link href="/dashboard">
          <Button
            icon="pi pi-arrow-left"
            text
            className="p-1"
            style={{ color: 'var(--warm-gold)' }}
          />
        </Link>
        <i className="pi pi-check-circle text-2xl" style={{ color: 'var(--warm-gold)' }}></i>
        <h1 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
          Daily Goals
        </h1>
      </div>
      <Button
        label="Add Goal"
        icon="pi pi-plus"
        onClick={() => setShowAddDialog(true)}
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
    <div className="min-h-screen">
      <Toast ref={toast} />

      {/* Header */}
      <div className="container mx-auto px-4 py-6">{header}</div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="flex flex-column gap-8">
          {/* Date Selector */}
          <Card className="glass-card">
            <div className="flex align-items-center gap-4">
              <span className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Select Date:
              </span>
              <Calendar
                value={selectedDate}
                onChange={e => setSelectedDate(e.value as Date)}
                showIcon
                className="flex-1"
                maxDate={new Date()}
              />
            </div>
          </Card>

          {/* Progress Overview */}
          <Card className="glass-card">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Progress Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 glass-card">
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
                  {todaysGoals.length}
                </div>
                <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  Total Goals
                </div>
              </div>
              <div className="text-center p-4 glass-card">
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
                  {completedGoals.length}
                </div>
                <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  Completed
                </div>
              </div>
              <div className="text-center p-4 glass-card">
                <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
                  {Math.round(completionRate)}%
                </div>
                <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                  Completion Rate
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-content-between align-items-center mb-2">
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  Overall Progress
                </span>
                <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                  {completedGoals.length}/{todaysGoals.length}
                </span>
              </div>
              <ProgressBar
                value={completionRate}
                style={{ height: '12px' }}
                color={getProgressColor(completionRate)}
                showValue={false}
              />
            </div>
          </Card>

          {/* Weekly Chart */}
          <Card className="glass-card">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Weekly Progress
            </h2>
            <div className="h-64">
              <Chart type="line" data={chartData} options={chartOptions} />
            </div>
          </Card>

          {/* Goals List */}
          <Card className="glass-card">
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Goals for{' '}
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h2>

            <div className="flex flex-column gap-3">
              {todaysGoals.length === 0 ? (
                <div
                  className="text-center py-8"
                  style={{ color: 'var(--foreground)', opacity: 0.7 }}
                >
                  <i className="pi pi-target text-4xl mb-3"></i>
                  <p className="text-lg">No goals set for this date.</p>
                  <p className="text-sm">Add your first goal to get started!</p>
                </div>
              ) : (
                todaysGoals.map(goal => (
                  <div
                    key={goal.id}
                    className={`flex align-items-center gap-3 p-3 border-round transition-all duration-300 glass-card ${
                      goal.completed ? 'border-2' : 'border-1'
                    }`}
                    style={{
                      borderColor: goal.completed ? 'var(--warm-gold)' : 'var(--glass-border)',
                      opacity: goal.completed ? 0.8 : 1,
                    }}
                  >
                    <Checkbox
                      checked={goal.completed}
                      onChange={() => handleToggleGoal(goal.id)}
                      className="flex-none"
                    />
                    <span
                      className={`flex-1 text-lg ${goal.completed ? 'line-through' : ''}`}
                      style={{ color: 'var(--foreground)' }}
                    >
                      {goal.title}
                    </span>
                    {goal.completed && (
                      <i
                        className="pi pi-check-circle text-2xl"
                        style={{ color: 'var(--warm-gold)' }}
                      ></i>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Achievement Message */}
          {completionRate === 100 && todaysGoals.length > 0 && (
            <Card className="glass-card border-2" style={{ borderColor: 'var(--warm-gold)' }}>
              <div className="flex align-items-center gap-3 text-center">
                <i className="pi pi-trophy text-3xl" style={{ color: 'var(--warm-gold)' }}></i>
                <div>
                  <h3 className="text-xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                    Perfect Day! 🏆
                  </h3>
                  <p className="text-sm m-0" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    All goals completed! You&apos;re absolutely crushing it!
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Add Goal Dialog */}
      <Dialog
        header="Add New Goal"
        visible={showAddDialog}
        onHide={() => setShowAddDialog(false)}
        style={{ width: '90vw', maxWidth: '500px' }}
        modal
        className="glass-card"
      >
        <div className="flex flex-column gap-4">
          <div className="flex flex-column gap-2">
            <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Goal Description
            </label>
            <InputText
              value={newGoalTitle}
              onChange={e => setNewGoalTitle(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              className="w-full"
              onKeyPress={e => e.key === 'Enter' && handleAddGoal()}
            />
          </div>
          <div className="flex gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowAddDialog(false)}
              className="flex-1"
              severity="secondary"
            />
            <Button
              label="Add Goal"
              icon="pi pi-plus"
              onClick={handleAddGoal}
              className="flex-1"
              severity="info"
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}

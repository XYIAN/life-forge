'use client';

import React, { useState, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useData } from '@providers';
import { useCelebrationAnimation } from '@hooks';

interface GoalListProps {
  className?: string;
}

export const GoalList: React.FC<GoalListProps> = ({ className }) => {
  const { addGoal, toggleGoal, getGoalsForDate, getCompletedGoalsForDate } = useData();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const toast = useRef<Toast>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Celebration animations
  const { triggerConfetti, triggerElasticScale } = useCelebrationAnimation({
    containerRef: containerRef as React.RefObject<HTMLElement>,
  });

  const today = new Date();
  const todaysGoals = getGoalsForDate(today);
  const completedGoals = getCompletedGoalsForDate(today);
  const completionRate =
    todaysGoals.length > 0 ? (completedGoals.length / todaysGoals.length) * 100 : 0;

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
      // Animate completion
      setIsAnimating(true);

      // Trigger celebration animations
      if (containerRef.current) {
        triggerElasticScale(containerRef.current);

        // Trigger confetti at the center of the container
        const rect = containerRef.current.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        triggerConfetti(x, y, 15);
      }

      setTimeout(() => setIsAnimating(false), 600);

      // Show celebration for completion
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
    if (progress >= 100) return '#10b981'; // green
    if (progress >= 70) return '#3b82f6'; // blue
    if (progress >= 40) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-4">
        <i
          className="pi pi-check-circle text-2xl"
          style={{
            background: 'linear-gradient(135deg, #10b981, #059669)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        ></i>
        <h3 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
          Daily Goals
        </h3>
      </div>
      <div className="flex align-items-center gap-2">
        <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
          {completedGoals.length}/{todaysGoals.length}
        </span>
        <div className="w-3rem">
          <ProgressBar
            value={completionRate}
            style={{ height: '4px' }}
            color={getProgressColor(completionRate)}
            showValue={false}
          />
        </div>
        <Button
          icon="pi pi-info-circle"
          rounded
          text
          size="small"
          className="p-1"
          style={{ color: 'var(--warm-gold)' }}
          onClick={() => {
            window.location.href = '/dashboard/daily-goals';
          }}
          aria-label="Goals info"
        />
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div ref={containerRef} className="relative">
        <Card
          header={header}
          className={`goal-list glass-card ${className || ''} ${
            isAnimating ? 'animate-pulse' : ''
          }`}
        >
          <div className="flex flex-column gap-4">
            {/* Progress Summary */}
            <div
              className="flex justify-content-between align-items-center p-2 border-round glass-card"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div className="flex flex-column">
                <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                  Today&apos;s Progress
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: getProgressColor(completionRate) }}
                >
                  {Math.round(completionRate)}% Complete
                </span>
              </div>
              <div className="flex align-items-center gap-2">
                {completionRate === 100 && todaysGoals.length > 0 && (
                  <i className="pi pi-star text-2xl" style={{ color: 'var(--warm-gold)' }}></i>
                )}
              </div>
            </div>

            {/* Goals List */}
            <div className="flex flex-column gap-2">
              {todaysGoals.length === 0 ? (
                <div
                  className="text-center py-4"
                  style={{ color: 'var(--foreground)', opacity: 0.7 }}
                >
                  <i
                    className="pi pi-target text-4xl mb-2"
                    style={{ color: 'var(--warm-gold)' }}
                  ></i>
                  <p className="text-sm" style={{ color: 'var(--foreground)' }}>
                    No goals set for today.
                  </p>
                  <p className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                    Add your first goal to get started!
                  </p>
                </div>
              ) : (
                todaysGoals.map(goal => (
                  <div
                    key={goal.id}
                    className={`flex align-items-center gap-3 p-2 border-round transition-all duration-300 border-1 glass-card`}
                    style={{
                      background: goal.completed ? 'rgba(16, 185, 129, 0.1)' : 'var(--glass-bg)',
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
                      className="flex-1"
                      style={{
                        color: 'var(--foreground)',
                        textDecoration: goal.completed ? 'line-through' : 'none',
                        opacity: goal.completed ? 0.7 : 1,
                      }}
                    >
                      {goal.title}
                    </span>
                    {goal.completed && (
                      <i
                        className="pi pi-check-circle flex-none"
                        style={{ color: 'var(--warm-gold)' }}
                      ></i>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Add Goal Button */}
            <Button
              label="Add Goal"
              icon="pi pi-plus"
              onClick={() => setShowAddDialog(true)}
              className="w-full"
              severity="info"
              outlined
            />

            {/* Achievement Message */}
            {completionRate === 100 && todaysGoals.length > 0 && (
              <div className="flex align-items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 border-round">
                <i className="pi pi-trophy text-yellow-500"></i>
                <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                  Perfect day! All goals completed! 🏆
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Add Goal Dialog */}
      <Dialog
        header="Add New Goal"
        visible={showAddDialog}
        onHide={() => setShowAddDialog(false)}
        style={{ width: '90vw', maxWidth: '400px' }}
        modal
        className="add-goal-dialog"
      >
        <div className="flex flex-column gap-4">
          <div className="flex flex-column gap-2">
            <label className="text-sm font-medium">Goal Description</label>
            <InputText
              value={newGoalTitle}
              onChange={e => setNewGoalTitle(e.target.value)}
              placeholder="e.g., Drink 8 glasses of water"
              className="w-full"
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleAddGoal();
                }
              }}
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
              icon="pi pi-check"
              onClick={handleAddGoal}
              className="flex-1"
              severity="success"
              disabled={!newGoalTitle.trim()}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

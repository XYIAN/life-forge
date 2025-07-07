'use client';

import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Badge } from 'primereact/badge';
// import { useAnimation } from '@/hooks/useAnimation';
// import { useTheme } from '@/hooks/useTheme';

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  status: 'planning' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export default function NextBigThingPanel() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: null as Date | null,
    priority: 'medium' as 'low' | 'medium' | 'high',
  });
  // const { isDark } = useTheme();
  // const { animateIn } = useAnimation();

  useEffect(() => {
    // Load goals from localStorage
    const savedGoals = localStorage.getItem('nextBigThingGoals');
    if (savedGoals) {
      setGoals(
        JSON.parse(savedGoals).map((goal: Record<string, unknown>) => ({
          ...goal,
          deadline: new Date(goal.deadline as string),
          createdAt: new Date(goal.createdAt as string),
        }))
      );
    }
  }, []);

  useEffect(() => {
    // Animation handled by CSS
  }, []);

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem('nextBigThingGoals', JSON.stringify(updatedGoals));
  };

  const addGoal = () => {
    if (!newGoal.title || !newGoal.deadline) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      deadline: newGoal.deadline,
      progress: 0,
      status: 'planning',
      priority: newGoal.priority,
      createdAt: new Date(),
    };

    saveGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', deadline: null, priority: 'medium' });
    setShowAddDialog(false);
  };

  const updateProgress = (goalId: string, progress: number) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newProgress = Math.max(0, Math.min(100, progress));
        return {
          ...goal,
          progress: newProgress,
          status: newProgress === 100 ? ('completed' as const) : ('in-progress' as const),
        };
      }
      return goal;
    });
    saveGoals(updatedGoals);
  };

  const deleteGoal = (goalId: string) => {
    saveGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getPriorityColor = (priority: string): 'danger' | 'warning' | 'info' => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'info';
    }
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const activeGoals = goals.filter(goal => goal.status !== 'completed');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  const title = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-star-fill text-xl" style={{ color: 'var(--warm-gold)' }}></i>
      <span className="text-xl font-bold" style={{ color: 'var(--foreground)' }}>
        Next Big Thing
      </span>
    </div>
  );
  const subtitle = (
    <span style={{ color: 'var(--foreground)', opacity: 0.8 }}>
      Track your major life goals and dreams
    </span>
  );

  return (
    <div className="next-big-thing-panel">
      <Card
        className="next-big-thing-card shadow-lg border-0 glass-card"
        header={title}
        subTitle={subtitle}
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
      >
        <div className="space-y-4">
          {/* Add Goal Button */}
          <div className="flex justify-center">
            <Button
              label="Add New Goal"
              icon="pi pi-plus"
              className="p-button-rounded p-button-outlined"
              style={{
                borderColor: 'var(--glass-border)',
                color: 'var(--foreground)',
              }}
              onClick={() => setShowAddDialog(true)}
            />
          </div>

          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Active Goals ({activeGoals.length})
              </h3>
              {activeGoals.map(goal => (
                <div
                  key={goal.id}
                  className="p-4 border rounded-lg glass-card"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--foreground)',
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4
                        className="font-semibold mb-1 flex items-center gap-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        <Badge
                          value={goal.priority.toUpperCase()}
                          severity={getPriorityColor(goal.priority)}
                        />
                        {goal.title}
                      </h4>
                      {goal.description && (
                        <p
                          className="text-sm mb-2"
                          style={{ color: 'var(--foreground)', opacity: 0.8 }}
                        >
                          {goal.description}
                        </p>
                      )}
                      <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        Created: {goal.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        icon="pi pi-trash"
                        className="p-button-text p-button-danger p-button-sm"
                        onClick={() => deleteGoal(goal.id)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--foreground)', opacity: 0.8 }}>Progress</span>
                      <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                        {goal.progress}%
                      </span>
                    </div>
                    <ProgressBar
                      value={goal.progress}
                      className="h-2"
                      color={goal.progress === 100 ? '#10b981' : '#3b82f6'}
                    />

                    <div className="flex justify-between items-center">
                      <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                        Deadline: {goal.deadline.toLocaleDateString()}
                        <span
                          className="ml-2"
                          style={{
                            color:
                              getDaysUntilDeadline(goal.deadline) < 7
                                ? '#ef4444'
                                : 'var(--foreground)',
                            opacity: 0.8,
                          }}
                        >
                          ({getDaysUntilDeadline(goal.deadline)} days)
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          icon="pi pi-minus"
                          className="p-button-text p-button-sm"
                          onClick={() => updateProgress(goal.id, goal.progress - 10)}
                          disabled={goal.progress <= 0}
                        />
                        <Button
                          icon="pi pi-plus"
                          className="p-button-text p-button-sm"
                          onClick={() => updateProgress(goal.id, goal.progress + 10)}
                          disabled={goal.progress >= 100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Completed Goals ({completedGoals.length})
              </h3>
              {completedGoals.map(goal => (
                <div
                  key={goal.id}
                  className="p-4 border rounded-lg glass-card"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--foreground)',
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4
                        className="font-semibold mb-1 flex items-center gap-2"
                        style={{ color: 'var(--foreground)' }}
                      >
                        <i className="pi pi-check-circle" style={{ color: 'var(--warm-gold)' }}></i>
                        {goal.title}
                      </h4>
                      {goal.description && (
                        <p
                          className="text-sm mb-2"
                          style={{ color: 'var(--foreground)', opacity: 0.8 }}
                        >
                          {goal.description}
                        </p>
                      )}
                      <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                        Completed on {goal.createdAt.toLocaleDateString()}
                      </div>
                    </div>
                    <Button
                      icon="pi pi-trash"
                      className="p-button-text p-button-danger p-button-sm"
                      onClick={() => deleteGoal(goal.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {goals.length === 0 && (
            <div className="text-center py-8" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
              <i className="pi pi-star text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}></i>
              <p className="text-lg" style={{ color: 'var(--foreground)' }}>
                No big goals set yet.
              </p>
              <p className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                Add your first major life goal to start tracking your dreams!
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog
        header="Add New Goal"
        visible={showAddDialog}
        style={{ width: '500px' }}
        onHide={() => setShowAddDialog(false)}
        modal
        className="p-fluid"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Goal Title *
            </label>
            <InputText
              id="title"
              value={newGoal.title}
              onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
              placeholder="e.g., Learn to play guitar"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <InputTextarea
              id="description"
              value={newGoal.description}
              onChange={e => setNewGoal({ ...newGoal, description: e.target.value })}
              placeholder="Describe your goal in detail..."
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium mb-2">
              Deadline *
            </label>
            <Calendar
              id="deadline"
              value={newGoal.deadline}
              onChange={e => setNewGoal({ ...newGoal, deadline: e.value as Date })}
              showIcon
              minDate={new Date()}
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map(priority => (
                <Button
                  key={priority}
                  label={priority.charAt(0).toUpperCase() + priority.slice(1)}
                  className={`p-button-outlined ${
                    newGoal.priority === priority ? 'p-button-primary' : ''
                  }`}
                  onClick={() =>
                    setNewGoal({ ...newGoal, priority: priority as 'low' | 'medium' | 'high' })
                  }
                />
              ))}
            </div>
          </div>
        </div>
        footer=
        {
          <div className="flex gap-2 justify-end">
            <Button
              label="Cancel"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() => setShowAddDialog(false)}
            />
            <Button
              label="Add Goal"
              icon="pi pi-check"
              onClick={addGoal}
              disabled={!newGoal.title || !newGoal.deadline}
            />
          </div>
        }
      </Dialog>
    </div>
  );
}

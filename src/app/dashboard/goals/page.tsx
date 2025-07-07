'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import { Chart } from 'primereact/chart';
import { Toast } from 'primereact/toast';
import { useAnime, animePresets } from '@/hooks/use-anime';

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'long-term';
  category: 'health' | 'fitness' | 'nutrition' | 'mental' | 'productivity' | 'social';
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  status: 'active' | 'completed' | 'paused' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  completedAt?: Date;
}

const goalTypes = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Long-term', value: 'long-term' },
];

const goalCategories = [
  { label: 'Health', value: 'health' },
  { label: 'Fitness', value: 'fitness' },
  { label: 'Nutrition', value: 'nutrition' },
  { label: 'Mental', value: 'mental' },
  { label: 'Productivity', value: 'productivity' },
  { label: 'Social', value: 'social' },
];

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentGoal, setCurrentGoal] = useState<Partial<Goal>>({});
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const toast = useRef<Toast>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { add } = useAnime({ targets: '', autoplay: false });

  useEffect(() => {
    // Load goals from localStorage
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      setGoals(
        JSON.parse(savedGoals).map((g: Record<string, unknown>) => ({
          ...g,
          deadline: new Date(g.deadline as string),
          createdAt: new Date(g.createdAt as string),
          completedAt: g.completedAt ? new Date(g.completedAt as string) : undefined,
        }))
      );
    }

    // Animate page entrance
    const animatePage = async () => {
      if (containerRef.current) {
        await add({
          targets: containerRef.current,
          ...animePresets.fadeInUp,
          duration: 1000,
        });
      }
    };

    animatePage();
  }, [add]);

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const addGoal = () => {
    if (!currentGoal.title || !currentGoal.type || !currentGoal.category || !currentGoal.target)
      return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: currentGoal.title!,
      description: currentGoal.description || '',
      type: currentGoal.type!,
      category: currentGoal.category!,
      target: currentGoal.target!,
      current: 0,
      unit: currentGoal.unit || '',
      deadline: currentGoal.deadline || new Date(),
      status: 'active',
      priority: currentGoal.priority || 'medium',
      createdAt: new Date(),
    };

    const updatedGoals = [newGoal, ...goals];
    saveGoals(updatedGoals);

    setShowAddDialog(false);
    setCurrentGoal({});

    toast.current?.show({
      severity: 'success',
      summary: 'Goal Added',
      detail: 'Your new goal has been created successfully.',
      life: 3000,
    });
  };

  const updateGoalProgress = (goalId: string, newProgress: number) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.min(newProgress, goal.target);
        const newStatus = newCurrent >= goal.target ? 'completed' : goal.status;
        return {
          ...goal,
          current: newCurrent,
          status: newStatus,
          completedAt: newCurrent >= goal.target ? new Date() : goal.completedAt,
        };
      }
      return goal;
    });
    saveGoals(updatedGoals);
  };

  const deleteGoal = (goalId: string) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    saveGoals(updatedGoals);

    toast.current?.show({
      severity: 'info',
      summary: 'Goal Deleted',
      detail: 'Goal has been removed successfully.',
      life: 3000,
    });
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'active':
        return 'info';
      case 'paused':
        return 'warning';
      case 'overdue':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health':
        return 'pi pi-heart';
      case 'fitness':
        return 'pi pi-bolt';
      case 'nutrition':
        return 'pi pi-apple';
      case 'mental':
        return 'pi pi-brain';
      case 'productivity':
        return 'pi pi-chart-line';
      case 'social':
        return 'pi pi-users';
      default:
        return 'pi pi-target';
    }
  };

  // Filter goals
  const filteredGoals = goals.filter(goal => {
    const typeMatch = filterType === 'all' || goal.type === filterType;
    const categoryMatch = filterCategory === 'all' || goal.category === filterCategory;
    const statusMatch = filterStatus === 'all' || goal.status === filterStatus;
    return typeMatch && categoryMatch && statusMatch;
  });

  // Calculate statistics
  const stats = {
    total: goals.length,
    active: goals.filter(g => g.status === 'active').length,
    completed: goals.filter(g => g.status === 'completed').length,
    overdue: goals.filter(g => g.status === 'overdue').length,
    completionRate:
      goals.length > 0
        ? (goals.filter(g => g.status === 'completed').length / goals.length) * 100
        : 0,
  };

  // Chart data
  const categoryData = {
    labels: goalCategories.map(cat => cat.label),
    datasets: [
      {
        data: goalCategories.map(cat => goals.filter(g => g.category === cat.value).length),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
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
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Goals
        </h1>
        <p className="text-lg" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
          Track your progress and achieve your dreams
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.total}
          </div>
          <div style={{ color: 'var(--foreground)' }}>Total Goals</div>
        </Card>

        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.active}
          </div>
          <div style={{ color: 'var(--foreground)' }}>Active</div>
        </Card>

        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.completed}
          </div>
          <div style={{ color: 'var(--foreground)' }}>Completed</div>
        </Card>

        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.completionRate.toFixed(1)}%
          </div>
          <div style={{ color: 'var(--foreground)' }}>Success Rate</div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card
        className="glass-card mb-6"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
      >
        <div className="flex flex-column md:flex-row gap-4 align-items-center justify-content-between">
          <div className="flex flex-column md:flex-row gap-4 flex-1">
            <Dropdown
              value={filterType}
              options={[{ label: 'All Types', value: 'all' }, ...goalTypes]}
              onChange={e => setFilterType(e.value)}
              placeholder="Filter by type"
              className="w-full md:w-10rem"
            />

            <Dropdown
              value={filterCategory}
              options={[{ label: 'All Categories', value: 'all' }, ...goalCategories]}
              onChange={e => setFilterCategory(e.value)}
              placeholder="Filter by category"
              className="w-full md:w-10rem"
            />

            <Dropdown
              value={filterStatus}
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Active', value: 'active' },
                { label: 'Completed', value: 'completed' },
                { label: 'Paused', value: 'paused' },
                { label: 'Overdue', value: 'overdue' },
              ]}
              onChange={e => setFilterStatus(e.value)}
              placeholder="Filter by status"
              className="w-full md:w-10rem"
            />
          </div>

          <Button
            label="Add Goal"
            icon="pi pi-plus"
            onClick={() => setShowAddDialog(true)}
            className="w-full md:w-auto"
            severity="success"
          />
        </div>
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredGoals.map(goal => (
          <Card
            key={goal.id}
            className="glass-card cursor-pointer transition-all duration-300 hover:scale-105"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
            onClick={() => {
              setSelectedGoal(goal);
              setShowDetailsDialog(true);
            }}
          >
            <div className="flex align-items-center justify-content-between mb-3">
              <div className="flex align-items-center gap-2">
                <i
                  className={`${getCategoryIcon(goal.category)} text-lg`}
                  style={{ color: 'var(--warm-gold)' }}
                ></i>
                <Tag value={goal.category} severity="info" />
              </div>
              <Tag value={goal.priority} severity={getPriorityColor(goal.priority)} />
            </div>

            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              {goal.title}
            </h3>

            {goal.description && (
              <p className="text-sm mb-3" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
                {goal.description}
              </p>
            )}

            <div className="mb-3">
              <div className="flex justify-content-between text-sm mb-1">
                <span style={{ color: 'var(--foreground)' }}>
                  {goal.current} / {goal.target} {goal.unit}
                </span>
                <span style={{ color: 'var(--foreground)' }}>
                  {((goal.current / goal.target) * 100).toFixed(1)}%
                </span>
              </div>
              <ProgressBar value={(goal.current / goal.target) * 100} className="h-1rem" />
            </div>

            <div className="flex align-items-center justify-content-between">
              <Tag value={goal.status} severity={getGoalStatusColor(goal.status)} />
              <span className="text-xs" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Due: {goal.deadline.toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card
        className="glass-card"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
      >
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
          Goals by Category
        </h2>
        <div className="h-20rem">
          <Chart type="doughnut" data={categoryData} options={chartOptions} />
        </div>
      </Card>

      {/* Add Goal Dialog */}
      <Dialog
        header="Add New Goal"
        visible={showAddDialog}
        onHide={() => setShowAddDialog(false)}
        style={{ width: '600px' }}
        className="glass-card"
      >
        <div className="grid gap-4">
          <div className="field">
            <label className="block mb-2 font-medium">Goal Title</label>
            <InputText
              value={currentGoal.title || ''}
              onChange={e => setCurrentGoal({ ...currentGoal, title: e.target.value })}
              placeholder="Enter goal title"
              className="w-full"
            />
          </div>

          <div className="field">
            <label className="block mb-2 font-medium">Description</label>
            <InputText
              value={currentGoal.description || ''}
              onChange={e => setCurrentGoal({ ...currentGoal, description: e.target.value })}
              placeholder="Enter goal description"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="field">
              <label className="block mb-2 font-medium">Type</label>
              <Dropdown
                value={currentGoal.type}
                options={goalTypes}
                onChange={e => setCurrentGoal({ ...currentGoal, type: e.value })}
                placeholder="Select type"
                className="w-full"
              />
            </div>

            <div className="field">
              <label className="block mb-2 font-medium">Category</label>
              <Dropdown
                value={currentGoal.category}
                options={goalCategories}
                onChange={e => setCurrentGoal({ ...currentGoal, category: e.value })}
                placeholder="Select category"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="field">
              <label className="block mb-2 font-medium">Target</label>
              <InputNumber
                value={currentGoal.target}
                onValueChange={e => setCurrentGoal({ ...currentGoal, target: e.value || 0 })}
                placeholder="Target value"
                className="w-full"
              />
            </div>

            <div className="field">
              <label className="block mb-2 font-medium">Unit</label>
              <InputText
                value={currentGoal.unit || ''}
                onChange={e => setCurrentGoal({ ...currentGoal, unit: e.target.value })}
                placeholder="e.g., steps, kg, hours"
                className="w-full"
              />
            </div>

            <div className="field">
              <label className="block mb-2 font-medium">Priority</label>
              <Dropdown
                value={currentGoal.priority}
                options={priorityOptions}
                onChange={e => setCurrentGoal({ ...currentGoal, priority: e.value })}
                placeholder="Select priority"
                className="w-full"
              />
            </div>
          </div>

          <div className="field">
            <label className="block mb-2 font-medium">Deadline</label>
            <Calendar
              value={currentGoal.deadline}
              onChange={e => setCurrentGoal({ ...currentGoal, deadline: e.value as Date })}
              showIcon
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-content-end mt-4">
          <Button label="Cancel" onClick={() => setShowAddDialog(false)} severity="secondary" />
          <Button label="Add Goal" onClick={addGoal} severity="success" />
        </div>
      </Dialog>

      {/* Goal Details Dialog */}
      <Dialog
        header="Goal Details"
        visible={showDetailsDialog}
        onHide={() => setShowDetailsDialog(false)}
        style={{ width: '600px' }}
        className="glass-card"
      >
        {selectedGoal && (
          <div className="grid gap-4">
            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center gap-2">
                <i
                  className={`${getCategoryIcon(selectedGoal.category)} text-xl`}
                  style={{ color: 'var(--warm-gold)' }}
                ></i>
                <Tag value={selectedGoal.category} severity="info" />
                <Tag
                  value={selectedGoal.priority}
                  severity={getPriorityColor(selectedGoal.priority)}
                />
              </div>
              <Tag value={selectedGoal.status} severity={getGoalStatusColor(selectedGoal.status)} />
            </div>

            <h3 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
              {selectedGoal.title}
            </h3>

            {selectedGoal.description && (
              <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>{selectedGoal.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Progress</label>
                <div className="flex align-items-center gap-2">
                  <InputNumber
                    value={selectedGoal.current}
                    onValueChange={e => updateGoalProgress(selectedGoal.id, e.value || 0)}
                    min={0}
                    max={selectedGoal.target}
                    className="flex-1"
                  />
                  <span style={{ color: 'var(--foreground)' }}>
                    / {selectedGoal.target} {selectedGoal.unit}
                  </span>
                </div>
                <ProgressBar
                  value={(selectedGoal.current / selectedGoal.target) * 100}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Deadline</label>
                <p style={{ color: 'var(--foreground)' }}>
                  {selectedGoal.deadline.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium">Created</label>
                <p style={{ color: 'var(--foreground)' }}>
                  {selectedGoal.createdAt.toLocaleDateString()}
                </p>
              </div>

              {selectedGoal.completedAt && (
                <div>
                  <label className="block mb-2 font-medium">Completed</label>
                  <p style={{ color: 'var(--foreground)' }}>
                    {selectedGoal.completedAt.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 justify-content-end">
              <Button
                label="Delete"
                icon="pi pi-trash"
                onClick={() => {
                  deleteGoal(selectedGoal.id);
                  setShowDetailsDialog(false);
                }}
                severity="danger"
              />
              <Button
                label="Close"
                onClick={() => setShowDetailsDialog(false)}
                severity="secondary"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

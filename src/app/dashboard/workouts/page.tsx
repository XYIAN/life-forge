'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { ShineBorder } from '@/components/magicui';
import { useAnime, animePresets, createStaggerAnimation } from '@/hooks/use-anime';

interface Workout {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports';
  duration: number;
  calories: number;
  date: Date;
  exercises: Exercise[];
  notes?: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  restTime: number;
}

const workoutTypes = [
  { label: 'Strength Training', value: 'strength' },
  { label: 'Cardio', value: 'cardio' },
  { label: 'Flexibility', value: 'flexibility' },
  { label: 'Sports', value: 'sports' },
];

// Removed unused exerciseTypes variable

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState<Partial<Workout>>({});
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const { add } = useAnime({ targets: '', autoplay: false });

  useEffect(() => {
    // Load workouts from localStorage
    const savedWorkouts = localStorage.getItem('workouts');
    if (savedWorkouts) {
      setWorkouts(
        JSON.parse(savedWorkouts).map((w: Workout) => ({
          ...w,
          date: new Date(w.date),
        }))
      );
    }

    // Animate page entrance
    if (containerRef.current) {
      add({
        targets: containerRef.current,
        ...animePresets.fadeInUp,
        duration: 1000,
      });
    }
  }, []);

  useEffect(() => {
    // Animate cards with stagger
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.workout-card');
      add(createStaggerAnimation(cards, animePresets.fadeInUp, 150));
    }
  }, [workouts]);

  const saveWorkouts = (updatedWorkouts: Workout[]) => {
    setWorkouts(updatedWorkouts);
    localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
  };

  const addWorkout = () => {
    if (!currentWorkout.name || !currentWorkout.type || exercises.length === 0) return;

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name: currentWorkout.name!,
      type: currentWorkout.type!,
      duration: exercises.reduce((total, ex) => total + (ex.duration || 0), 0),
      calories: Math.floor(Math.random() * 200) + 100,
      date: new Date(),
      exercises: [...exercises],
      notes: currentWorkout.notes,
    };

    const updatedWorkouts = [newWorkout, ...workouts];
    saveWorkouts(updatedWorkouts);

    setShowAddDialog(false);
    setCurrentWorkout({});
    setExercises([]);
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: '',
      sets: 3,
      reps: 10,
      restTime: 60,
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setExercises(updatedExercises);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case 'strength':
        return 'danger';
      case 'cardio':
        return 'success';
      case 'flexibility':
        return 'info';
      case 'sports':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getWorkoutTypeIcon = (type: string) => {
    switch (type) {
      case 'strength':
        return 'pi pi-bolt';
      case 'cardio':
        return 'pi pi-heart';
      case 'flexibility':
        return 'pi pi-star';
      case 'sports':
        return 'pi pi-trophy';
      default:
        return 'pi pi-dumbbell';
    }
  };

  // Chart data
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Workouts',
        data: [1, 2, 0, 1, 3, 2, 1],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
      },
    ],
  };

  const typeData = {
    labels: ['Strength', 'Cardio', 'Flexibility', 'Sports'],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
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
    scales: {
      y: {
        ticks: {
          color: 'var(--foreground)',
        },
        grid: {
          color: 'var(--glass-border)',
        },
      },
      x: {
        ticks: {
          color: 'var(--foreground)',
        },
        grid: {
          color: 'var(--glass-border)',
        },
      },
    },
  };

  return (
    <div ref={containerRef} className="workouts-page">
      <div className="grid">
        {/* Header */}
        <div className="col-12 mb-4">
          <ShineBorder
            className="rounded-lg p-4"
            shineColor={['#ef4444', '#22c55e', '#3b82f6']}
            duration={6}
            borderWidth={2}
          >
            <Card className="glass-card">
              <div className="flex flex-column md:flex-row justify-content-between align-items-center">
                <div>
                  <h1 className="text-3xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                    <i className="pi pi-bolt mr-3" style={{ color: 'var(--warm-gold)' }}></i>
                    Workouts
                  </h1>
                  <p
                    className="text-lg m-0 mt-2"
                    style={{ color: 'var(--foreground)', opacity: 0.7 }}
                  >
                    Track your fitness journey and build strength
                  </p>
                </div>
                <Button
                  label="Add Workout"
                  icon="pi pi-plus"
                  className="p-button-primary mt-3 md:mt-0"
                  onClick={() => setShowAddDialog(true)}
                />
              </div>
            </Card>
          </ShineBorder>
        </div>

        {/* Stats Cards */}
        <div className="col-12 lg:col-3 mb-4">
          <Card className="glass-card workout-card">
            <div className="text-center">
              <i className="pi pi-calendar text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {workouts.length}
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Total Workouts
              </p>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-3 mb-4">
          <Card className="glass-card workout-card">
            <div className="text-center">
              <i className="pi pi-clock text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {workouts.reduce((total, w) => total + w.duration, 0)}m
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Total Time
              </p>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-3 mb-4">
          <Card className="glass-card workout-card">
            <div className="text-center">
              <i className="pi pi-fire text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {workouts.reduce((total, w) => total + w.calories, 0)}
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Calories Burned
              </p>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-3 mb-4">
          <Card className="glass-card workout-card">
            <div className="text-center">
              <i
                className="pi pi-chart-line text-4xl mb-3"
                style={{ color: 'var(--warm-gold)' }}
              ></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {workouts.length > 0 ? Math.round(workouts.length / 7) : 0}
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Weekly Average
              </p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="col-12 lg:col-8 mb-4">
          <Card className="glass-card workout-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Weekly Activity
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="bar" data={weeklyData} options={chartOptions} />
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-4 mb-4">
          <Card className="glass-card workout-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Workout Types
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="doughnut" data={typeData} options={chartOptions} />
            </div>
          </Card>
        </div>

        {/* Workouts List */}
        <div className="col-12">
          <Card className="glass-card workout-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Recent Workouts
            </h3>
            <DataTable
              value={workouts}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              className="glass-table"
              emptyMessage="No workouts found. Start your fitness journey!"
            >
              <Column
                field="name"
                header="Workout"
                body={(rowData: Workout) => (
                  <div className="flex align-items-center">
                    <i
                      className={`${getWorkoutTypeIcon(rowData.type)} mr-2`}
                      style={{ color: 'var(--warm-gold)' }}
                    ></i>
                    <span style={{ color: 'var(--foreground)' }}>{rowData.name}</span>
                  </div>
                )}
              />
              <Column
                field="type"
                header="Type"
                body={(rowData: Workout) => (
                  <Tag
                    value={rowData.type.charAt(0).toUpperCase() + rowData.type.slice(1)}
                    severity={getWorkoutTypeColor(rowData.type)}
                  />
                )}
              />
              <Column
                field="duration"
                header="Duration"
                body={(rowData: Workout) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.duration}m</span>
                )}
              />
              <Column
                field="calories"
                header="Calories"
                body={(rowData: Workout) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.calories}</span>
                )}
              />
              <Column
                field="date"
                header="Date"
                body={(rowData: Workout) => (
                  <span style={{ color: 'var(--foreground)' }}>
                    {rowData.date.toLocaleDateString()}
                  </span>
                )}
              />
              <Column
                header="Actions"
                body={(rowData: Workout) => (
                  <Button
                    icon="pi pi-eye"
                    className="p-button-text p-button-sm"
                    onClick={() => {
                      setSelectedWorkout(rowData);
                      setShowDetailsDialog(true);
                    }}
                  />
                )}
              />
            </DataTable>
          </Card>
        </div>
      </div>

      {/* Add Workout Dialog */}
      <Dialog
        header="Add New Workout"
        visible={showAddDialog}
        onHide={() => setShowAddDialog(false)}
        style={{ width: '90vw', maxWidth: '600px' }}
        className="glass-dialog"
      >
        <div className="grid">
          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Workout Name
            </label>
            <InputText
              value={currentWorkout.name || ''}
              onChange={e => setCurrentWorkout({ ...currentWorkout, name: e.target.value })}
              className="w-full"
              placeholder="Enter workout name"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Workout Type
            </label>
            <Dropdown
              value={currentWorkout.type}
              options={workoutTypes}
              onChange={e => setCurrentWorkout({ ...currentWorkout, type: e.value })}
              className="w-full"
              placeholder="Select workout type"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Notes
            </label>
            <InputText
              value={currentWorkout.notes || ''}
              onChange={e => setCurrentWorkout({ ...currentWorkout, notes: e.target.value })}
              className="w-full"
              placeholder="Optional notes"
            />
          </div>

          <div className="col-12 mb-3">
            <div className="flex justify-content-between align-items-center mb-3">
              <h4 className="m-0" style={{ color: 'var(--foreground)' }}>
                Exercises
              </h4>
              <Button
                label="Add Exercise"
                icon="pi pi-plus"
                className="p-button-sm"
                onClick={addExercise}
              />
            </div>

            {exercises.map((exercise, index) => (
              <Card key={exercise.id} className="mb-3 glass-card">
                <div className="grid">
                  <div className="col-12 mb-2">
                    <InputText
                      value={exercise.name}
                      onChange={e => updateExercise(index, 'name', e.target.value)}
                      placeholder="Exercise name"
                      className="w-full"
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                      Sets
                    </label>
                    <InputNumber
                      value={exercise.sets}
                      onValueChange={e => updateExercise(index, 'sets', e.value)}
                      min={1}
                      className="w-full"
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                      Reps
                    </label>
                    <InputNumber
                      value={exercise.reps}
                      onValueChange={e => updateExercise(index, 'reps', e.value)}
                      min={1}
                      className="w-full"
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                      Weight (kg)
                    </label>
                    <InputNumber
                      value={exercise.weight}
                      onValueChange={e => updateExercise(index, 'weight', e.value)}
                      min={0}
                      className="w-full"
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <label className="block text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                      Rest (sec)
                    </label>
                    <InputNumber
                      value={exercise.restTime}
                      onValueChange={e => updateExercise(index, 'restTime', e.value)}
                      min={0}
                      className="w-full"
                    />
                  </div>
                  <div className="col-12">
                    <Button
                      icon="pi pi-trash"
                      className="p-button-danger p-button-text p-button-sm"
                      onClick={() => removeExercise(index)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="col-12 flex justify-content-end">
            <Button
              label="Cancel"
              className="p-button-text mr-2"
              onClick={() => setShowAddDialog(false)}
            />
            <Button
              label="Save Workout"
              onClick={addWorkout}
              disabled={!currentWorkout.name || !currentWorkout.type || exercises.length === 0}
            />
          </div>
        </div>
      </Dialog>

      {/* Workout Details Dialog */}
      <Dialog
        header="Workout Details"
        visible={showDetailsDialog}
        onHide={() => setShowDetailsDialog(false)}
        style={{ width: '90vw', maxWidth: '800px' }}
        className="glass-dialog"
      >
        {selectedWorkout && (
          <div className="grid">
            <div className="col-12 mb-4">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                {selectedWorkout.name}
              </h3>
              <div className="flex gap-3 mb-3">
                <Tag
                  value={
                    selectedWorkout.type.charAt(0).toUpperCase() + selectedWorkout.type.slice(1)
                  }
                  severity={getWorkoutTypeColor(selectedWorkout.type)}
                />
                <span style={{ color: 'var(--foreground)' }}>
                  Duration: {selectedWorkout.duration}m
                </span>
                <span style={{ color: 'var(--foreground)' }}>
                  Calories: {selectedWorkout.calories}
                </span>
              </div>
              {selectedWorkout.notes && (
                <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>{selectedWorkout.notes}</p>
              )}
            </div>

            <div className="col-12">
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Exercises
              </h4>
              <DataTable value={selectedWorkout.exercises} className="glass-table">
                <Column field="name" header="Exercise" />
                <Column field="sets" header="Sets" />
                <Column field="reps" header="Reps" />
                <Column
                  field="weight"
                  header="Weight"
                  body={(rowData: Exercise) => (rowData.weight ? `${rowData.weight}kg` : '-')}
                />
                <Column
                  field="restTime"
                  header="Rest"
                  body={(rowData: Exercise) => `${rowData.restTime}s`}
                />
              </DataTable>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { Dialog } from 'primereact/dialog';
import { ProgressBar } from 'primereact/progressbar';
// import { useAnimation } from '@/hooks/useAnimation';
// import { useTheme } from '@/hooks/useTheme';

interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'cardio' | 'strength' | 'flexibility' | 'balance';
  exercises: Exercise[];
  calories: number;
  equipment: string[];
}

interface Exercise {
  name: string;
  duration: number; // in seconds
  description: string;
  instructions: string[];
  image?: string;
}

const WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Quick Cardio Blast',
    description: 'High-energy cardio workout to get your heart pumping',
    duration: 10,
    difficulty: 'beginner',
    category: 'cardio',
    calories: 80,
    equipment: [],
    exercises: [
      {
        name: 'Jumping Jacks',
        duration: 30,
        description: 'Classic cardio exercise',
        instructions: [
          'Stand with feet together',
          'Jump while raising arms',
          'Land with feet apart',
        ],
      },
      {
        name: 'High Knees',
        duration: 30,
        description: 'Running in place with high knees',
        instructions: ['Run in place', 'Bring knees up high', 'Pump your arms'],
      },
      {
        name: 'Mountain Climbers',
        duration: 30,
        description: 'Dynamic plank variation',
        instructions: [
          'Start in plank position',
          'Alternate bringing knees to chest',
          'Keep core engaged',
        ],
      },
      {
        name: 'Burpees',
        duration: 30,
        description: 'Full body exercise',
        instructions: ['Squat down', 'Place hands on ground', 'Jump feet back', 'Jump up'],
      },
    ],
  },
  {
    id: '2',
    name: 'Core Crusher',
    description: 'Target your abs and core muscles',
    duration: 8,
    difficulty: 'intermediate',
    category: 'strength',
    calories: 60,
    equipment: [],
    exercises: [
      {
        name: 'Plank Hold',
        duration: 45,
        description: 'Static core exercise',
        instructions: ['Hold plank position', 'Keep body straight', 'Engage core muscles'],
      },
      {
        name: 'Crunches',
        duration: 30,
        description: 'Basic ab exercise',
        instructions: ['Lie on back', 'Bend knees', 'Lift shoulders off ground', 'Lower slowly'],
      },
      {
        name: 'Russian Twists',
        duration: 30,
        description: 'Rotational core exercise',
        instructions: ['Sit with knees bent', 'Lean back slightly', 'Twist side to side'],
      },
      {
        name: 'Leg Raises',
        duration: 30,
        description: 'Lower ab exercise',
        instructions: [
          'Lie on back',
          'Keep legs straight',
          'Lift legs to 90 degrees',
          'Lower slowly',
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Yoga Flow',
    description: 'Gentle stretching and balance poses',
    duration: 12,
    difficulty: 'beginner',
    category: 'flexibility',
    calories: 50,
    equipment: [],
    exercises: [
      {
        name: 'Sun Salutation',
        duration: 60,
        description: 'Classic yoga sequence',
        instructions: [
          'Start in mountain pose',
          'Forward fold',
          'Half lift',
          'Plank',
          'Lower down',
          'Upward dog',
          'Downward dog',
        ],
      },
      {
        name: 'Warrior Pose',
        duration: 30,
        description: 'Balance and strength pose',
        instructions: [
          'Step one foot back',
          'Bend front knee',
          'Raise arms overhead',
          'Hold position',
        ],
      },
      {
        name: 'Tree Pose',
        duration: 30,
        description: 'Balance pose',
        instructions: [
          'Stand on one leg',
          'Place other foot on thigh',
          'Raise arms',
          'Find balance',
        ],
      },
      {
        name: "Child's Pose",
        duration: 30,
        description: 'Restorative pose',
        instructions: [
          'Kneel on ground',
          'Sit back on heels',
          'Fold forward',
          'Rest forehead on ground',
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Strength Builder',
    description: 'Bodyweight strength training',
    duration: 15,
    difficulty: 'intermediate',
    category: 'strength',
    calories: 100,
    equipment: [],
    exercises: [
      {
        name: 'Push-ups',
        duration: 45,
        description: 'Upper body strength',
        instructions: [
          'Start in plank position',
          'Lower body to ground',
          'Push back up',
          'Keep body straight',
        ],
      },
      {
        name: 'Squats',
        duration: 45,
        description: 'Lower body strength',
        instructions: [
          'Stand with feet shoulder-width',
          'Lower hips back and down',
          'Keep chest up',
          'Return to standing',
        ],
      },
      {
        name: 'Lunges',
        duration: 45,
        description: 'Single leg strength',
        instructions: [
          'Step forward with one leg',
          'Lower back knee toward ground',
          'Push back to start',
          'Alternate legs',
        ],
      },
      {
        name: 'Dips',
        duration: 30,
        description: 'Tricep strength',
        instructions: [
          'Use chair or surface',
          'Lower body down',
          'Push back up',
          'Keep elbows close',
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Balance & Stability',
    description: 'Improve balance and coordination',
    duration: 10,
    difficulty: 'beginner',
    category: 'balance',
    calories: 40,
    equipment: [],
    exercises: [
      {
        name: 'Single Leg Stand',
        duration: 30,
        description: 'Basic balance exercise',
        instructions: [
          'Stand on one leg',
          'Keep other leg lifted',
          'Maintain balance',
          'Switch legs',
        ],
      },
      {
        name: 'Heel-to-Toe Walk',
        duration: 30,
        description: 'Walking balance exercise',
        instructions: [
          'Place heel of one foot',
          'Directly in front of other foot',
          'Walk in straight line',
          'Keep balance',
        ],
      },
      {
        name: 'Standing Knee Lifts',
        duration: 30,
        description: 'Dynamic balance exercise',
        instructions: [
          'Stand on one leg',
          'Lift opposite knee',
          'Hold for 2 seconds',
          'Lower and repeat',
        ],
      },
      {
        name: 'Side Leg Raises',
        duration: 30,
        description: 'Hip stability exercise',
        instructions: [
          'Stand on one leg',
          'Lift other leg to side',
          'Keep body straight',
          'Lower slowly',
        ],
      },
    ],
  },
];

export default function MiniWorkoutsCarousel() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [showWorkoutDialog, setShowWorkoutDialog] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [workoutProgress, setWorkoutProgress] = useState(0);
  // const { isDark } = useTheme();
  // const { animateIn } = useAnimation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Animation handled by CSS
  }, []);

  useEffect(() => {
    if (isWorkoutActive && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Move to next exercise or end workout
            if (currentExerciseIndex < selectedWorkout!.exercises.length - 1) {
              setCurrentExerciseIndex(prev => prev + 1);
              return selectedWorkout!.exercises[currentExerciseIndex + 1].duration;
            } else {
              // Workout complete
              setIsWorkoutActive(false);
              setCurrentExerciseIndex(0);
              setWorkoutProgress(100);
              return 0;
            }
          }
          return prev - 1;
        });

        // Update progress
        const totalTime = selectedWorkout!.exercises.reduce((sum, ex) => sum + ex.duration, 0);
        const elapsedTime =
          selectedWorkout!.exercises
            .slice(0, currentExerciseIndex)
            .reduce((sum, ex) => sum + ex.duration, 0) +
          (selectedWorkout!.exercises[currentExerciseIndex]?.duration || 0) -
          timeRemaining;
        setWorkoutProgress((elapsedTime / totalTime) * 100);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWorkoutActive, timeRemaining, currentExerciseIndex, selectedWorkout]);

  const startWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setShowWorkoutDialog(true);
  };

  const beginWorkout = () => {
    if (!selectedWorkout) return;
    setIsWorkoutActive(true);
    setCurrentExerciseIndex(0);
    setTimeRemaining(selectedWorkout.exercises[0].duration);
    setWorkoutProgress(0);
  };

  const pauseWorkout = () => {
    setIsWorkoutActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // const resumeWorkout = () => {
  //   setIsWorkoutActive(true);
  // };

  const endWorkout = () => {
    setIsWorkoutActive(false);
    setCurrentExerciseIndex(0);
    setTimeRemaining(0);
    setWorkoutProgress(0);
    setShowWorkoutDialog(false);
    setSelectedWorkout(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'warning';
      case 'advanced':
        return 'danger';
      default:
        return 'info';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cardio':
        return 'pi pi-heart';
      case 'strength':
        return 'pi pi-bolt';
      case 'flexibility':
        return 'pi pi-star';
      case 'balance':
        return 'pi pi-circle';
      default:
        return 'pi pi-dumbbell';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const workoutTemplate = (workout: Workout) => (
    <div className="workout-card glass-card hover:scale-105 transition-all duration-300 cursor-pointer">
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <i
            className={`${getCategoryIcon(workout.category)} text-3xl`}
            style={{ color: 'var(--warm-gold)' }}
          ></i>
        </div>
        <h3 className="font-semibold text-lg" style={{ color: 'var(--foreground)' }}>
          {workout.name}
        </h3>
        <p className="text-sm line-clamp-2" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
          {workout.description}
        </p>
        <div className="flex justify-center gap-2">
          <span className="px-2 py-1 bg-blue-100/40 text-blue-800/90 text-xs rounded">
            {workout.duration} min
          </span>
          <span className="px-2 py-1 bg-green-100/40 text-green-800/90 text-xs rounded">
            {workout.calories} cal
          </span>
        </div>
        <div className="flex justify-center">
          <span
            className={`px-2 py-1 text-xs rounded ${
              getDifficultyColor(workout.difficulty) === 'success'
                ? 'bg-green-100/40 text-green-800/90'
                : getDifficultyColor(workout.difficulty) === 'warning'
                ? 'bg-yellow-100/40 text-yellow-800/90'
                : 'bg-red-100/40 text-red-800/90'
            }`}
          >
            {workout.difficulty}
          </span>
        </div>
        <Button
          label="Start Workout"
          icon="pi pi-play"
          className="p-button-sm p-button-outlined"
          onClick={() => startWorkout(workout)}
        />
      </div>
    </div>
  );

  const title = (
    <div className="flex align-items-center gap-2">
      <i className="pi pi-dumbbell text-green-500 text-xl"></i>
      <span className="text-xl font-bold">Mini Workouts</span>
    </div>
  );
  const subtitle = (
    <span className="text-gray-600 dark:text-gray-300">
      Quick workouts you can do anywhere, anytime
    </span>
  );

  return (
    <div className="mini-workouts-carousel">
      <Card className="workouts-card shadow-lg border-0" header={title} subTitle={subtitle}>
        <div className="space-y-4 flex flex-col items-center justify-center">
          <Carousel
            value={WORKOUTS}
            numVisible={3}
            numScroll={1}
            className="custom-carousel"
            itemTemplate={workoutTemplate}
            circular
            autoplayInterval={5000}
          />
        </div>
      </Card>

      {/* Workout Dialog */}
      <Dialog
        header={selectedWorkout?.name}
        visible={showWorkoutDialog}
        style={{ width: '700px' }}
        onHide={endWorkout}
        modal
        className="workout-dialog"
      >
        {selectedWorkout && (
          <div className="space-y-6">
            {/* Workout Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {selectedWorkout.duration}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {selectedWorkout.calories}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {selectedWorkout.exercises.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Exercises</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {selectedWorkout.difficulty}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Level</div>
              </div>
            </div>

            {/* Active Workout */}
            {isWorkoutActive && (
              <div className="space-y-4">
                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium">{Math.round(workoutProgress)}%</span>
                  </div>
                  <ProgressBar value={workoutProgress} className="h-3" />
                </div>

                {/* Current Exercise */}
                <div className="text-center p-6 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {formatTime(timeRemaining)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {selectedWorkout.exercises[currentExerciseIndex]?.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedWorkout.exercises[currentExerciseIndex]?.description}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Exercise {currentExerciseIndex + 1} of {selectedWorkout.exercises.length}
                  </div>
                </div>

                {/* Workout Controls */}
                <div className="flex justify-center gap-2">
                  <Button
                    label="Pause"
                    icon="pi pi-pause"
                    className="p-button-outlined"
                    onClick={pauseWorkout}
                  />
                  <Button
                    label="End Workout"
                    icon="pi pi-stop"
                    className="p-button-outlined p-button-danger"
                    onClick={endWorkout}
                  />
                </div>
              </div>
            )}

            {/* Workout Preview */}
            {!isWorkoutActive && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Workout Plan
                  </h3>
                  <div className="space-y-2">
                    {selectedWorkout.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {exercise.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {exercise.description}
                          </div>
                        </div>
                        <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {exercise.duration}s
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    label="Begin Workout"
                    icon="pi pi-play"
                    className="p-button-primary"
                    onClick={beginWorkout}
                  />
                </div>
              </div>
            )}
          </div>
        )}
        footer=
        {!isWorkoutActive ? (
          <div className="flex justify-end">
            <Button
              label="Close"
              icon="pi pi-times"
              className="p-button-text"
              onClick={endWorkout}
            />
          </div>
        ) : undefined}
      </Dialog>
    </div>
  );
}

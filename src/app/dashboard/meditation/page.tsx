'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Chart } from 'primereact/chart';
import { Toast } from 'primereact/toast';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { useAnime, animePresets } from '@/hooks/use-anime';

interface MeditationSession {
  id: string;
  type: string;
  duration: number;
  date: Date;
  mood: number;
  notes?: string;
}

interface GuidedSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: string;
  audioUrl?: string;
}

const sessionTypes = [
  { label: 'Mindfulness', value: 'mindfulness' },
  { label: 'Breathing', value: 'breathing' },
  { label: 'Body Scan', value: 'body-scan' },
  { label: 'Loving Kindness', value: 'loving-kindness' },
  { label: 'Transcendental', value: 'transcendental' },
  { label: 'Zen', value: 'zen' },
];

const guidedSessions: GuidedSession[] = [
  {
    id: '1',
    title: 'Morning Mindfulness',
    description: 'Start your day with clarity and intention',
    duration: 10,
    category: 'mindfulness',
  },
  {
    id: '2',
    title: 'Breathing for Calm',
    description: 'Simple breathing techniques for stress relief',
    duration: 5,
    category: 'breathing',
  },
  {
    id: '3',
    title: 'Body Scan Relaxation',
    description: 'Progressive relaxation through body awareness',
    duration: 15,
    category: 'body-scan',
  },
  {
    id: '4',
    title: 'Loving Kindness Meditation',
    description: 'Cultivate compassion for yourself and others',
    duration: 20,
    category: 'loving-kindness',
  },
  {
    id: '5',
    title: 'Evening Wind Down',
    description: 'Gentle meditation to prepare for rest',
    duration: 8,
    category: 'mindfulness',
  },
  {
    id: '6',
    title: 'Quick Stress Relief',
    description: 'Fast 3-minute meditation for immediate calm',
    duration: 3,
    category: 'breathing',
  },
];

export default function MeditationPage() {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [selectedType, setSelectedType] = useState('mindfulness');
  const [showSessionDialog, setShowSessionDialog] = useState(false);
  const [currentSession, setCurrentSession] = useState<Partial<MeditationSession>>({});
  const [showGuidedDialog, setShowGuidedDialog] = useState(false);
  const [selectedGuidedSession, setSelectedGuidedSession] = useState<GuidedSession | null>(null);
  const [isGuidedSessionActive, setIsGuidedSessionActive] = useState(false);
  const [guidedSessionTime, setGuidedSessionTime] = useState(0);
  const toast = useRef<Toast>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const guidedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { add } = useAnime({ targets: '', autoplay: false });

  useEffect(() => {
    // Load sessions from localStorage
    const savedSessions = localStorage.getItem('meditationSessions');
    if (savedSessions) {
      setSessions(
        JSON.parse(savedSessions).map((s: Record<string, unknown>) => ({
          ...s,
          date: new Date(s.date as string),
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

  const saveSessions = (updatedSessions: MeditationSession[]) => {
    setSessions(updatedSessions);
    localStorage.setItem('meditationSessions', JSON.stringify(updatedSessions));
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    setCurrentTime(0);

    timerRef.current = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= selectedDuration * 60) {
          stopTimer();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (currentTime > 0) {
      setShowSessionDialog(true);
      setCurrentSession({
        type: selectedType,
        duration: Math.round(currentTime / 60),
        mood: 3,
      });
    }
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setCurrentTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startGuidedSession = (session: GuidedSession) => {
    setSelectedGuidedSession(session);
    setIsGuidedSessionActive(true);
    setGuidedSessionTime(0);
    setShowGuidedDialog(false);

    guidedTimerRef.current = setInterval(() => {
      setGuidedSessionTime(prev => {
        if (prev >= session.duration * 60) {
          stopGuidedSession();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopGuidedSession = () => {
    setIsGuidedSessionActive(false);
    if (guidedTimerRef.current) {
      clearInterval(guidedTimerRef.current);
      guidedTimerRef.current = null;
    }

    if (selectedGuidedSession && guidedSessionTime > 0) {
      const newSession: MeditationSession = {
        id: Date.now().toString(),
        type: selectedGuidedSession.category,
        duration: Math.round(guidedSessionTime / 60),
        date: new Date(),
        mood: 3,
        notes: `Guided session: ${selectedGuidedSession.title}`,
      };

      const updatedSessions = [newSession, ...sessions];
      saveSessions(updatedSessions);

      toast.current?.show({
        severity: 'success',
        summary: 'Session Complete',
        detail: `You completed ${selectedGuidedSession.title}`,
        life: 3000,
      });
    }
  };

  const saveSession = () => {
    if (!currentSession.type || !currentSession.duration) return;

    const newSession: MeditationSession = {
      id: Date.now().toString(),
      type: currentSession.type!,
      duration: currentSession.duration!,
      date: new Date(),
      mood: currentSession.mood || 3,
      notes: currentSession.notes,
    };

    const updatedSessions = [newSession, ...sessions];
    saveSessions(updatedSessions);

    setShowSessionDialog(false);
    setCurrentSession({});
    resetTimer();

    toast.current?.show({
      severity: 'success',
      summary: 'Session Saved',
      detail: 'Your meditation session has been recorded.',
      life: 3000,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate statistics
  const stats = {
    totalSessions: sessions.length,
    totalMinutes: sessions.reduce((sum, session) => sum + session.duration, 0),
    averageMood:
      sessions.length > 0
        ? sessions.reduce((sum, session) => sum + session.mood, 0) / sessions.length
        : 0,
    thisWeek: sessions.filter(s => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return s.date >= weekAgo;
    }).length,
  };

  // Chart data
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Minutes',
        data: [0, 0, 0, 0, 0, 0, 0], // This would be calculated from actual data
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
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
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <Toast ref={toast} />

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Meditation
        </h1>
        <p className="text-lg" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
          Find peace and mindfulness in your daily practice
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.totalSessions}
          </div>
          <div style={{ color: 'var(--foreground)' }}>Total Sessions</div>
        </Card>

        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.totalMinutes}
          </div>
          <div style={{ color: 'var(--foreground)' }}>Total Minutes</div>
        </Card>

        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.thisWeek}
          </div>
          <div style={{ color: 'var(--foreground)' }}>This Week</div>
        </Card>

        <Card className="glass-card text-center">
          <div className="text-2xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
            {stats.averageMood.toFixed(1)}
          </div>
          <div style={{ color: 'var(--foreground)' }}>Avg. Mood</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timer */}
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
            <i className="pi pi-clock mr-2"></i>
            Meditation Timer
          </h2>

          <div className="text-center mb-6">
            <div className="text-6xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              {formatTime(currentTime)}
            </div>

            <div className="mb-4">
              <ProgressBar
                value={(currentTime / (selectedDuration * 60)) * 100}
                className="h-2rem"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="field">
                <label className="block mb-2 font-medium">Duration (minutes)</label>
                <InputNumber
                  value={selectedDuration}
                  onValueChange={e => setSelectedDuration(e.value || 10)}
                  min={1}
                  max={120}
                  className="w-full"
                  disabled={isTimerRunning}
                />
              </div>

              <div className="field">
                <label className="block mb-2 font-medium">Type</label>
                <Dropdown
                  value={selectedType}
                  options={sessionTypes}
                  onChange={e => setSelectedType(e.value)}
                  placeholder="Select type"
                  className="w-full"
                  disabled={isTimerRunning}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-content-center">
              {!isTimerRunning ? (
                <Button
                  label="Start"
                  icon="pi pi-play"
                  onClick={startTimer}
                  className="flex-1"
                  severity="success"
                />
              ) : (
                <>
                  <Button
                    label="Pause"
                    icon="pi pi-pause"
                    onClick={pauseTimer}
                    className="flex-1"
                    severity="warning"
                  />
                  <Button
                    label="Stop"
                    icon="pi pi-stop"
                    onClick={stopTimer}
                    className="flex-1"
                    severity="danger"
                  />
                </>
              )}

              <Button
                label="Reset"
                icon="pi pi-refresh"
                onClick={resetTimer}
                className="flex-1"
                severity="secondary"
              />
            </div>
          </div>
        </Card>

        {/* Guided Sessions */}
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
            <i className="pi pi-headphones mr-2"></i>
            Guided Sessions
          </h2>

          <div className="grid gap-3">
            {guidedSessions.map(session => (
              <div
                key={session.id}
                className="p-3 border-round-lg glass-card cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(255, 255, 255, 0.05)',
                }}
                onClick={() => {
                  setSelectedGuidedSession(session);
                  setShowGuidedDialog(true);
                }}
              >
                <div className="flex align-items-center justify-content-between">
                  <div className="flex-1">
                    <h4 className="m-0 font-semibold" style={{ color: 'var(--foreground)' }}>
                      {session.title}
                    </h4>
                    <p
                      className="text-sm m-0 mt-1"
                      style={{ color: 'var(--foreground)', opacity: 0.7 }}
                    >
                      {session.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: 'var(--warm-gold)' }}>
                      {session.duration}m
                    </div>
                    <Tag value={session.category} severity="info" className="mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Sessions */}
      <Card
        className="glass-card mt-6"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
      >
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
          <i className="pi pi-chart-line mr-2"></i>
          Recent Sessions
        </h2>

        <div className="h-20rem">
          <Chart type="bar" data={weeklyData} options={chartOptions} />
        </div>
      </Card>

      {/* Session Dialog */}
      <Dialog
        header="Save Session"
        visible={showSessionDialog}
        onHide={() => setShowSessionDialog(false)}
        style={{ width: '500px' }}
        className="glass-card"
      >
        <div className="grid gap-4">
          <div className="field">
            <label className="block mb-2 font-medium">Session Type</label>
            <Dropdown
              value={currentSession.type}
              options={sessionTypes}
              onChange={e => setCurrentSession({ ...currentSession, type: e.value })}
              placeholder="Select type"
              className="w-full"
            />
          </div>

          <div className="field">
            <label className="block mb-2 font-medium">Duration (minutes)</label>
            <InputNumber
              value={currentSession.duration}
              onValueChange={e => setCurrentSession({ ...currentSession, duration: e.value || 0 })}
              min={1}
              max={120}
              className="w-full"
            />
          </div>

          <div className="field">
            <label className="block mb-2 font-medium">How do you feel? (1-5)</label>
            <InputNumber
              value={currentSession.mood}
              onValueChange={e => setCurrentSession({ ...currentSession, mood: e.value || 3 })}
              min={1}
              max={5}
              className="w-full"
            />
          </div>

          <div className="field">
            <label className="block mb-2 font-medium">Notes</label>
            <InputText
              value={currentSession.notes || ''}
              onChange={e => setCurrentSession({ ...currentSession, notes: e.target.value })}
              placeholder="Optional notes about your session"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-content-end mt-4">
          <Button label="Cancel" onClick={() => setShowSessionDialog(false)} severity="secondary" />
          <Button label="Save Session" onClick={saveSession} severity="success" />
        </div>
      </Dialog>

      {/* Guided Session Dialog */}
      <Dialog
        header={selectedGuidedSession?.title}
        visible={showGuidedDialog}
        onHide={() => setShowGuidedDialog(false)}
        style={{ width: '500px' }}
        className="glass-card"
      >
        {selectedGuidedSession && (
          <div>
            <p className="mb-4" style={{ color: 'var(--foreground)' }}>
              {selectedGuidedSession.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 border-round-lg glass-card">
                <div className="text-2xl font-bold" style={{ color: 'var(--warm-gold)' }}>
                  {selectedGuidedSession.duration}m
                </div>
                <div style={{ color: 'var(--foreground)' }}>Duration</div>
              </div>

              <div className="text-center p-3 border-round-lg glass-card">
                <div className="text-2xl font-bold" style={{ color: 'var(--warm-gold)' }}>
                  {selectedGuidedSession.category}
                </div>
                <div style={{ color: 'var(--foreground)' }}>Type</div>
              </div>
            </div>

            <div className="flex gap-2 justify-content-end">
              <Button
                label="Cancel"
                onClick={() => setShowGuidedDialog(false)}
                severity="secondary"
              />
              <Button
                label="Start Session"
                icon="pi pi-play"
                onClick={() => startGuidedSession(selectedGuidedSession)}
                severity="success"
              />
            </div>
          </div>
        )}
      </Dialog>

      {/* Active Guided Session */}
      {isGuidedSessionActive && selectedGuidedSession && (
        <Dialog
          header={`${selectedGuidedSession.title} - In Progress`}
          visible={isGuidedSessionActive}
          onHide={stopGuidedSession}
          style={{ width: '400px' }}
          className="glass-card"
          closable={false}
        >
          <div className="text-center">
            <div className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              {formatTime(guidedSessionTime)}
            </div>

            <div className="mb-4">
              <ProgressBar
                value={(guidedSessionTime / (selectedGuidedSession.duration * 60)) * 100}
                className="h-2rem"
              />
            </div>

            <p className="mb-4" style={{ color: 'var(--foreground)' }}>
              {selectedGuidedSession.description}
            </p>

            <Button
              label="End Session"
              icon="pi pi-stop"
              onClick={stopGuidedSession}
              severity="danger"
            />
          </div>
        </Dialog>
      )}
    </div>
  );
}

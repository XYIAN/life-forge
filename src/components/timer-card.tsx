'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { useData } from '@/lib/providers/data-provider';

interface TimerCardProps {
  className?: string;
}

export const TimerCard: React.FC<TimerCardProps> = ({ className }) => {
  const { startFocusSession, endFocusSession, getFocusSessionsForDate } = useData();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [completedSessions, setCompletedSessions] = useState(0);
  const toast = useRef<Toast>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const today = new Date();
  const todaySessions = getFocusSessionsForDate(today);
  const completedWorkSessions = todaySessions.filter(s => s.type === 'work' && s.completed).length;

  const handleSessionComplete = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);

    if (currentSessionId) {
      endFocusSession(currentSessionId);
      setCurrentSessionId(null);
    }

    if (sessionType === 'work') {
      setCompletedSessions(prev => prev + 1);
      if (toast.current) {
        toast.current.show({
          severity: 'success',
          summary: '🎉 Work Session Complete!',
          detail: 'Great focus! Time for a break.',
          life: 5000,
        });
      }
      // Switch to break
      setSessionType('break');
      setTimeLeft(breakDuration * 60);
    } else {
      if (toast.current) {
        toast.current.show({
          severity: 'info',
          summary: '☕ Break Complete!',
          detail: 'Ready for another work session?',
          life: 3000,
        });
      }
      // Switch to work
      setSessionType('work');
      setTimeLeft(workDuration * 60);
    }
  }, [sessionType, currentSessionId, endFocusSession, breakDuration, workDuration]);

  // Timer logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSessionComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, handleSessionComplete]);

  const handleStart = () => {
    if (!isRunning) {
      const sessionId = startFocusSession(
        sessionType,
        sessionType === 'work' ? workDuration : breakDuration
      );
      setCurrentSessionId(sessionId);
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (currentSessionId) {
      endFocusSession(currentSessionId);
      setCurrentSessionId(null);
    }
    // Reset to work session
    setSessionType('work');
    setTimeLeft(workDuration * 60);
  };

  const handleReset = () => {
    handleStop();
    setCompletedSessions(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = sessionType === 'work' ? workDuration * 60 : breakDuration * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getSessionColor = () => {
    return sessionType === 'work' ? '#ef4444' : '#10b981'; // red for work, green for break
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-4">
        <i className="pi pi-clock text-2xl text-blue-500"></i>
        <h3 className="text-lg font-semibold m-0">Focus Timer</h3>
      </div>
      <div className="flex align-items-center gap-2">
        <Button
          icon="pi pi-cog"
          onClick={() => setShowSettings(true)}
          className="p-1"
          text
          severity="secondary"
        />
        <span className="text-sm font-medium">{completedWorkSessions} sessions</span>
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Card header={header} className={`timer-card glass-card ${className || ''}`}>
        <div className="flex flex-column gap-4 align-items-center">
          {/* Session Type Indicator */}
          <div className="flex align-items-center gap-2">
            <i
              className={`pi ${sessionType === 'work' ? 'pi-briefcase' : 'pi-coffee'} text-lg`}
            ></i>
            <span className="text-sm font-medium capitalize" style={{ color: getSessionColor() }}>
              {sessionType} Session
            </span>
          </div>

          {/* Timer Display */}
          <div className="flex flex-column align-items-center gap-2">
            <div className="text-6xl font-bold font-mono" style={{ color: getSessionColor() }}>
              {formatTime(timeLeft)}
            </div>
            <ProgressBar
              value={getProgress()}
              style={{ width: '200px', height: '8px' }}
              color={getSessionColor()}
              showValue={false}
            />
          </div>

          {/* Timer Controls */}
          <div className="flex gap-2 w-full">
            {!isRunning ? (
              <Button
                label="Start"
                icon="pi pi-play"
                onClick={handleStart}
                className="flex-1"
                severity="success"
              />
            ) : (
              <>
                {isPaused ? (
                  <Button
                    label="Resume"
                    icon="pi pi-play"
                    onClick={handleResume}
                    className="flex-1"
                    severity="success"
                  />
                ) : (
                  <Button
                    label="Pause"
                    icon="pi pi-pause"
                    onClick={handlePause}
                    className="flex-1"
                    severity="warning"
                  />
                )}
                <Button
                  label="Stop"
                  icon="pi pi-stop"
                  onClick={handleStop}
                  className="flex-1"
                  severity="danger"
                />
              </>
            )}
          </div>

          {/* Session Stats */}
          <div className="flex justify-content-between w-full text-sm">
            <div className="flex flex-column align-items-center">
              <span className="text-gray-500">Today</span>
              <span className="font-bold">{completedWorkSessions}</span>
            </div>
            <div className="flex flex-column align-items-center">
              <span className="text-gray-500">Current</span>
              <span className="font-bold">{completedSessions}</span>
            </div>
            <div className="flex flex-column align-items-center">
              <span className="text-gray-500">Next</span>
              <span className="font-bold capitalize">
                {sessionType === 'work' ? 'Break' : 'Work'}
              </span>
            </div>
          </div>

          {/* Quick Reset */}
          {completedSessions > 0 && (
            <Button
              label="Reset Session"
              icon="pi pi-refresh"
              onClick={handleReset}
              className="w-full"
              severity="secondary"
              outlined
              size="small"
            />
          )}
        </div>
      </Card>

      {/* Settings Dialog */}
      <Dialog
        header="Timer Settings"
        visible={showSettings}
        onHide={() => setShowSettings(false)}
        style={{ width: '90vw', maxWidth: '400px' }}
        modal
        className="timer-settings-dialog"
      >
        <div className="flex flex-column gap-4">
          <div className="flex flex-column gap-2">
            <label className="text-sm font-medium">Work Duration (minutes)</label>
            <InputNumber
              value={workDuration}
              onValueChange={e => setWorkDuration(e.value || 25)}
              min={1}
              max={60}
              className="w-full"
            />
          </div>
          <div className="flex flex-column gap-2">
            <label className="text-sm font-medium">Break Duration (minutes)</label>
            <InputNumber
              value={breakDuration}
              onValueChange={e => setBreakDuration(e.value || 5)}
              min={1}
              max={30}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowSettings(false)}
              className="flex-1"
              severity="secondary"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={() => {
                setShowSettings(false);
                // Reset timer if not running
                if (!isRunning) {
                  setTimeLeft(workDuration * 60);
                }
              }}
              className="flex-1"
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

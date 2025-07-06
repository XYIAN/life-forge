'use client';

import { useData } from '@/lib/providers/data-provider';
import { useMemo } from 'react';

/**
 * Custom hook for focus session analytics
 * Provides insights into productivity patterns and focus session management
 */
export const useFocusAnalytics = () => {
  const { startFocusSession, endFocusSession, getFocusSessionsForDate, data } = useData();

  // Get today's focus data
  const today = useMemo(() => new Date(), []);
  const todaySessions = useMemo(() => getFocusSessionsForDate(today), [today, data.focusSessions]);

  // Filter sessions by type and completion status
  const todayCompletedSessions = todaySessions.filter(s => s.completed);
  const todayWorkSessions = todaySessions.filter(s => s.type === 'work');
  const todayCompletedWorkSessions = todayWorkSessions.filter(s => s.completed);

  // Calculate today's focus time
  const todayFocusTime = todayCompletedWorkSessions.reduce((total, session) => {
    return total + session.duration;
  }, 0);

  // Get focus sessions for the last n days
  const getFocusHistoryForDays = (days: number) => {
    const history = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const sessions = getFocusSessionsForDate(date);
      const completedSessions = sessions.filter(s => s.completed);
      const workSessions = sessions.filter(s => s.type === 'work' && s.completed);
      const totalFocusTime = workSessions.reduce((total, session) => total + session.duration, 0);

      history.push({
        date: date.toISOString().split('T')[0],
        sessions,
        completedSessions,
        workSessions,
        totalFocusTime,
        sessionCount: completedSessions.length,
        workSessionCount: workSessions.length,
      });
    }
    return history.reverse();
  };

  // Get weekly focus data
  const getWeeklyFocusData = () => {
    return getFocusHistoryForDays(7);
  };

  // Get monthly focus data
  const getMonthlyFocusData = () => {
    return getFocusHistoryForDays(30);
  };

  // Calculate average daily focus time
  const getAverageDailyFocusTime = (days: number = 7) => {
    const history = getFocusHistoryForDays(days);
    const totalFocusTime = history.reduce((sum, day) => sum + day.totalFocusTime, 0);
    return Math.round(totalFocusTime / days);
  };

  // Get focus streak (consecutive days with at least one work session)
  const getFocusStreak = () => {
    let streak = 0;
    const date = new Date();

    while (true) {
      const daySessions = getFocusSessionsForDate(date);
      const hasWorkSession = daySessions.some(s => s.type === 'work' && s.completed);

      if (hasWorkSession) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  // Get best focus day this week
  const getBestFocusDayThisWeek = () => {
    const weeklyData = getWeeklyFocusData();
    return weeklyData.reduce((best, day) =>
      day.totalFocusTime > best.totalFocusTime ? day : best
    );
  };

  // Get focus time distribution by hour
  const getFocusTimeDistribution = (days: number = 30) => {
    const history = getFocusHistoryForDays(days);
    const allSessions = history.flatMap(day => day.workSessions);

    const hourlyDistribution = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      sessionCount: 0,
      totalMinutes: 0,
    }));

    allSessions.forEach(session => {
      const hour = new Date(session.startTime).getHours();
      hourlyDistribution[hour].sessionCount++;
      hourlyDistribution[hour].totalMinutes += session.duration;
    });

    return hourlyDistribution;
  };

  // Get most productive hour
  const getMostProductiveHour = (days: number = 30) => {
    const distribution = getFocusTimeDistribution(days);
    return distribution.reduce((most, current) =>
      current.totalMinutes > most.totalMinutes ? current : most
    );
  };

  // Get focus insights
  const getFocusInsights = () => {
    const weeklyAvg = getAverageDailyFocusTime(7);
    const streak = getFocusStreak();
    const mostProductiveHour = getMostProductiveHour();

    const insights = [];

    if (weeklyAvg >= 120) {
      // 2+ hours daily
      insights.push({
        type: 'positive',
        message: "Excellent focus! You're averaging 2+ hours daily.",
      });
    } else if (weeklyAvg >= 60) {
      // 1+ hour daily
      insights.push({ type: 'positive', message: 'Good focus habits! Keep up the consistency.' });
    } else if (weeklyAvg < 30) {
      // Less than 30 min daily
      insights.push({ type: 'concern', message: 'Try to increase your daily focus time.' });
    }

    if (streak >= 7) {
      insights.push({ type: 'positive', message: `Amazing ${streak}-day focus streak!` });
    } else if (streak >= 3) {
      insights.push({ type: 'positive', message: `Good ${streak}-day focus streak!` });
    }

    if (todayFocusTime >= 120) {
      insights.push({ type: 'positive', message: "Great focus day! You've completed 2+ hours." });
    }

    if (mostProductiveHour.totalMinutes > 0) {
      const hour = mostProductiveHour.hour;
      const timeStr = hour === 0 ? '12 AM' : hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
      insights.push({ type: 'info', message: `Your most productive time is around ${timeStr}` });
    }

    return insights;
  };

  // Get focus level based on today's performance
  const getFocusLevel = () => {
    const targetMinutes = 120; // 2 hours target
    const percentage = (todayFocusTime / targetMinutes) * 100;

    if (percentage >= 100)
      return { level: 'excellent', color: '#10b981', message: 'Excellent focus today!' };
    if (percentage >= 75) return { level: 'good', color: '#3b82f6', message: 'Good focus session' };
    if (percentage >= 50)
      return { level: 'fair', color: '#f59e0b', message: 'Fair focus, keep going' };
    if (percentage >= 25)
      return { level: 'low', color: '#ef4444', message: 'Low focus, try a session' };
    return { level: 'none', color: '#dc2626', message: 'No focus time yet today' };
  };

  // Get current active session
  const getCurrentActiveSession = () => {
    const allSessions = data.focusSessions;
    return allSessions.find(session => !session.completed && !session.endTime);
  };

  // Format focus time for display
  const formatFocusTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Get remaining time to goal
  const getRemainingTimeToGoal = (goalMinutes: number = 120) => {
    return Math.max(0, goalMinutes - todayFocusTime);
  };

  // Quick session start functions
  const startShortSession = () => startFocusSession('work', 15); // 15 min
  const startStandardSession = () => startFocusSession('work', 25); // 25 min (standard Pomodoro)
  const startLongSession = () => startFocusSession('work', 45); // 45 min
  const startBreakSession = () => startFocusSession('break', 5); // 5 min break

  return {
    // Current state
    todaySessions,
    todayCompletedSessions,
    todayWorkSessions,
    todayFocusTime,

    // History functions
    getFocusHistoryForDays,
    getWeeklyFocusData,
    getMonthlyFocusData,
    getAverageDailyFocusTime,

    // Analytics
    getFocusStreak,
    getBestFocusDayThisWeek,
    getFocusTimeDistribution,
    getMostProductiveHour,
    getFocusInsights,
    getFocusLevel,
    getCurrentActiveSession,

    // Utilities
    formatFocusTime,
    getRemainingTimeToGoal,

    // Actions
    startFocusSession,
    endFocusSession,
    startShortSession,
    startStandardSession,
    startLongSession,
    startBreakSession,
  };
};

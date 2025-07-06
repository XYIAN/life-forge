'use client';

import { useData } from '@/lib/providers/data-provider';
import { useMemo } from 'react';

/**
 * Custom hook for water tracking and history management
 * Provides convenient functions for water intake analytics
 */
export const useWaterHistory = () => {
  const {
    addWaterEntry,
    getWaterEntriesForDate,
    getTotalWaterForDate,
    getCurrentWaterSession,
    data,
  } = useData();

  // Get today's water data
  const today = useMemo(() => new Date(), []);
  const todayEntries = useMemo(() => getWaterEntriesForDate(today), [today, data.waterEntries]);
  const todayTotal = useMemo(() => getTotalWaterForDate(today), [today, data.waterEntries]);

  // Get current session data
  const currentSession = useMemo(() => getCurrentWaterSession(), [data.waterEntries]);
  const currentSessionTotal = useMemo(
    () => currentSession.reduce((total, entry) => total + entry.amount, 0),
    [currentSession]
  );

  // Daily goal (2000ml default)
  const dailyGoal = 2000;
  const goalProgress = Math.min((todayTotal / dailyGoal) * 100, 100);
  const goalReached = todayTotal >= dailyGoal;

  // Get water intake for the last n days
  const getWaterHistoryForDays = (days: number) => {
    const history = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const entries = getWaterEntriesForDate(date);
      const total = entries.reduce((sum, entry) => sum + entry.amount, 0);
      history.push({
        date: date.toISOString().split('T')[0],
        entries,
        total,
        goalReached: total >= dailyGoal,
      });
    }
    return history.reverse();
  };

  // Get weekly water intake
  const getWeeklyWaterIntake = () => {
    return getWaterHistoryForDays(7);
  };

  // Get monthly water intake
  const getMonthlyWaterIntake = () => {
    return getWaterHistoryForDays(30);
  };

  // Calculate average daily intake
  const getAverageDailyIntake = (days: number = 7) => {
    const history = getWaterHistoryForDays(days);
    const totalIntake = history.reduce((sum, day) => sum + day.total, 0);
    return Math.round(totalIntake / days);
  };

  // Get streak of consecutive days meeting goal
  const getWaterStreak = () => {
    let streak = 0;
    const date = new Date();

    while (true) {
      const dayTotal = getTotalWaterForDate(date);
      if (dayTotal >= dailyGoal) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  };

  // Get best day this week
  const getBestDayThisWeek = () => {
    const weeklyData = getWeeklyWaterIntake();
    return weeklyData.reduce((best, day) => (day.total > best.total ? day : best));
  };

  // Get hydration level based on current intake
  const getHydrationLevel = () => {
    const percentage = (todayTotal / dailyGoal) * 100;

    if (percentage >= 100)
      return { level: 'excellent', color: '#10b981', message: 'Excellent hydration!' };
    if (percentage >= 75)
      return { level: 'good', color: '#3b82f6', message: 'Good hydration level' };
    if (percentage >= 50)
      return { level: 'fair', color: '#f59e0b', message: 'Fair hydration, drink more' };
    if (percentage >= 25)
      return { level: 'low', color: '#ef4444', message: 'Low hydration, drink water!' };
    return { level: 'critical', color: '#dc2626', message: 'Critical! Drink water now!' };
  };

  // Quick add functions
  const addSmallCup = () => addWaterEntry(250); // 250ml
  const addMediumCup = () => addWaterEntry(500); // 500ml
  const addLargeCup = () => addWaterEntry(750); // 750ml
  const addBottle = () => addWaterEntry(1000); // 1L bottle

  // Get remaining water needed for goal
  const getRemainingForGoal = () => {
    return Math.max(0, dailyGoal - todayTotal);
  };

  // Get suggested next drink size
  const getSuggestedDrinkSize = () => {
    const remaining = getRemainingForGoal();
    if (remaining <= 0) return 0;
    if (remaining <= 250) return 250;
    if (remaining <= 500) return 500;
    if (remaining <= 750) return 750;
    return 1000;
  };

  return {
    // Current state
    todayEntries,
    todayTotal,
    currentSession,
    currentSessionTotal,
    goalProgress,
    goalReached,
    dailyGoal,

    // History functions
    getWaterHistoryForDays,
    getWeeklyWaterIntake,
    getMonthlyWaterIntake,
    getAverageDailyIntake,
    getWaterStreak,
    getBestDayThisWeek,

    // Analytics
    getHydrationLevel,
    getRemainingForGoal,
    getSuggestedDrinkSize,

    // Actions
    addWaterEntry,
    addSmallCup,
    addMediumCup,
    addLargeCup,
    addBottle,
  };
};

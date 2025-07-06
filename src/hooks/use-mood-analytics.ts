'use client';

import { useData } from '@/lib/providers/data-provider';
import { useMemo } from 'react';

/**
 * Custom hook for mood tracking analytics
 * Provides insights into mood patterns and trends
 */
export const useMoodAnalytics = () => {
  const { addMoodEntry, getMoodEntriesForDate, getLatestMoodEntry, data } = useData();

  // Get today's mood data
  const today = useMemo(() => new Date(), []);
  const todayMoods = useMemo(() => getMoodEntriesForDate(today), [today, data.moodEntries]);
  const latestMood = useMemo(() => getLatestMoodEntry(), [data.moodEntries]);

  // Get mood data for the last n days
  const getMoodHistoryForDays = (days: number) => {
    const history = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const entries = getMoodEntriesForDate(date);
      const averageMood =
        entries.length > 0
          ? entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length
          : 0;
      history.push({
        date: date.toISOString().split('T')[0],
        entries,
        averageMood: Math.round(averageMood * 10) / 10,
        entryCount: entries.length,
      });
    }
    return history.reverse();
  };

  // Get weekly mood data
  const getWeeklyMoodData = () => {
    return getMoodHistoryForDays(7);
  };

  // Get monthly mood data
  const getMonthlyMoodData = () => {
    return getMoodHistoryForDays(30);
  };

  // Calculate average mood for a period
  const getAverageMood = (days: number = 7) => {
    const history = getMoodHistoryForDays(days);
    const validDays = history.filter(day => day.entryCount > 0);

    if (validDays.length === 0) return 0;

    const totalMood = validDays.reduce((sum, day) => sum + day.averageMood, 0);
    return Math.round((totalMood / validDays.length) * 10) / 10;
  };

  // Get mood trend (improving, stable, declining)
  const getMoodTrend = () => {
    const weeklyData = getWeeklyMoodData();
    const validDays = weeklyData.filter(day => day.entryCount > 0);

    if (validDays.length < 2) return { trend: 'stable', message: 'Not enough data' };

    const recentAvg = validDays.slice(-3).reduce((sum, day) => sum + day.averageMood, 0) / 3;
    const earlierAvg =
      validDays.slice(0, -3).reduce((sum, day) => sum + day.averageMood, 0) /
      (validDays.length - 3);

    const difference = recentAvg - earlierAvg;

    if (difference > 0.5) return { trend: 'improving', message: 'Your mood is improving!' };
    if (difference < -0.5) return { trend: 'declining', message: 'Your mood needs attention' };
    return { trend: 'stable', message: 'Your mood is stable' };
  };

  // Get mood frequency distribution
  const getMoodDistribution = (days: number = 30) => {
    const history = getMoodHistoryForDays(days);
    const allEntries = history.flatMap(day => day.entries);

    const distribution = Array.from({ length: 10 }, (_, i) => ({
      mood: i + 1,
      count: 0,
      percentage: 0,
    }));

    allEntries.forEach(entry => {
      distribution[entry.mood - 1].count++;
    });

    const total = allEntries.length;
    distribution.forEach(item => {
      item.percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;
    });

    return distribution;
  };

  // Get most common mood
  const getMostCommonMood = (days: number = 30) => {
    const distribution = getMoodDistribution(days);
    return distribution.reduce((most, current) => (current.count > most.count ? current : most));
  };

  // Get mood insights
  const getMoodInsights = () => {
    const weeklyAvg = getAverageMood(7);
    const trend = getMoodTrend();
    const mostCommon = getMostCommonMood();

    const insights = [];

    if (weeklyAvg >= 8) {
      insights.push({ type: 'positive', message: "You've been feeling great this week!" });
    } else if (weeklyAvg <= 4) {
      insights.push({
        type: 'concern',
        message: 'Your mood has been low this week. Consider self-care.',
      });
    }

    if (trend.trend === 'improving') {
      insights.push({ type: 'positive', message: 'Your mood is trending upward!' });
    } else if (trend.trend === 'declining') {
      insights.push({
        type: 'concern',
        message: 'Your mood is trending downward. Take care of yourself.',
      });
    }

    if (mostCommon.mood >= 8) {
      insights.push({
        type: 'positive',
        message: `You feel good most of the time (mood ${mostCommon.mood})`,
      });
    }

    return insights;
  };

  // Get mood level description
  const getMoodLevelDescription = (mood: number) => {
    if (mood >= 9) return { level: 'Excellent', color: '#10b981', emoji: '😄' };
    if (mood >= 7) return { level: 'Good', color: '#3b82f6', emoji: '😊' };
    if (mood >= 5) return { level: 'Okay', color: '#f59e0b', emoji: '😐' };
    if (mood >= 3) return { level: 'Low', color: '#ef4444', emoji: '😔' };
    return { level: 'Very Low', color: '#dc2626', emoji: '😢' };
  };

  // Get current mood status
  const getCurrentMoodStatus = () => {
    if (!latestMood) return { status: 'unknown', message: 'No mood recorded yet today' };

    const description = getMoodLevelDescription(latestMood.mood);
    const timeSince = Date.now() - latestMood.timestamp;
    const hoursSince = Math.floor(timeSince / (1000 * 60 * 60));

    return {
      status: description.level.toLowerCase(),
      mood: latestMood.mood,
      emoji: description.emoji,
      color: description.color,
      message: `${description.level} mood ${hoursSince > 0 ? `${hoursSince}h ago` : 'just now'}`,
      entry: latestMood,
    };
  };

  // Quick mood entry functions
  const addExcellentMood = (notes?: string) => addMoodEntry(10, '😄', notes);
  const addGoodMood = (notes?: string) => addMoodEntry(8, '😊', notes);
  const addOkayMood = (notes?: string) => addMoodEntry(5, '😐', notes);
  const addLowMood = (notes?: string) => addMoodEntry(3, '😔', notes);
  const addVeryLowMood = (notes?: string) => addMoodEntry(1, '😢', notes);

  return {
    // Current state
    todayMoods,
    latestMood,

    // History functions
    getMoodHistoryForDays,
    getWeeklyMoodData,
    getMonthlyMoodData,
    getAverageMood,

    // Analytics
    getMoodTrend,
    getMoodDistribution,
    getMostCommonMood,
    getMoodInsights,
    getMoodLevelDescription,
    getCurrentMoodStatus,

    // Actions
    addMoodEntry,
    addExcellentMood,
    addGoodMood,
    addOkayMood,
    addLowMood,
    addVeryLowMood,
  };
};

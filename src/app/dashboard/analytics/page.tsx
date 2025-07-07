'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { ProgressBar } from 'primereact/progressbar';

interface AnalyticsData {
  date: string;
  mood: number;
  focus: number;
  water: number;
  sleep: number;
  workouts: number;
  calories: number;
  productivity: number;
}

const timeRanges = [
  { label: 'Last 7 Days', value: '7' },
  { label: 'Last 30 Days', value: '30' },
  { label: 'Last 90 Days', value: '90' },
  { label: 'Last Year', value: '365' },
];

const metrics = [
  { label: 'Mood', value: 'mood', color: '#f59e0b', icon: 'pi pi-heart' },
  { label: 'Focus', value: 'focus', color: '#3b82f6', icon: 'pi pi-bolt' },
  { label: 'Water', value: 'water', color: '#06b6d4', icon: 'pi pi-tint' },
  { label: 'Sleep', value: 'sleep', color: '#8b5cf6', icon: 'pi pi-moon' },
  { label: 'Workouts', value: 'workouts', color: '#ef4444', icon: 'pi pi-dumbbell' },
  { label: 'Calories', value: 'calories', color: '#22c55e', icon: 'pi pi-apple' },
  { label: 'Productivity', value: 'productivity', color: '#ec4899', icon: 'pi pi-chart-line' },
];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState('7');
  const [selectedMetric, setSelectedMetric] = useState('mood');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load analytics data
    loadAnalyticsData();
  }, [selectedRange]);

  const loadAnalyticsData = () => {
    // Generate mock data for demonstration
    const mockData: AnalyticsData[] = [];
    const days = parseInt(selectedRange);

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      mockData.push({
        date: date.toISOString().split('T')[0],
        mood: Math.floor(Math.random() * 5) + 1,
        focus: Math.floor(Math.random() * 10) + 1,
        water: Math.floor(Math.random() * 8) + 2,
        sleep: Math.floor(Math.random() * 4) + 6,
        workouts: Math.floor(Math.random() * 3),
        calories: Math.floor(Math.random() * 500) + 1500,
        productivity: Math.floor(Math.random() * 10) + 1,
      });
    }

    setAnalyticsData(mockData);
  };

  const getMetricColor = (metric: string) => {
    return metrics.find(m => m.value === metric)?.color || '#6b7280';
  };

  const getMetricLabel = (metric: string) => {
    return metrics.find(m => m.value === metric)?.label || 'Metric';
  };

  // Calculate averages
  const averages = {
    mood: analyticsData.reduce((sum, data) => sum + data.mood, 0) / analyticsData.length,
    focus: analyticsData.reduce((sum, data) => sum + data.focus, 0) / analyticsData.length,
    water: analyticsData.reduce((sum, data) => sum + data.water, 0) / analyticsData.length,
    sleep: analyticsData.reduce((sum, data) => sum + data.sleep, 0) / analyticsData.length,
    workouts: analyticsData.reduce((sum, data) => sum + data.workouts, 0) / analyticsData.length,
    calories: analyticsData.reduce((sum, data) => sum + data.calories, 0) / analyticsData.length,
    productivity:
      analyticsData.reduce((sum, data) => sum + data.productivity, 0) / analyticsData.length,
  };

  // Chart data
  const lineChartData = {
    labels: analyticsData.map(d =>
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: getMetricLabel(selectedMetric),
        data: analyticsData.map(d => d[selectedMetric as keyof AnalyticsData] as number),
        backgroundColor: `${getMetricColor(selectedMetric)}20`,
        borderColor: getMetricColor(selectedMetric),
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const radarChartData = {
    labels: metrics.map(m => m.label),
    datasets: [
      {
        label: 'Current Period',
        data: [
          averages.mood * 2, // Scale to 1-10
          averages.focus,
          averages.water * 1.25, // Scale to 1-10
          averages.sleep * 1.25, // Scale to 1-10
          averages.workouts * 3.33, // Scale to 1-10
          (averages.calories - 1500) / 50, // Scale to 1-10
          averages.productivity,
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
    ],
  };

  const barChartData = {
    labels: metrics.map(m => m.label),
    datasets: [
      {
        label: 'Average Score',
        data: [
          averages.mood * 2,
          averages.focus,
          averages.water * 1.25,
          averages.sleep * 1.25,
          averages.workouts * 3.33,
          (averages.calories - 1500) / 50,
          averages.productivity,
        ],
        backgroundColor: metrics.map(m => m.color + '80'),
        borderColor: metrics.map(m => m.color),
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
        max: 10,
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

  const radarChartOptions = {
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
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          color: 'var(--foreground)',
          backdropColor: 'transparent',
        },
        grid: {
          color: 'var(--glass-border)',
        },
        pointLabels: {
          color: 'var(--foreground)',
        },
      },
    },
  };

  return (
    <div ref={containerRef} className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Analytics
        </h1>
        <p className="text-lg" style={{ color: 'var(--foreground)', opacity: 0.8 }}>
          Track your progress and insights
        </p>
      </div>

      {/* Filters */}
      <Card
        className="glass-card mb-6"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(25px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          color: 'var(--foreground)',
        }}
      >
        <div className="flex flex-column md:flex-row gap-4 align-items-center">
          <div className="field">
            <label className="block mb-2 font-medium">Time Range</label>
            <Dropdown
              value={selectedRange}
              options={timeRanges}
              onChange={e => setSelectedRange(e.value)}
              placeholder="Select time range"
              className="w-full md:w-10rem"
            />
          </div>

          <div className="field">
            <label className="block mb-2 font-medium">Metric</label>
            <Dropdown
              value={selectedMetric}
              options={metrics}
              onChange={e => setSelectedMetric(e.value)}
              placeholder="Select metric"
              className="w-full md:w-10rem"
            />
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map(metric => {
          const value = averages[metric.value as keyof typeof averages] || 0;
          const scaledValue =
            metric.value === 'mood'
              ? value * 2
              : metric.value === 'water'
              ? value * 1.25
              : metric.value === 'sleep'
              ? value * 1.25
              : metric.value === 'workouts'
              ? value * 3.33
              : metric.value === 'calories'
              ? (value - 1500) / 50
              : value;

          return (
            <Card key={metric.value} className="glass-card text-center">
              <div className="text-2xl mb-2" style={{ color: metric.color }}>
                <i className={metric.icon}></i>
              </div>
              <div className="text-lg font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                {scaledValue.toFixed(1)}
              </div>
              <div className="text-sm" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                {metric.label}
              </div>
              <ProgressBar
                value={(scaledValue / 10) * 100}
                className="mt-2"
                style={{ height: '4px' }}
              />
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card
          className="glass-card analytics-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
            <i className="pi pi-chart-line mr-2"></i>
            {getMetricLabel(selectedMetric)} Trend
          </h2>
          <div className="h-20rem">
            <Chart type="line" data={lineChartData} options={chartOptions} />
          </div>
        </Card>

        {/* Radar Chart */}
        <Card
          className="glass-card analytics-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
            <i className="pi pi-chart-pie mr-2"></i>
            Overall Performance
          </h2>
          <div className="h-20rem">
            <Chart type="radar" data={radarChartData} options={radarChartOptions} />
          </div>
        </Card>

        {/* Bar Chart */}
        <Card
          className="glass-card analytics-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
            <i className="pi pi-chart-bar mr-2"></i>
            Metric Comparison
          </h2>
          <div className="h-20rem">
            <Chart type="bar" data={barChartData} options={chartOptions} />
          </div>
        </Card>

        {/* Summary */}
        <Card
          className="glass-card analytics-card"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(25px) saturate(180%)',
            border: '1px solid var(--glass-border)',
            color: 'var(--foreground)',
          }}
        >
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--warm-gold)' }}>
            <i className="pi pi-info-circle mr-2"></i>
            Summary
          </h2>
          <div className="grid gap-4">
            <div className="text-center p-4 border-round-lg glass-card">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
                {analyticsData.length}
              </div>
              <div style={{ color: 'var(--foreground)' }}>Days Tracked</div>
            </div>

            <div className="text-center p-4 border-round-lg glass-card">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
                {(
                  (Object.values(averages).reduce((sum, val) => sum + val, 0) /
                    Object.keys(averages).length) *
                  2
                ).toFixed(1)}
              </div>
              <div style={{ color: 'var(--foreground)' }}>Average Score</div>
            </div>

            <div className="text-center p-4 border-round-lg glass-card">
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--warm-gold)' }}>
                {Math.max(...Object.values(averages).map(val => val * 2)).toFixed(1)}
              </div>
              <div style={{ color: 'var(--foreground)' }}>Best Metric</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressBar } from 'primereact/progressbar';
import { useAnime, animePresets, createStaggerAnimation } from '@/hooks/use-anime';

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
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const { add } = useAnime({ targets: '', autoplay: false });

  useEffect(() => {
    // Load analytics data from localStorage
    loadAnalyticsData();

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
    // Animate charts with stagger
    if (chartsRef.current) {
      const charts = Array.from(
        chartsRef.current.querySelectorAll('.analytics-card')
      ) as HTMLElement[];
      const staggerOptions = createStaggerAnimation(charts, animePresets.fadeInUp, 200);
      add(staggerOptions);
    }
  }, [analyticsData, add]);

  const loadAnalyticsData = () => {
    setIsLoading(true);

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
    setIsLoading(false);
  };

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedRange]);

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
    <div ref={containerRef} className="analytics-page">
      <div className="grid">
        {/* Header */}
        <div className="col-12 mb-4">
          <Card
            className="glass-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <div className="flex flex-column md:flex-row justify-content-between align-items-center">
              <div>
                <h1 className="text-3xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                  <i className="pi pi-chart-line mr-3" style={{ color: 'var(--warm-gold)' }}></i>
                  Analytics
                </h1>
                <p
                  className="text-lg m-0 mt-2"
                  style={{ color: 'var(--foreground)', opacity: 0.7 }}
                >
                  Deep insights into your life patterns and trends
                </p>
              </div>
              <div className="flex gap-3 mt-3 md:mt-0">
                <Dropdown
                  value={selectedRange}
                  options={timeRanges}
                  onChange={e => setSelectedRange(e.value)}
                  className="w-10rem"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--foreground)',
                  }}
                />
                <Dropdown
                  value={selectedMetric}
                  options={metrics}
                  onChange={e => setSelectedMetric(e.value)}
                  className="w-10rem"
                  style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Key Metrics */}
        <div className="col-12 mb-4">
          <div className="grid">
            {metrics.map(metric => (
              <div key={metric.value} className="col-12 sm:col-6 lg:col-3 mb-3">
                <Card
                  className="glass-card analytics-card"
                  style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(25px) saturate(180%)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--foreground)',
                  }}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2" style={{ color: metric.color }}>
                      <i className={metric.icon}></i>
                    </div>
                    <h3 className="text-xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                      {averages[metric.value as keyof typeof averages]?.toFixed(1)}
                    </h3>
                    <p
                      className="text-sm m-0 mt-1"
                      style={{ color: 'var(--foreground)', opacity: 0.7 }}
                    >
                      {metric.label}
                    </p>
                    <ProgressBar
                      value={(averages[metric.value as keyof typeof averages] / 10) * 100}
                      className="mt-2"
                      style={{ height: '6px' }}
                    />
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Main Charts */}
        <div className="col-12 lg:col-8 mb-4">
          <Card
            className="glass-card analytics-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              {getMetricLabel(selectedMetric)} Trend
            </h3>
            <div style={{ height: '400px' }}>
              <Chart type="line" data={lineChartData} options={chartOptions} />
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-4 mb-4">
          <Card
            className="glass-card analytics-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Life Balance Radar
            </h3>
            <div style={{ height: '400px' }}>
              <Chart type="radar" data={radarChartData} options={radarChartOptions} />
            </div>
          </Card>
        </div>

        {/* Performance Comparison */}
        <div className="col-12 mb-4">
          <Card
            className="glass-card analytics-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Performance Overview
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="bar" data={barChartData} options={chartOptions} />
            </div>
          </Card>
        </div>

        {/* Detailed Data Table */}
        <div className="col-12">
          <Card
            className="glass-card analytics-card"
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(25px) saturate(180%)',
              border: '1px solid var(--glass-border)',
              color: 'var(--foreground)',
            }}
          >
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Daily Data
            </h3>
            <DataTable
              value={analyticsData}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 20]}
              className="glass-table"
              loading={isLoading}
              style={{
                background: 'var(--glass-bg)',
                color: 'var(--foreground)',
              }}
            >
              <Column
                field="date"
                header="Date"
                body={(rowData: AnalyticsData) => (
                  <span style={{ color: 'var(--foreground)' }}>
                    {new Date(rowData.date).toLocaleDateString()}
                  </span>
                )}
              />
              <Column
                field="mood"
                header="Mood"
                body={(rowData: AnalyticsData) => (
                  <div className="flex align-items-center">
                    <span style={{ color: 'var(--foreground)' }}>{rowData.mood}/5</span>
                    <ProgressBar
                      value={(rowData.mood / 5) * 100}
                      className="ml-2"
                      style={{ width: '60px', height: '8px' }}
                    />
                  </div>
                )}
              />
              <Column
                field="focus"
                header="Focus"
                body={(rowData: AnalyticsData) => (
                  <div className="flex align-items-center">
                    <span style={{ color: 'var(--foreground)' }}>{rowData.focus}/10</span>
                    <ProgressBar
                      value={(rowData.focus / 10) * 100}
                      className="ml-2"
                      style={{ width: '60px', height: '8px' }}
                    />
                  </div>
                )}
              />
              <Column
                field="water"
                header="Water"
                body={(rowData: AnalyticsData) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.water}L</span>
                )}
              />
              <Column
                field="sleep"
                header="Sleep"
                body={(rowData: AnalyticsData) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.sleep}h</span>
                )}
              />
              <Column
                field="workouts"
                header="Workouts"
                body={(rowData: AnalyticsData) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.workouts}</span>
                )}
              />
              <Column
                field="calories"
                header="Calories"
                body={(rowData: AnalyticsData) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.calories}</span>
                )}
              />
              <Column
                field="productivity"
                header="Productivity"
                body={(rowData: AnalyticsData) => (
                  <div className="flex align-items-center">
                    <span style={{ color: 'var(--foreground)' }}>{rowData.productivity}/10</span>
                    <ProgressBar
                      value={(rowData.productivity / 10) * 100}
                      className="ml-2"
                      style={{ width: '60px', height: '8px' }}
                    />
                  </div>
                )}
              />
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
}

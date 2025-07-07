'use client';

import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
// import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
// import { useAnimation } from '@/hooks/useAnimation';
// import { useTheme } from '@/hooks/useTheme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

interface TrendData {
  date: string;
  mood: number;
  productivity: number;
  energy: number;
  water: number;
  steps: number;
  sleep: number;
  meditation: number;
}

const TIME_PERIODS = [
  { label: 'Last 7 Days', value: '7' },
  { label: 'Last 30 Days', value: '30' },
  { label: 'Last 90 Days', value: '90' },
];

const CHART_TYPES = [
  { label: 'Line Chart', value: 'line' },
  { label: 'Bar Chart', value: 'bar' },
  { label: 'Radar Chart', value: 'radar' },
];

// Generate sample data
const generateSampleData = (days: number): TrendData[] => {
  const data: TrendData[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    data.push({
      date: date.toISOString().split('T')[0],
      mood: Math.floor(Math.random() * 5) + 1,
      productivity: Math.floor(Math.random() * 10) + 1,
      energy: Math.floor(Math.random() * 10) + 1,
      water: Math.floor(Math.random() * 8) + 2,
      steps: Math.floor(Math.random() * 5000) + 3000,
      sleep: Math.floor(Math.random() * 3) + 6,
      meditation: Math.floor(Math.random() * 30) + 5,
    });
  }

  return data;
};

export default function TrendsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7');
  const [selectedChartType, setSelectedChartType] = useState('line');
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const { isDark } = useTheme();
  // const { animateIn } = useAnimation();

  useEffect(() => {
    // Load data from localStorage or generate sample data
    const savedData = localStorage.getItem('trendData');
    if (savedData) {
      setTrendData(JSON.parse(savedData));
    } else {
      const sampleData = generateSampleData(30);
      setTrendData(sampleData);
      localStorage.setItem('trendData', JSON.stringify(sampleData));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Animation handled by CSS
  }, []);

  const filteredData = trendData.slice(-parseInt(selectedPeriod));

  const chartData = {
    labels: filteredData.map(d =>
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Mood',
        data: filteredData.map(d => d.mood),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Productivity',
        data: filteredData.map(d => d.productivity),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Energy',
        data: filteredData.map(d => d.energy),
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: filteredData.map(d =>
      new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Water (glasses)',
        data: filteredData.map(d => d.water),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Sleep (hours)',
        data: filteredData.map(d => d.sleep),
        backgroundColor: 'rgba(147, 51, 234, 0.8)',
      },
      {
        label: 'Meditation (minutes)',
        data: filteredData.map(d => d.meditation / 10), // Scale down for better visualization
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
      },
    ],
  };

  const radarData = {
    labels: ['Mood', 'Productivity', 'Energy', 'Water', 'Sleep', 'Meditation'],
    datasets: [
      {
        label: 'Current Week',
        data: [
          filteredData[filteredData.length - 1]?.mood || 0,
          filteredData[filteredData.length - 1]?.productivity || 0,
          filteredData[filteredData.length - 1]?.energy || 0,
          (filteredData[filteredData.length - 1]?.water || 0) * 2, // Scale up for radar
          (filteredData[filteredData.length - 1]?.sleep || 0) * 1.5,
          (filteredData[filteredData.length - 1]?.meditation || 0) / 5,
        ],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Previous Week',
        data: [
          filteredData[Math.max(0, filteredData.length - 8)]?.mood || 0,
          filteredData[Math.max(0, filteredData.length - 8)]?.productivity || 0,
          filteredData[Math.max(0, filteredData.length - 8)]?.energy || 0,
          (filteredData[Math.max(0, filteredData.length - 8)]?.water || 0) * 2,
          (filteredData[Math.max(0, filteredData.length - 8)]?.sleep || 0) * 1.5,
          (filteredData[Math.max(0, filteredData.length - 8)]?.meditation || 0) / 5,
        ],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        pointBackgroundColor: 'rgb(147, 51, 234)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(147, 51, 234)',
      },
    ],
  };

  const doughnutData = {
    labels: ['Mood', 'Productivity', 'Energy', 'Water', 'Sleep', 'Meditation'],
    datasets: [
      {
        data: [
          filteredData[filteredData.length - 1]?.mood || 0,
          filteredData[filteredData.length - 1]?.productivity || 0,
          filteredData[filteredData.length - 1]?.energy || 0,
          filteredData[filteredData.length - 1]?.water || 0,
          filteredData[filteredData.length - 1]?.sleep || 0,
          filteredData[filteredData.length - 1]?.meditation || 0,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(147, 51, 234, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(245, 158, 11)',
          'rgb(147, 51, 234)',
          'rgb(239, 68, 68)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: 'Your Wellness Trends',
        color: '#374151',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
      y: {
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: 'Wellness Radar Comparison',
        color: '#374151',
      },
    },
    scales: {
      r: {
        ticks: {
          color: '#6b7280',
        },
        grid: {
          color: '#e5e7eb',
        },
        pointLabels: {
          color: '#374151',
        },
      },
    },
  };

  const getAverage = (data: number[]) => {
    return (data.reduce((sum, val) => sum + val, 0) / data.length).toFixed(1);
  };

  const getTrend = (data: number[]) => {
    if (data.length < 2) return 'stable';
    const recent = data.slice(-3).reduce((sum, val) => sum + val, 0) / 3;
    const previous = data.slice(-6, -3).reduce((sum, val) => sum + val, 0) / 3;
    return recent > previous ? 'up' : recent < previous ? 'down' : 'stable';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'pi pi-arrow-up text-green-500';
      case 'down':
        return 'pi pi-arrow-down text-red-500';
      default:
        return 'pi pi-minus text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <i className="pi pi-spin pi-spinner text-4xl text-blue-500"></i>
      </div>
    );
  }

  return (
    <div className="trends-page space-y-6">
      {/* Header */}
      <Card
        className="trends-card shadow-lg border-0"
        header={
          <div className="flex align-items-center gap-2">
            <i className="pi pi-chart-line text-blue-500 text-xl"></i>
            <span className="text-xl font-bold">Trends & Analytics</span>
          </div>
        }
        subTitle={
          <span className="text-gray-600 dark:text-gray-300">
            Track your progress and discover patterns
          </span>
        }
      >
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Time Period:
              </label>
              <Dropdown
                value={selectedPeriod}
                options={TIME_PERIODS}
                onChange={e => setSelectedPeriod(e.value)}
                className="w-32"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Chart Type:
              </label>
              <Dropdown
                value={selectedChartType}
                options={CHART_TYPES}
                onChange={e => setSelectedChartType(e.value)}
                className="w-32"
              />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Average Mood', data: filteredData.map(d => d.mood), color: 'blue' },
              {
                label: 'Productivity Score',
                data: filteredData.map(d => d.productivity),
                color: 'green',
              },
              { label: 'Energy Level', data: filteredData.map(d => d.energy), color: 'orange' },
              { label: 'Water Intake', data: filteredData.map(d => d.water), color: 'cyan' },
            ].map((metric, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {getAverage(metric.data)}
                    </div>
                  </div>
                  <div className="text-right">
                    <i className={`${getTrendIcon(getTrend(metric.data))} text-lg`}></i>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {getTrend(metric.data)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Chart */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            {selectedChartType === 'line' && <Line data={chartData} options={chartOptions} />}
            {selectedChartType === 'bar' && <Bar data={barData} options={chartOptions} />}
            {selectedChartType === 'radar' && <Radar data={radarData} options={radarOptions} />}
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Steps Chart */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Daily Steps
              </h3>
              <Bar
                data={{
                  labels: filteredData.map(d =>
                    new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                  ),
                  datasets: [
                    {
                      label: 'Steps',
                      data: filteredData.map(d => d.steps),
                      backgroundColor: 'rgba(16, 185, 129, 0.8)',
                      borderColor: 'rgb(16, 185, 129)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: false },
                  },
                }}
              />
            </div>

            {/* Wellness Distribution */}
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Today&apos;s Wellness Distribution
              </h3>
              <div className="flex justify-center">
                <div className="w-64 h-64">
                  <Doughnut
                    data={doughnutData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                          labels: {
                            color: '#374151',
                            padding: 10,
                            usePointStyle: true,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              📊 Insights & Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Trend Analysis
                </h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>
                    • Your mood has been {getTrend(filteredData.map(d => d.mood))} over the past{' '}
                    {selectedPeriod} days
                  </li>
                  <li>
                    • Productivity shows a {getTrend(filteredData.map(d => d.productivity))} trend
                  </li>
                  <li>• Energy levels are {getTrend(filteredData.map(d => d.energy))}</li>
                  <li>• Water intake is {getTrend(filteredData.map(d => d.water))}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Recommendations
                </h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Try to maintain consistent sleep patterns</li>
                  <li>• Increase water intake if below 8 glasses daily</li>
                  <li>• Consider adding more movement to your routine</li>
                  <li>• Practice mindfulness for better mood stability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

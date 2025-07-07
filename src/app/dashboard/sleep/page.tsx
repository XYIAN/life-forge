'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { ShineBorder } from '@/components/magicui';
import { Tag } from 'primereact/tag';
import { useAnime, animePresets, createStaggerAnimation } from '@/hooks/use-anime';

interface SleepEntry {
  id: string;
  date: Date;
  bedtime: Date;
  wakeTime: Date;
  duration: number;
  quality: number;
  deepSleep: number;
  remSleep: number;
  lightSleep: number;
  awakeTime: number;
  notes?: string;
  factors: string[];
}

const sleepQualityOptions = [
  { label: 'Excellent', value: 5 },
  { label: 'Good', value: 4 },
  { label: 'Fair', value: 3 },
  { label: 'Poor', value: 2 },
  { label: 'Very Poor', value: 1 },
];

const sleepFactors = [
  'Stress',
  'Caffeine',
  'Exercise',
  'Screen Time',
  'Noise',
  'Temperature',
  'Comfort',
  'Routine',
  'Diet',
  'Medication',
  'Travel',
  'Illness',
];

export default function SleepPage() {
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [currentEntry, setCurrentEntry] = useState<Partial<SleepEntry>>({});
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<SleepEntry | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const { add } = useAnime({ targets: '', autoplay: false });

  useEffect(() => {
    // Load sleep entries from localStorage
    const savedEntries = localStorage.getItem('sleepEntries');
    if (savedEntries) {
      setSleepEntries(
        JSON.parse(savedEntries).map((e: SleepEntry) => ({
          ...e,
          date: new Date(e.date),
          bedtime: new Date(e.bedtime),
          wakeTime: new Date(e.wakeTime),
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
      const nodeList = cardsRef.current.querySelectorAll('.sleep-card');
      const cards = Array.from(nodeList) as HTMLElement[];
      add(createStaggerAnimation(cards, animePresets.fadeInUp, 150));
    }
  }, [sleepEntries]);

  const saveSleepEntries = (updatedEntries: SleepEntry[]) => {
    setSleepEntries(updatedEntries);
    localStorage.setItem('sleepEntries', JSON.stringify(updatedEntries));
  };

  const addSleepEntry = () => {
    if (!currentEntry.bedtime || !currentEntry.wakeTime || !currentEntry.quality) return;

    const bedtime = new Date(currentEntry.bedtime);
    const wakeTime = new Date(currentEntry.wakeTime);
    const duration = (wakeTime.getTime() - bedtime.getTime()) / (1000 * 60 * 60);

    const newEntry: SleepEntry = {
      id: Date.now().toString(),
      date: new Date(),
      bedtime,
      wakeTime,
      duration,
      quality: currentEntry.quality!,
      deepSleep: Math.floor(duration * 0.25),
      remSleep: Math.floor(duration * 0.2),
      lightSleep: Math.floor(duration * 0.5),
      awakeTime: Math.floor(duration * 0.05),
      notes: currentEntry.notes,
      factors: selectedFactors,
    };

    const updatedEntries = [newEntry, ...sleepEntries];
    saveSleepEntries(updatedEntries);

    setShowAddDialog(false);
    setCurrentEntry({});
    setSelectedFactors([]);
  };

  const getSleepQualityColor = (quality: number) => {
    switch (quality) {
      case 5:
        return 'success';
      case 4:
        return 'info';
      case 3:
        return 'warning';
      case 2:
        return 'danger';
      case 1:
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getSleepQualityLabel = (quality: number) => {
    switch (quality) {
      case 5:
        return 'Excellent';
      case 4:
        return 'Good';
      case 3:
        return 'Fair';
      case 2:
        return 'Poor';
      case 1:
        return 'Very Poor';
      default:
        return 'Unknown';
    }
  };

  // Calculate averages
  const averages = {
    duration: sleepEntries.reduce((sum, entry) => sum + entry.duration, 0) / sleepEntries.length,
    quality: sleepEntries.reduce((sum, entry) => sum + entry.quality, 0) / sleepEntries.length,
    deepSleep: sleepEntries.reduce((sum, entry) => sum + entry.deepSleep, 0) / sleepEntries.length,
    remSleep: sleepEntries.reduce((sum, entry) => sum + entry.remSleep, 0) / sleepEntries.length,
  };

  // Chart data
  const weeklySleepData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: sleepEntries.slice(0, 7).map(entry => entry.duration),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const sleepStagesData = {
    labels: ['Deep Sleep', 'REM Sleep', 'Light Sleep', 'Awake'],
    datasets: [
      {
        data: [
          averages.deepSleep,
          averages.remSleep,
          averages.duration * 0.5,
          averages.duration * 0.05,
        ],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const qualityTrendData = {
    labels: sleepEntries
      .slice(0, 14)
      .map(entry =>
        new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
    datasets: [
      {
        label: 'Sleep Quality',
        data: sleepEntries.slice(0, 14).map(entry => entry.quality),
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
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
    <div ref={containerRef} className="sleep-page">
      <div className="grid">
        {/* Header */}
        <div className="col-12 mb-4">
          <ShineBorder
            className="rounded-lg p-4"
            shineColor={['#8b5cf6', '#06b6d4', '#3b82f6']}
            duration={6}
            borderWidth={2}
          >
            <Card className="glass-card">
              <div className="flex flex-column md:flex-row justify-content-between align-items-center">
                <div>
                  <h1 className="text-3xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                    <i className="pi pi-moon mr-3" style={{ color: 'var(--warm-gold)' }}></i>
                    Sleep Tracking
                  </h1>
                  <p
                    className="text-lg m-0 mt-2"
                    style={{ color: 'var(--foreground)', opacity: 0.7 }}
                  >
                    Monitor your sleep patterns and improve your rest
                  </p>
                </div>
                <Button
                  label="Add Sleep Entry"
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
          <Card className="glass-card sleep-card">
            <div className="text-center">
              <i className="pi pi-clock text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {averages.duration ? averages.duration.toFixed(1) : '0'}h
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Avg. Sleep Duration
              </p>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-3 mb-4">
          <Card className="glass-card sleep-card">
            <div className="text-center">
              <i className="pi pi-star text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {averages.quality ? averages.quality.toFixed(1) : '0'}/5
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Avg. Sleep Quality
              </p>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-3 mb-4">
          <Card className="glass-card sleep-card">
            <div className="text-center">
              <i className="pi pi-heart text-4xl mb-3" style={{ color: 'var(--warm-gold)' }}></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {sleepEntries.length}
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Nights Tracked
              </p>
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-3 mb-4">
          <Card className="glass-card sleep-card">
            <div className="text-center">
              <i
                className="pi pi-chart-line text-4xl mb-3"
                style={{ color: 'var(--warm-gold)' }}
              ></i>
              <h3 className="text-2xl font-bold m-0" style={{ color: 'var(--foreground)' }}>
                {sleepEntries.length > 0 ? Math.round(sleepEntries.length / 7) : 0}
              </h3>
              <p className="text-sm m-0 mt-1" style={{ color: 'var(--foreground)', opacity: 0.7 }}>
                Weekly Average
              </p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="col-12 lg:col-8 mb-4">
          <Card className="glass-card sleep-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Sleep Quality Trend
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="line" data={qualityTrendData} options={chartOptions} />
            </div>
          </Card>
        </div>

        <div className="col-12 lg:col-4 mb-4">
          <Card className="glass-card sleep-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Sleep Stages
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="doughnut" data={sleepStagesData} options={chartOptions} />
            </div>
          </Card>
        </div>

        {/* Weekly Sleep Duration */}
        <div className="col-12 mb-4">
          <Card className="glass-card sleep-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Weekly Sleep Duration
            </h3>
            <div style={{ height: '300px' }}>
              <Chart type="bar" data={weeklySleepData} options={chartOptions} />
            </div>
          </Card>
        </div>

        {/* Sleep Entries List */}
        <div className="col-12">
          <Card className="glass-card sleep-card">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
              Sleep History
            </h3>
            <DataTable
              value={sleepEntries}
              paginator
              rows={5}
              rowsPerPageOptions={[5, 10, 20]}
              className="glass-table"
              emptyMessage="No sleep entries found. Start tracking your sleep!"
            >
              <Column
                field="date"
                header="Date"
                body={(rowData: SleepEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>
                    {rowData.date.toLocaleDateString()}
                  </span>
                )}
              />
              <Column
                field="bedtime"
                header="Bedtime"
                body={(rowData: SleepEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>
                    {rowData.bedtime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                )}
              />
              <Column
                field="wakeTime"
                header="Wake Time"
                body={(rowData: SleepEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>
                    {rowData.wakeTime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </span>
                )}
              />
              <Column
                field="duration"
                header="Duration"
                body={(rowData: SleepEntry) => (
                  <span style={{ color: 'var(--foreground)' }}>{rowData.duration.toFixed(1)}h</span>
                )}
              />
              <Column
                field="quality"
                header="Quality"
                body={(rowData: SleepEntry) => (
                  <div className="flex align-items-center">
                    <span style={{ color: 'var(--foreground)' }}>{rowData.quality}/5</span>
                    <div className="ml-2">
                      <Tag
                        value={getSleepQualityLabel(rowData.quality)}
                        severity={getSleepQualityColor(rowData.quality)}
                      />
                    </div>
                  </div>
                )}
              />
              <Column
                header="Actions"
                body={(rowData: SleepEntry) => (
                  <Button
                    icon="pi pi-eye"
                    className="p-button-text p-button-sm"
                    onClick={() => {
                      setSelectedEntry(rowData);
                      setShowDetailsDialog(true);
                    }}
                  />
                )}
              />
            </DataTable>
          </Card>
        </div>
      </div>

      {/* Add Sleep Entry Dialog */}
      <Dialog
        header="Add Sleep Entry"
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
              Bedtime
            </label>
            <Calendar
              value={currentEntry.bedtime ?? undefined}
              onChange={e => setCurrentEntry({ ...currentEntry, bedtime: e.value ?? undefined })}
              showTime
              showSeconds={false}
              className="w-full"
              placeholder="Select bedtime"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Wake Time
            </label>
            <Calendar
              value={currentEntry.wakeTime ?? undefined}
              onChange={e => setCurrentEntry({ ...currentEntry, wakeTime: e.value ?? undefined })}
              showTime
              showSeconds={false}
              className="w-full"
              placeholder="Select wake time"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Sleep Quality
            </label>
            <Dropdown
              value={currentEntry.quality}
              options={sleepQualityOptions}
              onChange={e => setCurrentEntry({ ...currentEntry, quality: e.value })}
              className="w-full"
              placeholder="Select sleep quality"
            />
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Sleep Factors (Optional)
            </label>
            <div className="flex flex-wrap gap-2">
              {sleepFactors.map(factor => (
                <Button
                  key={factor}
                  label={factor}
                  className={`p-button-sm ${
                    selectedFactors.includes(factor) ? 'p-button-primary' : 'p-button-outlined'
                  }`}
                  onClick={() => {
                    if (selectedFactors.includes(factor)) {
                      setSelectedFactors(selectedFactors.filter(f => f !== factor));
                    } else {
                      setSelectedFactors([...selectedFactors, factor]);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          <div className="col-12 mb-3">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--foreground)' }}
            >
              Notes
            </label>
            <InputText
              value={currentEntry.notes || ''}
              onChange={e => setCurrentEntry({ ...currentEntry, notes: e.target.value })}
              className="w-full"
              placeholder="Optional notes about your sleep"
            />
          </div>

          <div className="col-12 flex justify-content-end">
            <Button
              label="Cancel"
              className="p-button-text mr-2"
              onClick={() => setShowAddDialog(false)}
            />
            <Button
              label="Save Entry"
              onClick={addSleepEntry}
              disabled={!currentEntry.bedtime || !currentEntry.wakeTime || !currentEntry.quality}
            />
          </div>
        </div>
      </Dialog>

      {/* Sleep Entry Details Dialog */}
      <Dialog
        header="Sleep Entry Details"
        visible={showDetailsDialog}
        onHide={() => setShowDetailsDialog(false)}
        style={{ width: '90vw', maxWidth: '600px' }}
        className="glass-dialog"
      >
        {selectedEntry && (
          <div className="grid">
            <div className="col-12 mb-4">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Sleep on {selectedEntry.date.toLocaleDateString()}
              </h3>
              <div className="grid">
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Bedtime:</strong> {selectedEntry.bedtime.toLocaleTimeString()}
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Wake Time:</strong> {selectedEntry.wakeTime.toLocaleTimeString()}
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Duration:</strong> {selectedEntry.duration.toFixed(1)} hours
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Quality:</strong> {selectedEntry.quality}/5
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 mb-4">
              <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                Sleep Stages
              </h4>
              <div className="grid">
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Deep Sleep:</strong> {selectedEntry.deepSleep}h
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>REM Sleep:</strong> {selectedEntry.remSleep}h
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Light Sleep:</strong> {selectedEntry.lightSleep}h
                  </p>
                </div>
                <div className="col-6">
                  <p style={{ color: 'var(--foreground)' }}>
                    <strong>Awake Time:</strong> {selectedEntry.awakeTime}h
                  </p>
                </div>
              </div>
            </div>

            {selectedEntry.factors.length > 0 && (
              <div className="col-12 mb-4">
                <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Sleep Factors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.factors.map((factor, index) => (
                    <Tag key={index} value={factor} severity="info" />
                  ))}
                </div>
              </div>
            )}

            {selectedEntry.notes && (
              <div className="col-12">
                <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
                  Notes
                </h4>
                <p style={{ color: 'var(--foreground)', opacity: 0.8 }}>{selectedEntry.notes}</p>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}

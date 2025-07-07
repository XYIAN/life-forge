'use client';

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Slider } from 'primereact/slider';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { useData } from '@/lib/providers/data-provider';

interface MoodPanelProps {
  className?: string;
}

const MOOD_ICONS = [
  { value: 1, icon: 'pi pi-times-circle', label: 'Terrible', description: 'Feeling awful today' },
  { value: 2, icon: 'pi pi-exclamation-triangle', label: 'Bad', description: 'Not a good day' },
  { value: 3, icon: 'pi pi-frown', label: 'Poor', description: 'Could be better' },
  { value: 4, icon: 'pi pi-minus-circle', label: 'Okay', description: 'Just getting by' },
  { value: 5, icon: 'pi pi-circle', label: 'Fair', description: 'Neutral mood' },
  { value: 6, icon: 'pi pi-smile', label: 'Good', description: 'Feeling positive' },
  { value: 7, icon: 'pi pi-thumbs-up', label: 'Great', description: 'Having a good day' },
  { value: 8, icon: 'pi pi-star', label: 'Excellent', description: 'Feeling fantastic' },
  { value: 9, icon: 'pi pi-heart', label: 'Amazing', description: 'Absolutely wonderful' },
  { value: 10, icon: 'pi pi-star-fill', label: 'Fantastic', description: 'Best day ever!' },
];

export const MoodPanel: React.FC<MoodPanelProps> = ({ className }) => {
  const { addMoodEntry, getMoodEntriesForDate, getLatestMoodEntry } = useData();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedMood, setSelectedMood] = useState(5);
  const [notes, setNotes] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const today = new Date();
  const todayMoods = getMoodEntriesForDate(today);
  const latestMood = getLatestMoodEntry();
  const averageMood =
    todayMoods.length > 0
      ? todayMoods.reduce((sum, entry) => sum + entry.mood, 0) / todayMoods.length
      : 0;

  const handleSaveMood = () => {
    const selectedMoodData = MOOD_ICONS.find(m => m.value === selectedMood);
    if (selectedMoodData) {
      setIsAnimating(true);
      addMoodEntry(selectedMood, selectedMoodData.icon, notes);
      setShowDialog(false);
      setNotes('');
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return 'text-green-600';
    if (mood >= 6) return 'text-blue-600';
    if (mood >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCurrentMoodIcon = () => {
    return MOOD_ICONS.find(m => m.value === selectedMood)?.icon || 'pi pi-smile';
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-4">
        <i
          className="pi pi-heart text-2xl"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #be185d)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        ></i>
        <h3 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
          Mood Tracker
        </h3>
      </div>
      <div className="flex align-items-center gap-2">
        {latestMood && (
          <div className="flex align-items-center gap-2">
            <span className="text-2xl">{latestMood.emoji}</span>
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              {latestMood.mood}/10
            </span>
          </div>
        )}
        <Button
          icon="pi pi-info-circle"
          rounded
          text
          size="small"
          className="p-1"
          style={{ color: 'var(--warm-gold)' }}
          onClick={() => {
            // Navigate to detailed mood tracking page
            console.log('Navigate to mood details');
          }}
          aria-label="Mood tracker info"
        />
      </div>
    </div>
  );

  return (
    <>
      <Card
        header={header}
        className={`mood-panel glass-card ${className || ''} ${isAnimating ? 'animate-pulse' : ''}`}
      >
        <div className="flex flex-column gap-4">
          {/* Today's Stats */}
          <div className="flex justify-content-between align-items-center">
            <div className="flex flex-column">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Today&apos;s Average
              </span>
              <span className={`text-lg font-bold ${getMoodColor(averageMood)}`}>
                {averageMood > 0 ? `${averageMood.toFixed(1)}/10` : 'No entries'}
              </span>
            </div>
            <div className="flex flex-column align-items-end">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Entries
              </span>
              <span className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                {todayMoods.length}
              </span>
            </div>
          </div>

          {/* Quick Mood Selection */}
          <div className="flex flex-column gap-2">
            <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              How are you feeling?
            </span>
            <div className="flex gap-2 flex-wrap justify-content-center">
              {MOOD_ICONS.filter(mood => [3, 5, 7, 9].includes(mood.value)).map(mood => (
                <Button
                  key={mood.value}
                  className="p-2 w-4rem h-4rem glass-card"
                  outlined
                  style={{
                    borderColor: 'var(--glass-border)',
                    background: 'var(--glass-bg)',
                    color: 'var(--warm-gold)',
                  }}
                  onClick={() => {
                    setSelectedMood(mood.value);
                    setShowDialog(true);
                  }}
                >
                  <div className="flex flex-column align-items-center gap-1">
                    <i className={`${mood.icon} text-xl`}></i>
                    <span className="text-xs" style={{ color: 'var(--foreground)' }}>
                      {mood.label}
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Add Mood Button */}
          <Button
            label="Log Mood"
            icon="pi pi-plus"
            onClick={() => setShowDialog(true)}
            className="w-full"
            severity="info"
          />

          {/* Recent Entries */}
          {todayMoods.length > 0 && (
            <div className="flex flex-column gap-2">
              <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                Recent Entries
              </span>
              <div className="flex gap-2 flex-wrap">
                {todayMoods.slice(-3).map(entry => (
                  <div
                    key={entry.id}
                    className="flex align-items-center gap-1 p-1 bg-gray-50 border-round"
                  >
                    <span className="text-sm">{entry.emoji}</span>
                    <span className="text-xs">{entry.mood}/10</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Mood Entry Dialog */}
      <Dialog
        header="How are you feeling?"
        visible={showDialog}
        onHide={() => setShowDialog(false)}
        style={{ width: '90vw', maxWidth: '400px' }}
        modal
        className="mood-dialog"
      >
        <div className="flex flex-column gap-4">
          {/* Mood Slider */}
          <div className="flex flex-column gap-2">
            <div className="flex align-items-center justify-content-center gap-2">
              <i
                className={`${getCurrentMoodIcon()} text-4xl`}
                style={{ color: 'var(--warm-gold)' }}
              ></i>
              <span className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
                {selectedMood}/10
              </span>
            </div>
            <Slider
              value={selectedMood}
              onChange={e => setSelectedMood(e.value as number)}
              min={1}
              max={10}
              className="w-full"
            />
            <div
              className="flex justify-content-between text-xs"
              style={{ color: 'var(--foreground)', opacity: 0.7 }}
            >
              <span>Terrible</span>
              <span>Fantastic</span>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-column gap-2">
            <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
              Notes (optional)
            </label>
            <InputTextarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="What's affecting your mood?"
              rows={3}
              className="w-full"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setShowDialog(false)}
              className="flex-1"
              severity="secondary"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={handleSaveMood}
              className="flex-1"
              severity="success"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};

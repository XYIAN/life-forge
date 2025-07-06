"use client";

import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { useData } from "@/lib/providers/data-provider";

interface MoodPanelProps {
  className?: string;
}

const MOOD_EMOJIS = [
  { value: 1, emoji: "😢", label: "Terrible" },
  { value: 2, emoji: "😔", label: "Bad" },
  { value: 3, emoji: "😕", label: "Poor" },
  { value: 4, emoji: "😐", label: "Okay" },
  { value: 5, emoji: "🙂", label: "Fair" },
  { value: 6, emoji: "😊", label: "Good" },
  { value: 7, emoji: "😄", label: "Great" },
  { value: 8, emoji: "😁", label: "Excellent" },
  { value: 9, emoji: "🤩", label: "Amazing" },
  { value: 10, emoji: "🥳", label: "Fantastic" },
];

export const MoodPanel: React.FC<MoodPanelProps> = ({ className }) => {
  const { addMoodEntry, getMoodEntriesForDate, getLatestMoodEntry } = useData();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedMood, setSelectedMood] = useState(5);
  const [notes, setNotes] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const today = new Date();
  const todayMoods = getMoodEntriesForDate(today);
  const latestMood = getLatestMoodEntry();
  const averageMood =
    todayMoods.length > 0
      ? todayMoods.reduce((sum, entry) => sum + entry.mood, 0) /
        todayMoods.length
      : 0;

  const handleSaveMood = () => {
    const selectedEmoji = MOOD_EMOJIS.find((m) => m.value === selectedMood);
    if (selectedEmoji) {
      setIsAnimating(true);
      addMoodEntry(selectedMood, selectedEmoji.emoji, notes);
      setShowDialog(false);
      setNotes("");
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return "text-green-600";
    if (mood >= 6) return "text-blue-600";
    if (mood >= 4) return "text-yellow-600";
    return "text-red-600";
  };

  const getCurrentMoodEmoji = () => {
    return MOOD_EMOJIS.find((m) => m.value === selectedMood)?.emoji || "😊";
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-2">
        <i className="pi pi-heart text-2xl text-pink-500"></i>
        <h3 className="text-lg font-semibold m-0">Mood Tracker</h3>
      </div>
      {latestMood && (
        <div className="flex align-items-center gap-2">
          <span className="text-2xl">{latestMood.emoji}</span>
          <span className="text-sm font-medium">{latestMood.mood}/10</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Card
        header={header}
        className={`mood-panel glass-card ${className || ""} ${
          isAnimating ? "animate-pulse" : ""
        }`}
      >
        <div className="flex flex-column gap-4">
          {/* Today's Stats */}
          <div className="flex justify-content-between align-items-center">
            <div className="flex flex-column">
              <span className="text-sm font-medium">Today&apos;s Average</span>
              <span
                className={`text-lg font-bold ${getMoodColor(averageMood)}`}
              >
                {averageMood > 0
                  ? `${averageMood.toFixed(1)}/10`
                  : "No entries"}
              </span>
            </div>
            <div className="flex flex-column align-items-end">
              <span className="text-sm font-medium">Entries</span>
              <span className="text-lg font-bold">{todayMoods.length}</span>
            </div>
          </div>

          {/* Quick Mood Selection */}
          <div className="flex flex-column gap-2">
            <span className="text-sm font-medium">How are you feeling?</span>
            <div className="flex gap-1 flex-wrap justify-content-center">
              {MOOD_EMOJIS.filter((mood) =>
                [3, 5, 7, 9].includes(mood.value)
              ).map((mood) => (
                <Button
                  key={mood.value}
                  className="p-1 w-3rem h-3rem"
                  outlined
                  onClick={() => {
                    setSelectedMood(mood.value);
                    setShowDialog(true);
                  }}
                >
                  <span className="text-xl">{mood.emoji}</span>
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
              <span className="text-sm font-medium">Recent Entries</span>
              <div className="flex gap-2 flex-wrap">
                {todayMoods.slice(-3).map((entry) => (
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
        style={{ width: "90vw", maxWidth: "400px" }}
        modal
        className="mood-dialog"
      >
        <div className="flex flex-column gap-4">
          {/* Mood Slider */}
          <div className="flex flex-column gap-2">
            <div className="flex align-items-center justify-content-center gap-2">
              <span className="text-4xl">{getCurrentMoodEmoji()}</span>
              <span className="text-lg font-bold">{selectedMood}/10</span>
            </div>
            <Slider
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.value as number)}
              min={1}
              max={10}
              className="w-full"
            />
            <div className="flex justify-content-between text-xs text-gray-500">
              <span>Terrible</span>
              <span>Fantastic</span>
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-column gap-2">
            <label className="text-sm font-medium">Notes (optional)</label>
            <InputTextarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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

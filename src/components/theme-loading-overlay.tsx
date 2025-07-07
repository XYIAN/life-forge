'use client';

import React, { useState, useEffect } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

interface ThemeLoadingOverlayProps {
  isVisible: boolean;
  onComplete: () => void;
}

const wizardMessages = [
  '✨ Gathering mystical energies...',
  '🌟 Weaving the fabric of your chosen theme...',
  '🔮 Channeling ancient design wisdom...',
  '💫 Infusing your space with new magic...',
  '🎨 Painting your world with fresh colors...',
  '✨ Almost there... preparing your transformation...',
  '🌟 Theme transformation complete! ✨',
];

export const ThemeLoadingOverlay: React.FC<ThemeLoadingOverlayProps> = ({
  isVisible,
  onComplete,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCurrentMessageIndex(0);
      setProgress(0);
      return;
    }

    // Minimum 2 seconds total duration
    const totalDuration = 2000;
    const messageInterval = totalDuration / (wizardMessages.length - 1);

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev < wizardMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, messageInterval);

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 100 / (totalDuration / 50); // Update every 50ms
        }
        return prev;
      });
    }, 50);

    // Complete after minimum duration
    const completeTimer = setTimeout(() => {
      onComplete();
    }, totalDuration);

    return () => {
      clearInterval(messageTimer);
      clearInterval(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex align-items-center justify-content-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(139,92,47,0.8) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center p-8 max-w-md">
        {/* Spinner */}
        <div className="mb-6">
          <ProgressSpinner
            style={{ width: '80px', height: '80px' }}
            strokeWidth="4"
            fill="var(--warm-gold)"
            animationDuration="1s"
          />
        </div>

        {/* Message */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">🧙‍♂️ Theme Transformation</h3>
          <p className="text-white/90 text-lg leading-relaxed">
            {wizardMessages[currentMessageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 border-round-lg overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-amber-400 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 text-amber-400 text-2xl animate-pulse">✨</div>
        <div
          className="absolute top-4 right-4 text-purple-400 text-2xl animate-pulse"
          style={{ animationDelay: '0.5s' }}
        >
          🌟
        </div>
        <div
          className="absolute bottom-4 left-4 text-amber-400 text-2xl animate-pulse"
          style={{ animationDelay: '1s' }}
        >
          🔮
        </div>
        <div
          className="absolute bottom-4 right-4 text-purple-400 text-2xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        >
          💫
        </div>
      </div>
    </div>
  );
};

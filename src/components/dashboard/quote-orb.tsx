'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
import { getRandomQuote, type Quote } from '@constants';
import { useFloatAnimation, useCelebrationAnimation } from '@hooks';

interface QuoteOrbProps {
  className?: string;
}

export const QuoteOrb: React.FC<QuoteOrbProps> = ({ className }) => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const toast = useRef<Toast>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Float animation for the orb
  useFloatAnimation({
    elementRef: orbRef as React.RefObject<HTMLElement>,
    duration: 3000,
    amplitude: 8,
    easing: 'easeInOutSine',
  });

  // Celebration animations
  const { triggerSparkles } = useCelebrationAnimation({
    containerRef: containerRef as React.RefObject<HTMLElement>,
  });

  // Initialize quote after component mounts to prevent hydration mismatch
  useEffect(() => {
    setCurrentQuote(getRandomQuote());
  }, []);

  // Auto-rotate quotes every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNewQuote();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Continuous rotation animation
  useEffect(() => {
    rotationIntervalRef.current = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 100);
    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, []);

  // Random glowing effect
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }, 15000 + Math.random() * 10000);
    return () => clearInterval(glowInterval);
  }, []);

  const handleNewQuote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote(getRandomQuote());
      setIsAnimating(false);
    }, 300);
  };

  const handleOrbClick = (event: React.MouseEvent) => {
    // Handle easter egg clicking
    setClickCount(prev => prev + 1);

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);

    // Easter egg: 10 rapid clicks
    if (clickCount >= 9) {
      setShowEasterEgg(true);
      setClickCount(0);

      // Trigger sparkles at click position
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      triggerSparkles(x, y, 20);

      if (toast.current) {
        toast.current.show({
          severity: 'info',
          summary: '✨ Easter Egg Activated! ✨',
          detail:
            'You have discovered the secret of the Life Forge! May your journey be filled with magic and wonder. 🌟',
          life: 5000,
          className: 'easter-egg-toast',
        });
      }

      // Sparkle effect
      setTimeout(() => setShowEasterEgg(false), 3000);
    } else {
      // Normal click - get new quote
      handleNewQuote();
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      growth: 'text-green-600',
      mindset: 'text-blue-600',
      resilience: 'text-purple-600',
      wisdom: 'text-amber-600',
      gratitude: 'text-pink-600',
      success: 'text-indigo-600',
      default: 'text-gray-600',
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const orbStyle = {
    background: `conic-gradient(from ${rotationAngle}deg, 
      rgba(59, 130, 246, 0.3) 0deg, 
      rgba(147, 51, 234, 0.3) 120deg, 
      rgba(236, 72, 153, 0.3) 240deg, 
      rgba(59, 130, 246, 0.3) 360deg)`,
    borderRadius: '50%',
    padding: '2px',
    filter: isGlowing ? 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))' : 'none',
    transition: 'filter 0.3s ease',
  };

  const header = (
    <div className="flex align-items-center justify-content-between">
      <div className="flex align-items-center gap-4">
        <i
          className="pi pi-star text-2xl"
          style={{
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        ></i>
        <h3 className="text-lg font-semibold m-0" style={{ color: 'var(--foreground)' }}>
          Wisdom Orb
        </h3>
      </div>
      <div className="flex align-items-center gap-2">
        {currentQuote && (
          <Badge
            value={currentQuote.category}
            className={getCategoryColor(currentQuote.category)}
          />
        )}
        <Button
          icon="pi pi-info-circle"
          rounded
          text
          size="small"
          className="p-1"
          style={{ color: 'var(--warm-gold)' }}
          onClick={() => {
            // Navigate to detailed quotes page
            console.log('Navigate to quotes details');
          }}
          aria-label="Wisdom orb info"
        />
      </div>
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <div ref={containerRef} className="relative">
        <Card
          header={header}
          className={`quote-orb glass-card ${className || ''} ${
            showEasterEgg ? 'sparkle-animation' : ''
          }`}
        >
          <div className="flex flex-column gap-4 align-items-center">
            {/* The Orb */}
            <div
              ref={orbRef}
              className={`orb-container cursor-pointer ${isAnimating ? 'animate-spin' : ''} ${
                clickCount > 5 ? 'animate-pulse' : ''
              }`}
              onClick={handleOrbClick}
              style={orbStyle}
            >
              <div
                className="orb-inner border-round-xl p-4 text-center min-h-8rem flex align-items-center justify-content-center glass-card"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(25px) saturate(180%)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--foreground)',
                }}
              >
                <div
                  className={`quote-text ${
                    isAnimating ? 'opacity-0' : 'opacity-100'
                  } transition-opacity duration-300`}
                >
                  {currentQuote ? (
                    <p
                      className="text-sm md:text-base font-medium line-height-3 m-0"
                      style={{ color: 'var(--foreground)' }}
                    >
                      &quot;{currentQuote.text}&quot;
                    </p>
                  ) : (
                    <p
                      className="text-sm md:text-base font-medium line-height-3 m-0"
                      style={{ color: 'var(--foreground)', opacity: 0.7 }}
                    >
                      Loading wisdom...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Quote Actions */}
            <div className="flex gap-2 w-full">
              <Button
                label="New Quote"
                icon="pi pi-refresh"
                onClick={handleNewQuote}
                className="flex-1"
                size="small"
                severity="info"
                disabled={isAnimating}
              />
              <Button
                icon="pi pi-heart"
                onClick={() => {
                  if (toast.current) {
                    toast.current.show({
                      severity: 'success',
                      summary: '❤️ Quote Favorited',
                      detail: 'This wisdom has been added to your heart!',
                      life: 3000,
                    });
                  }
                }}
                className="flex-none"
                size="small"
                severity="secondary"
                outlined
              />
            </div>

            {/* Category Info */}
            {currentQuote && (
              <div className="flex align-items-center gap-2 w-full justify-content-center">
                <i className="pi pi-tag text-xs text-gray-400"></i>
                <span
                  className={`text-xs font-medium capitalize ${getCategoryColor(
                    currentQuote.category
                  )}`}
                >
                  {currentQuote.category.replace('-', ' ')}
                </span>
              </div>
            )}

            {/* Easter Egg Hint */}
            {clickCount > 5 && clickCount < 10 && (
              <div className="flex align-items-center gap-2 text-xs text-gray-500 animate-pulse">
                <i className="pi pi-sparkles"></i>
                <span>Something magical is happening... ({clickCount}/10)</span>
              </div>
            )}

            {/* Floating Particles */}
            {showEasterEgg && (
              <div className="floating-particles">
                <div className="particle particle-1">✨</div>
                <div className="particle particle-2">🌟</div>
                <div className="particle particle-3">💫</div>
                <div className="particle particle-4">⭐</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};

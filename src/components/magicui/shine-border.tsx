'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface ShineBorderProps {
  children?: ReactNode;
  className?: string;
  duration?: number;
  shineColor?: string | string[];
  borderWidth?: number;
  style?: React.CSSProperties;
  onShineComplete?: () => void;
}

export function ShineBorder({
  children,
  className = '',
  duration = 14,
  shineColor = '#000000',
  borderWidth = 1,
  style = {},
  onShineComplete,
}: ShineBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create the shine effect
    const createShineEffect = (): void => {
      // Remove existing shine elements
      const existingShine = container.querySelector('.shine-effect');
      if (existingShine) {
        existingShine.remove();
      }

      // Create new shine element
      const shine = document.createElement('div');
      shine.className = 'shine-effect';

      const colors = Array.isArray(shineColor) ? shineColor : [shineColor];
      const gradientColors =
        colors.length > 1
          ? colors
              .map((color, index) => `${color} ${(index / (colors.length - 1)) * 100}%`)
              .join(', ')
          : `transparent, ${colors[0]}, transparent`;

      shine.style.cssText = `
				position: absolute;
				top: 0;
				left: -100%;
				width: 100%;
				height: 100%;
				background: linear-gradient(90deg, ${gradientColors});
				animation: shine ${duration}s linear infinite;
				pointer-events: none;
				z-index: -1;
				border-radius: inherit;
			`;

      // Add keyframes if they don't exist
      if (!document.querySelector('#shine-keyframes')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'shine-keyframes';
        styleElement.textContent = `
					@keyframes shine {
						0% { left: -100%; }
						100% { left: 100%; }
					}
				`;
        document.head.appendChild(styleElement);
      }

      // Add animation end listener
      shine.addEventListener('animationiteration', () => {
        onShineComplete?.();
      });

      container.appendChild(shine);
    };

    // Initialize shine effect
    createShineEffect();

    // Recreate shine effect on hover for better performance
    const handleMouseEnter = (): void => {
      createShineEffect();
    };

    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [duration, shineColor, onShineComplete]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        border: `${borderWidth}px solid ${Array.isArray(shineColor) ? shineColor[0] : shineColor}`,
        ...style,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

import { useEffect, useRef } from 'react';

interface UseFloatAnimationProps {
  elementRef: React.RefObject<HTMLElement>;
  duration?: number;
  delay?: number;
  amplitude?: number;
  easing?: string;
  loop?: boolean;
}

export const useFloatAnimation = ({
  elementRef,
  duration = 2000,
  delay = 0,
  amplitude = 10,
  easing = 'easeInOutSine',
  loop = true,
}: UseFloatAnimationProps) => {
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let startTime: number | null = null;
    let animationId: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Simple sine wave animation
      const y = Math.sin(progress * Math.PI * 2) * amplitude;
      element.style.transform = `translateY(${y}px)`;

      if (loop && progress >= 1) {
        startTime = currentTime;
      }

      if (loop || progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      animationId = requestAnimationFrame(animate);
      animationRef.current = animationId;
    };

    if (delay > 0) {
      setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [elementRef, duration, delay, amplitude, easing, loop]);

  const pause = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const resume = () => {
    if (!animationRef.current && elementRef.current) {
      // Restart animation
      const element = elementRef.current;
      let startTime: number | null = null;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const y = Math.sin(progress * Math.PI * 2) * amplitude;
        element.style.transform = `translateY(${y}px)`;

        if (loop && progress >= 1) {
          startTime = currentTime;
        }

        if (loop || progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }
  };

  return { pause, resume };
};

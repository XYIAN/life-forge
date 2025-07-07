import { useRef, useState } from 'react';

interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  onComplete?: () => void;
}

export function useAnimation() {
  const elementRef = useRef<HTMLElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = (options: AnimationOptions = {}) => {
    const { duration = 1000, delay = 0, easing = 'ease-in-out', onComplete } = options;

    if (!elementRef.current) return;

    setIsAnimating(true);

    const element = elementRef.current;
    element.style.transition = `all ${duration}ms ${easing} ${delay}ms`;

    setTimeout(() => {
      setIsAnimating(false);
      onComplete?.();
    }, duration + delay);
  };

  const fadeIn = (delay = 0) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  };

  const fadeOut = (delay = 0) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';

    setTimeout(() => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(-20px)';
    }, delay);
  };

  const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'up', delay = 0) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const transforms = {
      left: 'translateX(-100%)',
      right: 'translateX(100%)',
      up: 'translateY(-100%)',
      down: 'translateY(100%)',
    };

    element.style.opacity = '0';
    element.style.transform = transforms[direction];

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0)';
    }, delay);
  };

  const pulse = (duration = 1000) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
  };

  const bounce = (duration = 1000) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.animation = `bounce ${duration}ms ease-in-out infinite`;
  };

  const shake = (duration = 500) => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    element.style.animation = `shake ${duration}ms ease-in-out`;

    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  };

  return {
    elementRef,
    isAnimating,
    animate,
    fadeIn,
    fadeOut,
    slideIn,
    pulse,
    bounce,
    shake,
  };
}

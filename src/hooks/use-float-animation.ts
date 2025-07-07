import { useEffect, useRef } from 'react';
// @ts-expect-error - animejs types are not properly exported
import anime from 'animejs';

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
  const animationRef = useRef<ReturnType<typeof anime> | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    animationRef.current = anime({
      targets: elementRef.current,
      translateY: [0, -amplitude, 0],
      duration,
      delay,
      easing,
      loop,
      direction: 'alternate',
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, [elementRef, duration, delay, amplitude, easing, loop]);

  const pause = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const resume = () => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  return { pause, resume };
};

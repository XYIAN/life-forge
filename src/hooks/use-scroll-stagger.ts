import { useEffect, useRef } from 'react';
// @ts-expect-error - animejs types are not properly exported
import anime from 'animejs';

interface UseScrollStaggerProps {
  elementRef: React.RefObject<HTMLElement>;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'slideInLeft' | 'slideInRight';
}

export const useScrollStagger = ({
  elementRef,
  staggerDelay = 100,
  duration = 800,
  threshold = 0.1,
  animation = 'fadeIn',
}: UseScrollStaggerProps) => {
  const animationRef = useRef<ReturnType<typeof anime> | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!elementRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const targets = entry.target.querySelectorAll('[data-animate]');

            const animations = {
              fadeIn: {
                opacity: [0, 1],
                translateY: [30, 0],
              },
              slideUp: {
                opacity: [0, 1],
                translateY: [50, 0],
              },
              scaleIn: {
                opacity: [0, 1],
                scale: [0.8, 1],
              },
              slideInLeft: {
                opacity: [0, 1],
                translateX: [-50, 0],
              },
              slideInRight: {
                opacity: [0, 1],
                translateX: [50, 0],
              },
            };

            animationRef.current = anime({
              targets,
              ...animations[animation],
              duration,
              delay: anime.stagger(staggerDelay),
              easing: 'easeOutCubic',
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        animationRef.current.pause();
      }
    };
  }, [elementRef, staggerDelay, duration, threshold, animation]);

  return { hasAnimated: hasAnimated.current };
};

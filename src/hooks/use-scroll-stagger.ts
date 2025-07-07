import { useEffect, useRef } from 'react';

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
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!elementRef.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;

            const targets = entry.target.querySelectorAll('[data-animate]');

            targets.forEach((target, index) => {
              const delay = index * staggerDelay;
              const element = target as HTMLElement;

              setTimeout(() => {
                element.style.transition = `all ${duration}ms ease-out`;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
              }, delay);
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(elementRef.current);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, staggerDelay, duration, threshold, animation]);

  return { hasAnimated: hasAnimated.current };
};

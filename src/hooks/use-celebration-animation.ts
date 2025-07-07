import { useRef } from 'react';
// @ts-expect-error - animejs types are not properly exported
import anime from 'animejs';

interface UseCelebrationAnimationProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const useCelebrationAnimation = ({ containerRef }: UseCelebrationAnimationProps) => {
  const animationRef = useRef<ReturnType<typeof anime> | null>(null);

  const createSparkle = (x: number, y: number) => {
    if (!containerRef.current) return;

    const sparkle = document.createElement('div');
    sparkle.className =
      'absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full pointer-events-none';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.zIndex = '1000';

    containerRef.current.appendChild(sparkle);

    return sparkle;
  };

  const createConfetti = (x: number, y: number) => {
    if (!containerRef.current) return;

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const confetti = document.createElement('div');
    confetti.className = 'absolute w-3 h-3 pointer-events-none';
    confetti.style.left = `${x}px`;
    confetti.style.top = `${y}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.zIndex = '1000';

    containerRef.current.appendChild(confetti);

    return confetti;
  };

  const triggerSparkles = (x: number, y: number, count = 10) => {
    const sparkles: HTMLElement[] = [];

    for (let i = 0; i < count; i++) {
      const sparkle = createSparkle(
        x + (Math.random() - 0.5) * 100,
        y + (Math.random() - 0.5) * 100
      );
      if (sparkle) sparkles.push(sparkle);
    }

    if (animationRef.current) {
      animationRef.current.pause();
    }

    animationRef.current = anime({
      targets: sparkles,
      translateX: () => (Math.random() - 0.5) * 200,
      translateY: () => (Math.random() - 0.5) * 200,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      duration: 1500,
      easing: 'easeOutExpo',
      complete: () => {
        sparkles.forEach(sparkle => sparkle.remove());
      },
    });
  };

  const triggerConfetti = (x: number, y: number, count = 20) => {
    const confettis: HTMLElement[] = [];

    for (let i = 0; i < count; i++) {
      const confetti = createConfetti(
        x + (Math.random() - 0.5) * 50,
        y + (Math.random() - 0.5) * 50
      );
      if (confetti) confettis.push(confetti);
    }

    if (animationRef.current) {
      animationRef.current.pause();
    }

    animationRef.current = anime({
      targets: confettis,
      translateY: () => Math.random() * 300 + 100,
      translateX: () => (Math.random() - 0.5) * 200,
      rotate: () => Math.random() * 360,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      duration: 2000,
      delay: anime.stagger(50),
      easing: 'easeOutExpo',
      complete: () => {
        confettis.forEach(confetti => confetti.remove());
      },
    });
  };

  const triggerElasticScale = (element: HTMLElement) => {
    if (animationRef.current) {
      animationRef.current.pause();
    }

    animationRef.current = anime({
      targets: element,
      scale: [1, 1.1, 0.95, 1.05, 1],
      duration: 600,
      easing: 'easeInOutQuad',
    });
  };

  return {
    triggerSparkles,
    triggerConfetti,
    triggerElasticScale,
  };
};

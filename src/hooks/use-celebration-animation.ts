interface UseCelebrationAnimationProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const useCelebrationAnimation = ({ containerRef }: UseCelebrationAnimationProps) => {
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

    // Simple animation using CSS transitions
    sparkles.forEach((sparkle, index) => {
      const delay = index * 50;
      setTimeout(() => {
        sparkle.style.transition = 'all 1.5s ease-out';
        sparkle.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${
          (Math.random() - 0.5) * 200
        }px) scale(0)`;
        sparkle.style.opacity = '0';

        setTimeout(() => sparkle.remove(), 1500);
      }, delay);
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

    // Simple animation using CSS transitions
    confettis.forEach((confetti, index) => {
      const delay = index * 50;
      setTimeout(() => {
        confetti.style.transition = 'all 2s ease-out';
        confetti.style.transform = `translateY(${Math.random() * 300 + 100}px) translateX(${
          (Math.random() - 0.5) * 200
        }px) rotate(${Math.random() * 360}deg) scale(0)`;
        confetti.style.opacity = '0';

        setTimeout(() => confetti.remove(), 2000);
      }, delay);
    });
  };

  const triggerElasticScale = (element: HTMLElement) => {
    element.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    element.style.transform = 'scale(1.1)';

    setTimeout(() => {
      element.style.transform = 'scale(0.95)';
      setTimeout(() => {
        element.style.transform = 'scale(1.05)';
        setTimeout(() => {
          element.style.transform = 'scale(1)';
        }, 150);
      }, 150);
    }, 150);
  };

  return {
    triggerSparkles,
    triggerConfetti,
    triggerElasticScale,
  };
};

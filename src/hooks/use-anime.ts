import { useEffect, useRef } from 'react';

// Dynamic import for anime.js to avoid require issues
let anime: unknown = null;

const loadAnime = async () => {
  if (!anime) {
    const animeModule = await import('animejs');
    anime = (animeModule as unknown as { default: unknown }).default || animeModule;
  }
  return anime;
};

interface AnimeOptions {
  targets: string | HTMLElement | HTMLElement[];
  duration?: number;
  delay?: number | ((el: HTMLElement, index: number) => number);
  easing?: string;
  direction?: 'normal' | 'reverse' | 'alternate';
  loop?: boolean | number;
  autoplay?: boolean;
  onComplete?: (anim: unknown) => void;
  onUpdate?: (anim: unknown) => void;
  onBegin?: (anim: unknown) => void;
}

interface UseAnimeReturn {
  play: () => void;
  pause: () => void;
  restart: () => void;
  reverse: () => void;
  seek: (time: number) => void;
  timeline: () => unknown;
  add: (params: AnimeOptions) => unknown;
}

export const useAnime = (options: AnimeOptions): UseAnimeReturn => {
  const animationRef = useRef<unknown>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const animeInstance = await loadAnime();
      if (options.autoplay !== false) {
        animationRef.current = animeInstance(options);
      }
    };

    initAnimation();

    return () => {
      if (
        animationRef.current &&
        typeof animationRef.current === 'object' &&
        animationRef.current !== null
      ) {
        const anim = animationRef.current as { pause: () => void };
        if (anim.pause) {
          anim.pause();
        }
      }
    };
  }, []);

  const play = async () => {
    if (!animationRef.current) {
      const animeInstance = await loadAnime();
      if (options.autoplay !== false) {
        animationRef.current = (animeInstance as any)(options);
      }
    }
    if (animationRef.current) {
      (animationRef.current as any).play();
    }
  };

  const pause = async () => {
    if (!animationRef.current) {
      const animeInstance = await loadAnime();
      animationRef.current = (animeInstance as any)(options);
    }
    if (animationRef.current) {
      (animationRef.current as any).pause();
    }
  };

  const restart = async () => {
    if (!animationRef.current) {
      const animeInstance = await loadAnime();
      animationRef.current = (animeInstance as any)(options);
    }
    if (animationRef.current) {
      (animationRef.current as any).restart();
    }
  };

  const reverse = async () => {
    if (!animationRef.current) {
      const animeInstance = await loadAnime();
      animationRef.current = (animeInstance as any)(options);
    }
    if (animationRef.current) {
      (animationRef.current as any).reverse();
    }
  };

  const seek = async (time: number) => {
    if (!animationRef.current) {
      const animeInstance = await loadAnime();
      animationRef.current = (animeInstance as any)(options);
    }
    if (animationRef.current) {
      (animationRef.current as any).seek(time);
    }
  };

  const timeline = async () => {
    const animeInstance = await loadAnime();
    return animeInstance.timeline(options);
  };

  const add = async (newOptions: AnimeOptions) => {
    const animeInstance = await loadAnime();
    return (animeInstance as any)(newOptions);
  };

  return {
    play,
    pause,
    restart,
    reverse,
    seek,
    timeline,
    add,
  };
};

// Predefined animation presets
export const animePresets = {
  fadeIn: {
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
    easing: 'easeOutCubic',
  },
  fadeInUp: {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1000,
    easing: 'easeOutCubic',
  },
  fadeInDown: {
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: 'easeOutCubic',
  },
  fadeInLeft: {
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 1000,
    easing: 'easeOutCubic',
  },
  fadeInRight: {
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 1000,
    easing: 'easeOutCubic',
  },
  scaleIn: {
    scale: [0, 1],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutBack',
  },
  bounceIn: {
    scale: [0, 1.2, 1],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutBounce',
  },
  slideInUp: {
    translateY: [100, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  },
  slideInDown: {
    translateY: [-100, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  },
  slideInLeft: {
    translateX: [-100, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  },
  slideInRight: {
    translateX: [100, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  },
  rotateIn: {
    rotate: [-180, 0],
    scale: [0, 1],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  },
  flipInX: {
    rotateX: [90, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  },
  flipInY: {
    rotateY: [90, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutCubic',
  },
  zoomIn: {
    scale: [0.3, 1],
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutCubic',
  },
  pulse: {
    scale: [1, 1.05, 1],
    duration: 1000,
    easing: 'easeInOutQuad',
    loop: true,
  },
  shake: {
    translateX: [0, -10, 10, -10, 10, 0],
    duration: 500,
    easing: 'easeInOutQuad',
  },
  wobble: {
    rotate: [0, -3, 3, -3, 3, 0],
    duration: 1000,
    easing: 'easeInOutQuad',
  },
  swing: {
    rotate: [0, 15, -10, 5, -5, 0],
    duration: 1000,
    easing: 'easeInOutQuad',
  },
  tada: {
    scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
    rotate: [0, -3, -3, -3, 3, -3, 3, -3, 3, 3, 0],
    duration: 1000,
    easing: 'easeInOutQuad',
  },
  heartBeat: {
    scale: [1, 1.3, 1],
    duration: 1000,
    easing: 'easeInOutQuad',
    loop: true,
  },
  rubberBand: {
    scale: [1, 1.25, 0.75, 1.15, 0.9, 1.05, 1],
    duration: 1000,
    easing: 'easeInOutQuad',
  },
  lightSpeedIn: {
    translateX: [200, 0],
    skewX: [30, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutCubic',
  },
  lightSpeedOut: {
    translateX: [0, 200],
    skewX: [0, 30],
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeInCubic',
  },
  hinge: {
    rotate: [0, 80, 60, 80, 60, 80, 60],
    translateY: [0, 0, 0, 0, 0, 0, 0],
    opacity: [1, 1, 1, 1, 1, 1, 0],
    duration: 2000,
    easing: 'easeInOutQuad',
  },
  rollIn: {
    translateX: [-100, 0],
    rotate: [-120, 0],
    opacity: [0, 1],
    duration: 1000,
    easing: 'easeOutCubic',
  },
  rollOut: {
    translateX: [0, 100],
    rotate: [0, 120],
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeInCubic',
  },
};

// Stagger animations
export const createStaggerAnimation = (
  targets: string | HTMLElement | HTMLElement[],
  baseAnimation: Record<string, unknown>,
  staggerDelay: number = 100
): AnimeOptions => {
  return {
    targets,
    ...baseAnimation,
    delay: (el: HTMLElement, index: number) => index * staggerDelay,
  };
};

// Timeline animations
export const createTimeline = async () => {
  const animeInstance = await loadAnime();
  return animeInstance.timeline();
};

// Chain animations
export const chainAnimations = async (animations: AnimeOptions[]) => {
  const animeInstance = await loadAnime();
  const timeline = animeInstance.timeline();

  animations.forEach((animation, index) => {
    timeline.add(animation, index * 200);
  });

  return timeline;
};

'use client';

import { useEffect } from 'react';

export function ParallaxBackground() {
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElement = document.querySelector('.parallax-background') as HTMLElement;

      if (parallaxElement) {
        // Move background much slower than scroll for true parallax effect
        const yPos = -(scrolled * 0.1); // Reduced to 0.1 for very subtle parallax
        parallaxElement.style.transform = `translateY(${yPos}px)`;
      }

      ticking = false;
    };

    // Add scroll event listener with throttling
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call to set position
    updateParallax();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Parallax Background */}
      <div className="parallax-background"></div>
      {/* Parallax overlay for better content readability */}
      <div className="parallax-overlay"></div>
    </>
  );
}

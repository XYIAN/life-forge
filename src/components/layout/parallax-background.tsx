'use client';

export function ParallaxBackground() {
  return (
    <>
      {/* Parallax Background - Centered and visible */}
      <div
        className="parallax-background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundImage: 'url("/bg-1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          filter: 'hue-rotate(180deg) brightness(0.7) contrast(1.1)',
          zIndex: -10,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      ></div>

      {/* Parallax overlay for better content readability */}
      <div
        className="parallax-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(0, 0, 0, 0.1) 100%)',
          zIndex: -5,
          pointerEvents: 'none',
        }}
      ></div>
    </>
  );
}

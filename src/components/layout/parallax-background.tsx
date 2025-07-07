'use client';

export function ParallaxBackground() {
  return (
    <>
      {/* Parallax Background - Using CSS background-attachment: fixed for better performance */}
      <div className="parallax-background"></div>
      {/* Parallax overlay for better content readability */}
      <div className="parallax-overlay"></div>
    </>
  );
}

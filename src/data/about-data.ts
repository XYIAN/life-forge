export interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TechStackItem {
  name: string;
  icon: string;
  color: string;
}

export const aboutFeatures: AboutFeature[] = [
  {
    icon: 'pi pi-tint',
    title: 'Smart Water Tracking',
    description: 'Automatically separates drinking sessions and tracks your hydration history.',
  },
  {
    icon: 'pi pi-heart',
    title: 'Mood Monitoring',
    description: 'Track your emotional state with beautiful visualizations and trend analysis.',
  },
  {
    icon: 'pi pi-star',
    title: 'Wisdom Orb',
    description: 'Over 5,000 inspirational quotes with magical interactions and easter eggs.',
  },
  {
    icon: 'pi pi-check-circle',
    title: 'Goal Management',
    description: 'Set daily objectives and celebrate your achievements with visual progress.',
  },
  {
    icon: 'pi pi-clock',
    title: 'Focus Timer',
    description: 'Pomodoro technique implementation with customizable work and break intervals.',
  },
  {
    icon: 'pi pi-palette',
    title: 'Theme Switching',
    description: 'Beautiful themes with light/dark modes and surprise me functionality.',
  },
];

export const aboutTechStack: TechStackItem[] = [
  { name: 'Next.js 15.3.3+', icon: 'pi pi-code', color: 'text-blue-600' },
  { name: 'TypeScript', icon: 'pi pi-file', color: 'text-blue-500' },
  { name: 'Tailwind CSS', icon: 'pi pi-palette', color: 'text-cyan-500' },
  { name: 'PrimeReact', icon: 'pi pi-star', color: 'text-purple-600' },
  { name: 'PrimeFlex', icon: 'pi pi-th-large', color: 'text-green-600' },
  { name: 'PrimeIcons', icon: 'pi pi-heart', color: 'text-red-500' },
];

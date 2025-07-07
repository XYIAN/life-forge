export interface Feature {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface TechItem {
  name: string;
  icon: string;
}

export interface Stat {
  value: string;
  label: string;
  color: string;
}

export const homeFeatures: Feature[] = [
  {
    icon: 'pi pi-tint',
    title: 'Smart Water Tracking',
    description: 'Track your hydration with intelligent session detection and goal management.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: 'pi pi-heart',
    title: 'Mood Analytics',
    description: 'Monitor your emotional well-being with detailed insights and trends.',
    gradient: 'from-pink-400 to-rose-500',
  },
  {
    icon: 'pi pi-star',
    title: 'Wisdom Orb',
    description: 'Over 5,000 inspirational quotes with magical interactions and surprises.',
    gradient: 'from-yellow-400 to-amber-500',
  },
  {
    icon: 'pi pi-check-circle',
    title: 'Goal Management',
    description: 'Set and track daily objectives with beautiful progress visualization.',
    gradient: 'from-emerald-400 to-green-500',
  },
  {
    icon: 'pi pi-clock',
    title: 'Focus Timer',
    description: 'Boost productivity with Pomodoro technique and session analytics.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: 'pi pi-palette',
    title: 'Dynamic Themes',
    description: 'Beautiful themes that adapt to your mood and preferences.',
    gradient: 'from-orange-400 to-red-500',
  },
];

export const homeStats: Stat[] = [
  {
    value: '5,000+',
    label: 'Inspirational Quotes',
    color: 'text-amber-400',
  },
  {
    value: '∞',
    label: 'Customization Options',
    color: 'text-orange-500',
  },
  {
    value: '24/7',
    label: 'Progress Tracking',
    color: 'text-purple-500',
  },
];

export const techStack: TechItem[] = [
  { name: 'Next.js', icon: 'pi pi-code' },
  { name: 'TypeScript', icon: 'pi pi-file' },
  { name: 'Tailwind', icon: 'pi pi-palette' },
  { name: 'PrimeReact', icon: 'pi pi-star' },
  { name: 'React', icon: 'pi pi-heart' },
  { name: 'Modern CSS', icon: 'pi pi-sparkles' },
];

# 🛠️ Life Forge - Development Guide

This document contains all the technical information needed for developers working on Life Forge.

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/xyian/life-forge.git
   cd life-forge
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development server with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🏗️ Project Structure

```
life-forge/
├── docs/                 # Development documentation
├── public/              # Static assets
│   ├── sitemap.xml     # SEO sitemap
│   └── ...
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Homepage
│   │   └── about/      # About page
│   ├── components/     # React components
│   │   ├── water-panel.tsx
│   │   ├── mood-panel.tsx
│   │   ├── quote-orb.tsx
│   │   ├── goal-list.tsx
│   │   ├── timer-card.tsx
│   │   └── theme-switcher.tsx
│   ├── hooks/          # Custom React hooks
│   │   ├── index.ts
│   │   ├── use-dashboard-config.ts
│   │   ├── use-water-history.ts
│   │   ├── use-mood-analytics.ts
│   │   └── use-focus-analytics.ts
│   ├── lib/            # Utilities and providers
│   │   └── providers/  # React Context providers
│   │       ├── providers.tsx
│   │       ├── theme-provider.tsx
│   │       ├── dashboard-provider.tsx
│   │       └── data-provider.tsx
│   └── constants/      # Static data
│       └── QUOTES.ts   # Quote collection
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

## 🔧 Tech Stack

### Core Framework

- **Next.js 15.3.5+** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

### UI & Styling

- **PrimeReact 10.9.6** - UI component library
- **PrimeFlex 4.0** - CSS utility framework
- **PrimeIcons 7.0** - Icon library
- **Tailwind CSS 4** - Utility-first CSS framework

### Development Tools

- **ESLint 9** - Code linting
- **Turbopack** - Fast bundler for development

## 📦 Custom Hooks

### Data Management Hooks

- **`useDashboardConfig`** - Dashboard panel configuration
- **`useWaterHistory`** - Water tracking with analytics
- **`useMoodAnalytics`** - Mood tracking with insights
- **`useFocusAnalytics`** - Focus session analytics

### Provider Hooks

- **`useData`** - Core data management
- **`useDashboard`** - Dashboard configuration
- **`useTheme`** - Theme management

## 🎨 Component Architecture

### Core Components

1. **WaterPanel** - Smart water intake tracking
2. **MoodPanel** - Emotional state monitoring
3. **QuoteOrb** - Inspirational quote display with animations
4. **GoalList** - Daily objective management
5. **TimerCard** - Pomodoro focus timer
6. **ThemeSwitcher** - Theme selection interface

### Provider System

1. **ThemeProvider** - Manages themes and dark mode
2. **DashboardProvider** - Panel configuration
3. **DataProvider** - Local storage and data persistence

## 💾 Data Structure

### Water Tracking

```typescript
interface WaterEntry {
  id: string;
  timestamp: number;
  amount: number; // in ml
  sessionStart: number;
}
```

### Mood Tracking

```typescript
interface MoodEntry {
  id: string;
  timestamp: number;
  mood: number; // 1-10 scale
  emoji: string;
  notes?: string;
}
```

### Goals

```typescript
interface GoalEntry {
  id: string;
  timestamp: number;
  title: string;
  completed: boolean;
  completedAt?: number;
}
```

### Focus Sessions

```typescript
interface FocusSession {
  id: string;
  startTime: number;
  endTime?: number;
  duration: number; // in minutes
  type: 'work' | 'break';
  completed: boolean;
}
```

## 🎯 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

### Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Add loading and error states
- Follow accessibility best practices

### State Management

- Use React Context for global state
- Local component state for UI interactions
- Custom hooks for reusable logic
- Local storage for data persistence

## 🐛 Common Issues & Solutions

### Hydration Mismatch

- Ensure server and client render the same content
- Use `useEffect` for client-only operations
- Add proper loading states for dynamic content

### Theme Loading

- Import PrimeReact CSS in layout.tsx
- Ensure theme files exist in public directory
- Use static imports for reliable theme loading

### TypeScript Errors

- Define proper interfaces for all data structures
- Use strict null checks
- Import types explicitly where needed

## 🚀 Deployment

### Build Process

```bash
# Create production build
npm run build

# Test production build locally
npm run start
```

### Environment Variables

Currently, Life Forge uses only client-side local storage and doesn't require environment variables.

### Deployment Platforms

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any static hosting provider

## 📝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test thoroughly**
5. **Update documentation**
6. **Submit a pull request**

### Pull Request Guidelines

- Include clear description of changes
- Update relevant documentation
- Add tests for new features
- Ensure all builds pass
- Update changelog if needed

## 🔄 Version Management

### Semantic Versioning

- **MAJOR** (x.0.0) - Breaking changes
- **MINOR** (0.x.0) - New features
- **PATCH** (0.0.x) - Bug fixes

### Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Test build and functionality
4. Create git tag and release
5. Deploy to production

## 🧪 Testing

### Manual Testing Checklist

- [ ] All components render without errors
- [ ] Theme switching works correctly
- [ ] Data persistence works in local storage
- [ ] Mobile responsiveness
- [ ] All interactive elements work
- [ ] No console errors in production build

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔮 Future Development

### Planned Features

- PWA support for offline functionality
- Cloud synchronization options
- Advanced analytics dashboard
- Custom theme builder
- Habit tracking system

### Technical Improvements

- Implement dynamic theme loading
- Add unit and integration tests
- Performance optimization
- Enhanced accessibility
- Internationalization support

---

**Happy coding! 🚀**

For questions or support, reach out to the development team or create an issue on GitHub.

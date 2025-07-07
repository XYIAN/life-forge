# Life Forge Deployment Guide

## Overview

Life Forge is configured to work seamlessly on both localhost and Netlify deployment.

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Development Features

- Hot reload enabled
- Debug mode active
- Detailed error messages
- Development-specific optimizations

## Netlify Deployment

### Automatic Deployment

The app is configured for automatic deployment on Netlify with the following settings:

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 18
- **NPM Version**: 9

### Manual Deployment

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Deploy

### Environment Variables

No environment variables are required for basic functionality. The app uses:

- Dynamic base URL detection
- Client-side storage for user data
- Automatic theme detection

## Configuration Files

### `netlify.toml`

- Configures build settings
- Sets security headers
- Configures caching for static assets
- Handles client-side routing

### `next.config.ts`

- Optimizes for production
- Sets security headers
- Configures redirects
- Handles environment variables

### `src/lib/config/environment.ts`

- Dynamic environment detection
- Base URL configuration
- Feature flags
- Environment-specific settings

## Features by Environment

### Localhost (Development)

- ✅ Full development features
- ✅ Debug logging
- ✅ Hot reload
- ✅ Detailed error messages
- ✅ Local storage for data persistence

### Netlify (Production)

- ✅ Optimized build
- ✅ Security headers
- ✅ Static asset caching
- ✅ Client-side routing
- ✅ SEO optimization
- ✅ Social media meta tags

## Troubleshooting

### Common Issues

#### Build Failures

- Ensure Node.js 18+ is used
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

#### Theme Issues

- Clear browser cache
- Check localStorage for theme preferences
- Verify CSS variables are loading

#### Performance Issues

- Check network tab for failed requests
- Verify static assets are being cached
- Monitor bundle size in build output

### Environment Detection

The app automatically detects the environment:

- **Localhost**: `http://localhost:3000`
- **Netlify**: `https://life-forge.netlify.app`

## Performance Optimization

### Production Build

- Automatic code splitting
- Static asset optimization
- Tree shaking enabled
- Minification active

### Caching Strategy

- Static assets: 1 year
- JavaScript/CSS: 1 year
- Images: 1 year
- Fonts: 1 year

## Security

### Headers Configured

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- X-XSS-Protection: 1; mode=block

### Data Storage

- All data stored locally in browser
- No server-side data storage
- Privacy-focused design

## Monitoring

### Build Status

- Netlify provides build status
- Automatic deployment on git push
- Build logs available in Netlify dashboard

### Performance Monitoring

- Core Web Vitals tracking
- Bundle size monitoring
- Load time optimization

## Support

For deployment issues:

1. Check Netlify build logs
2. Verify environment configuration
3. Test locally first
4. Review this deployment guide

The app is designed to work identically on both localhost and Netlify, with automatic environment detection and appropriate optimizations for each platform.

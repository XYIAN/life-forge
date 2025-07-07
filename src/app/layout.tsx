import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Providers } from '@/lib/providers/providers';
import { ParallaxBackground } from '@/components/parallax-background';
import { GlobalHeader } from '@/components/global-header';
import { GlobalFooter } from '@/components/global-footer';
import { ThemeLoadingWrapper } from '@/components/theme-loading-wrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Life Forge - Your Personal Daily Dashboard',
  description:
    'Transform your daily routine into an adventure with Life Forge. Track water intake, mood, goals, and more with a beautifully crafted dashboard.',
  keywords: [
    'life tracking',
    'personal dashboard',
    'water tracker',
    'mood tracker',
    'goal tracking',
    'productivity',
  ],
  authors: [{ name: 'Kyle Dilbeck', url: 'https://kyledilbeck.com' }],
  creator: 'Kyle Dilbeck',
  publisher: 'Kyle Dilbeck',
  icons: {
    icon: [
      { url: '/icon-1.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-2.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/icon-1.png',
    shortcut: '/icon-2.png',
  },
  openGraph: {
    title: 'Life Forge - Your Personal Daily Dashboard',
    description: 'Transform your daily routine into an adventure with Life Forge',
    url: 'https://life-forge.netlify.app',
    siteName: 'Life Forge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/icon-1.png',
        width: 1200,
        height: 630,
        alt: 'Life Forge - Personal Daily Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Forge - Your Personal Daily Dashboard',
    description: 'Transform your daily routine into an adventure with Life Forge',
    creator: '@kxdilbeck',
    images: ['/icon-1.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Parallax Background */}
        <div className="parallax-background"></div>
        <div className="parallax-overlay"></div>
        <ParallaxBackground />

        {/* Main Content */}
        <div className="parallax-container">
          <Providers>
            <GlobalHeader />
            <main>{children}</main>
            <GlobalFooter />
            <ThemeLoadingWrapper>
              <></>
            </ThemeLoadingWrapper>
          </Providers>
        </div>
      </body>
    </html>
  );
}

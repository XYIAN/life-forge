import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import '../styles/animations.css';
import '../styles/magicui/index.css';
import { Providers } from '@/lib/providers/providers';
import { ParallaxBackground, GlobalHeader, GlobalFooter } from '@layout';
import { ThemeLoadingWrapper } from '@common';
import { Particles } from '@/components/magicui/particles';
import { environment } from '@/lib/config/environment';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(environment.baseUrl),
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
    url: environment.baseUrl,
    siteName: 'Life Forge',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${environment.baseUrl}/icon-1.png`,
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
    images: [`${environment.baseUrl}/icon-1.png`],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <Particles quantity={150} vx={0.2} vy={0.1} ease={40} staticity={40} />
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

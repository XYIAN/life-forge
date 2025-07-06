import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Providers } from '@/lib/providers/providers';

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
  openGraph: {
    title: 'Life Forge - Your Personal Daily Dashboard',
    description: 'Transform your daily routine into an adventure with Life Forge',
    url: 'https://life-forge.netlify.app',
    siteName: 'Life Forge',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life Forge - Your Personal Daily Dashboard',
    description: 'Transform your daily routine into an adventure with Life Forge',
    creator: '@kxdilbeck',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import ParticlesBackground from '@/components/ParticlesBackground';
import BackToTopButton from '@/components/BackToTopButton';
import NextNProgress from 'nextjs-progressbar';
// import { ThemeProvider } from 'next-themes'; // REMOVE this line
import { ToastProvider } from '@/components/Toast';
import SearchModal from '@/components/SearchModal';
import { useState } from 'react';
import { Providers } from './providers'; // ADD this line

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'My personal portfolio showcasing my projects, skills, and technical documentation.',
  metadataBase: new URL('https://yourdomain.com'), // Replace with your actual domain
  openGraph: {
    title: 'Your Name - Portfolio',
    description: 'My personal portfolio showcasing my projects, skills, and technical documentation.',
    url: 'https://yourdomain.com',
    siteName: 'Your Name - Portfolio',
    images: [
      {
        url: 'https://yourdomain.com/opengraph-image.jpg', // Replace with your actual opengraph image
        width: 1200,
        height: 630,
        alt: 'Your Name Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Name - Portfolio',
    description: 'My personal portfolio showcasing my projects, skills, and technical documentation.',
    creator: '@yourtwitterhandle', // Replace with your Twitter handle
    images: ['https://yourdomain.com/twitter-image.jpg'], // Replace with your actual twitter image
  },
  keywords: ['portfolio', 'developer', 'web development', 'react', 'nextjs', 'tailwind css', 'javascript', 'software engineer'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-text dark:bg-background-dark dark:text-text-dark transition-colors duration-300`}>
        {/* Wrap the entire content of the body with the Providers component */}
        <Providers>
          <ToastProvider>
            <NextNProgress color="#6366F1" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
            <CustomCursor />
            <ParticlesBackground />
            <Navbar onSearchOpen={() => setIsSearchModalOpen(true)} />
            <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
            <main className="relative z-10 pt-20 min-h-screen"> {/* pt-20 for fixed navbar */}
              {children}
            </main>
            <Footer />
            <BackToTopButton />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}

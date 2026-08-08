import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SectionProvider } from '@/contexts/SectionContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AARIVYN ONE — Deep-Tech Research & Enterprise Delivery Collective',
  description:
    'AARIVYN ONE is an independent research and delivery collective architecting frontier deep-tech systems — from quantum security to autonomous platforms.',
  generator: 'AARIVYN ONE',
  keywords: ['deep-tech', 'research', 'TRL', 'quantum', 'enterprise', 'AARIVYN ONE'],
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [{ color: '#0a0f1f' }],
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <SectionProvider>{children}</SectionProvider>
      </body>
    </html>
  );
}

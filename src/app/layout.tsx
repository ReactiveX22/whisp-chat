import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const space_mono = Space_Mono({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'whisp',
  description: 'Welcome whispers',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={space_mono.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

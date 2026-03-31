import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne, Quintessential } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne'
});

const quintessential = Quintessential({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-quintessential'
});

export const metadata: Metadata = {
  title: 'Structura | Construction Management Platform',
  description: 'Connect with vendors, manage phases, and track your construction project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${syne.variable} ${quintessential.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

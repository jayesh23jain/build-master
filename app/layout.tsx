import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
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

export const metadata: Metadata = {
  title: 'Build Master | Manage your entire build. One platform.',
  description: 'The A-Z home builder platform. Connect with vendors, manage phases, and track your construction project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${syne.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

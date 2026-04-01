import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Syne, Quintessential } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

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

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${syne.variable} ${quintessential.variable}`}>
      <body>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

'use client';
import { redirect } from 'next/navigation';

// Redirect to login page with register mode
export default function RegisterPage() {
  redirect('/auth/login');
}

'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/layout';
import { AuthGuard } from '@/components/auth';
import type { Locale } from '@/middleware';

interface ProtectedLayoutProps {
  children: ReactNode;
  locale: Locale;
  dict: {
    home: {
      title: string;
    };
    navigation: {
      dashboard: string;
      materials: string;
      projects: string;
      purchases: string;
      suppliers: string;
      signIn: string;
      signUp: string;
      logout: string;
      profile: string;
    };
  };
}

/**
 * Layout component for protected pages that require authentication
 * Includes header with navigation and authentication guard
 */
export default function ProtectedLayout({ children, locale, dict }: ProtectedLayoutProps) {
  return (
    <AuthGuard locale={locale}>
      <div className="min-h-screen bg-gray-50">
        <Header locale={locale} dict={dict} />
        <main>{children}</main>
      </div>
    </AuthGuard>
  );
}

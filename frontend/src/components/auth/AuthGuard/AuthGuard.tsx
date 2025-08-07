'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { Locale } from '@/middleware';

interface AuthGuardProps {
  children: ReactNode;
  locale: Locale;
}

/**
 * Authentication guard component that protects pages requiring authentication
 * Redirects unauthenticated users to login page with returnTo parameter
 */
export default function AuthGuard({ children, locale }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while auth state is still loading
    if (isLoading) return;

    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      const currentPath = window.location.pathname;
      const returnTo = encodeURIComponent(currentPath);
      router.push(`/${locale}/auth/login?returnTo=${returnTo}`);
    }
  }, [isAuthenticated, isLoading, locale, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="border-primary-500 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

'use client';

import Link from 'next/link';
import { FiBox } from 'react-icons/fi';
import type { Locale } from '@/middleware';
import { LanguageSwitcher, Button } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';

interface HeaderProps {
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

export default function Header({ locale, dict }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-secondary-200 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <FiBox className="text-primary-600 h-8 w-8" />
              <h1 className="text-secondary-900 ml-3 text-xl font-semibold">{dict.home.title}</h1>
            </Link>
          </div>

          {/* Navigation Links - Only show for authenticated users */}
          {isAuthenticated && (
            <nav className="hidden space-x-8 md:flex">
              <Link
                href={`/${locale}/dashboard`}
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                {dict.navigation.dashboard}
              </Link>
              <Link
                href={`/${locale}/materials`}
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                {dict.navigation.materials}
              </Link>
              <Link
                href={`/${locale}/projects`}
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                {dict.navigation.projects}
              </Link>
              <Link
                href={`/${locale}/purchases`}
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                {dict.navigation.purchases}
              </Link>
              <Link
                href={`/${locale}/suppliers`}
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                {dict.navigation.suppliers}
              </Link>
            </nav>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user && (
                  <span className="text-secondary-600 text-sm">
                    {user.firstName} {user.lastName}
                  </span>
                )}
                <Link
                  href={`/${locale}/profile`}
                  className="text-secondary-600 hover:text-primary-600 text-sm font-medium"
                >
                  {dict.navigation.profile}
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout} className="text-sm">
                  {dict.navigation.logout}
                </Button>
              </div>
            ) : (
              <Link href={`/${locale}/auth/login`}>
                <Button variant="primary" size="sm" className="text-sm">
                  {dict.navigation.signIn}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

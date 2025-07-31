'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiBox, FiHome, FiFolder, FiShoppingCart, FiUsers, FiBarChart } from 'react-icons/fi';
import { cn } from '@/utils';
import { useTranslations } from '@/contexts/TranslationContext';
import { useLocale } from '@/hooks/useLocale';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const dict = useTranslations();

  const navigation = [
    { name: dict.navigation.dashboard, href: `/${locale}/dashboard`, icon: FiHome },
    { name: dict.navigation.materials, href: `/${locale}/materials`, icon: FiBox },
    { name: dict.navigation.projects, href: `/${locale}/projects`, icon: FiFolder },
    { name: dict.navigation.purchases, href: `/${locale}/purchases`, icon: FiShoppingCart },
    { name: dict.navigation.suppliers, href: `/${locale}/suppliers`, icon: FiUsers },
    { name: 'Analytics', href: `/${locale}/analytics`, icon: FiBarChart },
  ];

  return (
    <div
      className={cn(
        'border-secondary-200 flex w-64 flex-col border-r bg-white shadow-sm',
        className
      )}
    >
      {/* Logo */}
      <div className="border-secondary-200 flex h-16 items-center border-b px-6">
        <FiBox className="text-primary-600 h-8 w-8" />
        <span className="text-secondary-900 ml-3 text-lg font-semibold">{dict.home.title}</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700 border-primary-600 border-r-2'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
              )}
            >
              <item.icon
                className={cn('mr-3 h-5 w-5', isActive ? 'text-primary-600' : 'text-secondary-400')}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-secondary-200 border-t p-4">
        <p className="text-secondary-500 text-center text-xs">© 2025 {dict.home.title}</p>
      </div>
    </div>
  );
}

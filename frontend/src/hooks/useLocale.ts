'use client';

import { usePathname } from 'next/navigation';
import type { Locale } from '@/middleware';

export function useLocale(): Locale {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;

  // Return the locale from the URL, defaulting to 'en' if not found
  return ['en', 'es'].includes(locale) ? locale : 'en';
}

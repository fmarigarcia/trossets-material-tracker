import type { Locale } from '@/middleware';

/**
 * Creates a localized URL by adding the locale prefix
 */
export function createLocalizedUrl(path: string, locale: Locale): string {
  // Ensure the path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
}

/**
 * Extracts the locale from a pathname
 */
export function getLocaleFromPath(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];

  if (['en', 'es'].includes(potentialLocale)) {
    return potentialLocale as Locale;
  }

  return null;
}

/**
 * Removes the locale prefix from a pathname
 */
export function removeLocaleFromPath(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale) {
    return pathname.replace(`/${locale}`, '') || '/';
  }
  return pathname;
}

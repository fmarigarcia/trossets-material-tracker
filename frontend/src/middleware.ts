import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// Supported locales
const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

// Default locale
const defaultLocale: Locale = 'en';

// Get the preferred locale from the request
function getLocale(request: NextRequest): Locale {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Extract locale from pathname
    const segments = pathname.split('/');
    const localeFromPath = segments[1] as Locale;
    return locales.includes(localeFromPath) ? localeFromPath : defaultLocale;
  }

  // Use Accept-Language header to determine locale
  const acceptLanguage = request.headers.get('Accept-Language');
  if (!acceptLanguage) return defaultLocale;

  const headers = { 'accept-language': acceptLanguage };
  const languages = new Negotiator({ headers }).languages();

  try {
    return match(languages, locales, defaultLocale) as Locale;
  } catch {
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Redirect if there is no locale
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // Continue if locale is already in the pathname
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, etc.)
    // Skip all files with extensions
    '/((?!_next|api|favicon.ico|.*\\.).*)',
  ],
};

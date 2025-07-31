'use client';

import { useRouter, usePathname } from 'next/navigation';
import { FiGlobe } from 'react-icons/fi';
import type { Locale } from '@/middleware';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  es: { name: 'Español', flag: '🇪🇸' },
};

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (locale: Locale) => {
    // Remove the current locale from the pathname
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    // Create new path with the selected locale
    const newPath = `/${locale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="group relative">
      <div className="ring-opacity-5 absolute top-0 right-0 mt-1 hidden w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black group-hover:block hover:block">
        {Object.entries(languages).map(([locale, language]) => (
          <button
            key={locale}
            onClick={() => handleLanguageChange(locale as Locale)}
            className={`hover:bg-secondary-50 flex w-full items-center space-x-3 px-4 py-2 text-sm ${
              currentLocale === locale ? 'bg-primary-50 text-primary-600' : 'text-secondary-700'
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {currentLocale === locale && <span className="text-primary-600 ml-auto">✓</span>}
          </button>
        ))}
      </div>
      <button className="text-secondary-600 hover:text-primary-600 flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium">
        <FiGlobe className="h-4 w-4" />
        <span>{languages[currentLocale].flag}</span>
        <span className="hidden sm:inline">{languages[currentLocale].name}</span>
      </button>
    </div>
  );
}

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '../providers';
import '@/styles/globals.css';
import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import { TranslationProvider } from '@/contexts/TranslationContext';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords.split(', '),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <Providers>
          <TranslationProvider dictionary={dict}>{children}</TranslationProvider>
        </Providers>
      </body>
    </html>
  );
}

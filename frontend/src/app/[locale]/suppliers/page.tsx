import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import { ProtectedLayout } from '@/components/layout';
import Link from 'next/link';

interface SuppliersPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function SuppliersPage({ params }: SuppliersPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <ProtectedLayout locale={locale} dict={dict}>
      <div className="bg-secondary-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-secondary-900 text-3xl font-bold">{dict.suppliers.title}</h1>
              <p className="text-secondary-600 mt-2">{dict.suppliers.list}</p>
            </div>
            <Link href={`/${locale}/suppliers/new`} className="btn btn-primary">
              {dict.suppliers.addNew}
            </Link>
          </div>

          {/* Suppliers content placeholder */}
          <div className="rounded-lg bg-white p-8 shadow">
            <div className="text-center">
              <h3 className="text-secondary-900 mb-2 text-lg font-medium">Supplier Directory</h3>
              <p className="text-secondary-600 mb-4">
                This section is coming soon. You&apos;ll be able to manage your suppliers here.
              </p>
              <div className="flex justify-center">
                <div className="bg-primary-100 h-12 w-12 animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

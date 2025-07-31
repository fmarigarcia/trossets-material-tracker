import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import Link from 'next/link';

interface MaterialsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function MaterialsPage({ params }: MaterialsPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-secondary-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-secondary-900 text-3xl font-bold">{dict.materials.title}</h1>
            <p className="text-secondary-600 mt-2">{dict.materials.list}</p>
          </div>
          <Link href={`/${locale}/materials/new`} className="btn btn-primary">
            {dict.materials.addNew}
          </Link>
        </div>

        {/* Materials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Example Material Cards */}
          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-secondary-900 text-lg font-medium">PLA Red</h3>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {dict.materials.inStock}
              </span>
            </div>
            <div className="text-secondary-600 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{dict.materials.type}:</span>
                <span>{dict.materials.types.PLA}</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.brand}:</span>
                <span>Brand A</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.remainingWeight}:</span>
                <span>0.8 kg</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.costPerKg}:</span>
                <span>€25.00</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="btn btn-outline btn-sm flex-1">{dict.common.edit}</button>
              <button className="btn btn-outline btn-sm flex-1">{dict.common.delete}</button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-secondary-900 text-lg font-medium">ABS Black</h3>
              <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                {dict.materials.lowStock}
              </span>
            </div>
            <div className="text-secondary-600 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{dict.materials.type}:</span>
                <span>{dict.materials.types.ABS}</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.brand}:</span>
                <span>Brand B</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.remainingWeight}:</span>
                <span>0.2 kg</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.costPerKg}:</span>
                <span>€30.00</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="btn btn-outline btn-sm flex-1">{dict.common.edit}</button>
              <button className="btn btn-outline btn-sm flex-1">{dict.common.delete}</button>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-secondary-900 text-lg font-medium">PETG Clear</h3>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                {dict.materials.inStock}
              </span>
            </div>
            <div className="text-secondary-600 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{dict.materials.type}:</span>
                <span>{dict.materials.types.PETG}</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.brand}:</span>
                <span>Brand C</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.remainingWeight}:</span>
                <span>1.0 kg</span>
              </div>
              <div className="flex justify-between">
                <span>{dict.materials.costPerKg}:</span>
                <span>€35.00</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="btn btn-outline btn-sm flex-1">{dict.common.edit}</button>
              <button className="btn btn-outline btn-sm flex-1">{dict.common.delete}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

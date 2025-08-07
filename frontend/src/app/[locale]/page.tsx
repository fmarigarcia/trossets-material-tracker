import Link from 'next/link';
import { FiBox, FiFolder, FiUsers, FiBarChart } from 'react-icons/fi';
import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import { Header } from '@/components/layout';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Navigation Header */}
      <Header locale={locale} dict={dict} showNavigation={true} />

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <h2 className="text-secondary-900 mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {dict.home.subtitle}
          </h2>
          <p className="text-secondary-600 mx-auto mb-10 max-w-3xl text-lg leading-relaxed">
            {dict.home.description}
          </p>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link href={`/${locale}/dashboard`} className="btn btn-primary btn-lg w-full sm:w-auto">
              {dict.home.getStarted}
            </Link>
            <Link href="#features" className="btn btn-outline btn-lg w-full sm:w-auto">
              {dict.home.learnMore}
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Material Tracking */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="text-primary-600 mb-4">
                <FiBox className="h-10 w-10" />
              </div>
              <h3 className="text-secondary-900 mb-3 text-xl font-semibold">
                {dict.home.features.materialTracking.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {dict.home.features.materialTracking.description}
              </p>
            </div>

            {/* Project Management */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="text-primary-600 mb-4">
                <FiFolder className="h-10 w-10" />
              </div>
              <h3 className="text-secondary-900 mb-3 text-xl font-semibold">
                {dict.home.features.projectManagement.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {dict.home.features.projectManagement.description}
              </p>
            </div>

            {/* Cost Analysis */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="text-primary-600 mb-4">
                <FiBarChart className="h-10 w-10" />
              </div>
              <h3 className="text-secondary-900 mb-3 text-xl font-semibold">
                {dict.home.features.costAnalysis.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {dict.home.features.costAnalysis.description}
              </p>
            </div>

            {/* Supplier Management */}
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="text-primary-600 mb-4">
                <FiUsers className="h-10 w-10" />
              </div>
              <h3 className="text-secondary-900 mb-3 text-xl font-semibold">
                {dict.home.features.supplierManagement.title}
              </h3>
              <p className="text-secondary-600 leading-relaxed">
                {dict.home.features.supplierManagement.description}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import type { Locale } from '@/middleware';
import { getDictionary } from '@/dictionaries';
import { ProtectedLayout } from '@/components/layout';

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <ProtectedLayout locale={locale} dict={dict}>
      <div className="bg-secondary-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-secondary-900 text-3xl font-bold">{dict.dashboard.title}</h1>
            <p className="text-secondary-600 mt-2">{dict.dashboard.welcome}</p>
          </div>

          {/* Quick Stats */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-md text-white">
                    📦
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-secondary-500 truncate text-sm font-medium">
                      {dict.dashboard.stats.totalMaterials}
                    </dt>
                    <dd className="text-secondary-900 text-lg font-medium">24</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white">
                    📋
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-secondary-500 truncate text-sm font-medium">
                      {dict.dashboard.stats.activeProjects}
                    </dt>
                    <dd className="text-secondary-900 text-lg font-medium">8</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-yellow-500 text-white">
                    ⚠️
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-secondary-500 truncate text-sm font-medium">
                      {dict.dashboard.stats.lowStock}
                    </dt>
                    <dd className="text-secondary-900 text-lg font-medium">3</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500 text-white">
                    💰
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-secondary-500 truncate text-sm font-medium">
                      {dict.dashboard.stats.totalValue}
                    </dt>
                    <dd className="text-secondary-900 text-lg font-medium">€1,234</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Recent Activity */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-secondary-900 mb-4 text-lg font-medium">
                {dict.dashboard.recentActivity}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600 text-sm">
                    Material &quot;PLA Red&quot; updated
                  </span>
                  <span className="text-secondary-400 text-xs">2h ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600 text-sm">
                    Project &quot;Phone Case&quot; completed
                  </span>
                  <span className="text-secondary-400 text-xs">4h ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600 text-sm">
                    Purchase recorded from Supplier A
                  </span>
                  <span className="text-secondary-400 text-xs">1d ago</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg bg-white p-6 shadow">
              <h3 className="text-secondary-900 mb-4 text-lg font-medium">
                {dict.dashboard.quickActions}
              </h3>
              <div className="space-y-3">
                <button className="btn btn-primary w-full">{dict.dashboard.addMaterial}</button>
                <button className="btn btn-outline w-full">{dict.dashboard.addProject}</button>
                <button className="btn btn-outline w-full">{dict.dashboard.recordPurchase}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
}

import Link from 'next/link';
import { FiBox, FiFolder, FiShoppingCart, FiUsers, FiBarChart, FiSettings } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Navigation Header */}
      <header className="border-secondary-200 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <FiBox className="text-primary-600 h-8 w-8" />
              <h1 className="text-secondary-900 ml-3 text-xl font-semibold">
                Trossets Material Tracker
              </h1>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <Link
                href="/dashboard"
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/materials"
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                Materials
              </Link>
              <Link
                href="/projects"
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                Projects
              </Link>
              <Link
                href="/purchases"
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                Purchases
              </Link>
              <Link
                href="/suppliers"
                className="text-secondary-600 hover:text-primary-600 rounded-md px-3 py-2 text-sm font-medium"
              >
                Suppliers
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="btn btn-outline btn-sm">Sign In</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-secondary-900 text-4xl font-bold sm:text-5xl md:text-6xl">
            Track Your 3D Printing
            <span className="text-primary-600"> Materials</span>
          </h1>
          <p className="text-secondary-600 mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
            Manage your 3D printing inventory, track material usage, monitor project costs, and
            optimize your printing workflow.
          </p>
          <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link href="/dashboard" className="btn btn-primary btn-lg w-full sm:w-auto">
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link href="/about" className="btn btn-secondary btn-lg w-full sm:w-auto">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Material Management */}
            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <FiBox className="text-primary-600 h-8 w-8" />
                  <h3 className="text-secondary-900 ml-3 text-lg font-medium">
                    Material Management
                  </h3>
                </div>
                <p className="text-secondary-600 mt-4">
                  Keep track of your filament inventory, monitor stock levels, and get alerts when
                  materials are running low.
                </p>
              </div>
            </div>

            {/* Project Tracking */}
            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <FiFolder className="text-primary-600 h-8 w-8" />
                  <h3 className="text-secondary-900 ml-3 text-lg font-medium">Project Tracking</h3>
                </div>
                <p className="text-secondary-600 mt-4">
                  Monitor your 3D printing projects, track material usage per project, and calculate
                  accurate project costs.
                </p>
              </div>
            </div>

            {/* Purchase Management */}
            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <FiShoppingCart className="text-primary-600 h-8 w-8" />
                  <h3 className="text-secondary-900 ml-3 text-lg font-medium">
                    Purchase Management
                  </h3>
                </div>
                <p className="text-secondary-600 mt-4">
                  Record material purchases, track spending, and maintain a complete history of your
                  investments.
                </p>
              </div>
            </div>

            {/* Supplier Database */}
            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <FiUsers className="text-primary-600 h-8 w-8" />
                  <h3 className="text-secondary-900 ml-3 text-lg font-medium">Supplier Database</h3>
                </div>
                <p className="text-secondary-600 mt-4">
                  Maintain a comprehensive database of suppliers with contact information and
                  purchase history.
                </p>
              </div>
            </div>

            {/* Analytics & Reports */}
            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <FiBarChart className="text-primary-600 h-8 w-8" />
                  <h3 className="text-secondary-900 ml-3 text-lg font-medium">
                    Analytics & Reports
                  </h3>
                </div>
                <p className="text-secondary-600 mt-4">
                  Get insights into your material usage patterns, costs, and efficiency with
                  detailed analytics.
                </p>
              </div>
            </div>

            {/* Easy Configuration */}
            <div className="card">
              <div className="card-content">
                <div className="flex items-center">
                  <FiSettings className="text-primary-600 h-8 w-8" />
                  <h3 className="text-secondary-900 ml-3 text-lg font-medium">
                    Easy Configuration
                  </h3>
                </div>
                <p className="text-secondary-600 mt-4">
                  Simple setup and configuration to get you started quickly with your material
                  tracking workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-secondary-200 mt-20 border-t bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-secondary-600 text-center">
            <p>&copy; 2025 Trossets Material Tracker. Built for makers, by makers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

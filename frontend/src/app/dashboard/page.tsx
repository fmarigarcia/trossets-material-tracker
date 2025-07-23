'use client';

import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { Card, CardContent, CardHeader } from '@/components/ui/Card/Card';
import { FiBox, FiBarChart, FiTrendingUp, FiAlertTriangle, FiDollarSign } from 'react-icons/fi';

export default function DashboardPage() {
  const { user } = useAuth();

  // Mock data - in real app this would come from API
  const stats = {
    totalMaterials: 25,
    totalProjects: 12,
    activeProjects: 3,
    lowStockMaterials: 2,
    totalInventoryValue: 1245.5,
    monthlySpending: 89.99,
  };

  return (
    <div className="bg-secondary-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <FiBox className="text-primary-600 h-8 w-8" />
              <h1 className="text-secondary-900 ml-3 text-xl font-semibold">Material Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-secondary-600 text-sm">
                Welcome back, {user?.name || 'User'}
              </span>
              <button className="btn btn-outline btn-sm">Sign Out</button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-secondary-900 text-2xl font-bold">Dashboard</h1>
          <p className="text-secondary-600 mt-1 text-sm">
            Overview of your 3D printing materials and projects
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiBox className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-secondary-600 text-sm font-medium">Total Materials</p>
                  <p className="text-secondary-900 text-2xl font-semibold">
                    {stats.totalMaterials}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiBarChart className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-secondary-600 text-sm font-medium">Total Projects</p>
                  <p className="text-secondary-900 text-2xl font-semibold">{stats.totalProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiTrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-secondary-600 text-sm font-medium">Active Projects</p>
                  <p className="text-secondary-900 text-2xl font-semibold">
                    {stats.activeProjects}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-secondary-600 text-sm font-medium">Low Stock</p>
                  <p className="text-secondary-900 text-2xl font-semibold">
                    {stats.lowStockMaterials}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiDollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-secondary-600 text-sm font-medium">Inventory Value</p>
                  <p className="text-secondary-900 text-2xl font-semibold">
                    ${stats.totalInventoryValue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FiTrendingUp className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-secondary-600 text-sm font-medium">Monthly Spending</p>
                  <p className="text-secondary-900 text-2xl font-semibold">
                    ${stats.monthlySpending}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <h3 className="text-secondary-900 text-lg font-medium">Recent Projects</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary-50 flex items-center justify-between rounded-lg p-4">
                  <div>
                    <p className="text-secondary-900 font-medium">Custom Phone Case</p>
                    <p className="text-secondary-600 text-sm">Active • Started 2 days ago</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    Active
                  </span>
                </div>
                <div className="bg-secondary-50 flex items-center justify-between rounded-lg p-4">
                  <div>
                    <p className="text-secondary-900 font-medium">Miniature Figurine</p>
                    <p className="text-secondary-600 text-sm">Completed • 1 week ago</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                    Completed
                  </span>
                </div>
                <div className="bg-secondary-50 flex items-center justify-between rounded-lg p-4">
                  <div>
                    <p className="text-secondary-900 font-medium">Desk Organizer</p>
                    <p className="text-secondary-600 text-sm">Planning • Created yesterday</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                    Planning
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alerts */}
          <Card>
            <CardHeader>
              <h3 className="text-secondary-900 text-lg font-medium">Low Stock Alerts</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4">
                  <div>
                    <p className="text-secondary-900 font-medium">PLA - Red</p>
                    <p className="text-secondary-600 text-sm">Only 125g remaining</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-red-600">8%</p>
                    <p className="text-secondary-500 text-xs">of 1.5kg</p>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <div>
                    <p className="text-secondary-900 font-medium">PETG - Clear</p>
                    <p className="text-secondary-600 text-sm">Only 280g remaining</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-yellow-600">22%</p>
                    <p className="text-secondary-500 text-xs">of 1.25kg</p>
                  </div>
                </div>
                <div className="text-secondary-500 p-4 text-center">
                  <p className="text-sm">All other materials are well stocked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <h3 className="text-secondary-900 text-lg font-medium">Quick Actions</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <button className="btn btn-primary">Add Material</button>
                <button className="btn btn-secondary">New Project</button>
                <button className="btn btn-outline">Record Purchase</button>
                <button className="btn btn-outline">View Reports</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

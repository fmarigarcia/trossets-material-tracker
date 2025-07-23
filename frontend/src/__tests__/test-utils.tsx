import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext/AuthContext';

// Mock data for testing
export const mockMaterial = {
  id: '1',
  name: 'PLA Red',
  type: 'PLA',
  brand: 'Hatchbox',
  color: 'Red',
  diameter: 1.75,
  density: 1.24,
  costPerKg: 25.99,
  totalWeight: 1000,
  usedWeight: 250,
  remainingWeight: 750,
  supplierId: 'supplier-1',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockProject = {
  id: '1',
  name: 'Test Project',
  description: 'A test 3D printing project',
  status: 'IN_PROGRESS',
  estimatedCost: 15.5,
  actualCost: 12.75,
  startDate: new Date('2024-01-01'),
  endDate: null,
  userId: 'user-1',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'USER',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const mockSupplier = {
  id: 'supplier-1',
  name: 'Test Supplier',
  email: 'supplier@example.com',
  phone: '+1234567890',
  website: 'https://example.com',
  address: '123 Test St',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {}

export function renderWithProviders(
  ui: ReactElement,
  {
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AuthProvider>{children}</AuthProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Mock API responses
export const mockApiResponse = {
  success: true,
  data: null,
};

export const mockApiError = {
  success: false,
  error: {
    message: 'Something went wrong',
    details: null,
  },
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { renderWithProviders as render };

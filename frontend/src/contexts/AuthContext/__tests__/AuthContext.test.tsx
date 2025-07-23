import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../AuthContext';
import * as api from '@/lib/api';

// Mock the API client
jest.mock('@/lib/api', () => ({
  apiClient: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    get: jest.fn(),
    getProfile: jest.fn(),
  },
}));

const mockApiClient = api.apiClient as jest.Mocked<typeof api.apiClient>;

// Test component to access auth context
function TestComponent() {
  const auth = useAuth();

  const handleLogin = async () => {
    try {
      await auth.login({ email: 'test@test.com', password: 'password' });
    } catch (error) {
      // Errors are expected in some tests, handle them silently
    }
  };

  const handleRegister = async () => {
    try {
      await auth.register({
        email: 'test@test.com',
        password: 'password',
        name: 'Test User',
      });
    } catch (error) {
      // Errors are expected in some tests, handle them silently
    }
  };

  const handleRefresh = async () => {
    try {
      await auth.refreshUser();
    } catch (error) {
      // Errors are expected in some tests, handle them silently
    }
  };

  return (
    <div>
      <div data-testid="loading">{auth.isLoading.toString()}</div>
      <div data-testid="authenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="user">{auth.user?.name || 'No user'}</div>
      <div data-testid="token">{auth.token || 'No token'}</div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => auth.logout()}>Logout</button>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  it('provides initial auth state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('token')).toHaveTextContent('No token');
  });

  it('handles successful login', async () => {
    const mockUser = { 
      id: '1', 
      name: 'Test User', 
      email: 'test@test.com', 
      role: 'user' as const, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    const mockToken = 'mock-token';

    mockApiClient.login.mockResolvedValueOnce({
      success: true,
      data: { user: mockUser, token: mockToken },
    });

    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await user.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(mockApiClient.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password',
    });
  });

  it('handles successful registration', async () => {
    const mockUser = { 
      id: '1', 
      name: 'Test User', 
      email: 'test@test.com', 
      role: 'user' as const, 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    };
    const mockToken = 'mock-token';

    mockApiClient.register.mockResolvedValueOnce({
      success: true,
      data: { user: mockUser, token: mockToken },
    });

    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await user.click(screen.getByText('Register'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    });

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
    expect(mockApiClient.register).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password',
      name: 'Test User',
    });
  });

  it('handles logout', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await user.click(screen.getByText('Logout'));
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user')).toHaveTextContent('No user');
    expect(screen.getByTestId('token')).toHaveTextContent('No token');
  });

  it('handles API errors gracefully', async () => {
    mockApiClient.login.mockRejectedValueOnce({
      error: { message: 'Invalid credentials' },
    });

    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Click the login button - the error is handled internally
    await act(async () => {
      await user.click(screen.getByText('Login'));
    });

    // After the failed login attempt, user should remain unauthenticated
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('refreshes user data', async () => {
    const mockUser = { 
      id: '1', 
      name: 'Updated User', 
      email: 'test@test.com', 
      role: 'user' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockApiClient.getProfile.mockResolvedValueOnce({
      success: true,
      data: mockUser,
    });

    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await act(async () => {
      await user.click(screen.getByText('Refresh'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('Updated User');
    });

    expect(mockApiClient.getProfile).toHaveBeenCalled();
  });

  it('throws error when useAuth is used outside AuthProvider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');

    consoleSpy.mockRestore();
  });
});

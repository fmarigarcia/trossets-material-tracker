import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '../Header';
import type { Locale } from '@/middleware';
import '@testing-library/jest-dom';

// Mock the AuthContext
jest.mock('@/contexts/AuthContext');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/en/test',
}));

const mockDict = {
  home: {
    title: 'Material Tracker',
  },
  navigation: {
    dashboard: 'Dashboard',
    materials: 'Materials',
    projects: 'Projects',
    purchases: 'Purchases',
    suppliers: 'Suppliers',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    logout: 'Logout',
    profile: 'Profile',
  },
};

describe('Header', () => {
  const defaultProps = {
    locale: 'en' as Locale,
    dict: mockDict,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders unauthenticated state correctly', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      refreshUser: jest.fn(),
    });

    render(<Header {...defaultProps} />);

    expect(screen.getByText('Material Tracker')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    // Navigation should not be visible when not authenticated
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('renders authenticated state correctly', () => {
    const mockUser = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'user' as const,
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
    };

    mockUseAuth.mockReturnValue({
      user: mockUser,
      token: 'mock-token',
      isLoading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      refreshUser: jest.fn(),
    });

    render(<Header {...defaultProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
    // Navigation should be visible when authenticated
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Materials')).toBeInTheDocument();
  });

  it('calls logout when logout button is clicked', async () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user' as const,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      token: 'mock-token',
      isLoading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      logout: mockLogout,
      refreshUser: jest.fn(),
    });

    render(<Header {...defaultProps} />);

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it('shows navigation when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user' as const,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
      token: 'mock-token',
      isLoading: false,
      isAuthenticated: true,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      refreshUser: jest.fn(),
    });

    render(<Header {...defaultProps} />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Materials')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Purchases')).toBeInTheDocument();
    expect(screen.getByText('Suppliers')).toBeInTheDocument();
  });

  it('hides navigation when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      login: jest.fn(),
      register: jest.fn(),
      logout: jest.fn(),
      refreshUser: jest.fn(),
    });

    render(<Header {...defaultProps} />);

    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
    expect(screen.queryByText('Materials')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Purchases')).not.toBeInTheDocument();
    expect(screen.queryByText('Suppliers')).not.toBeInTheDocument();
  });
});

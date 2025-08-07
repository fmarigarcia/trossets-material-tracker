import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams, type ReadonlyURLSearchParams } from 'next/navigation';
import LoginForm from '../LoginForm';
import { useLogin } from '@/hooks/useLogin';
import type { Locale } from '@/middleware';
import '@testing-library/jest-dom';

// Mock the useLogin hook
jest.mock('@/hooks/useLogin');
const mockUseLogin = useLogin as jest.MockedFunction<typeof useLogin>;

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));
const mockUseSearchParams = useSearchParams as jest.MockedFunction<typeof useSearchParams>;

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

const mockDict = {
  auth: {
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters long',
    loginFailed: 'Login failed. Please try again.',
  },
  common: {
    loading: 'Loading...',
  },
};

describe('LoginForm', () => {
  const defaultProps = {
    locale: 'en' as Locale,
    dict: mockDict,
  };

  const mockLoginData = {
    formData: {
      email: '',
      password: '',
      rememberMe: false,
    },
    errors: {},
    isLoading: false,
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    setRememberMe: jest.fn(),
    handleSubmit: jest.fn(),
    clearErrors: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock search params
    const mockSearchParams = {
      get: jest.fn().mockReturnValue(null),
      has: jest.fn().mockReturnValue(false),
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);

    // Mock useLogin hook
    mockUseLogin.mockReturnValue(mockLoginData);
  });

  it('renders login form correctly', () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('displays form data from useLogin hook', () => {
    const mockFormData = {
      email: 'test@example.com',
      password: 'password123',
      rememberMe: true,
    };

    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      formData: mockFormData,
    });

    render(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const rememberCheckbox = screen.getByLabelText('Remember me') as HTMLInputElement;

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(rememberCheckbox.checked).toBe(true);
  });

  it('displays errors when present', () => {
    const mockErrors = {
      email: 'Email is required',
      password: 'Password is required',
      general: 'Login failed',
    };

    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      errors: mockErrors,
    });

    render(<LoginForm {...defaultProps} />);

    expect(screen.getByText('Login failed')).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      isLoading: true,
    });

    render(<LoginForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: 'Loading...' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('calls setEmail when email input changes', async () => {
    const mockSetEmail = jest.fn();
    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      setEmail: mockSetEmail,
    });

    render(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('calls setPassword when password input changes', async () => {
    const mockSetPassword = jest.fn();
    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      setPassword: mockSetPassword,
    });

    render(<LoginForm {...defaultProps} />);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  it('calls setRememberMe when checkbox changes', async () => {
    const mockSetRememberMe = jest.fn();
    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      setRememberMe: mockSetRememberMe,
    });

    render(<LoginForm {...defaultProps} />);

    const rememberCheckbox = screen.getByLabelText('Remember me');
    fireEvent.click(rememberCheckbox);

    expect(mockSetRememberMe).toHaveBeenCalledWith(true);
  });

  it('calls handleSubmit when form is submitted', async () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      handleSubmit: mockHandleSubmit,
    });

    render(<LoginForm {...defaultProps} />);

    const form = screen.getByRole('button', { name: 'Sign In' }).closest('form');
    fireEvent.submit(form!);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('disables inputs when loading', () => {
    mockUseLogin.mockReturnValue({
      ...mockLoginData,
      isLoading: true,
    });

    render(<LoginForm {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const rememberCheckbox = screen.getByLabelText('Remember me') as HTMLInputElement;
    const submitButton = screen.getByRole('button') as HTMLButtonElement;

    expect(emailInput.disabled).toBe(true);
    expect(passwordInput.disabled).toBe(true);
    expect(rememberCheckbox.disabled).toBe(true);
    expect(submitButton.disabled).toBe(true);
  });

  it('includes returnTo parameter in useLogin call', () => {
    const mockSearchParams = {
      get: jest.fn().mockReturnValue('/dashboard'),
    };
    mockUseSearchParams.mockReturnValue(mockSearchParams as unknown as ReadonlyURLSearchParams);

    render(<LoginForm {...defaultProps} />);

    expect(mockUseLogin).toHaveBeenCalledWith({
      locale: 'en',
      returnTo: '/dashboard',
      dict: mockDict,
    });
  });

  it('renders correct links', () => {
    render(<LoginForm {...defaultProps} />);

    const signUpLink = screen.getByText('Sign Up').closest('a');
    const forgotPasswordLink = screen.getByText('Forgot Password?').closest('a');

    expect(signUpLink).toHaveAttribute('href', '/en/auth/register');
    expect(forgotPasswordLink).toHaveAttribute('href', '/en/auth/forgot-password');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../RegisterForm';
import { useRegister } from '@/hooks/useRegister';
import type { Locale } from '@/middleware';
import '@testing-library/jest-dom';

// Mock the useRegister hook
jest.mock('@/hooks/useRegister');
const mockUseRegister = useRegister as jest.MockedFunction<typeof useRegister>;

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

const mockDict = {
  auth: {
    signUp: 'Sign Up',
    signIn: 'Sign In',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    alreadyHaveAccount: 'Already have an account?',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters long',
    passwordMismatch: 'Passwords do not match',
    registrationFailed: 'Registration failed. Please try again.',
  },
  common: {
    loading: 'Loading...',
    fieldRequired: 'This field is required',
  },
};

describe('RegisterForm', () => {
  const defaultProps = {
    locale: 'en' as Locale,
    dict: mockDict,
  };

  const mockRegisterData = {
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    errors: {},
    isLoading: false,
    setFirstName: jest.fn(),
    setLastName: jest.fn(),
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    setConfirmPassword: jest.fn(),
    handleSubmit: jest.fn(),
    clearErrors: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock useRegister hook
    mockUseRegister.mockReturnValue(mockRegisterData);
  });

  it('renders register form correctly', () => {
    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('displays form data from useRegister hook', () => {
    const mockFormData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      formData: mockFormData,
    });

    render(<RegisterForm {...defaultProps} />);

    const firstNameInput = screen.getByLabelText('First Name') as HTMLInputElement;
    const lastNameInput = screen.getByLabelText('Last Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  it('displays errors when present', () => {
    const mockErrors = {
      firstName: 'First name is required',
      email: 'Email is invalid',
      general: 'Registration failed',
    };

    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      errors: mockErrors,
    });

    render(<RegisterForm {...defaultProps} />);

    expect(screen.getByText('Registration failed')).toBeInTheDocument();
  });

  it('shows loading state when isLoading is true', () => {
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      isLoading: true,
    });

    render(<RegisterForm {...defaultProps} />);

    const submitButton = screen.getByRole('button', { name: 'Loading...' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('calls setFirstName when first name input changes', async () => {
    const mockSetFirstName = jest.fn();
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      setFirstName: mockSetFirstName,
    });

    render(<RegisterForm {...defaultProps} />);

    const firstNameInput = screen.getByLabelText('First Name');
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    expect(mockSetFirstName).toHaveBeenCalledWith('John');
  });

  it('calls setLastName when last name input changes', async () => {
    const mockSetLastName = jest.fn();
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      setLastName: mockSetLastName,
    });

    render(<RegisterForm {...defaultProps} />);

    const lastNameInput = screen.getByLabelText('Last Name');
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    expect(mockSetLastName).toHaveBeenCalledWith('Doe');
  });

  it('calls setEmail when email input changes', async () => {
    const mockSetEmail = jest.fn();
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      setEmail: mockSetEmail,
    });

    render(<RegisterForm {...defaultProps} />);

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('calls setPassword when password input changes', async () => {
    const mockSetPassword = jest.fn();
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      setPassword: mockSetPassword,
    });

    render(<RegisterForm {...defaultProps} />);

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(mockSetPassword).toHaveBeenCalledWith('password123');
  });

  it('calls setConfirmPassword when confirm password input changes', async () => {
    const mockSetConfirmPassword = jest.fn();
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      setConfirmPassword: mockSetConfirmPassword,
    });

    render(<RegisterForm {...defaultProps} />);

    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    expect(mockSetConfirmPassword).toHaveBeenCalledWith('password123');
  });

  it('calls handleSubmit when form is submitted', async () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      handleSubmit: mockHandleSubmit,
    });

    render(<RegisterForm {...defaultProps} />);

    const form = screen.getByRole('button', { name: 'Sign Up' }).closest('form');
    fireEvent.submit(form!);

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('disables inputs when loading', () => {
    mockUseRegister.mockReturnValue({
      ...mockRegisterData,
      isLoading: true,
    });

    render(<RegisterForm {...defaultProps} />);

    const firstNameInput = screen.getByLabelText('First Name') as HTMLInputElement;
    const lastNameInput = screen.getByLabelText('Last Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText('Confirm Password') as HTMLInputElement;
    const submitButton = screen.getByRole('button') as HTMLButtonElement;

    expect(firstNameInput.disabled).toBe(true);
    expect(lastNameInput.disabled).toBe(true);
    expect(emailInput.disabled).toBe(true);
    expect(passwordInput.disabled).toBe(true);
    expect(confirmPasswordInput.disabled).toBe(true);
    expect(submitButton.disabled).toBe(true);
  });

  it('renders correct links', () => {
    render(<RegisterForm {...defaultProps} />);

    const signInLink = screen.getByText('Sign In').closest('a');

    expect(signInLink).toHaveAttribute('href', '/en/auth/login');
  });

  it('passes correct props to useRegister', () => {
    render(<RegisterForm {...defaultProps} />);

    expect(mockUseRegister).toHaveBeenCalledWith({
      locale: 'en',
      dict: mockDict,
    });
  });
});

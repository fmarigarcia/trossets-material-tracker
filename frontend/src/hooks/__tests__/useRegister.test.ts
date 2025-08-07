import { renderHook, act } from '@testing-library/react';
import { useRegister } from '@/hooks/useRegister';
import type { Locale } from '@/middleware';
import '@testing-library/jest-dom';

// Mock the dependencies
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/lib/api', () => ({
  auth: {
    register: jest.fn(),
  },
}));

const mockDict = {
  auth: {
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

describe('useRegister', () => {
  const defaultProps = {
    locale: 'en' as Locale,
    dict: mockDict,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    expect(result.current.formData).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  it('updates firstName when setFirstName is called', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setFirstName('John');
    });

    expect(result.current.formData.firstName).toBe('John');
  });

  it('updates lastName when setLastName is called', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setLastName('Doe');
    });

    expect(result.current.formData.lastName).toBe('Doe');
  });

  it('updates email when setEmail is called', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setEmail('test@example.com');
    });

    expect(result.current.formData.email).toBe('test@example.com');
  });

  it('updates password when setPassword is called', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setPassword('password123');
    });

    expect(result.current.formData.password).toBe('password123');
  });

  it('updates confirmPassword when setConfirmPassword is called', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setConfirmPassword('password123');
    });

    expect(result.current.formData.confirmPassword).toBe('password123');
  });

  it('validates required fields correctly', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errors.firstName).toBe('This field is required');
    expect(result.current.errors.lastName).toBe('This field is required');
    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.password).toBe('Password is required');
  });

  it('validates email format correctly', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setFirstName('John');
      result.current.setLastName('Doe');
      result.current.setEmail('invalid-email');
      result.current.setPassword('password123');
      result.current.setConfirmPassword('password123');
    });

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errors.email).toBe('Please enter a valid email address');
  });

  it('validates password length correctly', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setFirstName('John');
      result.current.setLastName('Doe');
      result.current.setEmail('test@example.com');
      result.current.setPassword('123');
      result.current.setConfirmPassword('123');
    });

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errors.password).toBe('Password must be at least 6 characters long');
  });

  it('validates password match correctly', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    act(() => {
      result.current.setFirstName('John');
      result.current.setLastName('Doe');
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPassword('different123');
    });

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errors.confirmPassword).toBe('Passwords do not match');
  });

  it('clears errors when clearErrors is called', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    // Set some errors first
    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(result.current.errors).not.toEqual({});

    // Clear errors
    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
  });

  it('prevents default form submission', () => {
    const { result } = renderHook(() => useRegister(defaultProps));

    const mockEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent;

    act(() => {
      result.current.handleSubmit(mockEvent);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});

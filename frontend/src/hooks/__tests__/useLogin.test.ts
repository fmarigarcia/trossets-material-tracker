import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useLogin } from '@/hooks/useLogin';
import type { Locale } from '@/middleware';
import '@testing-library/jest-dom';

// Mock the dependencies
const mockLogin = jest.fn();
const mockPush = jest.fn();

// Helper function to create mock React.FormEvent
const createMockFormEvent = (): React.FormEvent => {
  const event = {
    preventDefault: jest.fn(),
    currentTarget: document.createElement('form'),
    target: document.createElement('form'),
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    eventPhase: 0,
    isTrusted: false,
    nativeEvent: new Event('submit'),
    timeStamp: Date.now(),
    type: 'submit',
    isDefaultPrevented: jest.fn(() => false),
    isPropagationStopped: jest.fn(() => false),
    persist: jest.fn(),
    stopPropagation: jest.fn(),
  };
  return event as React.FormEvent;
};

// Mock the AuthContext to provide the login function
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    token: null,
    isLoading: false,
    isAuthenticated: false,
    login: mockLogin,
    register: jest.fn(),
    logout: jest.fn(),
    refreshUser: jest.fn(),
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

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

const mockDict = {
  auth: {
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 6 characters long',
    loginFailed: 'Login failed. Please try again.',
  },
};

describe('useLogin', () => {
  const defaultProps = {
    locale: 'en' as Locale,
    dict: mockDict,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useLogin(defaultProps));

    expect(result.current.formData).toEqual({
      email: '',
      password: '',
      rememberMe: false,
    });
    expect(result.current.errors).toEqual({});
    expect(result.current.isLoading).toBe(false);
  });

  describe('form field updates', () => {
    it('updates email field correctly', () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
      });

      expect(result.current.formData.email).toBe('test@example.com');
    });

    it('updates password field correctly', () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setPassword('password123');
      });

      expect(result.current.formData.password).toBe('password123');
    });

    it('updates rememberMe field correctly', () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setRememberMe(true);
      });

      expect(result.current.formData.rememberMe).toBe(true);
    });

    it('clears email error when email is updated', () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      // First trigger email validation error
      act(() => {
        result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.email).toBe(mockDict.auth.emailRequired);

      // Then update email field
      act(() => {
        result.current.setEmail('test@example.com');
      });

      expect(result.current.errors.email).toBeUndefined();
    });

    it('clears password error when password is updated', () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      // First trigger password validation error
      act(() => {
        result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.password).toBe(mockDict.auth.passwordRequired);

      // Then update password field
      act(() => {
        result.current.setPassword('password123');
      });

      expect(result.current.errors.password).toBeUndefined();
    });
  });

  describe('form validation', () => {
    it('validates empty email field', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.email).toBe(mockDict.auth.emailRequired);
    });

    it('validates invalid email format', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('invalid-email');
      });

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.email).toBe(mockDict.auth.emailInvalid);
    });

    it('validates empty password field', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
      });

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.password).toBe(mockDict.auth.passwordRequired);
    });

    it('validates password length', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('123');
      });

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.password).toBe(mockDict.auth.passwordTooShort);
    });

    it('passes validation with valid data', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      mockLogin.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors).toEqual({});
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('validates multiple fields at once', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.email).toBe(mockDict.auth.emailRequired);
      expect(result.current.errors.password).toBe(mockDict.auth.passwordRequired);
    });
  });

  describe('form submission', () => {
    it('sets loading state during submission', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      // Start with loading false
      expect(result.current.isLoading).toBe(false);

      let resolveLogin: (value: unknown) => void;
      const loginPromise = new Promise((resolve) => {
        resolveLogin = resolve;
      });
      mockLogin.mockReturnValueOnce(loginPromise);

      // Trigger submission and wait for loading state to update
      let submitPromise: Promise<void>;
      await act(async () => {
        submitPromise = result.current.handleSubmit(createMockFormEvent());
      });

      // Now loading should be true
      expect(result.current.isLoading).toBe(true);

      // Complete the login
      resolveLogin!(undefined);

      await act(async () => {
        await submitPromise!;
      });

      // Loading should be false after completion
      expect(result.current.isLoading).toBe(false);
    });

    it('calls login with lowercase email', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('TEST@EXAMPLE.COM');
        result.current.setPassword('password123');
      });

      mockLogin.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('redirects to dashboard on successful login', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      mockLogin.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(mockPush).toHaveBeenCalledWith('/en/dashboard');
    });

    it('redirects to returnTo URL when provided', async () => {
      const propsWithReturnTo = {
        ...defaultProps,
        returnTo: '/en/materials',
      };
      const { result } = renderHook(() => useLogin(propsWithReturnTo));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      mockLogin.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(mockPush).toHaveBeenCalledWith('/en/materials');
    });

    it('handles login failure with Error instance', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('wrongpassword');
      });

      const errorMessage = 'Invalid credentials';
      mockLogin.mockRejectedValueOnce(new Error(errorMessage));

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.general).toBe(errorMessage);
      expect(result.current.isLoading).toBe(false);
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('handles login failure with unknown error', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      mockLogin.mockRejectedValueOnce('Unknown error');

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors.general).toBe(mockDict.auth.loginFailed);
      expect(result.current.isLoading).toBe(false);
      expect(mockPush).not.toHaveBeenCalled();
    });

    it('clears errors before submission', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      // First set some errors
      act(() => {
        result.current.clearErrors();
      });

      // Set valid form data
      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      mockLogin.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(result.current.errors).toEqual({});
    });

    it('does not submit with invalid form data', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      // Don't set any form data - should fail validation

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(mockLogin).not.toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });

    it('prevents default form submission', async () => {
      const { result } = renderHook(() => useLogin(defaultProps));
      const mockEvent = createMockFormEvent();

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      mockLogin.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('utility functions', () => {
    it('clears all errors when clearErrors is called', () => {
      const { result } = renderHook(() => useLogin(defaultProps));

      // First trigger some errors
      act(() => {
        result.current.handleSubmit(createMockFormEvent());
      });

      expect(Object.keys(result.current.errors)).toHaveLength(2); // email and password errors

      // Clear errors
      act(() => {
        result.current.clearErrors();
      });

      expect(result.current.errors).toEqual({});
    });
  });

  describe('different locales', () => {
    it('redirects to correct locale dashboard', async () => {
      const propsWithSpanishLocale = {
        ...defaultProps,
        locale: 'es' as Locale,
      };
      const { result } = renderHook(() => useLogin(propsWithSpanishLocale));

      act(() => {
        result.current.setEmail('test@example.com');
        result.current.setPassword('password123');
      });

      mockLogin.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.handleSubmit(createMockFormEvent());
      });

      expect(mockPush).toHaveBeenCalledWith('/es/dashboard');
    });
  });
});

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { Locale } from '@/middleware';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

interface UseLoginProps {
  locale: Locale;
  returnTo?: string;
  dict: {
    auth: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordTooShort: string;
      loginFailed: string;
    };
  };
}

interface UseLoginReturn {
  formData: LoginFormData;
  errors: FormErrors;
  isLoading: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRememberMe: (remember: boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearErrors: () => void;
}

export function useLogin({ locale, returnTo, dict }: UseLoginProps): UseLoginReturn {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = dict.auth.emailRequired;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = dict.auth.emailInvalid;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = dict.auth.passwordRequired;
    } else if (formData.password.length < 6) {
      newErrors.password = dict.auth.passwordTooShort;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      // Navigate to return URL or dashboard
      const redirectUrl = returnTo || `/${locale}/dashboard`;
      router.push(redirectUrl);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : dict.auth.loginFailed;
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const setEmail = (email: string) => {
    setFormData((prev) => ({ ...prev, email }));
    // Clear email error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const setPassword = (password: string) => {
    setFormData((prev) => ({ ...prev, password }));
    // Clear password error when user starts typing
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const setRememberMe = (rememberMe: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    setEmail,
    setPassword,
    setRememberMe,
    handleSubmit,
    clearErrors,
  };
}

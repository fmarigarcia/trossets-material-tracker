import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { Locale } from '@/middleware';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

interface UseRegisterProps {
  locale: Locale;
  dict: {
    auth: {
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordTooShort: string;
      passwordMismatch: string;
      registrationFailed: string;
    };
    common: {
      fieldRequired: string;
    };
  };
}

interface UseRegisterReturn {
  formData: RegisterFormData;
  errors: FormErrors;
  isLoading: boolean;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearErrors: () => void;
}

export function useRegister({ locale, dict }: UseRegisterProps): UseRegisterReturn {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = dict.common.fieldRequired;
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = dict.common.fieldRequired;
    }

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

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = dict.auth.passwordRequired;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = dict.auth.passwordMismatch;
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
      await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
      });

      // Navigate to dashboard after successful registration
      router.push(`/${locale}/dashboard`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : dict.auth.registrationFailed;
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const setFirstName = (firstName: string) => {
    setFormData((prev) => ({ ...prev, firstName }));
    if (errors.firstName) {
      setErrors((prev) => ({ ...prev, firstName: undefined }));
    }
  };

  const setLastName = (lastName: string) => {
    setFormData((prev) => ({ ...prev, lastName }));
    if (errors.lastName) {
      setErrors((prev) => ({ ...prev, lastName: undefined }));
    }
  };

  const setEmail = (email: string) => {
    setFormData((prev) => ({ ...prev, email }));
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const setPassword = (password: string) => {
    setFormData((prev) => ({ ...prev, password }));
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
    // Also clear confirm password error if passwords match
    if (errors.confirmPassword && password === formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const setConfirmPassword = (confirmPassword: string) => {
    setFormData((prev) => ({ ...prev, confirmPassword }));
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    formData,
    errors,
    isLoading,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    clearErrors,
  };
}

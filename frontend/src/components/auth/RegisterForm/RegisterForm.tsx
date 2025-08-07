'use client';

import Link from 'next/link';
import type { Locale } from '@/middleware';
import { Button, Card, Input } from '@/components/ui';
import { useRegister } from '@/hooks/useRegister';

interface RegisterFormProps {
  locale: Locale;
  dict: {
    auth: {
      signIn: string;
      signUp: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
      alreadyHaveAccount: string;
      emailRequired: string;
      emailInvalid: string;
      passwordRequired: string;
      passwordTooShort: string;
      passwordMismatch: string;
      registrationFailed: string;
    };
    common: {
      loading: string;
      fieldRequired: string;
    };
  };
}

export default function RegisterForm({ locale, dict }: RegisterFormProps) {
  const {
    formData,
    errors,
    isLoading,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
  } = useRegister({
    locale,
    dict,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{dict.auth.signUp}</h2>
          <p className="mt-2 text-sm text-gray-600">
            {dict.auth.alreadyHaveAccount}{' '}
            <Link
              href={`/${locale}/auth/login`}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {dict.auth.signIn}
            </Link>
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  {dict.auth.firstName}
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                  error={errors.firstName}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  {dict.auth.lastName}
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                  error={errors.lastName}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {dict.auth.email}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                error={errors.email}
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {dict.auth.password}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                error={errors.password}
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                {dict.auth.confirmPassword}
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                error={errors.confirmPassword}
                disabled={isLoading}
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              isLoading={isLoading}
              className="w-full"
            >
              {isLoading ? dict.common.loading : dict.auth.signUp}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
